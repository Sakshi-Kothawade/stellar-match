// Mock data for demonstration purposes

export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  type: string;
  description: string;
  skills: string[];
  responseProb: number;
  matchScore: number;
}

export interface SkillGap {
  skill: string;
  importance: number;
  currentLevel: number;
  targetLevel: number;
  resources: string[];
}

export const mockInternships: Internship[] = [
  {
    id: "1",
    title: "Digital Marketing Intern",
    company: "TechStartup India",
    location: "Remote/Bangalore",
    duration: "3 months",
    stipend: "₹15,000/month",
    type: "Part-time",
    description: "Work on social media campaigns, content creation, and digital analytics. Perfect for beginners in marketing with strong communication skills.",
    skills: ["Social Media", "Content Writing", "Communication"],
    responseProb: 85,
    matchScore: 92
  },
  {
    id: "2", 
    title: "Software Development Intern",
    company: "InnovateTech Solutions",
    location: "Hyderabad",
    duration: "6 months",
    stipend: "₹25,000/month",
    type: "Full-time",
    description: "Join our development team to build web applications using modern technologies. Mentorship provided for coding and project management.",
    skills: ["Programming", "Web Development", "Problem Solving"],
    responseProb: 68,
    matchScore: 75
  },
  {
    id: "3",
    title: "Data Analytics Intern", 
    company: "DataDriven Corp",
    location: "Mumbai",
    duration: "4 months",
    stipend: "₹18,000/month",
    type: "Full-time",
    description: "Analyze business data, create reports, and help with decision-making processes. Great for students with mathematics background.",
    skills: ["Data Analysis", "Excel", "Research"],
    responseProb: 72,
    matchScore: 84
  },
  {
    id: "4",
    title: "Graphic Design Intern",
    company: "Creative Agency Plus",
    location: "Delhi",
    duration: "3 months", 
    stipend: "₹12,000/month",
    type: "Part-time",
    description: "Create visual content for social media, websites, and marketing materials. Portfolio development support included.",
    skills: ["Design", "Creativity", "Software Tools"],
    responseProb: 89,
    matchScore: 88
  },
  {
    id: "5",
    title: "Business Development Intern",
    company: "GrowthCo Enterprises",
    location: "Pune",
    duration: "5 months",
    stipend: "₹20,000/month",
    type: "Full-time",
    description: "Support sales team, conduct market research, and help with client communications. Excellent for building business acumen.",
    skills: ["Sales", "Communication", "Research"],
    responseProb: 76,
    matchScore: 81
  }
];

export const mockSkillGaps: SkillGap[] = [
  {
    skill: "Data Analysis",
    importance: 85,
    currentLevel: 30,
    targetLevel: 80,
    resources: [
      "Excel for Beginners Course",
      "Google Analytics Certification",
      "Statistics Fundamentals"
    ]
  },
  {
    skill: "Digital Marketing",
    importance: 90,
    currentLevel: 40,
    targetLevel: 85,
    resources: [
      "Google Ads Certification",
      "Social Media Marketing Course",
      "Content Marketing Basics"
    ]
  },
  {
    skill: "Project Management",
    importance: 75,
    currentLevel: 20,
    targetLevel: 70,
    resources: [
      "Agile & Scrum Training",
      "Project Planning Tools",
      "Leadership Skills Workshop"
    ]
  },
  {
    skill: "Programming",
    importance: 80,
    currentLevel: 15,
    targetLevel: 75,
    resources: [
      "Python for Beginners",
      "Web Development Bootcamp", 
      "Coding Practice Platform"
    ]
  }
];

export const generateRecommendations = (userData: any): Internship[] => {
  // Simple matching algorithm for demo
  let recommendations = [...mockInternships];
  
  // Sort by match score and response probability
  recommendations.sort((a, b) => {
    const aScore = (a.matchScore + a.responseProb) / 2;
    const bScore = (b.matchScore + b.responseProb) / 2;
    return bScore - aScore;
  });
  
  // Return top 5 recommendations
  return recommendations.slice(0, 5);
};