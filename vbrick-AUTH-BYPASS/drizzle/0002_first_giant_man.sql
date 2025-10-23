CREATE TABLE `meetingNotes` (
	`id` varchar(64) NOT NULL,
	`accountId` varchar(64) NOT NULL,
	`meetingType` enum('Discovery','Demo','Technical Review','Executive Briefing','Follow-up','Negotiation','Other') NOT NULL,
	`meetingDate` timestamp NOT NULL,
	`attendees` json,
	`title` varchar(500) NOT NULL,
	`summary` text,
	`transcript` text,
	`keyTakeaways` json,
	`actionItems` json,
	`fileUrl` varchar(1000),
	`fileName` varchar(500),
	`fileType` varchar(100),
	`influencedAccountPlan` boolean DEFAULT false,
	`lastUsedInPlanGeneration` timestamp,
	`uploadedBy` varchar(64),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `meetingNotes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `account_idx` ON `meetingNotes` (`accountId`);--> statement-breakpoint
CREATE INDEX `meeting_date_idx` ON `meetingNotes` (`meetingDate`);