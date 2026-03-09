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
    name: "Aman Verma",
    tagline: "Every great product starts with a curious mind.",
    originStory: "From parsing my first basic logic flows to crafting full-stack, cinematic web experiences, my journey is driven by an unrelenting curiosity.", 
    resumeUrl: "/resume.pdf"
  },
  about: {
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80",
    paragraphs: [
      "I'm a full-stack developer with a B.E. in Electronics & Telecom and a specialization in AI/ML. I build robust web applications across the MERN stack, Django, and FastAPI in both TypeScript and JavaScript.",
      // "I thrive in fast-paced environments, collaborating across teams and delivering features with clean version control and efficient workflows. I bring both breadth across multiple frameworks and languages and depth, going beyond surface-level implementation to truly understand the systems I build.",
      "I'm known for diagnosing complex bugs, implementing efficient data structures, and enhancing authorization workflows. I believe great software is where engineering discipline meets thoughtful craft."
    ],
    milestones: [
      { year: "2020", text: "Wrote my first line of code" },
      { year: "2023", text: "Caught the React bug and built my first full-stack apps and never looked back" },
      { year: "2024", text: "Graduated with a 9.02 CGPA, stacked certifications, and started turning ideas into real products" },
      { year: "Present", text: "Shipping production-grade features daily optimizing systems, squashing complex bugs, and building experiences that scale." }
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
          { name: "React.js", icon: "react", proficiency: 90, years: 2, note: "Primary framework across all projects" },
          { name: "TypeScript", icon: "typescript", proficiency: 85, years: 2, note: "Used in all recent production work" },
          { name: "Tailwind CSS", icon: "tailwind", proficiency: 85, years: 2, note: "Go-to styling solution" },
          { name: "Redux", icon: "redux", proficiency: 75, years: 1, note: "State management" },
        ]
      },
      {
        category: "Backend",
        orbitRadius: 300,
        color: "#06b6d4",
        rotationSpeed: 80,
        rotationDirection: -1,
        skills: [
          { name: "Node.js", icon: "node", proficiency: 85, years: 2, note: "REST APIs & MERN stack" },
          { name: "Express", icon: "express", proficiency: 85, years: 2, note: "Primary Node.js framework" },
          { name: "Python", icon: "python", proficiency: 80, years: 2, note: "Scripting & backend services" },
          { name: "FastAPI", icon: "fastapi", proficiency: 78, years: 1, note: "High-performance Python APIs" },
          { name: "Django", icon: "django", proficiency: 75, years: 1, note: "REST Framework & ORM" },
          { name: "MongoDB", icon: "mongodb", proficiency: 80, years: 2, note: "Primary NoSQL database" },
        ]
      },
      {
        category: "Tools & DevOps",
        orbitRadius: 400,
        color: "#10b981",
        rotationSpeed: 100,
        rotationDirection: 1,
        skills: [
          { name: "Git", icon: "git", proficiency: 90, years: 2, note: "Branching, collaboration & version control" },
          { name: "Vercel", icon: "vercel", proficiency: 80, years: 2, note: "Frontend hosting & CI/CD" },
          { name: "Render", icon: "render", proficiency: 75, years: 2, note: "Backend deployments" },
          { name: "Railway", icon: "railway", proficiency: 72, years: 2, note: "Backend & database hosting" },
        ]
      },
      {
        category: "Others",
        orbitRadius: 500,
        color: "#f59e0b",
        rotationSpeed: 120,
        rotationDirection: -1,
        skills: [
          { name: "Socket.io", icon: "socketdotio", proficiency: 72, years: 1, note: "Real-time communication" },
          { name: "DSA", icon: "dsa", proficiency: 75, years: 2, note: "Problem solving & optimization" },
        ]
      }
    ]
  },
  experience: [
    {
      company: "AI-TechTures Labs LLP",
      role: "Software Development Engineer",
      period: { start: "Jul 2025", end: "Present" },
      descriptor: "Product studio building CRM systems, analytics dashboards, and e-commerce platforms",
      pullQuote: "Improved search efficiency by up to 81% while shipping across CRM, analytics, and e-commerce products",
      achievements: [
        "Improved search efficiency by up to 81% through optimized data structures and query design",
        "Enhanced authorization workflows and significantly refined frontend performance and UI/UX",
        "Diagnosed and resolved complex production bugs across full-stack MERN, Django, and FastAPI codebases"
      ],
      responsibilities: ["Full-stack development", "Bug diagnosis", "UI/UX refinement", "API design", "Authorization workflows", "Performance optimization"],
      stack: ["React.js", "Node.js", "MongoDB", "Python", "FastAPI", "Django", "TypeScript"],
      stackTooltips: {
        "React.js": "Primary frontend framework across all product surfaces",
        "Node.js": "Backend services and REST API development",
        "MongoDB": "NoSQL database for scalable data storage",
        "Python": "Scripting, data pipelines, and ML integrations",
        "FastAPI": "High-performance Python API services",
        "Django": "Full-stack web framework with ORM",
        "TypeScript": "Type-safe development across recent projects"
      },
      duration: "Present"
    },
    {
      company: "Nextgen Infratech Solutions LLP",
      role: "Full Stack Developer Intern",
      period: { start: "Mar 2025", end: "Jun 2025" },
      descriptor: "Infrastructure solutions company building responsive, high-performance web applications",
      pullQuote: "Led creation of responsive MERN applications with media-responsive designs that improved user engagement",
      achievements: [
        "Led development of high-performance, responsive applications using MERN stack and Tailwind CSS",
        "Implemented media-responsive designs improving user engagement across devices",
        "Collaborated on GitHub for efficient version control and seamless feature integration"
      ],
      responsibilities: ["Full-stack development", "Responsive design", "Version control", "Feature integration", "UI implementation"],
      stack: ["React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      stackTooltips: {
        "React.js": "Frontend development for all application surfaces",
        "Node.js": "Backend runtime for server-side logic",
        "Express": "REST API framework and middleware",
        "MongoDB": "Database design and management",
        "Tailwind CSS": "Responsive and utility-first styling"
      },
      duration: "4 months"
    },
    {
      company: "Accordo.ai",
      role: "AI-driven Software Development Intern",
      period: { start: "Aug 2024", end: "Jan 2025" },
      descriptor: "AI startup focused on machine learning integration and generative AI product development",
      pullQuote: "Built a local Generative AI model using Llama 3.2 1B with full-stack FastAPI & ReactJS integration",
      achievements: [
        "Built a Generative AI model using Llama 3.2 1B Instruct LLM on a custom dataset locally in PyCharm with full-stack integration via FastAPI and ReactJS",
        "Applied UI/UX principles in Figma to design and implement user-friendly interfaces, enhancing overall user experience",
        "Researched emerging technologies and contributed to ReactJS development, pushing all projects to GitHub"
      ],
      responsibilities: ["Machine learning", "ReactJS development", "Generative AI", "UI/UX design", "Research", "Full-stack integration"],
      stack: ["React.js", "FastAPI", "Python", "Figma", "Llama 3.2"],
      stackTooltips: {
        "React.js": "Frontend development and UI implementation",
        "FastAPI": "Backend integration for AI model serving",
        "Python": "ML model development and scripting",
        "Figma": "UI/UX design and interface prototyping",
        "Llama 3.2": "Local LLM used for generative AI on custom dataset"
      },
      duration: "6 months"
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
