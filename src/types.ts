export interface CV {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  location: string; // Cambodia locations like Phnom Penh, Siem Reap, etc.
  about: string;
  education: Array<{
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    description?: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  skills: string[];
  languages: Array<{
    name: string;
    level: 'Native' | 'Fluent' | 'Intermediate' | 'Basic';
  }>;
  createdAt?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  logoUrl?: string;
  location: string; // Phnom Penh, Siem Reap, Sihanoukville, Battambang, Kampot, etc.
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  category: string; // IT & Software, Banking & Finance, Marketing, NGO & Development, Hospitality, Admin
  salary: string; // e.g. "$400 - $800 / Month", "Negotiable"
  postedDate: string;
  description: string;
  requirements: string[];
  benefits: string[];
  sourceUrl: string;
  sourceName: 'BongThom' | 'CamHR' | 'Pelprek' | 'LinkedIn Cambodia' | 'Anakut Job' | 'Other';
  contactEmail: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: 'Draft' | 'Applied' | 'Reviewing' | 'Interview' | 'Accepted' | 'Declined';
  appliedDate: string;
}
