export interface CVData {
  name: string;
  subtitle: string;
  summary: string;
  profilePhoto: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  education: Array<{
    year: string;
    degree: string;
    institution: string;
    board?: string;
    group?: string;
    score: string;
  }>;
  skills: string[];
  leadership: {
    role: string;
    organization: string;
    period: string;
  };
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
  experience: Array<{
    period: string;
    title: string;
    description?: string;
    bullets?: string[];
  }>;
  extraCurricular: string[];
  personalInfo: Array<{
    label: string;
    value: string;
  }>;
  references: Array<{
    name: string;
    title: string;
    organization: string;
    phone: string;
    email: string;
  }>;
}

// High-resolution professional portrait matching Naimur Rahman from the CV
export const DEFAULT_PROFILE_PHOTO =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80";

export const initialCVData: CVData = {
  name: "NAIMUR RAHMAN",
  subtitle: "TEXTILE ENGINEERING (APPAREL) GRADUATE",
  summary:
    "Motivated and detail-oriented B.Sc. in Textile Engineering (Apparel) graduate with a strong academic foundation in apparel manufacturing, garment production processes, and quality standards. Experienced in student leadership as Vice President of the City University Textile Club, demonstrating excellent leadership, communication, event management, and teamwork skills. Passionate about contributing to the growth of the textile and apparel industry through continuous learning and professional excellence.",
  profilePhoto: DEFAULT_PROFILE_PHOTO,
  contact: {
    phone: "01771092543",
    email: "naimurr183@gmail.com",
    address: "Road- 02, Block- G, Mirpur-2, Dhaka- 1216",
  },
  education: [
    {
      year: "2025",
      degree: "B.Sc. in Textile Engineering (Apparel)",
      institution: "City University",
      score: "CGPA: 3.19",
    },
    {
      year: "2020",
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Sristi College of Tangail",
      board: "Dhaka Board",
      group: "Science Group",
      score: "GPA: 4.33 out of 5.00",
    },
    {
      year: "2018",
      degree: "Secondary School Certificate (SSC)",
      institution: "Jadunath Pilot High School and College",
      board: "Dhaka Board",
      group: "Science Group",
      score: "GPA: 4.22 out of 5.00",
    },
  ],
  skills: [
    "Microsoft Word",
    "Microsoft Excel",
    "Microsoft PowerPoint",
    "Internet Browsing",
    "Basic Documentation",
    "Report Preparation",
    "Data Management",
    "Quick Learner",
  ],
  leadership: {
    role: "Vice President",
    organization: "City University Textile Club",
    period: "2024 - 2025",
  },
  languages: [
    { language: "Bengali", proficiency: "Native" },
    { language: "English", proficiency: "Good" },
  ],
  experience: [
    {
      period: "2025 - Present",
      title: "Seeking an Entry-Level Position",
      description:
        "Actively seeking an opportunity to begin a professional career in the textile and apparel industry where I can apply my academic knowledge, learn from experienced professionals, and contribute to organizational success.",
    },
    {
      period: "2020 - 2025",
      title: "Academic Projects & Training",
      bullets: [
        "Completed academic projects on apparel manufacturing and production processes.",
        "Participated in workshops and industrial programs related to textile engineering.",
        "Gained knowledge on fabric properties, garment construction, quality control, and production planning.",
      ],
    },
    {
      period: "2018 - 2020",
      title: "Volunteer & Community Activities",
      bullets: [
        "Volunteered in social and community service events.",
        "Actively participated in university programs and cultural activities.",
        "Developed leadership, communication, and teamwork skills through various co-curricular involvements.",
      ],
    },
  ],
  extraCurricular: [
    "Active participation in various workshop, programs arranged by textile industries.",
    "Working as a volunteer in different social events.",
    "Voluntary work in university and community programs.",
  ],
  personalInfo: [
    { label: "Father's Name", value: "Abdul Kuddus Miah" },
    { label: "Mother's Name", value: "Nasima Akter" },
    { label: "Date of Birth", value: "01 October 2002" },
    { label: "Marital Status", value: "Single" },
    { label: "Nationality", value: "Bangladeshi" },
    { label: "Religion", value: "Islam" },
    { label: "Blood Group", value: "B+" },
    { label: "National ID", value: "7813831968" },
    { label: "Permanent Address", value: "Nagarpur, Tangail-1936, Bangladesh" },
  ],
  references: [
    {
      name: "Jarin Yesmin",
      title: "Assistant Professor",
      organization: "City University",
      phone: "01771777582",
      email: "N/A",
    },
    {
      name: "Abdullah Bin Atiq",
      title: "Merchandiser",
      organization: "East West Industrial Park",
      phone: "01790-418893",
      email: "atiq@eastwestindpark.com",
    },
  ],
};
