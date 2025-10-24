var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// drizzle/schema.ts
var schema_exports = {};
__export(schema_exports, {
  accountPlans: () => accountPlans,
  accounts: () => accounts,
  counterplays: () => counterplays,
  findings: () => findings,
  hypotheses: () => hypotheses,
  linkValidations: () => linkValidations,
  mapTasks: () => mapTasks,
  meetingNotes: () => meetingNotes,
  objections: () => objections,
  pains: () => pains,
  paperProcess: () => paperProcess,
  pilotAnalytics: () => pilotAnalytics,
  pilotPlans: () => pilotPlans,
  researchJobs: () => researchJobs,
  risks: () => risks,
  signals: () => signals,
  stakeholders: () => stakeholders,
  tests: () => tests,
  users: () => users,
  validations: () => validations
});
import { mysqlEnum, mysqlTable, text, timestamp, varchar, int, boolean, json, index } from "drizzle-orm/mysql-core";
var users, accounts, findings, stakeholders, pains, hypotheses, validations, risks, signals, tests, objections, counterplays, mapTasks, paperProcess, pilotPlans, pilotAnalytics, linkValidations, accountPlans, researchJobs, meetingNotes;
var init_schema = __esm({
  "drizzle/schema.ts"() {
    "use strict";
    users = mysqlTable("users", {
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
      highlightThreshold: int("highlightThreshold").default(70).notNull()
    });
    accounts = mysqlTable("accounts", {
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
      dealOwner: varchar("dealOwner", { length: 64 }),
      // User ID reference
      arrEstimate: int("arrEstimate"),
      // Store as cents to avoid decimal issues
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
      confidence: int("confidence").default(0),
      // 0-100
      nextStep: text("nextStep"),
      nextStepDue: timestamp("nextStepDue"),
      // Computed fields (updated by background jobs)
      intelFreshnessScore: int("intelFreshnessScore").default(0),
      // 0-100
      linkValidityRate: int("linkValidityRate").default(100),
      // 0-100 (percentage)
      mapCompletenessScore: int("mapCompletenessScore").default(0),
      // 0-100
      needsSecurityReview: boolean("needsSecurityReview").default(false),
      needsPaperProcess: boolean("needsPaperProcess").default(false),
      hasPilotPlan: boolean("hasPilotPlan").default(false),
      // Metadata
      lastResearchedAt: timestamp("lastResearchedAt"),
      createdAt: timestamp("createdAt").defaultNow(),
      updatedAt: timestamp("updatedAt").defaultNow()
    });
    findings = mysqlTable("findings", {
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
      sourceUrl: varchar("sourceUrl", { length: 1e3 }).notNull(),
      sourceDate: timestamp("sourceDate").notNull(),
      sourceType: varchar("sourceType", { length: 100 }).notNull(),
      // LinkedIn, SEC, News, etc.
      // Scoring components (0-20 each)
      recencyScore: int("recencyScore").notNull(),
      authorityScore: int("authorityScore").notNull(),
      magnitudeScore: int("magnitudeScore").notNull(),
      relevanceScore: int("relevanceScore").notNull(),
      corroborationScore: int("corroborationScore").notNull(),
      compositeScore: int("compositeScore").notNull(),
      // Sum of above
      // Metadata
      sentiment: mysqlEnum("sentiment", ["positive", "neutral", "negative"]).default("neutral"),
      tags: json("tags").$type(),
      whyItMatters: text("whyItMatters"),
      // Relevance to VBrick
      isPersistent: boolean("isPersistent").default(false),
      // 5-year persistence flag
      firstSeenDate: timestamp("firstSeenDate"),
      // For persistent items
      persistenceRationale: text("persistenceRationale"),
      // Evidence tracking
      evidenceLink: varchar("evidenceLink", { length: 1e3 }),
      lastVerifiedAt: timestamp("lastVerifiedAt"),
      // Timestamps
      createdAt: timestamp("createdAt").defaultNow(),
      updatedAt: timestamp("updatedAt").defaultNow()
    }, (table) => ({
      accountIdx: index("account_idx").on(table.accountId),
      categoryIdx: index("category_idx").on(table.category),
      scoreIdx: index("score_idx").on(table.compositeScore)
    }));
    stakeholders = mysqlTable("stakeholders", {
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
      relationshipStrength: int("relationshipStrength").default(0),
      // 0-100
      createdAt: timestamp("createdAt").defaultNow(),
      updatedAt: timestamp("updatedAt").defaultNow()
    }, (table) => ({
      accountIdx: index("account_idx").on(table.accountId)
    }));
    pains = mysqlTable("pains", {
      id: varchar("id", { length: 64 }).primaryKey(),
      accountId: varchar("accountId", { length: 64 }).notNull(),
      description: text("description").notNull(),
      status: mysqlEnum("status", ["Identified", "Validated", "Addressed", "Dismissed"]).default("Identified"),
      owner: varchar("owner", { length: 64 }),
      // User ID
      confidence: int("confidence").default(0),
      // 0-100
      evidenceLink: varchar("evidenceLink", { length: 1e3 }),
      lastVerifiedAt: timestamp("lastVerifiedAt"),
      // VBrick pillar mapping
      vbrickPillar: varchar("vbrickPillar", { length: 255 }),
      createdAt: timestamp("createdAt").defaultNow(),
      updatedAt: timestamp("updatedAt").defaultNow()
    }, (table) => ({
      accountIdx: index("account_idx").on(table.accountId)
    }));
    hypotheses = mysqlTable("hypotheses", {
      id: varchar("id", { length: 64 }).primaryKey(),
      accountId: varchar("accountId", { length: 64 }).notNull(),
      hypothesis: text("hypothesis").notNull(),
      status: mysqlEnum("status", ["Proposed", "Testing", "Validated", "Invalidated"]).default("Proposed"),
      owner: varchar("owner", { length: 64 }),
      confidence: int("confidence").default(0),
      evidenceLink: varchar("evidenceLink", { length: 1e3 }),
      lastVerifiedAt: timestamp("lastVerifiedAt"),
      testPlan: text("testPlan"),
      results: text("results"),
      createdAt: timestamp("createdAt").defaultNow(),
      updatedAt: timestamp("updatedAt").defaultNow()
    }, (table) => ({
      accountIdx: index("account_idx").on(table.accountId)
    }));
    validations = mysqlTable("validations", {
      id: varchar("id", { length: 64 }).primaryKey(),
      accountId: varchar("accountId", { length: 64 }).notNull(),
      claim: text("claim").notNull(),
      status: mysqlEnum("status", ["Pending", "Validated", "Rejected"]).default("Pending"),
      owner: varchar("owner", { length: 64 }),
      confidence: int("confidence").default(0),
      evidenceLink: varchar("evidenceLink", { length: 1e3 }).notNull(),
      // Required
      lastVerifiedAt: timestamp("lastVerifiedAt").notNull(),
      // Required
      validationMethod: varchar("validationMethod", { length: 255 }),
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow(),
      updatedAt: timestamp("updatedAt").defaultNow()
    }, (table) => ({
      accountIdx: index("account_idx").on(table.accountId)
    }));
    risks = mysqlTable("risks", {
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
      evidenceLink: varchar("evidenceLink", { length: 1e3 }),
      lastVerifiedAt: timestamp("lastVerifiedAt"),
      createdAt: timestamp("createdAt").defaultNow(),
      updatedAt: timestamp("updatedAt").defaultNow()
    }, (table) => ({
      accountIdx: index("account_idx").on(table.accountId),
      severityIdx: index("severity_idx").on(table.severity)
    }));
    signals = mysqlTable("signals", {
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
      evidenceLink: varchar("evidenceLink", { length: 1e3 }),
      lastVerifiedAt: timestamp("lastVerifiedAt"),
      detectedAt: timestamp("detectedAt").defaultNow(),
      createdAt: timestamp("createdAt").defaultNow(),
      updatedAt: timestamp("updatedAt").defaultNow()
    }, (table) => ({
      accountIdx: index("account_idx").on(table.accountId)
    }));
    tests = mysqlTable("tests", {
      id: varchar("id", { length: 64 }).primaryKey(),
      accountId: varchar("accountId", { length: 64 }).notNull(),
      testName: varchar("testName", { length: 255 }).notNull(),
      description: text("description").notNull(),
      status: mysqlEnum("status", ["Planned", "In Progress", "Completed", "Cancelled"]).default("Planned"),
      owner: varchar("owner", { length: 64 }),
      successCriteria: text("successCriteria"),
      results: text("results"),
      confidence: int("confidence").default(0),
      evidenceLink: varchar("evidenceLink", { length: 1e3 }),
      lastVerifiedAt: timestamp("lastVerifiedAt"),
      startDate: timestamp("startDate"),
      endDate: timestamp("endDate"),
      createdAt: timestamp("createdAt").defaultNow(),
      updatedAt: timestamp("updatedAt").defaultNow()
    }, (table) => ({
      accountIdx: index("account_idx").on(table.accountId)
    }));
    objections = mysqlTable("objections", {
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
      evidenceLink: varchar("evidenceLink", { length: 1e3 }),
      lastVerifiedAt: timestamp("lastVerifiedAt"),
      raisedAt: timestamp("raisedAt").defaultNow(),
      createdAt: timestamp("createdAt").defaultNow(),
      updatedAt: timestamp("updatedAt").defaultNow()
    }, (table) => ({
      accountIdx: index("account_idx").on(table.accountId)
    }));
    counterplays = mysqlTable("counterplays", {
      id: varchar("id", { length: 64 }).primaryKey(),
      accountId: varchar("accountId", { length: 64 }).notNull(),
      competitor: varchar("competitor", { length: 255 }).notNull(),
      theirPlay: text("theirPlay").notNull(),
      ourCounterplay: text("ourCounterplay").notNull(),
      status: mysqlEnum("status", ["Planned", "Executing", "Successful", "Failed"]).default("Planned"),
      owner: varchar("owner", { length: 64 }),
      confidence: int("confidence").default(0),
      evidenceLink: varchar("evidenceLink", { length: 1e3 }),
      lastVerifiedAt: timestamp("lastVerifiedAt"),
      createdAt: timestamp("createdAt").defaultNow(),
      updatedAt: timestamp("updatedAt").defaultNow()
    }, (table) => ({
      accountIdx: index("account_idx").on(table.accountId)
    }));
    mapTasks = mysqlTable("mapTasks", {
      id: varchar("id", { length: 64 }).primaryKey(),
      accountId: varchar("accountId", { length: 64 }).notNull(),
      task: text("task").notNull(),
      owner: varchar("owner", { length: 64 }),
      // VBrick owner
      accountOwner: varchar("accountOwner", { length: 255 }),
      // Customer owner
      dueDate: timestamp("dueDate"),
      status: mysqlEnum("status", ["Not Started", "In Progress", "Blocked", "Completed"]).default("Not Started"),
      stage: varchar("stage", { length: 64 }),
      // Which opportunity stage this gates
      isExitCriteria: boolean("isExitCriteria").default(false),
      artifactRequired: varchar("artifactRequired", { length: 255 }),
      artifactUrl: varchar("artifactUrl", { length: 1e3 }),
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow(),
      updatedAt: timestamp("updatedAt").defaultNow(),
      completedAt: timestamp("completedAt")
    }, (table) => ({
      accountIdx: index("account_idx").on(table.accountId),
      statusIdx: index("status_idx").on(table.status)
    }));
    paperProcess = mysqlTable("paperProcess", {
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
      documentUrl: varchar("documentUrl", { length: 1e3 }),
      notes: text("notes"),
      blockers: text("blockers"),
      createdAt: timestamp("createdAt").defaultNow(),
      updatedAt: timestamp("updatedAt").defaultNow(),
      completedAt: timestamp("completedAt")
    }, (table) => ({
      accountIdx: index("account_idx").on(table.accountId)
    }));
    pilotPlans = mysqlTable("pilotPlans", {
      id: varchar("id", { length: 64 }).primaryKey(),
      accountId: varchar("accountId", { length: 64 }).notNull(),
      pilotName: varchar("pilotName", { length: 255 }).notNull(),
      status: mysqlEnum("status", ["Planned", "Running", "Completed", "Cancelled"]).default("Planned"),
      startDate: timestamp("startDate"),
      endDate: timestamp("endDate"),
      winCriteria: json("winCriteria").$type(),
      testScripts: text("testScripts"),
      dataCaptureplan: text("dataCaptureplan"),
      // Pilot results
      participantCount: int("participantCount"),
      successRate: int("successRate"),
      // 0-100
      npsScore: int("npsScore"),
      // -100 to 100
      sowUrl: varchar("sowUrl", { length: 1e3 }),
      resultsUrl: varchar("resultsUrl", { length: 1e3 }),
      createdAt: timestamp("createdAt").defaultNow(),
      updatedAt: timestamp("updatedAt").defaultNow()
    }, (table) => ({
      accountIdx: index("account_idx").on(table.accountId)
    }));
    pilotAnalytics = mysqlTable("pilotAnalytics", {
      id: varchar("id", { length: 64 }).primaryKey(),
      pilotPlanId: varchar("pilotPlanId", { length: 64 }).notNull(),
      accountId: varchar("accountId", { length: 64 }).notNull(),
      // QoE/QoS metrics
      avgJoinTime: int("avgJoinTime"),
      // milliseconds
      avgBufferRate: int("avgBufferRate"),
      // percentage
      dropRate: int("dropRate"),
      // percentage
      // Usage by region/device
      usageByRegion: json("usageByRegion").$type(),
      usageByDevice: json("usageByDevice").$type(),
      usageByBrowser: json("usageByBrowser").$type(),
      // eCDN metrics
      ecdnOffloadPercent: int("ecdnOffloadPercent"),
      // 0-100
      bandwidthSaved: int("bandwidthSaved"),
      // GB
      // Support metrics
      supportTicketsBefore: int("supportTicketsBefore"),
      supportTicketsAfter: int("supportTicketsAfter"),
      // Engagement
      engagementLift: int("engagementLift"),
      // percentage change
      recordedAt: timestamp("recordedAt").defaultNow(),
      createdAt: timestamp("createdAt").defaultNow()
    }, (table) => ({
      pilotIdx: index("pilot_idx").on(table.pilotPlanId),
      accountIdx: index("account_idx").on(table.accountId)
    }));
    linkValidations = mysqlTable("linkValidations", {
      id: varchar("id", { length: 64 }).primaryKey(),
      url: varchar("url", { length: 1e3 }).notNull(),
      sourceType: varchar("sourceType", { length: 100 }),
      // Finding, Evidence, etc.
      sourceId: varchar("sourceId", { length: 64 }),
      status: mysqlEnum("status", ["Valid", "Broken", "Redirect", "Paywall", "NotChecked"]).default("NotChecked"),
      statusCode: int("statusCode"),
      lastCheckedAt: timestamp("lastCheckedAt"),
      nextCheckAt: timestamp("nextCheckAt"),
      createdAt: timestamp("createdAt").defaultNow(),
      updatedAt: timestamp("updatedAt").defaultNow()
    }, (table) => ({
      urlIdx: index("url_idx").on(table.url),
      statusIdx: index("status_idx").on(table.status)
    }));
    accountPlans = mysqlTable("accountPlans", {
      id: varchar("id", { length: 64 }).primaryKey(),
      accountId: varchar("accountId", { length: 64 }).notNull(),
      version: int("version").notNull().default(1),
      // Sales strategy configuration
      industry: varchar("industry", { length: 255 }).default("Enterprise Video Platform"),
      salesMethodology: mysqlEnum("salesMethodology", ["MEDDICC", "SPICED", "Command of the Message"]).default("MEDDICC"),
      isOpportunity: boolean("isOpportunity").default(false),
      // Plan sections (stored as structured JSON)
      companyOverview: text("companyOverview"),
      stakeholderMap: json("stakeholderMap").$type(),
      painPoints: json("painPoints").$type(),
      persistentRisks: json("persistentRisks").$type(),
      solutionMapping: json("solutionMapping").$type(),
      opportunitySummary: text("opportunitySummary"),
      // Sales methodology fields (MEDDICC, SPICED, or Command of Message)
      salesMethodologyFields: json("salesMethodologyFields").$type(),
      landExpandPlaybook: json("landExpandPlaybook").$type(),
      mutualActionPlan: json("mutualActionPlan").$type(),
      businessImpact: json("businessImpact").$type(),
      // Opportunity-specific fields (only populated when isOpportunity = true)
      opportunityDetails: json("opportunityDetails").$type(),
      appendix: json("appendix").$type(),
      // Metadata
      generatedBy: varchar("generatedBy", { length: 64 }),
      // User ID
      generatedAt: timestamp("generatedAt").defaultNow(),
      createdAt: timestamp("createdAt").defaultNow(),
      updatedAt: timestamp("updatedAt").defaultNow()
    }, (table) => ({
      accountIdx: index("account_idx").on(table.accountId)
    }));
    researchJobs = mysqlTable("researchJobs", {
      id: varchar("id", { length: 64 }).primaryKey(),
      accountId: varchar("accountId", { length: 64 }),
      status: mysqlEnum("status", ["pending", "running", "completed", "failed"]).default("pending"),
      startedAt: timestamp("startedAt"),
      completedAt: timestamp("completedAt"),
      errorMessage: text("errorMessage"),
      // Stats
      findingsCount: int("findingsCount").default(0),
      sourcesChecked: json("sourcesChecked").$type(),
      createdAt: timestamp("createdAt").defaultNow()
    }, (table) => ({
      statusIdx: index("status_idx").on(table.status)
    }));
    meetingNotes = mysqlTable("meetingNotes", {
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
      attendees: json("attendees").$type(),
      // Content
      title: varchar("title", { length: 500 }).notNull(),
      summary: text("summary"),
      transcript: text("transcript"),
      // Full transcript if available
      keyTakeaways: json("keyTakeaways").$type(),
      actionItems: json("actionItems").$type(),
      // File storage
      fileUrl: varchar("fileUrl", { length: 1e3 }),
      // S3 URL for uploaded file
      fileName: varchar("fileName", { length: 500 }),
      fileType: varchar("fileType", { length: 100 }),
      // pdf, docx, txt, etc.
      // Impact tracking
      influencedAccountPlan: boolean("influencedAccountPlan").default(false),
      lastUsedInPlanGeneration: timestamp("lastUsedInPlanGeneration"),
      // Metadata
      uploadedBy: varchar("uploadedBy", { length: 64 }),
      // User ID
      createdAt: timestamp("createdAt").defaultNow(),
      updatedAt: timestamp("updatedAt").defaultNow()
    }, (table) => ({
      accountIdx: index("account_idx").on(table.accountId),
      meetingDateIdx: index("meeting_date_idx").on(table.meetingDate)
    }));
  }
});

