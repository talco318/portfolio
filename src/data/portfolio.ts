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

export interface Skill {
  name: string;
  proficiency: number;
  category: 'technical' | 'soft' | 'tool';
  icon?: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    avatar: string;
    title: string;
    tagline: string;
    email: string;
    phone?: string;
    location: string;
    bio: string;
    // avatar: string;
    socialLinks: {
      github: string;
      linkedin: string;
      twitter?: string;
    };
    interests: string[];
  };
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Tal Cohen",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQH5iPNeEkNbIw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1718234050977?e=1744243200&v=beta&t=u72sdTU_2sL2tG10UhXOMWINI-H1jSLhsOziJRP6wPw",
    title: "Full Stack Developer",
    tagline: "Building elegant solutions to complex problems",
    email: "talcohen318@gmail.com",
    location: "Israel",
    bio: "Software Developer with a B.Sc. in Computer Science, specializing in Python development, Linux-based environments, and\n" +
        "scalable infrastructure. Proficient in automating workflows, optimizing backend systems, and collaborating on data-driven\n" +
        "projects. Skilled in designing efficient solutions for real-time systems and leveraging cutting-edge technologies to deliver\n" +
        "high-impact results. Passionate about contributing to the AI-driven revolution through innovative software development.",
    socialLinks: {
      github: "https://github.com/talco318",
      linkedin: "https://www.linkedin.com/in/talco318/",

    },
    interests: ["Open Source", "AI/ML", "Cloud Architecture", "Tech Mentoring"]
  },
  skills: [
    { name: "Python", proficiency: 90, category: "technical" },
    { name: "C++", proficiency: 70, category: "technical" },
    { name: "Java", proficiency: 70, category: "technical" },
    { name: "C#", proficiency: 70, category: "technical" },
    { name: "React", proficiency: 90, category: "technical" },
    { name: "TypeScript", proficiency: 85, category: "technical" },
    { name: "JavaScript", proficiency: 85, category: "technical" },
    { name: "Node.js", proficiency: 88, category: "technical" },
    { name: "AWS", proficiency: 75, category: "technical" },
    { name: "Problem Solving", proficiency: 95, category: "soft" },
    { name: "Communication", proficiency: 90, category: "soft" },
    { name: "SQL", proficiency: 85, category: "tool" },
    { name: "MongoDB", proficiency: 85, category: "tool" },
    { name: "Git", proficiency: 92, category: "tool" },
    { name: "Linux", proficiency: 90, category: "tool" }
  ],
  projects: [
    {
      id: "1",
      title: "Yad2 Apartment Finder Bot",
      description: "- Developed a Python bot for real-time apartment tracking with automated data retrieval and user notifications.\n" +
          "- Designed scalable data pipelines using MongoDB to handle concurrent processing.",
      technologies: ["Python", "MongoDB", "Telegram API"],
      image: "https://lh3.googleusercontent.com/d/1nb5RBI6Wmo1pfr2yFswFDeY1D0ONuYPE",
      githubUrl: "https://github.com/talco318/yad2-bot",
      category: "Automation"
    },
    {
      id: "2",
      title: "Mentor-Mentee Online Collaborative Coding: React Frontend",
      description: "- Built a dynamic UI with real-time collaboration features using React and TypeScript." +
          "- Enhanced system performance by optimizing component-based architecture and API integration." +
          "- Ensured responsive design for seamless interaction across device.",
      technologies: ["React", "Node.JS", "TypeScript"],
      image: "https://lh3.googleusercontent.com/d/1BphxwbLAQOFYwCoLvysudJVFd3Fgaiue",
      liveUrl: "https://codefed.onrender.com/",
      githubUrl: "https://github.com/talco318/Code-Environment",
      category: "AI/ML"
    },
    {
      id: "3",
      title: "this is a test",
      description: "- Built a dynamic UI with real-time collaboration features using React and TypeScript." +
          "- Enhanced system performance by optimizing component-based architecture and API integration." +
          "- Ensured responsive design for seamless interaction across device.",
      technologies: ["React", "Node.JS", "TypeScript"],
      image: "https://lh3.googleusercontent.com/d/1BphxwbLAQOFYwCoLvysudJVFd3Fgaiue",
      liveUrl: "https://codefed.onrender.com/",
      githubUrl: "https://github.com/talco318/Code-Environment",
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
  ]
};