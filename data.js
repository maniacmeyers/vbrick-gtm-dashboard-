const FINDINGS = [
  {
    "id": 1,
    "category": "Competitor Intelligence",
    "company": "Microsoft Teams Enterprise Customers (Broad)",
    "summary": "Microsoft announced on February 3, 2026 that Teams Live Events will be fully retired on June 30, 2026. Starting February 3, customers cannot schedule any Live Events past June 30. Existing events scheduled before the retirement date will run through February 28, 2027. The Viva Engage integration for Live Events ends April 15, 2026. Organizations heavily using Live Events for internal broadcasts must migrate to Teams Town Hall or find an alternative.",
    "source_url": "https://techcommunity.microsoft.com/blog/microsoftteamsblog/retiring-teams-live-events-the-next-chapter-for-events-at-scale-in-microsoft-tea/4486465",
    "why_vbrick": "VBRICK's Teams integration is an additive layer — not a replacement workflow — that provides eCDN-powered large-scale streaming, FINRA-ready archiving, real-time analytics, and FedRAMP compliance that Teams Town Hall does not natively provide. This is the optimal window to approach Microsoft shop IT teams.",
    "outreach_angle": "Time-sensitive displacement: 'June 30 is the deadline — your Teams Live Events workflow ends. VBRICK integrates with Teams to provide enterprise-grade streaming, compliance archiving, and eCDN without abandoning your M365 investment.'",
    "target_persona": "IT Director / Director of Internal Communications / M365 Administrators",
    "industry": "Enterprise (Cross-industry) / Federal Government",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Product Discontinuation",
    "finding_id": "",
    "competitor": "Microsoft Stream/Teams Live Events",
    "stakeholders": [
      {
        "name": "Noelle Walsh",
        "title": "Corporate Vice President, Microsoft Cloud Operations + Innovation",
        "linkedin": "https://www.linkedin.com/in/noelle-walsh-b29356108"
      },
      {
        "name": "Keith Boyd",
        "title": "Senior Director Microsoft Digital",
        "linkedin": "https://www.linkedin.com/in/keithalanboyd"
      },
      {
        "name": "Melanie Simpson",
        "title": "CVP Human Resources E+D T&R",
        "linkedin": "https://www.linkedin.com/in/melanie-simpson-ms"
      },
      {
        "name": "Britt Aylor",
        "title": "Director, Leadership Development",
        "linkedin": "https://www.linkedin.com/in/brittaylor"
      },
      {
        "name": "Jeff Tyler",
        "title": "Director of Media Experience",
        "linkedin": "https://www.linkedin.com/in/jeff-tyler-65827089"
      },
      {
        "name": "Raymond Linz",
        "title": "Service Reliability Engineer Networking",
        "linkedin": "https://www.linkedin.com/in/raylinz"
      },
      {
        "name": "Geoff Belknap",
        "title": "CVP, Deputy CISO (Core and M&A)",
        "linkedin": "https://www.linkedin.com/in/geoffbelknap"
      }
    ],
    "is_new": true
  },
  {
    "id": 2,
    "category": "Competitor Intelligence",
    "company": "Federal Government / Defense Contractors",
    "summary": "Microsoft 365 Teams Town Hall in the commercial cloud is not FedRAMP authorized for CUI-level data. GCC High (required for DoD/CUI) is authorized but costs 2–3x commercial Microsoft 365 pricing. Stream on SharePoint (the Classic Stream replacement) eliminated the dedicated video portal experience, forcing video management back into SharePoint folders. Federal agencies and defense contractors evaluating Town Hall for enterprise video must separately address eCDN, FIPS 140-2, and video-specific compliance controls not native to Teams.",
    "source_url": "https://secureframe.com/blog/microsoft-gcc-high",
    "why_vbrick": "VBRICK holds FedRAMP authorization, FIPS 140-2, SOC II Type 2, Section 508, and HIPAA compliance natively. It integrates with Teams/M365 GCC/GCC High environments to provide the dedicated enterprise video portal, eCDN, and compliance archiving that Microsoft's own infrastructure does not address.",
    "outreach_angle": "Lead with FedRAMP + FIPS 140-2 credentials. Position as the secure video layer for GCC/GCC High M365 environments where Teams alone cannot satisfy CUI compliance requirements.",
    "target_persona": "CISO / IT Security Manager / Compliance Officer",
    "industry": "Federal Government / Defense",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Compliance Gap",
    "finding_id": "",
    "competitor": "Microsoft Stream/Teams Live Events",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 3,
    "category": "Competitor Intelligence",
    "company": "Brightcove Enterprise Customers (Broad)",
    "summary": "In March 2025, following its $233M acquisition by Italian tech company Bending Spoons (completed February 2025), Brightcove laid off approximately 198 employees — representing roughly two-thirds of its US workforce and ~33% of its global 600+ headcount. Engineering, sales, and customer support teams were hardest hit. Regional offices in Europe and Asia-Pacific are expected to close. Analysis from FastPix and Gumlet note the 'engineering talent exodus' raises serious questions about platform evolution velocity. Bending Spoons is known for aggressive post-acquisition cost restructuring (also owner of Evernote, Vimeo).",
    "source_url": "https://www.boston.com/news/business/2025/03/19/boston-based-streaming-company-brightcove-to-lay-off-198-workers/",
    "why_vbrick": "Brightcove enterprise customers face real risk: degraded support response, slower platform development, and loss of institutional knowledge. VBRICK can offer a stability narrative — stable ownership, purpose-built enterprise video, full compliance stack — and target accounts facing Brightcove contract renewals.",
    "outreach_angle": "Directly reference the acquisition and layoffs at renewal time. 'Your Brightcove contract is up — the team that supported you has largely left. VBRICK offers enterprise video with a dedicated support model and compliance-first architecture.'",
    "target_persona": "VP of Marketing Technology / Director of Digital Media / CTO",
    "industry": "Media / Financial Services / Enterprise",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Workforce Reduction / Support Risk",
    "finding_id": "",
    "competitor": "Brightcove",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 4,
    "category": "Competitor Intelligence",
    "company": "Vimeo Enterprise Customers (Broad)",
    "summary": "Vimeo was acquired by Bending Spoons (also Brightcove's acquirer) for $1.38 billion in November 2025. By January 2026, the company had initiated its second (and third, per some reports) round of layoffs since the acquisition, cutting staff globally across support, engineering, and operations. Bending Spoons is known for aggressive post-acquisition cost efficiency programs. A Gumlet analysis notes the layoffs indicate 'structural under-capacity' and that 'support is structurally the easiest place to cut' — leading to slower ticket queues, thinner incident coverage, and loss of institutional knowledge.",
    "source_url": "https://www.businessinsider.com/vimeo-laying-off-staff-after-billion-sale-to-bending-spoons-2026-1",
    "why_vbrick": "Enterprise customers with Vimeo — particularly those relying on it for internal comms, HR, or compliance video — face real risk of support degradation and feature freeze as Bending Spoons rationalizes the acquisition. VBRICK's stable ownership and enterprise-grade support model is a compelling alternative.",
    "outreach_angle": "Timing play: 'Bending Spoons just laid off Vimeo teams for the second time since acquiring them in November. If you rely on Vimeo for enterprise video, the support team supporting you may not exist anymore. VBRICK has a stable roadmap and dedicated enterprise support.'",
    "target_persona": "Director of Corporate Communications / VP of Digital Workplace / CTO",
    "industry": "Enterprise (Cross-industry)",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Workforce Reduction / Support Risk",
    "finding_id": "",
    "competitor": "Vimeo Enterprise",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 5,
    "category": "Market Triggers",
    "company": "Amazon",
    "summary": "Amazon executed two major corporate workforce reductions within a single fiscal quarter: ~14,000 roles cut in October 2025 and ~16,000 additional roles under 'Project Dawn' in January 2026, totaling ~30,000 corporate job cuts. Simultaneously, Amazon enforced a strict 5-day return-to-office mandate effective January 2025. The combination of mass hybrid-to-onsite transitions and rapid workforce realignment has created acute enterprise-wide communication infrastructure pressure, including companywide all-hands, restructuring announcements, and leadership town halls at unprecedented scale.",
    "source_url": "https://www.techtimes.com/articles/314327/20260128/amazon-job-cuts-loom-project-dawn-email-sparks-internal-panic-among-employees.htm",
    "why_vbrick": "Vbrick's scalable eCDN offloads bandwidth during simultaneous high-viewership town halls and all-hands events across Amazon's massive distributed workforce. AI transcription and search enable employees to find archived restructuring communications on demand. Microsoft 365/Teams integration ensures seamless deployment within Amazon's existing collaboration stack.",
    "outreach_angle": "Amazon's dual-wave restructuring and 5-day RTO have made reliable, large-scale video delivery mission-critical. Vbrick's eCDN can prevent network saturation during mass town halls, while AI-powered archiving ensures compliance-ready records of all restructuring communications.",
    "target_persona": "CIO / VP of Internal Communications / Head of Workplace Technology",
    "industry": "E-Commerce / Technology",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Workforce Restructuring + RTO Mandate",
    "finding_id": "",
    "employee_count": "~350,000",
    "is_fortune500": "Unverified",
    "stakeholders": [
      {
        "name": "Stephany Rochon",
        "title": "Director, Internal Communications",
        "linkedin_url": "https://www.linkedin.com/in/srochon",
        "role": "Decision Maker"
      },
      {
        "name": "Veronica Toney",
        "title": "Editor In Chief, Internal Corporate Communications",
        "linkedin_url": "https://www.linkedin.com/in/veronicatoney",
        "role": "Decision Maker"
      },
      {
        "name": "James Pemberton",
        "title": "Global Director Of Amazon Corporate IT - Engineering, Infrastructure Operations",
        "linkedin_url": "https://www.linkedin.com/in/jimpem",
        "role": "Influencer"
      },
      {
        "name": "Arindam Chakraborty",
        "title": "Product Leader",
        "linkedin_url": "https://www.linkedin.com/in/arindamc1",
        "role": "Evaluator"
      },
      {
        "name": "Aarthi Janakiraman",
        "title": "Senior Manager Information Security",
        "linkedin_url": "https://www.linkedin.com/in/aarthi-janakiraman-58a95bb",
        "role": "Technical Evaluator"
      },
      {
        "name": "Shirin Bhambhani",
        "title": "Sr. Specialist Solutions Architect - Networking",
        "linkedin_url": "https://www.linkedin.com/in/shirinbhambhani",
        "role": "Technical Evaluator"
      },
      {
        "name": "Monica Li",
        "title": "Senior Manager Security Compliance",
        "linkedin_url": "https://www.linkedin.com/in/monica-li-8862451",
        "role": "Technical Evaluator"
      },
      {
        "name": "Ashraf Altalleh",
        "title": "Sr. Solutions Architect",
        "linkedin_url": "https://www.linkedin.com/in/ashrafaltalleh",
        "role": "Technical Evaluator"
      }
    ],
    "is_new": true
  },
  {
    "id": 6,
    "category": "Market Triggers",
    "company": "Verizon Communications",
    "summary": "Dan Schulman became CEO in October 2025 after replacing Hans Vestberg, immediately announcing a 13,000+ employee reduction (largest single layoff in company history) in November 2025. Schulman has framed the restructuring as a fundamental reset, promising to 'aggressively transform culture, cost structure, and financial profile.' This represents a trifecta trigger: new CEO with transformation mandate, massive workforce restructuring requiring broad employee communications, and a culture-change initiative demanding reliable video delivery.",
    "source_url": "https://www.cnbc.com/2025/11/20/verizon-cutting-more-than-13000-jobs-as-it-restructures-.html",
    "why_vbrick": "A new CEO with an aggressive transformation mandate will need to reach 99,000+ employees at global scale. Vbrick's enterprise video platform with eCDN, real-time analytics, and Microsoft Teams integration enables Schulman to hold high-quality all-hands without network degradation. FINRA-ready archiving supports regulatory compliance for a regulated telecommunications entity.",
    "outreach_angle": "Dan Schulman's first 90 days as CEO have centered on mass workforce changes requiring high-frequency, large-audience video communications. Position Vbrick as the enterprise video backbone enabling the 'culture reset' Schulman is driving—with the analytics to prove employee engagement.",
    "target_persona": "New CEO / CIO / Head of Internal Communications",
    "industry": "Telecommunications",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "New CEO + Workforce Restructuring + Digital Transformation",
    "finding_id": "",
    "employee_count": "~99,600",
    "is_fortune500": "Unverified",
    "stakeholders": [
      {
        "name": "Wael Faheem",
        "title": "SVP and Chief Information Officer - Network Systems",
        "linkedin": "https://www.linkedin.com/in/waelfaheem"
      },
      {
        "name": "Jim McCarthy",
        "title": "Sr Director - IT Network & Unified Communications",
        "linkedin": "https://www.linkedin.com/in/jim-mccarthy-2b4a183b"
      },
      {
        "name": "Lynn Cox",
        "title": "SVP and Chief Network Officer, Fiber",
        "linkedin": "https://www.linkedin.com/in/lynn-cox-03610063"
      },
      {
        "name": "Nasrin Rezai",
        "title": "SVP, Chief Information Security Officer",
        "linkedin": "https://www.linkedin.com/in/nasrin-rezai-b3a85629"
      },
      {
        "name": "Samantha Hammock",
        "title": "Executive Vice President and Chief Human Resources Officer",
        "linkedin": "https://www.linkedin.com/in/samanthahammock"
      },
      {
        "name": "Lou Tedrick",
        "title": "Vice President, Global Learning and Development",
        "linkedin": "https://www.linkedin.com/in/lou-tedrick-31290510"
      },
      {
        "name": "Franz Paasche",
        "title": "Executive Vice President, Corporate Affairs",
        "linkedin": "https://www.linkedin.com/in/franz-paasche"
      }
    ],
    "is_new": true
  },
  {
    "id": 7,
    "category": "Market Triggers",
    "company": "The Coca-Cola Company",
    "summary": "On January 14, 2026, Coca-Cola announced a sweeping leadership restructuring coinciding with its CEO transition (Henrique Braun takes over March 31, 2026). The company created a brand-new Chief Digital Officer role—the first in company history—appointing Sedef Salingan Sahin, who reports directly to the incoming CEO. Her mandate is to 'unify digital, data and operational excellence' across 200+ country operations. The CDO will assess and reorganize all digital teams enterprise-wide in her first months, representing an active platform evaluation window.",
    "source_url": "https://investors.coca-colacompany.com/news-events/press-releases/detail/1150/the-coca-cola-company-announces-changes-in-operational-leadership-and-creation-of-new-enterprise-role-to-accelerate-digital-transformation",
    "why_vbrick": "A brand-new CDO assessing digital tools enterprise-wide is the ideal buying window. Vbrick's Microsoft 365/Teams integration aligns with Coca-Cola's deep Microsoft investment (including its $1.1B Microsoft partnership). AI search and transcription enables the CDO's stated goal of 'delivering for consumers with greater precision and speed' while ensuring employee-facing video is searchable and measurable.",
    "outreach_angle": "Coca-Cola's newly appointed CDO has a mandate to unify digital tools across 200+ countries. Vbrick is the enterprise video platform built for that scale—with native Microsoft 365 integration, real-time analytics, and global eCDN to make every town hall, training, and executive communication land consistently worldwide.",
    "target_persona": "Chief Digital Officer (Sedef Salingan Sahin) / CIO (Neeraj Tolmare)",
    "industry": "Consumer Packaged Goods",
    "urgency_score": 3,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "New CDO Appointment + CEO Transition + Digital Transformation Initiative",
    "finding_id": "",
    "employee_count": "~80,000+",
    "is_fortune500": "Unverified",
    "stakeholders": [
      {
        "name": "Venkat Subramanian",
        "title": "Senior Vice President Information Technology",
        "linkedin": "https://www.linkedin.com/in/subrama"
      },
      {
        "name": "Braxton Washington",
        "title": "VP, Digital & Technology | Regional CIO",
        "linkedin": "https://www.linkedin.com/in/braxtonwashington"
      },
      {
        "name": "Paul Huesken",
        "title": "Chief Information Assurance Officer",
        "linkedin": "https://www.linkedin.com/in/paul-huesken-29629a18"
      },
      {
        "name": "Kurt Steckman",
        "title": "Sr. Network Engineer",
        "linkedin": "https://www.linkedin.com/in/kurt-steckman-0553b54a"
      },
      {
        "name": "April Callahan",
        "title": "Sr. Director, Leadership Communications",
        "linkedin": "https://www.linkedin.com/in/april-callahan-b2520775"
      },
      {
        "name": "Scott Leith",
        "title": "Vice President, Global Strategic Communications",
        "linkedin": "https://www.linkedin.com/in/scott-leith"
      },
      {
        "name": "Charles Donnell",
        "title": "Global Senior Director, Learning Innovation, Experience Strategy",
        "linkedin": "https://www.linkedin.com/in/charles-donnell"
      }
    ],
    "is_new": true
  },
  {
    "id": 8,
    "category": "Market Triggers",
    "company": "Intel Corporation",
    "summary": "Intel appointed Cindy Stoddard (former SVP/CIO at Adobe) as its new CIO effective December 1, 2025, reporting directly to CEO Lip-Bu Tan. Stoddard's mandate includes enterprise system modernization, secure data architectures, and AI-enabled IT operations. This follows Intel's historic 24,000-person workforce reduction (from ~99,500 to ~75,000 employees) in 2025. Stoddard brings a transformation charter that will require comprehensive evaluation of enterprise communications platforms.",
    "source_url": "https://www.forbes.com/sites/peterhigh/2025/11/22/intel-taps-cindy-stoddard-as-cio-for-next-phase-of-transformation/",
    "why_vbrick": "A new CIO from Adobe—a company known for rigorous digital tool evaluation—will conduct a thorough enterprise technology audit. Intel's workforce reduction means communicating change to remaining employees at scale is paramount. Vbrick's AI-powered transcription and search, combined with Microsoft 365/Teams integration, aligns with Stoddard's stated focus on AI-enabled IT operations and data architecture modernization.",
    "outreach_angle": "Intel's new CIO is conducting an enterprise technology reset. Vbrick's enterprise video platform—with AI search, Microsoft 365 integration, and analytics—aligns directly with Stoddard's mandate for AI-enabled IT operations. A workforce reduction of 24,000 makes scaled video communication for remaining employees more critical than ever.",
    "target_persona": "CIO (Cindy Stoddard) / VP of IT Infrastructure",
    "industry": "Semiconductor / Technology",
    "urgency_score": 3,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "New CIO Appointment + Workforce Restructuring + Digital Transformation",
    "finding_id": "",
    "employee_count": "~75,000 (post-restructuring)",
    "is_fortune500": "Unverified",
    "stakeholders": [
      {
        "name": "Wendy Lonergan",
        "title": "Vice President, General Manager Corporate Functions And Product Engineering",
        "linkedin_url": "https://www.linkedin.com/in/wendy-lonergan-2981b08",
        "role": "Decision Maker"
      },
      {
        "name": "Kelly Okamoto",
        "title": "Director Internal Communications",
        "linkedin_url": "https://www.linkedin.com/in/kellyo",
        "role": "Decision Maker"
      },
      {
        "name": "Stephen Tadman",
        "title": "Sr Director Global Infrastructure Engineering",
        "linkedin_url": "https://www.linkedin.com/in/stephen-tadman",
        "role": "Influencer"
      },
      {
        "name": "Ethan Warner",
        "title": "Director Of Learning And Development",
        "linkedin_url": "https://www.linkedin.com/in/ethan-warner-ab55364",
        "role": "Influencer"
      },
      {
        "name": "Kyle Harris",
        "title": "IT Director Lab Infrastructure",
        "linkedin_url": "https://www.linkedin.com/in/kyle-harris-b279b912",
        "role": "Influencer"
      },
      {
        "name": "Louise Summerton",
        "title": "Director Of Learning And Development",
        "linkedin_url": "https://www.linkedin.com/in/lhawker",
        "role": "Influencer"
      },
      {
        "name": "Joseph Lim",
        "title": "IT Director - Global IT Customer Support Experience & Engineering",
        "linkedin_url": "https://www.linkedin.com/in/joseph-lim-15986a12",
        "role": "Influencer"
      },
      {
        "name": "Jennifer Talerico",
        "title": "Senior Director Business Development",
        "linkedin_url": "https://www.linkedin.com/in/jennifertalerico",
        "role": "Evaluator"
      }
    ],
    "is_new": true
  },
  {
    "id": 9,
    "category": "Market Triggers",
    "company": "Delta Air Lines",
    "summary": "Delta Air Lines appointed Amala Duggirala as its new Chief Digital & Technology Officer (CDTO) in January 2026, following the retirement of long-serving CIO Rahul Samant. Duggirala's expanded role combines digital product development and enterprise technology infrastructure, with a stated focus on AI, data analytics, and enhancing both customer and employee experiences. Delta has explicitly positioned itself as a 'technology-driven consumer brand,' signaling active investment in enterprise digital tools.",
    "source_url": "https://www.travelandtourworld.com/news/article/delta-air-lines-appoints-amala-duggirala-as-chief-digital-technology-officer/",
    "why_vbrick": "Delta's incoming CDTO has a mandate to unify employee and customer digital experiences through technology. Vbrick supports large-scale employee communications for a workforce spread across hub airports globally. Section 508 compliance supports Delta's diverse workforce needs; Microsoft 365/Teams integration fits Delta's collaboration environment; real-time analytics gives the new CDTO measurable ROI on video investments.",
    "outreach_angle": "Delta's new CDTO is actively evaluating the enterprise technology stack to deepen Delta's identity as a tech-driven brand. Vbrick's enterprise video capabilities—real-time analytics, AI transcription, and Microsoft 365 integration—enable Delta to transform employee communications at scale, from hub briefings to executive all-hands.",
    "target_persona": "CDTO (Amala Duggirala) / VP Corporate Technology",
    "industry": "Aviation / Transportation",
    "urgency_score": 3,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "New CDTO Appointment + Digital Transformation",
    "finding_id": "",
    "employee_count": "~100,000",
    "is_fortune500": "Unverified",
    "stakeholders": [
      {
        "name": "Mahesh Sogal",
        "title": "Vice President - IT Transformation And International Technology",
        "linkedin_url": "https://www.linkedin.com/in/mahesh-sogal",
        "role": "Decision Maker"
      },
      {
        "name": "Narayanan Krishnakumar",
        "title": "VP And CTO",
        "linkedin_url": "https://www.linkedin.com/in/krishnakumarkk",
        "role": "Decision Maker"
      },
      {
        "name": "Trebor Banstetter",
        "title": "Managing Director - Corporate & Executive Communications",
        "linkedin_url": "https://www.linkedin.com/in/treborbanstetter",
        "role": "Decision Maker"
      },
      {
        "name": "Brian J Wright",
        "title": "Director, Global Learning & Leadership Development",
        "linkedin_url": "https://www.linkedin.com/in/bjwright1",
        "role": "Influencer"
      },
      {
        "name": "Michael Crownhart",
        "title": "Director - IT, TechOps Technology",
        "linkedin_url": "https://www.linkedin.com/in/michael-crownhart-115b536",
        "role": "Influencer"
      },
      {
        "name": "Jagat Kiran Gurugubelli",
        "title": "Sr. Network Engineer",
        "linkedin_url": "https://www.linkedin.com/in/jagat-kiran-gurugubelli-0a97971ba",
        "role": "Technical Evaluator"
      },
      {
        "name": "Geoff Kuchera",
        "title": "Senior Network Engineer",
        "linkedin_url": "https://www.linkedin.com/in/gkuchera",
        "role": "Technical Evaluator"
      },
      {
        "name": "Badie Naser",
        "title": "Senior Network Architect",
        "linkedin_url": "https://www.linkedin.com/in/badie-naser-35ab2734",
        "role": "Technical Evaluator"
      },
      {
        "name": "Dean Vanderkley",
        "title": "Information Security Manager",
        "linkedin_url": "https://www.linkedin.com/in/dean-vanderkley",
        "role": "Technical Evaluator"
      }
    ],
    "is_new": true
  },
  {
    "id": 10,
    "category": "Market Triggers",
    "company": "Stellantis",
    "summary": "Stellantis announced a mandatory full 5-day return-to-office policy for all US employees effective March 30, 2026, and directors and above starting February 16. The policy is framed as an 'enterprise-wide initiative' applying to all regions, with the tagline 'Back Together We Win.' This follows significant leadership turbulence at the automaker, including the departure of former CEO Carlos Tavares in late 2024 and ongoing cost-cutting pressures. The rollout requires coordinated internal video communications at scale to manage the cultural transition.",
    "source_url": "https://www.businessinsider.com/stellantis-return-to-office-5-days-us-staff-rto-2026-1",
    "why_vbrick": "Stellantis's global 5-day RTO initiative requires consistent executive video communications to a workforce spanning manufacturing plants across the US, Europe, and globally. Vbrick's eCDN handles simultaneous delivery across bandwidth-constrained plant environments; GDPR compliance addresses Stellantis's EU operations; real-time analytics measures adoption of the messaging.",
    "outreach_angle": "Stellantis is executing an enterprise-wide cultural reset via a global 5-day RTO. Vbrick enables leadership to communicate the 'Back Together We Win' message consistently to 300,000+ employees across manufacturing sites—with eCDN delivery that works even on plant-floor networks.",
    "target_persona": "CHRO / CIO / Head of Internal Communications",
    "industry": "Automotive Manufacturing",
    "urgency_score": 3,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "5-Day RTO Mandate + Leadership Transition",
    "finding_id": "",
    "employee_count": "~300,000+",
    "is_fortune500": "Unverified",
    "stakeholders": [
      {
        "name": "Kaynaz Behdin",
        "title": "Senior Vice President Global Digital Platforms, Data And AI",
        "linkedin_url": "https://www.linkedin.com/in/kaynaz-behdin-170725a6",
        "role": "Decision Maker"
      },
      {
        "name": "Daria Colvett",
        "title": "SVP & Chief Information Officer",
        "linkedin_url": "https://www.linkedin.com/in/daria-colvett-2238377",
        "role": "Decision Maker"
      },
      {
        "name": "Fernão Silveira",
        "title": "Sr. Vice President, Global Corporate Communications",
        "linkedin_url": "https://www.linkedin.com/in/fernaosilveira",
        "role": "Decision Maker"
      },
      {
        "name": "Kaileen Connelly",
        "title": "Senior Vice President, North America Communications",
        "linkedin_url": "https://www.linkedin.com/in/kcconnelly",
        "role": "Decision Maker"
      },
      {
        "name": "Tracie Stoltenburg",
        "title": "Director, Corporate Communications",
        "linkedin_url": "https://www.linkedin.com/in/traciestoltenburg",
        "role": "Decision Maker"
      },
      {
        "name": "Jayakanthan Venugopal",
        "title": "IT Director, Head Of IT Infrastructure, India And Asia Pacific",
        "linkedin_url": "https://www.linkedin.com/in/jayakanthan-venugopal-3ab37927",
        "role": "Influencer"
      },
      {
        "name": "Arnaud Bardet",
        "title": "Network Solution Architect",
        "linkedin_url": "https://www.linkedin.com/in/arnaud-bardet-230b1720",
        "role": "Technical Evaluator"
      },
      {
        "name": "Claudio Frencia",
        "title": "Head Of Cybersecurity",
        "linkedin_url": "https://www.linkedin.com/in/claudiofrencia",
        "role": "Technical Evaluator"
      }
    ],
    "is_new": true
  },
  {
    "id": 11,
    "category": "Market Triggers",
    "company": "Home Depot",
    "summary": "In January 2026, Home Depot announced that corporate employees must return to the office five days per week starting April 6, 2026—alongside cuts to some remote corporate roles. CEO Ted Decker cited the need for 'in-person engagement to facilitate deeper support for store and field associates' and to reinforce 'people-first culture.' The mandate directly affects Home Depot's large corporate and regional office workforce, requiring coordinated multi-site communications.",
    "source_url": "https://archieapp.co/blog/rto-companies-tracker/",
    "why_vbrick": "Home Depot's retail corporate structure—with a large Atlanta HQ and dozens of regional offices—benefits directly from Vbrick's eCDN-based delivery ensuring quality video communications across locations. The RTO creates an immediate need to communicate cultural messaging at scale. Microsoft 365/Teams integration supports Home Depot's enterprise collaboration environment.",
    "outreach_angle": "Home Depot's April 6 5-day RTO creates an immediate need for reliable, broadcast-quality executive video to reach its dispersed corporate workforce. Vbrick delivers CEO town halls and regional briefings across Home Depot's network without IT strain—turning the RTO into a cultural alignment opportunity.",
    "target_persona": "CIO / VP of Corporate Technology / Head of Internal Communications",
    "industry": "Retail",
    "urgency_score": 3,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "5-Day RTO Mandate + Corporate Restructuring",
    "finding_id": "",
    "employee_count": "~475,000",
    "is_fortune500": "Unverified",
    "stakeholders": [
      {
        "name": "Daniel Grider",
        "title": "Vice President of Technology, Head of Infrastructure Operations",
        "linkedin_url": "https://www.linkedin.com/in/danielgrider",
        "role": "Decision Maker"
      },
      {
        "name": "Josh Kruck",
        "title": "VP Technology",
        "linkedin_url": "https://www.linkedin.com/in/joshkruck",
        "role": "Decision Maker"
      },
      {
        "name": "Paul Antony",
        "title": "SVP of Technology",
        "linkedin_url": "https://www.linkedin.com/in/paulkantony",
        "role": "Decision Maker"
      },
      {
        "name": "Ann Mitchell Caren",
        "title": "Corporate Communications Manager",
        "linkedin_url": "https://www.linkedin.com/in/annpcaren",
        "role": "Decision Maker"
      },
      {
        "name": "Franck Meier",
        "title": "IT Director",
        "linkedin_url": "https://www.linkedin.com/in/franckmeier",
        "role": "Influencer"
      },
      {
        "name": "Stacie Heim",
        "title": "Director Contact Center Learning & Development",
        "linkedin_url": "https://www.linkedin.com/in/stacie-heim-6b357594",
        "role": "Influencer"
      },
      {
        "name": "Christy Duncan",
        "title": "Manager - Visual Communications",
        "linkedin_url": "https://www.linkedin.com/in/christy-duncan-1140794",
        "role": "Evaluator"
      },
      {
        "name": "Ilona Garland",
        "title": "Sr. Manager Cybersecurity",
        "linkedin_url": "https://www.linkedin.com/in/ilonagarland",
        "role": "Technical Evaluator"
      },
      {
        "name": "Christine White",
        "title": "Manager - Cybersecurity Governance",
        "linkedin_url": "https://www.linkedin.com/in/christine-white-a6a3ab7",
        "role": "Technical Evaluator"
      },
      {
        "name": "Alberto Luna",
        "title": "Sr. Network Engineer",
        "linkedin_url": "https://www.linkedin.com/in/alberto-luna-a4778973",
        "role": "Technical Evaluator"
      }
    ],
    "is_new": true
  },
  {
    "id": 12,
    "category": "Market Triggers",
    "company": "Paramount (Skydance Corporation)",
    "summary": "The Skydance-Paramount merger completed August 7, 2025, creating a new media entity. CEO David Ellison announced on March 31, 2026 that the company will consolidate Paramount+, BET+, and Pluto TV onto a single tech stack by end of Q2 2026, expecting >$2.5B in savings by year-end. The company also laid off ~2,000 employees (~10% of workforce) in October 2025 as part of merger integration. A potential Warner Bros. Discovery deal targeting Q3 2026 close would further complicate the IT landscape.",
    "source_url": "https://letsdatascience.com/news/paramount-pursues-merger-savings-through-tech-consolidation-04ffb228",
    "why_vbrick": "Post-merger IT consolidation at a major media company is a textbook platform replacement moment. Paramount's internal video infrastructure—previously fragmented across legacy CBS, Viacom, and BET systems—needs unification. Vbrick's enterprise video platform unifies internal communications under one platform with Microsoft 365/Teams integration, while real-time analytics proves engagement ROI for the new leadership team.",
    "outreach_angle": "Paramount is consolidating three streaming tech stacks under one platform by Q2 2026—a once-in-a-decade integration event. Vbrick is the enterprise video layer that unifies internal communications across legacy CBS, Viacom, and Skydance employee bases under a single, Microsoft-integrated platform.",
    "target_persona": "CIO / CTO / Head of Workplace Technology / Internal Communications Lead",
    "industry": "Media & Entertainment",
    "urgency_score": 3,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Post-M&A IT Consolidation + Workforce Restructuring",
    "finding_id": "",
    "employee_count": "~25,000+",
    "is_fortune500": "Unverified",
    "stakeholders": [
      {
        "name": "Shiva P",
        "title": "SVP of Infrastructure and Cloud Advancement",
        "linkedin": "https://www.linkedin.com/in/shivaparanandi"
      },
      {
        "name": "Marcin Kiełek",
        "title": "Senior Director, Infrastructure Engineering",
        "linkedin": "https://www.linkedin.com/in/marcinkielek"
      },
      {
        "name": "Linda C Davidoff",
        "title": "Executive Vice President, Chief Compliance Officer",
        "linkedin": "https://www.linkedin.com/in/lindacdavidoff"
      },
      {
        "name": "David Bittler",
        "title": "Executive Vice President, Communications",
        "linkedin": "https://www.linkedin.com/in/davidbittler"
      },
      {
        "name": "Phil Wiser",
        "title": "Chief Technology Officer and Head, Multiplatform Operations",
        "linkedin": "https://www.linkedin.com/in/phil-wiser-b8533"
      },
      {
        "name": "Ankur Patel",
        "title": "Director, Live Video Systems and Technology",
        "linkedin": "https://www.linkedin.com/in/ankur-patel-9223b645"
      },
      {
        "name": "Todd Rowen",
        "title": "Vice President Global Compliance",
        "linkedin": "https://www.linkedin.com/in/toddrowen"
      }
    ],
    "is_new": true
  },
  {
    "id": 13,
    "category": "Market Triggers",
    "company": "S&P Global",
    "summary": "S&P Global appointed Firdaus Bhathena (former Global CTO at FIS Global and former Enterprise CDO at CVS Health) as its new Chief Technology and Transformation Officer (CTTO) effective early 2026. The newly created role combines CTO duties with an explicit transformation charter to unify architecture, cloud spending, and security controls across divisions. CEO Martina Cheung cited 'productivity gains and faster product delivery' as immediate goals, with AWS and Anthropic partnerships expected to expand AI capabilities.",
    "source_url": "https://www.aicerts.ai/news/sp-globals-enterprise-strategic-transformation-gets-new-cto/",
    "why_vbrick": "S&P Global's new CTTO is creating unified technology governance across all divisions—an active platform consolidation opportunity. Vbrick's Microsoft 365/Teams integration and SOC II Type 2 compliance align with S&P's financial data security requirements. Real-time analytics provides the measurable ROI that the transformation-focused CTTO is chartered to deliver.",
    "outreach_angle": "S&P Global's new CTTO is consolidating enterprise tech under a single governance model. Vbrick's enterprise video platform—SOC II Type 2 certified, Microsoft-integrated, and analytics-rich—fits directly into the unified architecture Bhathena is building, turning enterprise video from a cost center into a measurable productivity lever.",
    "target_persona": "CTTO (Firdaus Bhathena) / CIO",
    "industry": "Financial Data / Information Services",
    "urgency_score": 3,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "New CTTO Appointment + Enterprise Strategic Transformation",
    "finding_id": "",
    "employee_count": "~35,000+",
    "is_fortune500": "Unverified",
    "stakeholders": [
      {
        "name": "Guruprasad Ramamoorthy",
        "title": "VP, Global Head of Cloud & Infrastructure",
        "linkedin": "https://www.linkedin.com/in/guruprasadramamoorthy"
      },
      {
        "name": "Joshua F",
        "title": "VP, Global Head of Digital Workplace",
        "linkedin": "https://www.linkedin.com/in/joshuafeliciano"
      },
      {
        "name": "Simon May",
        "title": "IT Director",
        "linkedin": "https://www.linkedin.com/in/simon-may-ab41832"
      },
      {
        "name": "Andre Lenzi",
        "title": "Associate Director AV and Unified Communications",
        "linkedin": "https://www.linkedin.com/in/andre-lenzi-73346a117"
      },
      {
        "name": "Swati Anuj Arya",
        "title": "Vice President - Global BISO",
        "linkedin": "https://www.linkedin.com/in/swatisharmainformationsecurity"
      },
      {
        "name": "Christina Twomey",
        "title": "Chief Communications Officer",
        "linkedin": "https://www.linkedin.com/in/christinatwomey"
      },
      {
        "name": "Bronwyn Kelly",
        "title": "Chief Learning Officer and VP, Global Talent Management",
        "linkedin": "https://www.linkedin.com/in/bronwynkelly"
      }
    ],
    "is_new": true
  },
  {
    "id": 14,
    "category": "Market Triggers",
    "company": "Starbucks",
    "summary": "Starbucks appointed Anand Varadarajan as EVP and CTO effective January 19, 2026 (succeeding interim CTO Ningyu Chen, who had held the role since Deb Hall Lefevre's retirement in September 2025). Varadarajan joins from Amazon (VP, Worldwide Grocery Technology and Supply Chain). CEO Brian Niccol, who joined from Chipotle in 2024, has been executing a 'Back to Starbucks' turnaround strategy requiring corporate staff to be in-office four days per week—creating consistent demand for broadcast-quality executive video communications.",
    "source_url": "https://fortune.com/2026/01/09/fortune-500-power-moves-2025-review-jan-9-2026/",
    "why_vbrick": "Starbucks's new CTO from Amazon brings enterprise-scale expectations. The company's 'Back to Starbucks' cultural transformation requires high-frequency CEO and leadership communications to 380,000 employees globally—from store partners to corporate staff. Vbrick's eCDN ensures smooth delivery across retail and corporate environments; Microsoft 365/Teams integration fits Starbucks's enterprise stack.",
    "outreach_angle": "Starbucks's new CTO from Amazon joins a company mid-turnaround, with a CEO running frequent all-hands to drive cultural change. Vbrick delivers Brian Niccol's vision reliably to 380,000 store partners and corporate employees—globally, at scale, and with the analytics to measure engagement.",
    "target_persona": "CTO (Anand Varadarajan) / CIO / VP of Internal Technology",
    "industry": "Food & Beverage / Retail",
    "urgency_score": 3,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "New CTO Appointment + RTO Mandate + Leadership Transformation",
    "finding_id": "",
    "employee_count": "~380,000",
    "is_fortune500": "Unverified",
    "stakeholders": [
      {
        "name": "Anand Varadarajan",
        "title": "Executive Vice President, Chief Technology Officer",
        "linkedin_url": "https://www.linkedin.com/in/anandvaradarajan",
        "role": "Decision Maker"
      },
      {
        "name": "Rohit Kapoor",
        "title": "EVP - Chief Digital And Technology Transformation Officer",
        "linkedin_url": "https://www.linkedin.com/in/rohit-kapoor-1578238",
        "role": "Decision Maker"
      },
      {
        "name": "Lori Torgerson",
        "title": "Director Of Corporate Communications",
        "linkedin_url": "https://www.linkedin.com/in/lori206",
        "role": "Decision Maker"
      },
      {
        "name": "Emily Albright",
        "title": "Corporate Communications",
        "linkedin_url": "https://www.linkedin.com/in/emily-albright-a5117983",
        "role": "Decision Maker"
      },
      {
        "name": "Scott Bockheim",
        "title": "Director Of Data And Enterprise Architecture",
        "linkedin_url": "https://www.linkedin.com/in/scottbockheim",
        "role": "Influencer"
      },
      {
        "name": "Imran Ali",
        "title": "Director, Infrastructure Services And Cloud Engineering",
        "linkedin_url": "https://www.linkedin.com/in/imranali2",
        "role": "Influencer"
      },
      {
        "name": "Howard Koh",
        "title": "Director, Infrastructure Services And Cloud Engineering",
        "linkedin_url": "https://www.linkedin.com/in/howard-koh-b96a1a230",
        "role": "Influencer"
      },
      {
        "name": "Suzie Haberland",
        "title": "Director HR Technology And Analytics",
        "linkedin_url": "https://www.linkedin.com/in/shaberland",
        "role": "Influencer"
      },
      {
        "name": "Guinevere Maxwell",
        "title": "HR Director - Starbucks Technology",
        "linkedin_url": "https://www.linkedin.com/in/guinevere-maxwell-mhrod-shrm-scp-975767",
        "role": "Influencer"
      }
    ],
    "is_new": true
  },
  {
    "id": 15,
    "category": "Market Triggers",
    "company": "U.S. Department of Transportation (DOT)",
    "summary": "The Department of Transportation completed a major IT transformation, migrating all 55,000 employees from Microsoft's collaboration suite to Google Workspace (Gmail, Docs, Meet, Gemini) under a $89M five-year contract signed September 2025. The agency's '1DOT IT' strategy aims to unify 425+ information systems, establish four 'digital factories,' and modernize IT infrastructure. The switch away from Microsoft creates an active evaluation window for enterprise video solutions that are platform-agnostic or Google Workspace-compatible.",
    "source_url": "https://www.meritalk.com/articles/dot-to-complete-google-workspace-rollout-in-coming-weeks/",
    "why_vbrick": "DOT's departure from Microsoft creates a specific opportunity: Vbrick's enterprise video platform integrates with both Microsoft Teams and Google Workspace environments, making it the neutral enterprise video layer during and after the transition. Vbrick's FedRAMP authorization is mandatory for federal cloud deployments; Section 508 compliance meets federal accessibility requirements. The 55,000-employee scale and multi-agency structure (including FAA) is purpose-built for Vbrick's eCDN architecture.",
    "outreach_angle": "DOT is completing a historic Microsoft-to-Google migration across 55,000 employees. Vbrick is the enterprise video platform that bridges both ecosystems—FedRAMP authorized, Section 508 compliant, and deployable across Microsoft and Google Workspace—giving DOT a unified video layer as it modernizes under '1DOT IT.'",
    "target_persona": "Chief Digital and Information Officer (Pavan Pidugu) / Deputy CIO",
    "industry": "Federal Government",
    "urgency_score": 3,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Major Cloud Migration + Digital Transformation Initiative",
    "finding_id": "",
    "employee_count": "~55,000",
    "is_fortune500": "Unverified",
    "stakeholders": [
      {
        "name": "Richard Keller",
        "title": "VP, IT Solution Delivery And Engagement Supervisory Program Manager",
        "linkedin": "https://www.linkedin.com/in/richard-a-keller"
      },
      {
        "name": "Cliff Sweney",
        "title": "Director, Enterprise Portfolio",
        "linkedin": "https://www.linkedin.com/in/cliff-sweney-474a2473"
      },
      {
        "name": "Donald Sanders",
        "title": "Executive Portfolio Director, Corporate Portfolio (A), Office Of Information And Technology (OIT)",
        "linkedin": "https://www.linkedin.com/in/dr-donald-sanders"
      },
      {
        "name": "Ron Haskell",
        "title": "Director of Broadcast and Video, Veterans Health Administration",
        "linkedin": "https://www.linkedin.com/in/ron-haskell-1b72b788"
      },
      {
        "name": "John D Oswalt",
        "title": "DCIO - FOIA, Records, Assessment, Compliance, & Privacy /Chief Privacy Officer",
        "linkedin": "https://www.linkedin.com/in/john-d-oswalt-0242117"
      },
      {
        "name": "Jack Galvin",
        "title": "Deputy Chief Information Officer, End User Services",
        "linkedin": "https://www.linkedin.com/in/jack-galvin-1866a386"
      },
      {
        "name": "Paul Tibbits",
        "title": "Executive Director, Workforce And Organization Development",
        "linkedin": "https://www.linkedin.com/in/paul-tibbits-md-579ab39"
      }
    ],
    "is_new": true
  },
  {
    "id": 16,
    "category": "Market Triggers",
    "company": "State Farm",
    "summary": "State Farm appointed Joe Park as CDIO in October 2025, followed by Jon Francis being promoted to Chief Data and Analytics Officer and Head of Digital Channel Performance in March 2026. In February 2026, State Farm announced it is an OpenAI Frontier platform launch partner—one of the first organizations using OpenAI for complex enterprise AI work. The company is actively building a 'culture centered on speed, agility, and innovation,' with explicit commitments to deploy AI capabilities across its 96 million policies and accounts.",
    "source_url": "https://newsroom.statefarm.com/state-farm-advances-ai-vision-through-collaboration-with-openai/",
    "why_vbrick": "State Farm's dual leadership appointments (CDIO + CDAO) and OpenAI launch partnership signal active enterprise tech evaluation. Insurance regulation requires FINRA-equivalent communications archiving. Vbrick's AI search/transcription aligns with State Farm's AI-first strategy; SOC II Type 2 meets the insurer's security requirements; Microsoft 365/Teams integration fits the collaboration environment. The new CDIO is in his first-year technology evaluation window.",
    "outreach_angle": "State Farm just became an OpenAI launch partner and has two new technology leaders in seat. Vbrick's AI-powered enterprise video platform—with AI search, transcription, and analytics—speaks directly to State Farm's AI-first mandate. SOC II Type 2 and compliance archiving meet the regulated insurance environment's non-negotiable security requirements.",
    "target_persona": "CDIO (Joe Park) / CDAO (Jon Francis) / VP of Enterprise Technology",
    "industry": "Insurance / Financial Services",
    "urgency_score": 3,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "New CDIO Appointment + AI Digital Transformation + OpenAI Partnership",
    "finding_id": "",
    "employee_count": "~54,000",
    "is_fortune500": "Unverified",
    "stakeholders": [
      {
        "name": "Joe Park",
        "title": "Executive Vice President and Chief Digital & Information Officer",
        "linkedin": "https://www.linkedin.com/in/josephrpark"
      },
      {
        "name": "Margo Hodges",
        "title": "Vice President Information Technology",
        "linkedin": "https://www.linkedin.com/in/margo-hodges-191408140"
      },
      {
        "name": "Brett Weber",
        "title": "Vice President Enterprise Technology",
        "linkedin": "https://www.linkedin.com/in/brett-weber-8a94926"
      },
      {
        "name": "Mike Fletcher",
        "title": "VP - Information Technology, Strategy And Business Alignment",
        "linkedin": "https://www.linkedin.com/in/mike-fletcher-0a53b9151"
      },
      {
        "name": "Sara Taulbee",
        "title": "Vice President Corporate Communications",
        "linkedin": "https://www.linkedin.com/in/sarataulbee"
      },
      {
        "name": "Brad House",
        "title": "Architecture Director - Technology",
        "linkedin": "https://www.linkedin.com/in/brad-house-4222162b"
      },
      {
        "name": "Sarah Beck",
        "title": "Information Security Director",
        "linkedin": "https://www.linkedin.com/in/sarah-beck-12a9a210"
      }
    ],
    "is_new": true
  },
  {
    "id": 17,
    "category": "Compliance & Regulatory",
    "company": "Regulation: FedRAMP 20x",
    "summary": "FedRAMP 20x is restructuring cloud authorization for federal agencies with a phased rollout culminating in wide-scale Low and Moderate adoption in FY26 Q3–Q4. As of January 2026, six new RFCs (0019–0024) were released, including RFC-0024 mandating machine-readable authorization packages with an initial compliance deadline of September 30, 2026. FedRAMP Consolidated Rules for 2026 (CR26) are scheduled for publication by June 2026 and will be valid through December 31, 2028. Phase 2 Moderate pilot participants were announced in November 2025, and Rev5 providers now face mandatory vulnerability transparency requirements under CA-7 updates — agencies cannot maintain an ATO without complete, timely vulnerability data from cloud providers.",
    "source_url": "https://www.fedramp.gov/20x/",
    "why_vbrick": "Vbrick's existing FedRAMP authorization positions it as a compliant-by-default video platform for federal agencies navigating the 20x transition. As agencies audit cloud services against the new machine-readable package requirements and tightened continuous monitoring standards, vendors without FedRAMP coverage face disqualification. Vbrick's FedRAMP status, combined with FIPS 140-2 encryption and real-time analytics, directly satisfies new CA-7 continuous monitoring obligations and gives federal IT procurement teams a lower-risk path to enterprise video deployment.",
    "outreach_angle": "",
    "target_persona": "Federal CIO, CISO, Cloud Architect",
    "industry": "Federal Government",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "regulatory_change",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 18,
    "category": "Compliance & Regulatory",
    "company": "Regulation: FedRAMP Rev5 Machine-Readable Packages (RFC-0024)",
    "summary": "RFC-0024, published January 2026, proposes mandatory machine-readable authorization packages for all FedRAMP Rev5 providers by September 30, 2026 (initial deadline) and September 30, 2027 (final deadline). Non-compliant providers risk revocation of their FedRAMP Certification. This is combined with RFC-0022 allowing temporary FedRAMP Validated status for services with existing SOC 2 Type II, ISO 27001, HITRUST, StateRAMP/GovRAMP, or CMMC Level 2 assessments — opening a faster federal market entry pathway for qualifying vendors.",
    "source_url": "https://www.governmentcontractslegalforum.com/2026/01/articles/government-contracts/fedramp-proposes-updates-to-authorization-process-six-new-rfcs-released-for-public-comment/",
    "why_vbrick": "Vbrick's FedRAMP authorization with SOC II Type 2 provides dual-path eligibility under both the legacy Rev5 track and the new 20x temporary validation path via RFC-0022. Federal agencies evaluating video platforms under the new acquisition criteria will prioritize vendors with existing certifications that satisfy multiple RFC requirements simultaneously. This creates a direct competitive moat for Vbrick against non-FedRAMP video competitors in federal procurements.",
    "outreach_angle": "",
    "target_persona": "Federal Procurement Officer, Agency CISO",
    "industry": "Federal Government",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "regulatory_change",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 19,
    "category": "Compliance & Regulatory",
    "company": "Regulation: CMMC 2.0 Phase 2",
    "summary": "CMMC 2.0 enforcement began November 10, 2025 with Phase 1 (self-assessment) now active across DoD solicitations. Phase 2 launches November 10, 2026, requiring mandatory C3PAO third-party assessments for Level 2 certification on contracts involving Controlled Unclassified Information (CUI). Approximately 80,000 defense contractors need Level 2 certification but only ~765 Certified CMMC Assessors are authorized — creating severe assessment bottlenecks. Contractors without a C3PAO assessment on record face award ineligibility and potential False Claims Act exposure for ongoing self-attestation. A February 2026 DFARS update eliminated the 7019/7020 framework, consolidating all obligations under DFARS 252.204-7021.",
    "source_url": "https://defensescoop.com/2025/11/10/cmmc-compliance-dod-enforcement-defense-industry-readiness-gaps/",
    "why_vbrick": "Defense contractors using video platforms to share, present, or collaborate on CUI must ensure those platforms meet NIST SP 800-171 controls. Vbrick's FedRAMP authorization and FIPS 140-2 encryption directly satisfy CMMC Level 2 technical requirements for secure communications infrastructure. As primes flow down CMMC requirements to subcontractors and the Phase 2 deadline approaches, procurement teams evaluating collaboration tools will prioritize platforms with existing DoD-aligned certifications. Vbrick's eCDN and on-premises deployment options also support air-gapped or restricted-network CUI environments.",
    "outreach_angle": "",
    "target_persona": "DoD Contractor CISO, IT Director, Compliance Officer",
    "industry": "Defense / Government Contracting",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "regulatory_change",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 20,
    "category": "Compliance & Regulatory",
    "company": "Regulation: FINRA 2026 Annual Regulatory Oversight Report",
    "summary": "FINRA's December 2025 Annual Regulatory Oversight Report (covering 2026 priorities) flags electronic communications capture failures, off-channel use, and inadequate supervision procedures as explicit examination findings. The report references recordkeeping lapses more than 50 times and recommends firms simulate regulatory examinations, monitor for unapproved channel use, and frequently refresh surveillance keywords. FINRA is increasingly holding individuals personally liable — barring individuals from association with any member firm for off-channel communications violations as recently as early 2026. A June 2025 action (Velox Clearing, $1.3M FINRA + $500K SEC) and an October 2025 former Wells Fargo broker fine demonstrate sustained enforcement focus at both institutional and individual levels.",
    "source_url": "https://www.finra.org/sites/default/files/2025-12/2026-annual-regulatory-oversight-report.pdf",
    "why_vbrick": "Financial services firms using video for client communications, earnings calls, training, or internal conferences must now demonstrate that those communications are captured, archived, and supervisable. Vbrick's FINRA-ready archiving capabilities — including immutable recording storage, searchable transcription, and audit trails — directly satisfy the recordkeeping obligations under FINRA Rule 4511 and Exchange Act Rule 17a-4(b)(4). The FINRA 2026 oversight report creates an immediate buying trigger for broker-dealers evaluating whether their video communication platforms meet the enhanced supervision and retention standards.",
    "outreach_angle": "",
    "target_persona": "Chief Compliance Officer, Head of Supervision, IT Director (Financial Services)",
    "industry": "Financial Services / Broker-Dealer",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "regulatory_change",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 21,
    "category": "Compliance & Regulatory",
    "company": "Regulation: FINRA Electronic Communications Recordkeeping — Enforcement Actions 2025",
    "summary": "FINRA levied an $850,000 fine in October 2025 against a broker-dealer and robo-advisory firm for losing 22 million client messages over six years due to coding errors and system transitions. The firm's written supervisory procedures were found inadequate — failing to ensure all communication sources (group mailboxes, customer support platforms) were connected to the review system. Over 500,000 communications went unreviewed. Separately, a $1.3M action against Velox Clearing (June 2025) for WeChat use, and a $10,000 fine plus one-year suspension for an individual broker who deleted off-channel text messages in October 2025.",
    "source_url": "https://www.questce.com/blog-recordkeeping-failures-lead-to-850k-finra-fine/",
    "why_vbrick": "These enforcement actions expose a systemic gap: firms are often unaware their communication capture systems have technical failures until regulators discover the gaps. Vbrick's archiving infrastructure — with tamper-evident audit logs, verified connection monitoring, and FINRA-ready search and retrieval — provides the supervisory oversight that FINRA is explicitly requiring in written procedures. Financial services firms evaluating video platforms will require demonstrable proof that all recorded sessions, live streams, and video messages are captured, retained, and connected to archiving services continuously.",
    "outreach_angle": "",
    "target_persona": "Chief Compliance Officer, VP Compliance Technology",
    "industry": "Financial Services / Broker-Dealer",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "enforcement_action",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 22,
    "category": "Compliance & Regulatory",
    "company": "Regulation: HIPAA — OCR Risk Analysis Initiative",
    "summary": "HHS OCR's Risk Analysis Initiative has produced 11 enforcement actions as of February 2026, all targeting failures to conduct accurate and thorough ePHI risk analyses. February 2026: Top of the World Ranch Treatment Center settled for $103,000 following a phishing attack that exposed 1,980 patients' ePHI. September 2025: Cadia Healthcare paid $182,000 for posting patient PHI (including photos and recovery stories) on its public website without HIPAA authorization — demonstrating that video and multimedia content involving patient PHI is under scrutiny. June 2025: Three settlements (Vision Upright MRI $5K, BayCare Health System $800K, Comstar $75K) reinforced access controls and risk analysis obligations.",
    "source_url": "https://www.hunton.com/privacy-and-cybersecurity-law-blog/hhs-ocr-settles-hipaa-security-rule-investigation-with-top-of-the-world-ranch-treatment-center-for-103-000",
    "why_vbrick": "Healthcare organizations using video for patient communications, telehealth sessions, employee training, or marketing content face HIPAA scrutiny on every recorded or streamed engagement involving PHI. Vbrick's HIPAA-compliant video platform — with encryption at rest and in transit, role-based access controls, audit logging, and BAA support — directly addresses the access control and risk management gaps OCR is citing in enforcement. The Cadia case specifically targets multimedia PHI disclosure without authorization, making compliant video content management a direct patient privacy risk vector for healthcare organizations.",
    "outreach_angle": "",
    "target_persona": "HIPAA Privacy Officer, CIO, CMO (Healthcare)",
    "industry": "Healthcare",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "enforcement_action",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 23,
    "category": "Compliance & Regulatory",
    "company": "Regulation: GDPR — EDPB 2026 Coordinated Enforcement Framework",
    "summary": "On March 19, 2026, the European Data Protection Board launched its Coordinated Enforcement Framework (CEF) action for 2026, targeting compliance with transparency and information obligations (GDPR Articles 12–14) across 25 DPAs in Europe. This follows the 2025 CEF focus on the right to erasure (Article 17). GDPR fines now exceed €7.1 billion cumulatively, with €1.2 billion imposed in 2025 alone. European DPAs receive 443 breach notifications per day — a 22% year-over-year increase. TikTok was fined €530 million in 2025 for cross-border data transfers. The EU-US Data Privacy Framework remains under challenge due to FISA Section 702 concerns.",
    "source_url": "https://www.edpb.europa.eu/news/news/2026/cef-2026-edpb-launches-coordinated-enforcement-action-transparency-and-information_en",
    "why_vbrick": "European enterprises using video platforms that route data through US infrastructure face direct exposure under the 2026 CEF transparency enforcement and ongoing cross-border transfer scrutiny. Vbrick's GDPR compliance posture — with data residency controls, encryption, consent management for recordings, and audit trails — addresses Articles 5, 25, 28, and 32 requirements that the EDPB is actively enforcing. Organizations with EU employee video communications (all-hands, training, executive town halls) need platforms that can demonstrate data processing transparency to DPAs participating in the 2026 CEF action.",
    "outreach_angle": "",
    "target_persona": "DPO, CISO, Head of Compliance (European Enterprises and US multinationals with EU operations)",
    "industry": "Enterprise / Multinational",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "regulatory_change",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 24,
    "category": "Compliance & Regulatory",
    "company": "Regulation: EU AI Act — August 2, 2026 Enforcement Deadline",
    "summary": "The EU AI Act's full enforcement for high-risk AI systems activates August 2, 2026, with penalties reaching €35 million or 7% of global turnover — exceeding GDPR's 4% cap. General-Purpose AI obligations (transparency, technical documentation) have been in effect since August 2, 2025. Article 12 requires high-risk AI systems to maintain audit logs for at least six months with full query-to-result traceability. AI literacy obligations (Article 4) became mandatory in February 2025. AI systems used for profiling in employment, education, or workplace monitoring contexts are classified as high-risk. The EU Commission's Digital Omnibus proposal (November 2025) proposes simplifying some obligations but remains unsettled.",
    "source_url": "https://www.kennedyslaw.com/en/thought-leadership/article/2026/the-eu-ai-act-implementation-timeline-understanding-the-next-deadline-for-compliance/",
    "why_vbrick": "Vbrick's AI search and transcription features — used across enterprise training, compliance recordings, and executive communications — will be evaluated against EU AI Act transparency and auditability requirements by European deployers. The August 2026 deadline creates an urgent procurement driver: enterprises using AI-enhanced video platforms that process EU employee or customer data must document AI system risk classifications, implement audit logging, and ensure human oversight mechanisms. Vbrick's ability to demonstrate AI transparency — showing how transcription and search outputs are generated and logged — differentiates it from black-box video AI competitors facing EU regulatory exposure.",
    "outreach_angle": "",
    "target_persona": "DPO, Chief AI Officer, General Counsel (European and US multinational enterprises)",
    "industry": "Enterprise / Technology / Financial Services",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "regulatory_change",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 25,
    "category": "Compliance & Regulatory",
    "company": "Regulation: Section 508 / ADA Title II — April 2026 Compliance Deadline",
    "summary": "ADA Title II's web and mobile app accessibility rule (WCAG 2.1 Level AA) requires all state and local governments serving populations of 50,000+ to comply by April 24, 2026, with smaller jurisdictions following by April 26, 2027. Section 508 remains in full force for federal agencies following the CHCOC guidance clarifying that DEI executive orders do not affect accessibility programs. GSA's FY 2025 Governmentwide Section 508 Assessment found continued federal noncompliance with Section 508 legal obligations, particularly around video and multimedia captioning. The DOJ intervened in Alcazar v. Fashion Nova (February 2026) signaling heightened scrutiny of ADA settlement quality. Harvard University was required to caption all online videos following a DOJ investigation.",
    "source_url": "https://www.section508.gov",
    "why_vbrick": "Government agencies and contractors procuring video platforms face a hard April 2026 deadline for WCAG 2.1 Level AA compliance — covering video captions, audio descriptions, and accessible player controls. Vbrick's Section 508 certification directly satisfies federal and state procurement requirements, enabling agencies to avoid the compliance exposure flagged in GSA's FY 2025 assessment. As state and local governments conduct urgency procurements ahead of the April 2026 deadline, Vbrick's Section 508 compliance eliminates a critical RFP disqualification criterion that non-compliant video vendors cannot overcome.",
    "outreach_angle": "",
    "target_persona": "Section 508 Program Manager, IT Procurement Officer, Accessibility Coordinator",
    "industry": "Federal Government / State & Local Government / Higher Education",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "regulatory_change",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 26,
    "category": "Compliance & Regulatory",
    "company": "Regulation: SEC Regulation S-P — Cybersecurity Incident Response",
    "summary": "Amendments to SEC Regulation S-P required larger broker-dealers to comply by December 3, 2025, with smaller entities required to comply by June 3, 2026. The amended rule requires firms to develop, implement, and maintain written policies and procedures for an incident response program reasonably designed to detect, respond to, and recover from unauthorized access to customer information. In November 2025, the SEC settled charges against a broker-dealer for Regulation S-P violations after branch offices experienced email account takeovers exposing ~8,500 individuals' PII. FINRA's 2026 report explicitly calls out Regulation S-P compliance as an examination priority for smaller entities ahead of the June 2026 deadline.",
    "source_url": "https://www.finra.org/sites/default/files/2025-12/2026-annual-regulatory-oversight-report.pdf",
    "why_vbrick": "Financial services firms using video platforms that store customer communications, advisory session recordings, or investor presentations must include those platforms in their Regulation S-P incident response programs. Vbrick's SOC II Type 2 certification, audit logging, role-based access controls, and documented breach notification procedures give financial services firms the evidence base required to demonstrate Regulation S-P technical controls during examinations. The June 2026 deadline for smaller broker-dealers creates an urgent compliance trigger for firms that have not yet audited their video infrastructure's security posture.",
    "outreach_angle": "",
    "target_persona": "CCO, CISO, IT Director (Financial Services)",
    "industry": "Financial Services",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "regulatory_change",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 27,
    "category": "Compliance & Regulatory",
    "company": "Regulation: ADA Title II — Video Captioning Enforcement",
    "summary": "The DOJ successfully required UC Berkeley to caption all online videos following an investigation under ADA Title III. Harvard University faced a $1.6M settlement for MOOC videos lacking captions. Over 4,600 digital accessibility lawsuits were filed in 2023, with federal courts upholding that digital platforms are places of public accommodation. The April 2026 ADA Title II compliance deadline for state and local governments (WCAG 2.1 AA for web/mobile content including videos) is creating urgency among government entities. GSA's FY 2025 assessment found the federal government 'continues to fall short of its legal and statutory obligations' on Section 508 — signaling that video accessibility enforcement risk is real and ongoing.",
    "source_url": "https://www.ada.gov/resources/2024-03-08-web-rule/",
    "why_vbrick": "Government agencies, universities, and healthcare systems using video platforms for public-facing content face direct ADA enforcement exposure if videos lack accurate captions, audio descriptions, and accessible player controls. Vbrick's Section 508-compliant platform with AI-powered transcription and auto-captioning provides both the technical accessibility features and the documented compliance posture required in ADA enforcement proceedings. As the April 2026 state/local government deadline triggers procurement urgency, Vbrick's Section 508 certification functions as a go/no-go vendor qualification criterion.",
    "outreach_angle": "",
    "target_persona": "Section 508 Coordinator, IT Procurement Manager, Accessibility Director",
    "industry": "Government / Higher Education / Healthcare",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "enforcement_action",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 28,
    "category": "Compliance & Regulatory",
    "company": "Regulation: EU AI Act — GPAI Obligations Active Since August 2025",
    "summary": "General-Purpose AI (GPAI) obligations under the EU AI Act became effective August 2, 2025, requiring providers to maintain technical documentation ('black-box dossiers'), publish dataset summaries, and demonstrate EU copyright compliance. AI literacy requirements (Article 4) became mandatory in February 2025 for all EU organizations deploying AI systems. By August 2026, transparency obligations (Article 50) require AI-generated content to be labeled — including AI-generated transcriptions, summaries, and search results. Enterprises deploying AI-powered features in video platforms (noise cancellation, transcription, smart summaries, semantic search) must classify those systems under the risk tier framework and meet corresponding obligations.",
    "source_url": "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
    "why_vbrick": "Vbrick's AI transcription and search features are deployed across enterprise video libraries used by EU organizations. The EU AI Act creates a vendor qualification requirement: enterprises will require video platform vendors to provide AI system documentation, risk tier classifications, and transparency disclosures as part of procurement due diligence. Vbrick's ability to deliver AI feature documentation, implement labeling for AI-generated content (transcripts, summaries), and support human oversight of AI outputs positions it as an EU AI Act-compliant video platform ahead of the August 2026 enforcement deadline.",
    "outreach_angle": "",
    "target_persona": "Chief AI Officer, DPO, Procurement Lead (European Enterprises)",
    "industry": "Enterprise / Financial Services / Healthcare",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "regulatory_change",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 29,
    "category": "Compliance & Regulatory",
    "company": "Regulation: CMMC 2.0 — CUI Video Communications in the Defense Supply Chain",
    "summary": "As CMMC Phase 2 approaches (November 10, 2026), 300,000+ Defense Industrial Base organizations must demonstrate that all systems handling CUI — including communications and collaboration platforms — meet NIST SP 800-171's 110 security controls. Prime contractors are already flowing CMMC requirements to subcontractors, creating a cascading compliance requirement throughout the defense supply chain. Video platforms used to present, discuss, or share technical data, program information, or controlled technical drawings during DoD-related work are in scope. A February 2026 DFARS update consolidated all assessment obligations, eliminating the 7019/7020 framework.",
    "source_url": "https://theodosian.com/blog/cmmc-2-0-what-defense-contractors-must-complete-before-november-2026",
    "why_vbrick": "Defense contractors and their subcontractors using video for technical program reviews, design discussions, or engineering collaboration that involves CUI must ensure their video platform meets NIST SP 800-171 controls. Vbrick's FedRAMP authorization (which encompasses NIST 800-53 controls, directly aligned with 800-171), FIPS 140-2 encryption, and on-premises deployment options address the CMMC control families for access management, audit and accountability, identification and authentication, and system and communications protection. With Phase 2's mandatory C3PAO assessment deadline approaching and contractor eligibility at stake, video platform compliance is a direct contract risk.",
    "outreach_angle": "",
    "target_persona": "CISO, Compliance Officer, IT Director (Defense Contractors)",
    "industry": "Defense / Aerospace / Government Contracting",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "regulatory_change",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 30,
    "category": "Compliance & Regulatory",
    "company": "Regulation: SEC / FINRA — Regulation S-P Email Account Takeover Enforcement",
    "summary": "In November 2025, the SEC settled charges against a broker-dealer for Regulation S-P violations (Rule 30(a) and Rule 201 of Regulation S-ID) after several branch offices experienced email account takeovers by unauthorized third parties, exposing PII of approximately 8,500 individuals. The SEC also cited failures in cyber intrusion detection, prevention, and mitigation policies. FINRA's 2026 oversight report identified Regulation S-P compliance as an examination priority, with smaller entities facing a June 3, 2026 mandatory compliance deadline for the amended safeguards rule covering incident response programs for unauthorized access to customer information.",
    "source_url": "https://www.jdsupra.com/legalnews/sec-and-finra-enforcement-trends-for-5067038/",
    "why_vbrick": "Broker-dealers and investment advisers using video platforms that store customer-related communications — advisory session recordings, client meeting videos, earnings presentations — must include those platforms in Regulation S-P incident response and safeguards programs. Vbrick's SOC II Type 2 audit, role-based access controls, and documented security architecture provide the technical safeguard evidence that Regulation S-P examiners require. The June 2026 deadline for smaller broker-dealers creates an immediate procurement trigger for firms replacing non-compliant video infrastructure.",
    "outreach_angle": "",
    "target_persona": "CCO, CISO, Chief Risk Officer (Financial Services)",
    "industry": "Financial Services",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "enforcement_action",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 31,
    "category": "Fortune 500 Accounts",
    "company": "UC Davis Health",
    "summary": "UC Davis Health (UCDH) issued a formal RFP (#09192025_Internal Communication & Employee Engagement Platform_UCDH) on September 19, 2025, for an Internal Communications & Employee Engagement Platform to serve 20,000+ employees and 1,000 students. The RFP explicitly requires: video publishing to mobile and web, video submission by employees, executive-to-all communications, push notifications, Microsoft SharePoint integration, AI/Generative AI support, and analytics dashboards. UCDH specified it is replacing its current intranet and requires compliance-grade access controls.",
    "source_url": "https://health.ucdavis.edu/media-resources/supply-chain/documents/fy26/09192025_BJ_RFP_InternalCommEmployeeEngPlatform.pdf",
    "why_vbrick": "This is a confirmed active procurement from a 20,000+ employee healthcare system. VBRICK's HIPAA compliance, Microsoft 365/SharePoint integration, AI transcription, role-based access, and video publishing (mobile and web) match every video-specific requirement in the RFP. The explicit requirement for AI/GenAI and 'support for communications/messaging between departments' maps to VBRICK's AI search and enterprise video management capabilities. While the RFP was issued in September 2025, the procurement is recent enough to be in implementation/vendor selection stage.",
    "outreach_angle": "",
    "target_persona": "CISO / VP Information Technology / Chief Communications Officer",
    "industry": "Healthcare / Higher Education",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "rfp_procurement",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 32,
    "category": "Fortune 500 Accounts",
    "company": "Defense Media Activity (DMA)",
    "summary": "DMA's FY2026 budget request ($226.7M) includes a specific investment to transition American Forces Network (AFN) and Media Production to a 'cloud/hybrid production system.' The FY2026 justification states a '+$3,548 thousand increase due to provide funding for much needed FSRM projects' and identifies cloud migration of its media systems as a priority. DMA is the DoD's mass media organization, producing audio-visual content for military audiences worldwide across video, radio, and digital platforms.",
    "source_url": "https://comptroller.war.gov/Portals/45/Documents/defbudget/FY2026/budget_justification/pdfs/01_Operation_and_Maintenance/O_M_VOL_1_PART_1/DMA_OP-5.pdf",
    "why_vbrick": "DMA's cloud/hybrid production migration is a direct video infrastructure procurement signal. VBRICK's FedRAMP authorization, FIPS 140-2 compliance, and military-grade security make it a natural candidate for DMA's cloud video platform. The agency's mission—distributing video content to authorized military audiences globally—maps precisely to VBRICK's enterprise video streaming and eCDN capabilities. A FY2026 budget line already exists for this transition, lowering procurement barriers.",
    "outreach_angle": "",
    "target_persona": "DMA Director / DoD Visual Information Program Manager",
    "industry": "Federal Government / Defense Media",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "federal_contract",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 33,
    "category": "Fortune 500 Accounts",
    "company": "Microsoft",
    "summary": "Microsoft announced in January 2026 that it will move advanced Teams town hall features—including Enterprise Content Delivery Network (eCDN) support—from Teams Premium to Teams core (effective April 1, 2026). This means all enterprise Teams users now have access to eCDN configuration for town halls, but must choose between Microsoft eCDN and certified third-party eCDN partners (VBRICK, Hive, Kollective, Ramp). The change expands the addressable market for partner eCDN providers to every Microsoft 365 enterprise customer running large-scale events without Teams Premium licenses.",
    "source_url": "https://tomtalks.blog/microsoft-teams-april-2026-licensing-update-microsoft-places-and-advanced-town-hall-and-webinar-features-move-into-teams-core/",
    "why_vbrick": "This policy change is the single most significant market driver for VBRICK's eCDN business in 2026. Every Microsoft 365 enterprise customer (10,000+ employee organizations) now has a decision to make: use Microsoft eCDN (limited analytics, basic features) or deploy VBRICK's enterprise-grade eCDN with real-time analytics, deeper compliance reporting, and advanced event management. Organizations running FINRA, HIPAA, FedRAMP, or GDPR workloads have strong incentives to choose VBRICK over the native Microsoft option. This creates a pipeline of every large Teams customer approaching their first town hall after April 2026.",
    "outreach_angle": "",
    "target_persona": "Microsoft 365 Admin / IT Infrastructure Lead / Enterprise Communications Director",
    "industry": "Cross-Industry (Microsoft Teams Customers)",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "tech_stack_change",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [
      {
        "name": "Noelle Walsh",
        "title": "Corporate Vice President, Microsoft Cloud Operations + Innovation",
        "linkedin": "https://www.linkedin.com/in/noelle-walsh-b29356108"
      },
      {
        "name": "Keith Boyd",
        "title": "Senior Director Microsoft Digital",
        "linkedin": "https://www.linkedin.com/in/keithalanboyd"
      },
      {
        "name": "Melanie Simpson",
        "title": "CVP Human Resources E+D T&R",
        "linkedin": "https://www.linkedin.com/in/melanie-simpson-ms"
      },
      {
        "name": "Britt Aylor",
        "title": "Director, Leadership Development",
        "linkedin": "https://www.linkedin.com/in/brittaylor"
      },
      {
        "name": "Jeff Tyler",
        "title": "Director of Media Experience",
        "linkedin": "https://www.linkedin.com/in/jeff-tyler-65827089"
      },
      {
        "name": "Raymond Linz",
        "title": "Service Reliability Engineer Networking",
        "linkedin": "https://www.linkedin.com/in/raylinz"
      },
      {
        "name": "Geoff Belknap",
        "title": "CVP, Deputy CISO (Core and M&A)",
        "linkedin": "https://www.linkedin.com/in/geoffbelknap"
      }
    ],
    "is_new": true
  },
  {
    "id": 34,
    "category": "Fortune 500 Accounts",
    "company": "FedRAMP-Authorized Agency Customers (Broad Federal Signal)",
    "summary": "FedRAMP 20x Phase 2 launched in early FY2026, with wide-scale adoption of 20x Low and Moderate authorizations targeted for FY26 Q3-Q4. FedRAMP director Pete Waterman confirmed at a January 2026 event that '2026 is when we deliver,' emphasizing expanded agency adoption and the retirement of the legacy Rev5 Low/Moderate authorization path by mid-FY2027. Agencies are actively re-evaluating cloud tool portfolios to ensure FedRAMP compliance ahead of these deadlines—creating procurement windows for FedRAMP-authorized video platforms across civilian and defense agencies.",
    "source_url": "https://www.fedramp.gov/2025-09-30-fedramp-built-a-modern-foundation-in-fy25-to-deliver-massive-improvements-in-fy26/",
    "why_vbrick": "VBRICK's existing FedRAMP authorization positions it as a day-one compliant solution for agencies accelerating their FedRAMP 20x portfolio reviews. As agencies audit and rationalize legacy video tools (many of which are not FedRAMP-authorized), VBRICK is a natural replacement candidate. The September 30, 2026 deadline for initial Rev5 machine-readable package compliance creates urgency for agencies to lock in FedRAMP-authorized tools before the audit window. VBRICK should proactively target agency CISO and IT modernization offices in Q2 2026.",
    "outreach_angle": "",
    "target_persona": "Federal Agency CISO / IT Modernization Officer",
    "industry": "Federal Government (Broad)",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "federal_contract",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 35,
    "category": "Competitor Intelligence",
    "company": "Utah Valley University",
    "summary": "Enterprise Kaltura customer at Utah Valley University reports Kaltura customer service as 'horrendous' — over a month without response to a support email even after CC'ing their dedicated customer success manager and technical rep. The reviewer states it is 'by far the worst' technology managed at the university for support responsiveness.",
    "source_url": "https://www.capterra.com/p/121484/Kaltura-Video-Platform/reviews/",
    "why_vbrick": "VBRICK offers dedicated enterprise support with guaranteed SLA response times and a named CSM model. Kaltura's chronic support failures at higher education institutions open the door for VBRICK's campus-wide video management play, especially for institutions also needing ADA/Section 508 compliance.",
    "outreach_angle": "Lead with support SLA comparison — 'What does a month without a support response cost your institution?' Position VBRICK's named support and Section 508 compliance as a direct upgrade path.",
    "target_persona": "VP of Information Technology / Director of EdTech",
    "industry": "Higher Education",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Support Failure",
    "finding_id": "",
    "competitor": "Kaltura",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 36,
    "category": "Competitor Intelligence",
    "company": "Enterprise Health/Wellness Company (Anonymous G2 Reviewer)",
    "summary": "A verified enterprise customer in health/wellness (>1,000 employees) reports that during P1 and P2 incidents caused by Kaltura's cloud migration, the support team did not act with urgency. The customer had to repeatedly chase the account manager and support team for updates on critical outages. Multiple P1 issues stemming from the migration were reported.",
    "source_url": "https://alternatives.co/software/kaltura/reviews/",
    "why_vbrick": "VBRICK's platform is FedRAMP authorized and SOC II Type 2 certified — both signals of rigorous uptime and incident management standards. VBRICK's eCDN also reduces reliance on cloud delivery paths that caused Kaltura's migration-era instability.",
    "outreach_angle": "Reference Kaltura's cloud migration P1 handling failures. Offer a risk-free VBRICK proof-of-concept with measured uptime SLA and escalation path documentation.",
    "target_persona": "CIO / CISO / VP of IT Operations",
    "industry": "Healthcare",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Service Outage / P1 Incident Handling",
    "finding_id": "",
    "competitor": "Kaltura",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 37,
    "category": "Competitor Intelligence",
    "company": "Kaltura Enterprise Customers (Broad)",
    "summary": "Kaltura's FY2025 10-K filing reports ARR declined 3% year-over-year to $168.2M, Net Dollar Retention fell to 97%, and the number of large customers ($1M+ ARR) declined slightly. Revenue in the Media & Telecom segment dropped 7% in 2025. The company is pivoting sharply toward 'agentic AI' and acquiring PathFactory — signaling a strategic shift away from core video platform investment.",
    "source_url": "https://www.investing.com/news/company-news/kaltura-q4-2025-slides-profitability-soars-amid-ai-pivot-93CH-4564200",
    "why_vbrick": "Customers who purchased Kaltura for enterprise video management may find that Kaltura's roadmap is drifting toward conversational AI and content marketing, deprioritizing the video security, eCDN, and compliance features that regulated enterprises need. VBRICK is purpose-built for enterprise video with no strategic distraction.",
    "outreach_angle": "Ask prospects: 'Is your video platform vendor's roadmap still focused on enterprise video, or are they pivoting away?' Position VBRICK as the purpose-built alternative with a stable, compliance-first roadmap.",
    "target_persona": "CTO / VP of Digital Workplace",
    "industry": "Financial Services / Government / Healthcare",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Financial Health / Retention Risk",
    "finding_id": "",
    "competitor": "Kaltura",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 38,
    "category": "Competitor Intelligence",
    "company": "Microsoft Teams Enterprise Customers (Broad)",
    "summary": "Teams Town Hall (the replacement for Live Events) has documented feature gaps that organizations with complex event workflows are encountering: no ability to see presenter names for attendees, no attendee promotion mid-event, re-inviting attendees causes cancellation/re-invitation to all, panelists/hosts cannot see attendee names, and presenters must be manually moved 'on stage.' Town Hall Premium features (100K capacity, custom branding) require an additional $10/user/month Teams Premium license.",
    "source_url": "https://www.reddit.com/r/MicrosoftTeams/comments/1ba6gsy/teams_town_hall_feature_gaps/",
    "why_vbrick": "VBRICK provides a complementary enterprise video layer on top of Teams that preserves the meeting interface while adding production-grade event management, eCDN bandwidth management, and compliance recording — without the feature gaps of Town Hall or the extra cost of Teams Premium.",
    "outreach_angle": "Target event owners frustrated by Town Hall limitations. Position VBRICK as the professional production layer that fills the capability gap without requiring Teams Premium.",
    "target_persona": "Director of Corporate Communications / Event Technology Manager",
    "industry": "Enterprise (Cross-industry)",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Integration/Scale Limitation",
    "finding_id": "",
    "competitor": "Microsoft Stream/Teams Live Events",
    "stakeholders": [
      {
        "name": "Noelle Walsh",
        "title": "Corporate Vice President, Microsoft Cloud Operations + Innovation",
        "linkedin": "https://www.linkedin.com/in/noelle-walsh-b29356108"
      },
      {
        "name": "Keith Boyd",
        "title": "Senior Director Microsoft Digital",
        "linkedin": "https://www.linkedin.com/in/keithalanboyd"
      },
      {
        "name": "Melanie Simpson",
        "title": "CVP Human Resources E+D T&R",
        "linkedin": "https://www.linkedin.com/in/melanie-simpson-ms"
      },
      {
        "name": "Britt Aylor",
        "title": "Director, Leadership Development",
        "linkedin": "https://www.linkedin.com/in/brittaylor"
      },
      {
        "name": "Jeff Tyler",
        "title": "Director of Media Experience",
        "linkedin": "https://www.linkedin.com/in/jeff-tyler-65827089"
      },
      {
        "name": "Raymond Linz",
        "title": "Service Reliability Engineer Networking",
        "linkedin": "https://www.linkedin.com/in/raylinz"
      },
      {
        "name": "Geoff Belknap",
        "title": "CVP, Deputy CISO (Core and M&A)",
        "linkedin": "https://www.linkedin.com/in/geoffbelknap"
      }
    ],
    "is_new": true
  },
  {
    "id": 39,
    "category": "Competitor Intelligence",
    "company": "Zoom Enterprise Customers (Security-Sensitive)",
    "summary": "CVE-2025-49457 (CVSS 9.6, Critical) — an untrusted search path vulnerability in Zoom Clients for Windows — was disclosed in August 2025, allowing unauthenticated remote privilege escalation. CVE-2025-49464 (buffer overflow, DoS) was also published July 2025. In January 2026, CVE-2026-22844 (CVSS 9.9, Critical RCE) was disclosed affecting Zoom Node Multimedia Routers. These are the third and fourth critical Windows client vulnerabilities in a recurring pattern, with Zoom's ZeroPath analysis noting 'ongoing challenges in secure Windows application development.'",
    "source_url": "https://securityaffairs.com/181140/security/zoom-patches-critical-windows-flaw-allowing-privilege-escalation.html",
    "why_vbrick": "For regulated enterprises — particularly in financial services, healthcare, and federal government — VBRICK's FedRAMP, FIPS 140-2, and SOC II Type 2 posture represent a fundamentally more rigorous security architecture than Zoom's history of critical CVEs. VBRICK's CISO-level compliance stack can be presented as the standard Zoom cannot meet.",
    "outreach_angle": "Security-first: 'Three critical Windows client CVEs in 12 months — two allowing privilege escalation, one RCE. For HIPAA/FINRA-regulated video, VBRICK's FIPS 140-2 and FedRAMP posture provides the audit-defensible security standard Zoom cannot.'",
    "target_persona": "CISO / VP of Information Security",
    "industry": "Financial Services / Healthcare / Federal Government",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Security Vulnerability",
    "finding_id": "",
    "competitor": "Zoom Events/Webinars",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 40,
    "category": "Competitor Intelligence",
    "company": "Financial Services Firms (Zoom Users)",
    "summary": "Zoom's FINRA/SEC compliance requires organizations to configure archiving, audit logs, and recording controls manually — there is no native FINRA-ready archiving infrastructure. Experts identify the biggest Zoom compliance gaps in regulated environments as 'unmanaged recordings, overprivileged admins, and unmonitored third-party apps.' Zoom's AI features introduce additional data governance risk requiring separate tooling. The FTC settled deceptive security practice charges against Zoom (finalized January 2021), creating a documented history that is cited in regulated industry compliance audits.",
    "source_url": "https://www.reco.ai/hub/zoom-compliance",
    "why_vbrick": "VBRICK offers FINRA-ready archiving natively, with immutable retention policies, chain-of-custody audit trails, and SEC 17a-4 compatible storage. This eliminates the compliance gap that Zoom creates and removes the need for third-party archiving overlays.",
    "outreach_angle": "Compliance displacement: 'Your Zoom instance creates FINRA audit risk. VBRICK's built-in FINRA-ready archiving eliminates the compliance gap and reduces the third-party tooling burden on your IT team.'",
    "target_persona": "Chief Compliance Officer / Head of Technology Risk / IT Director",
    "industry": "Financial Services",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Compliance Gap",
    "finding_id": "",
    "competitor": "Zoom Events/Webinars",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 41,
    "category": "Competitor Intelligence",
    "company": "Healthcare Organizations (Zoom Users)",
    "summary": "While Zoom offers HIPAA-capable configurations, compliance requires specific paid business plans, a signed BAA, and significant manual security configuration by the customer. The 2025 HIPAA rule updates — including mandatory Zero Trust frameworks, required MFA for all ePHI access points, and 30-day breach notification windows — raise the configuration burden for Zoom significantly. Zoom's recurring CVEs increase the risk surface for PHI exposure during video sessions.",
    "source_url": "https://www.hipaavault.com/resources/2025-hipaa-new-regulations/",
    "why_vbrick": "VBRICK's HIPAA-ready platform provides out-of-the-box compliance posture with documented controls, reducing the configuration burden on healthcare IT teams already stretched by 2025 HIPAA rule changes. Combined with AI transcription and search, VBRICK adds clinical communication value beyond basic video hosting.",
    "outreach_angle": "HIPAA update angle: 'The 2025 HIPAA Zero Trust and MFA mandates just got harder to meet on Zoom. VBRICK's HIPAA-ready architecture includes the controls you'd have to manually configure and audit on Zoom.'",
    "target_persona": "CISO / IT Security Manager / Compliance Officer",
    "industry": "Healthcare",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Compliance Gap",
    "finding_id": "",
    "competitor": "Zoom Events/Webinars",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 42,
    "category": "Competitor Intelligence",
    "company": "Qumu Enterprise Customers",
    "summary": "Qumu was acquired by Enghouse Systems in February 2023 for just $18 million — a steep decline from its peak valuation. Post-acquisition, Qumu operates as a subsidiary of Enghouse's video portfolio alongside Vidyo. Enghouse has a history of acquiring and maintaining (but not aggressively developing) niche software. There is minimal public evidence of significant Qumu product investment or R&D output since 2023. The platform's innovation trajectory has effectively stalled.",
    "source_url": "https://futurumgroup.com/insights/enghouse-systems-to-acquire-qumu-for-18-million-in-an-all-cash-deal/",
    "why_vbrick": "VBRICK is the purpose-built, actively invested enterprise video platform for large organizations. Qumu accounts with multi-year contracts expiring in 2025–2026 are now evaluating a platform that has seen minimal development for two years under Enghouse. VBRICK's FedRAMP, FIPS 140-2, and AI search/transcription features represent a generational leap over a stagnant Qumu build.",
    "outreach_angle": "Account displacement: 'Qumu has had no meaningful platform investment since the Enghouse acquisition at $18M. If your contract is up, this is the right time to evaluate a platform that's actively built for the next generation of enterprise video.'",
    "target_persona": "CTO / VP of IT / Director of Corporate Communications",
    "industry": "Enterprise (Cross-industry) / Financial Services",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Product Discontinuation / Acquisition",
    "finding_id": "",
    "competitor": "Qumu",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 43,
    "category": "Competitor Intelligence",
    "company": "Vimeo Enterprise Customers (Bandwidth-Heavy)",
    "summary": "Vimeo enforces a hard 2TB/month bandwidth cap on all plans below Enterprise. Exceeding this threshold in two separate months or hitting 10TB in one month triggers mandatory Enterprise upgrade discussions, with users consistently reporting quotes starting at $6,000–$10,000+/year. Vimeo does not publish Enterprise pricing, and security features like DRM, watermarking, geo-blocking, and domain restrictions are exclusively bundled into Enterprise — creating a significant pricing cliff for growing video operations.",
    "source_url": "https://swarmify.com/blog/vimeo-pricing-bandwidth-limits/",
    "why_vbrick": "VBRICK's eCDN architecture is purpose-built to handle high-bandwidth enterprise video without per-GB cost penalties. For organizations facing Vimeo's bandwidth cliff, VBRICK's eCDN reduces egress costs while improving delivery performance at scale.",
    "outreach_angle": "Pricing displacement: 'Getting a surprise email from Vimeo about bandwidth overages and a $10K Enterprise quote? VBRICK's eCDN-first architecture is built for high-volume enterprise video without the bandwidth cliff.'",
    "target_persona": "VP of Marketing / Director of Digital Experience / CFO",
    "industry": "Enterprise (Cross-industry)",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Pricing Concern",
    "finding_id": "",
    "competitor": "Vimeo Enterprise",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 44,
    "category": "Competitor Intelligence",
    "company": "Panopto Enterprise/Higher Education Customers",
    "summary": "Panopto's NA Cloud experienced an 'Elevated Archive Restoration Error Rates' incident from January 6–12, 2026 (6+ days). During this period, archived content restoration was significantly delayed or failed. The Panopto community forum confirms the maximum restoration window was extended from 48 hours to 72 hours as a policy change in late 2025, with one community member noting archive restores can exceed the 72-hour estimate. The January 2026 incident left institutions unable to access archived lecture and training content during exam periods.",
    "source_url": "https://cit.ua.edu/known-issue-restoring-panopto-archives-issue/",
    "why_vbrick": "VBRICK's content management architecture provides enterprise-grade retention and reliable on-demand access with audit-backed SLAs. For institutions requiring always-available compliance archives (FINRA, HIPAA, legal hold), VBRICK's dependable archiving is a significant differentiator over Panopto's recurring archive restoration issues.",
    "outreach_angle": "Reliability case: 'A 6-day archive restoration outage during January exams is unacceptable. VBRICK's enterprise archiving includes SLA guarantees and is backed by FedRAMP-level operational controls.'",
    "target_persona": "CIO / Director of EdTech / VP of Learning & Development",
    "industry": "Higher Education / Enterprise L&D",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Service Outage",
    "finding_id": "",
    "competitor": "Panopto",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 45,
    "category": "Competitor Intelligence",
    "company": "Kaltura Education Customers (LMS-Integrated)",
    "summary": "A verified Kaltura customer in Program Development (small business) reports on G2 that 'even paying the platinum assistance' plan, it took more than 3 months to identify a support issue, with problems that are 'never corrected/solved' and a 'lack of information regarding technical issues.' A second enterprise review (Health/Wellness) describes Kaltura's P1 cloud migration issues requiring the customer to chase both account manager and support team repeatedly for updates.",
    "source_url": "https://alternatives.co/software/kaltura/reviews/",
    "why_vbrick": "VBRICK's named enterprise support model with defined escalation paths and compliance-grade incident management (SOC II Type 2) provides a materially different support experience than Kaltura's documented failures. This is an active wedge opportunity in accounts with upcoming Kaltura renewals.",
    "outreach_angle": "Support-led displacement at Kaltura renewals: 'Three months to identify a P1 on your premium support plan? VBRICK's enterprise support includes a named CSM, defined escalation SLAs, and SOC II audited incident management.'",
    "target_persona": "VP of IT / Director of Learning Systems / CIO",
    "industry": "Higher Education / Healthcare",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Support Failure",
    "finding_id": "",
    "competitor": "Kaltura",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 46,
    "category": "Competitor Intelligence",
    "company": "Microsoft Teams Enterprise Customers (Large-Scale Events)",
    "summary": "Microsoft Teams Town Hall default capacity is 10,000 attendees; reaching 100,000 requires Teams Premium ($10/user/month add-on) AND a two-week advance request to Microsoft's LEAP team. Concurrent event limit is 15 (50 with Premium). Town Hall lacks native eCDN capabilities — organizations with distributed corporate networks will experience bandwidth congestion when streaming large all-hands events without a third-party eCDN layer. Microsoft's own documentation does not provide a native eCDN solution within Town Hall.",
    "source_url": "https://support.microsoft.com/en-us/office/switch-from-microsoft-teams-live-events-to-town-halls-c71bf6e2-ece1-4809-900e-51271f39ac72",
    "why_vbrick": "VBRICK's eCDN is the direct solution for enterprises facing Teams Town Hall bandwidth constraints. Rather than paying for Teams Premium to reach higher attendee limits, VBRICK's eCDN dramatically reduces WAN bandwidth consumption for internal streams while keeping the familiar Teams interface.",
    "outreach_angle": "eCDN value prop: 'Teams Town Hall bandwidth will crush your corporate WAN during all-hands meetings. VBRICK's eCDN works alongside Teams to deliver 50,000-seat all-hands events without buying Teams Premium or upgrading your network.'",
    "target_persona": "IT Infrastructure Director / VP of Internal Communications / M365 Admin",
    "industry": "Enterprise (Cross-industry)",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Integration/Scale Limitation",
    "finding_id": "",
    "competitor": "Microsoft Stream/Teams Live Events",
    "stakeholders": [
      {
        "name": "Noelle Walsh",
        "title": "Corporate Vice President, Microsoft Cloud Operations + Innovation",
        "linkedin": "https://www.linkedin.com/in/noelle-walsh-b29356108"
      },
      {
        "name": "Keith Boyd",
        "title": "Senior Director Microsoft Digital",
        "linkedin": "https://www.linkedin.com/in/keithalanboyd"
      },
      {
        "name": "Melanie Simpson",
        "title": "CVP Human Resources E+D T&R",
        "linkedin": "https://www.linkedin.com/in/melanie-simpson-ms"
      },
      {
        "name": "Britt Aylor",
        "title": "Director, Leadership Development",
        "linkedin": "https://www.linkedin.com/in/brittaylor"
      },
      {
        "name": "Jeff Tyler",
        "title": "Director of Media Experience",
        "linkedin": "https://www.linkedin.com/in/jeff-tyler-65827089"
      },
      {
        "name": "Raymond Linz",
        "title": "Service Reliability Engineer Networking",
        "linkedin": "https://www.linkedin.com/in/raylinz"
      },
      {
        "name": "Geoff Belknap",
        "title": "CVP, Deputy CISO (Core and M&A)",
        "linkedin": "https://www.linkedin.com/in/geoffbelknap"
      }
    ],
    "is_new": true
  },
  {
    "id": 47,
    "category": "Competitor Intelligence",
    "company": "Brightcove Media/Enterprise Customers (Post-Acquisition)",
    "summary": "Bending Spoons (Brightcove's acquirer since February 2025) announced an 18-feature platform improvement backlog for late 2025 and a 2026 roadmap focused on AI Suite expansion and a 'complete overhaul of Video Cloud UI.' However, with only ~80 employees remaining post-layoff (from 600+), the execution capacity for this roadmap is in serious question. FastPix analysis notes Brightcove's 'engineering talent exodus raises real questions about how quickly the platform can evolve.' Enterprise customers are being asked to commit to multi-year contracts under significant product delivery uncertainty.",
    "source_url": "https://tvnewscheck.com/tech/article/brightcove-unveils-2026-roadmap-focusing-on-ai-innovation-user-experience/",
    "why_vbrick": "VBRICK's stable engineering team and active roadmap — including AI search, transcription, and compliance features — offers Brightcove customers a proven path forward without betting on a post-acquisition rebuild. VBRICK's 20+ years of enterprise video focus, rather than an app portfolio company's diversification, provides a more credible product trajectory.",
    "outreach_angle": "Roadmap credibility: 'Brightcove has 80 employees delivering an ambitious 2026 roadmap after losing 85% of their staff. VBRICK's proven engineering team has been delivering enterprise video for 20+ years — let's show you what's on our roadmap.'",
    "target_persona": "VP of Digital Strategy / CTO / Director of Media Technology",
    "industry": "Media / Financial Services / Enterprise",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Product Roadmap Uncertainty",
    "finding_id": "",
    "competitor": "Brightcove",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 48,
    "category": "Market Triggers",
    "company": "JPMorgan Chase",
    "summary": "JPMorgan Chase enforced a full 5-day-per-week return-to-office mandate for all 316,000+ employees starting March 2025, which remained in force through 2026. Employees filed petitions against the policy (rejected by leadership), creating sustained workforce tension that elevates the need for high-quality all-hands, town halls, and executive video communications. The bank simultaneously accelerated its technology-driven transformation, with CEO Jamie Dimon communicating frequently via video to the full workforce.",
    "source_url": "https://hubblehq.com/blog/famous-companies-workplace-strategies",
    "why_vbrick": "With 316,000 employees back in offices globally, JPMorgan requires enterprise video infrastructure that handles simultaneous large-audience delivery without saturating corporate networks. Vbrick's FINRA-ready archiving is purpose-built for the bank's compliance obligations; SOC II Type 2 and FIPS 140-2 certifications meet JPMorgan's security posture requirements.",
    "outreach_angle": "JPMorgan's full RTO creates enormous demand for reliable, compliant video delivery at 316,000-person scale. Vbrick's FINRA-ready archiving and eCDN are built for exactly this regulated, high-volume environment—enabling leadership to communicate at scale without compliance risk or network strain.",
    "target_persona": "CIO / Head of Corporate Technology / Internal Communications Lead",
    "industry": "Financial Services / Banking",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Full 5-Day RTO Mandate",
    "finding_id": "",
    "employee_count": "~316,000",
    "is_fortune500": "Unverified",
    "stakeholders": [
      {
        "name": "Heather Barbakoff",
        "title": "Executive Director, Senior Communications Manager, Global Technology",
        "linkedin": "https://www.linkedin.com/in/heatherbarbakoff"
      },
      {
        "name": "Kanti S",
        "title": "Executive Director, Head Of Enterprise Technology Communications",
        "linkedin": "https://www.linkedin.com/in/kantishrestha"
      },
      {
        "name": "Pallavi J",
        "title": "Vice President - IT Infrastructure",
        "linkedin": "https://www.linkedin.com/in/pallavi-j-21532614"
      },
      {
        "name": "Lee Wilson",
        "title": "JPMC VP Infrastructure",
        "linkedin": "https://www.linkedin.com/in/lee-wilson-8a67302"
      },
      {
        "name": "Ruby Murray",
        "title": "Executive Director, Global Head Of Learning - Legal And Internal Audit",
        "linkedin": "https://www.linkedin.com/in/ruby-murray-b6976a4"
      },
      {
        "name": "Matthew Davis",
        "title": "Learning Lead - Firmwide Talent Development Education, Vice President",
        "linkedin": "https://www.linkedin.com/in/dvgpro"
      },
      {
        "name": "Karthik Viswanathan",
        "title": "Senior Vice President, Infrastructure Engineering",
        "linkedin": "https://www.linkedin.com/in/itskarthik1983"
      }
    ],
    "is_new": true
  },
  {
    "id": 49,
    "category": "Market Triggers",
    "company": "Citigroup",
    "summary": "Citigroup is executing the most aggressive Wall Street restructuring in recent memory: a multi-year plan to eliminate 20,000 roles by end of 2026, reducing the workforce from ~227,000 to ~180,000 employees. CEO Jane Fraser's transformation program explicitly cites 'efficiency gains from technology' as a driver of the cuts. January 2026 saw the latest wave of ~1,000 cuts with more scheduled for March. This sustained transformation requires persistent enterprise-wide video communications to maintain employee engagement and culture amid constant change.",
    "source_url": "https://www.marketing-interactive.com/citigroup-to-cut-around-1-000-roles-as-restructuring-continues",
    "why_vbrick": "Citi's 3-year transformation program requires continuous, compliant video communications at global banking scale. Vbrick's FINRA-ready archiving is a natural fit for Citi's regulatory obligations; SOC II Type 2 and FIPS 140-2 meet the bank's security standards. Real-time analytics enables HR and comms teams to measure employee engagement during the transformation—a key metric for Fraser's leadership team.",
    "outreach_angle": "Citigroup's multi-year workforce reset requires reliable, compliant video infrastructure to sustain employee trust. Vbrick's FINRA-ready archiving and enterprise-grade security mean every CEO town hall and transformation update is stored, searchable, and audit-ready—exactly what a bank managing a 50,000-person reduction needs.",
    "target_persona": "CIO / Head of Corporate Technology / Chief Communications Officer",
    "industry": "Financial Services / Banking",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Workforce Restructuring + Digital Transformation",
    "finding_id": "",
    "employee_count": "~227,000",
    "is_fortune500": "Unverified",
    "stakeholders": [
      {
        "name": "James Lewchuk",
        "title": "Senior Vice President @ Citi | Global Corporate Communications - Internal/External",
        "linkedin_url": "https://www.linkedin.com/in/jlewchuk",
        "role": "Decision Maker"
      },
      {
        "name": "Emily Ruderman",
        "title": "Vice President Of Corporate Communications",
        "linkedin_url": "https://www.linkedin.com/in/eruderman",
        "role": "Decision Maker"
      },
      {
        "name": "Pramod Panhalkar",
        "title": "SVP - Global Technology Infrastructure, Shared Services | Digital Transformation",
        "linkedin_url": "https://www.linkedin.com/in/pramodpanhalkar",
        "role": "Decision Maker"
      },
      {
        "name": "Jose Lopez",
        "title": "SVP Infrastructure Senior Group Manager",
        "linkedin_url": "https://www.linkedin.com/in/jose-lopez-8923289",
        "role": "Decision Maker"
      },
      {
        "name": "Robert Trapani",
        "title": "Director / Sr. Group Manager - IT Infrastructure at Citigroup",
        "linkedin_url": "https://www.linkedin.com/in/robert-trapani-1a9a8112",
        "role": "Influencer"
      },
      {
        "name": "Laine Joelson Cohen",
        "title": "Global Head Of Learning - HR",
        "linkedin_url": "https://www.linkedin.com/in/lainejoelsoncohen",
        "role": "Influencer"
      },
      {
        "name": "Peter Fox",
        "title": "Managing Director, Global Head of Learning (aka Chief Learning Officer) at Citi",
        "linkedin_url": "https://www.linkedin.com/in/peter-fox-65124440",
        "role": "Influencer"
      },
      {
        "name": "Jimmy Yan",
        "title": "Manager, SaaS Unified Communications Collaborations Telecom",
        "linkedin_url": "https://www.linkedin.com/in/jimmyyan1",
        "role": "Evaluator"
      },
      {
        "name": "Lorie Crawford",
        "title": "Solution Architect Sr. Programmer Analyst",
        "linkedin_url": "https://www.linkedin.com/in/lorie-crawford-7a12798",
        "role": "Technical Evaluator"
      },
      {
        "name": "Krithika Shankar",
        "title": "Director - Head Of Engineering And Architecture - USPB Digital",
        "linkedin_url": "https://www.linkedin.com/in/krithika-shankar-993a909b",
        "role": "Technical Evaluator"
      }
    ],
    "is_new": true
  },
  {
    "id": 50,
    "category": "Market Triggers",
    "company": "UPS (United Parcel Service)",
    "summary": "UPS executed the 'largest network reconfiguration in UPS history' in 2025, cutting ~48,000 jobs and closing 93 facilities. In January 2026, CEO Carol Tomé announced an additional ~30,000 job cuts through 2026 as part of its 'Network Reconfiguration and Efficiency Reimagined' program with expected $3B in 2026 savings. The company is simultaneously reorienting its entire business model away from Amazon volume toward SMB and healthcare logistics—a transformation that demands sustained leadership communications to a workforce of 490,000 across hundreds of global facilities.",
    "source_url": "https://about.ups.com/mx/en/newsroom/press-releases/financials/ups-releases-4q-2025-earnings-and-provides-2026-guidance.html",
    "why_vbrick": "UPS's global logistics workforce—spread across distribution hubs, airports, and facilities in every timezone—creates a textbook eCDN use case. Vbrick's bandwidth optimization prevents network strain during companywide announcements. AI-powered search enables employees to locate archived policy communications. Section 508 ensures accessibility compliance for a large, diverse hourly workforce.",
    "outreach_angle": "UPS is restructuring 490,000 employees across thousands of global locations while simultaneously reorienting its business strategy. Vbrick's eCDN-powered delivery ensures Carol Tomé's transformation communications reach every facility without bandwidth failures—and analytics prove the message is landing.",
    "target_persona": "CIO / VP of Technology / Head of Internal Communications",
    "industry": "Logistics / Supply Chain",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Workforce Restructuring + Major Strategic Pivot",
    "finding_id": "",
    "employee_count": "~490,000",
    "is_fortune500": "Unverified",
    "stakeholders": [
      {
        "name": "Ken Finnerty",
        "title": "President Information Technology",
        "linkedin": "https://www.linkedin.com/in/ken-finnerty-22aa1b71"
      },
      {
        "name": "Joel Stenson",
        "title": "Senior Vice President Operations Technology",
        "linkedin": "https://www.linkedin.com/in/joel-stenson-1406aa25"
      },
      {
        "name": "Jason Lopez",
        "title": "Vice President Information Technology",
        "linkedin": "https://www.linkedin.com/in/jason-lopez-a885a37"
      },
      {
        "name": "Jennifer Griffith",
        "title": "Digital Communications And Analytics Vice President",
        "linkedin": "https://www.linkedin.com/in/jennifergriffith1"
      },
      {
        "name": "Conrad Walters",
        "title": "Digital Production Implementation Director",
        "linkedin": "https://www.linkedin.com/in/conrad-walters"
      },
      {
        "name": "Kevin E",
        "title": "Senior Systems Programmer Analyst, Unified Communications",
        "linkedin": "https://www.linkedin.com/in/ke121592"
      },
      {
        "name": "Norman M Brothers",
        "title": "EVP & Chief Legal and Compliance Officer",
        "linkedin": "https://www.linkedin.com/in/norman-m-brothers-jr-0a89b63a"
      }
    ],
    "is_new": true
  },
  {
    "id": 51,
    "category": "Market Triggers",
    "company": "Kroger",
    "summary": "Kroger confirmed in November 2025 that ~4,800 remote corporate employees must return to the office five days per week starting January 2026—a complete reversal of its prior hybrid model. EVP Tim Massa framed the change as necessary to 'simplify how the company works and help teams move faster.' Kroger continues to navigate post-merger pressures following the collapse of its attempted $24.6B Albertsons acquisition, which required significant workforce adjustment communications.",
    "source_url": "https://allwork.space/2025/11/kroger-ends-remote-work-orders-thousands-back-to-offices-in-2026/",
    "why_vbrick": "Kroger's transition from hybrid to full-time in-office requires sustained executive video communications to 4,800+ corporate employees, plus its broader workforce across hundreds of store locations. Vbrick's eCDN handles the distributed delivery; AI transcription ensures all hands recordings are searchable and accessible for employees who miss live sessions.",
    "outreach_angle": "Kroger's full 5-day RTO for 4,800 corporate employees creates immediate demand for executive video communications at scale. Vbrick's platform ensures every town hall, store leadership briefing, and culture update reaches the right audience—reliably and measurably.",
    "target_persona": "CIO / VP of Technology / Head of Internal Communications",
    "industry": "Retail / Grocery",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Full 5-Day RTO Mandate + Post-Merger Integration Pressure",
    "finding_id": "",
    "employee_count": "~420,000",
    "is_fortune500": "Unverified",
    "stakeholders": [
      {
        "name": "Stephanie Jenkins",
        "title": "Vice President, Strategic Planning, Partnerships & Operations for Technology & Digital",
        "linkedin_url": "https://www.linkedin.com/in/stephanie-jenkins-5166596",
        "role": "Decision Maker"
      },
      {
        "name": "Suresh Karupakula",
        "title": "Vice President - Merchandising Technologies",
        "linkedin_url": "https://www.linkedin.com/in/sureshkarupakula",
        "role": "Decision Maker"
      },
      {
        "name": "Nick Hamilton",
        "title": "SVP, Head of Technology",
        "linkedin_url": "https://www.linkedin.com/in/nick-hamilton-08a1b664",
        "role": "Decision Maker"
      },
      {
        "name": "Erin Rolfes",
        "title": "Vice President, Communications",
        "linkedin_url": "https://www.linkedin.com/in/erinrolfes",
        "role": "Decision Maker"
      },
      {
        "name": "Hans Broder",
        "title": "Senior Director of Platform Engineering",
        "linkedin_url": "https://www.linkedin.com/in/hans-broder-216169b4",
        "role": "Influencer"
      },
      {
        "name": "Manuel Arakkal",
        "title": "Director, Human Resource Systems Engineering",
        "linkedin_url": "https://www.linkedin.com/in/manuel",
        "role": "Influencer"
      },
      {
        "name": "Bob Hodgeman",
        "title": "Solutions Architect",
        "linkedin_url": "https://www.linkedin.com/in/bobhodgeman",
        "role": "Technical Evaluator"
      },
      {
        "name": "Joseph Rudnicki",
        "title": "Solutions Architect",
        "linkedin_url": "https://www.linkedin.com/in/bluefox-solutions",
        "role": "Technical Evaluator"
      },
      {
        "name": "Scott Stanko",
        "title": "Advanced Solutions Architect",
        "linkedin_url": "https://www.linkedin.com/in/scottstanko",
        "role": "Technical Evaluator"
      },
      {
        "name": "Jason Guyler",
        "title": "Sr. Compliance Manager - Privacy",
        "linkedin_url": "https://www.linkedin.com/in/jasonguyler",
        "role": "Technical Evaluator"
      }
    ],
    "is_new": true
  },
  {
    "id": 52,
    "category": "Competitor Intelligence",
    "company": "Brightcove Enterprise Customers (Broad)",
    "summary": "Post-acquisition, Brightcove does not publish pricing publicly, requiring sales engagement before costs are disclosed. G2 reviewers cite the 'charging scheme is not flexible and reasonable' and 'cost competitiveness' as top complaints. Third-party analysis cites average enterprise contract pricing at $8,000–$8,450/month. The engineering talent loss post-acquisition raises questions about whether pricing remains justified.",
    "source_url": "https://www.fastpix.io/blog/the-best-brightcove-alternatives-in-2026",
    "why_vbrick": "VBRICK's transparent pricing model and compliance-centric feature set (FedRAMP, FIPS, FINRA-archiving) provide quantifiable value that Brightcove's opaque, media-focused pricing structure does not. For regulated industries, VBRICK eliminates the need for expensive add-on compliance tooling.",
    "outreach_angle": "ROI-focused conversation: 'What does $8K/month buy you from a post-acquisition Brightcove? VBRICK includes compliance, eCDN, and archiving in the base platform.'",
    "target_persona": "CFO / VP of Procurement / Director of Digital Strategy",
    "industry": "Media / Enterprise",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "Medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Pricing Concern",
    "finding_id": "",
    "competitor": "Brightcove",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 53,
    "category": "Competitor Intelligence",
    "company": "Vimeo Enterprise Customers (Security-Sensitive)",
    "summary": "Following the January 2026 Bending Spoons-driven engineering layoffs, third-party analysis from Gumlet notes that Vimeo's DRM implementation on Enterprise plans 'is no longer in active development' — the existing DRM functionality will not receive security updates, patches, or improvements going forward. For content that requires continuous DRM protection, this creates documented platform risk. SCIM provisioning on Vimeo is gated behind Enterprise plans and requires manual coordination with Vimeo's success team — a team that has been significantly reduced.",
    "source_url": "https://www.gumlet.com/learn/safest-private-video-hosting-platforms/",
    "why_vbrick": "VBRICK provides enterprise-grade DRM, access control, and identity management as part of its core platform, backed by active development and security patching processes attested by SOC II Type 2 and FedRAMP audits. For content-sensitive enterprises, VBRICK is the defensible choice post-Vimeo layoffs.",
    "outreach_angle": "Security continuity: 'Vimeo's DRM is no longer being patched since the January 2026 layoffs. If you're using Vimeo for content protection, your security posture is degrading with each month that passes. VBRICK's actively maintained security stack gives you a clear upgrade path.'",
    "target_persona": "CISO / VP of Digital Content / Head of Legal & Compliance",
    "industry": "Media / Financial Services / Legal",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "Medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Security / Platform Stability Risk",
    "finding_id": "",
    "competitor": "Vimeo Enterprise",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 54,
    "category": "Competitor Intelligence",
    "company": "Qumu Enterprise Customers (Contract Expiry)",
    "summary": "Qumu has not released any notable product updates or feature announcements since being absorbed into Enghouse Systems in February 2023. Enghouse's acquisition strategy for niche software is to maintain existing customer bases and extract value — not to invest in competitive platform development. Qumu's enterprise video platform remains technically functional but has been in effective product stasis for over two years, while competitors have advanced AI search, eCDN, and compliance capabilities significantly.",
    "source_url": "https://www.prnewswire.com/news-releases/enghouse-acquires-qumu-corporation-301742540.html",
    "why_vbrick": "VBRICK is the natural upgrade path for Qumu customers who need continued investment in enterprise video. VBRICK's FedRAMP, FIPS 140-2, AI transcription, and Teams integration represent 2+ years of innovation that Qumu customers have missed. The displacement conversation is easy: 'What has your Qumu vendor shipped in the last two years?'",
    "outreach_angle": "Innovation gap: 'Qumu has been in product stasis since Enghouse acquired it for $18M in 2023. Your team deserves an enterprise video platform that's actually investing in AI, compliance, and eCDN. Let's talk.'",
    "target_persona": "VP of Enterprise Technology / Director of IT / CTO",
    "industry": "Financial Services / Healthcare / Government",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "Medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Product Discontinuation",
    "finding_id": "",
    "competitor": "Qumu",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 55,
    "category": "Market Triggers",
    "company": "New York Life Insurance",
    "summary": "New York Life appointed Deepa Soni as EVP and CIO in November 2025. Soni previously served as Chief Information and Operations Officer at The Hartford Insurance Group. As a new external CIO hire, Soni is expected to conduct a thorough technology stack evaluation in her first 90-180 days, including enterprise communications platforms. Insurance firms face heightened regulatory scrutiny on communications archiving.",
    "source_url": "https://www.cio.com/article/230613/new-cio-appointments.html",
    "why_vbrick": "A new CIO from Hartford—one of the most technologically progressive insurers—brings high standards for enterprise video. Vbrick's FINRA-ready archiving and SOC II Type 2 compliance directly address New York Life's insurance regulatory obligations. The Microsoft 365/Teams integration accelerates deployment within the likely existing collaboration environment.",
    "outreach_angle": "New York Life's new CIO is in her technology stack evaluation window. Vbrick's compliance-first enterprise video platform—with FINRA-ready archiving, SOC II Type 2, and Microsoft 365 integration—is purpose-built for the regulated insurance environment she's stepping into.",
    "target_persona": "CIO (Deepa Soni) / VP of Technology",
    "industry": "Insurance / Financial Services",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "Medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "New CIO Appointment",
    "finding_id": "",
    "employee_count": "~19,000+",
    "is_fortune500": "Unverified",
    "stakeholders": [
      {
        "name": "Yesenia Diaz",
        "title": "Corporate Vice President, Head Of Digital Support",
        "linkedin_url": "https://www.linkedin.com/in/yeseniadiaz1008",
        "role": "Decision Maker"
      },
      {
        "name": "John Healy",
        "title": "VP - CIO Corporate Technology",
        "linkedin_url": "https://www.linkedin.com/in/johnjhealy",
        "role": "Decision Maker"
      },
      {
        "name": "Meredith Hyland",
        "title": "Vice President, Corporate Communications",
        "linkedin_url": "https://www.linkedin.com/in/meredithhyland",
        "role": "Decision Maker"
      },
      {
        "name": "Joe S",
        "title": "Corporate Vice President, Internal Communications",
        "linkedin_url": "https://www.linkedin.com/in/joeschulz",
        "role": "Decision Maker"
      },
      {
        "name": "Ken Petro",
        "title": "Managing Director - Head Of Infrastructure",
        "linkedin_url": "https://www.linkedin.com/in/kenpetro",
        "role": "Influencer"
      },
      {
        "name": "Thomas Matthew",
        "title": "Corporate VP - Head of Platform Operations",
        "linkedin_url": "https://www.linkedin.com/in/thomas-matthew-jr-4a772147",
        "role": "Influencer"
      },
      {
        "name": "Jonathan Sookdeo",
        "title": "Video Collaboration Technology Lead",
        "linkedin_url": "https://www.linkedin.com/in/jonathansookdeo",
        "role": "Evaluator"
      },
      {
        "name": "Taha Abd-elhameed",
        "title": "Sr. Network Engineer /Architect",
        "linkedin_url": "https://www.linkedin.com/in/taha-abd-elhameed-01159b9",
        "role": "Technical Evaluator"
      },
      {
        "name": "Alex Sanchez",
        "title": "Senior Network Engineer",
        "linkedin_url": "https://www.linkedin.com/in/alex-sanchez-29b9b7114",
        "role": "Technical Evaluator"
      },
      {
        "name": "Ryan Lem",
        "title": "Cyber Risk And Analysis Manager",
        "linkedin_url": "https://www.linkedin.com/in/ryan-lem",
        "role": "Technical Evaluator"
      }
    ],
    "is_new": true
  },
  {
    "id": 56,
    "category": "Market Triggers",
    "company": "U.S. Department of Defense (DoD)",
    "summary": "The DoD faces a FY2027 Zero Trust deadline mandating agency consolidation from purchasing new tools to unifying infrastructure under a 'One Platform' approach. The JWCC Next cloud initiative (launched April 2025) expands cloud flexibility for DoD. Additionally, the Senate confirmed Kirsten Davies as Pentagon CIO in December 2025, who has prioritized cybersecurity modernization and industry partnerships. FedRAMP 20x (Phase 2 completed March 2026) is accelerating cloud authorization timelines, opening new procurement windows.",
    "source_url": "https://news.broadcom.com/government/getting-2026-right-federal-it-modernization-progress-opportunity",
    "why_vbrick": "Vbrick holds FedRAMP authorization, FIPS 140-2, and Section 508 compliance—the full compliance trifecta required for DoD video deployments. As DoD consolidates toward One Platform architectures before FY2027, Vbrick's enterprise video platform offers a FedRAMP-authorized, Zero Trust-compatible solution for large-scale DoD internal communications, training, and mission briefings. The new Pentagon CIO's focus on modernization and industry partnerships creates an active engagement window.",
    "outreach_angle": "The DoD's FY2027 Zero Trust consolidation deadline is driving agencies to evaluate unified video platforms before the window closes. Vbrick's FedRAMP authorization, FIPS 140-2, and Section 508 compliance make it the only enterprise video solution pre-positioned for DoD's One Platform consolidation.",
    "target_persona": "Pentagon CIO (Kirsten Davies) / Defense Agency CIOs / DISA",
    "industry": "Federal Government / Defense",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "Medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "FedRAMP 20x Reform + Zero Trust Mandate + IT Modernization",
    "finding_id": "",
    "employee_count": "~900,000+ civilian",
    "is_fortune500": "Unverified",
    "stakeholders": [
      {
        "name": "Richard Keller",
        "title": "VP, IT Solution Delivery And Engagement Supervisory Program Manager",
        "linkedin": "https://www.linkedin.com/in/richard-a-keller"
      },
      {
        "name": "Cliff Sweney",
        "title": "Director, Enterprise Portfolio",
        "linkedin": "https://www.linkedin.com/in/cliff-sweney-474a2473"
      },
      {
        "name": "Donald Sanders",
        "title": "Executive Portfolio Director, Corporate Portfolio (A), Office Of Information And Technology (OIT)",
        "linkedin": "https://www.linkedin.com/in/dr-donald-sanders"
      },
      {
        "name": "Ron Haskell",
        "title": "Director of Broadcast and Video, Veterans Health Administration",
        "linkedin": "https://www.linkedin.com/in/ron-haskell-1b72b788"
      },
      {
        "name": "John D Oswalt",
        "title": "DCIO - FOIA, Records, Assessment, Compliance, & Privacy /Chief Privacy Officer",
        "linkedin": "https://www.linkedin.com/in/john-d-oswalt-0242117"
      },
      {
        "name": "Jack Galvin",
        "title": "Deputy Chief Information Officer, End User Services",
        "linkedin": "https://www.linkedin.com/in/jack-galvin-1866a386"
      },
      {
        "name": "Paul Tibbits",
        "title": "Executive Director, Workforce And Organization Development",
        "linkedin": "https://www.linkedin.com/in/paul-tibbits-md-579ab39"
      }
    ],
    "is_new": true
  },
  {
    "id": 57,
    "category": "Market Triggers",
    "company": "Target Corporation",
    "summary": "Target executed a two-wave corporate restructuring: ~1,800 corporate positions cut in October 2025 (8% of corporate workforce, primarily at Minneapolis HQ) and another ~500 positions eliminated in February 2026 focused on regional offices and distribution centers. CEO Brian Cornell has consistently used video communications to address workforce changes. The restructuring is coupled with a strategic push to redirect investment toward frontline store employees—requiring new approaches to employee communications that reach both corporate and store-level workers.",
    "source_url": "https://intellizence.com/insights/layoff-downsizing/major-companies-that-announced-mass-layoffs/",
    "why_vbrick": "Target's dual-audience communication challenge—corporate employees at Minneapolis HQ and frontline store workers across 1,900+ locations—is exactly where Vbrick's eCDN and mobile-optimized delivery shine. Vbrick ensures store-level associates can access executive communications without straining store network bandwidth. Real-time analytics proves message penetration across the dispersed workforce.",
    "outreach_angle": "Target is rebuilding trust with 450,000 employees after two rounds of corporate layoffs. Vbrick's enterprise video platform delivers CEO and leadership communications to 1,900+ store locations without network strain—turning a difficult restructuring period into an opportunity to demonstrate authentic leadership.",
    "target_persona": "CIO / VP of Technology / Head of Internal Communications",
    "industry": "Retail",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "Medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Workforce Restructuring + Operational Streamlining",
    "finding_id": "",
    "employee_count": "~450,000",
    "is_fortune500": "Unverified",
    "stakeholders": [
      {
        "name": "Rich Agostino",
        "title": "SVP, Chief Information Security Officer & Infrastructure",
        "linkedin": "https://www.linkedin.com/in/rich-agostino"
      },
      {
        "name": "Gustavo Pospischel",
        "title": "Senior Vice President Of Technology",
        "linkedin": "https://www.linkedin.com/in/pospischel"
      },
      {
        "name": "Rachel Whitcomb",
        "title": "Senior Vice President of Technology",
        "linkedin": "https://www.linkedin.com/in/rachel-whitcomb-943520"
      },
      {
        "name": "Visagan Subburayalu",
        "title": "VP Infrastructure And Cybersecurity",
        "linkedin": "https://www.linkedin.com/in/visagan-subburayalu-86047348"
      },
      {
        "name": "Indu Rajaram",
        "title": "Director of Engineering- Streaming Platform",
        "linkedin": "https://www.linkedin.com/in/indu-rajaram-7a492b4"
      },
      {
        "name": "Jacqueline Debuse",
        "title": "VP Communications",
        "linkedin": "https://www.linkedin.com/in/jacquemueller"
      },
      {
        "name": "Andi Marston",
        "title": "Senior Vice President Talent & Team Member Experience",
        "linkedin": "https://www.linkedin.com/in/andi-marston-0440655"
      }
    ],
    "is_new": true
  },
  {
    "id": 58,
    "category": "Market Triggers",
    "company": "Procter & Gamble (P&G)",
    "summary": "P&G announced in June 2025 that it will cut ~7,000 non-manufacturing positions (6% of global workforce, 15% of white-collar workforce) over two fiscal years. Incoming CEO Shailesh Jejurikar cited the need to 'shift spending toward new product innovation.' The cuts primarily target senior, higher-paid employees in non-manufacturing roles—exactly the audience most likely to engage with enterprise video platforms for town halls, strategy communications, and leadership updates.",
    "source_url": "https://fortune.com/2025/11/26/layoffs-economy-how-many-what-companies-fortune-500/",
    "why_vbrick": "P&G's white-collar workforce reduction, combined with a new CEO driving strategic reorientation, creates high-frequency executive communication demands. Vbrick's GDPR compliance addresses P&G's extensive European operations; AI transcription enables multilingual accessibility across global markets; Microsoft 365/Teams integration fits P&G's enterprise collaboration environment.",
    "outreach_angle": "P&G's new CEO is reducing 7,000 roles while repositioning the company for innovation-led growth—a communications-intensive transformation. Vbrick's enterprise video platform with GDPR compliance and AI transcription enables P&G to communicate that vision convincingly to a global workforce across 180+ markets.",
    "target_persona": "CIO / VP of Digital Technology / Head of Internal Communications",
    "industry": "Consumer Packaged Goods",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "Medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Workforce Restructuring + Leadership Transition",
    "finding_id": "",
    "employee_count": "~107,000",
    "is_fortune500": "Unverified",
    "stakeholders": [
      {
        "name": "Markus Hofmann",
        "title": "Senior Director Infrastructure & Cloud Platform Architecture",
        "linkedin": "https://www.linkedin.com/in/markus-hofmann-5437741"
      },
      {
        "name": "Chris Halbert",
        "title": "IT Application Manager - Video Collaboration",
        "linkedin": "https://www.linkedin.com/in/chris-halbert-8460134"
      },
      {
        "name": "Jennifer Shields",
        "title": "Chief Information Security Officer",
        "linkedin": "https://www.linkedin.com/in/jennifer-shields-3244802"
      },
      {
        "name": "Damon Jones",
        "title": "Chief Communications Officer",
        "linkedin": "https://www.linkedin.com/in/damondjones"
      },
      {
        "name": "Sanjay Singh",
        "title": "Senior Vice President - CIO Asia Pacific, India, Middle East, Africa",
        "linkedin": "https://www.linkedin.com/in/sanjay-singh-a350b02"
      },
      {
        "name": "Kristy Anne Abello",
        "title": "IT Director",
        "linkedin": "https://www.linkedin.com/in/kristyabello"
      },
      {
        "name": "Kari Wethington",
        "title": "Director, Communications, North America",
        "linkedin": "https://www.linkedin.com/in/kariwethington"
      }
    ],
    "is_new": true
  },
  {
    "id": 59,
    "category": "Market Triggers",
    "company": "Accenture",
    "summary": "Accenture announced in October 2025 that it is laying off at least 11,000 employees as part of a large-scale AI-focused restructuring—specifically parting ways with employees who cannot be retrained with AI skills. This transformation is particularly notable given Accenture's position as a professional services firm that advises clients on digital transformation; its own internal transformation serves as a proof-of-concept for AI adoption strategies. The company employs ~750,000 globally, requiring massive internal communications infrastructure.",
    "source_url": "https://intellizence.com/insights/layoff-downsizing/major-companies-that-announced-mass-layoffs/",
    "why_vbrick": "Accenture's AI-restructuring affects 750,000 employees globally—one of the largest workforces in professional services. Vbrick's AI search and transcription capabilities align directly with Accenture's own AI transformation narrative; the platform's GDPR compliance addresses Accenture's EU operations. Microsoft 365/Teams integration (Accenture is a Microsoft Gold Partner) ensures seamless deployment.",
    "outreach_angle": "Accenture is restructuring 750,000 employees around AI capabilities—and Vbrick's AI-powered enterprise video platform demonstrates exactly the kind of AI-augmented tool Accenture is investing in. Native Microsoft 365 integration and global eCDN delivery make Vbrick the natural choice for Accenture's own enterprise video transformation.",
    "target_persona": "CIO / Chief AI Officer / Head of Workplace Technology",
    "industry": "Technology / Professional Services",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "Medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "AI-Driven Workforce Restructuring",
    "finding_id": "",
    "employee_count": "~750,000",
    "is_fortune500": "Unverified",
    "stakeholders": [
      {
        "name": "Raju Yadav",
        "title": "Vice President - Cloud and Infrastructure Engineering",
        "linkedin": "https://www.linkedin.com/in/raju-yadav-809b6113"
      },
      {
        "name": "Kapil Khanna",
        "title": "VP - Accenture Intelligent Cloud and Infrastructure Operations Infrastructure Engineering",
        "linkedin": "https://www.linkedin.com/in/kapil-khanna-941a35a4"
      },
      {
        "name": "Carlo La Grotta",
        "title": "Manager-Digital Video Operation",
        "linkedin": "https://www.linkedin.com/in/carlolagrotta"
      },
      {
        "name": "Brittany Piano",
        "title": "Video and Collaboration Architect",
        "linkedin": "https://www.linkedin.com/in/brittany-piano-156611102"
      },
      {
        "name": "Patrick Rowe",
        "title": "Chief Compliance Officer and Deputy General Counsel",
        "linkedin": "https://www.linkedin.com/in/patrickroweuk"
      },
      {
        "name": "Rachel Frey",
        "title": "Chief Communications Officer",
        "linkedin": "https://www.linkedin.com/in/rachelfreyaccenture"
      },
      {
        "name": "Humera Siddique",
        "title": "VP, Global Talent Supply Chain",
        "linkedin": "https://www.linkedin.com/in/humera-siddique-05aaa0185"
      }
    ],
    "is_new": true
  },
  {
    "id": 60,
    "category": "Market Triggers",
    "company": "Novo Nordisk",
    "summary": "Novo Nordisk announced in September 2025 the largest layoff in Denmark's history: ~9,000 roles (~11.5% of its 77,000 workforce) under new CEO Mike Doustdar. The restructuring targets education, manufacturing, HR, and overhead roles as Novo battles competition from Eli Lilly in the obesity/diabetes market and redirects investment into core R&D. The new CEO is executing a rapid strategic transformation that requires consistent employee communications across a global pharma workforce.",
    "source_url": "https://intellizence.com/insights/layoff-downsizing/major-companies-that-announced-mass-layoffs/",
    "why_vbrick": "Pharmaceutical companies require HIPAA-ready and GDPR-compliant video infrastructure for employee communications. Novo Nordisk's multinational structure (Denmark HQ, US operations, global manufacturing) demands GDPR-compliant video with eCDN delivery. New CEO Doustdar's need to communicate a transformational vision to 68,000 global employees after Denmark's largest-ever layoff makes enterprise video mission-critical.",
    "outreach_angle": "Novo Nordisk's new CEO needs to rebuild trust with 68,000 employees following Denmark's largest-ever corporate layoff. Vbrick provides the secure, GDPR-compliant, globally-delivered enterprise video platform to communicate Doustdar's strategic vision consistently across Novo's multinational workforce—with analytics to measure employee engagement.",
    "target_persona": "CIO / Head of Digital / Internal Communications Lead",
    "industry": "Pharmaceutical / Life Sciences",
    "urgency_score": 2,
    "urgency_rationale": "",
    "confidence": "Medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Workforce Restructuring + New CEO + Strategic Reorientation",
    "finding_id": "",
    "employee_count": "~68,000 (post-restructuring)",
    "is_fortune500": "Unverified",
    "stakeholders": [
      {
        "name": "Michael Brandt Lassen",
        "title": "Vice President of Cloud and Corporate Infrastructure",
        "linkedin_url": "https://www.linkedin.com/in/michael-brandt-lassen",
        "role": "Decision Maker"
      },
      {
        "name": "Lars Bækkelund",
        "title": "Corporate Vice President - Cross Digital, Data & IT",
        "linkedin_url": "https://www.linkedin.com/in/lars-baekkelund",
        "role": "Decision Maker"
      },
      {
        "name": "Jakob Lilholt",
        "title": "Director - Infrastructure Platforms in Enterprise IT",
        "linkedin_url": "https://www.linkedin.com/in/lilholt",
        "role": "Influencer"
      },
      {
        "name": "Brian Terp Sørensen",
        "title": "Product Manager & AV Specialist (Video Conferencing)",
        "linkedin_url": "https://www.linkedin.com/in/brian-terp-sørensen-b23b307",
        "role": "Evaluator"
      },
      {
        "name": "Rahail Rana",
        "title": "Sr. IT Network Architect",
        "linkedin_url": "https://www.linkedin.com/in/rahail-rana-a7697144",
        "role": "Technical Evaluator"
      },
      {
        "name": "Kristian Dehn",
        "title": "Senior Network Architect",
        "linkedin_url": "https://www.linkedin.com/in/kristiandehn",
        "role": "Technical Evaluator"
      },
      {
        "name": "Morten Barfoed",
        "title": "IT Compliance Manager",
        "linkedin_url": "https://www.linkedin.com/in/morten-barfoed-74203a83",
        "role": "Technical Evaluator"
      },
      {
        "name": "Peter Fiurendal",
        "title": "IT Compliance Manager/Validation Lead",
        "linkedin_url": "https://www.linkedin.com/in/peterfiurendal",
        "role": "Technical Evaluator"
      },
      {
        "name": "Elgert Pina",
        "title": "Solutions Architect",
        "linkedin_url": "https://www.linkedin.com/in/elgertpina",
        "role": "Technical Evaluator"
      }
    ],
    "is_new": true
  },
  {
    "id": 61,
    "category": "Compliance & Regulatory",
    "company": "Regulation: SEC Off-Channel Communications Enforcement",
    "summary": "On January 13, 2025, the SEC charged 12 firms (9 investment advisers + 3 broker-dealers) with recordkeeping failures for off-channel communications, resulting in $63.1 million in combined penalties. Firms included Blackstone ($12M), KKR ($11M), Charles Schwab ($10M), Apollo ($8.5M), and others. Since 2021, the SEC has charged 100+ firms totaling over $2.2 billion in fines. While the new administration has signaled less interest in standalone recordkeeping actions under Chairman Atkins, FINRA has continued active enforcement, and off-channel violations are now being bundled into broader securities law enforcement actions that include other violations.",
    "source_url": "https://www.sec.gov/newsroom/press-releases/2025-6",
    "why_vbrick": "Investment advisers and broker-dealers under pressure to remediate off-channel communication failures need a compliant video platform with built-in archiving and supervisory controls. Vbrick's FINRA-ready archiving, with full audit trails and integration into compliance review workflows, addresses the SEC's core finding that firms failed to preserve electronic communications. The January 2025 enforcement wave — potentially the last standalone sweep — is accelerating compliance program reviews at affected firms and their peers, creating pipeline opportunities for a compliant video infrastructure replacement.",
    "outreach_angle": "",
    "target_persona": "CCO, Head of Compliance Technology, COO (Financial Services)",
    "industry": "Financial Services / Investment Management",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "enforcement_action",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 62,
    "category": "Compliance & Regulatory",
    "company": "Regulation: HIPAA Telehealth Video Platform Compliance",
    "summary": "HIPAA enforcement discretion for telehealth ended in May 2023, with full HIPAA compliance now applying to all remote care video platforms. OIG identified telehealth as a significant enforcement priority for 2025–2026, with the Work Plan including reviews of billing patterns, audiovisual communication standards, medical necessity documentation, and practitioner credentials. Healthcare providers must ensure all video platforms sign BAAs, provide encryption in transit, restrict access with MFA, log/audit remote sessions, and update security risk analyses to reflect telehealth workflows. OIG noted behavioral health telehealth creates unique fraud and abuse risks.",
    "source_url": "https://www.doctorsmanagement.com/blog/oig-compliance-for-telehealth-rpm-and-virtual-care-new-rules-of-the-road-for-2025-to-2026/",
    "why_vbrick": "As HIPAA enforcement for telehealth moves from theoretical to operational, healthcare systems evaluating video infrastructure face procurement requirements that explicitly include HIPAA compliance documentation. Vbrick's BAA capability, FIPS 140-2 encryption, role-based access controls, audit logging, and Section 508 accessibility features satisfy the complete OIG telehealth compliance checklist. Hospitals and health systems adding virtual care at scale — and facing OIG audit scrutiny — represent high-value enterprise accounts where Vbrick's compliance posture is a procurement differentiator.",
    "outreach_angle": "",
    "target_persona": "Chief Privacy Officer, Telehealth Director, CIO (Healthcare)",
    "industry": "Healthcare",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "regulatory_change",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 63,
    "category": "Compliance & Regulatory",
    "company": "Regulation: GDPR — Video Conferencing & Recording Compliance",
    "summary": "GDPR enforcement is intensifying specifically around video conferencing as the EDPB's 2026 CEF targets transparency obligations and the EU AI Act adds AI-feature obligations for video platforms using transcription, noise cancellation, and smart summaries. DLA Piper's January 2026 GDPR survey confirmed €7.1B in cumulative fines. Regulators are now actively testing websites rather than waiting for complaints. The 2026 GDPR video compliance framework requires: EU data residency, Data Processing Agreements, participant consent for recordings, role-based access to archived recordings, retention policies, and audit trails for recording access — all of which are active examination criteria.",
    "source_url": "https://www.digitalsamba.com/blog/gdpr-compliant-video-conferencing",
    "why_vbrick": "Vbrick's enterprise video platform — with configurable data residency, DPA-ready contract terms, recording consent workflows, encrypted storage, and tamper-evident audit logs — addresses the complete GDPR video conferencing compliance framework that DPAs are now actively auditing. European and multinational enterprises running Vbrick for all-company meetings, training delivery, and leadership communications need exactly the documentation chain (who recorded what, who accessed it, when was it deleted) that GDPR Article 5(2) accountability requires.",
    "outreach_angle": "",
    "target_persona": "DPO, Legal Counsel, IT Director",
    "industry": "Enterprise / Financial Services / Healthcare",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "regulatory_change",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 64,
    "category": "Compliance & Regulatory",
    "company": "Regulation: California CCPA/CPRA — 2026 Expanded Enforcement",
    "summary": "As of January 1, 2026, new CPRA regulations took effect requiring: mandatory risk assessments for 'significant risk' processing, automated decision-making technology (ADMT) pre-use notices and opt-out rights, and cybersecurity audit requirements. California CPPA increased civil penalties to $2,663 per unintentional violation and $7,988 per intentional violation as of January 1, 2025 — with no aggregate cap. In February 2026, Disney received the largest CCPA settlement to date ($2.75M) for failing to honor opt-out requests across streaming services and devices. The CPPA's active enforcement removed the mandatory 30-day cure period, shifting to a direct enforcement model. The 2026 ADMT regulations require businesses to document logic and likely outcomes of automated processes used for significant consumer decisions.",
    "source_url": "https://www.jacksonlewis.com/insights/navigating-california-consumer-privacy-act-30-essential-faqs-covered-businesses-including-clarifying-regulations-effective-1126",
    "why_vbrick": "Enterprise video platforms that use AI-driven features (smart search, auto-transcription, viewer analytics, recommendation engines) are subject to California's new ADMT regulations when those features process California residents' data. Organizations using Vbrick for internal training, corporate communications, or customer-facing video events in California must assess ADMT obligations for AI-powered features. Vbrick's transparent AI architecture and documented processing workflows support the pre-use notice, opt-out, and access request obligations that CPPA is actively enforcing against platforms with AI personalization.",
    "outreach_angle": "",
    "target_persona": "DPO, Privacy Counsel, VP Technology (Enterprise)",
    "industry": "Technology / Retail / Media / Financial Services",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "regulatory_change",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 65,
    "category": "Compliance & Regulatory",
    "company": "Regulation: State Privacy Law Expansion — 19 States Now Active",
    "summary": "As of January 1, 2026, 19 U.S. states have comprehensive consumer privacy laws in effect, with Indiana, Kentucky, and Rhode Island joining in January 2026. Connecticut's July 2026 amendment drops the applicability threshold from 100,000 to 35,000 consumers and adds neural data and government-issued IDs as sensitive data categories. Rhode Island's law omits standard size thresholds, meaning small businesses must comply. The Video Privacy Protection Act (VPPA) continues to generate federal litigation around enterprise video platforms and third-party analytics integrations. Minnesota (effective July 31, 2025) became the first state requiring a live personal data inventory — which directly applies to video platform data.",
    "source_url": "https://www.kiteworks.com/gdpr-compliance/gdpr-fines-data-privacy-enforcement-2026/",
    "why_vbrick": "Enterprise video platforms collecting viewer data, engagement analytics, or behavioral data on employees and customers across multiple states face compounding compliance obligations under the state privacy patchwork. Vbrick's data minimization architecture, configurable data retention, and documented processing agreements help multi-state enterprises satisfy parallel privacy obligations without deploying 19 separate compliance programs. The VPPA's continued application to enterprise video creates specific liability for organizations that share viewer identification data with third-party analytics — a risk that Vbrick's privacy-first architecture avoids.",
    "outreach_angle": "",
    "target_persona": "DPO, General Counsel, CISO",
    "industry": "Enterprise / Media / Healthcare",
    "urgency_score": 0,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "regulatory_change",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 66,
    "category": "Compliance & Regulatory",
    "company": "Regulation: HIPAA — HHS Information Blocking Enforcement",
    "summary": "In September 2025, HHS-OIG and ASTP/ONC issued an enforcement alert stating that information blocking enforcement is now active, coordinated, and resourced. HHS is encouraging patients, providers, and innovators to report suspected information blocking through dedicated portals and hotlines. HIPAA settlements in 2025 reached up to $600,000 for failures to conduct proper risk assessments. The OCR's Risk Analysis Initiative (11 enforcement actions through February 2026) demonstrates that OCR is treating proactive risk analysis as a core enforcement priority — not a paper requirement.",
    "source_url": "https://www.healthcarelawinsights.com/2026/03/hhs-crackdown-on-information-blocking-new-era-of-enforcement-fines-and-compliance-risks-for-healthcare-entities/",
    "why_vbrick": "Healthcare organizations that restrict access to clinical video recordings, telehealth session records, or patient-facing video content may face information blocking liability under ONC rules. Vbrick's platform supports secure, auditable access to recorded clinical content with patient rights controls — enabling healthcare organizations to share video-format clinical information compliantly rather than withholding it. The active HHS enforcement posture creates urgency for healthcare IT teams to evaluate whether their video infrastructure enables or impedes compliant information sharing.",
    "outreach_angle": "",
    "target_persona": "HIPAA Privacy Officer, Health IT Director, CIO (Healthcare)",
    "industry": "Healthcare",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "regulatory_change",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 67,
    "category": "Compliance & Regulatory",
    "company": "Regulation: GDPR — TikTok €530M Cross-Border Transfer Fine",
    "summary": "In 2025, the Irish Data Protection Commission fined TikTok €530 million for illegally transferring European Economic Area user data to China — the second-largest GDPR fine on record after Meta's €1.2B penalty. This confirmed that cross-border data transfer enforcement is a durable, high-value enforcement category, not a one-time event. The DLA Piper 2025 GDPR survey documented growing enforcement focus on Article 5(1)(a) (lawfulness, fairness, transparency) and Article 5(1)(f) (integrity and confidentiality). European DPAs received 443 breach notifications per day in 2025 — a 22% increase year-over-year.",
    "source_url": "https://www.kiteworks.com/gdpr-compliance/gdpr-fines-data-privacy-enforcement-2026/",
    "why_vbrick": "Multinational enterprises using US-headquartered video platforms that route EU employee data to American servers face the same CLOUD Act / FISA Section 702 exposure that triggered TikTok's €530M fine. Vbrick's GDPR-compliant architecture with configurable EU data residency options provides multinationals with a defensible transfer mechanism that avoids the cross-border transfer violations DPAs are actively pursuing. Compliance teams at European and US multinational firms reviewing video vendor risk classifications will prioritize platforms with documented GDPR transfer mechanism compliance.",
    "outreach_angle": "",
    "target_persona": "DPO, General Counsel, CISO (Multinational Enterprises)",
    "industry": "Enterprise / Technology / Financial Services",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "enforcement_action",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 68,
    "category": "Compliance & Regulatory",
    "company": "Regulation: FedRAMP — Continuous Monitoring & Vulnerability Transparency",
    "summary": "FedRAMP's March 2026 RFC-0026 and the CA-7 continuous monitoring update require cloud providers to share full vulnerability information with every agency customer — monthly scans, updated POA&Ms, or adoption of the new Vulnerability Detection and Response Balance Improvement Release. Gaps in vulnerability reporting are now treated as high-impact findings. Starting in 2027, repeated failures lead to corrective action, Marketplace remediation status, and ultimately revocation of FedRAMP Certification. The FedRAMP Consolidated Rules for 2026 (CR26) will be published by June 2026 and will govern through December 31, 2028.",
    "source_url": "https://www.fedramp.gov/rfcs/0030/",
    "why_vbrick": "Federal agencies procuring video platforms must now confirm that their cloud video provider meets FedRAMP's enhanced continuous monitoring requirements, including mandatory vulnerability transparency. Vbrick's FedRAMP authorization and ongoing continuous monitoring compliance gives federal IT teams the evidence documentation — monthly scans, POA&M status, vulnerability reports — required to satisfy agency ATO maintenance requirements under the new CA-7 standards. Non-FedRAMP video platforms cannot provide this documentation chain, making Vbrick the default compliant option for agencies executing video infrastructure procurement under CR26.",
    "outreach_angle": "",
    "target_persona": "Agency CISO, FedRAMP Program Manager, Cloud Architect (Federal Government)",
    "industry": "Federal Government",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "regulatory_change",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 69,
    "category": "Compliance & Regulatory",
    "company": "Regulation: HIPAA — Cadia Healthcare Multimedia PHI Enforcement",
    "summary": "On September 30, 2025, HHS OCR settled with Cadia Healthcare Facilities ($182,000 + 2-year CAP) for posting patient success stories including photographs and recovery videos to its public website without valid HIPAA authorization. OCR found violations of impermissible PHI disclosure, failure to have safeguards for PHI, and failure to notify affected individuals. The settlement covered 150 patients whose PHI appeared in multimedia content. OCR specifically cited that HIPAA compliance extends beyond clinical care settings — marketing and public communications personnel must be trained on HIPAA requirements for any multimedia content involving patient information.",
    "source_url": "https://www.mintz.com/insights-center/viewpoints/2146/2025-10-06-beyond-clinical-setting-ocrs-settlement-cadia-further",
    "why_vbrick": "Healthcare organizations using video for marketing, patient testimonials, or public-facing content face HIPAA exposure if those videos contain PHI without proper authorization. Vbrick's platform — with access-controlled publishing workflows, permission-gated video distribution, and audit trails documenting who authorized which content for public vs. internal access — directly prevents the unauthorized PHI disclosure pattern OCR penalized Cadia for. Healthcare marketing teams and communications departments managing video content through Vbrick can demonstrate the documented authorization workflow that OCR requires.",
    "outreach_angle": "",
    "target_persona": "HIPAA Privacy Officer, Healthcare Marketing Director, CIO",
    "industry": "Healthcare",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "enforcement_action",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 70,
    "category": "Compliance & Regulatory",
    "company": "Regulation: Section 508 — FY 2025 GSA Governmentwide Assessment",
    "summary": "GSA's third annual FY 2025 Governmentwide Section 508 Assessment found the federal government continues to fall short of its legal obligations to ensure equal access for persons with disabilities, despite strengthened acquisition and procurement practices. The assessment specifically highlighted gaps in video and multimedia accessibility — including missing captions, absent audio descriptions, and inaccessible video players. Federal agencies are legally required to purchase ICT that is Section 508 accessible, and using non-compliant video platforms in federal procurements creates direct legal exposure. CHCOC guidance confirmed Section 508 requirements are unaffected by DEI executive orders and remain fully mandatory.",
    "source_url": "https://www.section508.gov",
    "why_vbrick": "The GSA assessment creates an auditable compliance gap that federal IT procurement teams must address in their next acquisition cycle. Vbrick's Section 508 certification, with auto-captioning, audio description support, keyboard navigation, and screen-reader-compatible player controls, directly satisfies the accessibility gaps identified in the GSA assessment. Federal agencies that cannot document Section 508 compliance for their video infrastructure face both legal exposure and audit findings — making Vbrick's certification a procurement qualifier, not just a feature.",
    "outreach_angle": "",
    "target_persona": "Section 508 Program Manager, Agency CIO, Procurement Officer",
    "industry": "Federal Government",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "regulatory_change",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [
      {
        "name": "David A. Shive",
        "title": "Chief Information Officer",
        "linkedin": "https://www.linkedin.com/in/david-shive-4b4a1711"
      },
      {
        "name": "Sid Sripada",
        "title": "Division Director, Digital Infrastructure Technologies",
        "linkedin": "https://www.linkedin.com/in/sidsripada"
      },
      {
        "name": "Shannon Casucci",
        "title": "Director, Office of Public Buildings Information Technology Services",
        "linkedin": "https://www.linkedin.com/in/shannon-casucci-a05b89b"
      },
      {
        "name": "Joseph Hoyt",
        "title": "Acting Chief Information Security Officer (CISO)",
        "linkedin": ""
      },
      {
        "name": "Lawrence Hale",
        "title": "Acting Assistant Commissioner, Information Technology Category",
        "linkedin": ""
      },
      {
        "name": "Lesley Briante",
        "title": "Associate CIO of Digital Management",
        "linkedin": ""
      },
      {
        "name": "Cara Battaglini Schatz",
        "title": "Director, Outreach Communications, Federal Acquisition Service IT Category",
        "linkedin": "https://www.linkedin.com/in/cara-battaglini-schatz-718a3b3"
      }
    ],
    "is_new": true
  },
  {
    "id": 71,
    "category": "Fortune 500 Accounts",
    "company": "JPMorgan Chase",
    "summary": "JPMorgan Chase posted a Video Production Specialist role within its Corporate and Firmwide Employee Communications team (January 2026, now filled). The role covered internal communications video, digital signage, broadcast news, informational video, and event activations across the firm. Separately, the bank posted an Internal Communications Associate role for the Chief Information Office, referencing large-scale events including town halls, tech center site visits, and an annual Global Technology Senior Leadership Conference for tens of thousands of employees. JPMorgan Chase's $19.8B FY2025 tech spend—70%+ of applications in public or private cloud—signals an IT organization actively scaling collaboration infrastructure.",
    "source_url": "https://www.builtinnyc.com/job/video-production-specialist/8236384",
    "why_vbrick": "With 300,000+ employees globally and a hybrid cloud infrastructure, JPMorgan Chase requires enterprise-grade eCDN for firm-wide town halls and compliance-regulated video archiving. VBRICK's FINRA-ready archiving, SOC II Type 2, real-time analytics, and Microsoft 365/Teams integration directly address the financial services security and records-management requirements visible in these postings. The firm's active investment in AI and GenAI (AI solutions in production doubled in 2025) makes VBRICK's AI search and transcription capabilities additionally compelling.",
    "outreach_angle": "",
    "target_persona": "Head of Employee Communications / CIO Infrastructure",
    "industry": "Financial Services",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "job_posting",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [
      {
        "name": "Heather Barbakoff",
        "title": "Executive Director, Senior Communications Manager, Global Technology",
        "linkedin": "https://www.linkedin.com/in/heatherbarbakoff"
      },
      {
        "name": "Kanti S",
        "title": "Executive Director, Head Of Enterprise Technology Communications",
        "linkedin": "https://www.linkedin.com/in/kantishrestha"
      },
      {
        "name": "Pallavi J",
        "title": "Vice President - IT Infrastructure",
        "linkedin": "https://www.linkedin.com/in/pallavi-j-21532614"
      },
      {
        "name": "Lee Wilson",
        "title": "JPMC VP Infrastructure",
        "linkedin": "https://www.linkedin.com/in/lee-wilson-8a67302"
      },
      {
        "name": "Ruby Murray",
        "title": "Executive Director, Global Head Of Learning - Legal And Internal Audit",
        "linkedin": "https://www.linkedin.com/in/ruby-murray-b6976a4"
      },
      {
        "name": "Matthew Davis",
        "title": "Learning Lead - Firmwide Talent Development Education, Vice President",
        "linkedin": "https://www.linkedin.com/in/dvgpro"
      },
      {
        "name": "Karthik Viswanathan",
        "title": "Senior Vice President, Infrastructure Engineering",
        "linkedin": "https://www.linkedin.com/in/itskarthik1983"
      }
    ],
    "is_new": true
  },
  {
    "id": 72,
    "category": "Fortune 500 Accounts",
    "company": "Walmart",
    "summary": "Walmart posted multiple senior communications leadership roles in Q1 2026, including a Director of Communications for Owned Website & Email (March 2026, $110K–$220K) and a Senior Director, Communications ($130K–$260K). Both roles explicitly reference managing enterprise-wide internal communications channels including intranet, digital signage, and video messages for Walmart's 1.6 million U.S. associates. The Director role specifically calls out 'AI adoption across owned-channel ecosystem' and 'video messages' as key responsibilities, signaling a modernization of internal video infrastructure at scale.",
    "source_url": "https://careers.walmart.com/us/en/jobs/R-2448483",
    "why_vbrick": "Walmart's scale (1.6M associates, 10,000+ store locations) creates a massive eCDN distribution challenge for live and on-demand video. VBRICK's eCDN can reduce bandwidth load up to 98% across distributed retail locations, while its AI search and transcription capabilities align with the company's explicit requirement for AI-enabled content operations. GDPR compliance is relevant for Walmart's international operations. The Director role's call for AI-governed content workflows maps directly to VBRICK's automated transcription and AI search.",
    "outreach_angle": "",
    "target_persona": "SVP Global Communications / VP Employee Experience",
    "industry": "Retail",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "job_posting",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [
      {
        "name": "Suresh Kumar",
        "title": "Executive VP, Global CTO & Chief Development Officer",
        "linkedin": "https://digitaldefynd.com/IQ/meet-the-executive-csuite-team-of-walmart/"
      },
      {
        "name": "Hari Vasudev",
        "title": "EVP and Tech Operating Partner, Walmart U.S.",
        "linkedin": "https://www.linkedin.com/in/harivasudev"
      },
      {
        "name": "Jerry R. Geisler III",
        "title": "EVP and Chief Information Security Officer",
        "linkedin": "https://www.linkedin.com/in/jerry-geisler-289824b0"
      },
      {
        "name": "Mischa Dunton",
        "title": "Group Director, Global Communications, Head of Walmart Global Tech Communications",
        "linkedin": "https://www.linkedin.com/in/mischa-dunton-3314bb"
      },
      {
        "name": "Jessica Smith",
        "title": "Director of Communications, Emerging Technologies, Walmart Global Tech",
        "linkedin": "https://www.linkedin.com/in/jmsmith438"
      },
      {
        "name": "Mandy McDonald-Brashear",
        "title": "SVP and Chief People Officer, Global Corporate Functions",
        "linkedin": "https://www.linkedin.com/in/mandy-mcdonald-brashear"
      },
      {
        "name": "Sherin Sunny",
        "title": "Sr Software Engineering Manager Architect, Vizio (Walmart)",
        "linkedin": "https://www.linkedin.com/in/sunnysherin"
      }
    ],
    "is_new": true
  },
  {
    "id": 73,
    "category": "Fortune 500 Accounts",
    "company": "Comcast",
    "summary": "Comcast posted a Sr. Manager, Internal Communications role in March 2026 (Philadelphia, PA) supporting Finance, Legal, Strategic Development, and Enterprise Business Intelligence teams—covering employee populations of 200 to 2,400 per business unit. The posting explicitly calls for experience executing deliverables across 'videos, social platforms, digital content,' and graphic design/video production proficiency. Comcast also recently ran a Digital Internal Comms Co-op that referenced enterprise communications channels, intranet innovation, and analytics dashboards, signaling active investment in its internal video and digital communications infrastructure for its 186,000+ employee workforce.",
    "source_url": "https://jobs.comcast.com/job/philadelphia/sr-manager-internal-communications/45483/93005900368",
    "why_vbrick": "Comcast operates a complex, multi-site media and technology enterprise with 186,000+ employees. Scaling video across its headquarters, regional offices, and broadcast facilities requires enterprise eCDN capabilities. VBRICK's Microsoft 365/Teams integration, real-time analytics, and Section 508 compliance (applicable for public-facing communications) are differentiators. Comcast's active upgrade of internal digital channels signals a buyer ready to evaluate enterprise video platform modernization.",
    "outreach_angle": "",
    "target_persona": "Director, Internal Communications / VP Employee Engagement",
    "industry": "Media & Technology",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "job_posting",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [
      {
        "name": "Michael Crisafulli",
        "title": "SVP, Chief Information Officer, Comcast Cable",
        "linkedin": "https://www.linkedin.com/in/michael-crisafulli-2056905"
      },
      {
        "name": "Rick Rioboli",
        "title": "EVP, CTO, Comcast",
        "linkedin": "https://www.linkedin.com/in/rickrioboli"
      },
      {
        "name": "Belal Hamzeh",
        "title": "VP, Technology and Systems Engineering, Comcast",
        "linkedin": "https://www.linkedin.com/in/belal-hamzeh-55232210"
      },
      {
        "name": "Brooke Zane",
        "title": "Chief Compliance Officer, VP & Senior Deputy General Counsel, Comcast Cable",
        "linkedin": "https://www.linkedin.com/in/brooke-zane-37481910"
      },
      {
        "name": "Sudhanshu Kairab",
        "title": "Deputy Global CISO, SVP Cybersecurity Governance Risk & Compliance, Comcast",
        "linkedin": "https://www.linkedin.com/in/sudhanshukairab"
      },
      {
        "name": "Dave Brophy",
        "title": "Director, Security & Compliance, Comcast",
        "linkedin": "https://www.linkedin.com/in/dave-brophy-a471b833"
      },
      {
        "name": "Lewis Mcpherson",
        "title": "Senior Manager, Video Infrastructure Engineering, Comcast",
        "linkedin": "https://www.linkedin.com/in/lewis-mcpherson-315b383"
      }
    ],
    "is_new": true
  },
  {
    "id": 74,
    "category": "Fortune 500 Accounts",
    "company": "Goodyear Tire & Rubber Company",
    "summary": "Goodyear posted two roles in Q1 2026: Director, Global Internal Communications (December 2025, LinkedIn) and Global Internal Communications Specialist (March 2026). The Director role explicitly requires building global internal communications strategy across 72,000+ employees in 50+ countries, executive communications, enterprise change management, and managing video and multimedia content. The Goodyear Forward strategic plan—a major business transformation program—is generating high demand for internal communications infrastructure to keep a globally distributed workforce aligned.",
    "source_url": "https://www.linkedin.com/jobs/view/director-global-internal-communications-at-the-goodyear-tire-rubber-company-4326874241",
    "why_vbrick": "A 72,000-employee global manufacturer undergoing business transformation (Goodyear Forward) is a classic VBRICK use case: live all-hands streaming, on-demand video libraries for training and change management, multi-language content, and eCDN for distributed plant/facility locations with constrained bandwidth. VBRICK's GDPR compliance and multi-site eCDN are directly relevant. The Director role's emphasis on 'international experience' and 'global organization' underscores the need for a platform that handles international distribution with analytics.",
    "outreach_angle": "",
    "target_persona": "Director, Global Internal Communications / CHRO",
    "industry": "Manufacturing",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "high",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "job_posting",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [
      {
        "name": "Dave Pellegrini",
        "title": "Vice President Information Technology, Americas",
        "linkedin_url": "https://www.linkedin.com/in/dpellegrini",
        "role": "Decision Maker"
      },
      {
        "name": "Christy Bykowski",
        "title": "Senior Director, Global Communications",
        "linkedin_url": "https://www.linkedin.com/in/christybykowski",
        "role": "Decision Maker"
      },
      {
        "name": "Christian Malkmus",
        "title": "Senior Director IT, Enterprise Architecture",
        "linkedin_url": "https://www.linkedin.com/in/christian-malkmus-3532177",
        "role": "Influencer"
      },
      {
        "name": "Judson Pitt",
        "title": "Director Of Information Technology",
        "linkedin_url": "https://www.linkedin.com/in/judsonpitt",
        "role": "Influencer"
      },
      {
        "name": "Amy Weller",
        "title": "Director Of Learning And Development",
        "linkedin_url": "https://www.linkedin.com/in/amy-weller",
        "role": "Influencer"
      },
      {
        "name": "Aaron Gibbons",
        "title": "Cloud Solutions Architect",
        "linkedin_url": "https://www.linkedin.com/in/aaron-gibbons",
        "role": "Technical Evaluator"
      },
      {
        "name": "Thierry Mamer",
        "title": "Solutions Architect",
        "linkedin_url": "https://www.linkedin.com/in/thierry-mamer",
        "role": "Technical Evaluator"
      },
      {
        "name": "Gloria Rangel",
        "title": "Director Compliance And Ethics",
        "linkedin_url": "https://www.linkedin.com/in/gloria-rangel-776ba16a",
        "role": "Technical Evaluator"
      },
      {
        "name": "Matt Clokey",
        "title": "Director, Global Facility Security Investigations",
        "linkedin_url": "https://www.linkedin.com/in/matt-clokey-cpp-667417b1",
        "role": "Technical Evaluator"
      }
    ],
    "is_new": true
  },
  {
    "id": 75,
    "category": "Fortune 500 Accounts",
    "company": "Capital One Financial",
    "summary": "Capital One posted an Internal Communications Business Partner role in Q1 2026 (Nottingham, UK) and a Sr. Manager, Corporate Communications role in McLean, VA and Richmond, VA. Capital One has historically relied on Zoom Rooms for hybrid video collaboration (documented 2022 deployment). As Microsoft Teams continues expanding its town hall and eCDN capabilities (April 2026 licensing update adding eCDN to all Teams Enterprise users), Capital One—a Microsoft Teams customer operating in a highly regulated financial environment—is a prime candidate for eCDN partner evaluation.",
    "source_url": "https://www.strictlyinternal.com/p/internal-communications-jobs-jan-5-2026",
    "why_vbrick": "Capital One (~55,000 employees) operates under strict FINRA and financial services compliance. With Microsoft's April 2026 update moving eCDN into Teams core (previously Teams Premium-only), Capital One IT and communications teams will face new configuration decisions on whether to use Microsoft eCDN or a certified partner like VBRICK. VBRICK's FINRA-ready archiving and real-time analytics create a compelling case for a third-party eCDN that provides deeper compliance reporting than Microsoft's native solution.",
    "outreach_angle": "",
    "target_persona": "IT Infrastructure Lead / Head of Internal Communications",
    "industry": "Financial Services",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "tech_stack_change",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [
      {
        "name": "Srini Uppalapati",
        "title": "Managing Vice President, Digital at CapitalOne",
        "linkedin_url": "https://www.linkedin.com/in/srini-uppalapati-b24221bb",
        "role": "Decision Maker"
      },
      {
        "name": "Carlisle Campbell",
        "title": "Managing Vice President, Head Of Corporate Communications",
        "linkedin_url": "https://www.linkedin.com/in/carlisle-campbell-01b58114",
        "role": "Decision Maker"
      },
      {
        "name": "Ashley Richardson",
        "title": "Director Internal Communications",
        "linkedin_url": "https://www.linkedin.com/in/ashley-richardson-5b872a58",
        "role": "Decision Maker"
      },
      {
        "name": "Indu Jain",
        "title": "Chief Technology Officer, Vice President",
        "linkedin_url": "https://www.linkedin.com/in/indujain",
        "role": "Decision Maker"
      },
      {
        "name": "Dylan Croslin",
        "title": "Director, Enterprise HR Learning And Development",
        "linkedin_url": "https://www.linkedin.com/in/dylancroslin",
        "role": "Influencer"
      },
      {
        "name": "David Wolf",
        "title": "Sr. Manager UC Engineering Lead",
        "linkedin_url": "https://www.linkedin.com/in/wolfnbro",
        "role": "Evaluator"
      },
      {
        "name": "Sampada Korumilli",
        "title": "Sr Network Security Engineer",
        "linkedin_url": "https://www.linkedin.com/in/sampada-korumilli-01a78929",
        "role": "Technical Evaluator"
      },
      {
        "name": "Alex Lane",
        "title": "Senior Manager, Information Security Office",
        "linkedin_url": "https://www.linkedin.com/in/aslirl",
        "role": "Technical Evaluator"
      }
    ],
    "is_new": true
  },
  {
    "id": 76,
    "category": "Fortune 500 Accounts",
    "company": "HCA Healthcare",
    "summary": "HCA Healthcare (260,000+ employees, 180+ hospitals) revealed in a HIMSS webinar (December 2025) the results of its enterprise-wide clinical communication platform implementation: ED to floor admissions 32 minutes faster, broadcast messaging saving 33 hours/day, and nurse call response times improved 40%. HCA also operates its HCA Inspire social platform for employee communications (mobile app). HCA's Q3 2025 earnings call referenced ongoing investments in 'digital transformation,' 'shared service platforms,' and 'new capabilities.' The company posted a Senior Communications Specialist role in Nashville (Q1 2026).",
    "source_url": "https://www.linkedin.com/posts/kellyelliotchallenger_clinicalcommunication-activity-7407455772013379586-GzER",
    "why_vbrick": "HCA Healthcare is a HIPAA-regulated enterprise with 260,000+ employees across distributed hospital and outpatient locations. VBRICK's HIPAA compliance and FedRAMP-ready deployment are directly relevant for clinical and administrative video communications. Real-time analytics would support HCA's documented focus on measuring communication effectiveness. An enterprise video platform would complement the HCA Inspire social comms layer with secure, scalable video for all-hands town halls, clinical training, and compliance content.",
    "outreach_angle": "",
    "target_persona": "Chief Digital Officer / VP Employee Communications",
    "industry": "Healthcare",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "internal_comms_investment",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [
      {
        "name": "Chad Wasserman",
        "title": "Senior Vice President & Chief Information Officer",
        "linkedin": "https://www.linkedin.com/in/chad-wasserman-7640178"
      },
      {
        "name": "Shahzad Fakhar",
        "title": "Vice President - IT Field Operations",
        "linkedin": "https://www.linkedin.com/in/shahzad-fakhar-27669349"
      },
      {
        "name": "Luis Navas",
        "title": "AVP, IT Infrastructure Engineering Operations",
        "linkedin": "https://www.linkedin.com/in/luisrnavas"
      },
      {
        "name": "Sarah Fry",
        "title": "Video Strategy Manager, Creative Services",
        "linkedin": "https://www.linkedin.com/in/sarah-fry-2441ab25"
      },
      {
        "name": "Matt Nahay",
        "title": "Manager, Video Content",
        "linkedin": "https://www.linkedin.com/in/matt-nahay-8131578"
      },
      {
        "name": "Sara Sweitzer",
        "title": "Senior Director Clinical Communications",
        "linkedin": "https://www.linkedin.com/in/sara-sweitzer-2696664"
      },
      {
        "name": "Laura Grams",
        "title": "Vice President, Leadership And Organizational Development",
        "linkedin": "https://www.linkedin.com/in/laura-grams-3b178bb"
      }
    ],
    "is_new": true
  },
  {
    "id": 77,
    "category": "Fortune 500 Accounts",
    "company": "Defense Information Systems Agency (DISA)",
    "summary": "DISA's Global Content Delivery Services II (GCDS-II, contract HC108421D0002) remains active through at least 2026, providing on-demand, dynamically scalable content delivery services—including streaming—for DISA and DISA-approved DoD locations globally. Amentum separately won a $120M DISA Computer Processing contract in December 2025. DISA's FY2025 Contracts Guide confirms ongoing IDIQ procurement for content delivery services encompassing web application availability, secure content delivery, and streaming. A new DISA contract for cloud browser isolation infrastructure ($201M) was released in February 2026, signaling active procurement modernization.",
    "source_url": "https://www.afcea.org/signal/resources/content/_DISA_Guide_FY2025.pdf",
    "why_vbrick": "DISA supports DoD's enterprise video and streaming requirements across CONUS and OCONUS. VBRICK's FedRAMP authorization, FIPS 140-2 compliance, and SOC II Type 2 certification position it directly for DoD/DISA video platform acquisitions. As GCDS-II approaches recompete and DISA modernizes its content delivery infrastructure, VBRICK's government-grade video streaming—available through GSA Schedule, SEWP, and NITAC—is well-positioned for task order opportunities. Urgency is elevated by active DISA procurement cycles.",
    "outreach_angle": "",
    "target_persona": "DISA Program Manager / DoD IT Procurement Officer",
    "industry": "Federal Government / Defense",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "federal_contract",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [
      {
        "name": "Paul T. Stanton",
        "title": "Director",
        "linkedin": "https://www.linkedin.com/in/paul-stanton6"
      },
      {
        "name": "Jeff Marshall",
        "title": "Director, DISA J-9 Hosting and Compute",
        "linkedin": "https://www.linkedin.com/in/jeff-marshall-bb2189a7"
      },
      {
        "name": "Steve Wallace",
        "title": "Chief Technology Officer, DISA Emerging Technology Directorate",
        "linkedin": "https://www.linkedin.com/in/steve-wallace-1771645"
      },
      {
        "name": "Byron Stephenson",
        "title": "J-9 Vice Director",
        "linkedin": "https://www.linkedin.com/in/byron-stephenson-ab7045241"
      },
      {
        "name": "Marcus Walker",
        "title": "Deputy Chief of Enterprise Operations",
        "linkedin": "https://www.linkedin.com/in/marcus-walker-36b8024b"
      },
      {
        "name": "Sharon Mcmillon",
        "title": "Vice Director for Programs / Deputy Chief Information Officer",
        "linkedin": "https://www.linkedin.com/in/sharonmcmillon"
      },
      {
        "name": "Katrina Logan",
        "title": "Director, Manpower and Personnel Directorate (J1)",
        "linkedin": "https://www.linkedin.com/in/katrina-logan-758a5a4"
      }
    ],
    "is_new": true
  },
  {
    "id": 78,
    "category": "Fortune 500 Accounts",
    "company": "Department of Veterans Affairs (VA)",
    "summary": "The VA's FY2026 IT budget (Volume 5) targets accelerated investments in infrastructure readiness, cybersecurity, and AI within constrained fiscal limits. The VA is deploying its Electronic Health Record (EHR) to 13 new sites in 2026, expanding 6,000+ EPS scheduling integrations, and modernizing Oracle Cerner deployments. With 400,000+ employees across 170 VA Medical Centers and 1,200+ outpatient facilities, the VA's internal communications and training video requirements are among the largest in federal government. The agency's FY2026 IT budget emphasis on AI and digital modernization signals openness to video platform upgrades.",
    "source_url": "https://department.va.gov/wp-content/uploads/2025/06/2026-Volume-5-Information-Technology-Programs-and-Electronic-Health-Record-Modernization.pdf",
    "why_vbrick": "The VA is a massive federal employer with both healthcare (HIPAA) and government (FedRAMP) compliance requirements—both of which VBRICK satisfies. The agency's ongoing EHR modernization and site expansions create urgent training and change management video needs. VBRICK's Section 508 accessibility compliance is a federal mandate for all VA communications. VBRICK's government contract vehicles (GSA Schedule, SEWP) reduce acquisition friction for VA procurement officers.",
    "outreach_angle": "",
    "target_persona": "VA CIO / Deputy Secretary for IT / Chief Communications Officer",
    "industry": "Federal Government / Healthcare",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "federal_contract",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [
      {
        "name": "Hemant Baidwan",
        "title": "Chief Information Security Officer (DHS CISO)",
        "linkedin": "https://www.linkedin.com/in/hbaidwan"
      },
      {
        "name": "Peyton Rollins",
        "title": "Digital Communications Director",
        "linkedin": "https://www.linkedin.com/in/peyton-rollins-"
      },
      {
        "name": "Matthew T Harmon",
        "title": "Director of Web Communications",
        "linkedin": "https://www.linkedin.com/in/mtharmon"
      },
      {
        "name": "Erica Pitts Dyson",
        "title": "Director Internal Communications",
        "linkedin": "https://www.linkedin.com/in/erica-pitts-dyson-89308121"
      },
      {
        "name": "Lisa Boothe",
        "title": "Director of Workforce Development",
        "linkedin": "https://www.linkedin.com/in/lisa-boothe-b5147596"
      },
      {
        "name": "Michelle Hoffman",
        "title": "Director of Learning And Development",
        "linkedin": "https://www.linkedin.com/in/michelle-hoffman-5823181b2"
      }
    ],
    "is_new": true
  },
  {
    "id": 79,
    "category": "Fortune 500 Accounts",
    "company": "Leidos",
    "summary": "Leidos (47,000+ employees, $17.2B FY2025 revenue) is expanding its DODNet modernization contract to eight additional DoD agencies, covering 100,000+ additional users, under its $11.5B, 10-year digital modernization agreement. The company posted a Communications and Outreach Manager role for a DHS program in Washington DC (Q1 2026). Leidos also secured a $561M MAC contract from Washington Headquarters Services alongside Booz Allen Hamilton and Deloitte (February 2026). As Leidos modernizes DoD networks for 300,000+ users, internal communications video platforms for its own workforce and for DoD client deployments are a procurement priority.",
    "source_url": "https://finance.yahoo.com/news/leidos-expands-dodnet-contract-long-031456103.html",
    "why_vbrick": "Leidos operates in cleared, high-security environments where FedRAMP, FIPS 140-2, and SOC II Type 2 are procurement prerequisites—exactly VBRICK's government compliance stack. The DODNet expansion to 100,000+ new users creates demand for secure video communication tools at those agencies. VBRICK can be procured through the same GWAC vehicles (SEWP, Alliant 3) that Leidos uses, enabling teaming or end-customer engagement. Leidos's own 47,000-employee enterprise also requires an internal video platform for training and executive communications.",
    "outreach_angle": "",
    "target_persona": "Leidos CIO / DoD IT Program Manager",
    "industry": "Defense / Federal IT Services",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "tech_stack_change",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [
      {
        "name": "Alexandra Guenther",
        "title": "SVP & Chief Information Officer",
        "linkedin": "https://www.linkedin.com/in/lexyguenther"
      },
      {
        "name": "Blake Nelson",
        "title": "Vice President Cloud Practice, Digital Modernization Sector",
        "linkedin": "https://www.linkedin.com/in/blakenelson"
      },
      {
        "name": "Thomas Downey",
        "title": "EVP, Communications, Marketing, and Government Affairs",
        "linkedin": "https://www.linkedin.com/in/thomas-downey-506562342"
      },
      {
        "name": "Leslie Fautsch",
        "title": "Chief Human Resources Officer",
        "linkedin": "https://www.linkedin.com/in/leslie-fautsch-jd-5355201"
      },
      {
        "name": "Erin Carey",
        "title": "Director, Tech & Innovation",
        "linkedin": "https://www.linkedin.com/in/3rincarey"
      },
      {
        "name": "Adam Frederick",
        "title": "Voice and Video Network Engineer",
        "linkedin": "https://www.linkedin.com/in/adam-frederick-b6a07472"
      },
      {
        "name": "Jonathan Jowers",
        "title": "Senior Principal Cybersecurity Compliance",
        "linkedin": "https://www.linkedin.com/in/jonathan-jowers-595676b"
      }
    ],
    "is_new": true
  },
  {
    "id": 80,
    "category": "Fortune 500 Accounts",
    "company": "Accenture",
    "summary": "Accenture (730,000+ employees) announced in December 2025 it is rolling out ChatGPT Enterprise to tens of thousands of employees for internal workflows and client-facing products. This large-scale AI deployment, combined with Accenture's recent push into agentic AI, signals a broader digital workplace modernization program. Accenture's global scale—730,000 employees in 50+ countries—and its heavy use of Microsoft 365 make its enterprise video infrastructure a significant decision area.",
    "source_url": "https://www.emarketer.com/content/accenture--deloitte-push-agentic-ai-enterprise-territory-shift",
    "why_vbrick": "At 730,000 employees, Accenture is one of the world's largest Microsoft 365 deployments. The April 2026 Teams licensing change (eCDN included in Teams core) triggers an immediate eCDN partner evaluation for Accenture's IT team. VBRICK's GDPR compliance and global content delivery capabilities are essential for Accenture's European and APAC operations. The firm's AI-first workplace strategy aligns with VBRICK's AI search, transcription, and video analytics. Accenture's own client service delivery also creates a channel partner opportunity.",
    "outreach_angle": "",
    "target_persona": "Global CIO / Head of Digital Workplace / IT Infrastructure Lead",
    "industry": "Professional Services / Technology",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "tech_stack_change",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [
      {
        "name": "Raju Yadav",
        "title": "Vice President - Cloud and Infrastructure Engineering",
        "linkedin": "https://www.linkedin.com/in/raju-yadav-809b6113"
      },
      {
        "name": "Kapil Khanna",
        "title": "VP - Accenture Intelligent Cloud and Infrastructure Operations Infrastructure Engineering",
        "linkedin": "https://www.linkedin.com/in/kapil-khanna-941a35a4"
      },
      {
        "name": "Carlo La Grotta",
        "title": "Manager-Digital Video Operation",
        "linkedin": "https://www.linkedin.com/in/carlolagrotta"
      },
      {
        "name": "Brittany Piano",
        "title": "Video and Collaboration Architect",
        "linkedin": "https://www.linkedin.com/in/brittany-piano-156611102"
      },
      {
        "name": "Patrick Rowe",
        "title": "Chief Compliance Officer and Deputy General Counsel",
        "linkedin": "https://www.linkedin.com/in/patrickroweuk"
      },
      {
        "name": "Rachel Frey",
        "title": "Chief Communications Officer",
        "linkedin": "https://www.linkedin.com/in/rachelfreyaccenture"
      },
      {
        "name": "Humera Siddique",
        "title": "VP, Global Talent Supply Chain",
        "linkedin": "https://www.linkedin.com/in/humera-siddique-05aaa0185"
      }
    ],
    "is_new": true
  },
  {
    "id": 81,
    "category": "Competitor Intelligence",
    "company": "Kaltura Enterprise Customers (Broad)",
    "summary": "Kaltura's analytics service experienced a 9.6-hour degradation on March 3, 2026, causing users to encounter slowness or complete failure when retrieving analytics data. IsDown monitoring shows Kaltura averaged 2.2 incidents/month over the past 5 years, with incidents in August 2025 (13 hours), July 2025 (6 hours), October 2025 (1 day AWS-wide), and December 2025. A Zoom integration outage also affected Kaltura in January 2025.",
    "source_url": "https://isdown.app/status/kaltura/incidents/546998-analytics-degradation",
    "why_vbrick": "VBRICK's real-time analytics architecture is core to its platform, not an afterthought. Persistent Kaltura analytics degradations undermine executives' ability to measure video ROI. VBRICK's SOC II Type 2 certification reflects the operational controls needed for consistent uptime.",
    "outreach_angle": "Lead with analytics reliability — 'Can you trust your video engagement data when your platform goes dark for 9+ hours?' Demonstrate VBRICK's always-on analytics with live demo.",
    "target_persona": "Director of Corporate Communications / VP of Learning & Development",
    "industry": "Enterprise (Cross-industry)",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Service Outage",
    "finding_id": "",
    "competitor": "Kaltura",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 82,
    "category": "Competitor Intelligence",
    "company": "Panopto Enterprise Customers",
    "summary": "Panopto's iOS/Android app carries a 1.7/5 rating on the Apple App Store with 240 ratings. Recurring complaints include: video/audio desynchronization, blank video with working audio, no audio with working screen, speed control failures, offline video requiring internet access, and a UI that 'shouldn't partner with schools because the app is not properly built.' G2 enterprise reviewers note the platform 'feels slow and clunky,' upload/processing times are longer than expected, and editing tools are 'not as smooth or intuitive.' SSO migration is described as 'challenging and difficult' for admins. Pricing is repeatedly flagged as 'expensive and keeps increasing.'",
    "source_url": "https://www.g2.com/products/panopto/reviews",
    "why_vbrick": "VBRICK's modern platform is built for enterprise reliability across devices, with a well-maintained mobile experience and SSO that integrates natively with enterprise identity providers. For organizations with mobile-first workforces or field operations, VBRICK eliminates the friction that drives Panopto user abandonment.",
    "outreach_angle": "UX-led displacement: 'When your video platform has a 1.7-star mobile app and audio syncs are broken in lecture capture, learner adoption suffers. VBRICK's enterprise video experience is built for reliability across every device your workforce uses.'",
    "target_persona": "VP of Learning & Development / Director of Training / IT Director",
    "industry": "Higher Education / Healthcare / Enterprise L&D",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "High",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Negative Review / User Experience",
    "finding_id": "",
    "competitor": "Panopto",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 83,
    "category": "Competitor Intelligence",
    "company": "Panopto Enterprise Customers (Pricing-Sensitive)",
    "summary": "Panopto's enterprise pricing starts at $7,500/year minimum according to multiple verified sources, with actual enterprise contracts typically running $10,000+/year (Vendr market data). Panopto does not publish pricing publicly. G2 reviewers specifically call out that pricing 'keeps increasing' and that enhanced features are 'behind a paid wall.' Panopto changed its pricing model to charge for stored hours — whether played or not — forcing institutions to implement archiving policies to manage costs.",
    "source_url": "https://www.vendr.com/marketplace/panopto",
    "why_vbrick": "VBRICK's pricing includes native compliance archiving, eCDN, AI transcription, and search — capabilities that typically require Panopto add-ons or separate vendor purchases. VBRICK's total cost of ownership is competitive against Panopto's rising base + add-on cost structure.",
    "outreach_angle": "TCO comparison: 'Panopto charges for stored hours whether watched or not, and keeps adding paid walls on features. VBRICK's platform includes compliance archiving, AI search, and eCDN in the base package — let's do a TCO comparison at your renewal.'",
    "target_persona": "CFO / VP of IT / Director of Procurement",
    "industry": "Higher Education / Enterprise",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "Medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Pricing Concern",
    "finding_id": "",
    "competitor": "Panopto",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 84,
    "category": "Competitor Intelligence",
    "company": "Vimeo Enterprise Customers (GDPR/EU Regulated)",
    "summary": "Vimeo defaults to US-based data hosting with EU hosting available only as an optional add-on on Enterprise plans. GDPR compliance requires explicit configuration and a custom Data Processing Addendum (DPA) — it is not GDPR-compliant by default. SSO (SAML 2.0) and SCIM provisioning are gated behind Enterprise plans and require sales-assisted activation. SCIM only supports Okta and Azure AD — leaving Google Workspace users without native automation. Real-time analytics are only available for live events; VOD analytics are delayed.",
    "source_url": "https://www.stitchflow.com/scim/vimeo",
    "why_vbrick": "VBRICK's enterprise platform provides SOC II Type 2, GDPR, and HIPAA compliance natively without requiring Enterprise plan upgrades or manual DPA configuration. For EU-operating enterprises, VBRICK's compliance-by-default posture removes the liability that Vimeo's opt-in model creates.",
    "outreach_angle": "Compliance-led: 'Vimeo's GDPR compliance requires manual DPA activation, and SCIM only works if you pay for Enterprise. VBRICK ships with GDPR compliance built in — no friction, no surprise add-ons.'",
    "target_persona": "Chief Compliance Officer / DPO / VP of IT",
    "industry": "Financial Services / Healthcare / EU Enterprise",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "Medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "Compliance Gap",
    "finding_id": "",
    "competitor": "Vimeo Enterprise",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 85,
    "category": "Compliance & Regulatory",
    "company": "Regulation: Video Privacy Protection Act (VPPA) — Enterprise Litigation Risk",
    "summary": "VPPA litigation continues to generate significant enterprise exposure as courts apply the 1988 law to modern enterprise video platforms sharing viewer data with third-party analytics services. In 2025, federal appellate courts issued mixed decisions on what constitutes 'personally identifiable information' under the VPPA — with some circuits allowing claims to proceed when logged-in status or contact information is shared with viewing data. The NFL filed an amicus brief asking the Supreme Court to address the VPPA circuit split involving the NBA, and depending on the outcome, it could either expand or constrain enterprise liability. California's SB 690 would carve out commercial tracking that complies with CCPA but will not take effect until at least 2027.",
    "source_url": "https://pandectes.io/blog/digital-consent-in-2025-the-ongoing-influence-of-the-vppa-on-privacy/",
    "why_vbrick": "Enterprises embedding video content on public websites or internal portals that share viewer identification data with third-party analytics (Google Analytics, advertising pixels) face VPPA class action exposure. Vbrick's closed enterprise architecture — without third-party tracker integrations or advertising data sharing — avoids the specific data disclosure pattern that triggers VPPA claims. Legal and compliance teams evaluating video platform risk will prioritize platforms that cannot generate VPPA liability by design, particularly as the Supreme Court may expand the law's application.",
    "outreach_angle": "",
    "target_persona": "General Counsel, DPO, VP Technology",
    "industry": "Enterprise / Media / Retail",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "regulatory_change",
    "finding_id": "",
    "compliance_standard": "",
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 86,
    "category": "Fortune 500 Accounts",
    "company": "UniFirst Corporation",
    "summary": "UniFirst (16,000 employees, $2B revenue, uniform/facility services) posted an Associate Director, Internal Communications & Employee Experience in Wilmington, MA (Q1 2026, $138K–$184K). The role explicitly requires 'compelling content for internal and business communications channels, including intranet, newsletters, digital signage, and video messages' and states the company is 'growing and transforming fast.' The posting calls for experience with 'technology platforms and analytics to enhance communications and measure impact,' confirming investment intent in video-capable communications infrastructure.",
    "source_url": "https://www.indeed.com/q-internal-communications-content-manager-jobs.html",
    "why_vbrick": "UniFirst's 16,000 associates across multi-location service operations represent a distributed workforce model that benefits from eCDN-optimized video delivery. The explicit mention of digital signage and video messages alongside analytics signals an intent to invest in a video platform. VBRICK's real-time analytics and Microsoft 365 integration would satisfy the measurement KPI requirement. This is a net-new buyer showing first-time investment signals.",
    "outreach_angle": "",
    "target_persona": "Associate Director, Internal Communications / CHRO",
    "industry": "Business Services",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "job_posting",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [],
    "is_new": true
  },
  {
    "id": 87,
    "category": "Fortune 500 Accounts",
    "company": "Amazon",
    "summary": "Amazon posted multiple multimedia storyteller and content creator roles within its Operations Internal Communications team, serving 1.5+ million Operations employees globally. Roles reference producing 'video storytelling,' coordinating film crews, publishing to 'owned internal channels,' and delivering content to frontline employees. A separate Amazon Devices & Services Internal Communications Specialist role references 'large- and small-scale internal events.' Amazon's scale—with 1.5M+ Operations employees—creates a massive requirement for scalable video distribution infrastructure that consumer-grade tools cannot support.",
    "source_url": "https://amazon.jobs/en/jobs/3199525/multimedia-storyteller-operations-internal-communications",
    "why_vbrick": "Amazon's 1.5M+ employee internal communications operation is one of the largest in the world. Scaling video for all-hands events, operational briefings, and executive messages across warehouse, logistics, and corporate facilities globally requires purpose-built enterprise eCDN. VBRICK's AI transcription and search would address the accessibility and multilingual workforce requirements implicit in Amazon's global frontline population. Microsoft 365 integration is relevant given Amazon's hybrid toolset.",
    "outreach_angle": "",
    "target_persona": "VP, Operations Internal Communications / Head of Employee Technology",
    "industry": "E-Commerce / Technology",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "job_posting",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [
      {
        "name": "Stephany Rochon",
        "title": "Director, Internal Communications",
        "linkedin_url": "https://www.linkedin.com/in/srochon",
        "role": "Decision Maker"
      },
      {
        "name": "Veronica Toney",
        "title": "Editor In Chief, Internal Corporate Communications",
        "linkedin_url": "https://www.linkedin.com/in/veronicatoney",
        "role": "Decision Maker"
      },
      {
        "name": "James Pemberton",
        "title": "Global Director Of Amazon Corporate IT - Engineering, Infrastructure Operations",
        "linkedin_url": "https://www.linkedin.com/in/jimpem",
        "role": "Influencer"
      },
      {
        "name": "Arindam Chakraborty",
        "title": "Product Leader",
        "linkedin_url": "https://www.linkedin.com/in/arindamc1",
        "role": "Evaluator"
      },
      {
        "name": "Aarthi Janakiraman",
        "title": "Senior Manager Information Security",
        "linkedin_url": "https://www.linkedin.com/in/aarthi-janakiraman-58a95bb",
        "role": "Technical Evaluator"
      },
      {
        "name": "Shirin Bhambhani",
        "title": "Sr. Specialist Solutions Architect - Networking",
        "linkedin_url": "https://www.linkedin.com/in/shirinbhambhani",
        "role": "Technical Evaluator"
      },
      {
        "name": "Monica Li",
        "title": "Senior Manager Security Compliance",
        "linkedin_url": "https://www.linkedin.com/in/monica-li-8862451",
        "role": "Technical Evaluator"
      },
      {
        "name": "Ashraf Altalleh",
        "title": "Sr. Solutions Architect",
        "linkedin_url": "https://www.linkedin.com/in/ashrafaltalleh",
        "role": "Technical Evaluator"
      }
    ],
    "is_new": true
  },
  {
    "id": 88,
    "category": "Fortune 500 Accounts",
    "company": "Boeing",
    "summary": "Boeing Defense, Space & Security posted an Audio Visual Technician role in Herndon, VA (early 2025) supporting Mission Systems Operations, with responsibilities including AV solution installation, video conferencing, streaming, and content distribution for proprietary programs. The role required experience with Cisco Hyperflex, Crestron, and video conferencing systems. Boeing (140,000+ employees) also posted a Commercial Manager role in its Digital business unit (March 2026) focused on digital business growth. Boeing's classified and unclassified programs span hundreds of facilities requiring secure video streaming.",
    "source_url": "https://www.indeed.com/q-boeing-media-jobs.html",
    "why_vbrick": "Boeing's defense programs require video platforms that meet DoD security standards—FedRAMP, FIPS 140-2, and ITAR-relevant security controls. VBRICK's government compliance credentials and its track record with defense contractors position it well. Boeing's scale (140,000+ employees, global facilities) creates demand for eCDN to distribute town halls and training content efficiently. The explicit AV/streaming role signals active infrastructure build-out at Boeing's classified program facilities.",
    "outreach_angle": "",
    "target_persona": "VP IT Infrastructure / Director, Enterprise Communications",
    "industry": "Aerospace & Defense",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "job_posting",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [
      {
        "name": "Ken Wang",
        "title": "Vice President of IT",
        "linkedin": "https://www.linkedin.com/in/ken-wang-50851550"
      },
      {
        "name": "Richard Stewart",
        "title": "Senior Director, Boeing IT Enterprise IT Operations",
        "linkedin": "https://www.linkedin.com/in/richard-stewart-391341153"
      },
      {
        "name": "Dennis Pickett",
        "title": "Visual Communications Architect",
        "linkedin": "https://www.linkedin.com/in/dennis-pickett-97069416"
      },
      {
        "name": "Joe Touey",
        "title": "VP, Enterprise Business Systems CIO",
        "linkedin": "https://www.linkedin.com/in/joetoueygsk"
      },
      {
        "name": "Michele Denny",
        "title": "Senior Director, IT Business Partner BGS Commercial Services",
        "linkedin": "https://www.linkedin.com/in/michele-denny-31043315"
      },
      {
        "name": "Wilson Chow",
        "title": "Vice President of Corporate And Employee Communications",
        "linkedin": "https://www.linkedin.com/in/wilson-r-chow"
      },
      {
        "name": "Kirsten Aranda Schwab",
        "title": "Chief Human Resource Officer, Boeing Commercial Airplanes",
        "linkedin": "https://www.linkedin.com/in/kirsten-aranda-schwab-60796684"
      }
    ],
    "is_new": true
  },
  {
    "id": 89,
    "category": "Fortune 500 Accounts",
    "company": "Pfizer",
    "summary": "Pfizer (88,000+ employees) is managing a major business transition in 2026, revising revenue guidance to $59.5–$62.5B and undertaking significant restructuring following COVID product revenue declines. The company hosted a live conference call and webcast in December 2025, and routinely delivers executive investor communications via live streaming. Pfizer's large, globally distributed pharmaceutical workforce requires secure video for regulatory training, R&D collaboration, and change management communications during its restructuring period.",
    "source_url": "https://www.pfizer.com/print/pdf/node/562723",
    "why_vbrick": "Pfizer's 88,000+ employees across global pharmaceutical operations require HIPAA-compliant, GDPR-compliant video communications. Active restructuring creates surge demand for change management video content. VBRICK's AI search and transcription capabilities would reduce production burden for Pfizer's compliance training libraries. The company's investor webcast infrastructure is a potential entry point to discuss enterprise-grade video management across the organization.",
    "outreach_angle": "",
    "target_persona": "Chief Communications Officer / VP HR Technology",
    "industry": "Pharmaceuticals",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "low",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "internal_comms_investment",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [
      {
        "name": "Glenn Coulter",
        "title": "VP Infrastructure And Operations, Global Network Services",
        "linkedin": "https://www.linkedin.com/in/glenn-coulter-405827"
      },
      {
        "name": "Chris Nardecchia",
        "title": "Senior Vice President, Chief Digital Information Officer",
        "linkedin": "https://www.linkedin.com/in/chrisnardecchia"
      },
      {
        "name": "James Tarone",
        "title": "Senior Director, Programmatic and Video",
        "linkedin": "https://www.linkedin.com/in/james-tarone-09338a7"
      },
      {
        "name": "Kurt Kimmel",
        "title": "Engineer-In-Charge",
        "linkedin": "https://www.linkedin.com/in/kurt-kimmel-b687628"
      },
      {
        "name": "Frank Briamonte",
        "title": "Vice President, Enterprise Employee Communications",
        "linkedin": "https://www.linkedin.com/in/frank-briamonte-9656a227"
      },
      {
        "name": "Sander De Beer",
        "title": "Vice President Human Resources - Worldwide R&D",
        "linkedin": "https://www.linkedin.com/in/sander-de-beer-3509873"
      },
      {
        "name": "Steve Miller",
        "title": "Senior Director, Digital for People Experience and Executive Operations & Corporate Communications",
        "linkedin": "https://www.linkedin.com/in/steve-miller-867ba610"
      }
    ],
    "is_new": true
  },
  {
    "id": 90,
    "category": "Fortune 500 Accounts",
    "company": "Deloitte",
    "summary": "Deloitte (470,000+ employees, 150 countries) deployed Anthropic's Claude AI to its entire global workforce in late 2025, implementing custom Claude 'personas' for accountants, consultants, and developers. The firm also posted a Senior Manager, Head of Change and Communications, Real Estate role in London (Q1 2026) and runs a significant internal communications infrastructure. Deloitte's AI-first internal strategy signals appetite for AI-augmented video platforms. The firm's 470,000-person scale makes it one of the largest enterprise video distribution challenges in professional services.",
    "source_url": "https://www.emarketer.com/content/accenture--deloitte-push-agentic-ai-enterprise-territory-shift",
    "why_vbrick": "Deloitte's global AI deployment and its scale (470,000 employees across 150 countries) create a natural requirement for AI-augmented video. VBRICK's AI transcription, multi-language support, and AI-powered search align with Deloitte's AI-first approach to workforce enablement. GDPR compliance is essential for Deloitte's European operations. The firm's active internal communications investment (including the real estate comms role) signals openness to modernizing video infrastructure. VBRICK's SOC II Type 2 would satisfy Deloitte's own client-grade compliance standards.",
    "outreach_angle": "",
    "target_persona": "CIO / Global Head of Internal Communications / Chief People Officer",
    "industry": "Professional Services",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "tech_stack_change",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [
      {
        "name": "Vivek Pandey",
        "title": "Managing Director - IT Strategy and Cloud Leader",
        "linkedin": "https://www.linkedin.com/in/vivek-pandey-04321a12"
      },
      {
        "name": "Eugene O'callaghan",
        "title": "Managing Director Technology Strategy, Engineering, CIO Program",
        "linkedin": "https://www.linkedin.com/in/eugene-o-callaghan"
      },
      {
        "name": "Sangeeta Neti",
        "title": "Service Line Leader - Vice President, Deloitte Technology & Infrastructure",
        "linkedin": "https://www.linkedin.com/in/sangeeta-neti-a541a64"
      },
      {
        "name": "Divyesh Jevtani",
        "title": "Senior Manager, Global Multimedia Services",
        "linkedin": "https://www.linkedin.com/in/divyeshjevtani"
      },
      {
        "name": "Jitender Arora",
        "title": "Partner North South Europe (NSE) CISO",
        "linkedin": "https://www.linkedin.com/in/jarora"
      },
      {
        "name": "Kristi Tampio",
        "title": "Global Director, People Advisory Leader For Deloitte Technology",
        "linkedin": "https://www.linkedin.com/in/ktampio"
      },
      {
        "name": "Sunil Simon",
        "title": "Senior Manager - AV/VC Collaboration and Streaming Solutions Leader",
        "linkedin": "https://www.linkedin.com/in/sunilsimon"
      }
    ],
    "is_new": true
  },
  {
    "id": 91,
    "category": "Fortune 500 Accounts",
    "company": "UnitedHealth Group / Optum",
    "summary": "UnitedHealth Group (440,000+ employees, $439B+ 2026 revenue guidance) is aggressively scaling AI across its Optum business, with AI solutions accelerating across Optum Health, Optum Insight, and Optum Rx. The Q3 2025 earnings call referenced 'accelerating investments' in AI applications and digital transformation. UnitedHealth is one of the largest employers in the U.S. healthcare sector, requiring HIPAA-compliant video communications for clinical training, regulatory compliance, and enterprise town halls.",
    "source_url": "https://www.snsinsider.com/blogs/unitedhealth-group-strengthens-healthcare-platform",
    "why_vbrick": "UnitedHealth Group's 440,000+ employee base spans clinical staff, health plan administrators, and technology workers—all requiring HIPAA-compliant video. VBRICK's HIPAA compliance, FedRAMP authorization (for government health programs), and real-time analytics address UHG's healthcare-specific requirements. The company's aggressive AI investment signals openness to AI-augmented video tools including VBRICK's AI transcription and search. The scale of all-hands communications for 440,000 employees demands eCDN for bandwidth management.",
    "outreach_angle": "",
    "target_persona": "Chief Digital Officer / VP Health Services Technology",
    "industry": "Healthcare / Insurance",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "internal_comms_investment",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [
      {
        "name": "Darrell Brooks",
        "title": "SVP, Infrastructure Services, UHG Information Technology",
        "linkedin": "https://www.linkedin.com/in/darrell-brooks-3a537a10"
      },
      {
        "name": "Jeremy Stern",
        "title": "Vice President, Information Technology",
        "linkedin": "https://www.linkedin.com/in/jeremy-stern-8442004"
      },
      {
        "name": "Daniel Thorson",
        "title": "IT Director, Datacenter Network Engineering",
        "linkedin": "https://www.linkedin.com/in/dan-thorson"
      },
      {
        "name": "Scott Moyer",
        "title": "Senior Manager, Network Engineering",
        "linkedin": "https://www.linkedin.com/in/scott-moyer-7819671"
      },
      {
        "name": "Vicki Schultz",
        "title": "Director, Provider Communications, UnitedHealthcare",
        "linkedin": "https://www.linkedin.com/in/vicki-schultz"
      },
      {
        "name": "Mark Archer",
        "title": "SVP, Enterprise Security Office",
        "linkedin": "https://www.linkedin.com/in/archerme"
      },
      {
        "name": "Dennis Genkinger",
        "title": "Sr. IS Architect",
        "linkedin": "https://www.linkedin.com/in/dennis-genkinger-0b64067"
      }
    ],
    "is_new": true
  },
  {
    "id": 92,
    "category": "Fortune 500 Accounts",
    "company": "Lockheed Martin",
    "summary": "Lockheed Martin (116,000 employees) maintains active job postings on its careers site including roles in systems engineering, AV integration, and secure communications across its defense programs. The company operates classified and unclassified facilities across the U.S. requiring secure video streaming and content distribution. Lockheed Martin's defense programs require FedRAMP, FIPS 140-2, and ITAR-compliant technology for all enterprise video communications. The company's ongoing classified programs at Herndon, VA and other SCIF locations demand secure video infrastructure.",
    "source_url": "https://www.lockheedmartinjobs.com/search-jobs/video/694/1/1&p=2",
    "why_vbrick": "Lockheed Martin's classified and unclassified program environments require the exact compliance stack VBRICK offers: FedRAMP authorization, FIPS 140-2 compliance, and government-grade SOC II Type 2 security. With 116,000 employees across 40+ U.S. states and international locations, eCDN is essential for executive town halls and program communications. VBRICK's track record in defense and government positions it as a natural fit. Available through SEWP and GSA Schedule, reducing procurement friction.",
    "outreach_angle": "",
    "target_persona": "VP IT & Digital / Enterprise Communications Director",
    "industry": "Aerospace & Defense",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "job_posting",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [
      {
        "name": "Maria Demaree",
        "title": "SVP and CIO, Enterprise Business & Digital Transformation",
        "linkedin": "https://www.linkedin.com/in/maria-demaree"
      },
      {
        "name": "Jenna McMullin",
        "title": "Senior Vice President, Chief Communications Officer",
        "linkedin": "https://www.lockheedmartin.com/en-us/who-we-are/leadership-governance/jenna-mcmullin.html"
      },
      {
        "name": "Kristopher Singer",
        "title": "Director, Digital Workplace & Communications Services",
        "linkedin": "https://www.linkedin.com/in/kristopher-singer"
      },
      {
        "name": "Daniel Driscoll",
        "title": "CIO and Digital Enablement Vice President, Lockheed Martin Space",
        "linkedin": "https://www.linkedin.com/in/daniel-driscoll-5619802a"
      },
      {
        "name": "Chris Wronsky",
        "title": "Senior Vice President and Chief Human Resources Officer",
        "linkedin": "https://www.lockheedmartin.com/en-us/who-we-are/leadership-governance.html"
      },
      {
        "name": "Leo Mackay",
        "title": "Senior Vice President, Ethics and Enterprise Assurance",
        "linkedin": "https://www.lockheedmartin.com/en-us/who-we-are/leadership-governance.html"
      },
      {
        "name": "Stuart Holliday",
        "title": "Senior Vice President, Chief Public Affairs Officer",
        "linkedin": "https://www.lockheedmartin.com/en-us/who-we-are/leadership-governance.html"
      }
    ],
    "is_new": true
  },
  {
    "id": 93,
    "category": "Fortune 500 Accounts",
    "company": "Goldman Sachs",
    "summary": "Goldman Sachs (40,000+ employees) hosted its TMT conference in December 2025, featuring live-streamed analyst presentations and corporate communications. The bank operates complex internal communications requirements for its globally distributed investment banking, asset management, and consumer banking divisions. Goldman Sachs's regulatory environment (FINRA, SEC) requires archiving and compliance-grade records management for all internal video communications including town halls, training, and client-facing media.",
    "source_url": "https://www.morganstanley.com/im/en-ie/intermediary-investor/insights/the-beat/the-beat-outlook-2026-video.html",
    "why_vbrick": "Goldman Sachs's FINRA and SEC compliance requirements make VBRICK's FINRA-ready archiving and SOC II Type 2 directly relevant. The bank's active conference streaming (TMT 2025) demonstrates existing large-scale video infrastructure investment. VBRICK's real-time analytics and AI search would improve discoverability of archived compliance training content. With 40,000+ employees across global trading floors and offices, eCDN ensures reliable delivery of firm-wide communications without network saturation.",
    "outreach_angle": "",
    "target_persona": "Head of Internal Communications / CTO / Chief Compliance Officer",
    "industry": "Financial Services / Investment Banking",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "low",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "internal_comms_investment",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [
      {
        "name": "Sriram Parthasarathy",
        "title": "Vice President Infrastructure SRE",
        "linkedin": "https://www.linkedin.com/in/sriram-parthasarathy-2b889919"
      },
      {
        "name": "Martin Schweitzer",
        "title": "Vice President – Global Head of Data Center Operations",
        "linkedin": "https://www.linkedin.com/in/martin-schweitzer-5524a7a"
      },
      {
        "name": "Caleb Rajkumar",
        "title": "Senior Multimedia Specialist- Lead",
        "linkedin": "https://www.linkedin.com/in/caleb-rajkumar-b70098a3"
      },
      {
        "name": "Gerald Witzel",
        "title": "Chief Information Security Officer",
        "linkedin": "https://www.linkedin.com/in/gerald-witzel-b2a964b"
      },
      {
        "name": "Nick Carcaterra",
        "title": "Managing Director, Corporate Communications",
        "linkedin": "https://www.linkedin.com/in/nick-carcaterra-a2119212"
      },
      {
        "name": "Kevin Durfee",
        "title": "Vice President, Learning & Talent Executive",
        "linkedin": "https://www.linkedin.com/in/kevin-durfee-a612b543"
      },
      {
        "name": "Joseph Stein",
        "title": "Executive Director, Corporate Communications",
        "linkedin": "https://www.linkedin.com/in/joseph-stein-9ab6b628"
      }
    ],
    "is_new": true
  },
  {
    "id": 94,
    "category": "Fortune 500 Accounts",
    "company": "Northrop Grumman",
    "summary": "Northrop Grumman (95,000+ employees) maintains active listings for Director of Communications and Media Manager roles on its careers portal. The company's Director of Communications role is actively posted, signaling investment in enterprise communications infrastructure. Northrop Grumman's defense and space programs require secure, cleared video distribution across facilities in Herndon VA, Melbourne FL, San Diego CA, and other locations. The company's Space Systems and Mission Systems divisions routinely require video training and secure event broadcasting.",
    "source_url": "https://jobs.northropgrumman.com",
    "why_vbrick": "Northrop Grumman's cleared environments require FedRAMP and FIPS 140-2 compliant video—a prerequisite VBRICK satisfies. With 95,000 employees across defense, space, and cyber divisions, enterprise eCDN is essential for firm-wide communications. VBRICK's government contract vehicles (SEWP, GSA) align with Northrop's procurement processes. The company's Director of Communications posting signals active investment in communications infrastructure modernization.",
    "outreach_angle": "",
    "target_persona": "VP IT / Director, Enterprise Communications",
    "industry": "Aerospace & Defense",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "job_posting",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [
      {
        "name": "Travis Garriss",
        "title": "Vice President and Chief Information and Digital Officer",
        "linkedin": "https://www.linkedin.com/in/travisgarriss"
      },
      {
        "name": "Melanie M Heitkamp",
        "title": "Corporate Vice President and Chief Human Resources Officer",
        "linkedin": "https://www.linkedin.com/in/melanie-m-heitkamp-514ba099"
      },
      {
        "name": "Lucy Kennedy Ryan",
        "title": "Corporate Vice President and Chief Communications Officer",
        "linkedin": "https://www.linkedin.com/in/lucykennedyryan"
      },
      {
        "name": "Michael Clothier",
        "title": "Sector Chief Information Security Officer - Aeronautics",
        "linkedin": "https://www.linkedin.com/in/michael-clothier-82b35416"
      },
      {
        "name": "Paige Healey",
        "title": "Chief of Staff and Director, Communications",
        "linkedin": "https://www.linkedin.com/in/paigehealey"
      },
      {
        "name": "Joann Grbach",
        "title": "Senior Director Sector Communications Leader",
        "linkedin": "https://www.linkedin.com/in/joann-grbach-a706ab14"
      },
      {
        "name": "Nathan Drevna",
        "title": "Senior Director, Employee Communications",
        "linkedin": "https://www.linkedin.com/in/nathan-drevna-6472375b"
      }
    ],
    "is_new": true
  },
  {
    "id": 95,
    "category": "Fortune 500 Accounts",
    "company": "Chevron Corporation",
    "summary": "Chevron (45,000+ employees) presented at its November 2025 Investor Day on its AI-driven APOLO platform for shale development, signaling active AI technology investment across the enterprise. The company also hosted a live investor webcast for the presentation. Chevron's global operations span the U.S., Kazakhstan, Guyana, and the Eastern Mediterranean—creating significant requirements for multi-site video communications for safety briefings, operational updates, and executive town halls. Production output growth in 2025–2026 (8% increase) indicates workforce expansion and associated communications needs.",
    "source_url": "https://www.youtube.com/watch?v=jUlNwwPkXaY",
    "why_vbrick": "Chevron's distributed global energy operations (refinery sites, upstream fields, corporate campuses) are a natural eCDN use case where satellite and limited-bandwidth locations make efficient video distribution critical. VBRICK's eCDN can reduce bandwidth consumption by up to 98% at constrained sites. Chevron's AI investment signals openness to AI-augmented video (search, transcription). GDPR compliance is relevant for European operations. Safety training video delivery at oil and gas facilities is a core VBRICK use case.",
    "outreach_angle": "",
    "target_persona": "VP IT / Global Head of Employee Communications",
    "industry": "Energy / Oil & Gas",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "low",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "video_analytics_ai",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [
      {
        "name": "Les Copeland",
        "title": "Chief Information Officer",
        "linkedin": "https://www.linkedin.com/in/les-copeland-6b158918"
      },
      {
        "name": "Grant Gauld",
        "title": "Senior Technical Manager – IT Service Management, Application & Platform Engineering",
        "linkedin": "https://www.linkedin.com/in/grant-gauld-6996ba7a"
      },
      {
        "name": "Sarah Mahone",
        "title": "Program Manager, Global Exploration",
        "linkedin": "https://www.linkedin.com/in/sarah-mahone-b6647a12"
      },
      {
        "name": "Josh Durham",
        "title": "Video Collaboration Architect",
        "linkedin": "https://www.linkedin.com/in/josh-durham-10099428"
      },
      {
        "name": "Sherry Hunyadi",
        "title": "Chief Security Architect / General Manager, Cyber Intelligence Center",
        "linkedin": "https://www.linkedin.com/in/sherry-hunyadi"
      },
      {
        "name": "Lindsey Benton",
        "title": "Senior Manager, Communications Strategy, Planning and Analytics",
        "linkedin": "https://www.linkedin.com/in/lindseyabenton"
      },
      {
        "name": "Minh Lee",
        "title": "Principal Network Engineer",
        "linkedin": "https://www.linkedin.com/in/minh-lee-58b91927"
      }
    ],
    "is_new": true
  },
  {
    "id": 96,
    "category": "Fortune 500 Accounts",
    "company": "Morgan Stanley",
    "summary": "Morgan Stanley (~80,000 employees) hosted its TMT Conference in March 2026, including live-streamed sessions on AI, cybersecurity, and investment themes. The bank routinely livestreams investor and client events. Morgan Stanley's investment management and investment banking operations require FINRA-compliant recording and archiving of all client-facing and regulatory communications. The bank's active AI focus (featured at its TMT conference) signals readiness to evaluate AI-augmented communications platforms.",
    "source_url": "https://www.youtube.com/watch?v=eqxKvga-13w",
    "why_vbrick": "Morgan Stanley's FINRA regulatory environment requires archiving of all material communications—a core VBRICK capability. With 80,000+ employees across global trading floors, eCDN is critical for delivering firm-wide town halls without saturating trading floor networks. VBRICK's real-time analytics provide CIOs with visibility into video delivery quality during high-stakes regulatory communications. The bank's AI focus (TMT conference) signals openness to AI-enhanced video tools including VBRICK's transcription and search.",
    "outreach_angle": "",
    "target_persona": "Head of Internal Communications / CTO / Chief Compliance Officer",
    "industry": "Financial Services / Investment Banking",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "low",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "video_analytics_ai",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [
      {
        "name": "Michael Tuosto",
        "title": "Video Conferencing and Streaming Media Tech Manager",
        "linkedin": "https://www.linkedin.com/in/michael-tuosto-47796b3"
      },
      {
        "name": "Chirag Shah",
        "title": "Vice President - IT Infrastructure Project Manager",
        "linkedin": "https://www.linkedin.com/in/chirag-shah-37885551"
      },
      {
        "name": "L Max Perez",
        "title": "Vice President - IT Operations and Program Lead (ITAM)",
        "linkedin": "https://www.linkedin.com/in/lmaxperez"
      },
      {
        "name": "Tully Cunningham",
        "title": "Executive Director, Enterprise Technology Services",
        "linkedin": "https://www.linkedin.com/in/tully-cunningham-13a3714"
      },
      {
        "name": "Megan Powers",
        "title": "Executive Director, Head Of Innovation, Platforms And Communications Compliance",
        "linkedin": "https://www.linkedin.com/in/megan-powers-201a134"
      },
      {
        "name": "Lynn Cocchiola",
        "title": "Executive Director, Morgan Stanley Corporate Communications",
        "linkedin": "https://www.linkedin.com/in/lynn-cocchiola"
      },
      {
        "name": "Eileen Levy",
        "title": "Managing Director, HR Technology",
        "linkedin": "https://www.linkedin.com/in/eileenlevy"
      }
    ],
    "is_new": true
  },
  {
    "id": 97,
    "category": "Fortune 500 Accounts",
    "company": "Booz Allen Hamilton",
    "summary": "Booz Allen Hamilton (~35,000 employees) secured a spot on the $561M MAC contract from Washington Headquarters Services alongside Leidos and Deloitte in February 2026. Booz Allen's core business is delivering IT and digital modernization services to DoD and civilian agencies—including programs that require secure video communications and training content delivery. The firm's growing presence on DoD modernization contracts (including the ODCAPE Joint Data Support Division award) positions it as both a potential VBRICK channel partner and an end-customer for secure internal video.",
    "source_url": "https://www.govconwire.com/articles/whs-pentagon-booz-allen-hamilton-leidos-contract",
    "why_vbrick": "Booz Allen's cleared workforce (~35,000 employees, many with TS/SCI clearances) requires FedRAMP/FIPS 140-2-compliant video for internal training and client program support. VBRICK's government compliance credentials are a requirement, not a differentiator, in Booz Allen's operating environment. A channel partnership or teaming arrangement with Booz Allen could accelerate VBRICK placements across its DoD client base. Booz Allen is also a direct enterprise customer for its own internal communications platform.",
    "outreach_angle": "",
    "target_persona": "CIO / Director of Digital Workplace / DoD Program Manager",
    "industry": "Federal IT / Defense Consulting",
    "urgency_score": 1,
    "urgency_rationale": "",
    "confidence": "medium",
    "confidence_rationale": "",
    "evidence_quote": null,
    "source_verified": false,
    "source_type": "Other",
    "additional_sources": [],
    "date": "",
    "finding_type": "federal_contract",
    "finding_id": "",
    "employee_count": "Unknown",
    "is_fortune500": "Unverified",
    "current_platform": "Unknown",
    "corroborating_signals": 0,
    "stakeholders": [
      {
        "name": "Franco Susi",
        "title": "Vice President, Health IT Operations",
        "linkedin": "https://www.linkedin.com/in/franco-susi-6573169"
      },
      {
        "name": "Kyle Miller",
        "title": "Vice President, Infrastructure Cybersecurity",
        "linkedin": "https://www.linkedin.com/in/kyle-miller-459b5410"
      },
      {
        "name": "Christopher Meyer",
        "title": "Vice President of Technology",
        "linkedin": "https://www.linkedin.com/in/christopher-meyer-1924774"
      },
      {
        "name": "Natalie Ade",
        "title": "Internal Events Experiences Manager",
        "linkedin": "https://www.linkedin.com/in/natalie-ade-64b130114"
      },
      {
        "name": "Allison Barlotta",
        "title": "Chief Ethics and Compliance Officer",
        "linkedin": "https://www.linkedin.com/in/allison-barlotta-46429a133"
      },
      {
        "name": "Samantha Morsink",
        "title": "Vice President, Leadership, Talent Performance",
        "linkedin": "https://www.linkedin.com/in/samantha-morsink-53231b72"
      },
      {
        "name": "Kari Merkel",
        "title": "Director Brand, Experiences, Creative",
        "linkedin": "https://www.linkedin.com/in/kari-merkel-baa08647"
      }
    ],
    "is_new": true
  }
];
