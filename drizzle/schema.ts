import { mysqlEnum, mysqlTable, text, timestamp, varchar, int, boolean, json, index, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
  
  // User-specific scoring thresholds
  recencyWeight: int("recencyWeight").default(20).notNull(),
  authorityWeight: int("authorityWeight").default(20).notNull(),
  magnitudeWeight: int("magnitudeWeight").default(20).notNull(),
  relevanceWeight: int("relevanceWeight").default(20).notNull(),
  corroborationWeight: int("corroborationWeight").default(20).notNull(),
  highlightThreshold: int("highlightThreshold").default(70).notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Target accounts to research
 */
export const accounts = mysqlTable("accounts", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  industry: varchar("industry", { length: 255 }),
  website: varchar("website", { length: 500 }),
  linkedinUrl: varchar("linkedinUrl", { length: 500 }),
  description: text("description"),
  
  // Aggregate scores
  maxScore: int("maxScore").default(0),
  avgScore: int("avgScore").default(0),
  
  // Opportunity fields
  isOpportunity: boolean("isOpportunity").default(false),
  opportunityStage: mysqlEnum("opportunityStage", [
    "Prospect",
    "Qualify", 
    "Validate",
    "Pilot",
    "Propose",
    "Commit",
    "Closed Won",
    "Closed Lost"
  ]),
  forecastCategory: mysqlEnum("forecastCategory", ["Omit", "Pipeline", "BestCase", "Commit"]),
  closeDate: timestamp("closeDate"),
  dealOwner: varchar("dealOwner", { length: 64 }), // User ID reference
  arrEstimate: int("arrEstimate"), // Store as cents to avoid decimal issues
  primaryUseCase: mysqlEnum("primaryUseCase", [
    "InternalComms",
    "Training",
    "SecureR&D",
    "ExternalWebinars"
  ]),
  competitor: mysqlEnum("competitor", [
    "Teams",
    "Zoom",
    "Webex",
    "Kollective",
    "Hive",
    "Akamai",
    "Other"
  ]),
  confidence: int("confidence").default(0), // 0-100
  nextStep: text("nextStep"),
  nextStepDue: timestamp("nextStepDue"),
  
  // Computed fields (updated by background jobs)
  intelFreshnessScore: int("intelFreshnessScore").default(0), // 0-100
  linkValidityRate: int("linkValidityRate").default(100), // 0-100 (percentage)
  mapCompletenessScore: int("mapCompletenessScore").default(0), // 0-100
  needsSecurityReview: boolean("needsSecurityReview").default(false),
  needsPaperProcess: boolean("needsPaperProcess").default(false),
  hasPilotPlan: boolean("hasPilotPlan").default(false),
  
  // Metadata
  lastResearchedAt: timestamp("lastResearchedAt"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Account = typeof accounts.$inferSelect;
export type InsertAccount = typeof accounts.$inferInsert;

/**
 * Research findings organized by tile categories
 */
export const findings = mysqlTable("findings", {
  id: varchar("id", { length: 64 }).primaryKey(),
  accountId: varchar("accountId", { length: 64 }).notNull(),
  
  // Tile category (1-8)
  category: mysqlEnum("category", [
    "financial_risk",
    "org_moves",
    "tech_stack",
    "competitive",
    "marketing_events",
    "employee_chatter",
    "legal_regulatory",
    "facilities_operations"
  ]).notNull(),
  
  // Content
  title: varchar("title", { length: 500 }).notNull(),
  summary: text("summary").notNull(),
  sourceUrl: varchar("sourceUrl", { length: 1000 }).notNull(),
  sourceDate: timestamp("sourceDate").notNull(),
  sourceType: varchar("sourceType", { length: 100 }).notNull(), // LinkedIn, SEC, News, etc.
  
  // Scoring components (0-20 each)
  recencyScore: int("recencyScore").notNull(),
  authorityScore: int("authorityScore").notNull(),
  magnitudeScore: int("magnitudeScore").notNull(),
  relevanceScore: int("relevanceScore").notNull(),
  corroborationScore: int("corroborationScore").notNull(),
  compositeScore: int("compositeScore").notNull(), // Sum of above
  
  // Metadata
  sentiment: mysqlEnum("sentiment", ["positive", "neutral", "negative"]).default("neutral"),
  tags: json("tags").$type<string[]>(),
  whyItMatters: text("whyItMatters"), // Relevance to VBrick
  isPersistent: boolean("isPersistent").default(false), // 5-year persistence flag
  firstSeenDate: timestamp("firstSeenDate"), // For persistent items
  persistenceRationale: text("persistenceRationale"),
  
  // Evidence tracking
  evidenceLink: varchar("evidenceLink", { length: 1000 }),
  lastVerifiedAt: timestamp("lastVerifiedAt"),
  
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
  categoryIdx: index("category_idx").on(table.category),
  scoreIdx: index("score_idx").on(table.compositeScore),
}));

export type Finding = typeof findings.$inferSelect;
export type InsertFinding = typeof findings.$inferInsert;

/**
 * Stakeholders identified for each account
 */
export const stakeholders = mysqlTable("stakeholders", {
  id: varchar("id", { length: 64 }).primaryKey(),
  accountId: varchar("accountId", { length: 64 }).notNull(),
  
  name: varchar("name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }),
  department: varchar("department", { length: 255 }),
  
  // Role-based mapping
  role: mysqlEnum("role", [
    "economic_buyer",
    "technical_approver",
    "influencer",
    "blocker",
    "champion",
    "user"
  ]),
  influence: mysqlEnum("influence", ["high", "medium", "low"]).default("medium"),
  
  currentPriorities: text("currentPriorities"),
  linkedinUrl: varchar("linkedinUrl", { length: 500 }),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 50 }),
  
  // Engagement tracking
  lastContactDate: timestamp("lastContactDate"),
  nextFollowUpDate: timestamp("nextFollowUpDate"),
  relationshipStrength: int("relationshipStrength").default(0), // 0-100
  
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
}));

