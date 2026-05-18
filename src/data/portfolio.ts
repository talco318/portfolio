export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  category: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

export interface Education {
  degree: string;
  school: string;
  years: string;
  coursework?: string[];
}

export interface Skill {
  name: string;
  proficiency: number;
  category: 'technical' | 'soft' | 'tool';
  group?: string;
  icon?: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    avatar: string;
    title: string;
    tagline: string;
    heroTexts: string[];
    email: string;
    location: string;
    locationDetail: string;
    githubUsername: string;
    backgroundImage: string;
    socialLinks: {
      github: string;
      linkedin: string;
      twitter?: string;
    };
    interests: string[];
    bio: string;
  };
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Tal Cohen",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQFu2_H_jwtH6A/profile-displayphoto-crop_200_200/B4DZ0cOHTXGUAI-/0/1774294967966?e=1775692800&v=beta&t=bGZ3YZzEFlJDX8nBsTXHTtcJ32dJUKn-QauuzFu-iFw",
    title: "Full Stack Developer",
    tagline: "Architecting scalable web applications and AI-driven solutions.",
    heroTexts: [
      "Engineering robust .NET & Python backends",
      "Building dynamic Angular & React interfaces",
      "Integrating cutting-edge AI technologies",
      "B.Sc. in Computer Science"
    ],
    email: "talcohen318@gmail.com",
    location: "Israel",
    locationDetail: "Remote-first mindset",
    githubUsername: "talco318",
    backgroundImage: "https://lh3.googleusercontent.com/d/1_Geshyn3WEDM7U9UnDuDZYbUhngvysLj",
    bio: "I am a Full Stack Developer specializing in building end-to-end digital products using a modern tech stack encompassing Python, .NET (C#), Angular, and React. With a deep passion for Generative AI and automation, I architect intelligent solutions that solve complex business problems. Whether it's designing scalable microservices, developing seamless user interfaces, or integrating advanced AI APIs, I thrive on delivering high-impact, performant, and clean code.",
    socialLinks: {
      github: "https://github.com/talco318",
      linkedin: "https://www.linkedin.com/in/talco318/",
    },
    interests: ["Artificial Intelligence", "System Architecture", "Open Source", "Tech Mentoring"]
  },
  skills: [
    { name: "Python", proficiency: 95, category: "technical", group: "Backend" },
    { name: "C# / .NET", proficiency: 90, category: "technical", group: "Backend" },
    { name: "Node.js", proficiency: 88, category: "technical", group: "Backend" },

    { name: "TypeScript", proficiency: 90, category: "technical", group: "Frontend" },
    { name: "Angular", proficiency: 88, category: "technical", group: "Frontend" },
    { name: "React", proficiency: 92, category: "technical", group: "Frontend" },
    { name: "Tailwind CSS", proficiency: 85, category: "technical", group: "Frontend" },

    { name: "Generative AI API", proficiency: 96, category: "technical", group: "AI & Tools" },
    { name: "Automation & Scripting", proficiency: 95, category: "technical", group: "AI & Tools" },
    { name: "RESTful APIs", proficiency: 90, category: "technical", group: "AI & Tools" },
    { name: "Git", proficiency: 92, category: "tool", group: "AI & Tools" },

    { name: "SQL Server", proficiency: 85, category: "tool", group: "Databases & Cloud" },
    { name: "MongoDB", proficiency: 85, category: "tool", group: "Databases & Cloud" },
    { name: "Linux", proficiency: 90, category: "tool", group: "Databases & Cloud" },
    { name: "AWS / GCP", proficiency: 75, category: "tool", group: "Databases & Cloud" },

    { name: "Hebrew (Native)", proficiency: 100, category: "soft", group: "Languages" },
    { name: "English (Fluent)", proficiency: 95, category: "soft", group: "Languages" }
  ],
  projects: [
    {
      id: "1",
      title: "Yad2 Apartment Finder Bot",
      description: "Engineered an automated Python bot for real-time apartment tracking with instant user notifications. Designed scalable data pipelines using MongoDB to handle concurrent processing, effectively reducing manual apartment search time to zero.",
      technologies: ["Python", "MongoDB", "Telegram API", "Automation"],
      image: "https://lh3.googleusercontent.com/d/1nb5RBI6Wmo1pfr2yFswFDeY1D0ONuYPE=s800",
      githubUrl: "https://github.com/talco318/yad2-bot",
      category: "Automation"
    },
    {
      id: "2",
      title: "Collaborative Coding Environment",
      description: "Built a dynamic, real-time collaborative coding platform using React and TypeScript. Architected a highly optimized, component-based UI that ensures seamless, responsive interactions across all devices for mentors and mentees.",
      technologies: ["React", "Node.js", "TypeScript", "WebSockets"],
      image: "https://lh3.googleusercontent.com/d/1BphxwbLAQOFYwCoLvysudJVFd3Fgaiue=s800",
      liveUrl: "https://codefed.onrender.com/",
      githubUrl: "https://github.com/talco318/Code-Environment",
      category: "Full Stack"
    },
    {
      id: "3",
      title: "AI-Powered Festival Lineup Bot",
      description: "Developed an intelligent music recommendation system integrating the Spotify API with Google AI Studio (LLM). The bot processes JSON databases to cross-reference festival lineups with user playlists, delivering highly personalized schedules.",
      technologies: ["Python", "Spotify API", "Google AI Studio", "Generative AI"],
      image: "https://lh3.googleusercontent.com/d/103C0arvOTdomwkmoG3tCI5m0XRAAYY4t=s800",
      githubUrl: "https://github.com/talco318/LineUp_vs_spotify_bot",
      category: "AI/ML"
    },
    {
      id: "4",
      title: "ParkHere: Computer Vision Assistant",
      description: "Created a smart Telegram Bot for real-time parking detection utilizing Python and the YOLOv5 computer vision algorithm. Integrated Firebase for cloud storage and Google Maps API to provide live navigation directly to available spots.",
      technologies: ["Python", "YOLOv5", "Firebase", "Computer Vision"],
      image: "https://lh3.googleusercontent.com/d/1TL7nPjQNMnlR9pSUtd5aJKRYuVfimc1B=s800",
      githubUrl: "https://github.com/talco318/ParkHere_FinalProject",
      category: "AI/ML"
    }
  ],
  experience: [
    {
      id: "0",
      company: "Software AG",
      position: "Full Stack Developer",
      startDate: "2026-04",
      endDate: "Present",
      description: "Developing robust full-stack applications and maintaining scalable enterprise solutions using modern web frameworks.",
      achievements: [
        "Engineering high-performance enterprise applications focusing on seamless frontend-to-backend integration using modern web technologies.",
        "Collaborating with cross-functional teams to design, build, and deploy scalable digital solutions.",
        "Leveraging AI tools and advanced architectural patterns to accelerate development cycles and enhance overall code quality."
      ]
    },
    {
      id: "1",
      company: "SAS ISRAEL",
      position: "SAS Infrastructure & Software Developer",
      startDate: "2023-03",
      endDate: "2026-05",
      description: "Engineered mission-critical automated systems, developed robust RESTful APIs, and optimized Linux server environments for enterprise microservices.",
      achievements: [
        "End-to-End Automation: Engineered a mission-critical automated system for complex data Export/Import processes using Python and SAS internal services, reducing manual labor by 70%.",
        "API Development: Developed and maintained RESTful APIs to orchestrate services across hybrid infrastructures, ensuring high availability and seamless data flow.",
        "Automated critical infrastructure pipelines using Python and Bash, driving a 20% increase in overall system efficiency.",
        "Monitoring & Observability: Built internal dashboards and logging pipelines, achieving a 30% reduction in incident resolution time.",
        "Maintained and optimized Linux server environments to ensure zero-downtime integration for enterprise microservices."
      ]
    },
    {
      id: "2",
      company: "Freelance",
      position: "Full Stack Developer & Consultant",
      startDate: "2020-02",
      endDate: "2023-02",
      description: "Delivered end-to-end web applications and automation solutions for various clients, leveraging modern frontend frameworks and robust backends.",
      achievements: [
        "Developed and shipped responsive web applications React, and TypeScript, focusing on intuitive UX and fast load times.",
        "Engineered scalable backend solutions and automation scripts in Python to streamline complex data workflows.",
        "Integrated advanced third-party APIs - including early Generative AI integrations - to drastically enhance system capabilities and user engagement.",
        "Conducted deep performance profiling and troubleshooting, significantly improving application stability for client products."
      ]
    }
  ],
  education: [
    {
      degree: "B.Sc. in Computer Science",
      school: "Afeka College of Engineering",
      years: "2019 — 2022",
      coursework: ["Data Structures", "Algorithms", "Operating Systems", "Computer Vision", "Web Development"]
    }
  ]
};