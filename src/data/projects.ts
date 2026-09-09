/** Swap titles, copy, links, and `/projects/*.mp4` files here — every flip card reads this list. */
export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectTheme = "earth" | "gsoc" | "error" | "gallery" | "scheduler" | "nebula" | "arcade" | "signal" | "terminal" | "blueprint";

export type PortfolioProject = {
  title: string;
  year: string;
  live: boolean;
  wide?: boolean;
  theme: ProjectTheme;
  description: string;
  technologies: string[];
  // videoSrc: string;
  links: ProjectLink[];
};

export const projects: PortfolioProject[] = [
  {
    title: "Veritas — Startup Intelligence Platform",
    year: "2026",
    live: true,
    wide: false,
    theme: "earth",
    description:
      "End-to-end startup intelligence platform combining machine-learning success prediction with Amazon Nova reasoning. Veritas evaluates startup success probability, provides confidence scores, analyzes market signals and documents, and acts as an AI investment advisor through a full-stack React and FastAPI application.",
    technologies: [
      "Python",
      "React",
      "FastAPI",
      "Scikit-learn",
      "XGBoost",
      "Amazon Bedrock",
      "Amazon Nova",
      "SHAP",
      "REST APIs",
    ],
    // videoSrc: "/projects/veritas.mp4",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/SitaGanesh/Startup-Success-Thoughh-Data-Driven-Investment-Analysis",
      },
    ],
  },

  {
    title: "AgentIQ — AI Sales Proposal Orchestrator",
    year: "2026",
    live: true,
    wide: true,
    theme: "gsoc",
    description:
      "AI-powered sales orchestration platform that automates the sales-to-proposal workflow. A LangGraph ReAct agent retrieves Salesforce CRM data, searches product knowledge through RAG, reasons over the context, and generates personalized PDF proposals with real-time agent execution visibility.",
    technologies: [
      "Next.js",
      "React",
      "Redux",
      "FastAPI",
      "Python",
      "LangGraph",
      "LangChain",
      "Salesforce",
      "Supabase",
      "pgvector",
      "RAG",
      "Groq",
      "FPDF2",
    ],
    // videoSrc: "/projects/agentiq.mp4",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/SitaGanesh/AgentIQ",
      },
    ],
  },

  {
    title: "SentinelGraph — AML Investigation Platform",
    year: "2026",
    live: true,
    wide: true,
    theme: "error",
    description:
      "Graph-based Anti-Money Laundering investigation platform that analyzes transaction networks to uncover fan-out, fan-in, layering, multi-hop and circular laundering patterns. Provides investigators with interactive graph visualization, account search, transaction tracing and suspicious-flow analysis.",
    technologies: [
      "React",
      "FastAPI",
      "Python",
      "Cytoscape.js",
      "CognoDB",
      "Neo4j",
      "Cypher",
      "Graph Analytics",
      "REST APIs",
    ],
    // videoSrc: "/projects/sentinelgraph.mp4",
    links: [
      {
        label: "Website",
        href: "https://sentinel-graph-aml-one.vercel.app/",
      },
      {
        label: "GitHub",
        href: "https://github.com/SitaGanesh/SentinelGraph-AML",
      },
    ],
  },

  {
    title: "Qualcomm NPU — Artistic Image Generation",
    year: "2025",
    live: false,
    theme: "nebula",
    description:
      "Developed an artistic image-generation and style-transfer solution targeting Qualcomm NPU hardware, with a mobile-friendly application designed to connect to the device through USB and perform AI-powered image generation on-device.",
    technologies: [
      "Python",
      "AI/ML",
      "Stable Diffusion",
      "Qualcomm NPU",
      "QIDK",
      "Computer Vision",
      "USB",
      "Mobile UI",
    ],
    // videoSrc: "/projects/qualcomm.mp4",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/SitaGanesh/PS-QUALCOMM",
      },
    ],
  },

  {
    title: "Artistic Style Transfer & Colorization",
    year: "2025",
    live: true,
    theme: "gallery",
    description:
      "Deep-learning image colorization system that transforms grayscale images into vibrant artworks by combining Lab color-space processing, VGG-19 feature extraction, Adaptive Instance Normalization and a custom decoder to transfer artistic palettes and textures.",
    technologies: [
      "Python",
      "PyTorch",
      "Torchvision",
      "VGG-19",
      "AdaIN",
      "OpenCV",
      "NumPy",
      "Streamlit",
      "Computer Vision",
      "Deep Learning",
    ],
    // videoSrc: "/projects/artistic-colorization.mp4",
    links: [
      {
        label: "Website",
        href: "https://artifycolor.streamlit.app/",
      },
      {
        label: "GitHub",
        href: "https://github.com/SitaGanesh/Artistic-style-colorization",
      },
    ],
  },

  {
    title: "GetriPath — Optimal Multi-Stop Route Planner",
    year: "2025",
    live: true,
    wide: true,
    theme: "signal",
    description:
      "Route-optimization web application for planning trips across multiple destinations. It geocodes locations, builds an OSRM distance matrix, solves the route using TSP strategies, and visualizes the calculated path, total distance and route details on an interactive map.",
    technologies: [
      "Python",
      "Flask",
      "JavaScript",
      "HTML",
      "CSS",
      "Leaflet",
      "OSRM",
      "OpenStreetMap",
      "Photon",
      "Nominatim",
      "TSP",
    ],
    // videoSrc: "/projects/getripath.mp4",
    links: [
      {
        label: "Website",
        href: "https://getripath.onrender.com/",
      },
      {
        label: "GitHub",
        href: "https://github.com/SitaGanesh/getripath",
      },
    ],
  },


  {
    title: "EchoKey — Interactive Typing Game",
    year: "2025",
    live: true,
    theme: "arcade",
    description:
      "Interactive typing game that challenges players to combine five character buttons into words while synchronizing keyboard input with drum sounds and visual feedback, creating a playful approach to typing practice.",
    technologies: [
      "JavaScript",
      "HTML",
      "CSS",
      "Web Audio",
      "Game Development",
    ],
    // videoSrc: "/projects/echokey.mp4",
    links: [
      {
        label: "Website",
        href: "https://echokey.vercel.app/",
      },
      {
        label: "GitHub",
        href: "https://github.com/SitaGanesh/echokey",
      },
    ],
  },

  {
    title: "FastAccess — Instant Website Launcher",
    year: "2025",
    live: true,
    theme: "terminal",
    description:
      "Lightweight web utility for creating memorable shortcut links to frequently used websites. Users provide a destination URL and custom name, generate a linker, and instantly redirect to the saved website.",
    technologies: [
      "React",
      "Vite",
      "JavaScript",
      "Tailwind CSS",
      "HTML",
      "CSS",
    ],
    // videoSrc: "/projects/fastaccess.mp4",
    links: [
      {
        label: "Website",
        href: "https://fastaccess.vercel.app/",
      },
      {
        label: "GitHub",
        href: "https://github.com/SitaGanesh/FastAccess",
      },
    ],
  },

  {
    title: "Dev — Developer Portfolio",
    year: "2025",
    live: true,
    theme: "blueprint",
    description:
      "Personal developer portfolio showcasing projects, technical work and development experience through a responsive web interface.",
    technologies: [
      "React",
      "JavaScript",
      "Vercel",
      "Web Development",
    ],
    // videoSrc: "/projects/dev.mp4",
    links: [
      {
        label: "Website",
        href: "https://dev-psi-seven.vercel.app/",
      },
      {
        label: "GitHub",
        href: "https://github.com/SitaGanesh/dev",
      },
    ],
  },
];