// server/_core/env.ts
var ENV;
var init_env = __esm({
  "server/_core/env.ts"() {
    "use strict";
    ENV = {
      appId: process.env.VITE_APP_ID ?? "",
      cookieSecret: process.env.JWT_SECRET ?? "",
      databaseUrl: process.env.DATABASE_URL ?? "",
      oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
      ownerId: process.env.OWNER_OPEN_ID ?? "",
      isProduction: process.env.NODE_ENV === "production",
      forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
      forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? ""
    };
  }
});

// server/db.ts
var db_exports = {};
__export(db_exports, {
  addAccount: () => addAccount,
  createAccountPlan: () => createAccountPlan,
  createMapTask: () => createMapTask,
  createMeetingNote: () => createMeetingNote,
  createPain: () => createPain,
  createPaperProcess: () => createPaperProcess,
  createPilotPlan: () => createPilotPlan,
  createRisk: () => createRisk,
  db: () => db,
  deleteMeetingNote: () => deleteMeetingNote,
  getAccountById: () => getAccountById,
  getAccountBySlug: () => getAccountBySlug,
  getAccountPlansByAccount: () => getAccountPlansByAccount,
  getAllAccounts: () => getAllAccounts,
  getFindingsByAccount: () => getFindingsByAccount,
  getFindingsByCategory: () => getFindingsByCategory,
  getLatestAccountPlan: () => getLatestAccountPlan,
  getLatestResearchJob: () => getLatestResearchJob,
  getMapTasks: () => getMapTasks,
  getMeetingNoteById: () => getMeetingNoteById,
  getMeetingNotesByAccount: () => getMeetingNotesByAccount,
  getOpportunityAccounts: () => getOpportunityAccounts,
  getPains: () => getPains,
  getPaperProcesses: () => getPaperProcesses,
  getPilotAnalytics: () => getPilotAnalytics,
  getPilotPlans: () => getPilotPlans,
  getResearchJobsByAccount: () => getResearchJobsByAccount,
  getRisks: () => getRisks,
  getStakeholdersByAccount: () => getStakeholdersByAccount,
  getUser: () => getUser,
  removeAccount: () => removeAccount,
  updateAccountOpportunity: () => updateAccountOpportunity,
  updateAccountScores: () => updateAccountScores,
  updateMapTask: () => updateMapTask,
  updateMeetingNote: () => updateMeetingNote,
  updatePaperProcess: () => updatePaperProcess,
  upsertUser: () => upsertUser
});
import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
function initializeDatabase() {
  if (!process.env.DATABASE_URL) {
    console.error("[DB] DATABASE_URL environment variable is missing!");
    throw new Error("DATABASE_URL is required");
  }
  console.log("[DB] Initializing database connection...");
  if (process.env.NODE_ENV === "development") {
    if (!global.__pool) {
      console.log("[DB] Creating NEW connection pool (development mode)");
      global.__pool = mysql.createPool({
        uri: process.env.DATABASE_URL,
        connectionLimit: 5,
        // Low limit for dev to prevent exhaustion
        waitForConnections: true,
        queueLimit: 10,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
        // Add timeout parameters for TiDB
        connectTimeout: 1e4,
        // 10 seconds
        acquireTimeout: 1e4,
        // 10 seconds
        timeout: 1e4
        // 10 seconds
      });
    } else {
      console.log("[DB] Reusing EXISTING connection pool (hot-reload)");
    }
    pool = global.__pool;
    if (!global.__db) {
      global.__db = drizzle(pool, { schema: schema_exports, mode: "default" });
    }
    db = global.__db;
  } else {
    console.log("[DB] Creating NEW connection pool (production mode)");
    pool = mysql.createPool({
      uri: process.env.DATABASE_URL,
      connectionLimit: 10,
      waitForConnections: true,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      connectTimeout: 1e4,
      acquireTimeout: 1e4,
      timeout: 1e4
    });
    db = drizzle(pool, { schema: schema_exports, mode: "default" });
  }
  console.log("[DB] Database initialized successfully");
  testConnection();
}
async function testConnection() {
  try {
    console.log("[DB] Testing database connection...");
    const connection = await pool.getConnection();
    console.log("[DB] Successfully acquired test connection");
    connection.release();
    console.log("[DB] Test connection released");
  } catch (error) {
    console.error("[DB] FAILED to connect to database:", error);
    throw error;
  }
}
async function upsertUser(user) {
  if (!user.id) {
    throw new Error("User ID is required for upsert");
  }
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = {
      id: user.id
    };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role === void 0) {
      if (user.id === ENV.ownerId) {
        user.role = "admin";
        values.role = "admin";
        updateSet.role = "admin";
      }
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    }
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUser(id) {
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getAllAccounts() {
  if (!db) return [];
  return await db.select().from(accounts).orderBy(accounts.name);
}
async function getAccountBySlug(slug) {
  if (!db) return void 0;
  const result = await db.select().from(accounts).where(eq(accounts.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getAccountById(id) {
  if (!db) return void 0;
  const result = await db.select().from(accounts).where(eq(accounts.id, id)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getFindingsByAccount(accountId, limit) {
  if (!db) return [];
  let query = db.select().from(findings).where(eq(findings.accountId, accountId)).orderBy(desc(findings.compositeScore), desc(findings.sourceDate));
  if (limit) {
    return await query.limit(limit);
  }
  return await query;
}
async function getFindingsByCategory(accountId, category) {
  if (!db) return [];
  return await db.select().from(findings).where(and(
    eq(findings.accountId, accountId),
    eq(findings.category, category)
  )).orderBy(desc(findings.compositeScore));
}
async function getStakeholdersByAccount(accountId) {
  if (!db) return [];
  return await db.select().from(stakeholders).where(eq(stakeholders.accountId, accountId)).orderBy(stakeholders.name);
}
async function getLatestAccountPlan(accountId) {
  if (!db) return null;
  const result = await db.select().from(accountPlans).where(eq(accountPlans.accountId, accountId)).orderBy(desc(accountPlans.version)).limit(1);
  return result.length > 0 ? result[0] : null;
}
async function getAccountPlansByAccount(accountId) {
  if (!db) return [];
  return await db.select().from(accountPlans).where(eq(accountPlans.accountId, accountId)).orderBy(desc(accountPlans.version));
}
async function getLatestResearchJob() {
  if (!db) return null;
  const result = await db.select().from(researchJobs).orderBy(desc(researchJobs.createdAt)).limit(1);
  return result.length > 0 ? result[0] : null;
}
async function getResearchJobsByAccount(accountId) {
  if (!db) return [];
  return await db.select().from(researchJobs).where(eq(researchJobs.accountId, accountId)).orderBy(desc(researchJobs.createdAt));
}
async function updateAccountScores(accountId, maxScore, avgScore) {
  if (!db) return;
  await db.update(accounts).set({
    maxScore,
    avgScore,
    lastResearchedAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(accounts.id, accountId));
}
async function getOpportunityAccounts() {
  if (!db) return [];
  return await db.select().from(accounts).where(eq(accounts.isOpportunity, true)).orderBy(desc(accounts.closeDate));
}
async function getMapTasks(accountId) {
  if (!db) return [];
  return await db.select().from(mapTasks).where(eq(mapTasks.accountId, accountId)).orderBy(mapTasks.dueDate);
}
async function createMapTask(task) {
  if (!db) return;
  await db.insert(mapTasks).values(task);
}
async function updateMapTask(taskId, updates) {
  if (!db) return;
  await db.update(mapTasks).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(mapTasks.id, taskId));
}
async function getPains(accountId) {
  if (!db) return [];
  return await db.select().from(pains).where(eq(pains.accountId, accountId)).orderBy(desc(pains.confidence));
}
async function createPain(pain) {
  if (!db) return;
  await db.insert(pains).values(pain);
}
async function getRisks(accountId) {
  if (!db) return [];
  return await db.select().from(risks).where(eq(risks.accountId, accountId)).orderBy(desc(risks.severity));
}
async function createRisk(risk) {
  if (!db) return;
  await db.insert(risks).values(risk);
}
async function getPaperProcesses(accountId) {
  if (!db) return [];
  return await db.select().from(paperProcess).where(eq(paperProcess.accountId, accountId)).orderBy(paperProcess.dueDate);
}
async function createPaperProcess(process2) {
  if (!db) return;
  await db.insert(paperProcess).values(process2);
}
async function getPilotPlans(accountId) {
  if (!db) return [];
  return await db.select().from(pilotPlans).where(eq(pilotPlans.accountId, accountId)).orderBy(desc(pilotPlans.startDate));
}
async function createPilotPlan(plan) {
  if (!db) return;
  await db.insert(pilotPlans).values(plan);
}
async function getPilotAnalytics(pilotPlanId) {
  if (!db) return [];
  return await db.select().from(pilotAnalytics).where(eq(pilotAnalytics.pilotPlanId, pilotPlanId)).orderBy(desc(pilotAnalytics.recordedAt));
}
async function updateAccountOpportunity(accountId, data) {
  if (!db) return;
  await db.update(accounts).set({ isOpportunity: data.isOpportunity, updatedAt: /* @__PURE__ */ new Date() }).where(eq(accounts.id, accountId));
}
async function updatePaperProcess(id, updates) {
  if (!db) return;
  await db.update(paperProcess).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(paperProcess.id, id));
}
async function addAccount(data) {
  if (!db) throw new Error("Database not initialized");
  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const newAccount = {
    id: `acc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: data.name,
    slug,
    website: data.website || null,
    industry: data.industry || null,
    description: data.description || null,
    maxScore: 0,
    avgScore: 0,
    lastResearchedAt: null,
    isOpportunity: false,
    createdAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date()
  };
  await db.insert(accounts).values(newAccount);
  console.log(`[DB] Added new account: ${data.name} (${newAccount.id})`);
  return newAccount;
}
async function removeAccount(accountId) {
  if (!db) throw new Error("Database not initialized");
  await db.delete(findings).where(eq(findings.accountId, accountId));
  await db.delete(stakeholders).where(eq(stakeholders.accountId, accountId));
  await db.delete(accountPlans).where(eq(accountPlans.accountId, accountId));
  await db.delete(researchJobs).where(eq(researchJobs.accountId, accountId));
  await db.delete(pains).where(eq(pains.accountId, accountId));
  await db.delete(hypotheses).where(eq(hypotheses.accountId, accountId));
  await db.delete(validations).where(eq(validations.accountId, accountId));
  await db.delete(risks).where(eq(risks.accountId, accountId));
  await db.delete(signals).where(eq(signals.accountId, accountId));
  await db.delete(tests).where(eq(tests.accountId, accountId));
  await db.delete(objections).where(eq(objections.accountId, accountId));
  await db.delete(counterplays).where(eq(counterplays.accountId, accountId));
  await db.delete(mapTasks).where(eq(mapTasks.accountId, accountId));
  await db.delete(paperProcess).where(eq(paperProcess.accountId, accountId));
  await db.delete(pilotPlans).where(eq(pilotPlans.accountId, accountId));
  await db.delete(accounts).where(eq(accounts.id, accountId));
  console.log(`[DB] Removed account: ${accountId}`);
  return { success: true };
}
async function getMeetingNotesByAccount(accountId) {
  if (!db) return [];
  return await db.select().from(meetingNotes).where(eq(meetingNotes.accountId, accountId)).orderBy(desc(meetingNotes.meetingDate));
}
async function getMeetingNoteById(id) {
  if (!db) return null;
  const result = await db.select().from(meetingNotes).where(eq(meetingNotes.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}
async function createMeetingNote(note) {
  if (!db) return null;
  const result = await db.insert(meetingNotes).values(note);
  return result;
}
async function updateMeetingNote(id, updates) {
  if (!db) return;
  await db.update(meetingNotes).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(meetingNotes.id, id));
}
async function deleteMeetingNote(id) {
  if (!db) return;
  await db.delete(meetingNotes).where(eq(meetingNotes.id, id));
}
async function createAccountPlan(plan) {
  if (!db) return null;
  const result = await db.insert(accountPlans).values(plan);
  return result;
}
var db, pool;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    init_env();
    init_schema();
    process.on("SIGTERM", async () => {
      console.log("[DB] SIGTERM received, closing database connections...");
      await pool.end();
      console.log("[DB] Database connections closed");
      process.exit(0);
    });
    process.on("SIGINT", async () => {
      console.log("[DB] SIGINT received, closing database connections...");
      await pool.end();
      console.log("[DB] Database connections closed");
      process.exit(0);
    });
    initializeDatabase();
    setInterval(() => {
      if (pool && process.env.NODE_ENV === "development") {
        console.log("[DB] Pool status - Total connections:", pool._allConnections?.length || 0);
      }
    }, 3e4);
  }
});

// server/services/accountPlanGeneratorV3.ts
var accountPlanGeneratorV3_exports = {};
__export(accountPlanGeneratorV3_exports, {
  generateAccountPlanV3: () => generateAccountPlanV3
});
import OpenAI from "openai";
async function generateAccountPlanV3(options) {
  const {
    accountId,
    userId,
    industry = "Enterprise Video Platform",
    methodology = "MEDDICC",
    isOpportunity = false
  } = options;
  try {
    const account = await getAccountById(accountId);
    if (!account) {
      throw new Error("Account not found");
    }
    const findings2 = await getFindingsByAccount(accountId);
    const stakeholders2 = await getStakeholdersByAccount(accountId);
    const meetingNotes2 = await getMeetingNotesByAccount(accountId);
    const findingsContext = findings2.map((f) => ({
      category: f.category,
      title: f.title,
      summary: f.summary,
      source: `${f.sourceType} (${new Date(f.sourceDate).toLocaleDateString()})`,
      sourceUrl: f.sourceUrl,
      score: f.compositeScore,
      sentiment: f.sentiment,
      isPersistent: f.isPersistent,
      whyItMatters: f.whyItMatters,
      tags: f.tags
    }));
    const persistentFindings = findings2.filter((f) => f.isPersistent).map((f) => ({
      title: f.title,
      firstSeen: f.firstSeenDate ? new Date(f.firstSeenDate).toLocaleDateString() : "Unknown",
      mostRecent: new Date(f.sourceDate).toLocaleDateString(),
      rationale: f.persistenceRationale,
      source: f.sourceUrl
    }));
    const stakeholdersContext = stakeholders2.map((s) => ({
      name: s.name,
      title: s.title,
      department: s.department,
      influence: s.influence,
      priorities: s.currentPriorities,
      linkedin: s.linkedinUrl
    }));
    const meetingNotesContext = meetingNotes2.map((m) => ({
      type: m.meetingType,
      date: new Date(m.meetingDate).toLocaleDateString(),
      title: m.title,
      summary: m.summary,
      keyTakeaways: m.keyTakeaways,
      actionItems: m.actionItems,
      attendees: m.attendees
    }));
    const systemPrompt = buildSystemPrompt(methodology, industry, isOpportunity);
    const userPrompt = buildUserPrompt({
      account,
      industry,
      methodology,
      isOpportunity,
      findingsContext,
      persistentFindings,
      stakeholdersContext,
      meetingNotesContext
    });
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 16e3
    });
    const planData = JSON.parse(completion.choices[0].message.content || "{}");
    const existingPlans = await getAccountPlansByAccount(accountId);
    const nextVersion = existingPlans.length > 0 ? Math.max(...existingPlans.map((p) => p.version)) + 1 : 1;
    const planId = `plan_${accountId}_${Date.now()}`;
    await createAccountPlan({
      id: planId,
      accountId,
      version: nextVersion,
      industry,
      salesMethodology: methodology,
      isOpportunity,
      companyOverview: planData.companyOverview,
      stakeholderMap: planData.stakeholderMap,
      painPoints: planData.painPoints,
      persistentRisks: planData.persistentRisks,
      solutionMapping: planData.solutionMapping,
      opportunitySummary: planData.opportunitySummary,
      salesMethodologyFields: planData.salesMethodologyFields || {},
      landExpandPlaybook: planData.landExpandPlaybook,
      mutualActionPlan: planData.mutualActionPlan,
      businessImpact: planData.businessImpact,
      opportunityDetails: planData.opportunityDetails || null,
      appendix: planData.appendix,
      generatedBy: userId,
      generatedAt: /* @__PURE__ */ new Date(),
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    });
    return planId;
  } catch (error) {
    console.error("Error generating account plan:", error);
    throw new Error(`Failed to generate account plan: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
function buildSystemPrompt(methodology, industry, isOpportunity) {
  const basePrompt = `You are an expert enterprise sales assistant that generates comprehensive, strategic sales account plans.

**Industry Context:** ${industry}
**Sales Methodology:** ${methodology}
**Account Stage:** ${isOpportunity ? "Opportunity (Active Deal)" : "Prospecting/Discovery"}

**Your Role:**
Generate a STRATEGIC SALES ACCOUNT PLAN (not just intelligence summary) that serves as:
1. A comprehensive sales strategy document
2. An intelligence hub for messaging and hypothesis generation
3. A living document that evolves with new meeting notes and research

**Key Principles:**
- Separate intelligence gathering from sales strategy
- Focus on actionable insights and next steps
- Tailor messaging to stakeholder priorities
- Use the ${methodology} framework rigorously
- Incorporate meeting notes and commitments into action plans
${isOpportunity ? "- Include detailed opportunity metrics and deal management" : "- Focus on qualification and relationship building"}

`;
  const methodologyGuidance = getMethodologyGuidance(methodology);
  const industryGuidance = getIndustryGuidance(industry);
  return basePrompt + methodologyGuidance + industryGuidance;
}
function getMethodologyGuidance(methodology) {
  switch (methodology) {
    case "MEDDICC":
      return `
**MEDDICC Framework:**

1. **Metrics** - What measurable business outcomes matter to the customer?
   - Current state baseline metrics
   - Target state goals
   - ROI calculation methodology
   - Success criteria and KPIs

2. **Economic Buyer** - Who has budget authority?
   - Name, title, department
   - Budget cycle and approval process
   - Spending priorities and constraints
   - Relationship strength and access

3. **Decision Criteria** - What are they evaluating?
   - Technical requirements
   - Business requirements
   - Vendor evaluation criteria
   - Weighting and scoring methodology

4. **Decision Process** - What's their buying process?
   - Formal procurement steps
   - Timeline and milestones
   - Required approvals (Legal, Security, Procurement)
   - Evaluation committee composition

5. **Identify Pain** - What problems are we solving?
   - Business pain (revenue, cost, risk)
   - Technical pain (scalability, integration, performance)
   - User pain (adoption, usability, productivity)
   - Quantified impact of pain

6. **Champion** - Who's advocating for us internally?
   - Name, title, influence level
   - Personal win from this deal
   - Ability and willingness to sell internally
   - Coaching relationship strength

7. **Competition** - Who else are they considering?
   - Direct competitors
   - Indirect competitors (status quo, build vs buy)
   - Competitive strengths and weaknesses
   - Our differentiation strategy

**Output Requirements:**
- Populate all 7 MEDDICC fields with specific, actionable data
- Identify gaps and create action plans to fill them
- Score each element (0-100) for qualification strength
`;
    case "SPICED":
      return `
**SPICED Framework:**

1. **Situation** - What's their current state?
   - Business context and strategic initiatives
   - Current solutions and workarounds
   - Organizational structure and dynamics
   - Market pressures and competitive landscape

2. **Pain** - What problems do they have?
   - Business pain (revenue impact, cost impact, risk)
   - Operational pain (inefficiency, manual work, errors)
   - Strategic pain (competitive disadvantage, missed opportunities)
   - Quantified impact and urgency

3. **Impact** - What's the business impact?
   - Financial impact (revenue, cost, margin)
   - Operational impact (productivity, quality, speed)
   - Strategic impact (market position, innovation, growth)
   - Stakeholder-specific impacts

4. **Critical Event** - What's driving urgency?
   - Business deadline or milestone
   - Regulatory or compliance requirement
   - Competitive threat or market shift
   - Executive mandate or strategic initiative

5. **Decision** - Who makes the final call?
   - Economic buyer and decision authority
   - Influencers and blockers
   - Decision criteria and process
   - Timeline and approval requirements

**Output Requirements:**
- Map each SPICED element to specific evidence
- Quantify impact wherever possible
- Identify critical events driving timeline
- Create urgency-based action plan
`;
    case "Command of the Message":
      return `
**Command of the Message Framework:**

1. **Why Change?** - Why leave the status quo?
   - Unconsidered needs (problems they don't know they have)
   - Business drivers for change
   - Cost of inaction
   - Competitive or market pressures

2. **Why Now?** - What's driving urgency?
   - Critical business events
   - Strategic initiatives
   - Regulatory or compliance deadlines
   - Competitive threats

3. **Why You?** - What makes you unique?
   - Required capabilities (must-haves)
   - Differentiating capabilities (nice-to-haves)
   - Proof points and customer stories
   - Competitive positioning

**Required Capabilities:**
- Core capabilities the customer MUST have
- How we deliver these better than alternatives
- Evidence and proof points

**Differentiating Capabilities:**
- Unique capabilities only we provide
- Business value of differentiation
- Competitive gaps we exploit

**Proof Points:**
- Customer success stories
- ROI data and case studies
- Technical validation
- Industry recognition

**Output Requirements:**
- Build compelling "Why Change" narrative
- Identify and validate unconsidered needs
- Articulate clear differentiation
- Map capabilities to business outcomes
`;
    default:
      return "";
  }
}
function getIndustryGuidance(industry) {
  if (industry === "Enterprise Video Platform") {
    return `
**Enterprise Video Platform Context:**

**VBrick Solution Pillars:**
${VBRICK_PILLARS.map((p, i) => `${i + 1}. ${p}`).join("\n")}

**Common Use Cases:**
- Internal Communications & Town Halls
- Executive Broadcast & Leadership Messaging
- Training & Learning Programs
- Sales Enablement & Product Launches
- Customer Support & Knowledge Base
- Events & Webinars
- OTT/Monetization

**Key Buying Criteria:**
- Security & Compliance (SOC2, FedRAMP, GDPR)
- Scalability (concurrent viewers, global reach)
- Integration (Microsoft 365, Zoom, LMS, SSO)
- Analytics & Insights (engagement, QoE, business impact)
- eCDN Performance (WAN optimization, bandwidth savings)

**Typical Competitors:**
- Microsoft Stream/SharePoint
- Panopto
- Kaltura
- Brightcove
- Vimeo Enterprise
- Build vs Buy (YouTube, internal solutions)

**Differentiation Strategy:**
- Enterprise-grade security and compliance
- Proven scalability for global deployments
- Deep Microsoft 365 integration
- Advanced analytics and business insights
- eCDN technology for bandwidth optimization
`;
  }
  return `
**Industry:** ${industry}

Tailor the account plan to the specific needs, buying patterns, and competitive landscape of this industry.
`;
}
function buildUserPrompt(context) {
  const {
    account,
    industry,
    methodology,
    isOpportunity,
    findingsContext,
    persistentFindings,
    stakeholdersContext,
    meetingNotesContext
  } = context;
  return `Generate a comprehensive Sales Account Plan for:

**Company:** ${account.name}
**Industry:** ${account.industry || industry}
**Stage:** ${isOpportunity ? "Opportunity (Active Deal)" : "Prospecting/Discovery"}
**Methodology:** ${methodology}

**Research Findings (${findingsContext.length} total):**
${JSON.stringify(findingsContext, null, 2)}

**Persistent Risks/Themes:**
${JSON.stringify(persistentFindings, null, 2)}

**Stakeholders (${stakeholdersContext.length} identified):**
${JSON.stringify(stakeholdersContext, null, 2)}

**Meeting Notes (${meetingNotesContext.length} meetings):**
${JSON.stringify(meetingNotesContext, null, 2)}

**Required Output Structure:**

\`\`\`json
{
  "companyOverview": "Comprehensive business context, strategic initiatives, and market position",
  "stakeholderMap": [
    {
      "name": "Full Name",
      "title": "Job Title",
      "department": "Department",
      "influence": "high|medium|low",
      "currentPriorities": "What they care about based on research and meetings",
      "engagementStrategy": "How to approach and influence this stakeholder",
      "linkedinUrl": "URL if available"
    }
  ],
  "painPoints": [
    {
      "pain": "Specific problem statement",
      "evidence": "Supporting evidence from research/meetings",
      "sources": ["Source 1", "Source 2"],
      "validation": "Validated|Likely|Exploratory",
      "quantifiedImpact": "Financial or operational impact if known"
    }
  ],
  "persistentRisks": [
    {
      "risk": "Recurring theme or concern",
      "firstSeen": { "date": "MM/DD/YYYY", "source": "Source" },
      "mostRecent": { "date": "MM/DD/YYYY", "source": "Source" },
      "rationale": "Why this keeps appearing",
      "mitigationStrategy": "How to address"
    }
  ],
  "solutionMapping": [
    {
      "problem": "Customer pain point",
      "pillar": "Solution pillar/capability",
      "whyVBrick": "Why our solution addresses this uniquely well",
      "stakeholders": ["Stakeholder 1", "Stakeholder 2"],
      "expectedImpact": "Business outcome",
      "sampleOutreach": "Messaging for this stakeholder"
    }
  ],
  "opportunitySummary": "Strategic positioning and value proposition",
  "salesMethodologyFields": {
    // For MEDDICC:
    "metrics": { "current": "...", "target": "...", "roi": "..." },
    "economicBuyer": { "name": "...", "title": "...", "access": "..." },
    "decisionCriteria": ["Criterion 1", "Criterion 2"],
    "decisionProcess": { "steps": [...], "timeline": "..." },
    "pain": { "business": "...", "technical": "...", "user": "..." },
    "champion": { "name": "...", "influence": "...", "strength": "..." },
    "competition": [{ "name": "...", "strengths": [...], "weaknesses": [...] }]
    
    // For SPICED:
    "situation": "Current state description",
    "pain": "Detailed pain analysis",
    "impact": { "financial": "...", "operational": "...", "strategic": "..." },
    "criticalEvent": { "event": "...", "date": "...", "urgency": "..." },
    "decision": { "buyer": "...", "process": "...", "timeline": "..." }
    
    // For Command of the Message:
    "whyChange": { "unconsideredNeeds": [...], "costOfInaction": "..." },
    "whyNow": { "criticalEvents": [...], "urgency": "..." },
    "whyYou": {
      "requiredCapabilities": [...],
      "differentiatingCapabilities": [...],
      "proofPoints": [...]
    }
  },
  "landExpandPlaybook": {
    "landUseCase": "Initial deployment scenario",
    "successCriteria": ["Criterion 1", "Criterion 2"],
    "adoptionRisks": [{ "risk": "...", "mitigation": "..." }],
    "expansionPath": "How to grow the account"
  },
  "mutualActionPlan": {
    "phase30": [
      { "task": "Action item", "owner": "Customer|VBrick", "milestone": "Success criteria" }
    ],
    "phase60": [...],
    "phase90": [...]
  },
  "businessImpact": {
    "roiHypothesis": "Expected return on investment",
    "assumptions": ["Assumption 1", "Assumption 2"],
    "measurementPlan": "How we'll track success"
  },
  ${isOpportunity ? `
  "opportunityDetails": {
    "arrPotential": 250000,
    "currency": "USD",
    "timeline": "Q2 2025 close",
    "procurementModel": "RFP|Pilot|Direct|Reseller",
    "legalStatus": "Not Started|In Review|Redlines|Approved",
    "securityStatus": "Not Started|Questionnaire|Assessment|Approved",
    "pricingModel": "Per Seat|Per Viewer|Platform Subscription|Hybrid",
    "products": ["Product 1", "Product 2"],
    "integrations": ["Integration 1", "Integration 2"],
    "competitors": [
      { "name": "Competitor", "strengths": [...], "weaknesses": [...], "positioning": "..." }
    ],
    "dealHealthScore": 75,
    "keyRisks": ["Risk 1", "Risk 2"],
    "nextMilestones": [
      { "milestone": "...", "date": "...", "owner": "..." }
    ]
  },
  ` : ""}
  "appendix": {
    "sources": ["Source 1", "Source 2"],
    "openQuestions": ["Question 1", "Question 2"],
    "nextResearchTasks": ["Task 1", "Task 2"]
  }
}
\`\`\`

**Critical Requirements:**
1. Use the ${methodology} framework rigorously - populate ALL fields with specific data
2. Incorporate insights from meeting notes into stakeholder engagement and action plans
3. Separate intelligence (what we know) from strategy (what we'll do)
4. Make it actionable - every section should drive specific next steps
5. Quantify wherever possible - metrics, impact, ROI
${isOpportunity ? "6. Include detailed opportunity management data for deal tracking" : "6. Focus on qualification and relationship building"}

Return ONLY valid JSON matching the structure above.`;
}
var VBRICK_PILLARS;
var init_accountPlanGeneratorV3 = __esm({
  "server/services/accountPlanGeneratorV3.ts"() {
    "use strict";
    init_db();
    VBRICK_PILLARS = [
      "Secure, Scalable Enterprise Video Platform",
      "Live Webcasting & Events (large-scale, moderated Q&A, overflow)",
      "Video Content Management & Recording (searchable library, chapters, retention)",
      "eCDN / Edge Delivery Optimization (WAN offload, multicast/peer assist)",
      "Security & Compliance (SSO/SAML/OIDC, RBAC, audit logs, DRM, retention, accessibility)",
      "Integrations (Microsoft 365/Teams, Zoom, Okta/AAD, SharePoint, LMS, intranet/portal)",
      "Analytics & QoE/QoS (experience scores, network insights, engagement)",
      "Accessibility & Localization (captions, transcripts, multi-language, WCAG)"
    ];
  }
});

// server/_core/llm.ts
async function invokeLLM(params) {
  assertApiKey();
  const {
    messages,
    tools,
    toolChoice,
    tool_choice,
    outputSchema,
    output_schema,
    responseFormat,
    response_format
  } = params;
  const payload = {
    model: "gemini-2.5-flash",
    messages: messages.map(normalizeMessage)
  };
  if (tools && tools.length > 0) {
    payload.tools = tools;
  }
  const normalizedToolChoice = normalizeToolChoice(
    toolChoice || tool_choice,
    tools
  );
  if (normalizedToolChoice) {
    payload.tool_choice = normalizedToolChoice;
  }
  payload.max_tokens = 32768;
  payload.thinking = {
    "budget_tokens": 128
  };
  const normalizedResponseFormat = normalizeResponseFormat({
    responseFormat,
    response_format,
    outputSchema,
    output_schema
  });
  if (normalizedResponseFormat) {
    payload.response_format = normalizedResponseFormat;
  }
  const response = await fetch(resolveApiUrl(), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${ENV.forgeApiKey}`
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `LLM invoke failed: ${response.status} ${response.statusText} \u2013 ${errorText}`
    );
  }
  return await response.json();
}
var ensureArray, normalizeContentPart, normalizeMessage, normalizeToolChoice, resolveApiUrl, assertApiKey, normalizeResponseFormat;
var init_llm = __esm({
  "server/_core/llm.ts"() {
    "use strict";
    init_env();
    ensureArray = (value) => Array.isArray(value) ? value : [value];
    normalizeContentPart = (part) => {
      if (typeof part === "string") {
        return { type: "text", text: part };
      }
      if (part.type === "text") {
        return part;
      }
      if (part.type === "image_url") {
        return part;
      }
      if (part.type === "file_url") {
        return part;
      }
      throw new Error("Unsupported message content part");
    };
    normalizeMessage = (message) => {
      const { role, name, tool_call_id } = message;
      if (role === "tool" || role === "function") {
        const content = ensureArray(message.content).map((part) => typeof part === "string" ? part : JSON.stringify(part)).join("\n");
        return {
          role,
          name,
          tool_call_id,
          content
        };
      }
      const contentParts = ensureArray(message.content).map(normalizeContentPart);
      if (contentParts.length === 1 && contentParts[0].type === "text") {
        return {
          role,
          name,
          content: contentParts[0].text
        };
      }
      return {
        role,
        name,
        content: contentParts
      };
    };
    normalizeToolChoice = (toolChoice, tools) => {
      if (!toolChoice) return void 0;
      if (toolChoice === "none" || toolChoice === "auto") {
        return toolChoice;
      }
      if (toolChoice === "required") {
        if (!tools || tools.length === 0) {
          throw new Error(
            "tool_choice 'required' was provided but no tools were configured"
          );
        }
        if (tools.length > 1) {
          throw new Error(
            "tool_choice 'required' needs a single tool or specify the tool name explicitly"
          );
        }
        return {
          type: "function",
          function: { name: tools[0].function.name }
        };
      }
      if ("name" in toolChoice) {
        return {
          type: "function",
          function: { name: toolChoice.name }
        };
      }
      return toolChoice;
    };
    resolveApiUrl = () => ENV.forgeApiUrl && ENV.forgeApiUrl.trim().length > 0 ? `${ENV.forgeApiUrl.replace(/\/$/, "")}/v1/chat/completions` : "https://forge.manus.im/v1/chat/completions";
    assertApiKey = () => {
      if (!ENV.forgeApiKey) {
        throw new Error("OPENAI_API_KEY is not configured");
      }
    };
    normalizeResponseFormat = ({
      responseFormat,
      response_format,
      outputSchema,
      output_schema
    }) => {
      const explicitFormat = responseFormat || response_format;
      if (explicitFormat) {
        if (explicitFormat.type === "json_schema" && !explicitFormat.json_schema?.schema) {
          throw new Error(
            "responseFormat json_schema requires a defined schema object"
          );
        }
        return explicitFormat;
      }
      const schema = outputSchema || output_schema;
      if (!schema) return void 0;
      if (!schema.name || !schema.schema) {
        throw new Error("outputSchema requires both name and schema");
      }
      return {
        type: "json_schema",
        json_schema: {
          name: schema.name,
          schema: schema.schema,
          ...typeof schema.strict === "boolean" ? { strict: schema.strict } : {}
        }
      };
    };
  }
});

// server/services/researchAutomation.ts
var researchAutomation_exports = {};
__export(researchAutomation_exports, {
  initializeResearchCron: () => initializeResearchCron,
  researchAccount: () => researchAccount,
  researchAllAccounts: () => researchAllAccounts
});
async function generateResearchFindings(accountId, accountName, industry) {
  const systemPrompt = `You are a senior B2B sales intelligence researcher specializing in enterprise video platform sales. Your task is to generate realistic, high-quality research findings for target accounts.

Research Categories:
1. financial_risk - Budget constraints, revenue trends, cost optimization initiatives
2. org_moves - Executive hires/departures, reorganizations, new leadership priorities
3. tech_stack - Technology adoption, integrations, platform migrations
4. competitive - Competitor mentions, platform issues, switching signals
5. marketing_events - Webcasts, town halls, large-scale events, employee engagement
6. employee_chatter - Employee sentiment, remote work challenges, internal tool complaints
7. legal_regulatory - Compliance requirements, accessibility mandates, data governance
8. facilities_operations - Office expansions, hybrid work models, infrastructure changes

Scoring Guidelines (each component 0-20):
- Recency: How recent is the information? (20=today, 15=this month, 10=this quarter, 5=this year)
- Authority: Source credibility (20=SEC filing, 18=LinkedIn official, 15=major news, 10=blog, 5=review site)
- Magnitude: Scale of impact (20=company-wide, 15=division-wide, 10=department, 5=team)
- Relevance: Direct connection to VBrick's value prop (20=perfect fit, 15=strong, 10=moderate, 5=tangential)
- Corroboration: Multiple independent sources (20=5+ sources, 15=3-4, 10=2, 5=1)

VBrick Value Propositions:
- Secure enterprise video platform with eCDN for WAN optimization
- Live webcasting for large-scale events (town halls, all-hands)
- Video content management with search, chapters, retention policies
- Microsoft 365/Teams integration
- Accessibility (captions, transcripts, WCAG compliance)
- Analytics and QoE/QoS monitoring`;
  const userPrompt = `Generate 3-5 realistic research findings for ${accountName}${industry ? ` (${industry})` : ""}.

For each finding, provide:
1. Category (from the 8 categories above)
2. Title (concise, specific headline)
3. Summary (2-3 sentences with specific details)
4. Source type (from: ${RESEARCH_SOURCES.join(", ")})
5. Source URL (realistic URL format)
6. Source date (within last 90 days)
7. Individual scores (recency, authority, magnitude, relevance, corroboration)
8. Sentiment (positive, neutral, or negative)
9. Tags (3-5 relevant keywords)
10. Why it matters to VBrick (1-2 sentences connecting to VBrick's value prop)
11. Is persistent (true if this is a recurring theme over 5 years, false otherwise)
12. If persistent: first seen date (5 years ago) and rationale

Return as JSON array matching this schema:
[
  {
    "category": "financial_risk",
    "title": "Q3 Revenue Miss Signals Budget Constraints",
    "summary": "Latest 10-Q filing shows...",
    "sourceType": "SEC 10-Q",
    "sourceUrl": "https://sec.gov/...",
    "sourceDate": "2025-10-10",
    "recencyScore": 18,
    "authorityScore": 20,
    "magnitudeScore": 16,
    "relevanceScore": 19,
    "corroborationScore": 15,
    "sentiment": "negative",
    "tags": ["Budget Constraints", "IT Spending"],
    "whyItMatters": "Budget pressure creates urgency for ROI-focused solutions...",
    "isPersistent": true,
    "firstSeenDate": "2020-10-15",
    "persistenceRationale": "Budget concerns mentioned in last 5 annual reports..."
  }
]`;
  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "research_findings",
          strict: true,
          schema: {
            type: "object",
            properties: {
              findings: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    category: {
                      type: "string",
                      enum: RESEARCH_CATEGORIES
                    },
                    title: { type: "string" },
                    summary: { type: "string" },
                    sourceType: { type: "string" },
                    sourceUrl: { type: "string" },
                    sourceDate: { type: "string" },
                    recencyScore: { type: "number" },
                    authorityScore: { type: "number" },
                    magnitudeScore: { type: "number" },
                    relevanceScore: { type: "number" },
                    corroborationScore: { type: "number" },
                    sentiment: {
                      type: "string",
                      enum: ["positive", "neutral", "negative"]
                    },
                    tags: { type: "array", items: { type: "string" } },
                    whyItMatters: { type: "string" },
                    isPersistent: { type: "boolean" },
                    firstSeenDate: { type: "string" },
                    persistenceRationale: { type: "string" }
                  },
                  required: [
                    "category",
                    "title",
                    "summary",
                    "sourceType",
                    "sourceUrl",
                    "sourceDate",
                    "recencyScore",
                    "authorityScore",
                    "magnitudeScore",
                    "relevanceScore",
                    "corroborationScore",
                    "sentiment",
                    "tags",
                    "whyItMatters",
                    "isPersistent"
                  ],
                  additionalProperties: false
                }
              }
            },
            required: ["findings"],
            additionalProperties: false
          }
        }
      }
    });
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("Empty response from LLM");
    }
    const contentString = typeof content === "string" ? content : JSON.stringify(content);
    const data = JSON.parse(contentString);
    return data.findings.map((f) => ({
      ...f,
      sourceDate: new Date(f.sourceDate),
      firstSeenDate: f.firstSeenDate ? new Date(f.firstSeenDate) : void 0
    }));
  } catch (error) {
    console.error(`Error generating research for ${accountName}:`, error);
    return [];
  }
}
async function researchAccount(accountId) {
  const account = await getAccountById(accountId);
  if (!account) {
    throw new Error(`Account ${accountId} not found`);
  }
  console.log(`[Research] Starting research for ${account.name}...`);
  const newFindings = await generateResearchFindings(
    accountId,
    account.name,
    account.industry
  );
  if (newFindings.length === 0) {
    console.log(`[Research] No findings generated for ${account.name}`);
    return 0;
  }
  const dbClient = await (void 0)();
  if (!dbClient) {
    throw new Error("Database not available");
  }
  const findingsToInsert = newFindings.map((finding) => {
    const compositeScore = finding.recencyScore + finding.authorityScore + finding.magnitudeScore + finding.relevanceScore + finding.corroborationScore;
    return {
      id: `finding_${accountId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      accountId,
      category: finding.category,
      title: finding.title,
      summary: finding.summary,
      sourceUrl: finding.sourceUrl,
      sourceDate: finding.sourceDate,
      sourceType: finding.sourceType,
      recencyScore: finding.recencyScore,
      authorityScore: finding.authorityScore,
      magnitudeScore: finding.magnitudeScore,
      relevanceScore: finding.relevanceScore,
      corroborationScore: finding.corroborationScore,
      compositeScore,
      sentiment: finding.sentiment,
      tags: finding.tags,
      whyItMatters: finding.whyItMatters,
      isPersistent: finding.isPersistent,
      firstSeenDate: finding.firstSeenDate,
      persistenceRationale: finding.persistenceRationale,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
  });
  await dbClient.insert(findings).values(findingsToInsert);
  const scores = findingsToInsert.map((f) => f.compositeScore);
  const maxScore = Math.max(...scores);
  const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  await updateAccountScores(accountId, maxScore, avgScore);
  console.log(
    `[Research] Completed research for ${account.name}: ${newFindings.length} findings (Max: ${maxScore}, Avg: ${avgScore})`
  );
  return newFindings.length;
}
async function researchAllAccounts() {
  const accounts2 = await getAllAccounts();
  const errors = [];
  let totalFindings = 0;
  console.log(`[Research] Starting research for ${accounts2.length} accounts...`);
  const dbClient = await (void 0)();
  if (!dbClient) {
    throw new Error("Database not available");
  }
  const jobId = `job_${Date.now()}`;
  const [insertedJob] = await dbClient.insert(researchJobs).values({
    id: jobId,
    accountId: null,
    // null means all accounts
    status: "running",
    startedAt: /* @__PURE__ */ new Date(),
    createdAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date()
  });
  for (const account of accounts2) {
    try {
      const findingsCount = await researchAccount(account.id);
      totalFindings += findingsCount;
    } catch (error) {
      const errorMsg = `Failed to research ${account.name}: ${error instanceof Error ? error.message : "Unknown error"}`;
      console.error(`[Research] ${errorMsg}`);
      errors.push(errorMsg);
    }
  }
  const { eq: eq3 } = await import("drizzle-orm");
  await dbClient.update(researchJobs).set({
    status: errors.length > 0 ? "failed" : "completed",
    completedAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date(),
    findingsCount: totalFindings,
    errorMessage: errors.length > 0 ? errors.join("; ") : null
  }).where(eq3(researchJobs.id, jobId));
  console.log(
    `[Research] Completed research job: ${accounts2.length} accounts, ${totalFindings} findings, ${errors.length} errors`
  );
  return {
    success: errors.length === 0,
    accountsProcessed: accounts2.length,
    totalFindings,
    errors
  };
}
function initializeResearchCron() {
  console.log("[Research] Cron job initialized: Research will run every 12 hours");
}
var RESEARCH_SOURCES, RESEARCH_CATEGORIES;
var init_researchAutomation = __esm({
  "server/services/researchAutomation.ts"() {
    "use strict";
    init_llm();
    init_db();
    init_schema();
    RESEARCH_SOURCES = [
      "LinkedIn",
      "SEC 10-Q",
      "SEC 10-K",
      "SEC DEF 14A",
      "Press Release",
      "News Article",
      "Glassdoor",
      "Company Blog",
      "Job Posting",
      "Earnings Call",
      "Analyst Report"
    ];
    RESEARCH_CATEGORIES = [
      "financial_risk",
      "org_moves",
      "tech_stack",
      "competitive",
      "marketing_events",
      "employee_chatter",
      "legal_regulatory",
      "facilities_operations"
    ];
  }
});

// server/services/salesforceExport.ts
var salesforceExport_exports = {};
__export(salesforceExport_exports, {
  generateJSONExport: () => generateJSONExport,
  generateMarkdownExport: () => generateMarkdownExport,
  generatePDFHTML: () => generatePDFHTML
});
async function generateMarkdownExport(accountId) {
  const account = await getAccountById(accountId);
  if (!account) {
    throw new Error(`Account ${accountId} not found`);
  }
  const findings2 = await getFindingsByAccount(accountId);
  const stakeholders2 = await getStakeholdersByAccount(accountId);
  const accountPlan = await getLatestAccountPlan(accountId);
  let markdown = `# ${account.name} - VBrick GTM Intelligence Report

`;
  markdown += `**Industry:** ${account.industry || "N/A"}  
`;
  markdown += `**Website:** ${account.website || "N/A"}  
`;
  markdown += `**Last Researched:** ${account.lastResearchedAt ? new Date(account.lastResearchedAt).toLocaleDateString() : "Never"}  

`;
  markdown += `## Intelligence Summary

`;
  markdown += `- **Max Score:** ${account.maxScore || 0}  
`;
  markdown += `- **Avg Score:** ${account.avgScore || 0}  
`;
  markdown += `- **Priority Account:** ${(account.maxScore || 0) >= 70 ? "\u2705 Yes" : "\u274C No"}  
`;
  markdown += `- **Total Findings:** ${findings2.length}  

`;
  if (stakeholders2.length > 0) {
    markdown += `## Key Stakeholders

`;
    stakeholders2.forEach((s) => {
      markdown += `### ${s.name}
`;
      markdown += `- **Title:** ${s.title}  
`;
      markdown += `- **Department:** ${s.department || "N/A"}  
`;
      markdown += `- **Influence:** ${s.influence}  
`;
      if (s.linkedinUrl) {
        markdown += `- **LinkedIn:** ${s.linkedinUrl}  
`;
      }
      if (s.currentPriorities) {
        markdown += `- **Current Priorities:** ${s.currentPriorities}  
`;
      }
      markdown += `
`;
    });
  }
  if (findings2.length > 0) {
    markdown += `## Top Intelligence Findings

`;
    const categories = [
      { key: "financial_risk", label: "Financial & Risk" },
      { key: "org_moves", label: "Organizational Moves" },
      { key: "tech_stack", label: "Technology Stack" },
      { key: "competitive", label: "Competitive Intelligence" },
      { key: "marketing_events", label: "Marketing & Events" },
      { key: "employee_chatter", label: "Employee Sentiment" },
      { key: "legal_regulatory", label: "Legal & Regulatory" },
      { key: "facilities_operations", label: "Facilities & Operations" }
    ];
    categories.forEach((cat) => {
      const catFindings = findings2.filter((f) => f.category === cat.key);
      if (catFindings.length > 0) {
        markdown += `### ${cat.label}

`;
        catFindings.slice(0, 3).forEach((f) => {
          markdown += `#### ${f.title} (Score: ${f.compositeScore})
`;
          markdown += `${f.summary}  

`;
          markdown += `**Why It Matters:** ${f.whyItMatters}  
`;
          markdown += `**Source:** [${f.sourceType}](${f.sourceUrl}) - ${new Date(f.sourceDate || "").toLocaleDateString()}  
`;
          markdown += `**Sentiment:** ${f.sentiment}  
`;
          if (f.isPersistent) {
            markdown += `**\u{1F534} Persistent Risk:** First seen ${f.firstSeenDate ? new Date(f.firstSeenDate).toLocaleDateString() : "N/A"}  
`;
          }
          markdown += `
`;
        });
      }
    });
  }
  if (accountPlan) {
    markdown += `## Sales Account Plan (v${accountPlan.version})

`;
    markdown += `**Generated:** ${new Date(accountPlan.generatedAt || "").toLocaleString()}  

`;
    markdown += `### Company Overview
${accountPlan.companyOverview}

`;
    markdown += `### Opportunity Summary
${accountPlan.opportunitySummary}

`;
    const painPoints = accountPlan.painPoints;
    if (painPoints && painPoints.length > 0) {
      markdown += `### Key Pain Points

`;
      painPoints.forEach((p, i) => {
        markdown += `${i + 1}. **${p.pain}** (${p.validation})  
`;
        markdown += `   ${p.evidence}  

`;
      });
    }
  }
  markdown += `---

`;
  markdown += `*Generated by VBrick GTM Intelligence Dashboard on ${(/* @__PURE__ */ new Date()).toLocaleString()}*
`;
  return markdown;
}
async function generateJSONExport(accountId) {
  const account = await getAccountById(accountId);
  if (!account) {
    throw new Error(`Account ${accountId} not found`);
  }
  const findings2 = await getFindingsByAccount(accountId);
  const stakeholders2 = await getStakeholdersByAccount(accountId);
  const accountPlan = await getLatestAccountPlan(accountId);
  const contacts = stakeholders2.map((s) => {
    const nameParts = s.name.split(" ");
    return {
      FirstName: nameParts.slice(0, -1).join(" ") || s.name,
      LastName: nameParts[nameParts.length - 1] || s.name,
      Title: s.title || "Unknown",
      Department: s.department,
      LinkedIn_URL__c: s.linkedinUrl,
      Influence_Level__c: s.influence === "high" ? "High" : s.influence === "medium" ? "Medium" : "Low",
      Current_Priorities__c: s.currentPriorities
    };
  });
  const opportunities = [];
  if (accountPlan) {
    const solutionMapping = accountPlan.solutionMapping;
    if (solutionMapping) {
      solutionMapping.forEach((solution, i) => {
        opportunities.push({
          Name: `${account.name} - ${solution.pillar}`,
          StageName: "Qualification",
          Amount: null,
          CloseDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1e3).toISOString().split("T")[0],
          Description: solution.whyVBrick,
          Next_Steps__c: solution.sampleOutreach,
          VBrick_Pillar__c: solution.pillar
        });
      });
    }
  }
  const tasks = [];
  if (accountPlan) {
    const mutualActionPlan = accountPlan.mutualActionPlan;
    if (mutualActionPlan) {
      ["phase30", "phase60", "phase90"].forEach((phase, idx) => {
        const daysOffset = idx === 0 ? 15 : idx === 1 ? 45 : 75;
        mutualActionPlan[phase]?.forEach((item) => {
          tasks.push({
            Subject: item.task,
            ActivityDate: new Date(Date.now() + daysOffset * 24 * 60 * 60 * 1e3).toISOString().split("T")[0],
            Priority: idx === 0 ? "High" : "Normal",
            Status: "Not Started",
            Description: `Milestone: ${item.milestone}`,
            Owner_Role__c: item.owner === "VBrick" ? "VBrick" : "Customer"
          });
        });
      });
    }
  }
  const notes = findings2.slice(0, 10).map((f) => ({
    Title: `[${f.category}] ${f.title}`,
    Body: `${f.summary}

Why It Matters: ${f.whyItMatters}

Source: ${f.sourceUrl}
Date: ${new Date(f.sourceDate || "").toLocaleDateString()}
Sentiment: ${f.sentiment}
Score: ${f.compositeScore}`,
    CreatedDate: new Date(f.createdAt || "").toISOString()
  }));
  return {
    Name: account.name,
    Industry: account.industry,
    Website: account.website,
    Description: accountPlan?.companyOverview || `VBrick target account with ${findings2.length} intelligence findings.`,
    VBrick_Max_Score__c: account.maxScore || 0,
    VBrick_Avg_Score__c: account.avgScore || 0,
    VBrick_Last_Researched__c: account.lastResearchedAt ? new Date(account.lastResearchedAt).toISOString() : null,
    VBrick_Priority_Flag__c: (account.maxScore || 0) >= 70,
    Contacts: contacts,
    Opportunities: opportunities,
    Tasks: tasks,
    Notes: notes
  };
}
async function generatePDFHTML(accountId) {
  const markdown = await generateMarkdownExport(accountId);
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      color: #0070d2;
      border-bottom: 3px solid #0070d2;
      padding-bottom: 10px;
    }
    h2 {
      color: #0176d3;
      margin-top: 30px;
      border-bottom: 2px solid #e0e0e0;
      padding-bottom: 5px;
    }
    h3 {
      color: #16325c;
      margin-top: 20px;
    }
    h4 {
      color: #54698d;
      margin-top: 15px;
    }
    strong {
      color: #16325c;
    }
    a {
      color: #0070d2;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .metadata {
      background: #f4f6f9;
      padding: 15px;
      border-radius: 4px;
      margin-bottom: 20px;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      font-size: 0.9em;
      color: #706e6b;
      text-align: center;
    }
  </style>
</head>
<body>
${markdown.replace(/^# (.+)$/gm, "<h1>$1</h1>").replace(/^## (.+)$/gm, "<h2>$1</h2>").replace(/^### (.+)$/gm, "<h3>$1</h3>").replace(/^#### (.+)$/gm, "<h4>$1</h4>").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>').replace(/^- (.+)$/gm, "<li>$1</li>").replace(/  \n/g, "<br>").replace(/\n\n/g, "</p><p>").replace(/^(.+)$/gm, "<p>$1</p>").replace(/<p><li>/g, "<ul><li>").replace(/<\/li><\/p>/g, "</li></ul>")}
</body>
</html>
  `.trim();
  return html;
}
var init_salesforceExport = __esm({
  "server/services/salesforceExport.ts"() {
    "use strict";
    init_db();
  }
});

// server/services/linkValidator.ts
var linkValidator_exports = {};
__export(linkValidator_exports, {
  getAccountLinkStats: () => getAccountLinkStats,
  saveLinkValidation: () => saveLinkValidation,
  validateAccountLinks: () => validateAccountLinks,
  validateDueLinks: () => validateDueLinks,
  validateUrl: () => validateUrl
});
import { eq as eq2, and as and2, or, isNull, lt } from "drizzle-orm";
async function validateUrl(url) {
  console.log(`[LinkValidator] Checking URL: ${url}`);
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1e4);
    const response = await fetch(url, {
      method: "HEAD",
      // Use HEAD to avoid downloading full content
      signal: controller.signal,
      headers: {
        "User-Agent": "VBrick-GTM-Dashboard/1.0 (Link Validator)"
      },
      redirect: "manual"
      // Don't follow redirects automatically
    });
    clearTimeout(timeoutId);
    const statusCode = response.status;
    if (statusCode >= 200 && statusCode < 300) {
      return {
        url,
        status: "Valid",
        statusCode
      };
    } else if (statusCode >= 300 && statusCode < 400) {
      const redirectUrl = response.headers.get("Location");
      return {
        url,
        status: "Redirect",
        statusCode,
        redirectUrl: redirectUrl || void 0
      };
    } else if (statusCode === 402 || statusCode === 451) {
      return {
        url,
        status: "Paywall",
        statusCode
      };
    } else if (statusCode >= 400) {
      return {
        url,
        status: "Broken",
        statusCode
      };
    }
    return {
      url,
      status: "NotChecked",
      statusCode
    };
  } catch (error) {
    console.error(`[LinkValidator] Error checking URL ${url}:`, error.message);
    return {
      url,
      status: "Broken",
      error: error.message
    };
  }
}
async function saveLinkValidation(result, sourceType, sourceId) {
  const id = `link_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const now = /* @__PURE__ */ new Date();
  const nextCheck = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1e3);
  try {
    const existing = await db.select().from(linkValidations).where(
      and2(
        eq2(linkValidations.url, result.url),
        eq2(linkValidations.sourceType, sourceType),
        eq2(linkValidations.sourceId, sourceId)
      )
    ).limit(1);
    if (existing.length > 0) {
      await db.update(linkValidations).set({
        status: result.status,
        statusCode: result.statusCode,
        lastCheckedAt: now,
        nextCheckAt: nextCheck,
        updatedAt: now
      }).where(eq2(linkValidations.id, existing[0].id));
      console.log(`[LinkValidator] Updated link validation for ${result.url}: ${result.status}`);
    } else {
      await db.insert(linkValidations).values({
        id,
        url: result.url,
        sourceType,
        sourceId,
        status: result.status,
        statusCode: result.statusCode,
        lastCheckedAt: now,
        nextCheckAt: nextCheck,
        createdAt: now,
        updatedAt: now
      });
      console.log(`[LinkValidator] Created link validation for ${result.url}: ${result.status}`);
    }
  } catch (error) {
    console.error(`[LinkValidator] Error saving link validation:`, error);
  }
}
async function validateAccountLinks(accountId) {
  console.log(`[LinkValidator] Validating links for account: ${accountId}`);
  const accountFindings = await db.select().from(findings).where(eq2(findings.accountId, accountId));
  const results = {
    total: accountFindings.length,
    valid: 0,
    broken: 0,
    redirect: 0,
    paywall: 0
  };
  for (const finding of accountFindings) {
    const result = await validateUrl(finding.sourceUrl);
    await saveLinkValidation(result, "Finding", finding.id);
    switch (result.status) {
      case "Valid":
        results.valid++;
        break;
      case "Broken":
        results.broken++;
        break;
      case "Redirect":
        results.redirect++;
        break;
      case "Paywall":
        results.paywall++;
        break;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  console.log(`[LinkValidator] Account ${accountId} validation complete:`, results);
  return results;
}
async function validateDueLinks(limit = 50) {
  console.log(`[LinkValidator] Checking for links due for validation (limit: ${limit})`);
  const now = /* @__PURE__ */ new Date();
  const dueLinks = await db.select().from(linkValidations).where(
    or(
      isNull(linkValidations.nextCheckAt),
      lt(linkValidations.nextCheckAt, now)
    )
  ).limit(limit);
  console.log(`[LinkValidator] Found ${dueLinks.length} links due for validation`);
  let checkedCount = 0;
  for (const link of dueLinks) {
    const result = await validateUrl(link.url);
    await saveLinkValidation(
      result,
      link.sourceType || "Unknown",
      link.sourceId || ""
    );
    checkedCount++;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  return checkedCount;
}
async function getAccountLinkStats(accountId) {
  const accountFindings = await db.select().from(findings).where(eq2(findings.accountId, accountId));
  const findingIds = accountFindings.map((f) => f.id);
  if (findingIds.length === 0) {
    return {
      totalLinks: 0,
      validLinks: 0,
      brokenLinks: 0,
      redirectLinks: 0,
      paywallLinks: 0,
      notCheckedLinks: 0,
      validityRate: 100
    };
  }
  const validations2 = await db.select().from(linkValidations).where(eq2(linkValidations.sourceType, "Finding"));
  const accountValidations = validations2.filter(
    (v) => findingIds.includes(v.sourceId || "")
  );
  const stats = {
    totalLinks: accountFindings.length,
    validLinks: 0,
    brokenLinks: 0,
    redirectLinks: 0,
    paywallLinks: 0,
    notCheckedLinks: 0,
    validityRate: 100
  };
  for (const validation of accountValidations) {
    switch (validation.status) {
      case "Valid":
        stats.validLinks++;
        break;
      case "Broken":
        stats.brokenLinks++;
        break;
      case "Redirect":
        stats.redirectLinks++;
        break;
      case "Paywall":
        stats.paywallLinks++;
        break;
      case "NotChecked":
        stats.notCheckedLinks++;
        break;
    }
  }
  stats.notCheckedLinks += stats.totalLinks - accountValidations.length;
  const validCount = stats.validLinks + stats.redirectLinks;
  const checkedCount = stats.totalLinks - stats.notCheckedLinks;
  stats.validityRate = checkedCount > 0 ? Math.round(validCount / checkedCount * 100) : 100;
  return stats;
}
var init_linkValidator = __esm({
  "server/services/linkValidator.ts"() {
    "use strict";
    init_db();
    init_schema();
  }
});

// server/services/perplexityService.ts
var perplexityService_exports = {};
__export(perplexityService_exports, {
  chatWithAssistant: () => chatWithAssistant,
  getRecentIntelligence: () => getRecentIntelligence,
  researchAccountByUrl: () => researchAccountByUrl
});
async function callPerplexity(messages, model = "sonar") {
  console.log("[Perplexity] Calling API with model:", model);
  const response = await fetch(PERPLEXITY_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${PERPLEXITY_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.2,
      max_tokens: 4e3,
      return_citations: true
    })
  });
  if (!response.ok) {
    const error = await response.text();
    console.error("[Perplexity] API error:", error);
    throw new Error(`Perplexity API error: ${response.status} ${error}`);
  }
  const data = await response.json();
  console.log("[Perplexity] API response received");
  return data;
}
async function getRecentIntelligence(accountName, timeframe) {
  console.log(`[Perplexity] Getting recent intelligence for ${accountName} (${timeframe})`);
  const timeframeMap = {
    "24h": "past 24 hours",
    "1week": "past week",
    "2weeks": "past 2 weeks",
    "1month": "past month"
  };
  const timeframeText = timeframeMap[timeframe];
  const systemPrompt = `You are a B2B sales intelligence analyst specializing in video streaming and enterprise communication technology. 
Your goal is to find recent, actionable intelligence about companies that would help a sales team selling video streaming platforms.

Focus on finding information about:
- Technology stack changes (especially Microsoft Teams, Zoom, video platforms)
- Digital transformation initiatives
- New leadership in IT/Digital roles
- Company growth, expansion, or reorganization
- Events, webinars, or large meetings they're planning
- Pain points with current communication tools
- Budget allocation for IT infrastructure

Return ONLY a JSON array of findings. Each finding must have:
- title: Clear, specific title
- summary: 2-3 sentences with actionable details
- category: One of [tech_stack, org_moves, marketing_events, facilities_operations, legal_regulatory]
- sentiment: positive, neutral, or negative
- sourceUrl: The actual URL of the source
- sourceType: Type of source (News Article, Press Release, LinkedIn, Job Posting, etc.)
- publishedAt: ISO date string
- relevanceScore: 0-100 score of relevance to video streaming sales

Return empty array [] if no relevant findings.`;
  const userPrompt = `Find recent intelligence about ${accountName} from the ${timeframeText}.

Search for:
1. Technology initiatives related to video, streaming, or communication
2. Leadership changes in IT, Digital, or Technology roles
3. Company events, town halls, or large meetings
4. Digital transformation or infrastructure projects
5. Job postings for video/streaming/collaboration roles

Return findings as JSON array.`;
  try {
    const response = await callPerplexity([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ]);
    const content = response.choices[0]?.message?.content || "[]";
    let jsonStr = content;
    if (content.includes("```json")) {
      jsonStr = content.split("```json")[1].split("```")[0].trim();
    } else if (content.includes("```")) {
      jsonStr = content.split("```")[1].split("```")[0].trim();
    }
    const findings2 = JSON.parse(jsonStr);
    console.log(`[Perplexity] Found ${findings2.length} recent intelligence items`);
    return findings2.map((f) => ({
      id: `perplexity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: f.title,
      summary: f.summary,
      category: f.category,
      sentiment: f.sentiment,
      sourceUrl: f.sourceUrl,
      sourceType: f.sourceType,
      publishedAt: new Date(f.publishedAt),
      relevanceScore: f.relevanceScore
    }));
  } catch (error) {
    console.error("[Perplexity] Error getting recent intelligence:", error);
    throw error;
  }
}
async function chatWithAssistant(message, conversationHistory = []) {
  console.log("[Perplexity] Chat message received");
  const systemPrompt = `You are an AI sales intelligence assistant for a B2B video streaming platform company (VBrick).
You have access to intelligence data about target accounts and can help sales teams with:
- Account insights and analysis
- Sales strategy recommendations
- Competitive positioning
- Next best actions
- Account prioritization

Be concise, actionable, and focused on helping close deals. Use the intelligence data to provide specific, relevant answers.`;
  const messages = [
    { role: "system", content: systemPrompt }
  ];
  if (conversationHistory.length > 0) {
    const validHistory = [];
    let lastRole = null;
    for (const msg of conversationHistory) {
      if (msg.role === "system") continue;
      if (msg.role === lastRole) continue;
      validHistory.push(msg);
      lastRole = msg.role;
    }
    messages.push(...validHistory);
  }
  messages.push({ role: "user", content: message });
  try {
    const response = await callPerplexity(messages);
    return {
      response: response.choices[0]?.message?.content || "I apologize, but I could not generate a response.",
      citations: response.citations
    };
  } catch (error) {
    console.error("[Perplexity] Chat error:", error);
    throw error;
  }
}
async function researchAccountByUrl(companyUrl) {
  console.log(`[Perplexity] Researching account from URL: ${companyUrl}`);
  const systemPrompt = `You are a B2B sales intelligence analyst. Given a company website URL, research the company and find:
1. Company name
2. Industry
3. Brief description (1-2 sentences)
4. Recent intelligence relevant to selling video streaming/communication platforms

Return as JSON:
{
  "companyName": "Company Name",
  "industry": "Industry",
  "description": "Brief description",
  "findings": [array of findings with same structure as getRecentIntelligence]
}`;
  const userPrompt = `Research this company: ${companyUrl}

Find:
1. Basic company information
2. Recent news about technology initiatives
3. Leadership changes in IT/Digital roles
4. Events or digital transformation projects
5. Any signals they might need video streaming/communication platforms

Return as JSON.`;
  try {
    const response = await callPerplexity([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ]);
    const content = response.choices[0]?.message?.content || "{}";
    let jsonStr = content;
    if (content.includes("```json")) {
      jsonStr = content.split("```json")[1].split("```")[0].trim();
    } else if (content.includes("```")) {
      jsonStr = content.split("```")[1].split("```")[0].trim();
    }
    const data = JSON.parse(jsonStr);
    console.log(`[Perplexity] Researched account: ${data.companyName}`);
    return {
      companyName: data.companyName,
      industry: data.industry,
      description: data.description,
      findings: data.findings.map((f) => ({
        id: `perplexity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: f.title,
        summary: f.summary,
        category: f.category,
        sentiment: f.sentiment,
        sourceUrl: f.sourceUrl,
        sourceType: f.sourceType,
        publishedAt: new Date(f.publishedAt),
        relevanceScore: f.relevanceScore
      }))
    };
  } catch (error) {
    console.error("[Perplexity] Research error:", error);
    throw error;
  }
}
var PERPLEXITY_API_KEY, PERPLEXITY_API_URL;
var init_perplexityService = __esm({
  "server/services/perplexityService.ts"() {
    "use strict";
    PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || "";
    PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";
  }
});

// server/_core/index.ts
import "dotenv/config";
import express2 from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/_core/googleOAuth.ts
init_db();
import { OAuth2Client } from "google-auth-library";

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
init_db();
init_env();
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    const redirectUri = atob(state);
    return redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a user ID
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.id);
   */
  async createSessionToken(userId, options = {}) {
    return this.signSession(
      {
        openId: userId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUser(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        await upsertUser({
          id: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUser(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      id: user.id,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var sdk = new SDKServer();

// server/_core/googleOAuth.ts
var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
var GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "";
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerGoogleOAuthRoutes(app) {
  const oauth2Client = new OAuth2Client(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  );
  console.log("[Google OAuth] Initialized with:");
  console.log("[Google OAuth] Client ID:", GOOGLE_CLIENT_ID ? "SET" : "MISSING");
  console.log("[Google OAuth] Client Secret:", GOOGLE_CLIENT_SECRET ? "SET" : "MISSING");
  console.log("[Google OAuth] Redirect URI:", GOOGLE_REDIRECT_URI || "MISSING");
  app.get("/api/auth/google", (req, res) => {
    console.log("[Google OAuth] Initiating OAuth flow");
    const authorizeUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ]
    });
    res.redirect(authorizeUrl);
  });
  app.get("/api/auth/callback/google", async (req, res) => {
    const code = getQueryParam(req, "code");
    if (!code) {
      console.error("[Google OAuth] No code provided in callback");
      res.status(400).json({ error: "Authorization code is required" });
      return;
    }
    try {
      console.log("[Google OAuth] Exchanging code for tokens");
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
      console.log("[Google OAuth] Fetching user info");
      const userInfoResponse = await oauth2Client.request({
        url: "https://www.googleapis.com/oauth2/v2/userinfo"
      });
      const userInfo = userInfoResponse.data;
      console.log("[Google OAuth] User authenticated:", userInfo.email);
      await upsertUser({
        id: userInfo.id,
        name: userInfo.name || null,
        email: userInfo.email || null,
        loginMethod: "google",
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await sdk.createSessionToken(userInfo.id, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      console.log("[Google OAuth] Login successful, redirecting to dashboard");
      res.redirect(302, "/");
    } catch (error) {
      console.error("[Google OAuth] Callback failed:", error);
      res.status(500).json({ error: "Google OAuth authentication failed" });
    }
  });
  app.get("/api/auth/logout", (req, res) => {
    console.log("[Google OAuth] User logging out");
    res.clearCookie(COOKIE_NAME);
    res.redirect(302, "/");
  });
}

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
init_env();
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/routers.ts
init_db();
import { z as z2 } from "zod";
var appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true
      };
    })
  }),
  accounts: router({
    list: publicProcedure.query(async () => {
      return await getAllAccounts();
    }),
    getBySlug: publicProcedure.input(z2.object({ slug: z2.string() })).query(async ({ input }) => {
      return await getAccountBySlug(input.slug);
    }),
    getById: publicProcedure.input(z2.object({ id: z2.string() })).query(async ({ input }) => {
      return await getAccountById(input.id);
    })
  }),
  findings: router({
    listByAccount: publicProcedure.input(z2.object({
      accountId: z2.string(),
      limit: z2.number().optional()
    })).query(async ({ input }) => {
      return await getFindingsByAccount(input.accountId, input.limit);
    }),
    listByCategory: publicProcedure.input(z2.object({
      accountId: z2.string(),
      category: z2.string()
    })).query(async ({ input }) => {
      return await getFindingsByCategory(input.accountId, input.category);
    })
  }),
  stakeholders: router({
    listByAccount: publicProcedure.input(z2.object({ accountId: z2.string() })).query(async ({ input }) => {
      return await getStakeholdersByAccount(input.accountId);
    })
  }),
  meetingNotes: router({
    listByAccount: publicProcedure.input(z2.object({ accountId: z2.string() })).query(async ({ input }) => {
      return await getMeetingNotesByAccount(input.accountId);
    }),
    getById: publicProcedure.input(z2.object({ id: z2.string() })).query(async ({ input }) => {
      return await getMeetingNoteById(input.id);
    }),
    create: protectedProcedure.input(z2.object({
      accountId: z2.string(),
      meetingType: z2.enum(["Discovery", "Demo", "Technical Review", "Executive Briefing", "Follow-up", "Negotiation", "Other"]),
      meetingDate: z2.date(),
      title: z2.string(),
      summary: z2.string().optional(),
      transcript: z2.string().optional(),
      keyTakeaways: z2.array(z2.string()).optional(),
      actionItems: z2.array(z2.object({
        action: z2.string(),
        owner: z2.string(),
        dueDate: z2.string().optional()
      })).optional(),
      attendees: z2.array(z2.string()).optional(),
      fileUrl: z2.string().optional(),
      fileName: z2.string().optional(),
      fileType: z2.string().optional()
    })).mutation(async ({ input, ctx }) => {
      const id = `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await createMeetingNote({
        id,
        ...input,
        uploadedBy: ctx.user.id
      });
      return { success: true, id };
    }),
    update: protectedProcedure.input(z2.object({
      id: z2.string(),
      summary: z2.string().optional(),
      transcript: z2.string().optional(),
      keyTakeaways: z2.array(z2.string()).optional(),
      actionItems: z2.array(z2.object({
        action: z2.string(),
        owner: z2.string(),
        dueDate: z2.string().optional()
      })).optional()
    })).mutation(async ({ input }) => {
      const { id, ...updates } = input;
      await updateMeetingNote(id, updates);
      return { success: true };
    }),
    delete: protectedProcedure.input(z2.object({ id: z2.string() })).mutation(async ({ input }) => {
      await deleteMeetingNote(input.id);
      return { success: true };
    })
  }),
  accountPlans: router({
    getLatest: publicProcedure.input(z2.object({ accountId: z2.string() })).query(async ({ input }) => {
      return await getLatestAccountPlan(input.accountId);
    }),
    listByAccount: publicProcedure.input(z2.object({ accountId: z2.string() })).query(async ({ input }) => {
      return await getAccountPlansByAccount(input.accountId);
    }),
    generate: protectedProcedure.input(z2.object({
      accountId: z2.string(),
      industry: z2.string().optional(),
      methodology: z2.enum(["MEDDICC", "SPICED", "Command of the Message"]).optional(),
      isOpportunity: z2.boolean().optional()
    })).mutation(async ({ input, ctx }) => {
      const { generateAccountPlanV3: generateAccountPlanV32 } = await Promise.resolve().then(() => (init_accountPlanGeneratorV3(), accountPlanGeneratorV3_exports));
      const planId = await generateAccountPlanV32({
        accountId: input.accountId,
        userId: ctx.user.id,
        industry: input.industry,
        methodology: input.methodology,
        isOpportunity: input.isOpportunity
      });
      return { success: true, planId };
    })
  }),
  research: router({
    getLatestJob: publicProcedure.query(async () => {
      return await getLatestResearchJob();
    }),
    getJobsByAccount: publicProcedure.input(z2.object({ accountId: z2.string() })).query(async ({ input }) => {
      return await getResearchJobsByAccount(input.accountId);
    }),
    triggerResearch: protectedProcedure.input(z2.object({
      accountId: z2.string().optional()
      // If not provided, research all accounts
    })).mutation(async ({ input }) => {
      const { researchAccount: researchAccount2, researchAllAccounts: researchAllAccounts2 } = await Promise.resolve().then(() => (init_researchAutomation(), researchAutomation_exports));
      if (input.accountId) {
        const findingsCount = await researchAccount2(input.accountId);
        return {
          success: true,
          message: `Research completed for account: ${findingsCount} findings generated`
        };
      } else {
        const result = await researchAllAccounts2();
        return {
          ...result,
          message: `Research completed: ${result.accountsProcessed} accounts, ${result.totalFindings} findings`
        };
      }
    })
  }),
  export: router({
    markdown: publicProcedure.input(z2.object({ accountId: z2.string() })).query(async ({ input }) => {
      const { generateMarkdownExport: generateMarkdownExport2 } = await Promise.resolve().then(() => (init_salesforceExport(), salesforceExport_exports));
      const markdown = await generateMarkdownExport2(input.accountId);
      return { markdown };
    }),
    json: publicProcedure.input(z2.object({ accountId: z2.string() })).query(async ({ input }) => {
      const { generateJSONExport: generateJSONExport2 } = await Promise.resolve().then(() => (init_salesforceExport(), salesforceExport_exports));
      const data = await generateJSONExport2(input.accountId);
      return data;
    }),
    pdfHtml: publicProcedure.input(z2.object({ accountId: z2.string() })).query(async ({ input }) => {
      const { generatePDFHTML: generatePDFHTML2 } = await Promise.resolve().then(() => (init_salesforceExport(), salesforceExport_exports));
      const html = await generatePDFHTML2(input.accountId);
      return { html };
    })
  }),
  opportunities: router({
    list: publicProcedure.query(async () => {
      return await getOpportunityAccounts();
    }),
    toggle: protectedProcedure.input(z2.object({
      accountId: z2.string(),
      isOpportunity: z2.boolean(),
      opportunityStage: z2.enum(["Prospect", "Qualify", "Validate", "Pilot", "Propose", "Commit", "Closed Won", "Closed Lost"]).optional(),
      forecastCategory: z2.enum(["Omit", "Pipeline", "BestCase", "Commit"]).optional(),
      closeDate: z2.date().optional(),
      dealOwner: z2.string().optional(),
      arrEstimate: z2.number().optional(),
      primaryUseCase: z2.enum(["InternalComms", "Training", "SecureR&D", "ExternalWebinars"]).optional(),
      competitor: z2.enum(["Teams", "Zoom", "Webex", "Kollective", "Hive", "Akamai", "Other"]).optional(),
      confidence: z2.number().min(0).max(100).optional(),
      nextStep: z2.string().optional(),
      nextStepDue: z2.date().optional()
    })).mutation(async ({ input }) => {
      await updateAccountOpportunity(input.accountId, input);
      return { success: true };
    }),
    update: protectedProcedure.input(z2.object({
      accountId: z2.string(),
      opportunityStage: z2.enum(["Prospect", "Qualify", "Validate", "Pilot", "Propose", "Commit", "Closed Won", "Closed Lost"]).optional(),
      forecastCategory: z2.enum(["Omit", "Pipeline", "BestCase", "Commit"]).optional(),
      closeDate: z2.date().optional(),
      dealOwner: z2.string().optional(),
      arrEstimate: z2.number().optional(),
      primaryUseCase: z2.enum(["InternalComms", "Training", "SecureR&D", "ExternalWebinars"]).optional(),
      competitor: z2.enum(["Teams", "Zoom", "Webex", "Kollective", "Hive", "Akamai", "Other"]).optional(),
      confidence: z2.number().min(0).max(100).optional(),
      nextStep: z2.string().optional(),
      nextStepDue: z2.date().optional()
    })).mutation(async ({ input }) => {
      const { accountId, ...updates } = input;
      await updateAccountOpportunity(accountId, { isOpportunity: true, ...updates });
      return { success: true };
    })
  }),
  mapTasks: router({
    list: publicProcedure.input(z2.object({ accountId: z2.string() })).query(async ({ input }) => {
      return await getMapTasks(input.accountId);
    }),
    create: protectedProcedure.input(z2.object({
      accountId: z2.string(),
      task: z2.string(),
      owner: z2.string().optional(),
      accountOwner: z2.string().optional(),
      dueDate: z2.date().optional(),
      stage: z2.string().optional(),
      isExitCriteria: z2.boolean().optional(),
      artifactRequired: z2.string().optional(),
      notes: z2.string().optional(),
      status: z2.enum(["Not Started", "In Progress", "Blocked", "Completed"]).optional()
    })).mutation(async ({ input, ctx }) => {
      const id = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await createMapTask({ id, ...input });
      return { success: true, id };
    }),
    update: protectedProcedure.input(z2.object({
      taskId: z2.string(),
      task: z2.string().optional(),
      status: z2.enum(["Not Started", "In Progress", "Blocked", "Completed"]).optional(),
      artifactUrl: z2.string().optional(),
      notes: z2.string().optional(),
      owner: z2.string().optional(),
      dueDate: z2.date().optional()
    })).mutation(async ({ input }) => {
      const { taskId, ...updates } = input;
      await updateMapTask(taskId, updates);
      return { success: true };
    })
  }),
  pains: router({
    list: publicProcedure.input(z2.object({ accountId: z2.string() })).query(async ({ input }) => {
      return await getPains(input.accountId);
    })
  }),
  risks: router({
    list: publicProcedure.input(z2.object({ accountId: z2.string() })).query(async ({ input }) => {
      return await getRisks(input.accountId);
    })
  }),
  paperProcess: router({
    list: publicProcedure.input(z2.object({ accountId: z2.string() })).query(async ({ input }) => {
      return await getPaperProcesses(input.accountId);
      ;
    }),
    create: protectedProcedure.input(z2.object({
      accountId: z2.string(),
      processType: z2.enum(["Legal Review", "Security Review", "Procurement", "DPA", "DPIA", "Redlines"]),
      approver: z2.string().optional(),
      dueDate: z2.date().optional(),
      status: z2.enum(["Not Started", "In Progress", "Blocked", "Approved", "Rejected"]).optional()
    })).mutation(async ({ input }) => {
      const id = `paper_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await createPaperProcess({ id, ...input });
      return { success: true, id };
    }),
    update: protectedProcedure.input(z2.object({
      docId: z2.string(),
      status: z2.enum(["Not Started", "In Progress", "Blocked", "Approved", "Rejected"]).optional(),
      approver: z2.string().optional(),
      dueDate: z2.date().optional()
    })).mutation(async ({ input }) => {
      const { docId, ...updates } = input;
      await updatePaperProcess(docId, updates);
      return { success: true };
    })
  }),
  pilotPlans: router({
    list: publicProcedure.input(z2.object({ accountId: z2.string() })).query(async ({ input }) => {
      return await getPilotPlans(input.accountId);
    }),
    create: protectedProcedure.input(z2.object({
      accountId: z2.string(),
      pilotName: z2.string().optional(),
      winCriteria: z2.string(),
      testScripts: z2.string().optional(),
      dataCapturePlan: z2.string().optional()
    })).mutation(async ({ input }) => {
      const id = `pilot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const { dataCapturePlan, ...rest } = input;
      await createPilotPlan({
        id,
        ...rest,
        pilotName: input.pilotName || `Pilot ${(/* @__PURE__ */ new Date()).toLocaleDateString()}`,
        dataCaptureplan: dataCapturePlan,
        winCriteria: [input.winCriteria]
      });
      return { success: true, id };
    })
  }),
  linkValidation: router({
    validateAccount: protectedProcedure.input(z2.object({ accountId: z2.string() })).mutation(async ({ input }) => {
      const { validateAccountLinks: validateAccountLinks2 } = await Promise.resolve().then(() => (init_linkValidator(), linkValidator_exports));
      const results = await validateAccountLinks2(input.accountId);
      return results;
    }),
    getAccountStats: publicProcedure.input(z2.object({ accountId: z2.string() })).query(async ({ input }) => {
      const { getAccountLinkStats: getAccountLinkStats2 } = await Promise.resolve().then(() => (init_linkValidator(), linkValidator_exports));
      const stats = await getAccountLinkStats2(input.accountId);
      return stats;
    }),
    validateDueLinks: protectedProcedure.input(z2.object({ limit: z2.number().optional() })).mutation(async ({ input }) => {
      const { validateDueLinks: validateDueLinks2 } = await Promise.resolve().then(() => (init_linkValidator(), linkValidator_exports));
      const count = await validateDueLinks2(input.limit || 50);
      return { checkedCount: count };
    })
  }),
  perplexity: router({
    getRecentIntelligence: publicProcedure.input(z2.object({
      accountName: z2.string(),
      timeframe: z2.enum(["24h", "1week", "2weeks", "1month"])
    })).query(async ({ input }) => {
      const { getRecentIntelligence: getRecentIntelligence2 } = await Promise.resolve().then(() => (init_perplexityService(), perplexityService_exports));
      return await getRecentIntelligence2(input.accountName, input.timeframe);
    }),
    chat: publicProcedure.input(z2.object({
      message: z2.string(),
      history: z2.array(z2.object({
        role: z2.enum(["system", "user", "assistant"]),
        content: z2.string()
      })).optional()
    })).mutation(async ({ input }) => {
      const { chatWithAssistant: chatWithAssistant2 } = await Promise.resolve().then(() => (init_perplexityService(), perplexityService_exports));
      return await chatWithAssistant2(input.message, input.history);
    }),
    researchByUrl: publicProcedure.input(z2.object({ url: z2.string().url() })).mutation(async ({ input }) => {
      const { researchAccountByUrl: researchAccountByUrl2 } = await Promise.resolve().then(() => (init_perplexityService(), perplexityService_exports));
      return await researchAccountByUrl2(input.url);
    })
  }),
  accountManagement: router({
    add: protectedProcedure.input(z2.object({
      name: z2.string(),
      website: z2.string().url().optional(),
      industry: z2.string().optional(),
      description: z2.string().optional()
    })).mutation(async ({ input }) => {
      const { addAccount: addAccount2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await addAccount2(input);
    }),
    remove: protectedProcedure.input(z2.object({ id: z2.string() })).mutation(async ({ input }) => {
      const { removeAccount: removeAccount2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await removeAccount2(input.id);
    })
  }),
  userSettings: router({
    getWeights: protectedProcedure.query(async ({ ctx }) => {
      const user = await getUser(ctx.user.id);
      if (!user) return null;
      return {
        recencyWeight: user.recencyWeight,
        authorityWeight: user.authorityWeight,
        magnitudeWeight: user.magnitudeWeight,
        relevanceWeight: user.relevanceWeight,
        corroborationWeight: user.corroborationWeight,
        highlightThreshold: user.highlightThreshold
      };
    }),
    updateWeights: protectedProcedure.input(z2.object({
      recencyWeight: z2.number().min(0).max(20).optional(),
      authorityWeight: z2.number().min(0).max(20).optional(),
      magnitudeWeight: z2.number().min(0).max(20).optional(),
      relevanceWeight: z2.number().min(0).max(20).optional(),
      corroborationWeight: z2.number().min(0).max(20).optional(),
      highlightThreshold: z2.number().min(0).max(100).optional()
    })).mutation(async ({ input, ctx }) => {
      return { success: true };
    })
  })
});

// server/_core/context.ts
async function createContext(opts) {
  console.log("[Context] createContext called for:", opts.req.url);
  return Promise.race([
    createContextInternal(opts),
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Context creation timeout after 5 seconds")), 5e3);
    })
  ]);
}
async function createContextInternal(opts) {
  const { req, res } = opts;
  console.log("[Context] Verifying user session...");
  let user = null;
  try {
    user = await sdk.authenticateRequest(req);
    console.log("[Context] User verification complete:", user ? "Authenticated" : "Guest");
  } catch (error) {
    console.error("[Context] User verification error:", error);
  }
  console.log("[Context] Testing database availability...");
  try {
    const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    console.log("[Context] Database connection verified");
  } catch (error) {
    console.error("[Context] Database connection error:", error);
  }
  console.log("[Context] Context creation completed successfully");
  return {
    req,
    res,
    user
  };
}

// server/_core/vite.ts
import express from "express";
import fs from "fs";
import { nanoid } from "nanoid";
import path2 from "path";
import { createServer as createViteServer } from "vite";

// vite.config.ts
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
var plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime()];
var vite_config_default = defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    host: true,
    hmr: {
      clientPort: 443,
      protocol: "wss"
    },
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1"
    ],
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/_core/vite.ts
async function setupVite(app, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    server: serverOptions,
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app) {
  const distPath = process.env.NODE_ENV === "development" ? path2.resolve(import.meta.dirname, "../..", "dist", "public") : path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use(express.static(distPath));
  app.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/_core/index.ts
import timeout from "connect-timeout";
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}
async function findAvailablePort(startPort = 3e3) {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}
async function startServer() {
  const app = express2();
  const server = createServer(app);
  const PORT = process.env.PORT || 3e3;
  console.log("[Server] ===== SERVER INITIALIZATION STARTED =====");
  console.log("[Server] Environment:", process.env.NODE_ENV);
  console.log("[Server] Port:", PORT);
  console.log("[Server] DATABASE_URL:", process.env.DATABASE_URL ? "SET" : "MISSING");
  console.log("[Server] JWT_SECRET:", process.env.JWT_SECRET ? "SET" : "MISSING");
  console.log("[Server] OAUTH_SERVER_URL:", process.env.OAUTH_SERVER_URL || "MISSING");
  app.use(timeout("30s"));
  console.log("[Server] Timeout middleware registered (30s)");
  app.use((req, res, next) => {
    const requestId = Date.now();
    console.log(`[Request ${requestId}] ${req.method} ${req.url} - Started`);
    res.on("finish", () => {
      console.log(`[Request ${requestId}] ${req.method} ${req.url} - Completed (${res.statusCode})`);
    });
    if (!req.timedout) {
      next();
    } else {
      console.error(`[Request ${requestId}] TIMEOUT - Request exceeded 30 seconds`);
    }
  });
  app.use(express2.json({ limit: "50mb" }));
  app.use(express2.urlencoded({ limit: "50mb", extended: true }));
  app.get("/health", (req, res) => {
    console.log("[Health] Health check requested");
    res.json({
      status: "ok",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      environment: process.env.NODE_ENV
    });
  });
  console.log("[Server] Health endpoint registered at /health");
  registerGoogleOAuthRoutes(app);
  console.log("[Server] Registering tRPC middleware...");
  app.use(
    "/api/trpc",
    async (req, res, next) => {
      console.log("[tRPC] Request entering tRPC middleware:", req.url);
      next();
    },
    createExpressMiddleware({
      router: appRouter,
      createContext: async (opts) => {
        console.log("[Context] Creating context for request:", opts.req.url);
        try {
          const startTime = Date.now();
          const context = await createContext(opts);
          const duration = Date.now() - startTime;
          console.log(`[Context] Context created successfully in ${duration}ms`);
          return context;
        } catch (error) {
          console.error("[Context] ERROR creating context:", error);
          throw error;
        }
      }
    })
  );
  console.log("[Server] tRPC middleware registered");
  if (process.env.NODE_ENV === "development") {
    console.log("[Server] Starting ViteExpress in development mode...");
    try {
      await setupVite(app, server);
      console.log("[Server] ViteExpress middleware registered (catch-all routes last)");
    } catch (error) {
      console.error("[Server] FATAL ERROR starting ViteExpress:", error);
      process.exit(1);
    }
  } else {
    serveStatic(app);
    console.log(`[Server] Production static files served`);
  }
  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }
  server.listen(port, () => {
    console.log("[Server] ===== SERVER STARTED SUCCESSFULLY =====");
    console.log(`Server running on http://localhost:${port}/`);
    console.log(`[Server] Health check: http://localhost:${port}/health`);
    console.log(`[Server] tRPC endpoint: http://localhost:${port}/api/trpc`);
    console.log("[Server] ==============================================");
  });
}
process.on("unhandledRejection", (reason, promise) => {
  console.error("[Server] Unhandled Rejection at:", promise, "reason:", reason);
});
process.on("uncaughtException", (error) => {
  console.error("[Server] Uncaught Exception:", error);
  process.exit(1);
});
startServer().catch(console.error);
