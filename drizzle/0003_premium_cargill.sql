ALTER TABLE `accountPlans` ADD `industry` varchar(255) DEFAULT 'Enterprise Video Platform';--> statement-breakpoint
ALTER TABLE `accountPlans` ADD `salesMethodology` enum('MEDDICC','SPICED','Command of the Message') DEFAULT 'MEDDICC';--> statement-breakpoint
ALTER TABLE `accountPlans` ADD `isOpportunity` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `accountPlans` ADD `salesMethodologyFields` json;--> statement-breakpoint
ALTER TABLE `accountPlans` ADD `opportunityDetails` json;