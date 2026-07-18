import { Job } from '../types';

export const initialJobs: Job[] = [
  {
    id: "job-001",
    title: "Junior Full-Stack Web Developer",
    company: "Pathmazing Inc.",
    location: "Phnom Penh (Tuol Kork Area), Cambodia",
    type: "Full-time",
    category: "IT & Software",
    salary: "$450 - $750 / Month",
    postedDate: "2026-06-30",
    description: "Join Cambodia's leading software development house. You will be working on modern web applications utilizing React, Node.js, and Postgres, serving local and international enterprise clients.",
    requirements: [
      "Bachelor's degree in Computer Science or equivalent practical experience.",
      "6+ months of experience with modern Javascript frameworks (React, Vue, or Angular).",
      "Familiarity with Node.js and Express backend structures.",
      "Basic understanding of SQL databases (PostgreSQL or MySQL).",
      "Good team communication in Khmer and Intermediate English."
    ],
    benefits: [
      "Competitive salary with 13th-month bonus",
      "NSSF & Medical Health Insurance Coverage",
      "Weekly team sports and team building events",
      "Opportunity for accelerated career growth"
    ],
    sourceUrl: "https://www.camhr.com/jobs/pathmazing-junior-developer",
    sourceName: "CamHR",
    contactEmail: "hr@pathmazing.com"
  },
  {
    id: "job-002",
    title: "Mobile App Development Intern (Flutter/iOS/Android)",
    company: "Sabaicode Tech Academy",
    location: "Phnom Penh (BKK1), Cambodia",
    type: "Internship",
    category: "IT & Software",
    salary: "$150 - $250 / Month",
    postedDate: "2026-07-01",
    description: "Are you a passionate coding enthusiast eager to build native mobile experiences? Sabaicode is offering a 3-month paid internship with dedicated mentoring to build next-generation educational systems in Cambodia.",
    requirements: [
      "Completed or currently pursuing a degree in Software Engineering.",
      "Understands basic concepts of OOP (Object-Oriented Programming).",
      "Created at least one small personal project using Flutter, Swift, or Kotlin.",
      "Highly self-motivated and eager to learn new technologies under senior developer supervision.",
      "Available for at least 30 hours per week."
    ],
    benefits: [
      "Direct guidance from senior industry engineers",
      "Co-working space membership in BKK1",
      "Potential of full-time job offer post-internship",
      "Free access to all Sabaicode premium courses"
    ],
    sourceUrl: "https://www.bongthom.com/jobs/sabaicode-flutter-intern",
    sourceName: "BongThom",
    contactEmail: "careers@sabaicode.com"
  },
  {
    id: "job-003",
    title: "Digital Marketing Specialist",
    company: "Brown Coffee and Bakery",
    location: "Phnom Penh (Boeung Keng Kang), Cambodia",
    type: "Full-time",
    category: "Marketing",
    salary: "$500 - $800 / Month",
    postedDate: "2026-07-02",
    description: "Tell the story of Cambodia's favorite homegrown coffee brand. You will design, execute, and monitor digital campaigns across Facebook, Telegram, TikTok, and Instagram to engage our loyal customer base.",
    requirements: [
      "At least 1-2 years of digital marketing or content creation experience in Cambodia.",
      "Strong copywriting skills in both Khmer and English.",
      "Experience with Facebook Business Manager, Ads Manager, and Telegram channels.",
      "Basic graphic design skills (Canva or Photoshop) is a major advantage.",
      "Passionate about coffee culture and local food trends."
    ],
    benefits: [
      "Unlimited free coffee during working hours",
      "20% employee discount across all Brown Coffee outlets",
      "Annual performance-based bonus",
      "Friendly, vibrant, and highly collaborative workspace"
    ],
    sourceUrl: "https://www.pelprek.com/jobs/brown-coffee-marketing",
    sourceName: "Pelprek",
    contactEmail: "hr@browncoffee.com.kh"
  },
  {
    id: "job-004",
    title: "Customer Relationship Officer",
    company: "ABA Bank",
    location: "Siem Reap City, Cambodia",
    type: "Full-time",
    category: "Banking & Finance",
    salary: "$400 - $650 / Month",
    postedDate: "2026-06-28",
    description: "Provide exceptional banking solutions to individual and commercial clients at Canada's National Bank of Canada subsidiary, ABA Bank. You will manage customer portfolios, consult on loans and deposits, and onboarding customers to the award-winning ABA Mobile app.",
    requirements: [
      "Bachelor's degree in Banking, Finance, Business, or related fields.",
      "Excellent communication and interpersonal skills in Khmer.",
      "Good command of English (Chinese language skills is a plus due to Siem Reap tourism/business).",
      "Basic numerical ability and high level of detail orientation.",
      "Proficiency in Microsoft Office suite."
    ],
    benefits: [
      "Twice yearly performance bonuses",
      "Comprehensive global medical and accident insurance",
      "Extensive training programs at ABA Academy",
      "Relocation support or housing allowance options"
    ],
    sourceUrl: "https://www.bongthom.com/jobs/aba-bank-customer-officer-sr",
    sourceName: "BongThom",
    contactEmail: "recruitment.sr@ababank.com"
  },
  {
    id: "job-005",
    title: "Information Technology (IT) Intern",
    company: "ACLEDA Bank Plc.",
    location: "Phnom Penh (Headquarters), Cambodia",
    type: "Internship",
    category: "Banking & Finance",
    salary: "$120 - $200 / Month",
    postedDate: "2026-07-02",
    description: "Gain hands-on banking systems experience with ACLEDA Bank, the largest branch network in Cambodia. Assist our Core Banking support team with server maintenance, workstation setup, and terminal security configurations.",
    requirements: [
      "Year 3 or Year 4 university student in IT, Computer Science, or Network Engineering.",
      "Basic knowledge of TCP/IP networking, routing, and Windows Server environments.",
      "Understanding of cybersecurity principles.",
      "Strong ethics and confidentiality mindset required for financial institutions.",
      "Willingness to learn and take shifts when needed."
    ],
    benefits: [
      "Official ACLEDA internship certificate upon completion",
      "Paid monthly stipend",
      "Direct pathway to ACLEDA permanent recruitment test",
      "Hands-on practice with enterprise core banking systems"
    ],
    sourceUrl: "https://www.camhr.com/jobs/acleda-bank-it-intern",
    sourceName: "CamHR",
    contactEmail: "internship@acledabank.com.kh"
  },
  {
    id: "job-006",
    title: "Project Coordinator (Education Support Program)",
    company: "World Vision International Cambodia",
    location: "Battambang Province, Cambodia",
    type: "Full-time",
    category: "NGO & Development",
    salary: "$600 - $900 / Month",
    postedDate: "2026-06-25",
    description: "Support child literacy and local school partnerships in Battambang province. You will plan and coordinate field visits, manage book distributions, and host community training for parents and educators.",
    requirements: [
      "Degree in Social Work, Education, Development Studies, or similar.",
      "Minimum of 1 year of experience working in community development or NGO environments.",
      "Willingness to travel to rural communities on a motorbike.",
      "Native Khmer speaker with high-proficiency written/spoken English.",
      "Strong report writing and budget planning skills."
    ],
    benefits: [
      "13th-month salary & annual performance salary reviews",
      "NGO staff insurance (Provident Fund & Accident Protection)",
      "Motorcycle allowance & fuel support for field travel",
      "Regular personal and professional leadership training"
    ],
    sourceUrl: "https://www.bongthom.com/jobs/worldvision-coordinator-battambang",
    sourceName: "BongThom",
    contactEmail: "job_cambodia@wvi.org"
  },
  {
    id: "job-007",
    title: "F&B Supervisor",
    company: "Rosewood Phnom Penh",
    location: "Phnom Penh (Vattanac Capital), Cambodia",
    type: "Full-time",
    category: "Hospitality",
    salary: "$450 - $650 / Month",
    postedDate: "2026-06-29",
    description: "Oversee operations at Rosewood's ultra-luxury food and beverage outlets. Guide service crews, manage inventory, and deliver a standard of hospitality that defines Cambodia's premier luxury sky-bar and restaurants.",
    requirements: [
      "At least 2 years of experience in luxury hospitality or fine dining F&B management.",
      "Excellent customer greeting and communication skills.",
      "Fluent English. Ability to speak Chinese or French is a strong asset.",
      "Familiarity with POS systems and inventory management tools.",
      "Warm personality and leadership traits."
    ],
    benefits: [
      "Full service charge allocation (average $150-$250 additional per month)",
      "Uniform dry-cleaning and duty meals",
      "Worldwide hotel stay discounts within Rosewood Hotel Group",
      "Continuous premium international standard hospitality coaching"
    ],
    sourceUrl: "https://www.pelprek.com/jobs/rosewood-fb-supervisor",
    sourceName: "Pelprek",
    contactEmail: "phnompenh.careers@rosewoodhotels.com"
  },
  {
    id: "job-008",
    title: "Junior Software QA Engineer",
    company: "Smart Axiata Co., Ltd.",
    location: "Phnom Penh (Monivong Blvd), Cambodia",
    type: "Full-time",
    category: "IT & Software",
    salary: "$400 - $600 / Month",
    postedDate: "2026-07-02",
    description: "Participate in testing next-generation mobile applications, subscriber portals, and billing systems for Cambodia's leading telecom provider. Assist in setting up test cases, executing manually, and drafting automation logs.",
    requirements: [
      "Degree in IT, Computer Science, or Management Information Systems.",
      "Basic knowledge of QA testing methodologies, bug tracking (Jira), and SDLC.",
      "Good logic and high precision when hunting down application edge cases.",
      "Bilingual in Khmer and conversational English for system documentation."
    ],
    benefits: [
      "Free high-speed Smart subscriber package and phone allowance",
      "Standard NSSF health coverage and private accident protection plan",
      "Continuous tech certification support (ISTQB study sponsorship)",
      "Excellent office environment featuring gym and recreation zones"
    ],
    sourceUrl: "https://www.bongthom.com/jobs/smart-qa-engineer",
    sourceName: "BongThom",
    contactEmail: "careers@smart.com.kh"
  },
  {
    id: "job-009",
    title: "Bilingual Administrative Assistant",
    company: "Chip Mong Group",
    location: "Phnom Penh (Sen Sok District), Cambodia",
    type: "Full-time",
    category: "Admin",
    salary: "$350 - $550 / Month",
    postedDate: "2026-07-03",
    description: "Provide administrative support to Chip Mong Land corporate division. Organize calendar bookings, draft official bimonthly business reports in Khmer and English, coordinate meeting rooms, and assist senior management teams.",
    requirements: [
      "Bachelor's degree in Business Administration, Management, or related field.",
      "Excellent written translation capability between English and Khmer.",
      "Highly proficient with MS Word, Excel, PowerPoint, and online calendars.",
      "Professional demeanor, active learner, and highly organized."
    ],
    benefits: [
      "Thirteen-month base salary and performance metrics bonus",
      "Career growth path into executive coordinator or project administrator",
      "Corporate insurance plan and paid annual leave days",
      "Internal leadership development workshops"
    ],
    sourceUrl: "https://www.camhr.com/jobs/chip-mong-admin-assistant",
    sourceName: "CamHR",
    contactEmail: "recruitment@chipmong.com"
  },
  {
    id: "job-010",
    title: "Microfinance Loan Officer",
    company: "Amret Microfinance Institution",
    location: "Kandal Province (Ta Khmau City), Cambodia",
    type: "Full-time",
    category: "Banking & Finance",
    salary: "$300 - $480 / Month",
    postedDate: "2026-07-01",
    description: "Promote and manage small business micro-loans across the Kandal province. Visit local entrepreneurs, evaluate loan requests, audit collateral, and ensure on-time monthly payment reconciliation.",
    requirements: [
      "Degree in Banking, Economics, Finance, or equivalent practical background.",
      "Honest, highly outgoing personality, and good at building community trust.",
      "Must have a valid driving license and own a reliable motorcycle.",
      "Clear credit record and high ethical standards."
    ],
    benefits: [
      "Substantial monthly loan portfolio commission & fuel allowances",
      "Free motorcycle maintenance and safety helmet",
      "Fully covered NSSF card and private medical insurance",
      "Annual employee health screening"
    ],
    sourceUrl: "https://www.bongthom.com/jobs/amret-loan-officer-kandal",
    sourceName: "BongThom",
    contactEmail: "jobs@amret.com.kh"
  },
  {
    id: "job-011",
    title: "Digital Content Creator Intern",
    company: "foodpanda Cambodia",
    location: "Phnom Penh (Tuol Tom Poung), Cambodia",
    type: "Internship",
    category: "Marketing",
    salary: "$180 - $250 / Month",
    postedDate: "2026-07-03",
    description: "Learn digital campaign management under a global brand. Create highly engaging video contents for foodpanda TikTok, design local lifestyle graphics, and draft bilingual social captions.",
    requirements: [
      "Enthusiastic university student in Marketing, Media, or design fields.",
      "Familiar with video editing apps (CapCut, Premiere, or phone-based editors).",
      "Creative mindset, active on social trends, and loves trying new foods.",
      "Conversational English and natural Khmer script writing skills."
    ],
    benefits: [
      "foodpanda voucher credits ($20/month) for meals and groceries",
      "Mentorship from experienced international marketing managers",
      "Direct consideration for full-time post-graduate role",
      "Cool, creative co-working spaces with dynamic atmosphere"
    ],
    sourceUrl: "https://www.pelprek.com/jobs/foodpanda-marketing-intern",
    sourceName: "Pelprek",
    contactEmail: "recruitment-kh@deliveryhero.com"
  },
  {
    id: "job-012",
    title: "Front Desk Receptionist",
    company: "Angkor Palace Resort & Spa",
    location: "Siem Reap City, Cambodia",
    type: "Full-time",
    category: "Hospitality",
    salary: "$250 - $350 / Month",
    postedDate: "2026-07-02",
    description: "Welcome high-profile international and domestic guests to Siem Reap's luxury resort. Handle check-in and check-out processes, coordinate airport transfers, and provide local travel advisories.",
    requirements: [
      "High school equivalent or above, with some basic training in hotel service.",
      "Polite, smiling, and friendly customer service approach.",
      "Fluent English. Conversational Chinese, Thai, or Japanese is a big plus.",
      "Basic computer literacy for room reservation software."
    ],
    benefits: [
      "Generous shared monthly service charge and duty meals",
      "Free shared employee accommodation in Siem Reap",
      "NSSF card and regular overtime pay benefits",
      "Elegant traditional-inspired uniform provided"
    ],
    sourceUrl: "https://www.camhr.com/jobs/angkor-palace-front-desk",
    sourceName: "CamHR",
    contactEmail: "reception-careers@angkorpalace.com"
  },
  {
    id: "job-013",
    title: "Field Research Assistant",
    company: "Cambodia Development Research Institute (CDRI)",
    location: "Phnom Penh / Rural Provinces, Cambodia",
    type: "Full-time",
    category: "NGO & Development",
    salary: "$500 - $700 / Month",
    postedDate: "2026-07-01",
    description: "Coordinate agricultural and socio-economic data collection. Travel to various rural Cambodian communities to perform household surveys, focus group interviews, and transcribe study results.",
    requirements: [
      "Bachelor's degree in Economics, Agronomy, Development, or Sociology.",
      "Prior field data collection or rural community survey experience.",
      "Patient, polite, and respectful communication with local farmers and villagers.",
      "Excellent note-taking and intermediate English translation skills."
    ],
    benefits: [
      "Full travel per diem, hotel accommodations, and meals during field assignments",
      "Provident fund savings plan and premium health insurance",
      "Opportunities to co-author national development policy research",
      "Flexible hybrid workspace when in Phnom Penh HQ"
    ],
    sourceUrl: "https://www.bongthom.com/jobs/cdri-research-assistant",
    sourceName: "BongThom",
    contactEmail: "hr@cdri.org.kh"
  },
  {
    id: "job-014",
    title: "Database Entry & Archive Clerk",
    company: "Sathapana Bank Plc.",
    location: "Phnom Penh (Norodom Blvd), Cambodia",
    type: "Full-time",
    category: "Admin",
    salary: "$300 - $400 / Month",
    postedDate: "2026-07-03",
    description: "Support the corporate archiving and digitization drive at Sathapana Bank. Input new customer loan records, catalog physical archives, audit records accuracy, and ensure secure folder structures.",
    requirements: [
      "High school diploma or vocational certificate in computer typing.",
      "Extremely fast and accurate Khmer and English keyboard typing skills.",
      "High degree of concentration and tolerance for repetitive data processing.",
      "Punctual, organized, and understands data privacy guidelines."
    ],
    benefits: [
      "Excellent pathway to permanent bank administrative roles",
      "Secure banking sector benefits including NSSF card",
      "Yearly performance assessment and salary increment eligibility",
      "Subsidized coffee bar inside head office"
    ],
    sourceUrl: "https://www.camhr.com/jobs/sathapana-database-clerk",
    sourceName: "CamHR",
    contactEmail: "recruitment@sathapana.com.kh"
  }
];
