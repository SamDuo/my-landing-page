// Portfolio content — Samuel Duong
window.PORTFOLIO_DATA = {
  name: "Sam Duong",
  shortName: "Sam",
  tagline: "Explainable Geospatial AI · Urban Analytics",
  affiliation: {
    role: "CTO & Founding AI Engineer",
    lab: "Polymetron",
    org: "Georgia Tech · CURA + I2CE Lab",
  },
  location: "Atlanta, GA",
  phone: "470 854 2300",
  email: "qduong7@gatech.edu",
  links: {
    linkedin: "https://linkedin.com/in/sammduong",
    github: "https://github.com/SamDuo",
  },
  bio: `CTO and Founding AI Engineer at Polymetron, where I build explainable geospatial AI for cities. Most of my work is the verification layer that sits under the model: adversarial and held out evaluation, governance gates that catch an agent citing the wrong jurisdiction, and regression suites that gate every release. M.S. Computer Science and M.S. Urban Analytics at Georgia Tech, certificate in Applied Machine Learning at Columbia Engineering, B.S. in Computer Information Systems at Georgia State.`,
  bioExtra: `Alongside Polymetron I am a Graduate Research Assistant and Geospatial Engineer at Georgia Tech, split between CURA, where I work on building code RAG and within metro difference in differences, and the Atlanta Food Circular Network at the I2CE Lab, where I ship a thirty layer regional spatial database and four production dashboards. Atlanta is home base, but recent work spans metro Boston and Cambridge, Portsmouth VA, New York and Tokyo. Previously Data Analyst Associate at Atlanta BeltLine, Inc.`,
  education: [
    {
      school: "Georgia Institute of Technology · College of Computing",
      degree: "M.S. in Computer Science",
      detail: "Machine Learning specialization",
      dates: "Expected 2027",
      courses: "",
    },
    {
      school: "Georgia Institute of Technology · School of City and Regional Planning · College of Design",
      degree: "M.S. in Urban Analytics",
      concentration: "Machine Learning and Spatial Analysis",
      detail: "Thesis: \"Lines on the Map: Causal Effects of City of Atlanta Building Code Amendments on Housing Supply.\" Advisor: Dr. Subhro Guhathakurta (Director, CSPAV).",
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
      degree: "B.S. in Computer Information Systems",
      detail: "Concentration: Big Data Analytics",
      dates: "Jul 2024",
      courses: "Analysis of Business Data, Big Data Analysis, Business Analysis, Data Programming, Unstructured Data Management",
    },
  ],
  experience: [
    {
      role: "CTO & Founding AI Engineer",
      org: "Polymetron",
      location: "Atlanta, GA",
      dates: "Jan 2025 – Present",
      bullets: [
        "Build the verification layer for a production multi agent GeoAI system (16 tools, 5 agents, 12,550 indexed building code passages): held out and adversarial test sets, LLM as judge with human adjudication, and trace inspection.",
        "Eliminated all 74 wrong source citations on held out cases while keeping 28 of 28 valid ones, by tracing every failure to retrieval (45 of 45 cases) and shipping a governance gate that checks each citation against the jurisdiction it came from. Written up in a full paper accepted at UrbanAI '26.",
        "Gate every release with a 232 check regression suite that replays finished runs with no model in the loop. It caught 41 of 41 planted violations across 50 proposals.",
        "Shipped a 12,933 parcel public dashboard and a resident submission portal (1,161 tests) with a neighborhood coalition and a nonprofit in Cambridge, Massachusetts.",
      ],
    },
    {
      role: "Research Developer & Geospatial Engineer",
      org: "Atlanta Food Circular Network · I2CE Lab, Georgia Tech",
      location: "Atlanta, GA",
      dates: "Aug 2025 – Present",
      bullets: [
        "Designed and maintain a thirty layer regional spatial database for the metro Atlanta food system, integrating Census TIGER and ACS (1,062 tracts), MARTA GTFS, USDA, CDC PLACES, City of Atlanta DPCD zoning, and the Atlanta Community Food Bank pantry network. Published as both an ArcGIS Pro geodatabase and as GeoJSON.",
        "Built four production interactive dashboards (ArcGIS Maps SDK v4.30, Mapbox GL, TomTom) deployed via Netlify with serverless API key brokering. Coverage includes citywide food access, real time surplus routing, GT campus operations, and fleet analytics.",
        "Wrote more than 2,000 lines of Python (Pandas, GeoPandas, Shapely) to compute composite spatial indices including a Modified Retail Food Environment Index (mRFEI) with LILA flags and a multi factor food assistance demand model. Automated CSV to dashboard regeneration in under two seconds.",
        "Project managed a stakeholder workshop with more than twenty Atlanta food system organizations (Atlanta Community Food Bank, Goodr, Concrete Jungle, City of Atlanta, Atlanta Braves Foundation, Open Hand, NFCC, Umi Feeds, and others) and documented per organization data needs into a reproducible participant matrix.",
      ],
    },
    {
      role: "Graduate Research Assistant",
      org: "Center for Urban Resilience and Analytics · Georgia Tech",
      location: "Atlanta, GA",
      dates: "Aug 2025 – Present",
      bullets: [
        "Collect and preprocess building code ordinances and amendments for more than 120 U.S. cities, transforming PDFs and scanned documents into structured datasets linked to FEMA hazard categories.",
        "Prepare quasi experimental treatment and control groups by matching modern code cities to comparable legacy code cities, supporting difference in differences analysis of housing supply, affordability, and vulnerability outcomes.",
        "Help design and implement a Retrieval Augmented Generation (RAG) system that powers natural language queries over the building code knowledge base, returning evidence grounded answers with transparent citations for practitioners and policymakers.",
      ],
    },
    {
      role: "Data Analyst Associate",
      org: "Atlanta Beltline Inc.",
      location: "Remote · Atlanta, GA",
      dates: "Jun 2024 – Jul 2025",
      bullets: [
        "Collaborated on investment and demographic mapping projects using ArcGIS Online. Helped develop GIS feature services and interactive web apps that improved data accessibility for more than 1,000 stakeholders.",
        "Conducted spatial and statistical analyses with ArcGIS to support community resilience planning, mapping environmental and social vulnerabilities across metro Atlanta.",
        "Created five interactive story maps and visual reports that helped city agencies prioritize funding to underserved census tracts, boosting visibility for grant applications and advocacy efforts.",
      ],
    },
    {
      role: "PIN Summer Intern",
      org: "Center for Sustainable Communities",
      location: "Atlanta, GA",
      dates: "Summer 2026",
      bullets: [
        "Built a statewide retrofit access database covering all 159 Georgia counties and 41 utilities, reconciling 33 Georgia Power programs into per county coverage so gaps could be read off directly.",
        "Found that retrofit program access correlates with community wellbeing at rho = +0.55 across counties, giving the team an evidence base for where to target outreach.",
      ],
    },
    {
      role: "Data Analytics and Engineering Intern",
      org: "Waystar Health",
      location: "Atlanta, GA",
      dates: "Aug 2023 – Apr 2024",
      bullets: [
        "Cut data extraction time 20 percent by rewriting recurring pulls in Snowflake SQL and Excel.",
        "Helped cut next quarter revenue churn by $240,000 and the churn rate by 10 percent, by building five Power BI and Microsoft Fabric dashboards that surfaced at risk accounts to the revenue team.",
      ],
    },
  ],
  projects: [
    {
      id: "polymetron_agent",
      metrics: [
        { label: "Replayable workflows", value: "12" },
        { label: "Cited tools", value: "16" },
        { label: "Agents", value: "5" },
      ],
      flow: ["Plan", "Run cited tools", "Trace brief"],
      featured: true,
      status: "in_progress",
      heroImage: "uploads/projects/polymetron_agent.webp",
      title: "Polymetron Agent",
      subtitle: "Plans a spatial analysis, runs it over cited tools, writes a brief you can trace",
      category: "Agentic AI",
      accent: "nodes",
      summary:
        "An agent for urban analytics and planning. It decomposes a spatial question into steps, runs each over a registry of cited tools, and returns a brief where every number traces back to the tool call and source that produced it. Twelve replayable workflows across Atlanta and metro Boston, from corridor screening to site opportunity with SHAP drivers.",
      tags: ["Agents", "Tool Use", "Provenance", "Urban Analytics", "Next.js", "deck.gl"],
      github: "",
      live: "https://polymetron-next.vercel.app/copilot",
    },
    {
      id: "city360_cambridge",
      metrics: [
        { label: "Parcels published", value: "12,933" },
        { label: "Zones", value: "261" },
        { label: "Tests on the portal", value: "1,161" },
      ],
      flow: ["Ingest city data", "Publish dashboard", "Resident submissions"],
      featured: true,
      status: "completed",
      heroImage: "uploads/projects/city360_dashboard.webp",
      title: "360CITI · Cambridge",
      subtitle: "A civic evidence dashboard for a resident coalition",
      category: "Civic Tech",
      accent: "mapgrid",
      summary:
        "Cambridge, Massachusetts published as a public evidence dashboard: 12,933 parcels and 261 zones, built with a neighborhood coalition and a nonprofit, with a resident submission portal behind it. The point was to put the same data the city works from in front of the people it affects.",
      tags: ["Civic Tech", "Zoning", "Parcels", "Public Dashboard", "Supabase"],
      github: "",
      live: "https://www.360citi.org",
    },
    {
      id: "cambridge_workspace",
      featured: false,
      status: "in_progress",
      heroImage: "uploads/projects/cambridge_workspace.webp",
      title: "Cambridge Workspace on GeoLibre",
      subtitle: "A self-hosted browser GIS for a city, with agent tools attached",
      category: "GeoAI",
      accent: "transit",
      summary:
        "A self-hosted GeoLibre deployment carrying Cambridge's layers in Esri-style folders, extended with plugins and a spatial agent. It is the open alternative to buying a seat in someone else's GIS.",
      tags: ["GeoLibre", "Browser GIS", "PMTiles", "MapLibre", "Self-hosted"],
      github: "",
      live: "https://polymetron-workspace.vercel.app",
    },
    {
      id: "tag-data-challenge",
      featured: false,
      status: "completed",
      title: "Multi Agent RAG Chatbot for Youth Substance Abuse Prevention",
      subtitle: "First place, TAG Data Challenge 2025",
      category: "Applied AI",
      accent: "nodes",
      summary:
        "Led development of a multi agent RAG chatbot that combines retrieval, summarization and planning agents to produce clinician ready insights for a substance abuse prevention nonprofit. Took first place in the TAG Data Challenge 2025.",
      tags: ["RAG", "Multi-Agent", "LLM", "Healthcare", "Competition"],
      github: "",
      live: "",
    },
    {
      id: "atlanta-risk-engine",
      featured: false,
      status: "completed",
      title: "Property Level Analytics Engine for Atlanta Urban Risk",
      subtitle: "Tract level risk modeling at CURA",
      category: "Spatial ML",
      accent: "mapgrid",
      summary:
        "Built a tract level database of 311 tracts and more than 118,000 incidents, joining crime, ACS and built environment features. Found strong spatial autocorrelation (Moran's I = 0.559) and trained spatial models on top of it.",
      tags: ["Spatial Statistics", "Moran's I", "ACS", "Python", "GeoPandas"],
      github: "",
      live: "",
    },
    {
      id: "crime-sentiment-bert",
      featured: false,
      status: "completed",
      title: "Social Media Crime Sentiment Modeling",
      subtitle: "A BERT based approach over 200,000 Reddit posts",
      category: "NLP",
      accent: "dots",
      summary:
        "Collected more than 200,000 Reddit posts about crime and built an NLP pipeline with BERT based sentiment classifiers. The visualizations surfaced negative sentiment spikes on weekday mornings and evenings.",
      tags: ["BERT", "NLP", "Sentiment Analysis", "Reddit", "Python"],
      github: "",
      live: "",
    },
    {
      id: "agentic-rag-nim",
      featured: false,
      status: "completed",
      title: "Agentic RAG System with NVIDIA NIM",
      subtitle: "LLaMA3 70B, FAISS retrieval and an evaluation harness",
      category: "Applied AI",
      accent: "nodes",
      summary:
        "Engineered an agentic RAG system on NVIDIA NIM hosted LLaMA3 70B with document chunking and FAISS retrieval, plus evaluation harnesses and an interactive demo.",
      tags: ["RAG", "NVIDIA NIM", "LangChain", "FAISS", "LLaMA3"],
      github: "",
      live: "",
    },
    {
      id: "polymetron",
      metrics: [
        { label: "Code passages indexed", value: "12,550" },
        { label: "Regression checks", value: "232" },
        { label: "Planted violations caught", value: "41 / 41" },
      ],
      flow: ["Retrieve", "Governance gate", "Cited answer"],
      featured: true,
      status: "in_progress",
      heroImage: "uploads/projects/polymetron_showcase.webp",
      title: "Polymetron",
      subtitle: "Explainable geospatial AI for the built environment",
      category: "Edge AI",
      accent: "nodes",
      summary:
        "On-device AI that inspects buildings and infrastructure at the asset level. Insurers, cities, and real estate teams point a phone at a building and get a risk score with the evidence behind it, no cloud upload. Built on top of a live digital twin of metro Atlanta that ingests building footprints, street networks, parcel data, and movement.",
      tags: ["Edge AI", "On-device ML", "WebGPU", "Digital Twin", "Risk Analytics", "Spatial ML", "Mapbox GL", "ArcGIS Maps SDK"],
      github: "https://github.com/SamDuo/polymetron-urbanai26-artifact",
      live: "https://polymetron-next.vercel.app",
      sections: [
        {
          heading: "What it does",
          list: [
            "Point a phone at a building, the model runs on the device and describes what it sees out loud",
            "Returns a risk score with the evidence behind every number, asset by asset, not at zip code resolution",
            "Works offline, in basements, on bridges, and on sites without internet access",
            "Same scoring pattern already running at Georgia Tech dining halls for food waste detection and surplus routing",
          ],
        },
        {
          heading: "Why edge AI",
          body: "Cloud AI breaks the customer. Insurance and government data are regulated and cannot be uploaded. Fieldwork happens in basements and on bridges where there is no signal. And every score has to be reproducible six months from now in front of a court or a council. Cloud models drift. The model on your phone does not.",
        },
        {
          heading: "The underlying digital twin",
          body: "Started as a research project at Georgia Tech's I2CE Lab and grew into a live simulation of metro Atlanta. The engine ingests building footprints, street networks, parcel data, foot traffic, vehicle movement, and environmental layers, then runs them together as one model of the place. Pull a slider and the morning commute redistributes when a bridge is closed. Drop a new mid rise on a parcel and watch the shadow it casts onto the school next door at 3 PM in February. The same engine powers the per asset risk scoring users see when they point a camera.",
        },
        {
          heading: "Stack",
          list: [
            "On-device inference: WebGPU and ONNX Runtime Web, browser and phone first",
            "Vision: small vision language model fine tuned on building damage classes",
            "Spatial data: Mapbox GL JS, ArcGIS Maps SDK, GeoPandas pipelines",
            "Digital twin: Python simulation engine with H3 indexing and Census, OSM, and Overture Maps fabric",
            "Deployment: Cloudflare Workers edge with no cloud inference dependency",
          ],
        },
      ],
    },
    {
      id: "field_voice_notes",
      featured: true,
      status: "planned",
      title: "Field Voice Notes",
      subtitle: "Hands free keyword spotting for field inspectors on the XIAOML Kit",
      category: "ML Systems",
      accent: "nodes",
      summary:
        "Tiny keyword spotting model on the XIAOML Kit (ESP32 S3 Sense) so inspectors can log observations hands free while on a ladder, under a bridge, or holding a clipboard. Recognizes a small vocabulary of inspection commands and syncs to the Polymetron scoring backend over WiFi.",
      tags: ["XIAOML Kit", "ESP32 S3", "TF Lite Micro", "Keyword Spotting", "Edge Audio", "TinyML"],
      github: null,
      live: null,
      sections: [
        {
          heading: "Why this build",
          body: "Field inspectors do not have free hands. They have a clipboard, a flashlight, a phone, and a measuring tape. Voice is the only input modality that does not require a third hand. A small always-on keyword model handles the ten or fifteen commands that cover most logging events.",
        },
        {
          heading: "Reference platform",
          list: [
            "Seeed XIAO ESP32 S3 Sense with onboard microphone and 8 MB PSRAM",
            "TF Lite Micro inference at roughly 30 ms per window",
            "Initial vocabulary: log crack, mark critical, next asset, photo, undo",
            "WiFi sync to Polymetron scoring backend, queued offline writes",
          ],
        },
        {
          heading: "Status",
          body: "In progress. Audio dataset collection underway. Model training and on-device deployment to follow.",
        },
      ],
    },
    {
      id: "polyscape",
      title: "PolyScape",
      subtitle: "Multi scale GeoAI visualization for comparative site selection",
      category: "GeoAI",
      accent: "mapgrid",
      summary:
        "Geographic zoom level as the single continuous control dimension. From city scale prediction surfaces, through district scale SHAP lenses, to street scale per feature AI explanations.",
      tags: ["Mapbox GL", "Deck.gl", "FastAPI", "XGBoost", "SHAP", "H3"],
      github: "https://github.com/SamDuo/polyscape",
      live: null,
      sections: [
        {
          heading: "Core idea",
          body: "Geographic zoom level serves as the single, continuous control dimension governing what information the user sees. From aggregate prediction scores at city overview, through scenario comparison contours at district level, to per feature AI explanations at street level.",
        },
        {
          heading: "Scale to visualization mapping",
          list: [
            "City scale (z < 12): hex density surfaces with divergence contour lines",
            "District scale (12 to 15): SHAP explanation lenses (radial bar charts)",
            "Street scale (z ≥ 15): pinned profile cards with waterfall charts",
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
      id: "polyscape_heritage",
      heroImage: "uploads/projects/gthackvr.webp",
      title: "PolyScape Heritage",
      subtitle: "Walk through a UNESCO site. Make a choice. Watch the world change.",
      category: "Immersive / XR",
      accent: "heritage",
      summary:
        "Immersive 3D experience built for ImmerseGT 2026. Step inside the ruins of Carthage as a photorealistic Gaussian Splat world generated by World Labs Marble, explore artifacts, and branch the narrative between protect and do nothing climate futures.",
      tags: ["Three.js", "SparkJS", "WebXR", "Gemini", "ElevenLabs", "World Labs"],
      github: "https://github.com/SamDuo/gtHackVR",
      live: null,
      sections: [
        {
          heading: "The experience",
          list: [
            "Enter Carthage. A cinematic title card fades into a sunlit archaeological site on Byrsa Hill.",
            "Explore freely (WASD and mouse) through the ruins and discover artifacts.",
            "Ask questions. Chat with an AI narrator powered by Gemini, hear responses via ElevenLabs.",
            "Drag the timeline from 2026 to 2075 and see climate projections change around you.",
            "At year 2040, choose Protect or Do Nothing. The world transforms accordingly.",
          ],
          image: "https://raw.githubusercontent.com/SamDuo/gtHackVR/main/Screenshot%202026-04-11%20191524.png",
          caption: "Walking through the Carthage ruins inside the Gaussian Splat world.",
        },
        {
          heading: "Climate grounding",
          body: "All projections are grounded in IPCC AR6 WG1 Ch.12 (2021) SSP5 8.5 Mediterranean temperature and sea level projections, plus the UNESCO Climate Vulnerability Index (2022). Carthage: 3.1 °C anomaly, 58 cm sea level rise, severe erosion risk by 2075.",
        },
        {
          heading: "Tech stack",
          list: [
            "3D worlds: World Labs Marble API (Gaussian Splat environments from text prompts)",
            "Rendering: Three.js with SparkJS, WASD first person, and WebXR",
            "Narration: Google Gemini 2.0 Flash grounded in IPCC data",
            "Voice: ElevenLabs TTS and sound effects (FIFO queue)",
            "3D Artifacts: TanitXR Carthage Tanit Stela model",
          ],
        },
      ],
    },
    {
      id: "transit_gtfs",
      title: "Transit Accessibility and GTFS Based Service Equity",
      subtitle: "MARTA service coverage versus ACS equity gaps across metro Atlanta",
      category: "Urban Analytics",
      accent: "transit",
      summary:
        "Processed MARTA GTFS feeds and intersected them with ACS demographics to quantify transit service equity across more than 300 census tracts. Built scenario ready pipelines for regional planning discussions.",
      tags: ["Python", "GeoPandas", "GTFS", "Census ACS", "PostGIS"],
      github: null,
      live: null,
      sections: [
        {
          heading: "Method",
          list: [
            "Processed nine GTFS tables for MARTA, converting stop_times and shapes into spatial features",
            "Mapped more than 1,000 stops and routes to evaluate regional service coverage",
            "Created 400 m buffers around bus and rail lines and intersected with more than 300 census tracts to compute percent of tract area served by transit",
            "Joined ACS variables (income, no car households) to quantify equity gaps in access",
          ],
        },
        {
          heading: "Outcome",
          body: "Reproducible pipeline that supports scenario style equity discussions. Lets planners swap ACS vintages or route alternatives and immediately see coverage and equity gap deltas.",
        },
      ],
    },
    {
      id: "gentrification_yoga",
      title: "Gentrification and Census Analysis using Yoga Studio POIs",
      subtitle: "Logistic regression on lifestyle amenity POIs as a gentrification signal",
      category: "Spatial Statistics",
      accent: "gentrify",
      summary:
        "Coordinated 2015 and 2023 ACS tract boundaries across Fulton and DeKalb counties, classified tracts by rent change thresholds, and tested whether yoga studio density predicts gentrifying status.",
      tags: ["R", "Logistic Regression", "ACS", "Spatial Join"],
      github: null,
      live: null,
      sections: [
        {
          heading: "Method",
          list: [
            "Coordinated 2015 and 2023 ACS tract boundaries using area weighted intersections across Fulton and DeKalb counties, aligning more than 400 tracts",
            "Classified tracts into three gentrification categories (Affordable, Gentrifying, Unaffordable) based on median two bedroom rent change thresholds",
            "Spatially joined more than 100 yoga studio POIs to tracts",
            "Ran logistic regression with more than eight covariates to test associations with gentrifying status",
          ],
        },
      ],
    },
    {
      id: "smart_codes",
      title: "Smart Codes · CURA",
      subtitle: "RAG over municipal building code knowledge for more than 120 U.S. cities",
      category: "NLP / RAG",
      accent: "nodes",
      summary:
        "Active research. Collecting, OCRing, and structuring building code ordinances for more than 120 cities, linking clauses to FEMA hazard categories, and exposing them through a citation grounded RAG system for practitioners and policymakers.",
      tags: ["Python", "RAG", "FAISS", "OCR", "FEMA", "Policy Analytics"],
      github: "https://github.com/SamDuo/smart-codes-cura",
      live: null,
      sections: [
        {
          heading: "Why it matters",
          body: "Building codes shape housing supply, affordability, and vulnerability. Code text is scattered across PDFs, scans, and amendments. A structured, searchable, citation grounded knowledge base lets researchers run quasi experimental comparisons and lets practitioners get evidence backed answers.",
        },
        {
          heading: "My contributions",
          list: [
            "Collect and preprocess ordinances and amendments for more than 120 U.S. cities",
            "Transform PDFs and scanned documents into structured datasets linked to FEMA hazard categories",
            "Prepare treatment and control groups by matching modern code cities to comparable legacy code cities for difference in differences analysis of housing outcomes",
            "Help design and implement a RAG system that returns evidence grounded answers with transparent citations",
          ],
        },
      ],
    },
    {
      id: "commute_shape",
      title: "The Shape of a Commute",
      subtitle: "ISyE 6414 research project: scrollytelling regression on 4,411 hours of I 94 traffic",
      category: "Regression Analysis",
      accent: "transit",
      summary:
        "Research project for ISyE 6414 Regression Analysis at Georgia Tech, packaged as an interactive HTML scrollytelling story (D3 v7 and Scrollama, no framework). Walks a non technical reader through a five model regression on Minneapolis I 94 traffic. Treating hour as a factor, adding a weekday by weekend interaction, and a one hour lag takes Adjusted R squared from 0.22 to 0.98.",
      tags: ["ISyE 6414", "Regression Analysis", "D3.js", "Scrollama", "HTML Story", "UCI ML Repo"],
      github: null,
      live: null,
      sections: [
        {
          heading: "What the story shows",
          list: [
            "4,411 hours of UCI Metro Interstate Traffic data rendered as a single dot cloud that reshapes as you scroll",
            "Folds six months onto a twenty four hour axis to surface the bimodal 7 AM and 5 PM rush pattern",
            "Splits weekday vs. weekend to reveal two distinct populations sharing one sensor",
            "Walks through Models one to five: straight line (0.22) → hour as factor (0.85) → hour by weekend (0.95) → with lag (0.98)",
          ],
        },
        {
          heading: "Team and course",
          body: "ISyE 6414 Regression Analysis at Georgia Tech. Team project with Hyunkyung Lee, Haoji Wang, and Tianchi Lin. Built with D3 v7 and Scrollama, no framework.",
        },
        {
          heading: "Key takeaway",
          body: "Time of day and day of week predict nearly everything. Weather matters marginally. The lever for smoother traffic is not weather mitigation, it is shifting when people drive.",
        },
      ],
    },
    {
      id: "atlanta_connector",
      featured: true,
      heroImage: "uploads/projects/traffic_eda_heatmap.png",
      embedUrl: "projects/atlanta-connector/index.html",
      embedHeight: "85vh",
      title: "Atlanta on the Downtown Connector",
      subtitle: "Independent ISyE 6414 follow up research project: does the Minneapolis story replicate on I 85 SB?",
      category: "Regression Analysis",
      accent: "transit",
      summary:
        "Independent research follow up to the I 94 group project, also delivered as an HTML scrollytelling story (the AtlantaStory page). Pulled 840 hours of southbound I 85 volume from the GDOT TADA portal and ran the same five model ladder. The story holds, with Atlanta flourishes: taller PM peak, flatter weekend hill, and the same 0.23 to 0.98 Adjusted R squared climb.",
      tags: ["ISyE 6414", "Regression Analysis", "D3.js", "HTML Story", "GDOT TADA", "Editorial Viz"],
      github: null,
      live: null,
      sections: [
        {
          heading: "Course and team context",
          body: "Independent follow up to the I 94 group project for ISyE 6414 Regression Analysis at Georgia Tech (team: Hyunkyung Lee, Haoji Wang, Tianchi Lin, Quan Duong). The Atlanta version is solo. Both stories use the same five model ladder (M1 through M5) and the same scrollytelling format. Build is pure D3 v7 with Scrollama, no framework.",
        },
      ],
    },
    {
      id: "afcn",
      featured: true,
      heroImage: "uploads/projects/afcn_surplus_map.png",
      title: "Atlanta Food Circular Network (AFCN)",
      subtitle: "Regional spatial intelligence platform for the metro Atlanta food system",
      category: "Urban Analytics",
      accent: "dots",
      summary:
        "A thirty layer ArcGIS, Mapbox, and Python platform mapping food recovery sources, redistribution nodes, beneficiary access points, and circular economy infrastructure across Atlanta and the GT campus. Real LeanPath waste data, urgency aware multi stop routing, four production dashboards, and a stakeholder workshop with more than twenty Atlanta food system organizations.",
      tags: ["ArcGIS Maps SDK", "Mapbox GL", "TomTom", "Python", "GeoPandas", "Census TIGER", "MARTA GTFS", "Netlify"],
      github: "https://github.com/SamDuo/Food_Circular_Network_GT_ATL",
      live: null,
      sections: [
        {
          heading: "What it does",
          list: [
            "Citywide and GT campus dashboard with thirty GeoJSON layers and a mode toggle",
            "Real time surplus map with urgency aware multi stop routing (fifty percent time decay, thirty percent volume, twenty percent proximity)",
            "Live LeanPath integration covering 408 entries, 2,316 lbs, and $2,380 across the GT campus, regenerated from CSV in under two seconds",
            "Fleet analytics dashboard with TomTom Traffic and 3D, Esri Route API, and a geodesic fallback",
          ],
          image: "uploads/projects/afcn_campus_hub.png",
          caption: "GT Campus Hub dashboard showing dining locations, surplus pins, and live wait times.",
        },
        {
          heading: "Data fabric",
          body: "Integrates Census TIGER and ACS (1,062 Fulton and DeKalb tracts), MARTA GTFS 2025, USDA, CDC PLACES, OpenStreetMap, City of Atlanta DPCD zoning, the Atlanta Community Food Bank pantry network (2,629 nodes), Fulton County compost permits, and the GT campus dining boundary. Published as both an ArcGIS Pro geodatabase (.aprx, .gdb, .gpkg) and as GeoJSON.",
        },
        {
          heading: "Composite indices",
          body: "Python pipeline (Pandas, GeoPandas, Shapely) computes a Modified Retail Food Environment Index (mRFEI) with LILA flags and a multi factor food assistance demand score, plus urgency tiered surplus pins (Critical, Soon, Stable) and capacity aware destination scoring.",
        },
        {
          heading: "Stakeholder workshop",
          body: "Convened and project managed an April 2026 workshop with more than twenty Atlanta food system organizations including Atlanta Community Food Bank, Goodr, Concrete Jungle, City of Atlanta, Atlanta Braves Foundation, Second Helpings, Open Hand, NFCC, and Umi Feeds. Documented per organization data needs into a reproducible participant matrix that drives platform priorities.",
        },
      ],
    },
    {
      id: "atlanta_food_story",
      featured: true,
      heroImage: "uploads/projects/atlanta_food_story_scene.png",
      embedUrl: "projects/atlanta-food-story/index.html",
      embedHeight: "85vh",
      title: "The Atlanta Food Story",
      subtitle: "A Mapbox scrollytelling page on access, gaps, and the network filling them",
      category: "Data Storytelling",
      accent: "mapgrid",
      summary:
        "A scrolling narrative built on Mapbox GL JS v3.3 that walks a non technical reader through Atlanta food access across 530 census tracts and 1.8 million people. Sister project to AFCN, designed to give planners and community partners a guided story instead of a raw dashboard.",
      tags: ["Mapbox GL", "Scrollytelling", "Census ACS", "Editorial Viz", "Atlanta"],
      github: "https://github.com/SamDuo/Food_Circular_Network_GT_ATL",
      live: null,
      sections: [
        {
          heading: "How it relates to AFCN",
          body: "AFCN is the operational platform: live data, routing, dashboards. The Atlanta Food Story is the explanatory companion. Same data fabric, different audience. Together they cover both the planner and the community partner.",
        },
      ],
    },
    {
      id: "thesis_lines_on_the_map",
      featured: true,
      heroImage: "uploads/projects/thesis_event_study_stormwater.png",
      title: "Lines on the Map",
      subtitle: "Causal effects of City of Atlanta building code amendments on housing supply",
      category: "Causal Inference",
      accent: "gentrify",
      summary:
        "Master's thesis (Georgia Tech, School of City and Regional Planning, May 2026). Estimates the causal effect of four City of Atlanta amendments (ADU 2019, Stormwater 2020, Impact Fees 2021, Tree 2022) using a within metro difference in differences design comparing thirty in Atlanta ZIPs to twenty three adjacent ZIPs in Fulton, DeKalb, Cobb, and Rockdale.",
      tags: ["Difference in Differences", "Python", "Causal Forest", "HonestDiD", "Event Study", "LLM Pipeline", "GPT 4o"],
      github: null,
      live: null,
      sections: [
        {
          heading: "Identification",
          body: "Treatment is assigned via the U.S. Census Bureau 2020 ZCTA to Place crosswalk (Place GEOID 1304000). The within metro design holds the metro labor market, mortgage rate environment, and migration pull fixed while isolating the regulatory variation inside city limits.",
        },
        {
          heading: "Methods",
          list: [
            "Three specifications: citywide jurisdictional DiD, exposure intensity heterogeneity, and an event study with eighteen month leads and lags",
            "Causal forest CATEs (Wager and Athey 2018) on a 53 ZIP by 66 month panel",
            "HonestDiD partial identification bounds (Rambachan and Roth 2023) for pre trend robustness",
            "Wild cluster bootstrap inference, plus placebo timing and placebo treated set checks",
          ],
          image: "uploads/projects/thesis_event_study_adu.png",
          caption: "Event study coefficients for ADU 2019 with ZIP clustered ninety five percent confidence band. Reference period k = -1.",
        },
        {
          heading: "LLM assisted ordinance pipeline",
          body: "Two stage pipeline that extracts amendment effective dates, ordinance numbers, and affected permit categories directly from codified municipal ordinances: Municode export → indexed Parquet corpus → GPT 4o mini structured JSON extraction → Legistar and IQM2 verification. Portable to any U.S. municipality with the same legislative system infrastructure.",
        },
        {
          heading: "Methodological contribution",
          body: "The within metro adjacent jurisdiction control is documented as a portable identification template for sub metro policy evaluation. Required inputs are a public Census ZCTA to Place crosswalk and a ZIP month outcome panel, both available for every U.S. MSA.",
        },
      ],
    },
    {
      id: "micro_mobility_atlanta",
      title: "Atlanta Micro Mobility and Walkability",
      subtitle: "Spatial statistical study of crash hotspots and fifteen minute walkability isochrones",
      category: "Spatial Statistics",
      accent: "transit",
      summary:
        "Kernel density crash heatmaps and OSMnx derived fifteen minute walkability isochrones across Atlanta. Surfaces equity gaps in MARTA corridor pedestrian infrastructure across more than 585 lines of Python and three Jupyter notebooks.",
      tags: ["Python", "OSMnx", "GeoPandas", "Folium", "KDE", "Jupyter"],
      github: null,
      live: null,
      sections: [
        {
          heading: "Method",
          list: [
            "Kernel density estimation crash heatmaps over Atlanta bike and pedestrian incident data",
            "OSMnx derived fifteen minute walkability isochrones for selected MARTA stops and neighborhoods",
            "Cross overlay with demographic and equity indicators",
          ],
        },
        {
          heading: "Output",
          body: "Folium maps and notebooks intended to inform conversations about pedestrian infrastructure investment along underserved MARTA corridors.",
        },
      ],
    },
    {
      id: "polymetron_edge_box",
      status: "in_progress",
      title: "Polymetron Edge Box",
      subtitle: "Raspberry Pi 5 port of the Polymetron vision model for field inspection",
      category: "ML Systems",
      accent: "nodes",
      summary:
        "Port the Polymetron browser model onto a Raspberry Pi 5 with a Pi Camera module. Mounts on a tripod or hard hat for industrial inspection. Same on-device vision, same scoring backend, no browser dependency. The ruggedized version of the field tool that the Polymetron application talks about.",
      tags: ["Raspberry Pi 5", "PyTorch", "VLM", "Edge AI", "On-device Inference", "Pi Camera"],
      github: null,
      live: null,
      sections: [
        {
          heading: "Why this build",
          body: "The browser demo proves the model works on consumer hardware. The Pi 5 port proves it survives the field. Targets a small ruggedized form factor that an inspector can hand to a colleague, mount on a hard hat, or drop on a tripod next to an asset.",
        },
        {
          heading: "Reference platform",
          list: [
            "Raspberry Pi 5 with Pi Camera Module 3 wide",
            "Local model: small vision language model in ONNX, quantized to int8",
            "Python service with FastAPI, streaming inference",
            "Optional Coral USB accelerator for higher framerate",
          ],
        },
        {
          heading: "Status",
          body: "In progress. Hardware acquired, baseline image captured, model port underway. First field test planned alongside the Polymetron production pilot.",
        },
      ],
    },
    {
      id: "asset_motion_tracker",
      status: "in_progress",
      heroImage: "uploads/projects/motion-boat.png",
      title: "Asset Motion Tracker",
      subtitle: "On-device motion classification and anomaly detection on the XIAOML Kit",
      category: "ML Systems",
      accent: "nodes",
      summary:
        "Always-on IMU classifier on the XIAOML Kit (XIAO ESP32S3 Sense plus expansion board). Classifies asset motion into transport modes such as maritime, terrestrial, lift, and idle, and flags anomalies like drops or tip-overs. A logistics and insurance use case: a container, a piece of equipment, or a piece of capital infrastructure can self-report its handling history without sending raw sensor data anywhere.",
      tags: ["XIAOML Kit", "ESP32 S3", "LSM6DS3 IMU", "Motion Classification", "Anomaly Detection", "TinyML", "Edge Impulse"],
      github: null,
      live: null,
      sections: [
        {
          heading: "Why this build",
          body: "Polymetron sees risk from the outside. A motion-aware asset reports risk from the inside, across its lifecycle. The same XIAOML Kit hardware family that powers Field Voice Notes already carries a six-axis IMU, so the platform expands without the platform expanding. Logistics carriers, equipment lessors, and property insurers all want this signal but cannot get it through cloud telemetry alone, because the events that matter (drops, tip-overs, rough handling) happen out of network range.",
        },
        {
          heading: "Reference platform",
          list: [
            "XIAOML Kit with the integrated LSM6DS3TR-C six-axis IMU on the expansion board",
            "Edge Impulse pipeline: spectral feature extraction (FFT, RMS, skewness, kurtosis) plus a small dense neural network classifier",
            "K-means anomaly detection for out-of-distribution handling events",
            "Battery operation with the kit's onboard OLED for standalone status display",
            "Builds on Marcelo Rovai's XIAO ESP32S3 motion classification lab in the Harvard MLSysBook",
          ],
          image: "uploads/projects/motion-anomaly.jpg",
          caption: "Edge Impulse Anomaly Explorer. Orange test samples (maritime motion) overlapping known training clusters return low anomaly scores; outliers stand alone. Placeholder image courtesy of Marcelo Rovai, MLSysBook.",
        },
        {
          heading: "Status",
          body: "In progress. Toolchain proven on the XIAOML Kit, training set being collected. First field deployment alongside the Polymetron pilot.",
        },
      ],
    },
    {
      id: "onsite_object_counter",
      status: "in_progress",
      heroImage: "uploads/projects/object-counter-fomo.jpg",
      title: "On-Site Object Counter",
      subtitle: "Open-vocabulary VLM detection plus FOMO counting on the XIAOML Kit family",
      category: "ML Systems",
      accent: "nodes",
      summary:
        "Two complementary detection modes on the same hardware family. A small vision language model handles open-vocabulary queries: point and ask 'find the wine bottle' or 'count the cracks' in natural language, no per-class training required. FOMO handles known-class counting at video rate on the XIAOML Kit itself, roughly 250KB RAM and around 7 FPS. The customer picks the right mode for the question, and no imagery leaves the site.",
      tags: ["XIAOML Kit", "ESP32 S3", "VLM", "Open-Vocabulary Detection", "FOMO", "Moondream", "Edge Impulse", "ONNX Runtime"],
      github: null,
      live: null,
      sections: [
        {
          heading: "Two modes, one platform",
          list: [
            "Open-vocabulary mode: a small VLM on the paired phone or Pi 5 Edge Box accepts natural language queries. The user asks 'find any cracks' and gets back boxes and counts, no per-class training needed.",
            "Closed-class mode: FOMO on the XIAOML Kit itself counts pre-trained classes at video rate, roughly 250KB RAM and around 7 FPS on the ESP32S3.",
            "Both modes return per-object centroids, bounding boxes, and confidence scores. Both keep imagery on-device.",
          ],
        },
        {
          heading: "Why dual-mode",
          body: "Counting is rarely a single-class problem in the field. An inspector wants to count parking spots one minute, count visible cracks the next, count missing fasteners after that. FOMO is fast and cheap when the class is known and stable. A small VLM is slower but answers anything the inspector can describe in words. Having both modes on the same platform means the customer can answer planned questions cheaply and ad-hoc questions on demand, without retraining a model per question.",
        },
        {
          heading: "Reference platform",
          list: [
            "XIAOML Kit OV3660 camera with a 96x96 grayscale input window for the FOMO path",
            "FOMO MobileNetV2 0.35 model, roughly 250KB RAM and 80KB Flash, around 7 FPS on the ESP32S3",
            "Small VLM (Moondream or a distilled Florence-2) on the paired phone or Pi 5 Edge Box for open-vocabulary queries",
            "Edge Impulse pipeline for FOMO training; ONNX Runtime or PyTorch Mobile for the VLM deployment",
            "Builds on Marcelo Rovai's XIAO ESP32S3 object detection lab in the Harvard MLSysBook, extended with the VLM grounding pattern",
          ],
        },
        {
          heading: "Status",
          body: "In progress. FOMO mode prototyped on the XIAOML Kit; VLM mode under integration on the Pi 5 Edge Box for open-vocabulary queries.",
        },
      ],
    },
  ],
  // Short write-ups of results from work already done. Every claim here is one
  // Sam has evidence for; none of it is speculative. Expand any entry into a
  // full post by replacing `summary` and pointing `link` at it.
  notes: [
    {
      date: "2026-09",
      title: "Developers bunch just under the inclusionary threshold",
      summary:
        "Twelve projects proposed exactly nine units against a neighbourhood mean of 2.8, every one with zero inclusionary units, where the requirement starts at ten (Poisson p = 3.2e-5). A control threshold at 5,000 sq ft shows no bunching (p = 0.95), so this is the notch and not a general preference for small projects. This is a bunching estimator in the Saez and Kleven sense, and the method transfers to any jurisdiction with a unit-count trigger.",
      tags: ["Housing policy", "Bunching", "Causal inference"],
      link: "",
    },
    {
      date: "2026-09",
      title: "A grounded model will cite the right rule from the wrong city",
      summary:
        "On held-out cases a retrieval-grounded system attached a confidently wrong citation from the wrong jurisdiction every time. Tracing it showed the failure was in retrieval, not generation, and the fix was a governance gate that checks each citation against the jurisdiction it came from rather than a better model. Written up in a paper accepted at UrbanAI '26.",
      tags: ["RAG", "Verification", "Evaluation"],
      link: "https://github.com/SamDuo/polymetron-urbanai26-artifact",
    },
    {
      date: "2026-09",
      title: "Placebo tests killed four of my congestion-pricing findings",
      summary:
        "A triple-difference design over 344 million NYC trips found speeds up 5.1 percent and no detectable demand effect. Four other candidate findings did not survive placebo years and were dropped before write-up. The placebo step is the cheapest part of the analysis and the only reason the remaining result is worth stating.",
      tags: ["Causal inference", "Transport", "Placebo design"],
      link: "https://github.com/SamDuo/congestion-pricing-impact",
    },
    {
      date: "2026-09",
      title: "Who can get a retrofit in Georgia, and who cannot",
      summary:
        "Reconciling 33 Georgia Power programmes into per-county coverage across all 159 counties shows retrofit access correlating with community wellbeing at rho = +0.55. The counties that would benefit most from an efficiency upgrade are, on average, the ones with the fewest programmes available to them.",
      tags: ["Energy", "Equity", "Georgia"],
      link: "",
    },
    {
      date: "2026-09",
      title: "Raw grid data will tell you the peak is twice what it was",
      summary:
        "Working with EIA-930 balancing-authority data, a naive read of raw reported values gives peaks roughly double the corrected series. Any headroom or data-centre siting estimate built on the raw feed inherits that error. The quality checks have to come before the scenario, not after it.",
      tags: ["Energy systems", "Data quality", "EIA-930"],
      link: "https://github.com/SamDuo/grid-headroom-whatif",
    },
  ],

  publications: [
    {
      title: "AI for Urban Buildability: An Atlanta Zoning Case Study on Where Citation-Bound Verification Fails",
      authors: "Duong, S. M. and Rocker, I. M.",
      venue: "UrbanAI '26 (ACM SIGSPATIAL workshop)",
      status: "Full paper, accepted",
      year: "2026",
      link: "https://github.com/SamDuo/polymetron-urbanai26-artifact",
      note: "Artifact and reproduction kit are public.",
    },
    {
      title: "A High-Fidelity Urban Digital Twin for Resilient Urban Regeneration in Nihonbashi, Tokyo",
      authors: "Duong, S. M.",
      venue: "CUPUM 2027 volume, Future Cities in the Era of AI",
      status: "Full chapter, under review",
      year: "2027",
      link: "",
      note: "",
    },
    {
      title: "Who Can Get a Retrofit? Retrofit Access Across Georgia's 159 Counties",
      authors: "Duong, S. M.",
      venue: "ACM COMPASS 2027",
      status: "In preparation",
      year: "2027",
      link: "",
      note: "",
    },
    {
      title: "Differentially Private Graph Neural Networks: Shortest Path Approximation",
      authors: "Duong, S. M.",
      venue: "Technical report",
      status: "Technical report",
      year: "2025",
      link: "",
      note: "DP-SGD trained GNNs on grid, wheel and scale-free graphs, benchmarked for path-length accuracy, fairness gaps and robustness across privacy budgets.",
    },
    {
      title: "Lines on the Map: Causal Effects of City of Atlanta Building Code Amendments on Housing Supply",
      authors: "Duong, S. M.",
      venue: "M.S. thesis, Georgia Tech School of City and Regional Planning",
      status: "Thesis",
      year: "2026",
      link: "",
      note: "Advisor: Dr. Subhro Guhathakurta.",
    },
  ],

  interests: [
    {
      icon: "map",
      title: "Spatial Analytics",
      body: "Integrating Census, GTFS, POI, and remote sensing data to study urban systems, accessibility, and neighborhood change at scale.",
    },
    {
      icon: "cpu",
      title: "Mobile and TinyML",
      body: "On-device ML pipelines from phones and SBCs down to ESP32 microcontrollers. Vision language models, keyword spotting, and motion classification, deployed where the data lives. Low latency, regulated data, offline by design.",
    },
    {
      icon: "building",
      title: "Urban Resilience and Policy",
      body: "Using quasi experimental methods to evaluate how building codes and zoning shape housing supply, affordability, and vulnerability.",
    },
    {
      icon: "search",
      title: "Retrieval Augmented Generation",
      body: "Building evidence grounded RAG systems over policy corpora so answers cite the ordinance, section, and jurisdiction they come from.",
    },
    {
      icon: "chart",
      title: "Causal and Regression Modeling",
      body: "Difference in differences, logistic regression, and covariate matching to isolate effects of interventions on housing and equity outcomes.",
    },
    {
      icon: "satellite",
      title: "Remote Sensing and GIS",
      body: "ArcGIS, QGIS, and PostGIS workflows for story maps, spatial joins, and infrastructure analyses that communicate clearly to non technical stakeholders.",
    },
    {
      icon: "bus",
      title: "Transit and Accessibility",
      body: "GTFS pipelines, service area buffers, and ACS equity overlays. Making transit analysis reproducible for planners.",
    },
  ],
  skills: [
    {
      group: "Programming",
      items: ["Python", "R", "SQL", "Java", "JavaScript"],
    },
    {
      group: "GIS and Spatial",
      items: ["ArcGIS Pro", "ArcGIS Online", "ArcGIS Maps SDK", "QGIS", "PostGIS", "GeoPandas", "H3", "OSMnx", "GTFS"],
    },
    {
      group: "Causal and ML",
      items: ["Difference in Differences", "Event Study", "HonestDiD", "Causal Forest", "scikit learn", "XGBoost", "SHAP", "PyTorch"],
    },
    {
      group: "LLM and RAG",
      items: ["LangChain", "LightRAG", "FAISS", "GPT 4o", "Gemini", "NVIDIA NIM", "Structured Output"],
    },
    {
      group: "Data Platforms",
      items: ["PostgreSQL", "Supabase", "Neo4j", "Snowflake", "Azure", "GCP", "Census ACS", "Overture Maps", "TomTom"],
    },
    {
      group: "Web and Viz",
      items: ["Mapbox GL", "Deck.gl", "D3.js Scrollytelling", "Three.js", "React", "Netlify Functions"],
    },
  ],
};
