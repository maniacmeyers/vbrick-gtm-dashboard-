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
    var outreach = finding.outreach_angle || "";
    var findingType = finding.finding_type || "";
    var industry = finding.industry || "";
    var competitor = finding.competitor || "";
    var date = finding.date || "";

    var painShort = extractPain(pain, findingType, competitor, company);
    var proofPoint = extractProof(whyVbrick);
    var personaTitle = mapPersonaToTitle(persona);
    var companyRef = company === "Multiple" || company === "Unknown" ? "your organization" : company;
    var isMultiCompany = company === "Multiple" || company === "Unknown";

    var email = generateEmail(companyRef, personaTitle, painShort, proofPoint, isMultiCompany, finding);
    var linkedin = generateLinkedIn(companyRef, personaTitle, painShort, proofPoint, isMultiCompany, finding);
    var coldcall = generateColdCall(companyRef, personaTitle, painShort, proofPoint, persona, finding);
    var voicemail = generateVoicemail(companyRef, personaTitle, painShort, proofPoint, finding);

    return { email: email, linkedin: linkedin, coldcall: coldcall, voicemail: voicemail };
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

  function mapPersonaToTitle(persona) {
    var map = {
      "IT/Infrastructure": "IT leadership",
      "Corporate Communications": "communications leadership",
      "CISO/Security": "security leadership",
      "Compliance Officer": "compliance team",
      "Procurement": "procurement",
      "Digital Transformation": "digital transformation leadership",
      "HR/People Ops": "HR and People Ops team",
      "Network Engineering": "network engineering team",
      "VP IT": "IT leadership",
      "Head of Corporate Communications": "communications leadership"
    };
    return map[persona] || persona.toLowerCase();
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

  function generateEmail(company, personaTitle, pain, proof, isMulti, finding) {
    var domain = getDomainWord(finding);
    var subject = generateSubject(finding);
    var cta = "Worth a conversation?";

    var painLine = buildPainLine(company, pain, finding, isMulti);
    var proofLine = buildProofLine(proof, finding);

    return {
      subject: subject,
      body: "Hey {{First Name}},\n\n" + painLine + "\n" + proofLine + "\n" + cta + "\n\n{{Your First Name}}"
    };
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

  function buildPainLine(company, pain, finding, isMulti) {
    var type = finding.finding_type || "";
    var competitor = finding.competitor || "";

    if (type.includes("Migration") && competitor) {
      return isMulti
        ? "Organizations on " + competitor + " are facing real platform risk right now — " + pain.toLowerCase() + "."
        : company + "'s reliance on " + competitor + " is a growing risk — " + pain.toLowerCase() + ".";
    }
    if (type.includes("Churn") && competitor) {
      return competitor + "'s instability is creating real continuity risk for enterprise customers — " + pain.toLowerCase() + ".";
    }
    if (type.includes("RTO")) {
      return isMulti
        ? "With return-to-office mandates scaling up, " + pain.toLowerCase() + "."
        : company + "'s RTO mandate means thousands of employees need reliable video for town halls, training, and all-hands — fast.";
    }
    if (type.includes("Compliance") || type.includes("Regulatory")) {
      return pain.charAt(0).toUpperCase() + pain.slice(1) + ".";
    }
    if (type.includes("Security")) {
      return pain.charAt(0).toUpperCase() + pain.slice(1) + ".";
    }
    if (type.includes("Leadership")) {
      return company + "'s new " + (finding.target_persona || "IT") + " leadership likely means a fresh look at vendor stack — including video infrastructure.";
    }
    if (type.includes("M&A")) {
      return pain.charAt(0).toUpperCase() + pain.slice(1) + ".";
    }
    return pain.charAt(0).toUpperCase() + pain.slice(1) + ".";
  }

  function buildProofLine(proof, finding) {
    return proof + ".";
  }

  function generateLinkedIn(company, personaTitle, pain, proof, isMulti, finding) {
    var type = finding.finding_type || "";
    var competitor = finding.competitor || "";
    var domain = getDomainWord(finding);

    var opener = "";
    if (type.includes("Migration") || type.includes("Churn")) {
      opener = "Noticed " + (competitor || "your video vendor") + " is going through major changes. Curious how your team is thinking about " + domain + " continuity.";
    } else if (type.includes("RTO")) {
      opener = isMulti
        ? "RTO mandates are putting real pressure on internal video infrastructure. Curious if that's hitting your radar."
        : "Saw " + company + "'s RTO announcement. Scaling video for distributed town halls and training is a challenge we've solved for similar orgs.";
    } else if (type.includes("Compliance") || type.includes("Regulatory")) {
      opener = "New " + domain + " requirements are creating real urgency around video platform certification. Worth a quick exchange?";
    } else if (type.includes("Leadership")) {
      opener = "Congrats on the new role. When you're evaluating the video stack, happy to share what's working at similar-scale orgs.";
    } else if (type.includes("Security")) {
      opener = (competitor || "Your current video platform") + "'s security posture is a growing concern for regulated enterprises. Quick question on how you're handling it.";
    } else {
      opener = "Your " + domain + " is likely under review given recent changes. Happy to share what similar orgs are doing.";
    }

    return opener;
  }

  function generateColdCall(company, personaTitle, pain, proof, persona, finding) {
    var domain = getDomainWord(finding);
    var type = finding.finding_type || "";
    var competitor = finding.competitor || "";
    var isMulti = company === "your organization";

    var routeQ = "Who's in charge of " + domain + " at " + (isMulti ? "your organization" : company) + "?";

    var ruinQ = "";
    if (type.includes("Migration") || type.includes("Churn")) {
      ruinQ = "How are you handling the transition given " + (competitor || "your vendor") + "'s recent changes?";
    } else if (type.includes("RTO")) {
      ruinQ = "With the return-to-office push, how are you scaling internal video for town halls and all-hands across locations?";
    } else if (type.includes("Compliance") || type.includes("Regulatory")) {
      ruinQ = "How are you handling the new " + domain + " requirements for your video platform?";
    } else if (type.includes("Security")) {
      ruinQ = "Given the recent security concerns, how confident is your team in your current video platform's security posture?";
    } else if (type.includes("Leadership")) {
      ruinQ = "As you're evaluating the current stack, what's your biggest concern with the video infrastructure?";
    } else if (type.includes("Integration")) {
      ruinQ = "How are you handling video delivery across your network — especially for large-scale broadcasts?";
    } else {
      ruinQ = "How are you handling " + domain + " right now?";
    }

    var multiplyLine = "Got it — why not plug VBRICK in alongside what you have now to multiply its effectiveness? We handle the eCDN, compliance, and analytics layer so your team doesn't have to rebuild.";

    return {
      route: routeQ,
      ruin: ruinQ,
      multiply: multiplyLine
    };
  }

  function generateVoicemail(company, personaTitle, pain, proof, finding) {
    var type = finding.finding_type || "";
    var competitor = finding.competitor || "";
    var isMulti = company === "your organization";

    var relevance = "";
    if (type.includes("Migration") || type.includes("Churn")) {
      relevance = "I wanted to reach out because " + (competitor || "your video vendor") + "'s recent changes are creating real risk for enterprise customers";
    } else if (type.includes("RTO")) {
      relevance = "I'm calling because " + (isMulti ? "organizations scaling RTO" : company + "'s RTO mandate") + " creates a real need for enterprise-grade video infrastructure";
    } else if (type.includes("Compliance") || type.includes("Regulatory")) {
      relevance = "I'm calling because new compliance requirements are creating urgency around video platform certification";
    } else if (type.includes("Security")) {
      relevance = "I'm calling because recent security incidents in the video space are putting enterprise platforms under scrutiny";
    } else if (type.includes("Leadership")) {
      relevance = "I noticed the leadership change and wanted to share something relevant to the video infrastructure evaluation";
    } else {
      relevance = "I'm calling about something directly relevant to your enterprise video strategy";
    }

    var proofShort = "We've helped organizations like yours achieve FedRAMP-authorized, compliant video delivery with real-time analytics";

    return "Hey {{First Name}}, {{Your Name}} from VBRICK — {{your number, spoken slowly}}.\n\n" +
      relevance + ".\n\n" +
      proofShort + ".\n\n" +
      "Again, {{Your Name}} from VBRICK — {{your number, spoken slowly}}. I'll follow up with a quick note.";
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
    html += '<button class="outreach-tab" data-tab="linkedin">LinkedIn DM</button>';
    html += '<button class="outreach-tab" data-tab="coldcall">Cold Call</button>';
    html += '<button class="outreach-tab" data-tab="voicemail">Voicemail</button>';
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
    html += '<div style="position:relative">';
    html += '<button class="copy-btn" data-copy="linkedin">Copy</button>';
    html += '<div class="outreach-script" data-copy-target="linkedin">' + escapeHtml(outreach.linkedin).replace(/\n/g, '<br>') + '</div>';
    html += '</div></div>';

    // Cold Call panel
    html += '<div class="outreach-panel" data-panel="coldcall">';
    html += '<div style="position:relative">';
    html += '<button class="copy-btn" data-copy="coldcall">Copy</button>';
    html += '<div class="outreach-script" data-copy-target="coldcall">';
    html += '<div class="cold-call-section"><div class="cold-call-label route">ROUTE</div>';
    html += escapeHtml('"' + outreach.coldcall.route + '"') + '</div>';
    html += '<div class="cold-call-section"><div class="cold-call-label ruin">RUIN</div>';
    html += escapeHtml('"' + outreach.coldcall.ruin + '"') + '</div>';
    html += '<div class="cold-call-section"><div class="cold-call-label multiply">MULTIPLY</div>';
    html += escapeHtml('"' + outreach.coldcall.multiply + '"') + '</div>';
    html += '</div></div></div>';

    // Voicemail panel
    html += '<div class="outreach-panel" data-panel="voicemail">';
    html += '<div style="position:relative">';
    html += '<button class="copy-btn" data-copy="voicemail">Copy</button>';
    html += '<div class="outreach-script" data-copy-target="voicemail">' + escapeHtml(outreach.voicemail).replace(/\n/g, '<br>') + '</div>';
    html += '</div></div>';

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
