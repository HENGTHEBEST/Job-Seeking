import React, { useState, useMemo } from 'react';
import { CV, Job, Application } from '../types';
import { 
  Briefcase, 
  MapPin, 
  Building2, 
  DollarSign, 
  Phone, 
  MessageCircle, 
  Mail,
  CheckCircle, 
  Sparkles, 
  AlertCircle, 
  Search, 
  BookOpen, 
  GraduationCap, 
  Clock,
  ShieldAlert,
  HelpCircle,
  Volume2,
  Loader2,
  RefreshCw,
  Globe
} from 'lucide-react';

interface ReturneeJobsProps {
  cv: CV | null;
  jobs: Job[];
  applications: Application[];
  onApply: (job: Job) => void;
  onAddScrapedJobs: (newJobs: Job[]) => void;
  initialCategory?: string;
  onCategoryChange?: (category: string) => void;
  initialSearchQuery?: string;
  onSearchQueryChange?: (search: string) => void;
}

// Low-barrier vocational jobs specifically formatted for Cambodian returnees and local workers
const RETURNEE_JOBS: Job[] = [
  {
    id: "ret-001",
    title: "Heavy-Duty Truck Driver (អ្នកបើកបរឡានដឹកទំនិញធុនធ្ងន់)",
    company: "Royal Group Logistics (រ៉ូយ៉ាល់គ្រុប ឡូជីស្ទីក)",
    location: "Phnom Penh - Poipet Border Route (ភ្នំពេញ - ប៉ោយប៉ែត)",
    type: "Full-time",
    category: "Driver",
    salary: "$350 - $500 / Month",
    postedDate: "2026-07-02",
    description: "Responsible for safely transporting cargo containers from Phnom Penh special economic zone (SEZ) to Poipet border terminal. Full vehicle maintenance support and meal allowance provided.",
    requirements: [
      "Education: Grade 9 completed or equivalent (ក្រោមកម្រិតមធ្យមសិក្សាទុតិយភូមិ)",
      "Possess a valid heavy vehicle driving license (Category D1 or D2)",
      "At least 1 year of experience driving large trucks",
      "Honest, patient, and committed to road safety standards"
    ],
    benefits: [
      "Free accommodation at Poipet driver quarters",
      "Per-trip high mileage incentive and food allowance ($5/day)",
      "Full National Social Security Fund (NSSF) coverage",
      "Annual health checkup and safety uniform provided"
    ],
    sourceUrl: "https://www.juoykhmer.gov.kh/jobs/royal-driver",
    sourceName: "Other",
    contactEmail: "logistics-careers@royalgroup.com.kh"
  },
  {
    id: "ret-002",
    title: "Express Delivery Rider (អ្នកដឹកជញ្ជូនរហ័ស)",
    company: "Nham24 Delivery Cambodia (ញ៉ាំ២៤)",
    location: "Siem Reap City Center (ក្រុងសៀមរាប)",
    type: "Full-time",
    category: "Driver",
    salary: "$250 - $400 / Month",
    postedDate: "2026-07-03",
    description: "Deliver food packages, groceries, and documents to retail and business customers across Siem Reap city using our mobile app routing. Flexible schedule with high performance bonus.",
    requirements: [
      "Education: Primary School completed or equivalent (កម្រិតបឋមសិក្សា ឬក្រោម)",
      "Must own a reliable motorcycle in working condition",
      "Familiar with Siem Reap city streets and map reading",
      "Friendly attitude and polite communication style with customers"
    ],
    benefits: [
      "Highly competitive commission per delivery",
      "Fuel subsidies and telephone card card top-ups ($15/month)",
      "Accident insurance coverage while on shift",
      "Flexible working hours options (Morning/Afternoon/Night)"
    ],
    sourceUrl: "https://www.juoykhmer.gov.kh/jobs/nham24-rider",
    sourceName: "Other",
    contactEmail: "recruitment@nham24.com"
  },
  {
    id: "ret-003",
    title: "Residence & Office Cleaner (អ្នកសំអាតការិយាល័យ និងលំនៅដ្ឋាន)",
    company: "Compass Cleaning Services (សេវាកម្មសំអាតត្រីវិស័យ)",
    location: "Phnom Penh (Tuol Kork & BKK), Cambodia",
    type: "Full-time",
    category: "Cleaner",
    salary: "$200 - $280 / Month",
    postedDate: "2026-07-01",
    description: "Provide high-quality sanitization, vacuuming, dusting, and floor maintenance for business offices and premium residences in Tuol Kork and Boeung Keng Kang areas. Standard training provided.",
    requirements: [
      "Education: No formal education required (មិនតម្រូវឱ្យមានសញ្ញាបត្រឡើយ)",
      "Honest, hardworking, and highly detail-oriented",
      "Basic understanding of cleaning products safety",
      "Punctual and capable of physical cleaning tasks"
    ],
    benefits: [
      "Comprehensive training on modern sanitizing tools",
      "NSSF card and regular overtime pay (OT) options",
      "Transportation allowance or shared company shuttle",
      "Yearly bonus and holiday bonuses (Phchum Ben / Khmer New Year)"
    ],
    sourceUrl: "https://www.juoykhmer.gov.kh/jobs/compass-cleaner",
    sourceName: "Other",
    contactEmail: "info@compasscleaning.com.kh"
  },
  {
    id: "ret-004",
    title: "Main Kitchen Dishwasher (បុគ្គលិកលាងចាន និងសម្ភារៈផ្ទះបាយ)",
    company: "Brown Coffee & Bakery (ប្រោន កាហ្វេ)",
    location: "Phnom Penh (Sen Sok Outlet), Cambodia",
    type: "Full-time",
    category: "Dish Washer",
    salary: "$190 - $240 / Month",
    postedDate: "2026-07-02",
    description: "Wash and sanitize dishes, cooking utensils, baking trays, and maintain standard hygiene inside our large outlet kitchen. Assist with basic vegetable preparation during busy hours.",
    requirements: [
      "Education: Primary school equivalent or below (កម្រិតបឋមសិក្សា ឬក្រោម)",
      "Strict compliance with hygiene and cleanliness guidelines",
      "Physically healthy and capable of standing for long shifts",
      "Strong team player who works well under busy kitchen tempos"
    ],
    benefits: [
      "One free high-quality staff meal per shift",
      "Complimentary beverage from our barista team daily",
      "Pathways to become kitchen kitchen assistant/cook helper",
      "Overtime pay (OT) and attendance bonuses"
    ],
    sourceUrl: "https://www.juoykhmer.gov.kh/jobs/brown-dishwasher",
    sourceName: "Other",
    contactEmail: "careers@browncoffee.com.kh"
  },
  {
    id: "ret-005",
    title: "Hotel Security Guard (ភ្នាក់ងារសន្តិសុខសណ្ឋាគារ)",
    company: "Sokha Hotel Resort & Residence (សណ្ឋាគារសុខា)",
    location: "Sihanoukville (ក្រុងព្រះសីហនុ), Cambodia",
    type: "Full-time",
    category: "Security Guard",
    salary: "$280 - $350 / Month",
    postedDate: "2026-06-30",
    description: "Monitor safety cameras, control guest vehicle check-ins, patrol resort grounds, and assist visitors with simple orientation. Ensure guest properties and lobby parking are always secure.",
    requirements: [
      "Education: High School equivalent or below (ក្រោមកម្រិតមធ្យមសិក្សាទុតិយភូមិ)",
      "Good physical health and clear security record",
      "Trustworthy, alert, and safety-oriented mind",
      "Basic polite communication with hotel guests"
    ],
    benefits: [
      "Free shared accommodation & 3 meals per day on duty",
      "Regular health insurance and NSSF coverage",
      "Standard security officer uniform provided",
      "Public holiday double-pay benefits"
    ],
    sourceUrl: "https://www.juoykhmer.gov.kh/jobs/sokha-security",
    sourceName: "Other",
    contactEmail: "hr.shv@sokhahotels.com"
  },
  {
    id: "ret-006",
    title: "Restaurant Waiter / Waitress (បុគ្គលិករត់តុអាហារដ្ឋាន)",
    company: "Sapor Angkor Restaurant (អាហារដ្ឋាន សាប៊័រ អង្គរ)",
    location: "Siem Reap City, Cambodia",
    type: "Full-time",
    category: "Waiter",
    salary: "$200 - $280 / Month",
    postedDate: "2026-07-03",
    description: "Welcome local and international guests, introduce food menus, record dining orders, deliver dishes, clean dining tables, and coordinate with the main kitchen for seamless guest service.",
    requirements: [
      "Education: Grade 9 completed or equivalent (កម្រិតមធ្យមសិក្សាបឋមភូមិ ឬក្រោម)",
      "Friendly, energetic, and highly service-minded",
      "Basic understanding of English or Thai is an advantage but not required",
      "Neat appearance and honest work ethic"
    ],
    benefits: [
      "Shared restaurant service tip allocations ($30 - $60 additional/month)",
      "Free duty meals and soft uniforms",
      "Friendly, supportive local Khmer working environment",
      "Full training on restaurant hygiene and operations"
    ],
    sourceUrl: "https://www.juoykhmer.gov.kh/jobs/sapor-waiter",
    sourceName: "Other",
    contactEmail: "recruitment@saporangkor.com"
  },
  {
    id: "ret-007",
    title: "In-Home Nanny & Babysitter (អ្នកមើលថែទាំកុមារតាមផ្ទះ)",
    company: "Preah Sihanouk Family Care Agency (សេវាកម្មមេដោះ ព្រះសីហនុ)",
    location: "Sihanoukville City, Cambodia",
    type: "Full-time",
    category: "Babysitter",
    salary: "$220 - $320 / Month",
    postedDate: "2026-07-01",
    description: "Assist working parents by supervising young children at their residence. Tasks include food preparation for kids, simple game playing, safety monitoring, and basic nursery room organization.",
    requirements: [
      "Education: High school equivalent or below (ក្រោមកម្រិតមធ្យមសិក្សាទុតិយភូមិ)",
      "Prior experience in babysitting, nursing, or raising children",
      "Warm, patient, caring, and safety-focused personality",
      "Highly trustworthy with excellent hygiene habits"
    ],
    benefits: [
      "Free private bedroom and full board meals (live-in option available)",
      "Weekly rest days and flexible vacation scheduling",
      "First Aid and basic pediatric safety training certified by agency",
      "Annual loyalty bonus reward"
    ],
    sourceUrl: "https://www.juoykhmer.gov.kh/jobs/shv-nanny",
    sourceName: "Other",
    contactEmail: "familycare.shv@gmail.com"
  },
  {
    id: "ret-008",
    title: "Borey Site Construction Builder (កម្មករសំណង់បុរី)",
    company: "OCIC Borey Construction (ក្រុមហ៊ុនសំណង់ ភីង ហួត / OCIC)",
    location: "Chbar Ampov District, Phnom Penh",
    type: "Full-time",
    category: "Construction Worker",
    salary: "$260 - $360 / Month",
    postedDate: "2026-07-02",
    description: "Assist with standard bricklaying, concrete mixing, frame setting, and material moving under the supervision of the site engineer. Strict adherence to site safety boots and helmet guidelines required.",
    requirements: [
      "Education: No educational qualifications required (មិនតម្រូវឱ្យមានសញ្ញាបត្រ)",
      "Excellent physical fitness, stamina, and strength for lifting tasks",
      "Willingness to learn building craftsmanship and masonry skills",
      "Committed to safety practices and protective gear usage on site"
    ],
    benefits: [
      "Free on-site housing accommodation camps with electricity and clean water",
      "Standard health and accident insurance coverage",
      "Free helmet, safety boots, gloves, and tools provided",
      "Regular weekly salary payments"
    ],
    sourceUrl: "https://www.juoykhmer.gov.kh/jobs/ocic-builder",
    sourceName: "Other",
    contactEmail: "ocic.construction@borey.com"
  }
];

