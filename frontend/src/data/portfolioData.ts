// TODO: Update all these placeholder values with your real information

export interface ExperienceEntry {
  company: string;
  role: string;
  period: { start: string; end: string };
  descriptor: string;
  pullQuote: string;
  achievements: string[];
  responsibilities: string[];
  stack: string[];
  stackTooltips?: Record<string, string>;
  duration: string;
}

export const portfolioData = {
  hero: {
    name: "Aman V.",
    tagline: "Every great product starts with a curious mind.",
    originStory: "From parsing my first basic logic flows to crafting full-stack, cinematic web experiences, my journey is driven by an unrelenting curiosity.", 
    resumeUrl: "/resume.pdf"
  },
  about: {
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80",
    paragraphs: [
      "I am a software engineer with a flair for the technical and the cinematic. I see code not just as logic, but as a medium for storytelling and human connection.",
      "My origin story is rooted in a fascination with how things work under the hood, leading me to master the full stack.",
      "When I'm not orchestrating seamless digital experiences, I'm experimenting with new architectural patterns or lost in the world of design."
    ],
    milestones: [
      { year: "2019", text: "Wrote my first line of code" },
      { year: "2021", text: "Started Frontend Developer role" },
      { year: "2023", text: "Mastered full-stack architecture" },
      { year: "Present", text: "Building cinematic experiences" }
    ]
  },
  skills: {
    solarSystem: [
      {
        category: "Frontend",
        orbitRadius: 190,
        color: "#6366f1",
        rotationSpeed: 60,
        rotationDirection: 1,
        skills: [
          { name: "React", icon: "react", proficiency: 95, years: 4, note: "Primary framework, 6+ production apps" },
          { name: "TypeScript", icon: "typescript", proficiency: 90, years: 3, note: "Used in all recent projects" },
          { name: "Tailwind CSS", icon: "tailwind", proficiency: 85, years: 3, note: "Go-to styling solution" },
          { name: "Framer Motion", icon: "framer", proficiency: 80, years: 2, note: "Animation-heavy UIs" }
        ]
      },
      {
        category: "Backend",
        orbitRadius: 300,
        color: "#06b6d4",
        rotationSpeed: 80,
        rotationDirection: -1,
        skills: [
          { name: "Node.js", icon: "node", proficiency: 85, years: 4, note: "REST & GraphQL APIs" },
          { name: "Python", icon: "python", proficiency: 80, years: 3, note: "Scripting & ML pipelines" },
          { name: "PostgreSQL", icon: "postgresql", proficiency: 75, years: 2, note: "Complex query design" },
          { name: "MongoDB", icon: "mongodb", proficiency: 70, years: 2, note: "NoSQL at scale" }
        ]
      },
      {
        category: "Tools & DevOps",
        orbitRadius: 400,
        color: "#10b981",
        rotationSpeed: 100,
        rotationDirection: 1,
        skills: [
          { name: "Git", icon: "git", proficiency: 90, years: 5, note: "Advanced branching & workflows" },
          { name: "Docker", icon: "docker", proficiency: 70, years: 2, note: "Containerized deployments" },
          { name: "AWS", icon: "aws", proficiency: 65, years: 2, note: "EC2, S3, Lambda" },
          { name: "Firebase", icon: "firebase", proficiency: 75, years: 3, note: "Auth, Firestore, Hosting" }
        ]
      },
      {
        category: "Others",
        orbitRadius: 500,
        color: "#f59e0b",
        rotationSpeed: 120,
        rotationDirection: -1,
        skills: [
          { name: "Figma", icon: "figma", proficiency: 80, years: 3, note: "Design-to-code pipeline" },
          { name: "C++", icon: "cpp", proficiency: 70, years: 4, note: "Competitive programming" },
          { name: "Streamlit", icon: "streamlit", proficiency: 65, years: 1, note: "Rapid data app prototyping" },
          { name: "Gen AI", icon: "openai", proficiency: 75, years: 1, note: "LLM integration & prompt eng." }
        ]
      }
    ]
  },
  experience: [
    {
      company: "Anthropic",
      role: "Senior Software Engineer",
      period: { start: "Jan 2022", end: "Mar 2024" },
      descriptor: "AI safety research company building reliable, interpretable AI systems",
      pullQuote: "Reduced inference latency by 60%, directly improving response quality for 2M+ daily active users",
      achievements: [
        "Architected a real-time data pipeline processing 500k events per day with sub-10ms p99",
        "Led migration of monolithic frontend to micro-frontend architecture across 6 product teams",
        "Mentored 4 junior engineers, 2 of whom were promoted to mid-level within a year"
      ],
      responsibilities: ["System architecture", "Team mentorship", "API design", "Code reviews", "Incident response", "Roadmap planning"],
      stack: ["React", "TypeScript", "Python", "AWS", "Redis", "GraphQL"],
      stackTooltips: {
        "React": "Built all consumer-facing product surfaces",
        "TypeScript": "Enforced strict typing across 200k+ line codebase",
        "Python": "ML pipeline orchestration and data tooling",
        "AWS": "Multi-region infra: ECS, Lambda, RDS, S3",
        "Redis": "Session management and real-time pub/sub",
        "GraphQL": "Unified API gateway across 12 microservices"
      },
      duration: "26 months"
    },
    {
      company: "Vercel",
      role: "Software Engineer — DX",
      period: { start: "Aug 2020", end: "Dec 2021" },
      descriptor: "Cloud platform powering the modern web for 1M+ developers worldwide",
      pullQuote: "Shipped the Analytics dashboard end-to-end in 6 weeks, now used by 400k projects monthly",
      achievements: [
        "Designed and shipped the Core Web Vitals analytics dashboard from zero to GA",
        "Reduced CLI cold-start time by 45% through lazy-loading and compile-time tree shaking",
        "Authored 12 open-source guides adopted as official developer documentation"
      ],
      responsibilities: ["Developer experience", "Open source", "CLI tooling", "Documentation", "Performance audits", "SDK design"],
      stack: ["Next.js", "TypeScript", "Go", "Node.js", "Turborepo"],
      stackTooltips: {
        "Next.js": "Primary framework for all internal tooling surfaces",
        "TypeScript": "Full type safety across SDK and CLI packages",
        "Go": "High-performance proxy and edge runtime modules",
        "Node.js": "Build system integrations and plugin APIs",
        "Turborepo": "Monorepo task orchestration for 40+ packages"
      },
      duration: "16 months"
    },
    {
      company: "Razorpay",
      role: "Frontend Developer",
      period: { start: "Jul 2019", end: "Jul 2020" },
      descriptor: "India's leading payment gateway processing billions in annual transactions",
      pullQuote: "Rebuilt the checkout flow UI, lifting conversion rates by 18% across 300k merchant storefronts",
      achievements: [
        "Redesigned the checkout SDK with a pixel-perfect, accessible component library",
        "Halved bundle size from 420kB to 210kB via aggressive code splitting and lazy loading",
        "Implemented A/B testing infrastructure used by 5 product squads simultaneously"
      ],
      responsibilities: ["UI component library", "A/B testing", "Accessibility", "Performance optimization", "Cross-browser QA"],
      stack: ["React", "Vanilla JS", "SCSS", "Webpack", "Jest"],
      stackTooltips: {
        "React": "Rebuilt merchant dashboard and checkout surfaces",
        "Vanilla JS": "Lightweight SDK with zero framework dependencies",
        "SCSS": "Design token system for white-label theming",
        "Webpack": "Custom build pipeline with dynamic chunking",
        "Jest": "Unit and snapshot testing for 95% coverage"
      },
      duration: "12 months"
    }
  ],
  projects: [
    {
      title: "Cinematic E-Commerce",
      role: "Full Stack",
      year: "2024",
      description: "Designed an experiential storefront that boosted average engagement time by 300%. Integrates subtle scrollytelling with high-performance WebGL product reveals.",
      stack: ["React", "Node.js", "Framer Motion", "Three.js"],
      category: "Web",
      featured: true,
      liveLink: "https://example.com",
      githubLink: "https://github.com/example/ecommerce",
      imageUrl: "https://images.unsplash.com/photo-1661956602116-aa6865609028?fit=crop&w=800&q=80",
      impact: "300% engagement",
      accentShape: { type: "circles", colors: ["#6366f1", "#818cf8", "#c7d2fe"] }
    },
    {
      title: "Nexus Task Manager",
      role: "Frontend",
      year: "2023",
      description: "Delivered a clean, distraction-free coordination layer adopted natively by startup teams. Features real-time sync and optimistic UI updates.",
      stack: ["Next.js", "Tailwind CSS", "Firebase"],
      category: "Web",
      featured: false,
      githubLink: "https://github.com/example/task-app",
      imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?fit=crop&w=800&q=80",
      impact: "10k+ users",
      accentShape: { type: "grid", colors: ["#06b6d4", "#22d3ee", "#a5f3fc"] }
    },
    {
      title: "Dev Story Engine",
      role: "Full Stack",
      year: "2023",
      description: "A full open-source scrollytelling template for developers built on a modern Vite pipeline.",
      stack: ["Vite", "React", "Express"],
      category: "Web",
      featured: false,
      githubLink: "https://github.com/example/dev-story",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?fit=crop&w=800&q=80",
      impact: "500+ stars",
      accentShape: { type: "waves", colors: ["#8b5cf6", "#a78bfa", "#ddd6fe"] }
    },
    {
      title: "Terminal Weather",
      role: "CLI Tool",
      year: "2022",
      description: "A blazing fast CLI tool for weather forecasts without leaving your development environment.",
      stack: ["Go", "Cobra", "OpenWeather API"],
      category: "Tools",
      featured: false,
      githubLink: "https://github.com/example/terminal-weather",
      imageUrl: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?fit=crop&w=800&q=80",
      impact: "40% faster",
      accentShape: { type: "diagonal", colors: ["#10b981", "#34d399", "#a7f3d0"] }
    },
    {
      title: "Aura Mobile Wallet",
      role: "Mobile",
      year: "2024",
      description: "A sleek, dark-themed crypto wallet app utilizing secure enclaves for key management.",
      stack: ["React Native", "Expo", "Ethers.js"],
      category: "Mobile",
      featured: true,
      liveLink: "https://example.com",
      imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?fit=crop&w=800&q=80",
      impact: "5k+ downloads",
      accentShape: { type: "rings", colors: ["#f59e0b", "#fbbf24", "#fde68a"] }
    }
  ],
  education: [
    {
      degree: "B.E. in Electronics and Telecommunication",
      institution: "Vivekanand Education Society's Institute of Technology",
      duration: "2020 - 2024",
      grade: "9.02/10 CGPA",
      highlights: [
        "Secured 1st place in State Level Hackathon 2022",
        "Lead Organizer for State Hackathon 2020",
        "Published paper on distributed systems"
      ]
    },
    {
      degree: "HSC",
      institution: "New Horizon Public School",
      duration: "2018 - 2020",
      grade: "81.6%",
      highlights: [
        "Won 1st place in State Level Science Exhibition 2019",
        "Secured 2nd place in DSO Cricket Tournament 2020",
        "Organized TechFest 2019"
      ]
    }
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "Oct 2023",
      link: "https://aws.amazon.com/verification",
      icon: "Cloud" 
    },
    {
      name: "Frontend Masters React",
      issuer: "Frontend Masters",
      date: "Mar 2022",
      link: "https://frontendmasters.com/verify",
      icon: "Code"
    },
    {
      name: "Google CyberSecurity Professional",
      issuer: "Google",
      date: "Jan 2024",
      link: "https://coursera.org/verify",
      icon: "ShieldCheck"
    },
    {
      name: "Advanced TypeScript",
      issuer: "Total TypeScript",
      date: "Nov 2023",
      link: "https://totaltypescript.com/verify",
      icon: "FileCode"
    }
  ],
  hobbies: [
    {
      name: "Photography",
      description: "Chasing the golden hour and mastering shadows.",
      emoji: "📸"
    },
    {
      name: "Analog Synths",
      description: "Wiring up patches for generative soundscapes.",
      emoji: "🎛️"
    },
    {
      name: "Writing",
      description: "Distilling complex concepts into essays.",
      emoji: "✍️"
    },
    {
      name: "Football",
      description: "Playing weekend leagues with endless stamina.",
      emoji: "⚽"
    },
    {
      name: "Coffee",
      description: "Brewing the perfect pour-over every morning.",
      emoji: "☕"
    }
  ],
  contact: {
    message: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    email: "letstalk@example.com"
  }
};
