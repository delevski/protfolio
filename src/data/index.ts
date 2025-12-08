import { PersonalInfo, Experience, Project, SkillCategory } from '@/types';

export const personalInfo: PersonalInfo = {
  name: "Or Delevski",
  title: "CTO / VP R&D & Technology Leader",
  location: "Ramat-Gan, Israel",
  email: "ordi1985@gmail.com",
  phone: "+972-54-7917154",
  summary: "Innovative and results-oriented technology leader with 15+ years of experience in R&D, product innovation, and scaling high-performance engineering teams. Expert in cloud architecture, AI-powered solutions, automation, and mobile platforms."
};

export const experiences: Experience[] = [
  {
    title: "CTO / VP R&D",
    company: "Constrol",
    period: "2023 – Present",
    description: [
      "Built the company's technology organization from scratch, doubling revenue in one year through scalable architectures and automation",
      "Designed and implemented BI, CRM, and SaaS platforms with real-time tracking",
      "Introduced AI-driven solutions and workflow automation using n8n, Zapier, and MCP-based systems",
      "Managed 18+ professionals, leading full-stack development in Next.js, React, C#, NestJS, and Python",
      "Specialized in AI, computer vision, and QA automation"
    ],
    techStack: ["Next.js", "React", "C#", "NestJS", "Python", "AI/ML", "Computer Vision", "n8n", "Zapier", "MCP"]
  },
  {
    title: "Head of R&D",
    company: "PayBox (Bank Discount)",
    period: "2019 – 2023",
    description: [
      "Led 20+ engineers across 3 teams in building fintech solutions",
      "Migrated monolith to microservices and designed event-driven architecture",
      "Saved $3M+ annually through payment optimization",
      "Built Tap-to-Pay, cashback, and loyalty integrations",
      "Managed Node.js, C#, Kotlin, Swift stacks with GCP, GKE, Jenkins CI/CD"
    ],
    techStack: ["Node.js", "C#", "Kotlin", "Swift", "GCP", "GKE", "Jenkins", "Microservices", "Event-Driven Architecture"]
  },
  {
    title: "Head of Mobile",
    company: "SpotOption / Dx.Exchange",
    period: "2014 – 2019",
    description: [
      "Led Android, iOS, QA teams to scale B2B fintech mobile platforms",
      "Achieved 10M+ downloads and 300+ white-label apps",
      "Introduced CI/CD automation and mobile product strategy"
    ],
    techStack: ["Android", "iOS", "Kotlin", "Swift", "CI/CD", "Mobile Strategy", "B2B Platforms"]
  }
];