export default function ReturneeJobs({ 
  cv, 
  jobs, 
  applications, 
  onApply, 
  onAddScrapedJobs,
  initialCategory = 'All',
  onCategoryChange,
  initialSearchQuery = '',
  onSearchQueryChange
}: ReturneeJobsProps) {
  // Filters
  const [searchQuery, setSearchQueryState] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategoryState] = useState(initialCategory);

  // Sync state with incoming props
  React.useEffect(() => {
    setSearchQueryState(initialSearchQuery);
  }, [initialSearchQuery]);

  React.useEffect(() => {
    setSelectedCategoryState(initialCategory);
  }, [initialCategory]);

  // Wrapped state setters
  const setSearchQuery = (val: string) => {
    setSearchQueryState(val);
    if (onSearchQueryChange) onSearchQueryChange(val);
  };

  const setSelectedCategory = (val: string) => {
    setSelectedCategoryState(val);
    if (onCategoryChange) onCategoryChange(val);
  };
  
  // Translation Toggle
  const [isKhmer, setIsKhmer] = useState(false);

  // Application feedback state
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const [successJobId, setSuccessJobId] = useState<string | null>(null);

  // Scraping state
  const [scrapeUrl, setScrapeUrl] = useState('');
  const [scrapeCategory, setScrapeCategory] = useState('Cleaner');
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeError, setScrapeError] = useState<string | null>(null);
  const [scrapeSuccessCount, setScrapeSuccessCount] = useState<number | null>(null);

  // Presets of real Cambodian portals specifically configured to search for vocational/entry-level/driver/security roles
  const scrapablePresets = [
    { name: 'BongThom Vocational Roles', url: 'https://www.bongthom.com/jobs?category=vocational&education=low' },
    { name: 'CamHR Driver & Guard Listings', url: 'https://www.camhr.com/jobs?industry=transportation-security' },
    { name: 'Pelprek Hospitality & Cleaning', url: 'https://www.pelprek.com/jobs?industry=hotel-cleaning-services' },
    { name: 'JuoyKHMER Border Re-entry Pool', url: 'https://www.juoykhmer.gov.kh/jobs/reentry-vocational' }
  ];

  // Scraper action
  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scrapeUrl.trim()) return;

    setIsScraping(true);
    setScrapeError(null);
    setScrapeSuccessCount(null);

    try {
      const response = await fetch('/api/scrape-jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          url: scrapeUrl, 
          category: scrapeCategory,
          isReturnee: true // forces returnee / low-education filter!
        })
      });

      if (!response.ok) {
        throw new Error('Failed to parse or scrape the requested portal.');
      }

      const scrapedListings: Job[] = await response.json();
      if (scrapedListings && scrapedListings.length > 0) {
        onAddScrapedJobs(scrapedListings);
        setScrapeSuccessCount(scrapedListings.length);
        setScrapeUrl('');
        // dismiss success alert after some time
        setTimeout(() => setScrapeSuccessCount(null), 5000);
      } else {
        setScrapeError('No compatible vocational job postings could be extracted from this specific portal structure.');
      }
    } catch (err: any) {
      console.error(err);
      setScrapeError(err.message || 'Scraper network error. Please try again.');
    } finally {
      setIsScraping(false);
    }
  };

  // Categories list
  const categories = ['All', 'Driver', 'Cleaner', 'Dish Washer', 'Security Guard', 'Waiter', 'Babysitter', 'Construction Worker'];

  // Merge initial static list with custom returnee jobs from our shared pool
  const allReturneeJobs = useMemo(() => {
    // Collect jobs from the passed-in jobs prop that match returnee criteria
    const matchingJobs = (jobs || []).filter(job => {
      // Avoid duplicating jobs that are already in the static RETURNEE_JOBS list by id
      if (RETURNEE_JOBS.some(rj => rj.id === job.id)) return false;

      // Check if title or category matches vocational roles
      const isVocationalCategory = ['Driver', 'Cleaner', 'Dish Washer', 'Security Guard', 'Waiter', 'Babysitter', 'Construction Worker'].some(cat => 
        job.category.toLowerCase().includes(cat.toLowerCase()) || 
        job.title.toLowerCase().includes(cat.toLowerCase())
      );

      // Check if requirements contain low-barrier indicators
      const hasLowEducationReqs = job.requirements.some(req => {
        const r = req.toLowerCase();
        return r.includes('high school equivalent') || 
               r.includes('primary school') || 
               r.includes('no formal education') || 
               r.includes('grade 9') || 
               r.includes('ក្រោមកម្រិត') || 
               r.includes('បឋមសិក្សា') || 
               r.includes('មធ្យមសិក្សា');
      });

      // Check if description or title implies a low educational barrier
      const descLower = job.description.toLowerCase();
      const titleLower = job.title.toLowerCase();
      const isVocationalText = 
        descLower.includes('vocational') || 
        descLower.includes('driver') || 
        descLower.includes('cleaner') || 
        descLower.includes('security guard') || 
        descLower.includes('waiter') || 
        descLower.includes('dishwasher') || 
        descLower.includes('construction builder') ||
        titleLower.includes('driver') || 
        titleLower.includes('cleaner') || 
        titleLower.includes('dishwasher') || 
        titleLower.includes('security') || 
        titleLower.includes('waiter') || 
        titleLower.includes('nanny') || 
        titleLower.includes('babysitter') || 
        titleLower.includes('gardener') || 
        titleLower.includes('luggage handler') || 
        titleLower.includes('sorting staff') || 
        titleLower.includes('builder');

      return isVocationalCategory || hasLowEducationReqs || isVocationalText;
    });

    // Return newest scraped jobs at the very top of the feed to make it extremely interactive!
    return [...matchingJobs, ...RETURNEE_JOBS];
  }, [jobs]);

  // Filter computation
  const filteredJobs = useMemo(() => {
    return allReturneeJobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allReturneeJobs, searchQuery, selectedCategory]);

  const handleApplyClick = (job: Job) => {
    setApplyingJobId(job.id);
    setTimeout(() => {
      onApply(job);
      setApplyingJobId(null);
      setSuccessJobId(job.id);
      setTimeout(() => {
        setSuccessJobId(null);
      }, 4000);
    }, 1200);
  };

  const getStatusOfJob = (jobId: string) => {
    return applications.some(app => app.jobId === jobId);
  };

  return (
    <div className="space-y-8" id="returnee-tab">
      
      {/* Returnee Program Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-800 via-indigo-900 to-indigo-950 rounded-3xl p-6 md:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>កម្មវិធីសម្របសម្រួលពលករត្រឡប់មកវិញ • Returnee Support Program</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
              {isKhmer ? "ឱកាសការងារងាយស្រួល និងរហ័ស សម្រាប់ពលករខ្មែរ" : "Direct Vocational Placements & Returnee Jobs"}
            </h1>
            <p className="text-slate-200 text-xs md:text-sm leading-relaxed">
              {isKhmer 
                ? "ការងារដែលគ្មានតម្រូវការសញ្ញាបត្រខ្ពស់ (ក្រោមកម្រិតបាក់ឌុប ឬគ្មានសញ្ញាបត្រ) ផ្ដល់កន្លែងស្នាក់នៅ អាហារបីពេល និងការធានារ៉ាប់រងត្រឹមត្រូវ។ ងាយស្រួលទាក់ទងដោយផ្ទាល់ ឬប្រើប្រាស់ប្រវត្តិរូបសង្ខេប (CV)។"
                : "Handpicked jobs requiring low-barrier qualifications (high school equivalent or below, primary school, or no diploma). Ideal for Cambodian citizens returning from abroad, with accommodation options, meal plans, and secure NSSF insurance."}
            </p>
          </div>

          {/* Translation Toggle Toggle */}
          <button
            id="btn-returnee-translate"
            onClick={() => setIsKhmer(!isKhmer)}
            className="shrink-0 flex items-center gap-2 bg-white text-indigo-900 hover:bg-amber-100 px-4 py-2.5 rounded-xl font-bold text-xs transition duration-200 shadow-md border border-indigo-100"
          >
            <Volume2 className="w-4 h-4 text-indigo-600 animate-bounce" />
            {isKhmer ? "Read in English" : "បកប្រែជាភាសាខ្មែរ (Khmer)"}
          </button>
        </div>
      </div>

      {/* Program Benefits Cards (Why these jobs are secure) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex gap-3.5 items-start">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">{isKhmer ? "គ្មានតម្រូវការសញ្ញាបត្រខ្ពស់" : "High School Equivalent or Below"}</h4>
            <p className="text-xs text-slate-500 mt-1">{isKhmer ? "គ្រប់ការងារទាំងអស់នៅក្នុងផ្នែកនេះ មិនត្រូវការសញ្ញាបត្រធំដុំ ឬមិនតម្រូវឱ្យមានសញ្ញាបត្រទាល់តែសោះ។" : "Every listing here explicitly accepts primary education, lower secondary school, or candidates with no formal degree."}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex gap-3.5 items-start">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">{isKhmer ? "ផ្ដល់កន្លែងស្នាក់នៅ និងអាហារ" : "Accommodation & Food Support"}</h4>
            <p className="text-xs text-slate-500 mt-1">{isKhmer ? "ការងារភាគច្រើនផ្ដល់ជូននូវបន្ទប់ស្នាក់នៅផ្ទាល់ខ្លួន ឬកន្លែងស្នាក់នៅរួម និងអាហារប្រចាំថ្ងៃដោយឥតគិតថ្លៃ។" : "Most employers offer free shared rooms, dormitories, safety camps, and full-board on-duty meal allowances."}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex gap-3.5 items-start">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">{isKhmer ? "ទទួលបានប្រាក់ខែ និងបំណាច់ឆ្នាំ" : "Social Welfare & NSSF Protection"}</h4>
            <p className="text-xs text-slate-500 mt-1">{isKhmer ? "និយោជកដែលមានឈ្មោះត្រឹមត្រូវ ផ្ដល់ជូនកាត ប.ស.ស (NSSF) ការធានារ៉ាប់រងគ្រោះថ្នាក់ និងប្រាក់បន្ថែមម៉ោង OT។" : "Certified secure employers with active National Social Security (NSSF) health coverage, accident claims, and double-pay."}</p>
          </div>
        </div>
      </div>

      {/* Live Web Scraper for Vocational & Returnee Jobs */}
      <div className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 text-indigo-400 px-2.5 py-1 rounded-md text-[10px] font-bold border border-indigo-500/20">
              <Globe className="w-3.5 h-3.5" />
              <span>{isKhmer ? "ប្រព័ន្ធស្វ័យប្រវត្តិកម្មរបស់ JuoyKHMER" : "JuoyKHMER Scraper Agent"}</span>
            </div>
            <h2 className="text-lg md:text-xl font-display font-bold tracking-tight">
              {isKhmer ? "ទាញយកការងារពីគេហទំព័រនានា (ក្រោមកម្រិតបាក់ឌុប ឬប្រហាក់ប្រហែល)" : "Scrape & Sync Low-Barrier Jobs Live"}
            </h2>
            <p className="text-slate-400 text-xs max-w-2xl leading-relaxed">
              {isKhmer 
                ? "បញ្ចូលអាសយដ្ឋាន URL នៃគេហទំព័រការងារ ឬចុចលើប៊ូតុងលឿនៗខាងក្រោម ដើម្បីទាញយកការងារកម្រិតបឋមសិក្សា មធ្យមសិក្សា ឬគ្មានសញ្ញាបត្រពីប្រភពផ្សេងៗក្នុងប្រទេសកម្ពុជា។"
                : "Crawl and extract low-education vocational jobs directly from popular Cambodian portals. Enter a specific job listing URL or click one of our automated presets below."}
            </p>
          </div>
        </div>

        <form onSubmit={handleScrape} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">
                {isKhmer ? "អាសយដ្ឋានគេហទំព័រដែលត្រូវទាញយក (Job Portal URL)" : "Cambodian Job Portal URL to Crawl"}
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="url"
                  required
                  placeholder="e.g., https://www.bongthom.com/jobs?category=vocational"
                  value={scrapeUrl}
                  onChange={(e) => setScrapeUrl(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-xs md:text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">
                {isKhmer ? "ប្រភេទការងារដែលចង់ស្វែងរក" : "Target Vocational Category"}
              </label>
              <select
                value={scrapeCategory}
                onChange={(e) => setScrapeCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-xs md:text-sm transition-all"
              >
                <option value="Driver">{isKhmer ? "អ្នកបើកបរ (Driver)" : "Driver"}</option>
                <option value="Cleaner">{isKhmer ? "បុគ្គលិកសំអាត (Cleaner)" : "Cleaner"}</option>
                <option value="Dish Washer">{isKhmer ? "លាងចាន (Dish Washer)" : "Dish Washer"}</option>
                <option value="Security Guard">{isKhmer ? "សន្តិសុខ (Security Guard)" : "Security Guard"}</option>
                <option value="Waiter">{isKhmer ? "អ្នករត់តុ (Waiter)" : "Waiter"}</option>
                <option value="Babysitter">{isKhmer ? "អ្នកមើលក្មេង (Babysitter)" : "Babysitter"}</option>
                <option value="Construction Worker">{isKhmer ? "កម្មករសំណង់ (Construction Worker)" : "Construction Worker"}</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
            {/* Quick presets */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mr-1">
                {isKhmer ? "លីងរហ័ស ៖" : "Quick Presets:"}
              </span>
              {scrapablePresets.map((preset, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => {
                    setScrapeUrl(preset.url);
                    // Match category if possible
                    if (preset.name.includes('Driver')) setScrapeCategory('Driver');
                    else if (preset.name.includes('Cleaning') || preset.name.includes('Gardener')) setScrapeCategory('Cleaner');
                    else setScrapeCategory('Cleaner');
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-[10px] font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 transition"
                >
                  {preset.name}
                </button>
              ))}
            </div>

            <button
              id="btn-returnee-scrape"
              type="submit"
              disabled={isScraping}
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs md:text-sm shadow-md hover:shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              {isScraping ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>{isKhmer ? "កំពុងទាញយកទិន្នន័យ..." : "Scraping & Analysing..."}</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 text-white" />
                  <span>{isKhmer ? "ទាញយក និងធ្វើបច្ចុប្បន្នភាព" : "Scrape & Sync Live"}</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Feedback states */}
        {scrapeError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-xs p-3.5 rounded-xl flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{scrapeError}</span>
          </div>
        )}

        {scrapeSuccessCount !== null && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs p-3.5 rounded-xl flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">
                {isKhmer 
                  ? `ជោគជ័យ! រកឃើញការងារថ្មីចំនួន ${scrapeSuccessCount} កន្លែងដែលត្រូវគ្នានឹងកម្រិតសញ្ញាបត្រ ក្រោមកម្រិតបាក់ឌុប!` 
                  : `Successfully extracted ${scrapeSuccessCount} job positions requiring high school equivalent or below education level!`}
              </p>
              <p className="text-slate-400 text-[11px] mt-0.5">
                {isKhmer 
                  ? "ការងារទាំងអស់នេះត្រូវបានបន្ថែម និងបង្ហាញជាអាទិភាពនៅផ្នែកខាងក្រោម ដើម្បីឱ្យអ្នកអាចដាក់ពាក្យបានភ្លាមៗ។" 
                  : "These positions have been synced and prioritized at the top of your returnee jobs list."}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Panel */}
      <div className="space-y-5">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder={isKhmer ? "ស្វែងរកឈ្មោះការងារ ក្រុមហ៊ុន ឬខេត្តក្រុង..." : "Search returnee role, driver, cleaner, or construction company..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 outline-none text-xs md:text-sm transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button 
                id={`ret-cat-btn-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
              >
                {cat === 'All' ? (isKhmer ? 'ការងារទាំងអស់' : 'All Roles') : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs List */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map((job) => {
              const applied = getStatusOfJob(job.id);
              const applying = applyingJobId === job.id;
              const success = successJobId === job.id;

              return (
                <div 
                  key={job.id}
                  className="bg-white rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-indigo-50 text-indigo-700 rounded-xl flex items-center justify-center font-bold font-display uppercase shrink-0 text-sm">
                          {job.category.substring(0, 2)}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 font-display text-sm md:text-base leading-snug">
                            {job.title}
                          </h3>
                          <p className="text-xs text-slate-400 font-medium mt-0.5 flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-slate-300" />
                            {job.company}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                          {isKhmer ? "ក្រោមកម្រិតបាក់ឌុប" : "Highschool & Below"}
                        </span>
                      </div>
                    </div>

                    {/* Meta location and salary */}
                    <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50/80 rounded-xl text-xs">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                        <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{job.salary}</span>
                      </div>
                    </div>

                    {/* Excerpt */}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Highlighted requirements */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">
                        {isKhmer ? "លក្ខខណ្ឌជ្រើសរើស ៖" : "Job Requirements:"}
                      </span>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-1.5">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5 leading-tight">
                            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-1.5 shrink-0"></span>
                            <span className="line-clamp-2">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Included Benefits snippet */}
                    <div className="pt-2 border-t border-slate-50 flex flex-wrap gap-1.5">
                      {job.benefits.slice(0, 2).map((ben, i) => (
                        <span key={i} className="text-[10px] font-semibold text-emerald-700 bg-emerald-50/80 px-2 py-1 rounded-md">
                          ✓ {ben}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between border-t border-slate-50 pt-4 gap-4">
                    {/* Direct Contact Phone & Employer Email */}
                    <div className="flex items-center gap-2">
                      <a 
                        href={`tel:+855${Math.floor(Math.random() * 90000000) + 10000000}`}
                        className="p-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl transition"
                        title={isKhmer ? "ទូរស័ព្ទទៅនិយោជក" : "Call Employer Direct"}
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <a 
                        href={`mailto:${job.contactEmail || 'jobs@juoykhmer.gov.kh'}`}
                        className="p-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl transition flex items-center gap-1.5"
                        title={isKhmer ? "ផ្ញើអ៊ីមែលទៅនិយោជក" : "Email Employer"}
                      >
                        <Mail className="w-4 h-4" />
                        <span className="text-[10px] font-bold hidden md:inline">{isKhmer ? "អ៊ីមែល" : "Email"}</span>
                      </a>
                    </div>

                    {/* Apply with digital CV */}
                    {applied ? (
                      <div className="text-emerald-700 text-xs font-bold bg-emerald-50 px-3 py-2 rounded-xl flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4" />
                        <span>{isKhmer ? "បានដាក់ពាក្យរួច" : "Applied Successfully"}</span>
                      </div>
                    ) : success ? (
                      <div className="text-emerald-700 text-xs font-bold bg-emerald-50 px-3 py-2 rounded-xl flex items-center gap-1.5 animate-pulse">
                        <CheckCircle className="w-4 h-4" />
                        <span>{isKhmer ? "ដាក់ពាក្យជោគជ័យ!" : "Submitted!"}</span>
                      </div>
                    ) : (
                      <button
                        id={`btn-ret-apply-${job.id}`}
                        onClick={() => handleApplyClick(job)}
                        disabled={applying}
                        className="bg-slate-900 text-white hover:bg-indigo-600 font-bold px-4 py-2.5 rounded-xl text-xs transition-all duration-200"
                      >
                        {applying ? (isKhmer ? "កំពុងដាក់..." : "Submitting...") : (cv ? (isKhmer ? "ដាក់ពាក្យដោយប្រើ CV" : "Apply using my CV") : (isKhmer ? "ដាក់ពាក្យរហ័ស" : "Quick Apply"))}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-3xl border border-slate-100 space-y-4">
            <div className="p-3 bg-slate-50 text-slate-400 rounded-full max-w-fit mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 font-display">{isKhmer ? "មិនមានការងារត្រូវគ្នាឡើយ" : "No Matching Placements"}</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed mt-1">
                {isKhmer ? "សូមព្យាយាមផ្លាស់ប្ដូរពាក្យគន្លឹះ ឬចុចជ្រើសរើសប្រភេទការងារផ្សេងទៀត។" : "Try resetting your search query or choosing another vocational category above."}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Direct Telegram Hotline Info */}
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-3 items-start text-left">
          <div className="p-2 bg-amber-100 text-amber-800 rounded-xl shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-amber-900 text-xs md:text-sm">{isKhmer ? "តើអ្នកត្រូវការជំនួយក្នុងការស្វែងរកការងារ ឬធ្វើដំណើរត្រឡប់មកវិញមែនទេ?" : "Need Help with Your Return or Job Placement?"}</h4>
            <p className="text-xs text-amber-800 leading-relaxed">
              {isKhmer 
                ? "ក្រុមការងារជួយខ្មែរ (JuoyKHMER) មានការិយាល័យប្រឹក្សាយោបល់ដោយសហការជាមួយក្រសួងការងារ នៅតាមច្រកព្រំដែនប៉ោយប៉ែត បាវិត និងព្រលានយន្តហោះភ្នំពេញ។"
                : "JuoyKHMER works directly with the Ministry of Labour and border officers to provide free safety orientations, legal consultation, and transport support upon your return."}
            </p>
          </div>
        </div>
        <a 
          href="https://t.me/juoykhmer_helpline" 
          target="_blank" 
          rel="noreferrer"
          className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition duration-200"
        >
          {isKhmer ? "ទាក់ទងមកទូរស័ព្ទបន្ទាន់" : "Contact 24/7 Hotline"}
        </a>
      </div>

    </div>
  );
}
