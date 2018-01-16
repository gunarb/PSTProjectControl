USE master;
GO
-- Create PSTProjectControl Data Base
CREATE DATABASE PSTProjectControl;
GO
USE PSTProjectControl;

-- Create Type Request Table
CREATE TABLE TypeRequest(
	uniqueId int NOT NULL IDENTITY PRIMARY KEY,
	request varchar(30) NOT NULL
);
-- Create Project Status Table
CREATE TABLE ProjectStatus(
	uniqueId int NOT NULL IDENTITY PRIMARY KEY,
	status varchar(30) NOT NULL
);
-- Create Work Order Table
CREATE TABLE WorkOrder (
	uniqueId int NOT NULL IDENTITY PRIMARY KEY,
	author varchar(50) NULL,
	date date NULL,
	idTypeRequest int NOT NULL,
	projectName varchar(50) NULL,
	referencePreviousJob int NULL,
	agencyPM varchar(50) NULL,
	agencyAccountDirector varchar(50) NULL,
	brandManager varchar(50) NULL,
	prodigiousPM varchar(50) NULL,
	jiraParentUrl varchar(50) NULL,
	idProjectStatus int NOT NULL,
	idProjectDescription int NULL,
	CONSTRAINT FK_WorkOrder_TypeRequest FOREIGN KEY (idTypeRequest)
	REFERENCES TypeRequest (uniqueId),
	CONSTRAINT FK_WorkOrder_ProjectStatus FOREIGN KEY (idProjectStatus)
	REFERENCES ProjectStatus (uniqueId)
);
-- Create Project Description Table
CREATE TABLE ProjectDescription (
	uniqueId int NOT NULL IDENTITY PRIMARY KEY,
	projectDescription varchar(max) NULL,
	kickOffDate date NULL,
	liveDate date NULL,
	targetDevice varchar(max) NULL,
	platform varchar(50) NULL,
	seoAnalytics varchar(50) NULL,
	additionalComments varchar(max) NULL,
	idWorkOrder int NOT NULL,
	CONSTRAINT FK_ProjectDescription_WorkOrder FOREIGN KEY (idWorkOrder)
	REFERENCES WorkOrder (uniqueId)
);
-- Add ProjectDescription.uniqueId as FOREIGN KEY to WorkOrder
Alter TABLE WorkOrder WITH CHECK add CONSTRAINT FK_WorkOrder_ProjectDescription FOREIGN KEY (idProjectDescription) REFERENCES ProjectDescription (uniqueId);
-- Create Domains Table
CREATE TABLE Domains (
	uniqueId int NOT NULL IDENTITY PRIMARY KEY,
	domain varchar(50) NOT NULL,
	idProjectDescription int NOT NULL,
	CONSTRAINT FK_Domains_ProjectDescription FOREIGN KEY (idProjectDescription)
	REFERENCES ProjectDescription (uniqueId)
);
-- Create Effected URL Table
CREATE TABLE EffectedURL (
	uniqueId int NOT NULL IDENTITY PRIMARY KEY,
	url varchar(MAX) NOT NULL,
	idProjectDescription int NOT NULL,
	CONSTRAINT FK_EffectedURL_ProjectDescription FOREIGN KEY (idProjectDescription)
	REFERENCES ProjectDescription (uniqueId)
);
-- Create Third Party Credentials Table
CREATE TABLE ThirdPartyCredentials (
	uniqueId int NOT NULL IDENTITY PRIMARY KEY,
	url VARCHAR(MAX) NOT NULL,
	userName varchar(50) NOT NULL,
	password varchar(50) NOT NULL,
	idProjectDescription int NOT NULL,
	CONSTRAINT FK_ThirdPartyCredentials_ProjectDescription FOREIGN KEY (idProjectDescription)
	REFERENCES ProjectDescription (uniqueId)
);
-- Create Assets List Table
CREATE TABLE AssetsList (
	uniqueId int NOT NULL IDENTITY PRIMARY KEY,
	asset varchar(50) NOT NULL,
);
-- Create Asset Project Table
CREATE TABLE AssetProject (
	uniqueId int NOT NULL IDENTITY PRIMARY KEY,
	idProjectDescription int NULL,
	idAssetsList int NULL,
	value VARCHAR(50) NULL,
	CONSTRAINT FK_AssetProject_ProjectDescription FOREIGN KEY (idProjectDescription)
	REFERENCES ProjectDescription (uniqueId),
	CONSTRAINT FK_AssetProject_AssetsList FOREIGN KEY (idAssetsList)
	REFERENCES AssetsList (uniqueId)
);
-- Create Users Table
CREATE TABLE Users (
	uniqueId int NOT NULL IDENTITY PRIMARY KEY,
	name varchar(50) NOT NULL,
    userName varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    permissionAccess varchar(25) NULL,
	idWorkOrder int NULL,
	CONSTRAINT FK_Users_WorkOrder FOREIGN KEY (idWorkOrder)
	REFERENCES WorkOrder (uniqueId)
);
GO

