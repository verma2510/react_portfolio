// TODO: Update all these placeholder values with your real information

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
    topSkills: [
      { name: "React", level: 95 },
      { name: "Node.js", level: 85 },
      { name: "TypeScript", level: 90 },
      { name: "Python", level: 80 },
      { name: "AWS", level: 65 }
    ],
    categories: {
      "Frontend": [
        { name: "React / Next.js", icon: "Code" },
        { name: "TypeScript", icon: "FileCode" },
        { name: "Tailwind CSS", icon: "Palette" },
        { name: "Framer Motion", icon: "Sparkles" }
      ],
      "Backend": [
        { name: "Node.js / Express", icon: "Cpu" },
        { name: "Python / Django", icon: "Terminal" },
        { name: "PostgreSQL", icon: "Database" },
        { name: "MongoDB", icon: "Database" }
      ],
      "Tools & DevOps": [
        { name: "Git & GitHub", icon: "GitBranch" },
        { name: "Docker", icon: "Package" },
        { name: "AWS", icon: "Cloud" },
        { name: "Firebase", icon: "Flame" }
      ],
      "Others": [
        { name: "Figma", icon: "PenTool" },
        { name: "C++", icon: "Braces" },
        { name: "Streamlit", icon: "Box" },
        { name: "Gen AI", icon: "Sparkles" }
      ]
    }
  },
  experience: [
    {
      role: "Software Engineer",
      company: "Tech Corp",
      duration: "2021 - Present",
      achievements: [
        "Architected scalable microservices, increasing system throughput by 40%.",
        "Pioneered a cinematic frontend revamp combining React and WebGL.",
        "Mentored a team of 3 junior developers to full independence."
      ],
      stack: ["React", "Node.js", "Docker", "AWS"]
    },
    {
      role: "Frontend Developer",
      company: "Web Solutions Inc.",
      duration: "2019 - 2021",
      achievements: [
        "Crafted premium, interactive user interfaces with React and Framer Motion.",
        "Halved initial page load time through strategic code splitting."
      ],
      stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"]
    }
  ],
  projects: [
    {
      title: "Cinematic E-Commerce",
      description: "Designed an experiential storefront that boosted average engagement time by 300%. Integrates subtle scrollytelling with high-performance WebGL product reveals.",
      stack: ["React", "Node.js", "Framer Motion", "Three.js"],
      category: "Web",
      featured: true,
      liveLink: "https://example.com",
      githubLink: "https://github.com/example/ecommerce",
      imageUrl: "https://images.unsplash.com/photo-1661956602116-aa6865609028?fit=crop&w=800&q=80"
    },
    {
      title: "Nexus Task Manager",
      description: "Delivered a clean, distraction-free coordination layer adopted natively by startup teams. Features real-time sync and optimistic UI updates.",
      stack: ["Next.js", "Tailwind CSS", "Firebase"],
      category: "Web",
      featured: false,
      githubLink: "https://github.com/example/task-app",
      imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?fit=crop&w=800&q=80"
    },
    {
      title: "Dev Story Engine",
      description: "A full open-source scrollytelling template for developers built on a modern Vite pipeline.",
      stack: ["Vite", "React", "Express"],
      category: "Web",
      featured: false,
      githubLink: "https://github.com/example/dev-story",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?fit=crop&w=800&q=80"
    },
    {
      title: "Terminal Weather",
      description: "A blazing fast CLI tool for weather forecasts without leaving your development environment.",
      stack: ["Go", "Cobra", "OpenWeather API"],
      category: "Tools",
      featured: false,
      githubLink: "https://github.com/example/terminal-weather",
      imageUrl: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?fit=crop&w=800&q=80"
    },
    {
      title: "Aura Mobile Wallet",
      description: "A sleek, dark-themed crypto wallet app utilizing secure enclaves for key management.",
      stack: ["React Native", "Expo", "Ethers.js"],
      category: "Mobile",
      featured: true,
      liveLink: "https://example.com",
      imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?fit=crop&w=800&q=80"
    }
  ],
  education: [
    {
      degree: "B.S. in Computer Science",
      institution: "State University",
      duration: "2015 - 2019",
      grade: "3.8/4.0 CGPA",
      highlights: [
        "President of the Computer Science Society",
        "Lead Organizer for State Hackathon 2018",
        "Published paper on distributed systems"
      ]
    },
    {
      degree: "Full Stack Web Development Bootcamp",
      institution: "Tech Academy",
      duration: "2020",
      grade: "Honors",
      highlights: [
        "Built 5 full-stack applications",
        "Mentored peers in React and Node.js",
        "Won Best Capstone Project"
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