export type Stakeholder = typeof stakeholders.$inferSelect;
export type InsertStakeholder = typeof stakeholders.$inferInsert;

/**
 * Pain points identified for accounts
 */
export const pains = mysqlTable("pains", {
  id: varchar("id", { length: 64 }).primaryKey(),
  accountId: varchar("accountId", { length: 64 }).notNull(),
  
  description: text("description").notNull(),
  status: mysqlEnum("status", ["Identified", "Validated", "Addressed", "Dismissed"]).default("Identified"),
  owner: varchar("owner", { length: 64 }), // User ID
  confidence: int("confidence").default(0), // 0-100
  evidenceLink: varchar("evidenceLink", { length: 1000 }),
  lastVerifiedAt: timestamp("lastVerifiedAt"),
  
  // VBrick pillar mapping
  vbrickPillar: varchar("vbrickPillar", { length: 255 }),
  
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
}));

export type Pain = typeof pains.$inferSelect;
export type InsertPain = typeof pains.$inferInsert;

/**
 * Hypotheses about account needs
 */
export const hypotheses = mysqlTable("hypotheses", {
  id: varchar("id", { length: 64 }).primaryKey(),
  accountId: varchar("accountId", { length: 64 }).notNull(),
  
  hypothesis: text("hypothesis").notNull(),
  status: mysqlEnum("status", ["Proposed", "Testing", "Validated", "Invalidated"]).default("Proposed"),
  owner: varchar("owner", { length: 64 }),
  confidence: int("confidence").default(0),
  evidenceLink: varchar("evidenceLink", { length: 1000 }),
  lastVerifiedAt: timestamp("lastVerifiedAt"),
  
  testPlan: text("testPlan"),
  results: text("results"),
  
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
}));

export type Hypothesis = typeof hypotheses.$inferSelect;
export type InsertHypothesis = typeof hypotheses.$inferInsert;

/**
 * Validations of claims or assumptions
 */
