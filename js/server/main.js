const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const mssql = require("mssql");

const expressWS = require("express-ws")(express());
const app = expressWS.app;

const PORT = 3087;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(express.static(path.join(__dirname)));
// app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
	console.log(`FuzzyKnights Studio API is now listening on port: ${ PORT }`);
});

app.get("/", (req, res) => {
    res.sendfile("index.html");
});

app.get("/validate", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.set("Content-Type", "Application/json");
    
    res.send(JSON.stringify({
        cat: "meow"
    }));
});

app.ws("/ws", function (client, req) {
    console.log(`[CLIENT CONNECTED]: { Timestamp: ${Date.now()}, IP: ${req.connection.remoteAddress} }`);

	client.on("message", function(msg) {
		console.log(`[MESSAGE RECEIVED]: { Timestamp: ${Date.now()} }`);
        
        try {
            let json = JSON.parse(msg);
            
            client.send(JSON.stringify({
                recipient: json.sender,
                payload: "This is some payload"
            }));
        } catch(e) {
            console.log("Unable to parse websocket message");
        }
	});

	client.on("close", function() {
		console.log(`[CLIENT DISCONNECTED]: { Timestamp: ${Date.now()}, IP: ${req.connection.remoteAddress} }`);
	});
});








const config = {
	user: "fuzzyknights",
	password: "fuzzyknights",
	server: "localhost",
	database: "FuzzyKnights"
};
const TSQLPool = new mssql.ConnectionPool(config)
	.connect()
	.then(pool => {
		console.log(`Connected to: [Server: ${ config.server }, Database: ${ config.database }]`);

		return pool;
	})
    .catch(err => console.log("Database Connection Failed! Bad Config: ", err));

app.get("/api/:schema", async (req, res) => {
    try {
        res.setHeader("Content-Type", "application/json");

		const pool = await TSQLPool;
		const result = await pool.request()
            .input("s", mssql.VarChar, req.params.schema)
            .query(`
            SELECT
                cols.SchemaName,
                cols.TableName,
                cols.ColumnName,
                cols.OrdinalPosition,
                cols.DataType,
                cols.DataTypeLength,
                cols.IsPrimaryKey,
                
                fkcols.FKSchemaName,
                fkcols.FKTableName,
                fkcols.FKColumnName,
                fkcols.FKOrdinalPosition,
                fkcols.FKDataType,
                fkcols.FKDataTypeLength
            FROM
                (
                    SELECT
                        s.name AS SchemaName,
                        o.name AS TableName,
                        c.name AS ColumnName,
                        c.colid AS OrdinalPosition,
                        UPPER(t.name) AS DataType,
                        c.[length] AS DataTypeLength,
                        CASE
                            WHEN pk.is_primary_key = 1 THEN 1
                            ELSE 0
                        END IsPrimaryKey
                    FROM
                        sysobjects o
                        INNER JOIN syscolumns c
                            ON o.id = c.id
                        INNER JOIN systypes t
                            ON c.xtype = t.xtype
                        INNER JOIN sys.tables tbl
                            ON o.id = tbl.object_id
                        INNER JOIN sys.schemas s
                            ON tbl.schema_id = s.schema_id
                        LEFT JOIN (
                            SELECT
                                i.object_id,
                                c.column_id,
                                i.is_primary_key
                            FROM
                                sys.indexes i
                                INNER JOIN sys.index_columns ic
                                    ON ic.object_id = i.object_id
                                    AND i.index_id = ic.index_id
                                INNER JOIN sys.columns c
                                    ON ic.column_id = c.column_id
                                    AND i.object_id = c.object_id
                            WHERE
                                i.is_primary_key = 1
                        ) pk
                            ON c.colid = pk.column_id
                            AND tbl.object_id = pk.object_id
                    WHERE
                        o.xtype = 'U'
                        AND t.[status] = 0
                ) cols
                LEFT JOIN (
                    SELECT
                        s.name AS SchemaName,
                        OBJECT_NAME(f.parent_object_id) AS TableName,
                        COL_NAME(fc.parent_object_id, fc.parent_column_id) AS ColumnName,
                        c.column_id AS OrdinalPosition,
                        UPPER(ty.name) AS DataType,
                        c.max_length AS DataTypeLength,
                        fks.name AS FKSchemaName,
                        OBJECT_NAME(f.referenced_object_id) AS FKTableName,
                        COL_NAME(fc.referenced_object_id, fc.referenced_column_id) AS FKColumnName,		
                        fkc.column_id AS FKOrdinalPosition,	
                        UPPER(fkty.name) AS FKDataType,
                        fkc.max_length AS FKDataTypeLength,
                        delete_referential_action_desc AS FKDeleteAction,
                        update_referential_action_desc AS FKUpdateAction
                    FROM
                        sys.foreign_keys f
                        INNER JOIN sys.foreign_key_columns fc
                            ON f.object_id = fc.constraint_object_id
                        INNER JOIN sys.tables t
                            ON f.parent_object_id = t.object_id
                        INNER JOIN sys.schemas s
                            ON t.schema_id = s.schema_id
                        INNER JOIN sys.columns c
                            ON t.object_id = c.object_id
                            AND c.column_id = fc.parent_column_id
                        INNER JOIN sys.types ty
                            ON c.user_type_id = ty.user_type_id
                            
                        INNER JOIN sys.tables fkt
                            ON fc.referenced_object_id = fkt.object_id
                        INNER JOIN sys.schemas fks
                            ON fkt.schema_id = fks.schema_id
                        INNER JOIN sys.columns fkc
                            ON fkt.object_id = fkc.object_id
                            AND fkc.column_id = fc.referenced_column_id
                        INNER JOIN sys.types fkty
                            ON fkc.user_type_id = fkty.user_type_id
                ) fkcols
                    ON cols.SchemaName = fkcols.SchemaName
                    AND cols.TableName = fkcols.TableName
                    AND cols.ColumnName = fkcols.ColumnName
            WHERE
                    cols.SchemaName = @s
            ORDER BY
                cols.TableName,
                cols.OrdinalPosition,
                fkcols.FKOrdinalPosition
            `);

		res.json(result.recordset);
	} catch (e) {
		res.status(500);
        res.send(e.message);
    }
});