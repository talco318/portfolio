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
    title: string;
    tagline: string;
    email: string;
    phone?: string;
    location: string;
    bio: string;
    avatar: string;
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
    title: "Full Stack Developer",
    tagline: "Building elegant solutions to complex problems",
    email: "talcohen318@example.com",
    location: "Israel",
    bio: "Software Developer with a B.Sc. in Computer Science, specializing in Python development, Linux-based environments, and\n" +
        "scalable infrastructure. Procient in automating workows, optimizing backend systems, and collaborating on data-driven\n" +
        "projects. Skilled in designing ecient solutions for real-time systems and leveraging cutting-edge technologies to deliver\n" +
        "high-impact results. Passionate about contributing to the AI-driven revolution through innovative software development.",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQH5iPNeEkNbIw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1718234050977?e=1743638400&v=beta&t=pV3P0AtcVhkOe36o6FSKFm-wpkyf47K1eXYO_ak9zlg",
    socialLinks: {
      github: "https://github.com/talco318",
      linkedin: "https://www.linkedin.com/in/talco318/",

    },
    interests: ["Open Source", "AI/ML", "Cloud Architecture", "Tech Mentoring"]
  },
  skills: [
    { name: "React", proficiency: 90, category: "technical" },
    { name: "TypeScript", proficiency: 85, category: "technical" },
    { name: "Node.js", proficiency: 88, category: "technical" },
    { name: "AWS", proficiency: 75, category: "technical" },
    { name: "Problem Solving", proficiency: 95, category: "soft" },
    { name: "Communication", proficiency: 90, category: "soft" },
    { name: "Docker", proficiency: 80, category: "tool" },
    { name: "Git", proficiency: 92, category: "tool" }
  ],
  projects: [
    {
      id: "1",
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory management",
      technologies: ["React", "Node.js", "MongoDB", "Redux"],
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "Full Stack"
    },
    {
      id: "2",
      title: "Mentor-Mentee Online Collaborative Coding: React Frontend",
      description: "- Built a dynamic UI with real-time collaboration features using React and TypeScript." +
          "- Enhanced system performance by optimizing component-based architecture and API integration." +
          "- Ensured responsive design for seamless interaction across device.",
      technologies: ["React", "Node.JS", "TypeScript"],
      image: "https://private-user-images.githubusercontent.com/12784722/306246175-cab56570-5c89-4281-a070-1f54ffe37c60.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzgxNDU4NjQsIm5iZiI6MTczODE0NTU2NCwicGF0aCI6Ii8xMjc4NDcyMi8zMDYyNDYxNzUtY2FiNTY1NzAtNWM4OS00MjgxLWEwNzAtMWY1NGZmZTM3YzYwLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAxMjklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMTI5VDEwMTI0NFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTEyMzRjZjI5NzA5OWFjNmM5NzUwNWNhNDBhM2Q0Nzg3ZDNkYWQxMDA2Y2QyZjljM2Q1Y2M2OTI2N2ZhMWE5Y2ImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.odFplGELeN-pSp5eezT9mRr-bJPsBTZB8HHmseW-wPY",
      liveUrl: "https://codefed.onrender.com/",
      githubUrl: "https://github.com/talco318/Code-Environment",
      category: "AI/ML"
    }
  ],
  experience: [
    {
      id: "1",
      company: "Tech Innovators Inc.",
      position: "Senior Full Stack Developer",
      startDate: "2020-01",
      endDate: "Present",
      description: "Lead developer for enterprise-scale web applications",
      achievements: [
        "Reduced application load time by 40%",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
        "Mentored junior developers and led technical training sessions"
      ]
    },
    {
      id: "2",
      company: "Digital Solutions Ltd.",
      position: "Full Stack Developer",
      startDate: "2018-03",
      endDate: "2019-12",
      description: "Developed and maintained multiple client projects",
      achievements: [
        "Successfully delivered 15+ client projects",
        "Implemented automated testing reducing bugs by 30%",
        "Optimized database queries improving performance by 50%"
      ]
    }
  ]
};