/* ============================================
   VBRICK GTM Intelligence Dashboard — App Logic
   V2.0: 0-3 urgency scale, confidence, evidence
   ============================================ */
/* global FINDINGS */

(function () {
  "use strict";

  // ---- Urgency label map ----
  var URGENCY_LABELS = { 3: "critical", 2: "high", 1: "medium", 0: "low" };
  var URGENCY_NAMES = { 3: "Critical", 2: "High", 1: "Medium", 0: "Low" };

  // ---- State ----
  var currentView = "overview";
  var currentSort = { key: "urgency", dir: "asc" };
  var filters = {
    urgency: "all",
    persona: "all",
    industry: "all",
    search: "",
  };

  // ---- DOM refs ----
  var findingsBody = document.getElementById("findingsBody");
  var searchInput = document.getElementById("searchInput");
  var pageTitle = document.getElementById("pageTitle");
  var findingCount = document.getElementById("findingCount");
  var modalOverlay = document.getElementById("modalOverlay");
  var modalContent = document.getElementById("modalContent");
  var modalClose = document.getElementById("modalClose");
  var sidebar = document.getElementById("sidebar");
  var hamburger = document.getElementById("hamburger");

  // ---- Theme ----
  (function initTheme() {
    var toggles = document.querySelectorAll("[data-theme-toggle]");
    var root = document.documentElement;
    var theme = matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
    root.setAttribute("data-theme", theme);

    function updateIcon() {
      var sunSvg =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
      var moonSvg =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      toggles.forEach(function (t) {
        t.innerHTML = theme === "dark" ? sunSvg : moonSvg;
        t.setAttribute(
          "aria-label",
          "Switch to " + (theme === "dark" ? "light" : "dark") + " mode"
        );
      });
    }

    toggles.forEach(function (t) {
      t.addEventListener("click", function () {
        theme = theme === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", theme);
        updateIcon();
      });
    });
    updateIcon();
  })();

  // ---- Sidebar Nav ----
  var navItems = document.querySelectorAll(".nav-item");
  var viewTitles = {
    whats_changed: "What's Changed",
    overview: "Intelligence Overview",
    competitors: "Competitor Intelligence",
    triggers: "Market Triggers",
    compliance: "Compliance & Regulatory",
    fortune500: "Fortune 500 Accounts",
  };

  navItems.forEach(function (item) {
    item.addEventListener("click", function () {
      navItems.forEach(function (n) {
        n.classList.remove("active");
      });
      item.classList.add("active");
      currentView = item.dataset.view;
      pageTitle.textContent = viewTitles[currentView] || "Intelligence Overview";
      renderFindings();
      sidebar.classList.remove("open");
    });
  });

  // ---- Mobile hamburger ----
  if (hamburger) {
    hamburger.addEventListener("click", function () {
      sidebar.classList.toggle("open");
    });
  }

  document.addEventListener("click", function (e) {
    if (
      sidebar.classList.contains("open") &&
      !sidebar.contains(e.target) &&
      e.target !== hamburger &&
      !hamburger.contains(e.target)
    ) {
      sidebar.classList.remove("open");
    }
  });

  // ---- Filters ----
  var urgencyChips = document.querySelectorAll("#urgencyFilter .chip");
  urgencyChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      urgencyChips.forEach(function (c) {
        c.classList.remove("active");
      });
      chip.classList.add("active");
      filters.urgency = chip.dataset.value;
      renderFindings();
    });
  });

  var personaChips = document.querySelectorAll("#personaFilter .chip");
  personaChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      personaChips.forEach(function (c) {
        c.classList.remove("active");
      });
      chip.classList.add("active");
      filters.persona = chip.dataset.value;
      renderFindings();
    });
  });

  var industrySelect = document.getElementById("industryFilter");
  industrySelect.addEventListener("change", function () {
    filters.industry = this.value;
    renderFindings();
  });

  var searchTimer = null;
  searchInput.addEventListener("input", function () {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () {
      filters.search = searchInput.value.toLowerCase().trim();
      renderFindings();
    }, 200);
  });

  // ---- Sorting ----
  document.querySelectorAll(".sort-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.dataset.sort;
      if (currentSort.key === key) {
        currentSort.dir = currentSort.dir === "asc" ? "desc" : "asc";
      } else {
        currentSort.key = key;
        currentSort.dir = "asc";
      }
      renderFindings();
    });
  });

  // ---- Data Filtering ----
  function getFilteredFindings() {
    var data = FINDINGS.slice();

    // View filter
    if (currentView === "whats_changed") {
      data = data.filter(function (f) {
        return f.is_new === true;
      });
    } else if (currentView !== "overview") {
      var viewCategory = viewTitles[currentView];
      data = data.filter(function (f) {
        return f.category === viewCategory;
      });
    }

    // Urgency (now numeric 0-3)
    if (filters.urgency !== "all") {
      var targetScore = parseInt(filters.urgency, 10);
      data = data.filter(function (f) {
        return f.urgency_score === targetScore;
      });
    }

    // Persona
    if (filters.persona !== "all") {
      data = data.filter(function (f) {
        return f.target_persona === filters.persona;
      });
    }

    // Industry
    if (filters.industry !== "all") {
      data = data.filter(function (f) {
        return (f.industry || "").toLowerCase().includes(filters.industry.toLowerCase());
      });
    }

    // Search
    if (filters.search) {
      var q = filters.search;
      data = data.filter(function (f) {
        return (
          (f.company || "").toLowerCase().includes(q) ||
          (f.summary || "").toLowerCase().includes(q) ||
          (f.competitor || "").toLowerCase().includes(q) ||
          (f.finding_type || "").toLowerCase().includes(q) ||
          (f.why_vbrick || "").toLowerCase().includes(q) ||
          (f.industry || "").toLowerCase().includes(q)
        );
      });
    }

    // Sort — urgency_score descending by default (3 first)
    data.sort(function (a, b) {
      var key = currentSort.key;
      var aVal, bVal;
      if (key === "urgency") {
        // Higher score = more urgent = should appear first in "asc" (natural)
        aVal = 3 - (a.urgency_score || 0);
        bVal = 3 - (b.urgency_score || 0);
      } else {
        aVal = (a[key] || "").toLowerCase();
        bVal = (b[key] || "").toLowerCase();
      }
      if (aVal < bVal) return currentSort.dir === "asc" ? -1 : 1;
      if (aVal > bVal) return currentSort.dir === "asc" ? 1 : -1;
      return 0;
    });

    return data;
  }

  // ---- KPI update ----
  var activeTimers = {};

  function updateKPIs(data) {
    var total = data.length;
    var criticalHigh = data.filter(function (f) {
      return f.urgency_score >= 2;
    }).length;
    var competitor = data.filter(function (f) {
      return f.category === "Competitor Intelligence";
    }).length;
    var triggers = data.filter(function (f) {
      return f.category === "Market Triggers";
    }).length;
    var compliance = data.filter(function (f) {
      return f.category === "Compliance & Regulatory";
    }).length;
    var fortune = data.filter(function (f) {
      return f.category === "Fortune 500 Accounts";
    }).length;

    animateCounter("kpiTotal", total);
    animateCounter("kpiHigh", criticalHigh);
    animateCounter("kpiCompetitor", competitor);
    animateCounter("kpiTriggers", triggers);
    animateCounter("kpiCompliance", compliance);
    animateCounter("kpiFortune", fortune);
  }

  function animateCounter(id, target) {
    var el = document.getElementById(id);
    if (!el) return;
    if (activeTimers[id]) {
      clearInterval(activeTimers[id]);
      delete activeTimers[id];
    }
    var current = parseInt(el.textContent) || 0;
    if (current === target) return;
    var step = target > current ? 1 : -1;
    var diff = Math.abs(target - current);
    var increment = Math.max(1, Math.floor(diff / 15));
    var delay = Math.max(15, Math.min(40, 400 / diff));
    activeTimers[id] = setInterval(function () {
      var remaining = Math.abs(target - current);
      var jump = Math.min(increment, remaining);
      current += step * jump;
      el.textContent = current;
      if (current === target) {
        clearInterval(activeTimers[id]);
        delete activeTimers[id];
      }
    }, delay);
  }

  // ---- Render Table ----
  function renderFindings() {
    var data = getFilteredFindings();
    updateKPIs(data);
    findingCount.textContent = data.length + " findings";

    // Update the "What's Changed" badge count (always, even on empty filter results)
    var newItems = FINDINGS.filter(function (f) { return f.is_new === true; });
    var newCountEl = document.getElementById("newCount");
    if (newCountEl) {
      newCountEl.textContent = newItems.length;
      newCountEl.setAttribute("data-count", newItems.length);
    }

    if (data.length === 0) {
      findingsBody.innerHTML =
        '<tr><td colspan="7"><div class="empty-state"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><p>No findings match your current filters. Try adjusting your search or filter criteria.</p></div></td></tr>';
      return;
    }

    var html = "";
    data.forEach(function (f) {
      var score = f.urgency_score || 0;
      var urgencyClass = "urgency-" + score;
      var urgencyLabel = URGENCY_NAMES[score] || "Low";
      var companyShort =
        f.company.length > 40 ? f.company.substring(0, 37) + "..." : f.company;
      var summaryShort =
        f.summary.length > 140
          ? f.summary.substring(0, 137) + "..."
          : f.summary;
      var confClass = "confidence-" + (f.confidence || "Low").toLowerCase();
      var rowClass = f.is_new === true ? ' class="finding-row--new"' : '';

      html += '<tr' + rowClass + ' data-id="' + f.id + '">';
      html +=
        '<td><span class="urgency-badge ' +
        urgencyClass +
        '"><span class="urgency-dot"></span>' +
        urgencyLabel +
        "</span></td>";
      html +=
        '<td><div class="company-name">' +
        escapeHtml(companyShort) +
        "</div>";
      if (f.competitor) {
        html +=
          '<div class="company-competitor">vs ' +
          escapeHtml(f.competitor) +
          "</div>";
      }
      html += "</td>";
      html +=
        '<td><span class="type-badge">' +
        escapeHtml(f.finding_type || "") +
        "</span></td>";
      html +=
        '<td><div class="summary-text">' +
        escapeHtml(summaryShort) +
        "</div></td>";
      html +=
        '<td><span class="persona-badge">' +
        escapeHtml(f.target_persona || "") +
        "</span></td>";
      html +=
        '<td><span class="industry-text">' +
        escapeHtml(f.industry || "") +
        "</span></td>";
      html +=
        '<td><button class="view-btn" data-id="' +
        f.id +
        '">View</button></td>';
      html += "</tr>";
    });

    findingsBody.innerHTML = html;

    findingsBody.querySelectorAll("tr").forEach(function (row) {
      row.addEventListener("click", function () {
        var id = parseInt(row.dataset.id);
        if (id) openModal(id);
      });
    });

    findingsBody.querySelectorAll(".view-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var id = parseInt(btn.dataset.id);
        if (id) openModal(id);
      });
    });
  }

  // ---- Maniac Method Outreach Generator ----
  function generateJMMOutreach(finding) {
    var company = finding.company || "your organization";
    var persona = finding.target_persona || "IT/Infrastructure";
    var pain = finding.summary || "";
    var whyVbrick = finding.why_vbrick || "";
    var findingType = finding.finding_type || "";
    var competitor = finding.competitor || "";

    var painShort = extractPain(pain, findingType, competitor, company);
    var proofPoint = extractProof(whyVbrick);
    var companyRef = company === "Multiple" || company === "Unknown" ? "your organization" : company;
    var isMultiCompany = company === "Multiple" || company === "Unknown";
    var triggerEvent = buildTriggerPhrase(finding, companyRef, isMultiCompany);
    var domain = getDomainWord(finding);

    var email = generateEmail(companyRef, painShort, proofPoint, isMultiCompany, finding, triggerEvent);
    var linkedinDM = generateLinkedInDM(companyRef, painShort, proofPoint, isMultiCompany, finding, triggerEvent);
    var coldcall = generateColdCall(companyRef, painShort, proofPoint, persona, finding, triggerEvent, domain);
    var voicemail = generateVoicemail(companyRef, finding);
    var stakeholderMessages = generateStakeholderMessages(finding, companyRef, triggerEvent, domain);

    return { email: email, linkedin: linkedinDM, coldcall: coldcall, voicemail: voicemail, stakeholderMessages: stakeholderMessages };
  }

  function extractPain(summary, findingType, competitor, company) {
    var sentences = summary.split(/\.\s+/);
    var first = sentences[0] || summary;
    var words = first.split(/\s+/);
    if (words.length > 25) {
      first = words.slice(0, 25).join(" ") + "...";
    }
    return first;
  }

  function extractProof(whyVbrick) {
    return whyVbrick || "VBRICK's enterprise video platform with eCDN, FedRAMP authorization, and real-time analytics";
  }

  function getDomainWord(finding) {
    var type = finding.finding_type || "";
    if (type.includes("Compliance") || type.includes("Regulatory")) return "compliance";
    if (type.includes("Migration") || type.includes("Churn")) return "video platform strategy";
    if (type.includes("RTO") || type.includes("Mandate")) return "internal communications strategy";
    if (type.includes("Security")) return "video security strategy";
    if (type.includes("Integration")) return "video infrastructure";
    if (type.includes("Job Posting")) return "enterprise video strategy";
    if (type.includes("eCDN")) return "video delivery strategy";
    return "enterprise video strategy";
  }

  // Build a natural trigger phrase from the finding for use in scripts
  function buildTriggerPhrase(finding, company, isMulti) {
    var type = finding.finding_type || "";
    var competitor = finding.competitor || "";
    if (type.includes("Migration") || type.includes("Churn")) {
      return competitor ? competitor + "'s recent changes" : "your video vendor's recent shake-up";
    }
    if (type.includes("RTO")) return isMulti ? "the return-to-office push" : company + "'s return-to-office mandate";
    if (type.includes("Compliance") || type.includes("Regulatory")) return "the upcoming compliance deadlines affecting video";
    if (type.includes("Security")) return "the recent security concerns in enterprise video";
    if (type.includes("Leadership")) return "the recent leadership change";
    if (type.includes("M&A")) return "the merger integration";
    if (type.includes("Workforce")) return "the workforce restructuring";
    if (type.includes("Digital")) return "the digital transformation initiative";
    if (type.includes("eCDN") || type.includes("Network")) return "the video delivery challenges at scale";
    return "something I came across about " + company;
  }

  function generateSubject(finding) {
    var company = finding.company || "";
    var type = finding.finding_type || "";
    if (type.includes("Migration") || type.includes("Churn")) return "video risk";
    if (type.includes("RTO")) return company !== "Multiple" && company !== "Unknown" ? company.toLowerCase().split(" ")[0] + " + video" : "rto + video";
    if (type.includes("Compliance") || type.includes("Regulatory")) return "compliance gap";
    if (type.includes("Security")) return "video security";
    if (type.includes("Integration")) return "integration";
    if (type.includes("Leadership")) return "new direction";
    if (type.includes("M&A")) return "integration challenge";
    if (type.includes("eCDN")) return "video delivery";
    if (type.includes("Job Posting")) return "video platform";
    if (type.includes("Workforce")) return "comms challenge";
    if (type.includes("Digital")) return "video modernization";
    return "enterprise video";
  }

  // --- EMAIL: casual, conversational, short ---
  function generateEmail(company, pain, proof, isMulti, finding, trigger) {
    var subject = generateSubject(finding);
    var type = finding.finding_type || "";
    var competitor = finding.competitor || "";

    var body = "Hey {{First Name}},\n\n";
    if (type.includes("Migration") || type.includes("Churn")) {
      body += isMulti
        ? "Seeing a lot of orgs scrambling because of " + trigger + ". Figured it might be on your radar too."
        : "Came across " + trigger + " and figured it's probably creating some headaches for " + company + ".";
    } else if (type.includes("RTO")) {
      body += isMulti
        ? "With RTO mandates ramping up, video for town halls and all-hands is becoming a real pain point. Curious if that's hitting your world."
        : "Saw " + company + "'s RTO news. When thousands of people need to be in the same virtual room at once, things break fast.";
    } else if (type.includes("Compliance") || type.includes("Regulatory")) {
      body += "With " + trigger + ", wanted to flag something that might save your team some time.";
    } else if (type.includes("Leadership")) {
      body += "Congrats on the new role. When the dust settles and you start looking at the video stack, I think there's something worth a conversation.";
    } else if (type.includes("M&A")) {
      body += "Integration is always a beast. When two orgs collide, video infrastructure is one of the first things that falls through the cracks.";
    } else {
      body += "Came across " + trigger + " and thought this might be relevant.";
    }
    body += "\n\n" + proof + ".";
    body += "\n\nWorth a conversation?";
    body += "\n\n{{Your First Name}}";

    return { subject: subject, body: body };
  }

  // --- LINKEDIN DM: casual, conversational, after blank connection request ---
  function generateLinkedInDM(company, pain, proof, isMulti, finding, trigger) {
    var type = finding.finding_type || "";
    var competitor = finding.competitor || "";

    var msg = "";
    if (type.includes("Migration") || type.includes("Churn")) {
      msg = "Hey {{First Name}} -- thanks for connecting. Noticed " + trigger + " and figured it might be creating some questions on your end. Happy to share what we're seeing from orgs in a similar spot if it'd be useful.";
    } else if (type.includes("RTO")) {
      msg = isMulti
        ? "Hey {{First Name}} -- thanks for connecting. RTO is putting a lot of pressure on video infrastructure right now. Curious if that's something you're dealing with."
        : "Hey {{First Name}} -- thanks for connecting. Saw " + company + "'s RTO announcement and thought this might resonate. Scaling video for all-hands across locations is a challenge we hear about constantly.";
    } else if (type.includes("Compliance") || type.includes("Regulatory")) {
      msg = "Hey {{First Name}} -- thanks for connecting. With " + trigger + ", wanted to flag something that might be relevant to how your team handles video compliance. Happy to share more if useful.";
    } else if (type.includes("Leadership")) {
      msg = "Hey {{First Name}} -- thanks for connecting. Congrats on the new role. When you get a chance to look at the video infrastructure, happy to share what's been working at similar orgs.";
    } else if (type.includes("Security")) {
      msg = "Hey {{First Name}} -- thanks for connecting. With " + trigger + ", figured you might be re-evaluating the video stack. Happy to share what we're seeing.";
    } else {
      msg = "Hey {{First Name}} -- thanks for connecting. Came across " + trigger + " and thought it might be worth a quick exchange. Let me know if you're open to it.";
    }
    return msg;
  }

  // --- COLD CALL: name-pause-route-trigger methodology ---
  function generateColdCall(company, pain, proof, persona, finding, trigger, domain) {
    var isMulti = company === "your organization";
    var companyPossessive = isMulti ? "your organization's" : company + "'s";

    // Step 1: Opener (always the same pattern)
    var opener = '{{First Name}} {{Last Name}}?\n[PAUSE -- wait for them to confirm]';

    // Step 2a: If they confirm AND are believed to be an executive
    var execRoute = 'Great, I was hoping you could help me out real quick. Do you head up the team that\'s responsible for ' + companyPossessive + ' enterprise video platform and eCDN?';

    // Step 2b: If they say YES to heading up the team
    var yesPath = 'Perfect. The reason for my call -- ' + trigger + ' caught my eye and I wanted to get your take on how it\'s impacting your video infrastructure. ' + proof + '. Thought it\'d be worth a quick conversation to see if there\'s a fit.';

    // Step 2c: If they say NO (not the right person)
    var noPath = 'No problem at all. Who might that person be?\n[They give a name]\nAppreciate that. Would it be okay if I let {{Referred Name}} know that we briefly spoke?\n[Then call referred person:]\n"{{Original First Name}} said you were the person I should speak with concerning ' + companyPossessive + ' enterprise video platform."\n[PAUSE for response, then:]\nThe reason for my call -- ' + trigger + '. ' + proof + '.';

    return {
      opener: opener,
      execRoute: execRoute,
      yesPath: yesPath,
      noPath: noPath
    };
  }

  // --- VOICEMAIL: short, directs to email/DM only ---
  function generateVoicemail(company, finding) {
    return 'Hey {{First Name}}, this is {{Your Name}} from VBRICK. Giving you a heads up -- I\'m sending over an email [or LinkedIn message] on something relevant to ' + (company === "your organization" ? "your team" : company) + '. Keep an eye out for it. Again, {{Your Name}} from VBRICK -- talk soon.';
  }

  // --- STAKEHOLDER-SPECIFIC MESSAGES ---
  function generateStakeholderMessages(finding, company, trigger, domain) {
    var type = finding.finding_type || "";
    var competitor = finding.competitor || "";
    var messages = [];

    // SVP/VP (Decision Maker)
    messages.push({
      role: 'SVP / VP (Decision Maker)',
      email: 'Hey {{First Name}},\n\nQuick note -- ' + trigger + ' is something I\'ve been hearing a lot about from folks at your level. The video infrastructure piece tends to get overlooked until it becomes a fire drill. Happy to share what orgs like ' + company + ' are doing differently.\n\nWorth a quick chat?\n\n{{Your First Name}}',
      coldcall: '{{First Name}} {{Last Name}}? [PAUSE]\nGreat, I was hoping you could help me out real quick. Do you head up the team responsible for ' + company + '\'s enterprise video and eCDN? [If yes:] Perfect -- the reason for my call is ' + trigger + '. I\'ve been talking to a few folks at your level about it and thought it\'d be worth connecting.'
    });

    // Director (Influencer)
    messages.push({
      role: 'Director (Influencer)',
      email: 'Hey {{First Name}},\n\nCame across ' + trigger + ' and your name came up as someone who\'d have a pulse on this. Curious how ' + company + ' is thinking about the video platform side of things. We\'re seeing some interesting patterns from similar orgs.\n\nOpen to a quick exchange?\n\n{{Your First Name}}',
      coldcall: '{{First Name}} {{Last Name}}? [PAUSE]\nHey -- so the reason for my call, ' + trigger + ' is creating some questions around video infrastructure at a lot of orgs your size. Wanted to get your take and see if what we\'re seeing matches up.'
    });

    // Manager (Evaluator)
    messages.push({
      role: 'Manager (Evaluator)',
      email: 'Hey {{First Name}},\n\nI know you\'re probably in the weeds on this already, but ' + trigger + ' is something we\'ve been helping teams navigate. Figured it might save your team some legwork if I shared what we\'re seeing.\n\nWorth a quick look?\n\n{{Your First Name}}',
      coldcall: '{{First Name}} {{Last Name}}? [PAUSE]\nHey -- with ' + trigger + ', how is your team handling the video platform piece? We keep hearing it\'s one of those things that lands on folks in your position to figure out.'
    });

    // Sr. Engineer / Architect (Technical Evaluator)
    messages.push({
      role: 'Sr. Engineer / Architect (Technical Evaluator)',
      email: 'Hey {{First Name}},\n\nNot sure if this is on your plate, but ' + trigger + ' has a direct impact on ' + domain + '. We\'ve been working with engineering teams on the eCDN and compliance side and I think there\'s some overlap with what you\'re dealing with.\n\nWould it make sense to compare notes?\n\n{{Your First Name}}',
      coldcall: '{{First Name}} {{Last Name}}? [PAUSE]\nHey -- with ' + trigger + ', the ' + domain + ' piece is probably landing on your desk. We work on the eCDN and video infrastructure side and I wanted to see if there\'s an overlap worth discussing.'
    });

    return messages;
  }

  // ---- ICP Title Expansion for Sales Navigator Boolean Search ----
  var ICP_TITLE_MAP = {
    // C-Suite IT/Technology
    "CIO": ["CIO", "Chief Information Officer", "Chief Technology Officer", "CTO", "Chief Digital Officer", "CDO", "Chief Data Officer", "SVP Information Technology", "SVP IT", "Senior Vice President IT", "Senior Vice President Information Technology", "EVP Technology", "EVP IT", "Executive Vice President Technology"],
    "CTO": ["CTO", "Chief Technology Officer", "Chief Information Officer", "CIO", "Chief Digital Officer", "SVP Engineering", "SVP Technology", "EVP Technology", "VP of Engineering", "Head of Engineering"],
    "VP of IT": ["VP IT", "VP of IT", "Vice President IT", "Vice President of IT", "VP Information Technology", "Vice President Information Technology", "VP of Information Technology", "VP Enterprise Technology", "VP Technology", "Vice President Technology", "VP Infrastructure", "VP IT Infrastructure", "VP Enterprise Infrastructure", "Senior VP IT", "SVP IT", "AVP Information Technology"],
    "VP of Technology": ["VP Technology", "VP of Technology", "Vice President Technology", "Vice President of Technology", "VP Digital Technology", "VP Enterprise Technology", "SVP Technology", "Senior VP Technology"],
    "IT Director": ["IT Director", "Director of IT", "Director Information Technology", "Director of Information Technology", "Senior Director IT", "Senior Director of IT", "Director IT Infrastructure", "Director Enterprise Technology", "Director Technology", "Director of Technology", "Director IT Operations"],
    "Enterprise Architect": ["Enterprise Architect", "Principal Enterprise Architect", "Senior Enterprise Architect", "Chief Architect", "IT Architect", "Solutions Architect", "Infrastructure Architect", "Technology Architect", "Director Enterprise Architecture", "VP Enterprise Architecture"],

    // Security
    "CISO": ["CISO", "Chief Information Security Officer", "VP Information Security", "VP of Information Security", "VP IT Security", "VP of IT Security", "Vice President Information Security", "SVP Information Security", "Head of Information Security", "Head of IT Security", "Director Information Security", "Director of Information Security", "Senior Director Information Security", "Director IT Security", "Director of IT Security", "Director Cybersecurity", "VP Cybersecurity"],
    "Security Architect": ["Security Architect", "Senior Security Architect", "Principal Security Architect", "IT Security Architect", "Cybersecurity Architect", "Information Security Architect", "Cloud Security Architect", "Enterprise Security Architect"],
    "IT Security Manager": ["IT Security Manager", "Information Security Manager", "Cybersecurity Manager", "Security Operations Manager", "IT Security Lead", "Senior IT Security Manager"],

    // Compliance
    "Chief Compliance Officer": ["Chief Compliance Officer", "CCO", "Head of Compliance", "VP Compliance", "VP of Compliance", "Vice President Compliance", "SVP Compliance", "Director of Compliance", "Director Compliance", "Senior Director Compliance", "Global Head of Compliance", "Compliance Director"],
    "Compliance Officer": ["Compliance Officer", "Compliance Manager", "Senior Compliance Officer", "Compliance Director", "Director of Compliance", "Regulatory Compliance Manager", "Compliance Analyst", "Senior Compliance Manager", "VP Compliance", "Head of Compliance"],
    "Risk Officer": ["Chief Risk Officer", "CRO", "VP Risk", "VP of Risk", "Director Risk Management", "Director of Risk", "Head of Risk", "Risk Manager", "Senior Risk Manager", "Enterprise Risk Manager", "VP Risk Management", "Operational Risk Director"],
    "DPO": ["Data Protection Officer", "DPO", "Chief Privacy Officer", "CPO", "VP Privacy", "VP of Privacy", "Director of Privacy", "Privacy Director", "Head of Privacy", "Privacy Officer", "Director Data Privacy", "Head of Data Protection", "Privacy Manager"],
    "General Counsel": ["General Counsel", "GC", "Chief Legal Officer", "CLO", "VP Legal", "VP of Legal", "Head of Legal", "Senior Counsel", "Deputy General Counsel", "Associate General Counsel"],

    // Communications
    "Chief Communications Officer": ["Chief Communications Officer", "CCO", "VP Communications", "VP of Communications", "VP Corporate Communications", "VP of Corporate Communications", "Vice President Communications", "SVP Communications", "Head of Communications", "Head of Corporate Communications", "Director of Communications", "Director Communications", "Director Corporate Communications", "Senior Director Communications", "EVP Communications", "Global Head of Communications"],
    "VP Internal Communications": ["VP Internal Communications", "VP of Internal Communications", "Vice President Internal Communications", "Director Internal Communications", "Director of Internal Communications", "Senior Director Internal Communications", "Head of Internal Communications", "Head of Internal Comms", "VP Employee Communications", "Director Employee Communications"],
    "Head of Internal Communications": ["Head of Internal Communications", "Head of Internal Comms", "Director Internal Communications", "Director of Internal Communications", "VP Internal Communications", "VP of Internal Communications", "Senior Director Internal Communications", "Manager Internal Communications", "VP Employee Communications"],

    // Digital Transformation
    "Chief Digital Officer": ["Chief Digital Officer", "CDO", "VP Digital Transformation", "VP of Digital Transformation", "Vice President Digital Transformation", "SVP Digital", "Head of Digital Transformation", "Director Digital Transformation", "Director of Digital Transformation", "VP Digital Strategy", "VP of Digital Strategy", "SVP Digital Transformation", "Digital Transformation Leader"],
    "VP Digital Transformation": ["VP Digital Transformation", "VP of Digital Transformation", "Vice President Digital Transformation", "SVP Digital Transformation", "Director Digital Transformation", "Director of Digital Transformation", "Head of Digital Transformation", "Chief Digital Officer", "CDO"],
    "VP Digital Strategy": ["VP Digital Strategy", "VP of Digital Strategy", "Vice President Digital Strategy", "Director Digital Strategy", "Director of Digital Strategy", "Head of Digital Strategy", "SVP Digital Strategy", "VP Digital Innovation"],
    "VP Digital Workplace": ["VP Digital Workplace", "VP of Digital Workplace", "Director Digital Workplace", "Director of Digital Workplace", "Head of Digital Workplace", "VP Digital Employee Experience", "Director Digital Employee Experience", "VP Workplace Technology"],

    // HR / People
    "CHRO": ["CHRO", "Chief Human Resources Officer", "Chief People Officer", "CPO", "VP Human Resources", "VP of Human Resources", "SVP Human Resources", "SVP HR", "EVP Human Resources", "Head of HR", "Head of Human Resources", "VP People", "VP of People", "VP People Operations"],
    "Chief People Officer": ["Chief People Officer", "CPO", "CHRO", "Chief Human Resources Officer", "VP People", "VP of People", "SVP People", "Head of People", "VP People Operations", "VP of People Operations", "SVP HR", "VP Human Resources"],
    "Head of L&D": ["Head of Learning and Development", "Head of L&D", "VP Learning and Development", "VP of Learning and Development", "Director Learning and Development", "Director of Learning and Development", "Chief Learning Officer", "CLO", "Director L&D", "Director of L&D", "VP Training", "VP of Training", "Director Training", "Director of Training", "Head of Training", "VP Talent Development", "Director Talent Development"],
    "Head of HR Technology": ["Head of HR Technology", "VP HR Technology", "VP of HR Technology", "Director HR Technology", "Director of HR Technology", "Director HRIS", "VP HRIS", "Head of HRIS", "Head of People Technology", "VP People Technology"],

    // Unified Communications
    "Unified Communications Manager": ["Unified Communications Manager", "UC Manager", "Unified Communications Engineer", "Unified Communications Architect", "Director Unified Communications", "Director of Unified Communications", "Head of Unified Communications", "UC Architect", "Collaboration Engineer", "Collaboration Architect", "Director Collaboration", "VP Collaboration", "VP Unified Communications"],
    "Network Architect": ["Network Architect", "Senior Network Architect", "Principal Network Architect", "Network Engineer", "Senior Network Engineer", "Director Network Engineering", "Director of Network Engineering", "VP Network Engineering", "Network Operations Manager", "Infrastructure Architect"],

    // Media / Video
    "VP of Digital Media": ["VP Digital Media", "VP of Digital Media", "Vice President Digital Media", "Director Digital Media", "Director of Digital Media", "Head of Digital Media", "VP Video", "VP of Video", "Director Video", "Director of Video", "Head of Video", "VP Media", "VP of Media", "VP Media Operations", "Director Media Operations"],
    "VP Video Technology": ["VP Video Technology", "VP of Video Technology", "Director Video Technology", "Director of Video Technology", "Head of Video Technology", "VP Media Technology", "VP of Media Technology", "Director Media Technology", "Video Platform Manager", "Enterprise Video Manager"],

    // Federal / Government
    "Federal CIO": ["CIO", "Chief Information Officer", "Deputy CIO", "Associate CIO", "IT Director", "Director Information Technology", "Director of IT", "Chief Technology Officer", "CTO"],
    "Contracting Officer": ["Contracting Officer", "Contracting Officer Representative", "COR", "Procurement Officer", "Acquisition Officer", "IT Acquisition Lead", "Senior Contracting Officer", "Contract Specialist"],
    "Section 508 Coordinator": ["Section 508 Coordinator", "Section 508 Program Manager", "Accessibility Coordinator", "Accessibility Program Manager", "Chief Accessibility Officer", "Director of Accessibility", "Digital Accessibility Manager", "508 Compliance Manager"],
    "Program Manager": ["Program Manager", "IT Program Manager", "Senior Program Manager", "Defense Program Manager", "Program Director", "Program Executive Officer", "PEO"],

    // Procurement / Finance
    "Procurement": ["Procurement Director", "Director of Procurement", "VP Procurement", "VP of Procurement", "Head of Procurement", "Procurement Manager", "Senior Procurement Manager", "Category Manager", "IT Procurement Manager", "Sourcing Manager", "Strategic Sourcing Manager", "VP Sourcing", "Director Sourcing"],
    "Finance": ["CFO", "Chief Financial Officer", "VP Finance", "VP of Finance", "Finance Director", "Director of Finance", "Controller", "VP Financial Planning"],

    // Microsoft-specific
    "M365 Admin": ["Microsoft 365 Administrator", "M365 Admin", "Microsoft 365 Platform Owner", "M365 Platform Manager", "Microsoft Teams Administrator", "Teams Admin", "Collaboration Platform Manager", "Director Microsoft Platform", "Microsoft Platform Architect", "Microsoft 365 Architect", "SharePoint Administrator", "VP Collaboration"],
    "Microsoft 365 Platform Owner": ["Microsoft 365 Platform Owner", "M365 Platform Manager", "Microsoft 365 Administrator", "M365 Admin", "Microsoft Teams Administrator", "Teams Admin", "Collaboration Platform Manager", "Director Microsoft Platform", "Microsoft Platform Architect", "SharePoint Administrator"]
  };

  // Keywords that trigger specific title families when found in the persona string
  var PERSONA_KEYWORDS = [
    { pattern: /\bCIO\b/i, key: "CIO" },
    { pattern: /\bCTO\b/i, key: "CTO" },
    { pattern: /\bCISO\b|\bChief Information Security/i, key: "CISO" },
    { pattern: /\bSecurity Architect/i, key: "Security Architect" },
    { pattern: /\bIT Security Manager/i, key: "IT Security Manager" },
    { pattern: /\bChief Compliance Officer\b|\bCCO\b/i, key: "Chief Compliance Officer" },
    { pattern: /\bCompliance Officer\b|\bCompliance Director/i, key: "Compliance Officer" },
    { pattern: /\bRisk Officer\b|\bCRO\b/i, key: "Risk Officer" },
    { pattern: /\bDPO\b|\bData Protection Officer\b|\bChief Privacy Officer\b|\bPrivacy Officer/i, key: "DPO" },
    { pattern: /\bGeneral Counsel\b/i, key: "General Counsel" },
    { pattern: /\bCHRO\b|\bChief Human Resources/i, key: "CHRO" },
    { pattern: /\bChief People Officer\b/i, key: "Chief People Officer" },
    { pattern: /\bChief Communications Officer\b/i, key: "Chief Communications Officer" },
    { pattern: /\bChief Digital Officer\b/i, key: "Chief Digital Officer" },
    { pattern: /\bVP.*Internal Communications\b|\bHead of Internal Communications/i, key: "VP Internal Communications" },
    { pattern: /\bVP.*Corporate Communications\b|\bHead of Corporate Communications/i, key: "Chief Communications Officer" },
    { pattern: /\bVP.*Digital Transformation\b/i, key: "VP Digital Transformation" },
    { pattern: /\bVP.*Digital Strategy\b/i, key: "VP Digital Strategy" },
    { pattern: /\bVP.*Digital Workplace\b|\bDigital Employee Experience/i, key: "VP Digital Workplace" },
    { pattern: /\bVP.*IT\b|\bVP.*Information Technology\b/i, key: "VP of IT" },
    { pattern: /\bVP.*Technology\b/i, key: "VP of Technology" },
    { pattern: /\bIT Director\b|\bDirector.*IT\b|\bDirector.*Information Technology/i, key: "IT Director" },
    { pattern: /\bEnterprise Architect\b/i, key: "Enterprise Architect" },
    { pattern: /\bUnified Communications/i, key: "Unified Communications Manager" },
    { pattern: /\bNetwork Architect\b|\bNetwork Engineer/i, key: "Network Architect" },
    { pattern: /\bVP.*Digital Media\b|\bHead of Digital Media/i, key: "VP of Digital Media" },
    { pattern: /\bVP.*Video Technology\b|\bMedia Operations/i, key: "VP Video Technology" },
    { pattern: /\bL&D\b|\bLearning.*Development\b|\bChief Learning Officer\b|\bTraining/i, key: "Head of L&D" },
    { pattern: /\bHR Technology\b|\bHRIS\b|\bPeople Technology/i, key: "Head of HR Technology" },
    { pattern: /\bContracting Officer\b/i, key: "Contracting Officer" },
    { pattern: /\bSection 508\b|\bAccessibility/i, key: "Section 508 Coordinator" },
    { pattern: /\bProgram Manager\b/i, key: "Program Manager" },
    { pattern: /\bProcurement\b|\bSourcing/i, key: "Procurement" },
    { pattern: /\bM365\b|\bMicrosoft 365\b|\bMicrosoft.*Platform/i, key: "M365 Admin" },
    { pattern: /\bFederal.*CIO\b|\bAgency.*CIO/i, key: "Federal CIO" }
  ];

  function generateICPTitles(finding) {
    var persona = finding.target_persona || "";
    var category = finding.category || "";
    var findingType = finding.finding_type || "";
    var titlesSet = {}; // use object keys for dedup

    // Match keywords from the persona string
    PERSONA_KEYWORDS.forEach(function (pk) {
      if (pk.pattern.test(persona)) {
        var titles = ICP_TITLE_MAP[pk.key];
        if (titles) {
          titles.forEach(function (t) { titlesSet[t] = true; });
        }
      }
    });

    // If no matches found, add base IT/executive titles as fallback
    if (Object.keys(titlesSet).length === 0) {
      var fallback = ["CIO", "VP of IT", "IT Director"];
      fallback.forEach(function (key) {
        var titles = ICP_TITLE_MAP[key];
        if (titles) {
          titles.forEach(function (t) { titlesSet[t] = true; });
        }
      });
    }

    // Add category-specific titles
    if (category === "Compliance & Regulatory") {
      ["Chief Compliance Officer", "Compliance Officer", "DPO"].forEach(function (key) {
        var titles = ICP_TITLE_MAP[key];
        if (titles) {
          titles.forEach(function (t) { titlesSet[t] = true; });
        }
      });
    }

    // Convert to array and sort by seniority (C-suite first, then VP, then Director, etc.)
    var allTitles = Object.keys(titlesSet);
    var seniorityOrder = ["Chief", "CIO", "CTO", "CISO", "CHRO", "CCO", "CDO", "CLO", "CPO", "CRO", "CFO", "GC", "EVP", "SVP", "Senior Vice President", "VP", "Vice President", "Head of", "Senior Director", "Director", "Principal", "Senior", "Manager", "Lead", "Architect", "Engineer"];

    allTitles.sort(function (a, b) {
      var aIdx = seniorityOrder.length;
      var bIdx = seniorityOrder.length;
      for (var i = 0; i < seniorityOrder.length; i++) {
        if (aIdx === seniorityOrder.length && a.indexOf(seniorityOrder[i]) !== -1) aIdx = i;
        if (bIdx === seniorityOrder.length && b.indexOf(seniorityOrder[i]) !== -1) bIdx = i;
      }
      if (aIdx !== bIdx) return aIdx - bIdx;
      return a.localeCompare(b);
    });

    return allTitles;
  }

  function formatBooleanSearch(titles) {
    return titles.map(function (t) {
      return '"' + t + '"';
    }).join(" OR ");
  }

  // ---- Modal ----
  function openModal(id) {
    var finding = FINDINGS.find(function (f) {
      return f.id === id;
    });
    if (!finding) return;

    var score = finding.urgency_score || 0;
    var urgencyClass = "urgency-" + score;
    var urgencyLabel = URGENCY_NAMES[score] || "Low";
    var confClass = "confidence-" + (finding.confidence || "Low").toLowerCase();

    var html = '<div class="modal-header">';
    html += '<div class="modal-header-text">';
    html +=
      '<div class="modal-company">' +
      escapeHtml(finding.company) +
      "</div>";
    html += '<div class="modal-type">';
    html +=
      '<span class="urgency-badge ' +
      urgencyClass +
      '" style="margin-right:8px"><span class="urgency-dot"></span>' +
      urgencyLabel +
      "</span>";
    html +=
      '<span class="confidence-badge ' +
      confClass +
      '" style="margin-right:8px"><span class="confidence-dot"></span>' +
      escapeHtml(finding.confidence || "Low") +
      "</span>";
    html +=
      '<span class="type-badge">' +
      escapeHtml(finding.finding_type || "") +
      "</span>";
    if (finding.competitor) {
      html +=
        ' <span style="color:var(--color-text-faint);margin-left:8px">vs ' +
        escapeHtml(finding.competitor) +
        "</span>";
    }
    html += "</div>";
    html += "</div></div>";

    // Summary
    html += '<div class="modal-section">';
    html += '<div class="modal-section-title">Summary</div>';
    html +=
      '<div class="modal-section-content">' +
      escapeHtml(finding.summary) +
      "</div>";
    html += "</div>";

    // Evidence quote (V2.0)
    if (finding.evidence_quote) {
      html += '<div class="modal-section">';
      html += '<div class="modal-section-title">Evidence</div>';
      html +=
        '<div class="modal-evidence">&ldquo;' +
        escapeHtml(finding.evidence_quote) +
        '&rdquo;</div>';
      html += "</div>";
    }

    // Why VBRICK
    html += '<div class="modal-section">';
    html += '<div class="modal-section-title">Why VBRICK</div>';
    html +=
      '<div class="modal-vbrick">' +
      escapeHtml(finding.why_vbrick || "") +
      "</div>";
    html += "</div>";

    // Outreach
    html += '<div class="modal-section">';
    html +=
      '<div class="modal-section-title">Suggested Outreach Angle</div>';
    html +=
      '<div class="modal-outreach">' +
      escapeHtml(finding.outreach_angle || "") +
      "</div>";
    html += "</div>";

    // Maniac Method Outreach
    var outreach = generateJMMOutreach(finding);
    html += '<div class="modal-section">';
    html += '<div class="modal-section-title">Maniac Method Outreach</div>';
    html += '<div class="outreach-tabs">';
    html += '<button class="outreach-tab active" data-tab="email">Email</button>';
    html += '<button class="outreach-tab" data-tab="linkedin">LinkedIn</button>';
    html += '<button class="outreach-tab" data-tab="coldcall">Cold Call</button>';
    html += '<button class="outreach-tab" data-tab="voicemail">Voicemail</button>';
    if (outreach.stakeholderMessages && outreach.stakeholderMessages.length > 0) {
      html += '<button class="outreach-tab" data-tab="stakeholder-outreach">By Role</button>';
    }
    html += '</div>';
    html += '<div class="outreach-panels">';

    // Email panel
    html += '<div class="outreach-panel active" data-panel="email">';
    html += '<div style="position:relative">';
    html += '<button class="copy-btn" data-copy="email">Copy</button>';
    html += '<div class="outreach-subject">Subject: ' + escapeHtml(outreach.email.subject) + '</div>';
    html += '<div class="outreach-script" data-copy-target="email">' + escapeHtml(outreach.email.body).replace(/\n/g, '<br>') + '</div>';
    html += '</div></div>';

    // LinkedIn panel
    html += '<div class="outreach-panel" data-panel="linkedin">';
    html += '<div class="linkedin-note">Connection requests are sent blank &mdash; no note. The DM below is sent after they accept.</div>';
    html += '<div style="position:relative">';
    html += '<button class="copy-btn" data-copy="linkedin">Copy</button>';
    html += '<div class="outreach-script" data-copy-target="linkedin">' + escapeHtml(outreach.linkedin).replace(/\n/g, '<br>') + '</div>';
    html += '</div></div>';

    // Cold Call panel
    html += '<div class="outreach-panel" data-panel="coldcall">';
    html += '<div style="position:relative">';
    html += '<button class="copy-btn" data-copy="coldcall">Copy</button>';
    html += '<div class="outreach-script" data-copy-target="coldcall">';
    html += '<div class="cold-call-section"><div class="cold-call-label opener">OPENER</div>';
    html += '<div class="cold-call-text">' + escapeHtml(outreach.coldcall.opener).replace(/\n/g, '<br>') + '</div></div>';
    html += '<div class="cold-call-section"><div class="cold-call-label exec-route">EXECUTIVE ROUTE</div>';
    html += '<div class="cold-call-text">' + escapeHtml(outreach.coldcall.execRoute).replace(/\n/g, '<br>') + '</div></div>';
    html += '<div class="cold-call-section"><div class="cold-call-label yes-path">IF YES &mdash; THEY OWN IT</div>';
    html += '<div class="cold-call-text">' + escapeHtml(outreach.coldcall.yesPath).replace(/\n/g, '<br>') + '</div></div>';
    html += '<div class="cold-call-section"><div class="cold-call-label no-path">IF NO &mdash; REFERRAL PATH</div>';
    html += '<div class="cold-call-text">' + escapeHtml(outreach.coldcall.noPath).replace(/\n/g, '<br>') + '</div></div>';
    html += '</div></div></div>';

    // Voicemail panel
    html += '<div class="outreach-panel" data-panel="voicemail">';
    html += '<div class="voicemail-note">Keep it short &mdash; the only goal is to direct them to your email or LinkedIn DM.</div>';
    html += '<div style="position:relative">';
    html += '<button class="copy-btn" data-copy="voicemail">Copy</button>';
    html += '<div class="outreach-script" data-copy-target="voicemail">' + escapeHtml(outreach.voicemail).replace(/\n/g, '<br>') + '</div>';
    html += '</div></div>';

    // Stakeholder Outreach panel (By Role)
    if (outreach.stakeholderMessages && outreach.stakeholderMessages.length > 0) {
      html += '<div class="outreach-panel" data-panel="stakeholder-outreach">';
      html += '<div class="stakeholder-outreach-note">Tailored messaging for each stakeholder tier. Adjust the trigger event and company details as needed.</div>';
      outreach.stakeholderMessages.forEach(function(sm, idx) {
        html += '<div class="stakeholder-msg-block">';
        html += '<div class="stakeholder-msg-role">' + escapeHtml(sm.role) + '</div>';
        html += '<div class="stakeholder-msg-channels">';
        // Email variant
        html += '<div class="stakeholder-msg-channel">';
        html += '<div class="stakeholder-msg-channel-label">Email</div>';
        html += '<div style="position:relative">';
        html += '<button class="copy-btn" data-copy="sh-email-' + idx + '">Copy</button>';
        html += '<div class="outreach-script" data-copy-target="sh-email-' + idx + '">' + escapeHtml(sm.email).replace(/\n/g, '<br>') + '</div>';
        html += '</div></div>';
        // Cold call variant
        html += '<div class="stakeholder-msg-channel">';
        html += '<div class="stakeholder-msg-channel-label">Cold Call</div>';
        html += '<div style="position:relative">';
        html += '<button class="copy-btn" data-copy="sh-call-' + idx + '">Copy</button>';
        html += '<div class="outreach-script" data-copy-target="sh-call-' + idx + '">' + escapeHtml(sm.coldcall).replace(/\n/g, '<br>') + '</div>';
        html += '</div></div>';
        html += '</div></div>';
      });
      html += '</div>';
    }

    html += '</div></div>';

    // Stakeholders
    if (finding.stakeholders && finding.stakeholders.length > 0) {
      html += '<div class="modal-section">';
      html += '<div class="modal-section-title">Key Stakeholders</div>';
      html += '<div class="stakeholder-grid">';
      finding.stakeholders.forEach(function (s) {
        var role = (s.role || "Stakeholder").toLowerCase().replace(/\s+/g, "-");
        html += '<div class="stakeholder-card">';
        html += '<div class="stakeholder-role-badge ' + escapeHtml(role) + '">' + escapeHtml(s.role || "Stakeholder") + '</div>';
        html += '<div class="stakeholder-name">' + escapeHtml(s.name || "") + '</div>';
        html += '<div class="stakeholder-title">' + escapeHtml(s.title || "") + '</div>';
        if (s.linkedin_url) {
          html += '<a href="' + escapeHtml(s.linkedin_url) + '" target="_blank" class="stakeholder-linkedin">View on LinkedIn \u2192</a>';
        }
        html += '</div>';
      });
      html += '</div></div>';
    }

    // ICP Title Search for Sales Navigator
    var icpTitles = generateICPTitles(finding);
    if (icpTitles.length > 0) {
      var booleanSearch = formatBooleanSearch(icpTitles);
      html += '<div class="modal-section">';
      html += '<div class="modal-section-title" style="display:flex;align-items:center;gap:var(--space-2)">';
      html += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>';
      html += 'ICP Titles &mdash; Sales Navigator Search';
      html += '</div>';
      html += '<div class="icp-search-hint">Copy and paste into LinkedIn Sales Navigator\'s Title filter (boolean mode)</div>';
      html += '<div style="position:relative">';
      html += '<button class="copy-btn" data-copy="icp-titles">Copy</button>';
      html += '<div class="icp-search-box" data-copy-target="icp-titles">' + escapeHtml(booleanSearch) + '</div>';
      html += '</div>';
      html += '<div class="icp-title-count">' + icpTitles.length + ' title variations</div>';
      html += '</div>';
    }

    // Metadata grid
    html += '<div class="modal-meta">';
    html += metaItem("Target Persona", finding.target_persona);
    html += metaItem("Industry", finding.industry);
    html += metaItem("Category", finding.category);
    html += metaItem("Date", finding.date);

    // Urgency rationale (V2.0)
    if (finding.urgency_rationale) {
      html += metaItem("Urgency Rationale", finding.urgency_rationale);
    }
    // Confidence rationale (V2.0)
    if (finding.confidence_rationale) {
      html += metaItem("Confidence Rationale", finding.confidence_rationale);
    }
    // Source type (V2.0)
    if (finding.source_type) {
      html += metaItem("Source Type", finding.source_type);
    }
    // Compliance-specific
    if (finding.compliance_standard) {
      html += metaItem("Compliance Standard", finding.compliance_standard);
    }
    if (finding.deadline_or_effective_date) {
      html += metaItem("Deadline", finding.deadline_or_effective_date);
    }
    if (finding.vbrick_certification_match) {
      html += metaItem("VBRICK Cert Match", finding.vbrick_certification_match);
    }
    // Triggers/Fortune 500 specific
    if (finding.employee_count && finding.employee_count !== "Unknown") {
      var empStr = typeof finding.employee_count === "number"
        ? finding.employee_count.toLocaleString()
        : finding.employee_count;
      html += metaItem("Employees", empStr);
    }
    if (finding.is_fortune500 === true) {
      html += metaItem("Fortune 500", "Yes");
    } else if (finding.is_fortune500 === false) {
      html += metaItem("Fortune 500", "No");
    }
    if (finding.current_platform && finding.current_platform !== "Unknown") {
      html += metaItem("Current Platform", finding.current_platform);
    }
    if (finding.video_implication) {
      html += metaItem("Video Implication", finding.video_implication);
    }
    html += "</div>";

    // Source verification + link
    html += '<div style="margin-top:var(--space-3);display:flex;align-items:center;gap:var(--space-3);flex-wrap:wrap">';
    if (finding.source_verified === true) {
      html +=
        '<span class="source-verified verified"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>Verified</span>';
    } else if (finding.source_verified === false) {
      html +=
        '<span class="source-verified unverified"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>Unverified</span>';
    }
    if (finding.source_url) {
      html +=
        '<a href="' +
        escapeHtml(finding.source_url) +
        '" class="modal-source-link" target="_blank" rel="noopener noreferrer">View Source &rarr;</a>';
    }
    html += "</div>";

    // Additional sources (V2.0)
    if (finding.additional_sources && finding.additional_sources.length > 0) {
      html += '<div style="margin-top:var(--space-2)">';
      html += '<div class="modal-section-title" style="margin-bottom:var(--space-1)">Additional Sources</div>';
      finding.additional_sources.forEach(function (src) {
        if (src && src.startsWith("http")) {
          html +=
            '<div><a href="' +
            escapeHtml(src) +
            '" class="modal-source-link" target="_blank" rel="noopener noreferrer" style="font-size:var(--text-xs);word-break:break-all">' +
            escapeHtml(src.length > 80 ? src.substring(0, 77) + "..." : src) +
            "</a></div>";
        } else if (src) {
          html +=
            '<div style="font-size:var(--text-xs);color:var(--color-text-muted)">' +
            escapeHtml(src) +
            "</div>";
        }
      });
      html += "</div>";
    }

    modalContent.innerHTML = html;
    modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden";

    // Tab switching for outreach
    var tabs = modalContent.querySelectorAll('.outreach-tab');
    var panels = modalContent.querySelectorAll('.outreach-panel');
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        tabs.forEach(function(t) { t.classList.remove('active'); });
        panels.forEach(function(p) { p.classList.remove('active'); });
        tab.classList.add('active');
        var target = tab.dataset.tab;
        var panel = modalContent.querySelector('.outreach-panel[data-panel="' + target + '"]');
        if (panel) panel.classList.add('active');
      });
    });

    // Copy buttons
    var copyBtns = modalContent.querySelectorAll('.copy-btn');
    copyBtns.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var target = btn.dataset.copy;
        var el = modalContent.querySelector('[data-copy-target="' + target + '"]');
        if (el) {
          navigator.clipboard.writeText(el.textContent).then(function() {
            btn.textContent = 'Copied!';
            setTimeout(function() { btn.textContent = 'Copy'; }, 2000);
          });
        }
      });
    });
  }

  function metaItem(label, value) {
    if (!value) return "";
    return (
      '<div class="modal-meta-item">' +
      '<span class="modal-meta-label">' +
      escapeHtml(label) +
      "</span>" +
      '<span class="modal-meta-value">' +
      escapeHtml(String(value)) +
      "</span>" +
      "</div>"
    );
  }

  function closeModal() {
    modalOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  // ---- Utils ----
  function escapeHtml(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // ---- Update Time ----
  function updateTime() {
    var el = document.getElementById("updateTime");
    if (el) {
      var now = new Date();
      el.textContent =
        now.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
        " " +
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
    }
  }

  // ---- Init ----
  updateTime();
  setInterval(updateTime, 60000);
  renderFindings();
})();
