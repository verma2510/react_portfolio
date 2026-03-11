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
    photoUrl: "/photo.jpg",
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
      title: "FloorMaster",
      role: "Full Stack",
      year: "2025",
      description: ["CAD-based architectural rendering application with custom geometric algorithms for polygon generation, edge detection, and real-time wall drawing.", " Features intelligent vertex snapping, fragment outline system with edge suppression, and an interactive editing toolkit with undo/redo functionality."],
      stack: ["React", "TypeScript", "PixiJS"],
      category: "Web",
      featured: true,
      liveLink: "",
      githubLink: "",
      imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?fit=crop&w=800&q=80",
      impact: "60% faster design",
      accentShape: { type: "circles", colors: ["#6366f1", "#818cf8", "#c7d2fe"] }
    },
    {
      title: "EduBase",
      role: "Full Stack",
      year: "2024",
      description: "University data management platform with multi-step forms capturing hierarchical university, campus, and course data. Features Django ORM with cascading updates, bulk import/export (Excel, CSV), and an administrative dashboard with quality monitoring for 1000+ educational institutions.",
      stack: ["React", "Django", "Python", "PostgreSQL"],
      category: "Web",
      featured: true,
      liveLink: "",
      githubLink: "",
      imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?fit=crop&w=800&q=80",
      impact: "1000+ institutions",
      accentShape: { type: "circles", colors: ["#06b6d4", "#67e8f9", "#cffafe"] }
    },
    {
      title: "AdmitHub",
      role: "Full Stack",
      year: "2024",
      description: "Student counseling platform with hierarchical user management across Admins, Counselors, and Students. Includes JWT authentication, community forum with peer discussions and moderation, appointment scheduling, application tracking, and a university catalog with 500+ institutions.",
      stack: ["React", "Node.js", "Express", "MongoDB"],
      category: "Web",
      featured: false,
      liveLink: "",
      githubLink: "",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?fit=crop&w=800&q=80",
      impact: "500+ universities",
      accentShape: { type: "circles", colors: ["#10b981", "#6ee7b7", "#d1fae5"] }
    },
    {
      title: "Discover Dish",
      role: "Frontend",
      year: "2024",
      description: "Recipe finder application integrating a public API to fetch and display recipes. Features recipe search, favorites management on a dedicated page, and Redux state management for seamless addition and removal of saved recipes.",
      stack: ["React", "Redux"],
      category: "Web",
      featured: false,
      liveLink: "https://discover-dish.netlify.app/",
      githubLink: "https://github.com/verma2510/discover-dish",
      imageUrl: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?fit=crop&w=800&q=80",
      impact: "Public API integration",
      accentShape: { type: "circles", colors: ["#f59e0b", "#fcd34d", "#fef3c7"] }
    },
    {
      title: "Finance Dashboard",
      role: "Frontend",
      year: "2024",
      description: "Interactive data-driven frontend application for banking analytics. Features dynamic modules presenting key financial metrics, reusable components like Navbar, Chart, and Sidebar, and React Router for seamless navigation across sections.",
      stack: ["React", "React Router"],
      category: "Web",
      featured: false,
      liveLink: "https://finance-dashboard-reactjs.netlify.app/",
      githubLink: "https://github.com/verma2510/finance-dashboard",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=800&q=80",
      impact: "Banking analytics",
      accentShape: { type: "circles", colors: ["#06b6d4", "#67e8f9", "#cffafe"] }
    },
    {
      title: "CogniqEdge",
      role: "Full Stack",
      year: "2024",
      description: "Responsive corporate single-page app with animated service cards and a clean mobile-friendly layout. Features a validated contact form integrated with Nodemailer via a Node.js/Express backend, with frontend deployed on Vercel and backend on Railway.",
      stack: ["React", "Tailwind CSS", "Node.js", "Express", "Nodemailer"],
      category: "Web",
      featured: false,
      liveLink: "https://cogniqedge-react.vercel.app/",
      githubLink: "",
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?fit=crop&w=800&q=80",
      impact: "Full deployment pipeline",
      accentShape: { type: "circles", colors: ["#10b981", "#6ee7b7", "#d1fae5"] }
    }
  ],
  education: [
    {
      degree: "B.E. in Electronics and Telecom. with Honors in AIML",
      institution: "Vivekanand Education Society's Institute of Technology",
      location: "Chembur, Mumbai",
      duration: "2020 - 2024",
      grade: "9.02/10 CGPA",
      highlights: [
        "Secured Runner-Up position in Football Tournament 2024",
        "Cracked JSW Internship 2023",
        "Implemented DNA Classification using ML"
      ]
    },
    {
      degree: "HSC",
      institution: "New Horizon Public School",
      location: "Panvel, Navi Mumbai",
      duration: "2018 - 2020",
      grade: "81.6%",
      highlights: [
        // "",
        "Secured 2nd place in DSO Cricket Tournament 2020",
        "Organized TechFest 2019"
      ]
    },
    {
      degree: "SSC",
      institution: "Shantiniketan Public School",
      location: "Panvel, Navi Mumbai",
      duration: "2017 - 2018",
      grade: "79%",
      highlights: [
        "Won 1st place in Science Exhibition 2016",
        "Secured 3rd place in Football Inter-House Tournament 2017",
        "Secured 2nd place in Chess Tournament 2018"
      ]
    }
  ],
  certifications: [
    {
      name: "JavaScript and React.js Bootcamp",
      issuer: "Google Developer Student Clubs",
      date: "Jan 2023",
      link: "https://www.cert.devtown.in/verify/1VNQpQ",
      icon: "Code"
    },
    {
      name: "Software Engineer Intern",
      issuer: "HackerRank",
      date: "July 2024",
      link: "https://www.hackerrank.com/certificates/b98d8374419d",
      icon: "Code"
    },
    {
      name: "Complete Web Development Course",
      issuer: "Udemy",
      date: "June 2025",
      link: "https://www.udemy.com/certificate/UC-25c9d6fe-56d7-49c6-9dd2-9fdd81f0e3d1/",
      icon: "Code"
    },
    {
      name: "Python for Software Engineering",
      issuer: "Udemy",
      date: "July 2024",
      link: "https://www.udemy.com/certificate/UC-25c9d6fe-56d7-49c6-9dd2-9fdd81f0e3d1/",
      icon: "Code"
    }
  ],
  hobbies: [
    {
      title: "Football",
      description: "Playing weekend leagues with endless stamina.",
      image: "/hobbies/football.jpg",
      link: "https://drive.google.com/file/d/18VqZMFz8nRQllgtcxMx1pXLhKWY39dx_/view"
    },
    {
      title: "Travelling",
      description: "Exploring new places and cultures.",
      image: "/hobbies/travelling.jpg",
      link: "https://drive.google.com/file/d/1Ckl_ipDQy_qBaB4XblZHMvwadPxLRB2k/view"
    },
    {
      title: "Chess",
      description: "Strategic battles on 64 squares.",
      image: "/hobbies/chess.jpg",
      link: "https://drive.google.com/file/d/17IVTC5qKygRrH7S0Lvb2-CCmUpBAdXUN/view",
      zoom: 0.6
    },
    {
      title: "Photography",
      description: "Chasing the golden hour and mastering shadows.",
      image: "/hobbies/photography.jpg",
      link: "https://drive.google.com/file/d/1TxABsa0tbo_HQnpZ7IegslJJXABC5dX0/view"
    },
    {
      title: "Cricket",
      description: "Playing various tournaments with my team.",
      image: "/hobbies/cricket.jpg",
      link: "https://drive.google.com/file/d/1yOUbQi5qxyVt109k_liqhS5qvMDskD8-/view"
    },
    {
      title: "Swimming",
      description: "Swimming for fitness and recreation.",
      image: "/hobbies/swimming.jpg",
      link: "https://drive.google.com/file/d/1mQDlmqb9wEw6z_qKDVaJv9dMNYC3guNF/view"
    }
  ],
  contact: {
    message: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.",
    github: "https://github.com/verma2510",
    linkedin: "https://linkedin.com/in/aman-verma-96802622b",
    twitter: "https://twitter.com/yourusername",
    email: "verma.aman1008@gmail.com"
  }
};
