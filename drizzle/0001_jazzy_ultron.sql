CREATE TABLE `counterplays` (
	`id` varchar(64) NOT NULL,
	`accountId` varchar(64) NOT NULL,
	`competitor` varchar(255) NOT NULL,
	`theirPlay` text NOT NULL,
	`ourCounterplay` text NOT NULL,
	`status` enum('Planned','Executing','Successful','Failed') DEFAULT 'Planned',
	`owner` varchar(64),
	`confidence` int DEFAULT 0,
	`evidenceLink` varchar(1000),
	`lastVerifiedAt` timestamp,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `counterplays_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hypotheses` (
	`id` varchar(64) NOT NULL,
	`accountId` varchar(64) NOT NULL,
	`hypothesis` text NOT NULL,
	`status` enum('Proposed','Testing','Validated','Invalidated') DEFAULT 'Proposed',
	`owner` varchar(64),
	`confidence` int DEFAULT 0,
	`evidenceLink` varchar(1000),
	`lastVerifiedAt` timestamp,
	`testPlan` text,
	`results` text,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `hypotheses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `linkValidations` (
	`id` varchar(64) NOT NULL,
	`url` varchar(1000) NOT NULL,
	`sourceType` varchar(100),
	`sourceId` varchar(64),
	`status` enum('Valid','Broken','Redirect','Paywall','NotChecked') DEFAULT 'NotChecked',
	`statusCode` int,
	`lastCheckedAt` timestamp,
	`nextCheckAt` timestamp,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `linkValidations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mapTasks` (
	`id` varchar(64) NOT NULL,
	`accountId` varchar(64) NOT NULL,
	`task` text NOT NULL,
	`owner` varchar(64),
	`accountOwner` varchar(255),
	`dueDate` timestamp,
	`status` enum('Not Started','In Progress','Blocked','Completed') DEFAULT 'Not Started',
	`stage` varchar(64),
	`isExitCriteria` boolean DEFAULT false,
	`artifactRequired` varchar(255),
	`artifactUrl` varchar(1000),
	`notes` text,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `mapTasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `objections` (
	`id` varchar(64) NOT NULL,
	`accountId` varchar(64) NOT NULL,
	`stakeholderId` varchar(64),
	`objection` text NOT NULL,
	`category` enum('Price','Features','Security','Integration','Support','Timing','Vendor Risk') NOT NULL,
	`status` enum('Raised','Addressed','Resolved','Unresolved') DEFAULT 'Raised',
	`owner` varchar(64),
	`response` text,
	`confidence` int DEFAULT 0,
	`evidenceLink` varchar(1000),
	`lastVerifiedAt` timestamp,
	`raisedAt` timestamp DEFAULT (now()),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `objections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pains` (
	`id` varchar(64) NOT NULL,
	`accountId` varchar(64) NOT NULL,
	`description` text NOT NULL,
	`status` enum('Identified','Validated','Addressed','Dismissed') DEFAULT 'Identified',
	`owner` varchar(64),
	`confidence` int DEFAULT 0,
	`evidenceLink` varchar(1000),
	`lastVerifiedAt` timestamp,
	`vbrickPillar` varchar(255),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `pains_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `paperProcess` (
	`id` varchar(64) NOT NULL,
	`accountId` varchar(64) NOT NULL,
	`processType` enum('Legal Review','Security Review','Procurement','DPA','DPIA','Redlines') NOT NULL,
	`status` enum('Not Started','In Progress','Blocked','Approved','Rejected') DEFAULT 'Not Started',
	`approver` varchar(255),
	`dueDate` timestamp,
	`fastPath` boolean DEFAULT false,
	`documentUrl` varchar(1000),
	`notes` text,
	`blockers` text,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `paperProcess_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pilotAnalytics` (
	`id` varchar(64) NOT NULL,
	`pilotPlanId` varchar(64) NOT NULL,
	`accountId` varchar(64) NOT NULL,
	`avgJoinTime` int,
	`avgBufferRate` int,
	`dropRate` int,
	`usageByRegion` json,
	`usageByDevice` json,
	`usageByBrowser` json,
	`ecdnOffloadPercent` int,
	`bandwidthSaved` int,
	`supportTicketsBefore` int,
	`supportTicketsAfter` int,
	`engagementLift` int,
	`recordedAt` timestamp DEFAULT (now()),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `pilotAnalytics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pilotPlans` (
	`id` varchar(64) NOT NULL,
	`accountId` varchar(64) NOT NULL,
	`pilotName` varchar(255) NOT NULL,
	`status` enum('Planned','Running','Completed','Cancelled') DEFAULT 'Planned',
	`startDate` timestamp,
	`endDate` timestamp,
	`winCriteria` json,
	`testScripts` text,
	`dataCaptureplan` text,
	`participantCount` int,
	`successRate` int,
	`npsScore` int,
	`sowUrl` varchar(1000),
	`resultsUrl` varchar(1000),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `pilotPlans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `risks` (
	`id` varchar(64) NOT NULL,
	`accountId` varchar(64) NOT NULL,
	`description` text NOT NULL,
	`category` enum('Technical','Budget','Timeline','Competition','Political','Security','Legal') NOT NULL,
	`severity` enum('Low','Medium','High','Critical') DEFAULT 'Medium',
	`status` enum('Active','Mitigated','Accepted','Resolved') DEFAULT 'Active',
	`owner` varchar(64),
	`mitigation` text,
	`dueDate` timestamp,
	`confidence` int DEFAULT 0,
	`evidenceLink` varchar(1000),
	`lastVerifiedAt` timestamp,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `risks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `signals` (
	`id` varchar(64) NOT NULL,
	`accountId` varchar(64) NOT NULL,
	`description` text NOT NULL,
	`signalType` enum('Budget Allocated','RFP Issued','Stakeholder Engaged','Competitor Weakness','Urgency Expressed','Technical Validation') NOT NULL,
	`status` enum('New','Acknowledged','Actioned') DEFAULT 'New',
	`owner` varchar(64),
	`confidence` int DEFAULT 0,
	`evidenceLink` varchar(1000),
	`lastVerifiedAt` timestamp,
	`detectedAt` timestamp DEFAULT (now()),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `signals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tests` (
	`id` varchar(64) NOT NULL,
	`accountId` varchar(64) NOT NULL,
	`testName` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`status` enum('Planned','In Progress','Completed','Cancelled') DEFAULT 'Planned',
	`owner` varchar(64),
	`successCriteria` text,
	`results` text,
	`confidence` int DEFAULT 0,
	`evidenceLink` varchar(1000),
	`lastVerifiedAt` timestamp,
	`startDate` timestamp,
	`endDate` timestamp,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `tests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `validations` (
	`id` varchar(64) NOT NULL,
	`accountId` varchar(64) NOT NULL,
	`claim` text NOT NULL,
	`status` enum('Pending','Validated','Rejected') DEFAULT 'Pending',
	`owner` varchar(64),
	`confidence` int DEFAULT 0,
	`evidenceLink` varchar(1000) NOT NULL,
	`lastVerifiedAt` timestamp NOT NULL,
	`validationMethod` varchar(255),
	`notes` text,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `validations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `accounts` ADD `isOpportunity` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `accounts` ADD `opportunityStage` enum('Prospect','Qualify','Validate','Pilot','Propose','Commit','Closed Won','Closed Lost');--> statement-breakpoint
ALTER TABLE `accounts` ADD `forecastCategory` enum('Omit','Pipeline','BestCase','Commit');--> statement-breakpoint
ALTER TABLE `accounts` ADD `closeDate` timestamp;--> statement-breakpoint
ALTER TABLE `accounts` ADD `dealOwner` varchar(64);--> statement-breakpoint
ALTER TABLE `accounts` ADD `arrEstimate` int;--> statement-breakpoint
ALTER TABLE `accounts` ADD `primaryUseCase` enum('InternalComms','Training','SecureR&D','ExternalWebinars');--> statement-breakpoint
ALTER TABLE `accounts` ADD `competitor` enum('Teams','Zoom','Webex','Kollective','Hive','Akamai','Other');--> statement-breakpoint
ALTER TABLE `accounts` ADD `confidence` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `accounts` ADD `nextStep` text;--> statement-breakpoint
ALTER TABLE `accounts` ADD `nextStepDue` timestamp;--> statement-breakpoint
ALTER TABLE `accounts` ADD `intelFreshnessScore` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `accounts` ADD `linkValidityRate` int DEFAULT 100;--> statement-breakpoint
ALTER TABLE `accounts` ADD `mapCompletenessScore` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `accounts` ADD `needsSecurityReview` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `accounts` ADD `needsPaperProcess` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `accounts` ADD `hasPilotPlan` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `findings` ADD `evidenceLink` varchar(1000);--> statement-breakpoint
ALTER TABLE `findings` ADD `lastVerifiedAt` timestamp;--> statement-breakpoint
ALTER TABLE `stakeholders` ADD `role` enum('economic_buyer','technical_approver','influencer','blocker','champion','user');--> statement-breakpoint
ALTER TABLE `stakeholders` ADD `phone` varchar(50);--> statement-breakpoint
ALTER TABLE `stakeholders` ADD `lastContactDate` timestamp;--> statement-breakpoint
ALTER TABLE `stakeholders` ADD `nextFollowUpDate` timestamp;--> statement-breakpoint
ALTER TABLE `stakeholders` ADD `relationshipStrength` int DEFAULT 0;--> statement-breakpoint
CREATE INDEX `account_idx` ON `counterplays` (`accountId`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `hypotheses` (`accountId`);--> statement-breakpoint
CREATE INDEX `url_idx` ON `linkValidations` (`url`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `linkValidations` (`status`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `mapTasks` (`accountId`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `mapTasks` (`status`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `objections` (`accountId`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `pains` (`accountId`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `paperProcess` (`accountId`);--> statement-breakpoint
CREATE INDEX `pilot_idx` ON `pilotAnalytics` (`pilotPlanId`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `pilotAnalytics` (`accountId`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `pilotPlans` (`accountId`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `risks` (`accountId`);--> statement-breakpoint
CREATE INDEX `severity_idx` ON `risks` (`severity`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `signals` (`accountId`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `tests` (`accountId`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `validations` (`accountId`);