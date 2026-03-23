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
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQFu2_H_jwtH6A/profile-displayphoto-crop_800_800/B4DZ0cOHTXGUAI-/0/1774294967966?e=1775692800&v=beta&t=bGZ3YZzEFlJDX8nBsTXHTtcJ32dJUKn-QauuzFu-iFw",
    title: "Full Stack Developer",
    tagline: "Building elegant solutions to complex problems",
    heroTexts: [
      "Building scalable web applications 🚀",
      "Passionate about clean code ✨",
      "Always learning, always growing 💡",
      "B.Sc. in Computer Science 🎓"
    ],
    email: "talcohen318@gmail.com",
    location: "Israel",
    locationDetail: "Remote-first mindset",
    githubUsername: "talco318",
    backgroundImage: "https://lh3.googleusercontent.com/d/1_Geshyn3WEDM7U9UnDuDZYbUhngvysLj",
    bio: "Software Developer with a B.Sc. in Computer Science, specializing in Python development, Linux-based environments, and scalable infrastructure. Proficient in automating workflows, optimizing backend systems, and collaborating on data-driven projects. Skilled in designing efficient solutions for real-time systems and leveraging cutting-edge technologies to deliver high-impact results. Passionate about contributing to the AI-driven revolution through innovative software development.",
    socialLinks: {
      github: "https://github.com/talco318",
      linkedin: "https://www.linkedin.com/in/talco318/",
    },
    interests: ["Open Source", "AI/ML", "Cloud Architecture", "Tech Mentoring"]
  },
  skills: [
    { name: "Python", proficiency: 95, category: "technical", group: "Programming" },
    { name: "C++", proficiency: 70, category: "technical", group: "Programming" },
    { name: "Java", proficiency: 70, category: "technical", group: "Programming" },
    { name: "C#", proficiency: 70, category: "technical", group: "Programming" },
    { name: "C", proficiency: 70, category: "technical", group: "Programming" },
    { name: "JavaScript", proficiency: 85, category: "technical", group: "Programming" },
    { name: "TypeScript", proficiency: 85, category: "technical", group: "Programming" },

    { name: "React", proficiency: 92, category: "technical", group: "Web Dev" },
    { name: "Node.js", proficiency: 88, category: "technical", group: "Web Dev" },
    { name: "HTML", proficiency: 95, category: "technical", group: "Web Dev" },
    { name: "CSS", proficiency: 90, category: "technical", group: "Web Dev" },
    { name: "Tailwind", proficiency: 85, category: "technical", group: "Web Dev" },

    { name: "SQL", proficiency: 88, category: "tool", group: "Databases" },
    { name: "MySQL", proficiency: 85, category: "tool", group: "Databases" },
    { name: "MongoDB", proficiency: 85, category: "tool", group: "Databases" },
    { name: "MS SQL Server", proficiency: 80, category: "tool", group: "Databases" },

    { name: "AWS", proficiency: 75, category: "tool", group: "Cloud" },
    { name: "GCP", proficiency: 75, category: "tool", group: "Cloud" },
    { name: "Linux (Bash)", proficiency: 90, category: "tool", group: "Cloud" },
    { name: "Firebase", proficiency: 82, category: "tool", group: "Cloud" },

    { name: "Generative AI", proficiency: 85, category: "technical", group: "Tools & AI" },
    { name: "Git", proficiency: 92, category: "tool", group: "Tools & AI" },
    { name: "RESTful APIs", proficiency: 90, category: "technical", group: "Tools & AI" },
    { name: "Selenium", proficiency: 75, category: "tool", group: "Tools & AI" },
    { name: "Postman", proficiency: 85, category: "tool", group: "Tools & AI" },

    { name: "Hebrew (Native)", proficiency: 100, category: "soft", group: "Languages" },
    { name: "English (Fluent)", proficiency: 95, category: "soft", group: "Languages" }
  ],
  projects: [
    {
      id: "1",
      title: "Yad2 Apartment Finder Bot",
      description: "- Developed a Python bot for real-time apartment tracking with automated data retrieval and user notifications.\n" +
        "- Designed scalable data pipelines using MongoDB to handle concurrent processing.",
      technologies: ["Python", "MongoDB", "Telegram API"],
      image: "https://lh3.googleusercontent.com/d/1nb5RBI6Wmo1pfr2yFswFDeY1D0ONuYPE=s800",
      githubUrl: "https://github.com/talco318/yad2-bot",
      category: "Automation"
    },
    {
      id: "2",
      title: "Mentor-Mentee Online Collaborative Coding: React Frontend",
      description: "- Built a dynamic UI with real-time collaboration features using React and TypeScript.\n" +
        "- Enhanced system performance by optimizing component-based architecture and API integration.\n" +
        "- Ensured responsive design for seamless interaction across device.",
      technologies: ["React", "Node.JS", "TypeScript"],
      image: "https://lh3.googleusercontent.com/d/1BphxwbLAQOFYwCoLvysudJVFd3Fgaiue=s800",
      liveUrl: "https://codefed.onrender.com/",
      githubUrl: "https://github.com/talco318/Code-Environment",
      category: "AI/ML"
    },
    {
      id: "3",
      title: "Tomorrowland Festival LineUp vs Spotify playlist bot",
      description: "- Developed a personalized music recommendation system with Spotify API, Telegram Bot API, and JSON database.\n" +
        "- Cross-referenced Spotify playlist artists with Tomorrowland Festival lineup.",
      technologies: ["Python", "Spotify API", "Google AI Studio API"],
      image: "https://lh3.googleusercontent.com/d/103C0arvOTdomwkmoG3tCI5m0XRAAYY4t=s800",
      githubUrl: "https://github.com/talco318/LineUp_vs_spotify_bot",
      category: "AI/ML"
    },
    {
      id: "4",
      title: "ParkHere Bot",
      description: "- Developed a Telegram Bot for parking detection using Python and the YOLOv5 computer vision algorithm.\n" +
        "- Integrated Firebase for data storage and Google Maps API for real-time navigation to enhance parking search efficiency.",
      technologies: ["Python", "YOLOv5 (Computer vision)",],
      image: "https://lh3.googleusercontent.com/d/1TL7nPjQNMnlR9pSUtd5aJKRYuVfimc1B=s800",
      githubUrl: "https://github.com/talco318/ParkHere_FinalProject",
      category: "AI/ML"
    }
  ],
  experience: [
    {
      id: "1",
      company: "SAS Israel",
      position: "Python Developer with SAS Infrastructure Expertise",
      startDate: "2023-02",
      endDate: "Present",
      description: "Automated Linux infrastructure using Python and Bash, boosting system efficiency by 20%. Developed REST APIs and configured Linux servers with bash scripting for seamless integration within a distributed, real-time microservices architecture.",
      achievements: [
        "Automated infrastructure processes using Python and Bash in Linux environments, increasing system efficiency by 20%.",
        "Designed and deployed REST APIs, handling JSON data for seamless communication in a scalable microservices architecture.",
        "Configured infrastructure on Linux servers, including bash scripting for automation and system maintenance, to ensure seamless integration with distributed systems and real-time communication."
      ]
    },
    {
      id: "2",
      company: "Self-employed",
      position: "Technical Account Manager",
      startDate: "2020-05",
      endDate: "2023-02",
      description: "Built and maintained responsive web applications, designed and deployed automation scripts and integrated multiple APIs.",
      achievements: [
        "Built and maintained responsive web applications using React (TypeScript and JavaScript), including JSON data handling.",
        "Designed and deployed automation scripts in Python to streamline backend processes and data management.",
        "Integrated over 10 third-party and RESTful APIs to enhance system functionality and user engagement.",
        "Enhanced system stability through troubleshooting and performance optimizations."
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