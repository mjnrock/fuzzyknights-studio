USE FuzzyKnights
GO

--	CREATE SCHEMA Render
--	GO

IF OBJECT_ID('Render.Step') IS NOT NULL DROP TABLE Render.Step;
IF OBJECT_ID('Render.Sequence') IS NOT NULL DROP TABLE Render.[Sequence];

IF OBJECT_ID('Render.Image') IS NOT NULL DROP TABLE Render.[Image];

IF OBJECT_ID('Render.Property') IS NOT NULL DROP TABLE Render.Property;
IF OBJECT_ID('Render.Domain') IS NOT NULL DROP TABLE Render.Domain;


--	=========================================================
--		TABLES
--	=========================================================
CREATE TABLE Render.Domain (
	DomainID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	ParentDomainID INT NULL FOREIGN KEY REFERENCES Render.Domain (DomainID),
	
	Code VARCHAR(25) NOT NULL,
	Label VARCHAR(255) NULL,
	
	UUID UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),

	CreatedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	ModifiedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	DeactivatedDateTimeUTC DATETIME2(3) NULL
);
INSERT INTO Render.Domain (ParentDomainID, Code, Label)
VALUES
	(NULL, 'CONSTRUCT', 'Construct'),
	(1, 'STATE', 'State'),
	(2, 'CONDITION', 'Condition'),
	(3, 'ELEMENT', 'Element'),
	(4, 'VARIANT', 'Variant'),
	(5, 'DIRECTION', 'Direction');

CREATE TABLE Render.Property (
	PropertyID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	DomainID INT NOT NULL FOREIGN KEY REFERENCES Render.Domain (DomainID),
	
	Name VARCHAR(255) NOT NULL,
	Label NVARCHAR(255) NULL,
	ParentPropertyID INT NULL FOREIGN KEY REFERENCES Render.Property (PropertyID),
	
	UUID UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),

	CreatedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	ModifiedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	DeactivatedDateTimeUTC DATETIME2(3) NULL
);



CREATE TABLE Render.[Image] (
	ImageID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	PropertyID INT NOT NULL FOREIGN KEY REFERENCES Render.Property (PropertyID),

	[Image] VARBINARY(MAX) NOT NULL,
	Name VARCHAR(MAX) NULL,
	Label NVARCHAR(MAX) NULL,
	
	UUID UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),

	CreatedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	ModifiedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	DeactivatedDateTimeUTC DATETIME2(3) NULL
);



CREATE TABLE Render.[Sequence] (
	SequenceID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	PropertyID INT NOT NULL FOREIGN KEY REFERENCES Render.Property (PropertyID),
	Label NVARCHAR(255) NULL,
	
	UUID UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),

	CreatedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	ModifiedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	DeactivatedDateTimeUTC DATETIME2(3) NULL
);

CREATE TABLE Render.Step (
	StepID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	SequenceID INT NOT NULL FOREIGN KEY REFERENCES Render.[Sequence] (SequenceID),
	ImageID INT NOT NULL FOREIGN KEY REFERENCES Render.[Image] (ImageID),
	Duration INT NOT NULL DEFAULT 0,
	Step INT NOT NULL DEFAULT 1,
	SubStep INT NOT NULL DEFAULT 1,
	
	UUID UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),

	CreatedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	ModifiedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	DeactivatedDateTimeUTC DATETIME2(3) NULL
);




--	=========================================================
--		NOTES
--	=========================================================
--	** Convert VARBINARY to JS Image **
--	-----------------------------------
--		Resolved It was difficult until I studied how Encoding/Decoding and varbinary works.
--		Solution : Images were stored as hexadecimal numbers representation of base64 encoded string in Sql server as data type varbinary. While fetching record node.js mssql library converts the hexadecimal numbers into javascript buffer(This buffer is of base64 encoded string and not actual image). Then I converted this buffer back to base64 encoded string of image like..
--		var originalBase64ImageStr = new Buffer(resultSet[0].Image).toString('utf8');
--		Then created converted back to actual image buffer like..
--		var decodedImage = new Buffer(originalBase64ImageStr , 'base64')

--		fs.writeFile(__dirname+'/../public/images/img3.jpg', decodedImage, function(err, data){
--		            if (err) throw err;
--		        console.log('It\'s saved!');
--		            cb(data);
--		    });
--		Note: Node.js mssql library works differently for string representation of varbinary(returned buffer is representation of original string so no need to follow above steps) and image/doc representation of varbinary(returned buffer is representation of base64 encoded string and need to follow above steps). 
--	-----------------------------------