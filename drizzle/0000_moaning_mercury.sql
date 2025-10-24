CREATE TABLE `accountPlans` (
	`id` varchar(64) NOT NULL,
	`accountId` varchar(64) NOT NULL,
	`version` int NOT NULL DEFAULT 1,
	`companyOverview` text,
	`stakeholderMap` json,
	`painPoints` json,
	`persistentRisks` json,
	`solutionMapping` json,
	`opportunitySummary` text,
	`landExpandPlaybook` json,
	`mutualActionPlan` json,
	`businessImpact` json,
	`appendix` json,
	`generatedBy` varchar(64),
	`generatedAt` timestamp DEFAULT (now()),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `accountPlans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `accounts` (
	`id` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`industry` varchar(255),
	`website` varchar(500),
	`linkedinUrl` varchar(500),
	`description` text,
	`maxScore` int DEFAULT 0,
	`avgScore` int DEFAULT 0,
	`lastResearchedAt` timestamp,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `accounts_id` PRIMARY KEY(`id`),
	CONSTRAINT `accounts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `findings` (
	`id` varchar(64) NOT NULL,
	`accountId` varchar(64) NOT NULL,
	`category` enum('financial_risk','org_moves','tech_stack','competitive','marketing_events','employee_chatter','legal_regulatory','facilities_operations') NOT NULL,
	`title` varchar(500) NOT NULL,
	`summary` text NOT NULL,
	`sourceUrl` varchar(1000) NOT NULL,
	`sourceDate` timestamp NOT NULL,
	`sourceType` varchar(100) NOT NULL,
	`recencyScore` int NOT NULL,
	`authorityScore` int NOT NULL,
	`magnitudeScore` int NOT NULL,
	`relevanceScore` int NOT NULL,
	`corroborationScore` int NOT NULL,
	`compositeScore` int NOT NULL,
	`sentiment` enum('positive','neutral','negative') DEFAULT 'neutral',
	`tags` json,
	`whyItMatters` text,
	`isPersistent` boolean DEFAULT false,
	`firstSeenDate` timestamp,
	`persistenceRationale` text,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `findings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `researchJobs` (
	`id` varchar(64) NOT NULL,
	`accountId` varchar(64),
	`status` enum('pending','running','completed','failed') DEFAULT 'pending',
	`startedAt` timestamp,
	`completedAt` timestamp,
	`errorMessage` text,
	`findingsCount` int DEFAULT 0,
	`sourcesChecked` json,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `researchJobs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stakeholders` (
	`id` varchar(64) NOT NULL,
	`accountId` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`title` varchar(255),
	`department` varchar(255),
	`influence` enum('high','medium','low') DEFAULT 'medium',
	`currentPriorities` text,
	`linkedinUrl` varchar(500),
	`email` varchar(320),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `stakeholders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp DEFAULT (now()),
	`lastSignedIn` timestamp DEFAULT (now()),
	`recencyWeight` int NOT NULL DEFAULT 20,
	`authorityWeight` int NOT NULL DEFAULT 20,
	`magnitudeWeight` int NOT NULL DEFAULT 20,
	`relevanceWeight` int NOT NULL DEFAULT 20,
	`corroborationWeight` int NOT NULL DEFAULT 20,
	`highlightThreshold` int NOT NULL DEFAULT 70,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `account_idx` ON `accountPlans` (`accountId`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `findings` (`accountId`);--> statement-breakpoint
CREATE INDEX `category_idx` ON `findings` (`category`);--> statement-breakpoint
CREATE INDEX `score_idx` ON `findings` (`compositeScore`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `researchJobs` (`status`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `stakeholders` (`accountId`);