CREATE VIEW vw_workOrder_description
AS
	SELECT wo.*, tr.request, ps.status, pd.projectDescription, pd.kickOffDate, pd.liveDate, pd.targetDevice, pd.platform, pd.seoAnalytics, pd.additionalComments
	FROM WorkOrder wo
	INNER JOIN TypeRequest tr ON wo.idTypeRequest = tr.uniqueId
	LEFT JOIN ProjectStatus ps ON wo.idProjectStatus = ps.uniqueId
	LEFT JOIN ProjectDescription pd ON wo.idProjectDescription = pd.uniqueId
GO

INSERT INTO TypeRequest (request) VALUES ('Web Development');
INSERT INTO TypeRequest (request) VALUES ('Print');
INSERT INTO TypeRequest (request) VALUES ('Banners');
INSERT INTO TypeRequest (request) VALUES ('Other');
INSERT INTO ProjectStatus (status) VALUES ('Starting');
INSERT INTO ProjectStatus (status) VALUES ('In Progress');
INSERT INTO ProjectStatus (status) VALUES ('Completed');
INSERT INTO ProjectStatus (status) VALUES ('Not Completed');
INSERT INTO AssetsList (asset) VALUES ('Work Order');
INSERT INTO AssetsList (asset) VALUES ('Copy Doc (Approved by Client and CLient Legal)');
INSERT INTO AssetsList (asset) VALUES ('Storyboard Frames (PDF)');
INSERT INTO AssetsList (asset) VALUES ('Link Matrix');
INSERT INTO AssetsList (asset) VALUES ('Layer Comps and Licensed Images PSDs Files');
INSERT INTO AssetsList (asset) VALUES ('Font Names');
INSERT INTO AssetsList (asset) VALUES ('Vector Files');
INSERT INTO AssetsList (asset) VALUES ('Video Assets');
INSERT INTO AssetsList (asset) VALUES ('Animation Notes');
INSERT INTO AssetsList (asset) VALUES ('Tagging Request / Documentation');
INSERT INTO AssetsList (asset) VALUES ('SEO Content');
INSERT INTO AssetsList (asset) VALUES ('UI/UX Document / Wireframes');
INSERT INTO WorkOrder (date, idTypeRequest, projectName, idProjectStatus) VALUES ('1/9/2018', 1, 'Test Project', 1);
INSERT INTO Users (name, userName, password) VALUES ('Administrator', 'admin', 'admin');
INSERT INTO ProjectDescription (projectDescription, kickOffDate, liveDate, targetDevice, platform, seoAnalytics, additionalComments, idWorkOrder)
	VALUES(
		'This is a test project for the development of PST Project Control',
		CAST('2018-1-31' AS DATE),
		CAST('2018-4-30' AS DATE),
		'Chrome;Firefox;iOS;Android;IE11;',
		'Windows',
		'Google Analytics',
		'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.');
INSERT INTO Domains (domain, idProjectDescription) VALUES ('http://www.oscarmayer.com', 1);
INSERT INTO Domains (domain, idProjectDescription) VALUES ('http://www.crystallight.com', 1);
INSERT INTO EffectedURL (url, idProjectDescription) VALUES ('http://www.oscarmayer.com', 1);
INSERT INTO EffectedURL (url, idProjectDescription) VALUES ('http://www.oscarmayer.com/our-products', 1);
INSERT INTO EffectedURL (url, idProjectDescription) VALUES ('http://www.oscarmayer.com/our-story', 1);
INSERT INTO EffectedURL (url, idProjectDescription) VALUES ('http://www.oscarmayer.com/wienermobile', 1);