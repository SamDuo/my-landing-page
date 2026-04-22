// Portfolio content — Samuel Duong
window.PORTFOLIO_DATA = {
  name: "Sam Duong",
  shortName: "Sam",
  tagline: "Spatial Data Scientist · Urban Analytics · ML",
  affiliation: {
    role: "Graduate Research Assistant",
    lab: "Center for Urban Resilience & Analytics (CURA)",
    org: "Georgia Institute of Technology",
  },
  location: "Atlanta, GA",
  phone: "470-854-2300",
  email: "qduong7@gatech.edu",
  links: {
    linkedin: "https://linkedin.com/in/sammduong",
    github: "https://github.com/SamDuo",
    scholar: "#",
  },
  bio: `Master's student in Urban Analytics at Georgia Tech with a strong focus on spatial analytics, census data, and urban systems. I build reproducible pipelines that integrate Census, GTFS, and POI data to study regional growth, accessibility, and neighborhood change at scale.`,
  bioExtra: `I'm a Graduate Research Assistant at Georgia Tech's Center for Urban Resilience & Analytics (CURA), where I work on building-code policy analysis and retrieval-augmented generation over municipal code knowledge bases. Previously Data Analyst Associate at Atlanta Beltline Inc.`,
  education: [
    {
      school: "Georgia Institute of Technology",
      degree: "M.S. in Urban Analytics",
      detail: "Concentration: ML & Spatial Analysis · Expected 2026",
      dates: "2024 – 2026",
      courses: "Regression Analysis, Foundations of Ethical AI, Remote Sensing, Transportation GIS, Urban Analytics",
    },
    {
      school: "Columbia University Engineering",
      degree: "Certificate in Applied Machine Learning",
      detail: "Online",
      dates: "Dec 2024",
      courses: "",
    },
    {
      school: "Georgia State University · Robinson College of Business",
      degree: "B.B.A. in Computer Information Systems",
      detail: "Concentration: Big Data Analysis",
      dates: "Jul 2024",
      courses: "Analysis of Business Data, Big Data Analysis, Business Analysis, Data Programming, Unstructured Data Management",
    },
  ],
  experience: [
    {
      role: "Graduate Research Assistant",
      org: "Center for Urban Resilience and Analytics · Georgia Tech",
      location: "Atlanta, GA",
      dates: "Aug 2025 – Present",
      bullets: [
        "Collect and preprocess building code ordinances and amendments for 120+ U.S. cities, transforming PDFs and scanned documents into structured datasets linked to FEMA hazard categories.",
        "Prepare quasi-experimental treatment and control groups by matching modern-code cities to comparable legacy-code cities, supporting difference-in-differences analysis of housing supply, affordability, and vulnerability outcomes.",
        "Help design and implement a Retrieval-Augmented Generation (RAG) system that powers natural-language queries over the building-code knowledge base, returning evidence-grounded answers with transparent citations for practitioners and policymakers.",
      ],
    },
    {
      role: "Data Analyst Associate",
      org: "Atlanta Beltline Inc.",
      location: "Remote · Atlanta, GA",
      dates: "Jun 2024 – Jul 2025",
      bullets: [
        "Collaborated on investment and demographic mapping projects using ArcGIS Online; helped develop GIS feature services and interactive web apps that improved data accessibility for 1,000+ stakeholders.",
        "Conducted spatial and statistical analyses with ArcGIS to support community resilience planning, mapping environmental and social vulnerabilities across metro Atlanta.",
        "Created 5 interactive story maps and visual reports that helped city agencies prioritize funding to underserved census tracts, boosting visibility for grant applications and advocacy efforts.",
      ],
    },
  ],
  projects: [
    {
      id: "polyscape",
      title: "PolyScape",
      subtitle: "Multi-scale GeoAI visualization for comparative site selection",
      category: "GeoAI",
      accent: "mapgrid",
      summary:
        "Geographic zoom level as the single continuous control dimension — from city-scale prediction surfaces, through district-scale SHAP lenses, to street-scale per-feature AI explanations.",
      tags: ["Mapbox GL", "Deck.gl", "FastAPI", "XGBoost", "SHAP", "H3"],
      github: "https://github.com/SamDuo/polyscape",
      live: null,
      sections: [
        {
          heading: "Core idea",
          body: "Geographic zoom level serves as the single, continuous control dimension governing what information the user sees — from aggregate prediction scores at city overview, through scenario-comparison contours at district level, to per-feature AI explanations at street level.",
        },
        {
          heading: "Scale → visualization mapping",
          list: [
            "City scale (z < 12) — Hex density surfaces + divergence contour lines",
            "District scale (12–15) — SHAP explanation lenses (radial bar charts)",
            "Street scale (z ≥ 15) — Pinned profile cards with waterfall charts",
          ],
        },
        {
          heading: "Stack",
          list: [
            "Frontend: Mapbox GL JS v3.9 · Deck.gl v9.1 · D3.js v7",
            "Backend: FastAPI · XGBoost · TreeSHAP · GeoShapley",
            "Data: Census ACS · Overture Maps · OSMnx · LODES · H3",
            "Cache: Redis",
          ],
        },
      ],
    },
    {
      id: "polyscape-heritage",
      title: "PolyScape Heritage",
      subtitle: "Walk through a UNESCO site. Make a choice. Watch the world change.",
      category: "Immersive / XR",
      accent: "heritage",
      summary:
        "Immersive 3D experience built for ImmerseGT 2026. Step inside the ruins of Carthage as a photorealistic Gaussian Splat world generated by World Labs Marble, explore artifacts, and branch the narrative between protect vs. do-nothing climate futures.",
      tags: ["Three.js", "SparkJS", "WebXR", "Gemini", "ElevenLabs", "World Labs"],
      github: "https://github.com/SamDuo/gtHackVR",
      live: null,
      sections: [
        {
          heading: "The experience",
          list: [
            "Enter Carthage — cinematic title card fades into a sunlit archaeological site on Byrsa Hill",
            "Explore freely (WASD + mouse) through the ruins and discover artifacts",
            "Ask questions — chat with an AI narrator powered by Gemini, hear responses via ElevenLabs",
            "Drag the timeline from 2026 to 2075 and see climate projections change around you",
            "At year 2040, choose Protect or Do Nothing — the world transforms accordingly",
          ],
        },
        {
          heading: "Climate grounding",
          body: "All projections are grounded in IPCC AR6 WG1 Ch.12 (2021) SSP5-8.5 Mediterranean temperature and sea-level projections and the UNESCO Climate Vulnerability Index (2022). Carthage: +3.1°C anomaly, +58 cm sea level rise, severe erosion risk by 2075.",
        },
        {
          heading: "Tech stack",
          list: [
            "3D worlds — World Labs Marble API (Gaussian Splat environments from text prompts)",
            "Rendering — Three.js + SparkJS with WASD first-person + WebXR",
            "Narration — Google Gemini 2.0 Flash grounded in IPCC data",
            "Voice — ElevenLabs TTS + Sound Effects (FIFO queue)",
            "3D Artifacts — TanitXR Carthage Tanit Stela model",
          ],
        },
      ],
    },
    {
      id: "transit-gtfs",
      title: "Transit Accessibility & GTFS-Based Service Equity",
      subtitle: "MARTA service coverage vs. ACS equity gaps across metro Atlanta",
      category: "Urban Analytics",
      accent: "transit",
      summary:
        "Processed MARTA GTFS feeds and intersected them with ACS demographics to quantify transit service equity across 300+ census tracts. Built scenario-ready pipelines for regional planning discussions.",
      tags: ["Python", "GeoPandas", "GTFS", "Census ACS", "PostGIS"],
      github: null,
      live: null,
      sections: [
        {
          heading: "Method",
          list: [
            "Processed 9+ GTFS tables for MARTA, converted stop_times and shapes into spatial features",
            "Mapped 1,000+ stops and routes to evaluate regional service coverage",
            "Created 400 m buffers around bus/rail lines and intersected with 300+ census tracts to compute percent of tract area served by transit",
            "Joined ACS variables (income, no-car households) to quantify equity gaps in access",
          ],
        },
        {
          heading: "Outcome",
          body: "Reproducible pipeline that supports scenario-style equity discussions — lets planners swap ACS vintages or route alternatives and immediately see coverage and equity-gap deltas.",
        },
      ],
    },
    {
      id: "gentrification-yoga",
      title: "Gentrification & Census Analysis using Yoga Studio POIs",
      subtitle: "Logistic regression on lifestyle-amenity POIs as gentrification signal",
      category: "Spatial Statistics",
      accent: "gentrify",
      summary:
        "Coordinated 2015 and 2023 ACS tract boundaries across Fulton and DeKalb counties, classified tracts by rent-change thresholds, and tested whether yoga-studio density predicts gentrifying status.",
      tags: ["R", "Logistic Regression", "ACS", "Spatial Join"],
      github: null,
      live: null,
      sections: [
        {
          heading: "Method",
          list: [
            "Coordinated 2015 and 2023 ACS tract boundaries using area-weighted intersections across Fulton and DeKalb counties, aligning 400+ tracts",
            "Classified tracts into 3 gentrification categories (Affordable, Gentrifying, Unaffordable) based on median 2-bedroom rent change thresholds",
            "Spatially joined 100+ yoga studio POIs to tracts",
            "Ran logistic regression with 8+ covariates to test associations with gentrifying status",
          ],
        },
      ],
    },
    {
      id: "smart-codes",
      title: "Smart Codes · CURA",
      subtitle: "RAG over municipal building-code knowledge for 120+ U.S. cities",
      category: "NLP / RAG",
      accent: "nodes",
      summary:
        "Active research: collecting, OCR-ing, and structuring building-code ordinances for 120+ cities, linking clauses to FEMA hazard categories, and exposing them through a citation-grounded RAG system for practitioners and policymakers.",
      tags: ["Python", "RAG", "FAISS", "OCR", "FEMA", "Policy Analytics"],
      github: "https://github.com/SamDuo/smart-codes-cura",
      live: null,
      sections: [
        {
          heading: "Why it matters",
          body: "Building codes shape housing supply, affordability, and vulnerability — but code text is scattered across PDFs, scans, and amendments. A structured, searchable, citation-grounded knowledge base lets researchers run quasi-experimental comparisons and lets practitioners get evidence-backed answers.",
        },
        {
          heading: "My contributions",
          list: [
            "Collect and preprocess ordinances and amendments for 120+ U.S. cities",
            "Transform PDFs and scanned documents into structured datasets linked to FEMA hazard categories",
            "Prepare treatment and control groups by matching modern-code cities to comparable legacy-code cities for difference-in-differences analysis of housing outcomes",
            "Help design and implement a RAG system that returns evidence-grounded answers with transparent citations",
          ],
        },
      ],
    },
    {
      id: "commute-shape",
      title: "The Shape of a Commute",
      subtitle: "Scrollytelling regression analysis on 4,411 hours of I-94 traffic",
      category: "Urban Analytics",
      accent: "transit",
      summary:
        "An interactive D3 + Scrollama data story walking through a five-model regression on Minneapolis I-94 traffic. Shows how treating hour as a factor, adding a weekday×weekend interaction, and a 1-hour lag takes Adj R² from 0.22 to 0.98.",
      tags: ["D3.js", "Scrollama", "Regression", "UCI ML Repo", "Storytelling"],
      github: null,
      live: null,
      sections: [
        {
          heading: "What the story shows",
          list: [
            "4,411 hours of UCI Metro Interstate Traffic data rendered as a single dot-cloud that reshapes as you scroll",
            "Folds six months onto a 24-hour axis to surface the bimodal 7 AM / 5 PM rush pattern",
            "Splits weekday vs. weekend to reveal two distinct populations sharing one sensor",
            "Walks through Models 1→5: straight line (0.22) → hour-as-factor (0.85) → hour×weekend (0.95) → +lag (0.98)",
          ],
        },
        {
          heading: "Team & course",
          body: "ISyE 6414 Regression Analysis at Georgia Tech. Team project with Hyunkyung Lee, Haoji Wang, and Tianchi Lin. Built with D3 v7 and Scrollama, no framework.",
        },
        {
          heading: "Key takeaway",
          body: "Time of day and day of week predict nearly everything. Weather matters marginally. The lever for smoother traffic isn't weather mitigation — it's shifting when people drive.",
        },
      ],
    },
    {
      id: "atlanta-connector",
      title: "Atlanta on the Downtown Connector",
      subtitle: "Does the Minneapolis regression story replicate on I-85 SB?",
      category: "Urban Analytics",
      accent: "transit",
      summary:
        "Independent follow-up to the I-94 group project. Pulled 840 hours of southbound I-85 volume from the GDOT TADA portal and ran the same five-model ladder. The story holds — with Atlanta flourishes: taller PM peak, flatter weekend hill, and the same 0.23 → 0.98 Adj R² climb.",
      tags: ["D3.js", "Regression", "GDOT TADA", "Editorial Viz"],
      github: null,
      live: null,
      sections: [
        {
          heading: "The experiment",
          body: "I took the same analysis I worked on for I-94 in Minneapolis and ran it on 35 days of hourly data from the Atlanta Downtown Connector (station 121-5969, I-85 SB, Apr 19 – May 23, 2025). 840 hourly observations, zero framework, pure D3.",
        },
        {
          heading: "Findings",
          list: [
            "Atlanta peaks near 10,000 vph at evening rush — substantially higher than Minneapolis",
            "Weekend curve is flatter and more midday-centered, consistent with heavy suburban-to-urban weekend traffic",
            "Hour-as-factor alone reaches 0.87; adding the weekday×weekend interaction lifts it to 0.97",
            "One-hour lag takes it to 0.98 and pushes Durbin-Watson from 0.69 to 1.99 — essentially ideal",
          ],
        },
        {
          heading: "Takeaway",
          body: "Despite very different cities, sensors, and sample sizes (4,411 vs. 840), the relative gains from each modeling choice are almost identical. Time-of-day × day-of-week is the dominant structure of urban commute traffic.",
        },
      ],
    },
    {
      id: "food-circular",
      title: "Food Circular Network · GT Atlanta",
      subtitle: "Modeling food flow and waste recovery on Georgia Tech's campus",
      category: "Sustainability",
      accent: "dots",
      summary:
        "Network analysis of food sourcing, distribution, and waste streams across GT campus, exploring circular-economy interventions that reduce waste while maintaining access.",
      tags: ["Python", "NetworkX", "Sustainability"],
      github: "https://github.com/SamDuo/Food_Circular_Network_GT_ATL",
      live: null,
      sections: [
        {
          heading: "Focus",
          body: "Identify nodes and edges in the campus food system — dining halls, food pantries, recovery routes — and quantify where circular interventions (composting, donation, redistribution) would have the highest leverage.",
        },
      ],
    },
  ],
  interests: [
    {
      icon: "🗺️",
      title: "Spatial Analytics",
      body: "Integrating Census, GTFS, POI, and remote-sensing data to study urban systems, accessibility, and neighborhood change at scale.",
    },
    {
      icon: "🏙️",
      title: "Urban Resilience & Policy",
      body: "Using quasi-experimental methods to evaluate how building codes and zoning shape housing supply, affordability, and vulnerability.",
    },
    {
      icon: "🔍",
      title: "Retrieval-Augmented Generation",
      body: "Building evidence-grounded RAG systems over policy corpora so answers cite the ordinance, section, and jurisdiction they come from.",
    },
    {
      icon: "📊",
      title: "Causal & Regression Modeling",
      body: "Difference-in-differences, logistic regression, and covariate matching to isolate effects of interventions on housing and equity outcomes.",
    },
    {
      icon: "🛰️",
      title: "Remote Sensing & GIS",
      body: "ArcGIS, QGIS, and PostGIS workflows for story maps, spatial joins, and infrastructure analyses that communicate clearly to non-technical stakeholders.",
    },
    {
      icon: "🧭",
      title: "Transit & Accessibility",
      body: "GTFS pipelines, service-area buffers, and ACS equity overlays — making transit analysis reproducible for planners.",
    },
  ],
  skills: [
    {
      group: "Programming",
      items: ["Python", "R", "SQL", "Java"],
    },
    {
      group: "GIS & Spatial",
      items: ["ArcGIS", "QGIS", "PostGIS", "GeoPandas", "H3", "OSMnx", "GTFS"],
    },
    {
      group: "ML / Stats",
      items: ["scikit-learn", "XGBoost", "PyTorch", "SHAP", "Logistic Regression", "DiD"],
    },
    {
      group: "LLM & RAG",
      items: ["LangChain", "FAISS", "OpenAI API", "Gemini", "NVIDIA NIM", "RAG"],
    },
    {
      group: "Data Platforms",
      items: ["PostgreSQL", "Snowflake", "Azure / GCP", "Power BI", "Census ACS", "Overture Maps"],
    },
    {
      group: "Web / Viz",
      items: ["Mapbox GL", "Deck.gl", "D3", "Three.js", "React"],
    },
  ],
};
