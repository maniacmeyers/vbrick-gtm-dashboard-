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
    playbook: "Outbound Playbook",
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
    // Handle playbook view separately
    var filtersBar = document.querySelector('.filters-bar');
    var kpiGrid = document.getElementById('kpiGrid');
    var tableContainer = document.querySelector('.table-container');
    var playbookEl = document.getElementById('playbookContainer');

    if (currentView === 'playbook') {
      if (filtersBar) filtersBar.style.display = 'none';
      if (kpiGrid) kpiGrid.style.display = 'none';
      if (tableContainer) tableContainer.style.display = 'none';
      findingCount.textContent = '';
      if (!playbookEl) {
        playbookEl = document.createElement('div');
        playbookEl.id = 'playbookContainer';
        document.getElementById('mainContent').appendChild(playbookEl);
      }
      playbookEl.style.display = 'block';
      renderPlaybook(playbookEl);
      return;
    }

    // Normal view: show standard elements, hide playbook
    if (filtersBar) filtersBar.style.display = '';
    if (kpiGrid) kpiGrid.style.display = '';
    if (tableContainer) tableContainer.style.display = '';
    if (playbookEl) playbookEl.style.display = 'none';

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

  // --- EMAIL: Maniac Method Spear — under 50 words, no pleasantries, conversational ---
  function generateEmail(company, pain, proof, isMulti, finding, trigger) {
    var subject = generateSubject(finding);
    var type = finding.finding_type || "";
    var competitor = finding.competitor || "";

    var body = "{{First Name}},\n\n";
    if (type.includes("Migration") || type.includes("Churn")) {
      body += isMulti
        ? trigger + ". When your video vendor implodes mid-town-hall, it's your problem. We kept similar orgs live through theirs."
        : trigger + ". " + company + "'s video stack is exposed. We kept orgs like yours live when their vendor cratered.";
    } else if (type.includes("RTO")) {
      body += isMulti
        ? "RTO mandates. 10K people, one all-hands, network melts. We prevent that with eCDN."
        : company + " RTO. 10K people, one all-hands, network melts. We prevent that with eCDN.";
    } else if (type.includes("Compliance") || type.includes("Regulatory")) {
      body += "New compliance deadlines hit video archiving. Most orgs aren't ready. We got similar companies audit-proof in 6 weeks.";
    } else if (type.includes("Leadership")) {
      body += "New role, inherited video stack. The gaps show up fast when the CEO town hall crashes. We fix that.";
    } else if (type.includes("M&A")) {
      body += "Two orgs merge, two video platforms collide. It breaks. We've unified video infrastructure through 3 major integrations this year.";
    } else if (type.includes("Security")) {
      body += trigger + ". Most enterprise video platforms have security gaps your CISO doesn't know about yet. We close them.";
    } else if (type.includes("Job Posting") || type.includes("eCDN")) {
      body += "Saw " + company + " is building out " + getDomainWord(finding) + ". We do this for F500s with eCDN, FedRAMP, real-time analytics.";
    } else {
      body += trigger + ". Directly impacts your video infrastructure. We handle this for similar orgs.";
    }
    body += "\n\nRelevant?\n\n{{Your First Name}}";

    return { subject: subject, body: body };
  }

  // --- LINKEDIN DM: after blank connection request, under 40 words, no pitch ---
  function generateLinkedInDM(company, pain, proof, isMulti, finding, trigger) {
    var type = finding.finding_type || "";

    var msg = "";
    if (type.includes("Migration") || type.includes("Churn")) {
      msg = "{{First Name}} -- " + trigger + ". Seeing a pattern with orgs dealing with this. Curious if it's on your radar too.";
    } else if (type.includes("RTO")) {
      msg = isMulti
        ? "{{First Name}} -- RTO is exposing video infrastructure gaps everywhere. Figured you might be in the thick of it."
        : "{{First Name}} -- saw " + company + "'s RTO news. Scaling video for all-hands at that size is brutal. Worth comparing notes?";
    } else if (type.includes("Compliance") || type.includes("Regulatory")) {
      msg = "{{First Name}} -- new compliance deadlines are catching video teams off guard. Thought this might be relevant to what you're working on.";
    } else if (type.includes("Leadership")) {
      msg = "{{First Name}} -- saw the move. When you start poking at the video stack, I think there's something worth discussing.";
    } else if (type.includes("Security")) {
      msg = "{{First Name}} -- " + trigger + ". Most enterprise video has security gaps nobody's looking at. Worth a quick exchange?";
    } else {
      msg = "{{First Name}} -- came across " + trigger + ". Thought it might connect to what you're working on. Open to comparing notes?";
    }
    return msg;
  }

  // --- COLD CALL: Maniac Method — name-pause, pattern interrupt, eCDN question, silence ---
  function generateColdCall(company, pain, proof, persona, finding, trigger, domain) {
    var isMulti = company === "your organization";
    var companyPossessive = isMulti ? "your organization's" : company + "'s";

    // Step 1: Opener (inquisitive tone, first + last name, pause)
    var opener = '{{First Name}} {{Last Name}}?\n[PAUSE — everyone loves hearing their name. Wait for them to confirm or deny.]';

    // Step 2: Introduce yourself, then eCDN question + SILENCE
    var execRoute = 'Great, this is {{Your First Name}} calling with VBRICK. I know you weren\'t expecting my call, so I\'ll keep it brief. I\'m hoping you can help me out real quick — are you on the team responsible for ' + companyPossessive + ' eCDN strategy?\n[SILENCE — let them respond]';

    // Step 3a: If YES — ask "Why?" then reference trigger
    var yesPath = 'Why?\n[Let them talk. Get them explaining their world. Then tie in the trigger naturally:]\n"That makes sense — the reason I ask is ' + trigger + '. We\'ve been working with similar orgs on exactly that. Worth a quick conversation to see if there\'s a fit."';

    // Step 3b: If NO / wrong person — get referral, use social proof
    var noPath = 'Who might that person be?\n[They give a name]\nWould it be okay if I let {{Referred Name}} know that we briefly spoke?\n[Call referred person:]\n"{{Original First Name}} said you were the person I should speak with concerning ' + companyPossessive + ' eCDN strategy."\n[PAUSE — let them respond, then:]\n"The reason for my call — ' + trigger + '. We\'ve been working with similar orgs on this and I wanted to get your take."';

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

  // --- STAKEHOLDER-SPECIFIC MESSAGES (Maniac Method — under 50 word emails, same call structure) ---
  function generateStakeholderMessages(finding, company, trigger, domain) {
    var type = finding.finding_type || "";
    var messages = [];
    var companyPoss = company === "your organization" ? "your organization's" : company + "'s";

    // SVP/VP (Decision Maker)
    messages.push({
      role: 'SVP / VP (Decision Maker)',
      email: '{{First Name}},\n\n' + trigger + '. Video infrastructure is the thing nobody thinks about until the CEO town hall crashes. We prevent that for orgs your size.\n\nRelevant?\n\n{{Your First Name}}',
      coldcall: '{{First Name}} {{Last Name}}?\n[PAUSE]\nGreat, this is {{Your First Name}} calling with VBRICK. I know you weren\'t expecting my call, so I\'ll keep it brief. I\'m hoping you can help me out real quick — are you on the team responsible for ' + companyPoss + ' eCDN strategy?\n[SILENCE]\n[If YES:] Why?\n[Let them talk, then:] "That makes sense — ' + trigger + '. We\'ve been working with similar orgs on exactly that."'
    });

    // Director (Influencer)
    messages.push({
      role: 'Director (Influencer)',
      email: '{{First Name}},\n\n' + trigger + '. Your name came up as the person closest to the video infrastructure decisions at ' + company + '. We\'re seeing patterns here worth discussing.\n\nOpen to it?\n\n{{Your First Name}}',
      coldcall: '{{First Name}} {{Last Name}}?\n[PAUSE]\nGreat, this is {{Your First Name}} calling with VBRICK. I know you weren\'t expecting my call, so I\'ll keep it brief. I\'m hoping you can help me out real quick — are you involved in ' + companyPoss + ' video infrastructure decisions?\n[SILENCE]\n[If YES:] Why?\n[Let them talk, then tie in ' + trigger + ']'
    });

    // Manager (Evaluator)
    messages.push({
      role: 'Manager (Evaluator)',
      email: '{{First Name}},\n\n' + trigger + '. This usually lands on someone in your position to figure out. We\'ve been helping teams navigate it.\n\nWorth comparing notes?\n\n{{Your First Name}}',
      coldcall: '{{First Name}} {{Last Name}}?\n[PAUSE]\nGreat, this is {{Your First Name}} calling with VBRICK. I know you weren\'t expecting my call, so I\'ll keep it brief. I\'m hoping you can help me out real quick — are you on the team evaluating ' + companyPoss + ' video platform?\n[SILENCE]\n[If YES:] Why?\n[Let them talk, then tie in ' + trigger + ']'
    });

    // Sr. Engineer / Architect (Technical Evaluator)
    messages.push({
      role: 'Sr. Engineer / Architect (Technical Evaluator)',
      email: '{{First Name}},\n\n' + trigger + '. Direct impact on ' + domain + '. We work on the eCDN and video delivery architecture side — think there\'s overlap.\n\nWorth a quick exchange?\n\n{{Your First Name}}',
      coldcall: '{{First Name}} {{Last Name}}?\n[PAUSE]\nGreat, this is {{Your First Name}} calling with VBRICK. I know you weren\'t expecting my call, so I\'ll keep it brief. I\'m hoping you can help me out real quick — are you working on ' + companyPoss + ' video delivery architecture?\n[SILENCE]\n[If YES:] Why?\n[Let them talk, then tie in ' + trigger + ']'
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

  // ---- CSV Export with Column Picker ----
  var CSV_COLUMNS = [
    { key: 'id', label: 'ID', getter: function(f){ return f.id; } },
    { key: 'urgency', label: 'Urgency', getter: function(f){ return URGENCY_NAMES[f.urgency_score||0]||'Low'; } },
    { key: 'company', label: 'Company', getter: function(f){ return f.company||''; } },
    { key: 'category', label: 'Category', getter: function(f){ return f.category||''; } },
    { key: 'finding_type', label: 'Finding Type', getter: function(f){ return f.finding_type||''; } },
    { key: 'summary', label: 'Summary', getter: function(f){ return f.summary||''; } },
    { key: 'target_persona', label: 'Target Persona', getter: function(f){ return f.target_persona||''; } },
    { key: 'industry', label: 'Industry', getter: function(f){ return f.industry||''; } },
    { key: 'why_vbrick', label: 'Why Vbrick', getter: function(f){ return f.why_vbrick||''; } },
    { key: 'confidence', label: 'Confidence', getter: function(f){ return f.confidence||''; } },
    { key: 'source_url', label: 'Source URL', getter: function(f){ return f.source_url||''; } },
    { key: 'competitor', label: 'Competitor', getter: function(f){ return f.competitor||''; } },
    { key: 'stakeholders', label: 'Stakeholders (Name / Title / LinkedIn)', getter: null }
  ];

  // Column selection (in-memory, persists within session)
  var _exportPrefsCache = null;
  function getExportPrefs() {
    if (_exportPrefsCache) return _exportPrefsCache;
    var prefs = {};
    CSV_COLUMNS.forEach(function(c){ prefs[c.key] = true; });
    _exportPrefsCache = prefs;
    return prefs;
  }
  function saveExportPrefs(prefs) {
    _exportPrefsCache = prefs;
  }

  function buildExportModal() {
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay open';
    overlay.id = 'exportModalOverlay';
    var modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.maxWidth = '520px';
    var prefs = getExportPrefs();
    var data = getFilteredFindings();

    var html = '<div class="modal-content">';
    html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">';
    html += '<h2 style="margin:0;font-size:var(--text-lg);">Export CSV</h2>';
    html += '<button id="exportModalClose" style="padding:6px;border-radius:8px;color:var(--color-text-muted);" aria-label="Close"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
    html += '</div>';
    html += '<p style="font-size:var(--text-sm);color:var(--color-text-muted);margin-bottom:1rem;">' + data.length + ' findings in current view. Select columns to include:</p>';

    // Select all / none
    html += '<div style="display:flex;gap:0.75rem;margin-bottom:1rem;">';
    html += '<button class="export-toggle-btn" id="csvSelectAll" style="font-size:var(--text-xs);font-weight:600;color:var(--nm-accent);cursor:pointer;">Select All</button>';
    html += '<button class="export-toggle-btn" id="csvSelectNone" style="font-size:var(--text-xs);font-weight:600;color:var(--color-text-muted);cursor:pointer;">Select None</button>';
    html += '</div>';

    // Column checkboxes
    html += '<div class="export-col-grid">';
    CSV_COLUMNS.forEach(function(c) {
      var checked = prefs[c.key] ? ' checked' : '';
      html += '<label class="export-col-label">';
      html += '<input type="checkbox" class="export-col-cb" data-key="' + c.key + '"' + checked + '>';
      html += '<span>' + c.label + '</span>';
      html += '</label>';
    });
    html += '</div>';

    // Download button
    html += '<div style="display:flex;gap:0.75rem;margin-top:1.5rem;">';
    html += '<button id="csvDownloadBtn" class="csv-download-btn">Download CSV</button>';
    html += '</div>';
    html += '</div>';

    modal.innerHTML = html;
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Wire up events
    document.getElementById('exportModalClose').addEventListener('click', function() {
      overlay.remove();
    });
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) overlay.remove();
    });
    document.getElementById('csvSelectAll').addEventListener('click', function() {
      overlay.querySelectorAll('.export-col-cb').forEach(function(cb){ cb.checked = true; });
    });
    document.getElementById('csvSelectNone').addEventListener('click', function() {
      overlay.querySelectorAll('.export-col-cb').forEach(function(cb){ cb.checked = false; });
    });
    document.getElementById('csvDownloadBtn').addEventListener('click', function() {
      // Read selected columns
      var selected = {};
      overlay.querySelectorAll('.export-col-cb').forEach(function(cb) {
        selected[cb.dataset.key] = cb.checked;
      });
      saveExportPrefs(selected);
      runCsvExport(data, selected);
      overlay.remove();
    });
  }

  function runCsvExport(data, selected) {
    var maxStake = 0;
    if (selected.stakeholders) {
      data.forEach(function(f) {
        if (f.stakeholders && f.stakeholders.length > maxStake) maxStake = f.stakeholders.length;
      });
      if (maxStake < 7) maxStake = 7;
    }

    // Build headers
    var headers = [];
    CSV_COLUMNS.forEach(function(c) {
      if (!selected[c.key]) return;
      if (c.key === 'stakeholders') {
        for (var si = 1; si <= maxStake; si++) {
          headers.push('Stakeholder ' + si + ' Name');
          headers.push('Stakeholder ' + si + ' Title');
          headers.push('Stakeholder ' + si + ' LinkedIn');
        }
      } else {
        headers.push(c.label);
      }
    });

    var csvRows = [headers.join(',')];
    data.forEach(function(f) {
      var row = [];
      CSV_COLUMNS.forEach(function(c) {
        if (!selected[c.key]) return;
        if (c.key === 'stakeholders') {
          for (var si = 0; si < maxStake; si++) {
            if (f.stakeholders && f.stakeholders[si]) {
              row.push(csvEscape(f.stakeholders[si].name||''));
              row.push(csvEscape(f.stakeholders[si].title||''));
              row.push(csvEscape(f.stakeholders[si].linkedin||''));
            } else {
              row.push(''); row.push(''); row.push('');
            }
          }
        } else {
          row.push(csvEscape(String(c.getter(f))));
        }
      });
      csvRows.push(row.join(','));
    });

    var csvContent = csvRows.join('\n');
    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    var viewLabel = viewTitles[currentView] || 'all';
    a.download = 'vbrick-gtm-' + viewLabel.toLowerCase().replace(/[^a-z0-9]+/g,'-') + '-' + new Date().toISOString().slice(0,10) + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  var exportBtn = document.getElementById('exportCsvBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', function() {
      var data = getFilteredFindings();
      if (data.length === 0) { alert('No findings to export.'); return; }
      buildExportModal();
    });
  }

  function csvEscape(str) {
    if (!str) return '';
    str = String(str);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  }

  // ---- Outbound Playbook Renderer ----
  function renderPlaybook(container) {
    // Only render once
    if (container.dataset.rendered === 'true') return;
    container.dataset.rendered = 'true';

    var ICONS = {
      lightbulb: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>',
      brain: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a5 5 0 0 1 5 5c0 1.5-.5 2.5-1.5 3.5L12 14l-3.5-3.5C7.5 9.5 7 8.5 7 7a5 5 0 0 1 5-5z"/><path d="M12 14v8"/><path d="M8 18h8"/></svg>',
      phone: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
      shield: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      layers: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
      'message-circle': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
      target: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
      zap: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
    };
    var chevronSvg = '<svg class="playbook-card-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';

    var sections = [
      { id: 'product-knowledge', title: 'Product Knowledge', icon: 'lightbulb', desc: 'What Vbrick does in plain English \u2014 the foundation for every conversation.', cards: [
        { title: 'What VBRICK Does (Plain English)', source: 'Day 2 \u2014 Module 2', html: '<div class="pb-principle">VBRICK helps large organizations use video internally without breaking their network or risking security.</div><div class="pb-label">When consumer tools break</div><ul class="pb-list"><li><strong>5,000+ employees join at once</strong> \u2014 Teams/Zoom causes network crush, buffering, lag. VBRICK: smooth delivery via eCDN.</li><li><strong>Security and compliance matter</strong> \u2014 Consumer tools have gaps. VBRICK: enterprise-grade security, full compliance, audit trails.</li><li><strong>Bandwidth is limited</strong> \u2014 Standard streaming eats bandwidth. VBRICK: adaptive bitrate, bandwidth optimization.</li></ul><div class="pb-label">The real problem we solve</div><p>It\'s not about features. It\'s about <strong>risk</strong>. Companies come when their CEO town hall crashed, they got flagged in a compliance audit, or their network can\'t handle video at scale. We eliminate that risk.</p><div class="pb-label">Mental model</div><div class="pb-principle">VBRICK is insurance + infrastructure. Like a hospital backup generator \u2014 you hope you never need it, but when you do, it has to work perfectly.</div>' }
      ]},
      { id: 'mindset', title: 'Mindset & Energy', icon: 'brain', desc: 'The mental foundation that separates top performers from everyone else.', cards: [
        { title: 'Calm Energy', source: 'Day 2 \u2014 Module 2', html: '<div class="pb-principle">Good conversations are calm. Not rushed, frantic, desperate, or defensive. Your energy sets the tone.</div><p>When you\'re calm, the prospect relaxes. When you\'re rushed, they feel pressured. When you\'re defensive, they get suspicious.</p><div class="pb-label">Athlete Analogy</div><p>Nervous energy = tight muscles, rushed movements, mistakes.<br>Calm confidence = smooth execution, good decisions, peak performance.<br><strong>Sales is the same.</strong></p>' },
        { title: 'The Status Problem', source: 'Day 2 \u2014 Module 2', html: '<div class="pb-principle">Lowering your status kills trust. Enterprise buyers want to talk to peers, not beggars.</div><div class="pb-label">Never say these</div><div class="pb-never">"I know you\'re super busy, so I\'ll be really quick..."</div><div class="pb-never">"Is this a good time? I don\'t want to bother you..."</div><div class="pb-never">"Can I just have 5 minutes? I promise it\'ll be worth it..."</div><div class="pb-never">"I\'d love to pick your brain if you have a second..."</div><div class="pb-never">"Hey, appreciate you picking up..."</div><div class="pb-label">Instead: direct, honest questions</div><div class="pb-good">"Is internal video breaking at scale something you\'re dealing with right now?"</div><div class="pb-good">"Are you the right person to talk to about this, or should I connect with someone else?"</div><div class="pb-good">"Does this sound relevant, or should we not waste each other\'s time?"</div>' },
        { title: 'Go for the No', source: 'Day 5 \u2014 Module 5', html: '<div class="pb-principle">The less you need the \'yes,\' the more likely you get it. Invite the \'no.\'</div><div class="pb-label">What it sounds like</div><div class="pb-script">"Based on what you\'re describing, it sounds like this might not be relevant right now. Should we just call it here, or is there something I\'m missing?"</div><div class="pb-script">"If this isn\'t a priority, totally get it. Should I stop following up, or is there a better time to check back?"</div><div class="pb-script">"Got it. Sounds like you\'re all set. Should I take you off my list, or is there a scenario where this might be relevant down the road?"</div><div class="pb-label">Common mistakes</div><div class="pb-never"><strong>Passive-Aggressive:</strong> "Well, if you\'re not interested, I guess I\'ll just leave you alone then..."</div><div class="pb-good"><strong>Better:</strong> "Got it. Should I check back in Q3, or would you prefer I don\'t follow up?"</div><div class="pb-never"><strong>Giving Up:</strong> "Okay, no problem. Have a great day!" (and never follow up)</div><div class="pb-good"><strong>Better:</strong> "Out of curiosity, is that because you\'re handling this internally, or is video just not a priority right now?"</div>' }
      ]},
      { id: 'call-structure', title: 'Call Structure (Maniac Method)', icon: 'phone', desc: 'The cold call framework \u2014 name, pause, pattern interrupt, eCDN question, silence.', cards: [
        { title: 'The Cold Call Opener', source: 'Maniac Method', html: '<div class="pb-label">Step 1: Name + Pause</div><div class="pb-script">{{First Name}} {{Last Name}}?<br>[PAUSE \u2014 everyone loves hearing their name. Wait for them to confirm or deny.]</div><div class="pb-label">Step 2: Introduce Yourself + eCDN Question + Silence</div><div class="pb-script">Great, this is {{Your First Name}} calling with VBRICK. I know you weren\'t expecting my call, so I\'ll keep it brief. I\'m hoping you can help me out real quick \u2014 are you on the team responsible for {Company}\'s eCDN strategy?<br>[SILENCE \u2014 let them respond]</div><div class="pb-label">Step 3a: If YES \u2014 ask "Why?"</div><div class="pb-script">Why?<br>[Let them talk. Get them explaining their world. Then tie in the trigger naturally:]<br>"That makes sense \u2014 the reason I ask is {trigger event}. We\'ve been working with similar orgs on exactly that. Worth a quick conversation to see if there\'s a fit."</div><div class="pb-label">Step 3b: If NO / Wrong Person \u2014 Get Referral</div><div class="pb-script">Who might that person be?<br>[They give a name]<br>Would it be okay if I let {Referred Name} know that we briefly spoke?<br>[Call referred person:]<br>"{Original First Name} said you were the person I should speak with concerning {Company}\'s eCDN strategy."<br>[PAUSE \u2014 then tie in trigger]</div>' },
        { title: 'Lead with Problems, Not Features', source: 'Day 3 \u2014 Module 3', html: '<div class="pb-principle">Stop telling prospects what you do. Start naming what\'s broken in their world.</div><div class="pb-label">The hierarchy</div><ul class="pb-list"><li>Crap reps sell features.</li><li>Good reps sell benefits.</li><li><strong>Pros lead with problems.</strong></li></ul><div class="pb-label">The contrast</div><div class="pb-contrast"><div class="pb-never"><strong>Feature pitch:</strong><br>"We have an AI-powered CRM with automated pipeline tracking."</div><div class="pb-good"><strong>Problem pitch:</strong><br>"Most sales managers say their reps hide behind email instead of picking up the phone. The pipeline\'s a mess and growth is a coin flip."</div></div><p><strong>When the problem lands, it\'s not a cold call anymore. It\'s a real conversation.</strong></p>' }
      ]},
      { id: 'objection-handling', title: 'Objection Handling', icon: 'shield', desc: 'How to handle every common objection with calm, peer-status energy.', cards: [
        { title: 'Common Objections', source: 'Day 3 \u2014 Module 3', html: '<div class="pb-scenario"><div class="pb-scenario-title">"We\'re all set"</div><div class="pb-good">"Got it. What are you using now?"</div><p>Stays curious. Gathers intel. Doesn\'t argue.</p></div><div class="pb-scenario"><div class="pb-scenario-title">"Send me an email"</div><div class="pb-good">"Happy to. Are you the right person making these decisions?"</div><p>Qualifies before investing email effort.</p></div><div class="pb-scenario"><div class="pb-scenario-title">"Not interested"</div><div class="pb-good">"No problem. Is it timing, or is video just not a priority?"</div><p>Gathers intel. Keeps door open.</p></div><div class="pb-scenario"><div class="pb-scenario-title">"We\'re just exploring"</div><div class="pb-good">"Perfect timing then. Most of the best conversations I have are at the exploration stage \u2014 before people have locked into a direction. What\'s prompting the exploration?"</div><p>Reframes exploration as opportunity.</p></div><div class="pb-scenario"><div class="pb-scenario-title">"Just send me information"</div><div class="pb-good">"I can do that. Help me understand what you\'re specifically trying to figure out \u2014 that way I can send you exactly what\'s relevant instead of a generic deck."</div><p>Keeps the conversation going.</p></div>' }
      ]},
      { id: 'triple-play', title: 'The Triple (Maniac Method)', icon: 'zap', desc: 'Call + Voicemail + Email in under 90 seconds. Be impossible to ignore.', cards: [
        { title: 'The Triple Sequence', source: 'Maniac Method + Day 11', html: '<div class="pb-principle">One touch is easy to miss. Three touches across three channels in 48 hours creates pattern interruption.</div><div class="pb-label">The Triple = 90 seconds</div><ol class="pb-list" style="list-style:decimal;padding-left:1.5rem;"><li style="padding-left:0.5rem;"><strong>Phone call</strong> (with voicemail if no answer)</li><li style="padding-left:0.5rem;"><strong>Email</strong> (Maniac Method Spear \u2014 sent within 5 min of call)</li><li style="padding-left:0.5rem;"><strong>LinkedIn</strong> (blank connection request same day, DM after connecting)</li></ol><div class="pb-label">Cluster Cadence (3 clusters, 11 days)</div><table class="pb-timing-table"><thead><tr><th>Day</th><th>Action</th></tr></thead><tbody><tr><td>Day 1</td><td><strong>Triple</strong>: Call + VM + Email Spear 1 (pain narrative) + Blank LI connect</td></tr><tr><td>Day 2</td><td>Reply bump ("Thoughts?") + LI DM if connected</td></tr><tr><td>Day 3</td><td>Reply bump (visual/Venn) + Ghost call (no VM)</td></tr><tr><td>Day 5</td><td><strong>Triple</strong>: Call + VM + Email Spear 2 (case study) + LI touch</td></tr><tr><td>Day 6</td><td>Reply bump</td></tr><tr><td>Day 7</td><td>Reply bump + Ghost call</td></tr><tr><td>Day 9</td><td><strong>Triple</strong>: Call + VM + Email Spear 3 (competitive landscape)</td></tr><tr><td>Day 10</td><td>Reply bump + Final breakup email</td></tr><tr><td>Day 11</td><td>Reply bump + Ghost call</td></tr></tbody></table><div class="pb-label">Reply Bump Examples</div><div class="pb-script">Thoughts?</div><div class="pb-script">^</div><div class="pb-script">Did a crocodile eat you?</div><div class="pb-label">Signal-Based Triggers</div><ul class="pb-list"><li>Profile view \u2192 Triple immediately</li><li>3+ email opens \u2192 Triple immediately</li><li>Social post interaction \u2192 Triple immediately</li></ul>' },
        { title: 'Email Spear Format (Under 50 Words)', source: 'Maniac Method', html: '<div class="pb-principle">Hyper-short. No pleasantries. Pain \u2192 Proof \u2192 CTA. Every email stands alone.</div><div class="pb-label">Structure</div><div class="pb-script">{{First Name}},<br><br>{Pain or trigger event}. {Social proof with similar client}.<br><br>Relevant?<br><br>{{Your First Name}}</div><div class="pb-label">Subject lines (1-3 words)</div><ul class="pb-list"><li>video risk</li><li>eCDN</li><li>compliance gap</li><li>{company} + video</li><li>video delivery</li></ul><div class="pb-label">Checklist before sending</div><ul class="pb-list"><li>Is it painfully short? (under 50 words)</li><li>Is it assertive? (no deference)</li><li>Does it highlight a pain or fear?</li><li>Can it stand alone? (fractal approach)</li><li>Did you spend under 60 seconds on personalization?</li></ul>' }
      ]},
      { id: 'conversation-vs-demo', title: 'Conversation vs. Demo', icon: 'message-circle', desc: 'Why booking a demo is the wrong goal \u2014 and what to do instead.', cards: [
        { title: 'The Demo Trap', source: 'Day 11 \u2014 Module 11.5', html: '<div class="pb-principle">Book a demo and you\'ve scheduled an event. Start a conversation and you\'ve started a relationship.</div><p>A demo is one-directional. Demos are easy to cancel, reschedule, and ghost. A conversation is two-directional. You learn something. They learn something.</p><div class="pb-label">When someone requests a demo</div><div class="pb-script">"Before I get you set up with a demo, I want to make sure we\'re showing you the right things. Can I ask you two quick questions?"<br><br>1. "What\'s the main thing you\'re trying to solve right now?"<br>2. "Who else on your team is involved in this decision?"</div><div class="pb-label">Conversation Scorecard (after every interaction)</div><ul class="pb-list"><li>Responded within 5 minutes?</li><li>Asked what prompted their inquiry?</li><li>Identified who else is involved?</li><li>Avoided sending a generic deck or Calendly link?</li><li>Expanded the pod by at least 3 new contacts?</li></ul><p><strong>Target: 5/5. Below 4/5 = review with your manager.</strong></p>' }
      ]},
      { id: 'execution', title: 'Daily Execution', icon: 'target', desc: 'Activity targets, time blocks, and energy management for peak performance.', cards: [
        { title: 'Activity Targets', source: 'Day 3 \u2014 Module 3', html: '<div class="pb-contrast"><div class="pb-scenario"><div class="pb-scenario-title">Minimum</div><ul class="pb-list"><li>20 cold calls</li><li>20 emails</li><li>10 LinkedIn messages</li><li>2 videos</li></ul></div><div class="pb-scenario"><div class="pb-scenario-title">Stretch</div><ul class="pb-list"><li>50 calls</li><li>50 emails</li><li>20 LinkedIn</li><li>5 videos</li></ul></div></div><div class="pb-principle">Success = hitting activity numbers. Responses are bonus.</div>' },
        { title: 'Time Blocking & Energy', source: 'Day 3 \u2014 Module 3', html: '<div class="pb-label">Block Structure</div><div class="pb-scenario"><div class="pb-scenario-title">Cold Calling Block (60-90 min)</div><p>3-5 min per call. Break every 10 calls. Start here \u2014 highest energy.</p></div><div class="pb-scenario"><div class="pb-scenario-title">Email Block (60 min)</div><p>2-3 min per email. 20 emails = 40-60 min. Medium energy.</p></div><div class="pb-scenario"><div class="pb-scenario-title">LinkedIn Block (45 min)</div><p>4-5 min per prospect. 10 messages = 40-50 min. Lowest energy.</p></div><div class="pb-label">End-of-Day Checklist</div><ul class="pb-list"><li>Hit minimum targets</li><li>Logged all activities</li><li>Updated tracking</li><li>Scheduled follow-ups</li></ul>' }
      ]}
    ];

    var html = '<div class="playbook-container cascade-in">';
    sections.forEach(function(section) {
      html += '<div class="playbook-section">';
      html += '<div class="playbook-section-header">';
      html += '<div class="playbook-section-icon">' + (ICONS[section.icon] || ICONS.target) + '</div>';
      html += '<div class="playbook-section-info"><h2>' + section.title + '</h2><p>' + section.desc + '</p></div>';
      html += '</div>';
      section.cards.forEach(function(card) {
        html += '<div class="playbook-card">';
        html += '<div class="playbook-card-header" onclick="this.parentElement.classList.toggle(\'open\')">';
        html += '<div class="playbook-card-title-group">';
        html += '<div class="playbook-card-title">' + card.title + '</div>';
        html += '<span class="playbook-card-source">' + card.source + '</span>';
        html += '</div>';
        html += chevronSvg;
        html += '</div>';
        html += '<div class="playbook-card-body"><div class="playbook-card-body-inner"><div class="playbook-card-content">' + card.html + '</div></div></div>';
        html += '</div>';
      });
      html += '</div>';
    });
    html += '</div>';
    container.innerHTML = html;
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
