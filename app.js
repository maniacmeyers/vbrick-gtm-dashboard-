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

  // ---- Cadence summary (loaded async from cadence-summary.json) ----
  var CADENCE = { byId: {}, counts: { fresh: 0, due: 0 }, loaded: false };
  fetch('./cadence-summary.json', { cache: 'no-store' })
    .then(function(r) { return r.ok ? r.json() : null; })
    .then(function(data) {
      if (!data) return;
      CADENCE.counts = data.counts || {};
      (data.by_finding || []).forEach(function(f) { CADENCE.byId[f.id] = f; });
      CADENCE.loaded = true;
      var pill = document.getElementById('cadencePill');
      if (pill) {
        var fresh = CADENCE.counts.fresh || 0;
        var due = CADENCE.counts.due || 0;
        var total = fresh + due;
        var savedPct = total ? Math.round(fresh / total * 100) : 0;
        pill.textContent = 'Cadence: ' + fresh + ' fresh · ' + due + ' due  (skip ' + savedPct + '%)';
        pill.style.display = '';
      }
      if (typeof renderFindings === 'function') renderFindings();
    })
    .catch(function() {});

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
    account_plans: "Account Plans",
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

    var plansEl = document.getElementById('plansContainer');

    if (currentView === 'playbook') {
      if (filtersBar) filtersBar.style.display = 'none';
      if (kpiGrid) kpiGrid.style.display = 'none';
      if (tableContainer) tableContainer.style.display = 'none';
      if (plansEl) plansEl.style.display = 'none';
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

    if (currentView === 'account_plans') {
      if (filtersBar) filtersBar.style.display = 'none';
      if (kpiGrid) kpiGrid.style.display = 'none';
      if (tableContainer) tableContainer.style.display = 'none';
      if (playbookEl) playbookEl.style.display = 'none';
      if (!plansEl) {
        plansEl = document.createElement('div');
        plansEl.id = 'plansContainer';
        document.getElementById('mainContent').appendChild(plansEl);
      }
      plansEl.style.display = 'block';
      renderAccountPlans(plansEl);
      return;
    }

    // Normal view: show standard elements, hide playbook/plans
    if (filtersBar) filtersBar.style.display = '';
    if (kpiGrid) kpiGrid.style.display = '';
    if (tableContainer) tableContainer.style.display = '';
    if (playbookEl) playbookEl.style.display = 'none';
    if (plansEl) plansEl.style.display = 'none';

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

  // Normalize finding_type to a canonical category for matching
  // Handles snake_case, verbose, and mixed formats from different research agents
  function classifyType(finding) {
    var t = (finding.finding_type || '').toLowerCase();
    var cat = (finding.category || '').toLowerCase();
    var sum = (finding.summary || '').toLowerCase();
    var comp = (finding.competitor || '').toLowerCase();

    // Competitor displacement / migration / churn / acquisition layoffs
    if (t.match(/migrat|churn|retir|deprecat|discontinu|displacement|layoff|acqui|workforce.?reduc|mass.?lay|engineering.?elim|sunset/)
        || cat.includes('competitor') || comp) return 'competitor_displacement';
    // RTO / return to office
    if (t.match(/rto|return.?to.?office|return_to_office|hybrid|mandate/) || sum.includes('return-to-office') || sum.includes('rto')) return 'rto';
    // Compliance / regulatory
    if (t.match(/regulat|complian|enforce|fedramp|finra|hipaa|gdpr|section.?508|ada|cmmc|ccpa|privacy|audit|archiv/)
        || cat.includes('compliance') || cat.includes('regulatory')) return 'compliance';
    // Security
    if (t.match(/security|breach|vulnerability|fips|soc.?ii|drm|encryption/) && !t.match(/complian/)) return 'security';
    // Leadership change
    if (t.match(/leader|cio|cto|cdo|new.?role|executive|appoint/) || t === 'leadership_change') return 'leadership';
    // M&A
    if (t.match(/m&a|merger|acqui|consolid/) || t === 'ma_consolidation') return 'ma';
    // Workforce restructuring
    if (t.match(/workforce|restructur|layoff|reduction.?in.?force/) || t === 'workforce_restructuring') return 'workforce';
    // Job postings
    if (t.match(/job.?post|hiring|recruit|open.?role/) || t === 'job_posting') return 'job_posting';
    // Digital transformation / tech investment / AI
    if (t.match(/digital|transform|moderniz|ai.?video|ai_video|tech.?stack|tech.?invest|technology/)
        || t === 'digital_transformation' || t === 'ai_video_initiative' || t === 'technology_investment'
        || t === 'tech_stack_change') return 'digital_transformation';
    // Internal comms / events
    if (t.match(/internal.?comm|comms|event|broadcast|town.?hall|all.?hands/) || t === 'internal_comms_investment'
        || t === 'large_event_technology') return 'internal_comms';
    // Federal / government contracts
    if (t.match(/federal|government|contract|procurement|rfp|fedramp/) || t === 'federal_contract') return 'federal_contract';
    // eCDN / scale / architecture
    if (t.match(/ecdn|scale|architect|bandwidth|network|streaming|delivery/)) return 'ecdn_scale';
    // Pricing
    if (t.match(/pric|cost|licens|upgrade/)) return 'pricing';
    // Outage
    if (t.match(/outage|incident|downtime|disruption/)) return 'outage';
    return 'general';
  }

  function getDomainWord(finding) {
    var cls = classifyType(finding);
    var map = {
      compliance: 'compliance', security: 'video security strategy',
      competitor_displacement: 'video platform strategy', rto: 'internal communications strategy',
      job_posting: 'enterprise video strategy', ecdn_scale: 'video delivery strategy',
      digital_transformation: 'video modernization', federal_contract: 'video infrastructure',
      ma: 'video infrastructure', leadership: 'enterprise video strategy',
      internal_comms: 'internal communications', workforce: 'enterprise communications',
      pricing: 'video platform strategy', outage: 'video reliability'
    };
    return map[cls] || 'enterprise video strategy';
  }

  // Build a natural trigger phrase from the finding for use in scripts
  function buildTriggerPhrase(finding, company, isMulti) {
    var cls = classifyType(finding);
    var competitor = finding.competitor || '';
    switch (cls) {
      case 'competitor_displacement':
        return competitor ? competitor + "'s recent changes" : "your video vendor's recent shake-up";
      case 'rto':
        return isMulti ? 'the return-to-office push' : company + "'s return-to-office mandate";
      case 'compliance':
        return 'the upcoming compliance deadlines affecting video';
      case 'security':
        return 'the recent security concerns in enterprise video';
      case 'leadership':
        return 'the recent leadership change at ' + company;
      case 'ma':
        return 'the merger integration at ' + company;
      case 'workforce':
        return 'the workforce restructuring at ' + company;
      case 'digital_transformation':
        return company + "'s digital transformation initiative";
      case 'ecdn_scale':
        return 'the video delivery challenges at scale';
      case 'job_posting':
        return company + "'s video infrastructure build-out";
      case 'federal_contract':
        return 'the federal video modernization requirements';
      case 'internal_comms':
        return company + "'s internal communications overhaul";
      case 'pricing':
        return 'the recent pricing changes in enterprise video';
      case 'outage':
        return 'the recent video platform outages';
      default:
        // Use the summary's first sentence as a natural trigger
        var sum = (finding.summary || '').split('.')[0];
        return sum.length > 10 && sum.length < 80 ? sum.toLowerCase() : company + "'s video infrastructure challenges";
    }
  }

  function generateSubject(finding) {
    var company = finding.company || '';
    var cls = classifyType(finding);
    var subjectMap = {
      competitor_displacement: 'video risk',
      rto: company !== 'Multiple' && company !== 'Unknown' ? company.toLowerCase().split(' ')[0] + ' + video' : 'rto + video',
      compliance: 'compliance gap',
      security: 'video security',
      leadership: 'new direction',
      ma: 'integration challenge',
      workforce: 'comms challenge',
      job_posting: 'video platform',
      digital_transformation: 'video modernization',
      ecdn_scale: 'video delivery',
      federal_contract: 'video compliance',
      internal_comms: 'internal video',
      pricing: 'video costs',
      outage: 'video reliability'
    };
    return subjectMap[cls] || 'enterprise video';
  }

  // --- EMAIL: Maniac Method Spear — under 50 words, no pleasantries, conversational ---
  function generateEmail(company, pain, proof, isMulti, finding, trigger) {
    var subject = generateSubject(finding);
    var cls = classifyType(finding);
    var competitor = finding.competitor || '';

    var body = '{{First Name}},\n\n';
    switch (cls) {
      case 'competitor_displacement':
        if (competitor) {
          body += competitor + ' is in trouble. When your video vendor implodes mid-town-hall, it\'s your problem. We kept similar orgs live through theirs.';
        } else {
          body += trigger + '. ' + company + '\'s video stack is exposed. We kept orgs like yours live when their vendor cratered.';
        }
        break;
      case 'rto':
        body += (isMulti ? 'RTO mandates' : company + ' RTO') + '. 10K people, one all-hands, network melts. We prevent that with eCDN.';
        break;
      case 'compliance':
        body += 'New compliance deadlines hit video archiving. Most orgs aren\'t ready. We got similar companies audit-proof in 6 weeks.';
        break;
      case 'security':
        body += trigger + '. Most enterprise video platforms have security gaps your CISO doesn\'t know about yet. We close them.';
        break;
      case 'leadership':
        body += 'New role, inherited video stack. The gaps show up fast when the CEO town hall crashes. We fix that.';
        break;
      case 'ma':
        body += 'Two orgs merge, two video platforms collide. It breaks. We\'ve unified video infrastructure through 3 major integrations this year.';
        break;
      case 'workforce':
        body += 'Major restructuring = mass communications to tens of thousands. Most video platforms buckle. Ours doesn\'t.';
        break;
      case 'job_posting':
        body += 'Saw ' + company + ' is building out ' + getDomainWord(finding) + '. We do this for F500s with eCDN, FedRAMP, real-time analytics.';
        break;
      case 'digital_transformation':
        body += company + ' is modernizing. Video infrastructure is the piece most orgs get wrong. We\'ve helped similar companies get it right the first time.';
        break;
      case 'federal_contract':
        body += 'Federal video requirements are tightening. FedRAMP + FIPS 140-2 + Section 508 are table stakes now. We check every box.';
        break;
      case 'internal_comms':
        body += 'Scaling internal video across ' + company + ' without crushing the network is the hard part. That\'s exactly what our eCDN solves.';
        break;
      case 'ecdn_scale':
        body += 'Video at scale breaks networks. ' + company + ' is big enough for that to matter. We prevent it with eCDN for orgs your size.';
        break;
      case 'pricing':
        body += 'Video platform costs are spiking across the industry. We\'re hearing from orgs re-evaluating right now. Worth comparing?';
        break;
      case 'outage':
        body += 'Video outages during leadership broadcasts are career-ending. We built the platform so that doesn\'t happen.';
        break;
      default:
        // Use the finding summary to create a specific message
        var shortSum = (finding.summary || '').split('.')[0];
        if (shortSum.length > 15 && shortSum.length < 70) {
          body += shortSum + '. This directly impacts your video infrastructure. We handle this for similar orgs.';
        } else {
          body += company + '\'s video infrastructure is at a decision point. We work with similar orgs on exactly this. Worth comparing notes?';
        }
    }
    body += '\n\nRelevant?\n\n{{Your First Name}}';

    return { subject: subject, body: body };
  }

  // --- LINKEDIN DM: after blank connection request, under 40 words, no pitch ---
  function generateLinkedInDM(company, pain, proof, isMulti, finding, trigger) {
    var cls = classifyType(finding);
    var competitor = finding.competitor || '';

    switch (cls) {
      case 'competitor_displacement':
        return '{{First Name}} -- ' + (competitor ? competitor + ' is making waves' : trigger) + '. Seeing a pattern with orgs dealing with this. Curious if it\'s on your radar too.';
      case 'rto':
        return isMulti
          ? '{{First Name}} -- RTO is exposing video infrastructure gaps everywhere. Figured you might be in the thick of it.'
          : '{{First Name}} -- saw ' + company + '\'s RTO news. Scaling video for all-hands at that size is brutal. Worth comparing notes?';
      case 'compliance':
        return '{{First Name}} -- new compliance deadlines are catching video teams off guard. Thought this might be relevant to what you\'re working on.';
      case 'security':
        return '{{First Name}} -- ' + trigger + '. Most enterprise video has security gaps nobody\'s looking at. Worth a quick exchange?';
      case 'leadership':
        return '{{First Name}} -- saw the move. When you start poking at the video stack, I think there\'s something worth discussing.';
      case 'ma':
        return '{{First Name}} -- mergers always expose video infrastructure gaps. Curious how ' + company + ' is handling the consolidation.';
      case 'workforce':
        return '{{First Name}} -- restructuring creates massive internal comms challenges. Video at that scale is the hard part. Figured this might resonate.';
      case 'job_posting':
        return '{{First Name}} -- saw ' + company + ' is building out the video team. We work with similar orgs on exactly this. Worth connecting?';
      case 'digital_transformation':
        return '{{First Name}} -- ' + company + '\'s modernization effort caught my eye. Video infrastructure is usually the piece that gets overlooked. Worth comparing notes?';
      case 'federal_contract':
        return '{{First Name}} -- federal video requirements are tightening. FedRAMP + FIPS are now table stakes. Thought this might be relevant.';
      case 'internal_comms':
        return '{{First Name}} -- scaling internal video without crushing the network is the challenge I keep hearing about. Figured it might resonate with what you\'re working on.';
      default:
        return '{{First Name}} -- ' + trigger + '. Thought it might connect to what you\'re working on. Open to comparing notes?';
    }
  }

  // --- COLD CALL: Maniac Method — name-pause, pattern interrupt, eCDN question, silence ---
  function generateColdCall(company, pain, proof, persona, finding, trigger, domain) {
    var isMulti = company === "your organization";
    var companyPossessive = isMulti ? "your organization's" : company + "'s";

    // Step 1: Opener (inquisitive tone, first + last name, pause)
    var opener = '{{First Name}} {{Last Name}}?\n[PAUSE — everyone loves hearing their name. Wait for them to confirm or deny.]';

    // Step 2: Introduce yourself, then eCDN question + SILENCE
    var execRoute = 'Great, this is {{Your First Name}} calling with VBRICK. I\'m hoping you can help me out real quick — are you on the team responsible for ' + companyPossessive + ' eCDN strategy?\n[SILENCE — let them respond]';

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
      coldcall: '{{First Name}} {{Last Name}}?\n[PAUSE]\nGreat, this is {{Your First Name}} calling with VBRICK. I\'m hoping you can help me out real quick — are you on the team responsible for ' + companyPoss + ' eCDN strategy?\n[SILENCE]\n[If YES:] Why?\n[Let them talk, then:] "That makes sense — ' + trigger + '. We\'ve been working with similar orgs on exactly that."'
    });

    // Director (Influencer)
    messages.push({
      role: 'Director (Influencer)',
      email: '{{First Name}},\n\n' + trigger + '. Your name came up as the person closest to the video infrastructure decisions at ' + company + '. We\'re seeing patterns here worth discussing.\n\nOpen to it?\n\n{{Your First Name}}',
      coldcall: '{{First Name}} {{Last Name}}?\n[PAUSE]\nGreat, this is {{Your First Name}} calling with VBRICK. I\'m hoping you can help me out real quick — are you involved in ' + companyPoss + ' video infrastructure decisions?\n[SILENCE]\n[If YES:] Why?\n[Let them talk, then tie in ' + trigger + ']'
    });

    // Manager (Evaluator)
    messages.push({
      role: 'Manager (Evaluator)',
      email: '{{First Name}},\n\n' + trigger + '. This usually lands on someone in your position to figure out. We\'ve been helping teams navigate it.\n\nWorth comparing notes?\n\n{{Your First Name}}',
      coldcall: '{{First Name}} {{Last Name}}?\n[PAUSE]\nGreat, this is {{Your First Name}} calling with VBRICK. I\'m hoping you can help me out real quick — are you on the team evaluating ' + companyPoss + ' video platform?\n[SILENCE]\n[If YES:] Why?\n[Let them talk, then tie in ' + trigger + ']'
    });

    // Sr. Engineer / Architect (Technical Evaluator)
    messages.push({
      role: 'Sr. Engineer / Architect (Technical Evaluator)',
      email: '{{First Name}},\n\n' + trigger + '. Direct impact on ' + domain + '. We work on the eCDN and video delivery architecture side — think there\'s overlap.\n\nWorth a quick exchange?\n\n{{Your First Name}}',
      coldcall: '{{First Name}} {{Last Name}}?\n[PAUSE]\nGreat, this is {{Your First Name}} calling with VBRICK. I\'m hoping you can help me out real quick — are you working on ' + companyPoss + ' video delivery architecture?\n[SILENCE]\n[If YES:] Why?\n[Let them talk, then tie in ' + trigger + ']'
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

    // Cadence info block (when finding is monitored)
    var cad = CADENCE.byId[finding.id];
    if (cad) {
      var bClass = cad.status === 'fresh' ? 'cadence-badge--fresh' : 'cadence-badge--due';
      var bLabel = cad.status === 'fresh' ? 'fresh · will skip' : 'due · will research';
      var nextEligible = '—';
      if (cad.next_eligible) {
        var d = new Date(cad.next_eligible);
        if (!isNaN(d)) nextEligible = d.toLocaleDateString();
      }
      html += '<div class="cadence-info-block">';
      html += '<div class="cadence-info-row"><span>Signal type</span><strong>' + escapeHtml(cad.signal_type) + '</strong></div>';
      html += '<div class="cadence-info-row"><span>Cadence</span><strong>' + escapeHtml(cad.cadence) + '</strong></div>';
      html += '<div class="cadence-info-row"><span>Status</span><span class="cadence-badge ' + bClass + '">' + bLabel + '</span></div>';
      html += '<div class="cadence-info-row"><span>Next eligible</span><strong>' + escapeHtml(nextEligible) + '</strong></div>';
      html += '<div class="cadence-info-row"><span>Reason</span><span>' + escapeHtml(cad.reason || '') + '</span></div>';
      html += '</div>';
    }

    // Outreach Angle (only show if populated)
    if (finding.outreach_angle && finding.outreach_angle.trim()) {
      html += '<div class="modal-section">';
      html += '<div class="modal-section-title">Suggested Outreach Angle</div>';
      html += '<div class="modal-outreach">' + escapeHtml(finding.outreach_angle) + '</div>';
      html += '</div>';
    }

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
        html += '<div class="stakeholder-card">';
        html += '<div class="stakeholder-name">' + escapeHtml(s.name || "") + '</div>';
        html += '<div class="stakeholder-title">' + escapeHtml(s.title || "") + '</div>';
        if (s.linkedin && s.linkedin.includes('linkedin.com')) {
          html += '<a href="' + escapeHtml(s.linkedin) + '" target="_blank" rel="noopener" class="stakeholder-linkedin">LinkedIn Profile \u2192</a>';
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

    // Conversation feedback bar
    var fbState = _feedbackState[finding.id] || null;
    html += '<div class="feedback-bar">';
    html += '<span class="feedback-label">Did this lead to a conversation?</span>';
    html += '<div class="feedback-btns">';
    html += '<button class="feedback-btn' + (fbState === 'yes' ? ' active-yes' : '') + '" data-fb="yes" data-fid="' + finding.id + '">Yes</button>';
    html += '<button class="feedback-btn' + (fbState === 'no' ? ' active-no' : '') + '" data-fb="no" data-fid="' + finding.id + '">No</button>';
    html += '<button class="feedback-btn' + (fbState === 'pending' ? ' active-pending' : '') + '" data-fb="pending" data-fid="' + finding.id + '">Not Yet</button>';
    html += '</div>';
    if (fbState) html += '<span class="feedback-saved">Saved</span>';
    html += '</div>';

    modalContent.innerHTML = html;
    modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden";

    // Wire up feedback buttons
    modalContent.querySelectorAll('.feedback-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var fid = btn.dataset.fid;
        var val = btn.dataset.fb;
        _feedbackState[fid] = val;
        // Update UI
        modalContent.querySelectorAll('.feedback-btn').forEach(function(b) {
          b.classList.remove('active-yes', 'active-no', 'active-pending');
        });
        btn.classList.add('active-' + val);
        var savedEl = modalContent.querySelector('.feedback-saved');
        if (!savedEl) {
          savedEl = document.createElement('span');
          savedEl.className = 'feedback-saved';
          btn.parentElement.parentElement.appendChild(savedEl);
        }
        savedEl.textContent = 'Saved';
        // Log feedback (fire-and-forget to access log)
        if (typeof logAccess === 'function') logAccess('feedback_' + val, fid);
      });
    });

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

  // ---- Run Research Button + Split Menu ----
  var researchBtn = document.getElementById('runResearchBtn');
  var researchCaret = document.getElementById('runResearchCaret');
  var researchMenu = document.getElementById('researchMenu');

  function setResearchRunning() {
    if (!researchBtn) return;
    researchBtn.classList.add('running');
    var span = researchBtn.querySelector('span');
    if (span) span.textContent = 'Running...';
    setTimeout(function() {
      researchBtn.classList.remove('running');
      if (span) span.textContent = 'Run Research';
    }, 600000);
  }

  // Silently queue a research request. POSTs to /.netlify/functions/queue-research
  // (which logs the request and triggers the actual run on the backend).
  // Shows a toast — user never leaves the dashboard, never sees the engine.
  function launchComputerPrompt(promptText) {
    setResearchRunning();
    showResearchToast('Research queued', 'Your request is in the queue. Results typically appear within 5–10 minutes.');
    var payload = {
      prompt: promptText,
      requested_at: new Date().toISOString(),
      requested_by: (typeof getCurrentUserEmail === 'function' ? getCurrentUserEmail() : 'unknown')
    };
    // Best-effort POST. Failure is silent — the request is still tracked client-side
    // via the toast and the running state on the button.
    if (typeof fetch === 'function') {
      fetch('/.netlify/functions/queue-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(function() { /* silent */ });
    }
  }

  // Tiny toast notification (top-right, auto-dismiss)
  function showResearchToast(title, body) {
    var existing = document.getElementById('researchToast');
    if (existing) existing.remove();
    var t = document.createElement('div');
    t.id = 'researchToast';
    t.className = 'research-toast';
    t.innerHTML =
      '<div class="research-toast-icon">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' +
      '</div>' +
      '<div class="research-toast-body">' +
        '<div class="research-toast-title">' + escapeHtml(title) + '</div>' +
        '<div class="research-toast-text">' + escapeHtml(body) + '</div>' +
      '</div>' +
      '<button class="research-toast-close" aria-label="Dismiss">×</button>';
    document.body.appendChild(t);
    requestAnimationFrame(function(){ t.classList.add('open'); });
    var dismiss = function() {
      t.classList.remove('open');
      setTimeout(function() { if (t.parentNode) t.remove(); }, 300);
    };
    t.querySelector('.research-toast-close').addEventListener('click', dismiss);
    setTimeout(dismiss, 6000);
  }

  function runBroadResearch() {
    showConfirm({
      title: 'Run Broad Market Scan',
      body: 'This launches all 4 research agents (Competitor Intelligence, Market Triggers, Compliance & Regulatory, Fortune 500 Accounts) across the full ICP. Typically takes 5-10 minutes.',
      go: 'Run Research',
      onGo: function() {
        launchComputerPrompt('Run VBRICK GTM Intelligence research refresh now using DELTA / cadence-gated mode. Before running each agent: load the cadence ledger via `python3 /home/user/workspace/research-ledger.py skip-list` to get the list of (company, signal_type) pairs whose cadence window has not yet elapsed (10-K annual, earnings quarterly, exec/M&A/funding quarterly, partnerships weekly, press/job-postings daily, etc.). DO NOT re-research any (company, signal_type) pair on the skip list — carry their existing findings forward unchanged. Only research new accounts and (company, signal_type) pairs that are due. After agents complete, run merge-and-normalize.py (which auto-updates the ledger and cadence-summary.json), then deploy and push to GitHub/Netlify.');
      }
    });
  }

  function runSingleAccountResearch() {
    showSingleAccountModal();
  }

  function runCsvBulkResearch() {
    showCsvUploadModal();
  }

  function openAccountPlansView() {
    // Navigate to account plans view
    var navBtn = document.querySelector('.nav-item[data-view="account_plans"]');
    if (navBtn) navBtn.click();
  }

  if (researchBtn) {
    researchBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      runBroadResearch();
    });
  }

  if (researchCaret && researchMenu) {
    researchCaret.addEventListener('click', function(e) {
      e.stopPropagation();
      researchMenu.classList.toggle('open');
    });
    document.addEventListener('click', function(e) {
      if (!researchMenu.contains(e.target) && e.target !== researchCaret) {
        researchMenu.classList.remove('open');
      }
    });
    researchMenu.querySelectorAll('.research-menu-item').forEach(function(item) {
      item.addEventListener('click', function() {
        researchMenu.classList.remove('open');
        var mode = item.dataset.mode;
        if (mode === 'broad') runBroadResearch();
        else if (mode === 'single') runSingleAccountResearch();
        else if (mode === 'csv') runCsvBulkResearch();
        else if (mode === 'plan') openAccountPlansView();
      });
    });
  }

  // Generic confirm modal
  function showConfirm(opts) {
    var overlay = document.createElement('div');
    overlay.className = 'research-confirm-overlay';
    overlay.innerHTML = '<div class="research-confirm-box">' +
      '<h3>' + escapeHtml(opts.title) + '</h3>' +
      '<p>' + escapeHtml(opts.body) + '</p>' +
      '<div class="research-confirm-actions">' +
      '<button class="research-confirm-cancel">Cancel</button>' +
      '<button class="research-confirm-go">' + escapeHtml(opts.go || 'Go') + '</button>' +
      '</div></div>';
    document.body.appendChild(overlay);
    requestAnimationFrame(function(){ overlay.classList.add('open'); });
    function close() {
      overlay.classList.remove('open');
      setTimeout(function(){ overlay.remove(); }, 250);
    }
    overlay.querySelector('.research-confirm-cancel').addEventListener('click', close);
    overlay.addEventListener('click', function(e){ if (e.target === overlay) close(); });
    overlay.querySelector('.research-confirm-go').addEventListener('click', function(){
      close();
      if (typeof opts.onGo === 'function') opts.onGo();
    });
  }

  // Single-account research modal
  function showSingleAccountModal() {
    var overlay = document.createElement('div');
    overlay.className = 'research-input-overlay';
    overlay.innerHTML = '<div class="research-input-box">' +
      '<h3>Research a Single Account</h3>' +
      '<p>Enter a company name. VBRICK GTM Intelligence will run all 4 research agents focused on this specific account and return the same structured output (findings, stakeholders, outreach).</p>' +
      '<label style="display:block;font-size:var(--text-xs);font-weight:600;margin-bottom:6px;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:0.05em;">Account Name</label>' +
      '<input type="text" id="singleAccountInput" class="research-input-field" placeholder="e.g. JPMorgan Chase, Pfizer, Department of Veterans Affairs" autocomplete="off">' +
      '<div class="research-input-hint">Also generates an account plan (overview, stakeholders→challenges, SWOT, VBRICK positioning, point-of-view hypothesis).</div>' +
      '<div class="research-confirm-actions" style="justify-content:flex-end;">' +
        '<button class="research-confirm-cancel">Cancel</button>' +
        '<button class="research-confirm-go" id="singleAccountGo">Run Research</button>' +
      '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    requestAnimationFrame(function(){ overlay.classList.add('open'); });
    var input = document.getElementById('singleAccountInput');
    setTimeout(function(){ input && input.focus(); }, 100);

    function close() {
      overlay.classList.remove('open');
      setTimeout(function(){ overlay.remove(); }, 250);
    }
    overlay.querySelector('.research-confirm-cancel').addEventListener('click', close);
    overlay.addEventListener('click', function(e){ if (e.target === overlay) close(); });
    function submit() {
      var name = (input.value || '').trim();
      if (!name) { input.focus(); return; }
      close();
      var promptText = 'Run VBRICK GTM Intelligence deep-dive research on a single account: "' + name + '". ' +
        'New accounts always get FULL research (no cadence skip applies on first run for an account). ' +
        'Run all 4 research agents (RA-01 Executive/Strategic, RA-02 Technology/Infrastructure, RA-03 Regulatory/Compliance, RA-04 Hiring/Org-Change) scoped to this account only. ' +
        'Apply VBRICK ICP signal detection (157 signal types). Identify verified current stakeholders with LinkedIn URLs. ' +
        'Generate outreach_angle for every finding. Merge into the dashboard data.js with is_new=true. ' +
        'Then generate the Account Plan (overview, stakeholders mapped to business challenges VBRICK solves, SWOT, VBRICK positioning, point-of-view hypothesis). ' +
        'After merge, the cadence ledger auto-records all findings so future cycles will skip-gate them. ' +
        'Deploy and push to GitHub/Netlify.';
      launchComputerPrompt(promptText);
    }
    document.getElementById('singleAccountGo').addEventListener('click', submit);
    input.addEventListener('keydown', function(e){ if (e.key === 'Enter') submit(); });
  }

  // CSV bulk upload modal
  function showCsvUploadModal() {
    var overlay = document.createElement('div');
    overlay.className = 'research-input-overlay';
    overlay.innerHTML = '<div class="research-input-box">' +
      '<h3>Bulk Account Research</h3>' +
      '<p>Upload a CSV with one account per row. The first column is used as the account name (header row auto-detected and skipped). All 4 research agents run across each account in parallel. Same structured output as a single-account run.</p>' +
      '<div class="research-csv-dropzone" id="csvDropzone">' +
        '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>' +
        '<div style="font-weight:600;font-size:var(--text-sm);color:var(--nm-text-heading);">Drop CSV here or click to browse</div>' +
        '<div style="font-size:var(--text-xs);color:var(--color-text-muted);margin-top:4px;">Max 100 accounts per run</div>' +
        '<input type="file" id="csvFileInput" accept=".csv,text/csv" style="display:none;">' +
      '</div>' +
      '<div id="csvPreviewContainer" style="display:none;">' +
        '<label style="display:block;font-size:var(--text-xs);font-weight:600;margin-bottom:6px;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:0.05em;">Accounts detected: <span id="csvCount">0</span></label>' +
        '<div class="research-csv-preview" id="csvPreview"></div>' +
      '</div>' +
      '<div class="research-input-hint">Also generates account plans (overview, stakeholders→challenges, SWOT, positioning) for every account in the file.</div>' +
      '<div class="research-confirm-actions" style="justify-content:flex-end;">' +
        '<button class="research-confirm-cancel">Cancel</button>' +
        '<button class="research-confirm-go" id="csvGo" disabled style="opacity:0.5;">Run Research</button>' +
      '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    requestAnimationFrame(function(){ overlay.classList.add('open'); });

    var dz = document.getElementById('csvDropzone');
    var fileInput = document.getElementById('csvFileInput');
    var goBtn = document.getElementById('csvGo');
    var accounts = [];

    function close() {
      overlay.classList.remove('open');
      setTimeout(function(){ overlay.remove(); }, 250);
    }
    overlay.querySelector('.research-confirm-cancel').addEventListener('click', close);
    overlay.addEventListener('click', function(e){ if (e.target === overlay) close(); });

    dz.addEventListener('click', function(){ fileInput.click(); });
    dz.addEventListener('dragover', function(e){ e.preventDefault(); dz.classList.add('dragover'); });
    dz.addEventListener('dragleave', function(){ dz.classList.remove('dragover'); });
    dz.addEventListener('drop', function(e){
      e.preventDefault();
      dz.classList.remove('dragover');
      if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener('change', function(){
      if (fileInput.files.length) handleFile(fileInput.files[0]);
    });

    function handleFile(file) {
      var reader = new FileReader();
      reader.onload = function(ev) {
        accounts = parseCsvAccounts(ev.target.result);
        if (accounts.length === 0) {
          alert('No accounts found in that file. Make sure the first column contains account names.');
          return;
        }
        if (accounts.length > 100) accounts = accounts.slice(0, 100);
        renderPreview();
      };
      reader.readAsText(file);
    }

    function renderPreview() {
      document.getElementById('csvPreviewContainer').style.display = 'block';
      document.getElementById('csvCount').textContent = accounts.length;
      var prev = document.getElementById('csvPreview');
      prev.innerHTML = accounts.map(function(a){
        return '<div class="research-csv-preview-item">' + escapeHtml(a) + '</div>';
      }).join('');
      goBtn.disabled = false;
      goBtn.style.opacity = '1';
    }

    goBtn.addEventListener('click', function(){
      if (!accounts.length) return;
      close();
      var listStr = accounts.map(function(a){ return '- ' + a; }).join('\n');
      var promptText = 'Run VBRICK GTM Intelligence bulk account research. ' + accounts.length + ' accounts to research in parallel:\n\n' + listStr + '\n\n' +
        'For each account: this is a NEW account run, so all 4 agents do FULL research (cadence skip only applies on subsequent runs). ' +
        'Run all 4 research agents (RA-01, RA-02, RA-03, RA-04) scoped to that account. ' +
        'Apply VBRICK ICP signal detection (157 signal types). Identify verified current stakeholders with LinkedIn URLs. ' +
        'Generate outreach_angle for every finding. Merge all findings into data.js with is_new=true. ' +
        'For every account, also generate an Account Plan (overview, stakeholders mapped to business challenges, SWOT, VBRICK positioning, point-of-view hypothesis). ' +
        'After merge, the cadence ledger auto-records all findings so future cycles will skip-gate them. ' +
        'Deploy and push to GitHub/Netlify.';
      launchComputerPrompt(promptText);
    });
  }

  function parseCsvAccounts(text) {
    var lines = text.split(/\r?\n/);
    var out = [];
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) continue;
      // Parse first column, handle quoted values
      var first;
      if (line.charAt(0) === '"') {
        var endQuote = line.indexOf('"', 1);
        while (endQuote > -1 && line.charAt(endQuote + 1) === '"') {
          endQuote = line.indexOf('"', endQuote + 2);
        }
        first = line.substring(1, endQuote).replace(/""/g, '"');
      } else {
        var comma = line.indexOf(',');
        first = comma === -1 ? line : line.substring(0, comma);
      }
      first = first.trim();
      if (!first) continue;
      // Skip likely header row
      if (i === 0 && /^(company|account|name|organization|org)$/i.test(first)) continue;
      out.push(first);
    }
    return out;
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

  // Conversation feedback state (in-memory, persists within session)
  var _feedbackState = {};

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
        { title: 'The Status Problem', source: 'Day 2 \u2014 Module 2', html: '<div class="pb-principle">Lowering your status kills trust. Enterprise buyers want to talk to peers, not beggars.</div><div class="pb-label">Never say these</div><div class="pb-never">"I know you\'re super busy, so I\'ll be really quick..."</div><div class="pb-never">"Is this a good time? I don\'t want to bother you..."</div><div class="pb-never">"Can I just have 5 minutes? I promise it\'ll be worth it..."</div><div class="pb-never">"I\'d love to pick your brain if you have a second..."</div><div class="pb-never">"Hey, appreciate you picking up..."</div><div class="pb-never">"I know you weren\'t expecting my call, so I\'ll keep it brief..."</div><div class="pb-label">Instead: direct, honest questions</div><div class="pb-good">"Is internal video breaking at scale something you\'re dealing with right now?"</div><div class="pb-good">"Are you the right person to talk to about this, or should I connect with someone else?"</div><div class="pb-good">"Does this sound relevant, or should we not waste each other\'s time?"</div>' },
        { title: 'Go for the No', source: 'Day 5 \u2014 Module 5', html: '<div class="pb-principle">The less you need the \'yes,\' the more likely you get it. Invite the \'no.\'</div><div class="pb-label">What it sounds like</div><div class="pb-script">"Based on what you\'re describing, it sounds like this might not be relevant right now. Should we just call it here, or is there something I\'m missing?"</div><div class="pb-script">"If this isn\'t a priority, totally get it. Should I stop following up, or is there a better time to check back?"</div><div class="pb-script">"Got it. Sounds like you\'re all set. Should I take you off my list, or is there a scenario where this might be relevant down the road?"</div><div class="pb-label">Common mistakes</div><div class="pb-never"><strong>Passive-Aggressive:</strong> "Well, if you\'re not interested, I guess I\'ll just leave you alone then..."</div><div class="pb-good"><strong>Better:</strong> "Got it. Should I check back in Q3, or would you prefer I don\'t follow up?"</div><div class="pb-never"><strong>Giving Up:</strong> "Okay, no problem. Have a great day!" (and never follow up)</div><div class="pb-good"><strong>Better:</strong> "Out of curiosity, is that because you\'re handling this internally, or is video just not a priority right now?"</div>' }
      ]},
      { id: 'call-structure', title: 'Call Structure (Maniac Method)', icon: 'phone', desc: 'The cold call framework \u2014 name, pause, pattern interrupt, eCDN question, silence.', cards: [
        { title: 'The Cold Call Opener', source: 'Maniac Method', html: '<div class="pb-label">Step 1: Name + Pause</div><div class="pb-script">{{First Name}} {{Last Name}}?<br>[PAUSE \u2014 everyone loves hearing their name. Wait for them to confirm or deny.]</div><div class="pb-label">Step 2: Introduce Yourself + eCDN Question + Silence</div><div class="pb-script">Great, this is {{Your First Name}} calling with VBRICK. I\'m hoping you can help me out real quick \u2014 are you on the team responsible for {Company}\'s eCDN strategy?<br>[SILENCE \u2014 let them respond]</div><div class="pb-label">Step 3a: If YES \u2014 ask "Why?"</div><div class="pb-script">Why?<br>[Let them talk. Get them explaining their world. Then tie in the trigger naturally:]<br>"That makes sense \u2014 the reason I ask is {trigger event}. We\'ve been working with similar orgs on exactly that. Worth a quick conversation to see if there\'s a fit."</div><div class="pb-label">Step 3b: If NO / Wrong Person \u2014 Get Referral</div><div class="pb-script">Who might that person be?<br>[They give a name]<br>Would it be okay if I let {Referred Name} know that we briefly spoke?<br>[Call referred person:]<br>"{Original First Name} said you were the person I should speak with concerning {Company}\'s eCDN strategy."<br>[PAUSE \u2014 then tie in trigger]</div>' },
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

  // ---- Account Plans Generator ----
  // Normalize company names for grouping (handles suffix variations)
  function normalizeCompanyKey(name) {
    if (!name) return '';
    return String(name).toLowerCase()
      .replace(/\s+—.*$/, '')   // strip em-dash suffix (e.g. "— Government & Regulated")
      .replace(/\s+-.*$/, '')   // strip hyphen suffix if it's clearly a segment descriptor
      .replace(/\b(inc\.?|corp\.?|corporation|llc|plc|ltd|limited|company|co\.?|group|holdings)\b/g, '')
      .replace(/[^a-z0-9]/g, '')
      .trim();
  }

  // Skip these synthetic/group entries from account plans
  function isPlanSkipCompany(name) {
    if (!name) return true;
    var n = name.toLowerCase().trim();
    // Single-name filters
    if (/^(multiple|unknown|various|n\/a|tbd|n\/a|none)$/i.test(n)) return true;
    // Regulation / broad-signal entries are not real accounts
    if (/^regulation:/i.test(n)) return true;
    if (/^(various|several|many|all|global)\s/i.test(n)) return true;
    // Generic group phrases
    if (/\bcustomers$/i.test(n)) return true;
    if (/\borganizations using\b/i.test(n)) return true;
    if (/\bfirms\s+on\b/i.test(n)) return true;
    if (/\borgs?\s+on\b/i.test(n)) return true;
    if (/\bagencies?\s+on\b/i.test(n)) return true;
    if (/\bcontractors?\s+and\b/i.test(n)) return true;
    if (/\benterprises?\s+on\b/i.test(n)) return true;
    if (/\bfortune\s+500\b/i.test(n)) return true;
    if (/\bregulated\s+sectors?\b/i.test(n)) return true;
    if (/\bgovernment\s+&?\s+regulated\b/i.test(n)) return true;
    // Descriptive group buckets (not real single accounts)
    if (/^(large|mid|small)[\s-]?(enterprise|organization|firm|agency|company|companies)/i.test(n)) return true;
    if (/^(all|any)\s/i.test(n)) return true;
    if (/\brunning\s+(town|all|webinars|events)/i.test(n)) return true;
    if (/\b(customers|users|enterprises|organizations|firms|agencies|companies)\b.*\b(requiring|needing|using|on|with)\b/i.test(n)) return true;
    if (/\b(events|webinars)\s+customers\b/i.test(n)) return true;
    // Competitor-named group buckets
    if (/brightcove|kaltura|panopto|vimeo|qumu|microsoft stream|teams live/i.test(n) && /customers?|users?|organizations?/i.test(n)) return true;
    return false;
  }

  // Group findings by normalized company to power the Account Plans list
  function getAccountGroups() {
    var groups = {};
    FINDINGS.forEach(function(f) {
      if (!f || !f.company) return;
      if (isPlanSkipCompany(f.company)) return;
      var key = normalizeCompanyKey(f.company);
      if (!key) return;
      if (!groups[key]) {
        groups[key] = {
          key: key,
          displayName: f.company,
          findings: [],
          stakeholders: {},
          industries: {},
          maxUrgency: 0
        };
      }
      var g = groups[key];
      // Prefer the shortest clean display name
      if ((f.company || '').length < (g.displayName || '').length) g.displayName = f.company;
      g.findings.push(f);
      if (typeof f.urgency_score === 'number' && f.urgency_score > g.maxUrgency) g.maxUrgency = f.urgency_score;
      if (f.industry) g.industries[f.industry] = (g.industries[f.industry] || 0) + 1;
      (f.stakeholders || []).forEach(function(s) {
        if (!s || !s.name) return;
        var sk = s.name.toLowerCase() + '|' + (s.linkedin || '');
        if (!g.stakeholders[sk]) g.stakeholders[sk] = { name: s.name, title: s.title || '', linkedin: s.linkedin || '', findings: [] };
        g.stakeholders[sk].findings.push(f);
      });
    });
    return Object.keys(groups).map(function(k){ return groups[k]; })
      .sort(function(a,b){
        if (b.maxUrgency !== a.maxUrgency) return b.maxUrgency - a.maxUrgency;
        return b.findings.length - a.findings.length;
      });
  }

  // Map a finding to the VBRICK business challenge it represents
  function findingToChallenge(f) {
    var cls = classifyType(f);
    var map = {
      competitor_displacement: 'Vendor risk / platform migration (stable enterprise support, SLAs, compliance)',
      rto: 'Return-to-office & all-hands scaling without network crush (eCDN)',
      compliance: 'FedRAMP / FINRA / HIPAA / Section 508 / GDPR compliance gap',
      security: 'Enterprise video security (FIPS 140-2, encryption, DRM, audit trails)',
      leadership: 'New CIO/CTO/Comms leader with mandate to modernize video',
      ma: 'M&A platform consolidation / standardization on one video stack',
      workforce: 'Workforce restructuring — communications continuity across dispersed teams',
      job_posting: 'Hiring signals indicating video/comms investment',
      digital_transformation: 'Digital transformation / AI-video modernization',
      internal_comms: 'Town hall, all-hands, and internal events at scale',
      federal_contract: 'Federal contract requiring FedRAMP-authorized video platform',
      ecdn_scale: 'Bandwidth / network strain from video at scale — eCDN required',
      pricing: 'Current vendor pricing pressure / renewal leverage',
      outage: 'Reliability incident — SLA-backed enterprise video needed'
    };
    return map[cls] || 'Enterprise video strategy';
  }

  // Generate a SWOT from the finding set for this company
  function generateSWOT(group) {
    var findings = group.findings;
    var hasCompliance = findings.some(function(f){ return classifyType(f) === 'compliance'; });
    var hasCompetitor = findings.some(function(f){ return classifyType(f) === 'competitor_displacement'; });
    var hasRTO = findings.some(function(f){ return classifyType(f) === 'rto'; });
    var hasLeadership = findings.some(function(f){ return classifyType(f) === 'leadership'; });
    var hasFederal = findings.some(function(f){ return classifyType(f) === 'federal_contract' || /federal|gov/i.test(f.industry || ''); });
    var hasSecurity = findings.some(function(f){ return classifyType(f) === 'security'; });
    var hasDX = findings.some(function(f){ return classifyType(f) === 'digital_transformation'; });
    var hasMA = findings.some(function(f){ return classifyType(f) === 'ma'; });
    var hasWorkforce = findings.some(function(f){ return classifyType(f) === 'workforce'; });

    var strengths = [];
    var weaknesses = [];
    var opportunities = [];
    var threats = [];

    // Strengths (from account's perspective — why this is a good fit for VBRICK)
    if (hasFederal) strengths.push('Regulated / federal footprint aligned to VBRICK\'s FedRAMP + FIPS 140-2 posture');
    if (Object.keys(group.stakeholders).length >= 3) strengths.push('Multi-stakeholder map already identified (' + Object.keys(group.stakeholders).length + ' verified contacts)');
    if (group.findings.length >= 3) strengths.push(group.findings.length + ' active signals across multiple VBRICK ICP categories');
    if (hasLeadership) strengths.push('New leadership creates mandate-driven buying window');
    if (strengths.length === 0) strengths.push('Account is in active VBRICK ICP based on detected signals');

    // Weaknesses (gaps / risks in the account’s current state)
    if (hasCompetitor) weaknesses.push('Current video vendor showing instability, retirement, or compliance gaps');
    if (hasRTO) weaknesses.push('RTO / hybrid mandate likely straining existing video delivery');
    if (hasWorkforce) weaknesses.push('Workforce restructuring creates internal-comms continuity risk');
    if (hasCompliance && !hasFederal) weaknesses.push('Compliance exposure in current video stack (regulatory signals detected)');
    if (!hasStakeholderCoverage(group)) weaknesses.push('Limited stakeholder coverage — needs further mapping before first call');
    if (weaknesses.length === 0) weaknesses.push('No material internal gaps detected — qualify on vendor fit and timing');

    // Opportunities
    if (hasCompetitor) opportunities.push('Vendor displacement window — renewal timing is the unlock');
    if (hasCompliance) opportunities.push('Lead with FedRAMP / FIPS 140-2 / FINRA-ready archiving');
    if (hasRTO || hasDX) opportunities.push('Position eCDN + analytics for scaled town halls and all-hands');
    if (hasLeadership) opportunities.push('Engage new leader early before platform decisions lock in');
    if (hasMA) opportunities.push('Consolidation moment — standardize on one enterprise video stack');
    if (hasSecurity) opportunities.push('Security-first posture maps to VBRICK\'s enterprise controls');
    if (opportunities.length === 0) opportunities.push('Establish point-of-view conversation before a competitor takes the seat');

    // Threats
    if (hasCompetitor) threats.push('Incumbent may cut price or bundle to hold the account through renewal');
    threats.push('Microsoft Teams / Stream positioning as \'good enough\' inside the M365 stack');
    if (hasMA) threats.push('M&A freeze on new vendor commitments during integration');
    if (hasWorkforce) threats.push('Internal chaos may delay any new vendor purchase cycle');
    if (threats.length <= 1) threats.push('Horizontal sales-intel tools (Salesmotion, Coldreach, Autobound) trying to occupy the same conversation');

    return { strengths: strengths, weaknesses: weaknesses, opportunities: opportunities, threats: threats };
  }

  function hasStakeholderCoverage(group) {
    var roles = Object.keys(group.stakeholders).map(function(k){ return (group.stakeholders[k].title || '').toLowerCase(); });
    var hasIT = roles.some(function(t){ return /(cio|cto|it|infrastructure|network|digital)/.test(t); });
    var hasSec = roles.some(function(t){ return /(ciso|security|compliance|risk|privacy)/.test(t); });
    var hasComms = roles.some(function(t){ return /(comm|employee experience|hr|people|internal)/.test(t); });
    return (hasIT ? 1 : 0) + (hasSec ? 1 : 0) + (hasComms ? 1 : 0) >= 2;
  }

  function generateAccountPlan(group) {
    var topFinding = group.findings.slice().sort(function(a,b){ return (b.urgency_score||0) - (a.urgency_score||0); })[0];
    var industries = Object.keys(group.industries).sort(function(a,b){ return group.industries[b] - group.industries[a]; });
    var topIndustry = industries[0] || '';

    // Overview: synthesize from top finding + breadth of signals
    var signalTypes = {};
    group.findings.forEach(function(f){ var c = classifyType(f); signalTypes[c] = (signalTypes[c]||0)+1; });
    var signalBreakdown = Object.keys(signalTypes).map(function(k){ return k.replace(/_/g,' ') + ' (' + signalTypes[k] + ')'; }).join(', ');

    var overview = group.displayName + (topIndustry ? ' (' + topIndustry + ')' : '') + ' is showing ' + group.findings.length +
      ' active VBRICK ICP signal' + (group.findings.length === 1 ? '' : 's') +
      ' across: ' + signalBreakdown + '. ' +
      'Highest-urgency signal: ' + (topFinding.finding_type || 'trigger') + ' — ' + (topFinding.summary || '').split('.').slice(0, 2).join('.') + '.';

    var swot = generateSWOT(group);

    // Stakeholders mapped to challenges
    var stakeholderMap = Object.keys(group.stakeholders).map(function(k){
      var s = group.stakeholders[k];
      var challenges = {};
      s.findings.forEach(function(f){ challenges[findingToChallenge(f)] = true; });
      return {
        name: s.name,
        title: s.title,
        linkedin: s.linkedin,
        challenges: Object.keys(challenges)
      };
    });

    // VBRICK positioning
    var positioning = buildPositioning(group, swot);

    // Point-of-view hypothesis
    var hypothesis = buildHypothesis(group, topFinding);

    return {
      company: group.displayName,
      industry: topIndustry,
      overview: overview,
      stakeholderMap: stakeholderMap,
      swot: swot,
      positioning: positioning,
      hypothesis: hypothesis,
      findings: group.findings
    };
  }

  function buildPositioning(group, swot) {
    var cls = group.findings.map(classifyType);
    var pillars = [];
    if (cls.includes('compliance') || /government|federal|healthcare|financial|pharma/i.test(Object.keys(group.industries).join(' '))) {
      pillars.push('Compliance-first: FedRAMP Moderate, FIPS 140-2, SOC II Type 2, Section 508, HIPAA, FINRA-ready archiving');
    }
    if (cls.includes('ecdn_scale') || cls.includes('rto') || cls.includes('internal_comms')) {
      pillars.push('Scale-first: purpose-built eCDN that delivers video to 100k+ concurrent viewers without crushing the corporate network');
    }
    if (cls.includes('competitor_displacement')) {
      pillars.push('Stability-first: dedicated enterprise support, published SLAs, and an ownership model that is not cutting staff or pivoting to consumer');
    }
    if (cls.includes('digital_transformation') || cls.includes('internal_comms')) {
      pillars.push('Integration-first: native Microsoft 365 / Teams / SharePoint integration — layer enterprise video onto the existing collaboration stack');
    }
    if (pillars.length === 0) {
      pillars.push('Enterprise-grade video infrastructure that delivers, secures, and governs internal video at scale');
    }
    return pillars;
  }

  function buildHypothesis(group, topFinding) {
    var cls = classifyType(topFinding);
    var why = '';
    if (cls === 'competitor_displacement') {
      why = 'Their current video vendor is in turmoil. The renewal conversation is the wedge.';
    } else if (cls === 'compliance') {
      why = 'A compliance requirement — not a preference — is forcing a platform review. Timing is the unlock.';
    } else if (cls === 'rto') {
      why = 'RTO mandate means more town halls and more concurrent streams. The network will break before the vendor does. Get in front of IT and Comms together.';
    } else if (cls === 'leadership') {
      why = 'A new leader is deciding what to rebuild. First 90 days is when the vendor map gets drawn.';
    } else if (cls === 'federal_contract') {
      why = 'Federal contract requirements force a FedRAMP-authorized platform. VBRICK is one of the only options.';
    } else if (cls === 'ma') {
      why = 'M&A creates a consolidation moment. Two vendor stacks become one. Whoever earns the standardization decision wins the whole integrated org.';
    } else {
      why = 'Signal indicates active investment in internal video or comms. Start the conversation before a competitor does.';
    }
    return {
      why_now: why,
      first_conversation: 'Open with the specific trigger (' + (topFinding.finding_type || 'signal') + '). Ask if they own the eCDN / video strategy. If yes, \'why?\' and listen. If no, get referred. Do not pitch the product. Book a follow-on technical conversation with the right stakeholder pod.',
      test: 'Within 14 days, confirm: (1) the business challenge is real, (2) the buying pod (IT + Security + Comms), (3) the forcing function (renewal date, compliance deadline, leadership mandate, event date).'
    };
  }

  function renderAccountPlans(container) {
    var groups = getAccountGroups();
    findingCount.textContent = groups.length + ' account' + (groups.length === 1 ? '' : 's');

    var html = '<div class="plans-view">';
    html += '<div class="plans-toolbar">';
    html += '<input type="text" id="plansSearch" class="plans-search" placeholder="Search accounts..." autocomplete="off">';
    html += '<button class="plan-action-btn plan-action-btn--primary" id="plansNewSingle">+ Research new account</button>';
    html += '<button class="plan-action-btn" id="plansNewBulk">Upload CSV</button>';
    html += '</div>';

    if (groups.length === 0) {
      html += '<div class="empty-state" style="padding:var(--space-8);text-align:center;"><p>No account-specific findings yet. Run single-account or bulk research to generate plans.</p></div>';
    } else {
      html += '<div class="plans-grid" id="plansGrid">';
      groups.forEach(function(g) {
        var urgencyLabel = URGENCY_NAMES[g.maxUrgency] || 'Low';
        var urgencyClass = 'urgency-' + g.maxUrgency;
        var stakeCount = Object.keys(g.stakeholders).length;
        var industries = Object.keys(g.industries).sort(function(a,b){ return g.industries[b] - g.industries[a]; });
        html += '<div class="plan-card" data-key="' + g.key + '">';
        html += '<div class="plan-card-company">' + escapeHtml(g.displayName) + '</div>';
        html += '<div class="plan-card-industry">' + escapeHtml(industries[0] || 'Industry unclassified') + '</div>';
        html += '<div class="plan-card-stats">';
        html += '<div class="plan-card-stat"><strong>' + g.findings.length + '</strong> signal' + (g.findings.length === 1 ? '' : 's') + '</div>';
        html += '<div class="plan-card-stat"><strong>' + stakeCount + '</strong> stakeholder' + (stakeCount === 1 ? '' : 's') + '</div>';
        html += '<div class="plan-card-stat"><span class="urgency-badge ' + urgencyClass + '" style="display:inline-flex;align-items:center;"><span class="urgency-dot"></span>' + urgencyLabel + '</span></div>';
        html += '</div>';
        html += '<div class="plan-card-action">View account plan →</div>';
        html += '</div>';
      });
      html += '</div>';
    }
    html += '</div>';
    container.innerHTML = html;

    // Wire events
    var searchInput = document.getElementById('plansSearch');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        var q = searchInput.value.toLowerCase();
        container.querySelectorAll('.plan-card').forEach(function(card) {
          var name = card.querySelector('.plan-card-company').textContent.toLowerCase();
          card.style.display = name.includes(q) ? '' : 'none';
        });
      });
    }
    var newSingleBtn = document.getElementById('plansNewSingle');
    if (newSingleBtn) newSingleBtn.addEventListener('click', function(){ showSingleAccountModal(); });
    var newBulkBtn = document.getElementById('plansNewBulk');
    if (newBulkBtn) newBulkBtn.addEventListener('click', function(){ showCsvUploadModal(); });

    container.querySelectorAll('.plan-card').forEach(function(card) {
      card.addEventListener('click', function() {
        var key = card.dataset.key;
        var grp = groups.find(function(g){ return g.key === key; });
        if (grp) openAccountPlanModal(grp);
      });
    });
  }

  function openAccountPlanModal(group) {
    var plan = generateAccountPlan(group);
    var html = '<div class="plan-actions">';
    html += '<button class="plan-action-btn plan-action-btn--primary" id="planDownloadMd">Download Markdown</button>';
    html += '<button class="plan-action-btn" id="planCopyPlan">Copy to clipboard</button>';
    html += '</div>';

    html += '<h2 style="margin:0 0 4px;font-size:var(--text-xl);">' + escapeHtml(plan.company) + '</h2>';
    if (plan.industry) html += '<div style="font-size:var(--text-sm);color:var(--color-text-muted);margin-bottom:var(--space-4);">' + escapeHtml(plan.industry) + '</div>';

    // Overview
    html += '<div class="plan-section">';
    html += '<div class="plan-section-title">Account Overview</div>';
    html += '<p>' + escapeHtml(plan.overview) + '</p>';
    html += '</div>';

    // Stakeholders mapped to challenges
    html += '<div class="plan-section">';
    html += '<div class="plan-section-title">Stakeholders Mapped to Business Challenges</div>';
    if (plan.stakeholderMap.length === 0) {
      html += '<p style="color:var(--color-text-muted);">No verified stakeholders yet. Run research to enrich this account.</p>';
    } else {
      plan.stakeholderMap.forEach(function(s) {
        html += '<div class="plan-stakeholder-row">';
        html += '<div class="name">' + escapeHtml(s.name);
        if (s.linkedin) html += ' <a href="' + escapeHtml(s.linkedin) + '" target="_blank" rel="noopener" style="font-size:var(--text-xs);color:var(--nm-accent);margin-left:8px;">LinkedIn ↗</a>';
        html += '</div>';
        html += '<div class="title">' + escapeHtml(s.title) + '</div>';
        html += '<div class="challenges"><strong>Maps to:</strong> ' + s.challenges.map(escapeHtml).join('; ') + '</div>';
        html += '</div>';
      });
    }
    html += '</div>';

    // SWOT
    html += '<div class="plan-section">';
    html += '<div class="plan-section-title">SWOT Analysis</div>';
    html += '<div class="plan-swot-grid">';
    html += '<div class="plan-swot-cell plan-swot-cell--s"><h4>Strengths</h4><ul>' + plan.swot.strengths.map(function(x){return '<li>'+escapeHtml(x)+'</li>';}).join('') + '</ul></div>';
    html += '<div class="plan-swot-cell plan-swot-cell--w"><h4>Weaknesses</h4><ul>' + plan.swot.weaknesses.map(function(x){return '<li>'+escapeHtml(x)+'</li>';}).join('') + '</ul></div>';
    html += '<div class="plan-swot-cell plan-swot-cell--o"><h4>Opportunities</h4><ul>' + plan.swot.opportunities.map(function(x){return '<li>'+escapeHtml(x)+'</li>';}).join('') + '</ul></div>';
    html += '<div class="plan-swot-cell plan-swot-cell--t"><h4>Threats</h4><ul>' + plan.swot.threats.map(function(x){return '<li>'+escapeHtml(x)+'</li>';}).join('') + '</ul></div>';
    html += '</div></div>';

    // VBRICK Positioning
    html += '<div class="plan-section">';
    html += '<div class="plan-section-title">VBRICK Positioning</div>';
    html += '<ul>' + plan.positioning.map(function(p){ return '<li>' + escapeHtml(p) + '</li>'; }).join('') + '</ul>';
    html += '</div>';

    // Hypothesis
    html += '<div class="plan-section">';
    html += '<div class="plan-section-title">Point-of-View Hypothesis</div>';
    html += '<p><strong>Why now:</strong> ' + escapeHtml(plan.hypothesis.why_now) + '</p>';
    html += '<p><strong>First conversation:</strong> ' + escapeHtml(plan.hypothesis.first_conversation) + '</p>';
    html += '<p><strong>14-day test:</strong> ' + escapeHtml(plan.hypothesis.test) + '</p>';
    html += '</div>';

    // Active findings list
    html += '<div class="plan-section">';
    html += '<div class="plan-section-title">Active Signals (' + plan.findings.length + ')</div>';
    plan.findings.slice().sort(function(a,b){return (b.urgency_score||0)-(a.urgency_score||0);}).forEach(function(f){
      var score = f.urgency_score || 0;
      var urgencyLabel = URGENCY_NAMES[score] || 'Low';
      html += '<div class="plan-stakeholder-row" style="cursor:pointer;" data-finding-id="' + f.id + '">';
      html += '<div class="name"><span class="urgency-badge urgency-' + score + '" style="margin-right:8px;"><span class="urgency-dot"></span>' + urgencyLabel + '</span>' + escapeHtml(f.finding_type || 'Signal') + '</div>';
      html += '<div class="title">' + escapeHtml((f.summary || '').slice(0, 180)) + ((f.summary || '').length > 180 ? '...' : '') + '</div>';
      html += '</div>';
    });
    html += '</div>';

    modalContent.innerHTML = html;
    modalOverlay.classList.add('open');

    // Wire action buttons
    document.getElementById('planDownloadMd').addEventListener('click', function() {
      downloadPlanMarkdown(plan);
    });
    document.getElementById('planCopyPlan').addEventListener('click', function() {
      var md = planToMarkdown(plan);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(md).then(function(){
          var btn = document.getElementById('planCopyPlan');
          var orig = btn.textContent; btn.textContent = 'Copied';
          setTimeout(function(){ btn.textContent = orig; }, 1500);
        });
      }
    });
    modalContent.querySelectorAll('[data-finding-id]').forEach(function(row) {
      row.addEventListener('click', function() {
        var id = parseInt(row.dataset.findingId);
        if (id) openModal(id);
      });
    });
  }

  function planToMarkdown(plan) {
    var md = '# Account Plan: ' + plan.company + '\n\n';
    if (plan.industry) md += '**Industry:** ' + plan.industry + '\n\n';
    md += '## Account Overview\n\n' + plan.overview + '\n\n';

    md += '## Stakeholders Mapped to Business Challenges\n\n';
    if (plan.stakeholderMap.length === 0) {
      md += '_No verified stakeholders yet._\n\n';
    } else {
      plan.stakeholderMap.forEach(function(s) {
        md += '### ' + s.name + '\n';
        md += '- **Title:** ' + s.title + '\n';
        if (s.linkedin) md += '- **LinkedIn:** ' + s.linkedin + '\n';
        md += '- **Maps to challenges:**\n';
        s.challenges.forEach(function(c){ md += '  - ' + c + '\n'; });
        md += '\n';
      });
    }

    md += '## SWOT Analysis\n\n';
    md += '### Strengths\n' + plan.swot.strengths.map(function(x){return '- ' + x;}).join('\n') + '\n\n';
    md += '### Weaknesses\n' + plan.swot.weaknesses.map(function(x){return '- ' + x;}).join('\n') + '\n\n';
    md += '### Opportunities\n' + plan.swot.opportunities.map(function(x){return '- ' + x;}).join('\n') + '\n\n';
    md += '### Threats\n' + plan.swot.threats.map(function(x){return '- ' + x;}).join('\n') + '\n\n';

    md += '## VBRICK Positioning\n\n' + plan.positioning.map(function(p){return '- ' + p;}).join('\n') + '\n\n';

    md += '## Point-of-View Hypothesis\n\n';
    md += '**Why now:** ' + plan.hypothesis.why_now + '\n\n';
    md += '**First conversation:** ' + plan.hypothesis.first_conversation + '\n\n';
    md += '**14-day test:** ' + plan.hypothesis.test + '\n\n';

    md += '## Active Signals (' + plan.findings.length + ')\n\n';
    plan.findings.forEach(function(f){
      md += '- **[' + (URGENCY_NAMES[f.urgency_score||0] || 'Low') + ']** ' + (f.finding_type || 'Signal') + ' — ' + (f.summary || '').split('.').slice(0,2).join('.') + '\n';
    });
    md += '\n---\n_Generated by VBRICK GTM Intelligence Dashboard_\n';
    return md;
  }

  function downloadPlanMarkdown(plan) {
    var md = planToMarkdown(plan);
    var blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'account-plan-' + (plan.company || 'account').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') + '-' + new Date().toISOString().slice(0,10) + '.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