export const validations = mysqlTable("validations", {
  id: varchar("id", { length: 64 }).primaryKey(),
  accountId: varchar("accountId", { length: 64 }).notNull(),
  
  claim: text("claim").notNull(),
  status: mysqlEnum("status", ["Pending", "Validated", "Rejected"]).default("Pending"),
  owner: varchar("owner", { length: 64 }),
  confidence: int("confidence").default(0),
  evidenceLink: varchar("evidenceLink", { length: 1000 }).notNull(), // Required
  lastVerifiedAt: timestamp("lastVerifiedAt").notNull(), // Required
  
  validationMethod: varchar("validationMethod", { length: 255 }),
  notes: text("notes"),
  
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
}));

export type Validation = typeof validations.$inferSelect;
export type InsertValidation = typeof validations.$inferInsert;

/**
 * Deal risks and mitigations
 */
export const risks = mysqlTable("risks", {
  id: varchar("id", { length: 64 }).primaryKey(),
  accountId: varchar("accountId", { length: 64 }).notNull(),
  
  description: text("description").notNull(),
  category: mysqlEnum("category", [
    "Technical",
    "Budget",
    "Timeline",
    "Competition",
    "Political",
    "Security",
    "Legal"
  ]).notNull(),
  severity: mysqlEnum("severity", ["Low", "Medium", "High", "Critical"]).default("Medium"),
  status: mysqlEnum("status", ["Active", "Mitigated", "Accepted", "Resolved"]).default("Active"),
  
  owner: varchar("owner", { length: 64 }),
  mitigation: text("mitigation"),
  dueDate: timestamp("dueDate"),
  confidence: int("confidence").default(0),
  evidenceLink: varchar("evidenceLink", { length: 1000 }),
  lastVerifiedAt: timestamp("lastVerifiedAt"),
  
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
  severityIdx: index("severity_idx").on(table.severity),
}));

export type Risk = typeof risks.$inferSelect;
export type InsertRisk = typeof risks.$inferInsert;

/**
 * Buying signals detected
 */
export const signals = mysqlTable("signals", {
  id: varchar("id", { length: 64 }).primaryKey(),
  accountId: varchar("accountId", { length: 64 }).notNull(),
  
  description: text("description").notNull(),
  signalType: mysqlEnum("signalType", [
    "Budget Allocated",
    "RFP Issued",
    "Stakeholder Engaged",
    "Competitor Weakness",
    "Urgency Expressed",
    "Technical Validation"
  ]).notNull(),
  status: mysqlEnum("status", ["New", "Acknowledged", "Actioned"]).default("New"),
  
  owner: varchar("owner", { length: 64 }),
  confidence: int("confidence").default(0),
  evidenceLink: varchar("evidenceLink", { length: 1000 }),
  lastVerifiedAt: timestamp("lastVerifiedAt"),
  
  detectedAt: timestamp("detectedAt").defaultNow(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
}));

export type Signal = typeof signals.$inferSelect;
export type InsertSignal = typeof signals.$inferInsert;

/**
 * Tests to validate hypotheses or capabilities
 */
export const tests = mysqlTable("tests", {
  id: varchar("id", { length: 64 }).primaryKey(),
  accountId: varchar("accountId", { length: 64 }).notNull(),
  
  testName: varchar("testName", { length: 255 }).notNull(),
  description: text("description").notNull(),
  status: mysqlEnum("status", ["Planned", "In Progress", "Completed", "Cancelled"]).default("Planned"),
  
  owner: varchar("owner", { length: 64 }),
  successCriteria: text("successCriteria"),
  results: text("results"),
  confidence: int("confidence").default(0),
  evidenceLink: varchar("evidenceLink", { length: 1000 }),
  lastVerifiedAt: timestamp("lastVerifiedAt"),
  
  startDate: timestamp("startDate"),
  endDate: timestamp("endDate"),
  
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
}));

export type Test = typeof tests.$inferSelect;
export type InsertTest = typeof tests.$inferInsert;

/**
 * Objections raised by stakeholders
 */