export const projects: Project[] = [
  {
    id: "doto",
    title: "DOTO",
    description: "A community-driven platform to help others for free. Share knowledge, skills, and support with people in need.",
    techStack: ["JavaScript", "Node.js", "React", "Community Platform"],
    category: "web",
    githubUrl: "https://github.com/delevski/DOTO"
  },
  {
    id: "playground",
    title: "Playground",
    description: "Interactive code playground for experimenting with JavaScript and web technologies in a sandbox environment.",
    techStack: ["JavaScript", "HTML", "CSS", "Web APIs"],
    category: "web",
    githubUrl: "https://github.com/delevski/Playground"
  },
  {
    id: "feed-new",
    title: "Feed New",
    description: "Modern feed aggregator and news reader built with Python, featuring content curation and filtering capabilities.",
    techStack: ["Python", "RSS", "API Integration", "Data Processing"],
    category: "automation",
    githubUrl: "https://github.com/delevski/feed-new"
  },
  {
    id: "meme-generator",
    title: "Meme Generator",
    description: "Fun and easy-to-use meme generator with customizable templates, text overlays, and image manipulation features.",
    techStack: ["CSS", "JavaScript", "HTML5 Canvas", "Image Processing"],
    category: "web",
    githubUrl: "https://github.com/delevski/meme-generator"
  },
  {
    id: "lucky-wheel",
    title: "Lucky Wheel",
    description: "Interactive lucky wheel spinner for fun games and random selection. Customizable segments and smooth animations.",
    techStack: ["TypeScript", "React", "CSS Animations", "Canvas API"],
    category: "web",
    githubUrl: "https://github.com/delevski/Lucky-Wheel"
  },
  {
    id: "rag-test",
    title: "RAG Test",
    description: "Retrieval-Augmented Generation (RAG) storage system for specialized AI tasks with vector embeddings and semantic search.",
    techStack: ["TypeScript", "AI/ML", "Vector DB", "LangChain", "Embeddings"],
    category: "ai",
    githubUrl: "https://github.com/delevski/RAG-test"
  },
  {
    id: "portfolio-html",
    title: "Portfolio Template",
    description: "Clean and responsive HTML portfolio template showcasing projects and skills with modern design principles.",
    techStack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    category: "web",
    githubUrl: "https://github.com/delevski/protfolio"
  },
  {
    id: "fastapi-aws-ingestor",
    title: "FastAPI AWS Ingestor",
    description: "A production-ready FastAPI microservice that ingests JSON, validates and transforms it, then stores the data in AWS S3 or DynamoDB. Includes unit tests, Docker support, and comprehensive error handling.",
    techStack: ["Python", "FastAPI", "AWS S3", "DynamoDB", "Docker", "Pytest"],
    category: "web",
    githubUrl: "https://github.com/delevski/fastapi-aws-ingestor"
  },
  {
    id: "crm-pro-vb",
    title: "CRM PRO VB",
    description: "Professional CRM system built with modern web technologies for customer relationship management and business process automation.",
    techStack: ["JavaScript", "Node.js", "React", "MongoDB"],
    category: "web",
    githubUrl: "https://github.com/delevski/CRM-PRO-VB"
  },
  {
    id: "scrape-websites",
    title: "Scrape Websites",
    description: "Universal web scraping tool that can extract data from any website with configurable selectors and data processing capabilities.",
    techStack: ["JavaScript", "Node.js", "Puppeteer", "Cheerio"],
    category: "automation",
    githubUrl: "https://github.com/delevski/Scrape-Websites"
  },
  {
    id: "banano-editor",
    title: "Banano Editor",
    description: "Advanced image editor built with Google's Nano Banana technology, providing powerful image manipulation capabilities.",
    techStack: ["TypeScript", "React", "Canvas API", "Image Processing"],
    category: "web",
    githubUrl: "https://github.com/delevski/bananoEditor"
  },
  {
    id: "do-your-image",
    title: "Do Your Image",
    description: "Creative image generation and manipulation tool that allows users to create custom images with AI-powered features.",
    techStack: ["TypeScript", "React", "AI/ML", "Image Generation"],
    category: "ai",
    githubUrl: "https://github.com/delevski/Do-your-image"
  },
  {
    id: "ocr-extractor",
    title: "OCR Extractor",
    description: "Comprehensive OCR solution that extracts text from PDFs, images, Word documents, Excel files and more with high accuracy.",
    techStack: ["Python", "OCR", "Tesseract", "PDF Processing", "Image Processing"],
    category: "automation",
    githubUrl: "https://github.com/delevski/OCR-extractor"
  },
  {
    id: "constrol-platform",
    title: "Constrol SaaS Platform",
    description: "Comprehensive BI, CRM, and SaaS platform with real-time tracking and AI-driven automation workflows",
    techStack: ["Next.js", "React", "C#", "NestJS", "Python", "AI/ML"],
    category: "web",
    liveUrl: "#"
  },
  {
    id: "paybox-fintech",
    title: "PayBox Fintech Solutions",
    description: "Microservices-based payment platform with Tap-to-Pay, cashback, and loyalty integrations",
    techStack: ["Node.js", "C#", "Kotlin", "Swift", "GCP", "Microservices"],
    category: "fintech",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.payboxapp"
  },
  {
    id: "mobile-platforms",
    title: "B2B Mobile Platforms",
    description: "Scalable mobile platforms achieving 10M+ downloads and 300+ white-label applications",
    techStack: ["Android", "iOS", "Kotlin", "Swift", "CI/CD"],
    category: "mobile"
  }
];

// This will be populated from the skills.json file
export const skillsCategories: SkillCategory[] = [];
