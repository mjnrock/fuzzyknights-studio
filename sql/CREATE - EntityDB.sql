USE FuzzyKnights
GO

--	CREATE SCHEMA Entity
--	GO

IF OBJECT_ID('Entity.EntityComponentValue') IS NOT NULL DROP TABLE Entity.EntityComponentValue;
IF OBJECT_ID('Entity.EntityComponent') IS NOT NULL DROP TABLE Entity.EntityComponent;
IF OBJECT_ID('Entity.Entity') IS NOT NULL DROP TABLE Entity.Entity;

IF OBJECT_ID('Entity.ConstructComponent') IS NOT NULL DROP TABLE Entity.ConstructComponent;
IF OBJECT_ID('Entity.Construct') IS NOT NULL DROP TABLE Entity.Construct;

IF OBJECT_ID('Entity.ComponentProperty') IS NOT NULL DROP TABLE Entity.ComponentProperty;
IF OBJECT_ID('Entity.Component') IS NOT NULL DROP TABLE Entity.Component;


IF OBJECT_ID('Entity.[M:DataType]') IS NOT NULL DROP TABLE Entity.[M:DataType];
IF OBJECT_ID('Entity.[M:Game]') IS NOT NULL DROP TABLE Entity.[M:Game];

--	=========================================================
--		LOCAL-TO-GLOBAL MAPPINGS
--	=========================================================
CREATE TABLE Entity.[M:DataType] (
	DataTypeID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	Code VARCHAR(25) NOT NULL,
	Label VARCHAR(255) NOT NULL,
	SQLDataType VARCHAR(255) NOT NULL,
	SQLPreceision VARCHAR(255) NOT NULL,
	
	UUID UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),

	CreatedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	ModifiedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	DeactivatedDateTimeUTC DATETIME2(3) NULL
);

CREATE TABLE Entity.[M:Game] (
	GameID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	
	UUID UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),

	CreatedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	ModifiedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	DeactivatedDateTimeUTC DATETIME2(3) NULL
);



--	=========================================================
--		TABLES
--	=========================================================
CREATE TABLE Entity.Component (
	ComponentID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	Name VARCHAR(255) NULL,
	
	UUID UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),

	CreatedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	ModifiedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	DeactivatedDateTimeUTC DATETIME2(3) NULL
);

CREATE TABLE Entity.ComponentProperty (
	ComponentPropertyID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	ComponentID INT NOT NULL FOREIGN KEY REFERENCES Entity.Component (ComponentID),
	Name VARCHAR(255) NULL,
	
	UUID UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),

	CreatedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	ModifiedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	DeactivatedDateTimeUTC DATETIME2(3) NULL
);


CREATE TABLE Entity.Construct (
	ConstructID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	Name VARCHAR(255) NULL,
	
	UUID UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),

	CreatedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	ModifiedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	DeactivatedDateTimeUTC DATETIME2(3) NULL
);


CREATE TABLE Entity.ConstructComponent (
	ConstructComponentID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	ConstructID INT NOT NULL FOREIGN KEY REFERENCES Entity.Construct (ConstructID),
	ComponentID INT NOT NULL FOREIGN KEY REFERENCES Entity.Component (ComponentID),
	
	UUID UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),

	CreatedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	ModifiedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	DeactivatedDateTimeUTC DATETIME2(3) NULL
);


CREATE TABLE Entity.Entity (
	EntityID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	ConstructID INT NOT NULL FOREIGN KEY REFERENCES Entity.Construct (ConstructID),
	GameID INT NOT NULL FOREIGN KEY REFERENCES Entity.[M:Game] (GameID),
	
	UUID UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),

	CreatedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	ModifiedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	DeactivatedDateTimeUTC DATETIME2(3) NULL
);

CREATE TABLE Entity.EntityComponent (
	EntityComponentID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	EntityID INT NOT NULL FOREIGN KEY REFERENCES Entity.Entity (EntityID),
	ComponentID INT NOT NULL FOREIGN KEY REFERENCES Entity.Component (ComponentID),
	
	UUID UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),

	CreatedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	ModifiedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	DeactivatedDateTimeUTC DATETIME2(3) NULL
);


CREATE TABLE Entity.EntityComponentValue (
	EntityComponentValueID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	EntityComponentID INT NOT NULL FOREIGN KEY REFERENCES Entity.EntityComponent (EntityComponentID),
	Value VARCHAR(MAX) NULL,
	
	UUID UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),

	CreatedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	ModifiedDateTimeUTC DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
	DeactivatedDateTimeUTC DATETIME2(3) NULL
);