export const objections = mysqlTable("objections", {
  id: varchar("id", { length: 64 }).primaryKey(),
  accountId: varchar("accountId", { length: 64 }).notNull(),
  stakeholderId: varchar("stakeholderId", { length: 64 }),
  
  objection: text("objection").notNull(),
  category: mysqlEnum("category", [
    "Price",
    "Features",
    "Security",
    "Integration",
    "Support",
    "Timing",
    "Vendor Risk"
  ]).notNull(),
  status: mysqlEnum("status", ["Raised", "Addressed", "Resolved", "Unresolved"]).default("Raised"),
  
  owner: varchar("owner", { length: 64 }),
  response: text("response"),
  confidence: int("confidence").default(0),
  evidenceLink: varchar("evidenceLink", { length: 1000 }),
  lastVerifiedAt: timestamp("lastVerifiedAt"),
  
  raisedAt: timestamp("raisedAt").defaultNow(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
}));

export type Objection = typeof objections.$inferSelect;
export type InsertObjection = typeof objections.$inferInsert;

/**
 * Competitive counterplays
 */
export const counterplays = mysqlTable("counterplays", {
  id: varchar("id", { length: 64 }).primaryKey(),
  accountId: varchar("accountId", { length: 64 }).notNull(),
  
  competitor: varchar("competitor", { length: 255 }).notNull(),
  theirPlay: text("theirPlay").notNull(),
  ourCounterplay: text("ourCounterplay").notNull(),
  status: mysqlEnum("status", ["Planned", "Executing", "Successful", "Failed"]).default("Planned"),
  
  owner: varchar("owner", { length: 64 }),
  confidence: int("confidence").default(0),
  evidenceLink: varchar("evidenceLink", { length: 1000 }),
  lastVerifiedAt: timestamp("lastVerifiedAt"),
  
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
}));

export type Counterplay = typeof counterplays.$inferSelect;
export type InsertCounterplay = typeof counterplays.$inferInsert;

/**
 * Mutual Action Plan tasks
 */
export const mapTasks = mysqlTable("mapTasks", {
  id: varchar("id", { length: 64 }).primaryKey(),
  accountId: varchar("accountId", { length: 64 }).notNull(),
  
  task: text("task").notNull(),
  owner: varchar("owner", { length: 64 }), // VBrick owner
  accountOwner: varchar("accountOwner", { length: 255 }), // Customer owner
  dueDate: timestamp("dueDate"),
  status: mysqlEnum("status", ["Not Started", "In Progress", "Blocked", "Completed"]).default("Not Started"),
  
  stage: varchar("stage", { length: 64 }), // Which opportunity stage this gates
  isExitCriteria: boolean("isExitCriteria").default(false),
  artifactRequired: varchar("artifactRequired", { length: 255 }),
  artifactUrl: varchar("artifactUrl", { length: 1000 }),
  
  notes: text("notes"),
  
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  completedAt: timestamp("completedAt"),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
  statusIdx: index("status_idx").on(table.status),
}));

export type MapTask = typeof mapTasks.$inferSelect;
export type InsertMapTask = typeof mapTasks.$inferInsert;

/**
 * Paper process (legal/security/procurement) tracking
 */
export const paperProcess = mysqlTable("paperProcess", {
  id: varchar("id", { length: 64 }).primaryKey(),
  accountId: varchar("accountId", { length: 64 }).notNull(),
  
  processType: mysqlEnum("processType", [
    "Legal Review",
    "Security Review",
    "Procurement",
    "DPA",
    "DPIA",
    "Redlines"
  ]).notNull(),
  status: mysqlEnum("status", ["Not Started", "In Progress", "Blocked", "Approved", "Rejected"]).default("Not Started"),
  
  approver: varchar("approver", { length: 255 }),
  dueDate: timestamp("dueDate"),
  fastPath: boolean("fastPath").default(false),
  
  documentUrl: varchar("documentUrl", { length: 1000 }),
  notes: text("notes"),
  blockers: text("blockers"),
  
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  completedAt: timestamp("completedAt"),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
}));

export type PaperProcess = typeof paperProcess.$inferSelect;
export type InsertPaperProcess = typeof paperProcess.$inferInsert;

/**
 * Pilot plans and tracking
 */
export const pilotPlans = mysqlTable("pilotPlans", {
  id: varchar("id", { length: 64 }).primaryKey(),
  accountId: varchar("accountId", { length: 64 }).notNull(),
  
  pilotName: varchar("pilotName", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["Planned", "Running", "Completed", "Cancelled"]).default("Planned"),
  
  startDate: timestamp("startDate"),
  endDate: timestamp("endDate"),
  
  winCriteria: json("winCriteria").$type<string[]>(),
  testScripts: text("testScripts"),
  dataCaptureplan: text("dataCaptureplan"),
  
  // Pilot results
  participantCount: int("participantCount"),
  successRate: int("successRate"), // 0-100
  npsScore: int("npsScore"), // -100 to 100
  
  sowUrl: varchar("sowUrl", { length: 1000 }),
  resultsUrl: varchar("resultsUrl", { length: 1000 }),
  
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
}));

export type PilotPlan = typeof pilotPlans.$inferSelect;
export type InsertPilotPlan = typeof pilotPlans.$inferInsert;

/**
 * Pilot analytics data
 */
export const pilotAnalytics = mysqlTable("pilotAnalytics", {
  id: varchar("id", { length: 64 }).primaryKey(),
  pilotPlanId: varchar("pilotPlanId", { length: 64 }).notNull(),
  accountId: varchar("accountId", { length: 64 }).notNull(),
  
  // QoE/QoS metrics
  avgJoinTime: int("avgJoinTime"), // milliseconds
  avgBufferRate: int("avgBufferRate"), // percentage
  dropRate: int("dropRate"), // percentage
  
  // Usage by region/device
  usageByRegion: json("usageByRegion").$type<Record<string, number>>(),
  usageByDevice: json("usageByDevice").$type<Record<string, number>>(),
  usageByBrowser: json("usageByBrowser").$type<Record<string, number>>(),
  
  // eCDN metrics
  ecdnOffloadPercent: int("ecdnOffloadPercent"), // 0-100
  bandwidthSaved: int("bandwidthSaved"), // GB
  
  // Support metrics
  supportTicketsBefore: int("supportTicketsBefore"),
  supportTicketsAfter: int("supportTicketsAfter"),
  
  // Engagement
  engagementLift: int("engagementLift"), // percentage change
  
  recordedAt: timestamp("recordedAt").defaultNow(),
  createdAt: timestamp("createdAt").defaultNow(),
}, (table) => ({
  pilotIdx: index("pilot_idx").on(table.pilotPlanId),
  accountIdx: index("account_idx").on(table.accountId),
}));

export type PilotAnalytics = typeof pilotAnalytics.$inferSelect;
export type InsertPilotAnalytics = typeof pilotAnalytics.$inferInsert;

/**
 * Link validation tracking
 */
export const linkValidations = mysqlTable("linkValidations", {
  id: varchar("id", { length: 64 }).primaryKey(),
  
  url: varchar("url", { length: 1000 }).notNull(),
  sourceType: varchar("sourceType", { length: 100 }), // Finding, Evidence, etc.
  sourceId: varchar("sourceId", { length: 64 }),
  
  status: mysqlEnum("status", ["Valid", "Broken", "Redirect", "Paywall", "NotChecked"]).default("NotChecked"),
  statusCode: int("statusCode"),
  
  lastCheckedAt: timestamp("lastCheckedAt"),
  nextCheckAt: timestamp("nextCheckAt"),
  
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
}, (table) => ({
  urlIdx: index("url_idx").on(table.url),
  statusIdx: index("status_idx").on(table.status),
}));

export type LinkValidation = typeof linkValidations.$inferSelect;
export type InsertLinkValidation = typeof linkValidations.$inferInsert;

/**
 * Generated Sales Account Plans
 */
export const accountPlans = mysqlTable("accountPlans", {
  id: varchar("id", { length: 64 }).primaryKey(),
  accountId: varchar("accountId", { length: 64 }).notNull(),
  version: int("version").notNull().default(1),
  
  // Sales strategy configuration
  industry: varchar("industry", { length: 255 }).default("Enterprise Video Platform"),
  salesMethodology: mysqlEnum("salesMethodology", ["MEDDICC", "SPICED", "Command of the Message"]).default("MEDDICC"),
  isOpportunity: boolean("isOpportunity").default(false),
  
  // Plan sections (stored as structured JSON)
  companyOverview: text("companyOverview"),
  stakeholderMap: json("stakeholderMap").$type<any[]>(),
  painPoints: json("painPoints").$type<any[]>(),
  persistentRisks: json("persistentRisks").$type<any[]>(),
  solutionMapping: json("solutionMapping").$type<any[]>(),
  opportunitySummary: text("opportunitySummary"),
  
  // Sales methodology fields (MEDDICC, SPICED, or Command of Message)
  salesMethodologyFields: json("salesMethodologyFields").$type<any>(),
  
  landExpandPlaybook: json("landExpandPlaybook").$type<any>(),
  mutualActionPlan: json("mutualActionPlan").$type<any>(),
  businessImpact: json("businessImpact").$type<any>(),
  
  // Opportunity-specific fields (only populated when isOpportunity = true)
  opportunityDetails: json("opportunityDetails").$type<any>(),
  
  appendix: json("appendix").$type<any>(),
  
  // Metadata
  generatedBy: varchar("generatedBy", { length: 64 }), // User ID
  generatedAt: timestamp("generatedAt").defaultNow(),
  
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
}));

export type AccountPlan = typeof accountPlans.$inferSelect;
export type InsertAccountPlan = typeof accountPlans.$inferInsert;

/**
 * Research job tracking
 */
export const researchJobs = mysqlTable("researchJobs", {
  id: varchar("id", { length: 64 }).primaryKey(),
  accountId: varchar("accountId", { length: 64 }),
  
  status: mysqlEnum("status", ["pending", "running", "completed", "failed"]).default("pending"),
  startedAt: timestamp("startedAt"),
  completedAt: timestamp("completedAt"),
  errorMessage: text("errorMessage"),
  
  // Stats
  findingsCount: int("findingsCount").default(0),
  sourcesChecked: json("sourcesChecked").$type<string[]>(),
  
  createdAt: timestamp("createdAt").defaultNow(),
}, (table) => ({
  statusIdx: index("status_idx").on(table.status),
}));

export type ResearchJob = typeof researchJobs.$inferSelect;
export type InsertResearchJob = typeof researchJobs.$inferInsert;


/**
 * Meeting notes and transcripts
 */
export const meetingNotes = mysqlTable("meetingNotes", {
  id: varchar("id", { length: 64 }).primaryKey(),
  accountId: varchar("accountId", { length: 64 }).notNull(),
  
  // Meeting details
  meetingType: mysqlEnum("meetingType", [
    "Discovery",
    "Demo",
    "Technical Review",
    "Executive Briefing",
    "Follow-up",
    "Negotiation",
    "Other"
  ]).notNull(),
  meetingDate: timestamp("meetingDate").notNull(),
  attendees: json("attendees").$type<string[]>(),
  
  // Content
  title: varchar("title", { length: 500 }).notNull(),
  summary: text("summary"),
  transcript: text("transcript"), // Full transcript if available
  keyTakeaways: json("keyTakeaways").$type<string[]>(),
  actionItems: json("actionItems").$type<Array<{
    action: string;
    owner: string;
    dueDate?: string;
  }>>(),
  
  // File storage
  fileUrl: varchar("fileUrl", { length: 1000 }), // S3 URL for uploaded file
  fileName: varchar("fileName", { length: 500 }),
  fileType: varchar("fileType", { length: 100 }), // pdf, docx, txt, etc.
  
  // Impact tracking
  influencedAccountPlan: boolean("influencedAccountPlan").default(false),
  lastUsedInPlanGeneration: timestamp("lastUsedInPlanGeneration"),
  
  // Metadata
  uploadedBy: varchar("uploadedBy", { length: 64 }), // User ID
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
  meetingDateIdx: index("meeting_date_idx").on(table.meetingDate),
}));

export type MeetingNote = typeof meetingNotes.$inferSelect;
export type InsertMeetingNote = typeof meetingNotes.$inferInsert;

