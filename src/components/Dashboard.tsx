import React, { useMemo, useState } from 'react';
import { CV, Job, Application } from '../types';

const heroMeeting = new URL('../assets/images/hero_meeting_1783149544733.jpg', import.meta.url).href;
const heroConstruction = new URL('../assets/images/hero_construction_1783149563236.jpg', import.meta.url).href;
import { 
  FileText, 
  Briefcase, 
  CheckCircle, 
  MessageSquare, 
  TrendingUp, 
  MapPin, 
  Building2, 
  ArrowRight,
  GraduationCap,
  Sparkles,
  Info,
  Search,
  Globe,
  DollarSign,
  Laptop,
  HeartHandshake,
  Compass,
  Smile,
  Shield,
  Truck,
  UserCheck
} from 'lucide-react';

interface DashboardProps {
  cv: CV | null;
  jobs: Job[];
  applications: Application[];
  onNavigate: (tab: string, category?: string, search?: string, location?: string) => void;
}

export default function Dashboard({ cv, jobs, applications, onNavigate }: DashboardProps) {
  // Khmer/English state
  const [isKhmer, setIsKhmer] = useState(false);

  // Search local inputs
  const [searchKeywords, setSearchKeywords] = useState('');
  const [searchLocation, setSearchLocation] = useState('All');
  const [searchCategory, setSearchCategory] = useState('All');

  // Featured jobs category filter
  const [featuredCategory, setFeaturedCategory] = useState('All');

  // Calculate profile strength
  const cvStrength = useMemo(() => {
    if (!cv) return 0;
    let score = 20; // base score for completing basic info
    if (cv.about && cv.about.length > 20) score += 15;
    if (cv.education && cv.education.length > 0) score += 20;
    if (cv.experience && cv.experience.length > 0) score += 20;
    if (cv.skills && cv.skills.length > 0) score += 15;
    if (cv.languages && cv.languages.length > 0) score += 10;
    return Math.min(score, 100);
  }, [cv]);

  // Dynamic job matching score
  const matches = useMemo(() => {
    if (!cv || !cv.skills || cv.skills.length === 0) {
      // Return internships or hot jobs by default
      return jobs.filter(j => j.type === 'Internship' || j.postedDate >= '2026-07-01').slice(0, 3);
    }
    
    const scored = jobs.map(job => {
      let score = 0;
      if (cv.about && job.category && cv.about.toLowerCase().includes(job.category.toLowerCase().split(' ')[0])) {
        score += 3;
      }
      if (cv.location && job.location.toLowerCase().includes(cv.location.toLowerCase())) {
        score += 2;
      }
      const skillMatches = job.requirements.filter(req => 
        cv.skills.some(skill => req.toLowerCase().includes(skill.toLowerCase()))
      );
      score += skillMatches.length * 2;

      return { job, score };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.job);
  }, [cv, jobs]);

  // Locations preset
  const cambodiaLocations = ['All', 'Phnom Penh', 'Siem Reap', 'Sihanoukville', 'Battambang', 'Kampot', 'Kandal'];

  // Combined categories for searching
  const searchableCategories = [
    'All',
    'IT & Software',
    'Banking & Finance',
    'Marketing',
    'NGO & Development',
    'Hospitality',
    'Admin',
    'Driver',
    'Cleaner',
    'Security Guard',
    'Waiter',
    'Babysitter',
    'Construction'
  ];

  // Category items with metadata for Browse by Category grid
  const categoriesList = [
    {
      id: 'it',
      nameEn: 'IT & Software',
      nameKh: 'ព័ត៌មានវិទ្យា និងកម្មវិធី',
      icon: Laptop,
      count: jobs.filter(j => j.category === 'IT & Software').length || 12,
      tab: 'jobs',
      categoryKey: 'IT & Software',
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:border-blue-200'
    },
    {
      id: 'finance',
      nameEn: 'Banking & Finance',
      nameKh: 'ធនាគារ និងហិរញ្ញវត្ថុ',
      icon: DollarSign,
      count: jobs.filter(j => j.category === 'Banking & Finance').length || 8,
      tab: 'jobs',
      categoryKey: 'Banking & Finance',
      color: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:border-emerald-200'
    },
    {
      id: 'marketing',
      nameEn: 'Marketing & Sales',
      nameKh: 'ទីផ្សារ និងការលក់',
      icon: Sparkles,
      count: jobs.filter(j => j.category === 'Marketing').length || 6,
      tab: 'jobs',
      categoryKey: 'Marketing',
      color: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:border-indigo-200'
    },
    {
      id: 'ngo',
      nameEn: 'NGO & Development',
      nameKh: 'អង្គការក្រៅរដ្ឋាភិបាល',
      icon: HeartHandshake,
      count: jobs.filter(j => j.category === 'NGO & Development').length || 4,
      tab: 'jobs',
      categoryKey: 'NGO & Development',
      color: 'bg-violet-50 text-violet-600 hover:bg-violet-100 hover:border-violet-200'
    },
    {
      id: 'hospitality',
      nameEn: 'Hospitality & Luxury',
      nameKh: 'សណ្ឋាគារ និងបដិសណ្ឋារកិច្ច',
      icon: Building2,
      count: jobs.filter(j => j.category === 'Hospitality').length || 5,
      tab: 'jobs',
      categoryKey: 'Hospitality',
      color: 'bg-amber-50 text-amber-600 hover:bg-amber-100 hover:border-amber-200'
    },
    {
      id: 'admin',
      nameEn: 'Administrative Support',
      nameKh: 'រដ្ឋបាល និងជំនួយការ',
      icon: FileText,
      count: jobs.filter(j => j.category === 'Admin').length || 7,
      tab: 'jobs',
      categoryKey: 'Admin',
      color: 'bg-rose-50 text-rose-600 hover:bg-rose-100 hover:border-rose-200'
    },
    {
      id: 'driver',
      nameEn: 'Drivers & Delivery',
      nameKh: 'អ្នកបើកបរ និងដឹកជញ្ជូន',
      icon: Truck,
      count: 9,
      tab: 'returnee',
      categoryKey: 'Driver',
      color: 'bg-cyan-50 text-cyan-600 hover:bg-cyan-100 hover:border-cyan-200'
    },
    {
      id: 'services',
      nameEn: 'Services & Cleaning',
      nameKh: 'សេវាកម្ម និងអនាម័យ',
      icon: UserCheck,
      count: 14,
      tab: 'returnee',
      categoryKey: 'Cleaner',
      color: 'bg-teal-50 text-teal-600 hover:bg-teal-100 hover:border-teal-200'
    }
  ];

  // Popular searches preset tags
  const popularTags = [
    { name: 'Software', tab: 'jobs', key: 'IT & Software' },
    { name: 'Finance', tab: 'jobs', key: 'Banking & Finance' },
    { name: 'NGO', tab: 'jobs', key: 'NGO & Development' },
    { name: 'Driver', tab: 'returnee', key: 'Driver' },
    { name: 'Cleaning', tab: 'returnee', key: 'Cleaner' }
  ];

  // Handle hero search form submission
  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Decide which tab to navigate based on the category chosen
    const returneeCategories = ['Driver', 'Cleaner', 'Security Guard', 'Waiter', 'Babysitter', 'Construction'];
    const isReturnee = returneeCategories.includes(searchCategory);
    const targetTab = isReturnee ? 'returnee' : 'jobs';

    onNavigate(targetTab, searchCategory, searchKeywords, searchLocation);
  };

  // Jobs of the day filtering
  const filteredJobsOfTheDay = useMemo(() => {
    if (featuredCategory === 'All') {
      return jobs.slice(0, 6);
    }
    return jobs.filter(j => j.category === featuredCategory).slice(0, 6);
  }, [jobs, featuredCategory]);

  return (
    <div className="space-y-16 pb-12" id="dashboard-tab">
      
      {/* LANGUAGE SWITCHER MINI RAIL */}
      <div className="flex justify-end -mb-10 relative z-20">
        <button
          onClick={() => setIsKhmer(!isKhmer)}
          className="bg-white/80 hover:bg-white text-slate-700 hover:text-indigo-600 font-bold text-xs px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs transition duration-150 flex items-center gap-1.5"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{isKhmer ? 'English' : 'ភាសាខ្មែរ'}</span>
        </button>
      </div>

      {/* HERO SECTION - REDESIGNED INSPIRED BY JOBBOX */}
      <div className="relative bg-gradient-to-b from-blue-50/50 via-white to-transparent rounded-3xl pt-12 pb-8 px-4 md:px-8 overflow-hidden border border-slate-100/50">
        {/* Abstract Background Elements */}
        <div className="absolute top-10 left-10 w-44 h-44 bg-blue-100/30 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-indigo-100/30 rounded-full blur-3xl -z-10" />
        
        {/* Decorative Grid Dots */}
        <div className="absolute top-8 right-1/2 w-24 h-24 opacity-20 -z-10 hidden md:block">
          <svg width="100%" height="100%" fill="currentColor" className="text-slate-400">
            <pattern id="pattern-dots" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pattern-dots)" />
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Headline & Subtitle & Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-indigo-50/80 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                <span>
                  {isKhmer 
                    ? "ប្រព័ន្ធស្វែងរកការងារឆ្លាតវៃរបស់កម្ពុជា" 
                    : "Cambodia's Real-Time Smart Career Hub"}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight text-slate-900 leading-[1.15] md:leading-[1.1]">
                {isKhmer ? (
                  <>
                    វិធីដែល <span className="text-indigo-600 relative inline-block">ងាយស្រួលបំផុត<span className="absolute bottom-1 left-0 w-full h-1.5 bg-indigo-200/50 -z-10 rounded-xs" /></span> ដើម្បីទទួលបាន <span className="text-blue-600">ការងារថ្មីរបស់អ្នក</span>
                  </>
                ) : (
                  <>
                    The <span className="text-indigo-600 relative inline-block">Easiest Way<span className="absolute bottom-1.5 left-0 w-full h-2 bg-indigo-200/60 -z-10 rounded-xs" /></span> to Get Your <span className="text-blue-600">New Job</span>
                  </>
                )}
              </h1>

              <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl">
                {isKhmer 
                  ? "ជារៀងរាល់ខែ សិស្ស និស្សិត និងពលករខ្មែរដែលវិលត្រឡប់មកពីក្រៅប្រទេសរាប់ពាន់នាក់ ប្រើប្រាស់វេទិកានេះដើម្បីតភ្ជាប់ជាមួយក្រុមហ៊ុនធំៗ និងការងារជំនាញបឋមងាយស្រួលរកក្នុងប្រទេសកម្ពុជា។"
                  : "Each month, thousands of Cambodian job seekers, returnees, and students turn to our hub for modern career matching. We connect you directly with premier corporations, local businesses, and vocational employers."}
              </p>
            </div>

            {/* Redesigned Search Form */}
            <form onSubmit={handleHeroSearch} className="bg-white p-3 rounded-2xl md:rounded-full border border-slate-150 shadow-xl flex flex-col md:flex-row items-center gap-3">
              {/* Keywords */}
              <div className="w-full flex-1 relative flex items-center pl-3">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input 
                  type="text"
                  placeholder={isKhmer ? "ស្វែងរកការងារ ជំនាញ ឬក្រុមហ៊ុន..." : "Job title, keywords, company..."}
                  value={searchKeywords}
                  onChange={(e) => setSearchKeywords(e.target.value)}
                  className="w-full pl-2.5 pr-2 py-2 bg-transparent border-0 outline-none focus:ring-0 text-slate-800 text-xs md:text-sm"
                />
              </div>

              <div className="hidden md:block h-6 w-[1px] bg-slate-200" />

              {/* Location Select */}
              <div className="w-full md:w-44 relative flex items-center pl-3 md:pl-0">
                <MapPin className="w-4 h-4 text-indigo-500 shrink-0 mr-1.5" />
                <select 
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full py-2 bg-transparent border-0 outline-none focus:ring-0 text-slate-700 text-xs md:text-sm cursor-pointer appearance-none"
                >
                  <option value="All">{isKhmer ? 'គ្រប់ខេត្ត/ក្រុង' : 'All Locations'}</option>
                  {cambodiaLocations.slice(1).map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div className="hidden md:block h-6 w-[1px] bg-slate-200" />

              {/* Category Select */}
              <div className="w-full md:w-48 relative flex items-center pl-3 md:pl-0">
                <Briefcase className="w-4 h-4 text-indigo-500 shrink-0 mr-1.5" />
                <select 
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="w-full py-2 bg-transparent border-0 outline-none focus:ring-0 text-slate-700 text-xs md:text-sm cursor-pointer appearance-none"
                >
                  <option value="All">{isKhmer ? 'គ្រប់ផ្នែកទាំងអស់' : 'All Categories'}</option>
                  {searchableCategories.slice(1).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-xl md:rounded-full shadow-md hover:shadow-indigo-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>{isKhmer ? "ស្វែងរក" : "Search"}</span>
              </button>
            </form>

            {/* Popular tags below */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">{isKhmer ? "ស្វែងរកច្រើនជាងគេ ៖" : "Popular Searches:"}</span>
              {popularTags.map((tag) => (
                <button
                  type="button"
                  key={tag.name}
                  onClick={() => onNavigate(tag.tab, tag.key, tag.name)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 font-medium rounded-lg border border-transparent transition cursor-pointer"
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Redesigned Overlapping Images with generated high-quality images */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center">
            {/* Visual Dotted Grid Deco */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-15 hidden md:block">
              <svg width="100%" height="100%" fill="currentColor" className="text-slate-500">
                <pattern id="pattern-dots-2" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="2" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#pattern-dots-2)" />
              </svg>
            </div>

            {/* Main Corporate Portrait card (3:4 aspect ratio) */}
            <div className="relative w-72 h-96 border-8 border-indigo-600/10 rounded-3xl overflow-hidden shadow-2xl z-10 transition hover:scale-[1.02] duration-300">
              <img 
                src={heroMeeting}
                alt="Corporate presentation meeting in Cambodia"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Overlapping Blue Collar / Construction worker card (1:1 aspect ratio) */}
            <div className="absolute bottom-[-24px] left-[10px] md:left-[-10px] w-48 h-48 border-4 border-white rounded-3xl overflow-hidden shadow-2xl z-20 transition hover:scale-[1.05] duration-300">
              <img 
                src={heroConstruction}
                alt="Construction workers look at blueprints in Cambodia"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Floating Info Badges */}
            <div className="absolute top-10 left-[-20px] bg-white border border-slate-100 py-2.5 px-4 rounded-2xl shadow-xl z-20 flex items-center gap-2 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xs">
                ✓
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 leading-none">Language AI</p>
                <p className="text-xs font-bold text-slate-800">{isKhmer ? "គាំទ្រភាសាខ្មែរ ១០០%" : "100% Khmer Built"}</p>
              </div>
            </div>

            <div className="absolute bottom-16 right-[-20px] bg-slate-900 text-white py-2.5 px-4 rounded-2xl shadow-xl z-20 flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <p className="text-[9px] font-bold tracking-wider uppercase text-indigo-300 leading-none">Database Active</p>
                <p className="text-xs font-bold">{isKhmer ? "ការងារត្រូវបានផ្ទៀងផ្ទាត់" : "1,200+ Active Jobs"}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* GRID OF STATS METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition hover:shadow-md duration-200">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{isKhmer ? "កម្រិត CV" : "CV Strength"}</p>
            <p className="text-2xl font-bold font-display text-slate-800">{cv ? `${cvStrength}%` : '0%'}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition hover:shadow-md duration-200">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{isKhmer ? "ការងារកំពុងរើស" : "Jobs Available"}</p>
            <p className="text-2xl font-bold font-display text-slate-800">{jobs.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition hover:shadow-md duration-200">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{isKhmer ? "ពាក្យដែលបានដាក់" : "My Applications"}</p>
            <p className="text-2xl font-bold font-display text-slate-800">{applications.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition hover:shadow-md duration-200">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{isKhmer ? "កម្មសិក្សាការងារ" : "Internships"}</p>
            <p className="text-2xl font-bold font-display text-slate-800">
              {jobs.filter(j => j.type === 'Internship').length}
            </p>
          </div>
        </div>
      </div>

      {/* BROWSE BY CATEGORY SECTION */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-display font-black tracking-tight text-slate-900">
            {isKhmer ? "ស្វែងរកការងារតាមប្រភេទជំនាញ" : "Browse by Category"}
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            {isKhmer 
              ? "ស្វែងរកការងារដែលសាកសមសម្រាប់អ្នកបំផុត។ ឱកាសការងារថ្មីៗរាប់រយកន្លែងជារៀងរាល់ថ្ងៃ។" 
              : "Find the job that's perfect for you. Explore matching positions across top industries everyday."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {categoriesList.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => onNavigate(cat.tab, cat.categoryKey)}
                className="p-6 bg-white rounded-2xl border border-slate-100 text-left hover:border-indigo-200 hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between h-44"
              >
                <div className={`p-3 rounded-xl ${cat.color} w-fit transition-transform group-hover:scale-110 duration-300`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="space-y-1 mt-4">
                  <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors text-sm md:text-base">
                    {isKhmer ? cat.nameKh : cat.nameEn}
                  </h3>
                  <p className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full w-fit">
                    {cat.count} {isKhmer ? "ការងារ" : "Jobs Available"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* JOBS OF THE DAY / FEATURED JOBS TAB PANEL */}
      <div className="space-y-8 bg-slate-50/50 p-6 md:p-8 rounded-3xl border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-display font-black tracking-tight text-slate-900">
              {isKhmer ? "ការងារប្រចាំថ្ងៃដែលគួរឱ្យចាប់អារម្មណ៍" : "Jobs of the Day"}
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              {isKhmer 
                ? "ស្វែងរក និងទំនាក់ទំនងជាមួយនិយោជកដែលសាកសមបំផុតជាមួយការងាររបស់អ្នក" 
                : "Search and connect with premium curated opportunities directly verified by our specialists"}
            </p>
          </div>

          {/* Horizonal Tab category selector */}
          <div className="flex flex-wrap gap-1.5 bg-white p-1 rounded-xl border border-slate-150">
            {['All', 'IT & Software', 'Banking & Finance', 'Marketing', 'Hospitality'].map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setFeaturedCategory(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  featuredCategory === tab 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab === 'All' ? (isKhmer ? 'ទាំងអស់' : 'All') : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredJobsOfTheDay.map((job) => (
            <div 
              key={job.id}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col justify-between h-72 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-10 h-10 bg-slate-50 text-indigo-600 font-bold border border-slate-100 rounded-xl flex items-center justify-center uppercase text-sm">
                    {job.company.substring(0, 2)}
                  </div>
                  <span className="text-[10px] font-black tracking-wider uppercase text-indigo-600 bg-indigo-50/75 px-2.5 py-1 rounded-md">
                    {job.type}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1 text-sm md:text-base">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Building2 className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[150px]">{job.company}</span>
                    <span>•</span>
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span className="truncate">{job.location.split(',')[0]}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-4">
                <span className="font-mono text-xs font-black text-slate-700">
                  {job.salary}
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate('jobs')}
                  className="bg-slate-50 hover:bg-indigo-600 text-slate-600 hover:text-white font-bold text-[10px] uppercase px-3 py-2 rounded-xl transition duration-200 cursor-pointer inline-flex items-center gap-1"
                >
                  <span>{isKhmer ? "ព័ត៌មានលម្អិត" : "View Details"}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DUAL WORKSPACE BLOCK: AI INTEGRITY CHECK & CAMBODIA MARKET TRENDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Curated Recommendations for Profile if CV exists */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-display text-slate-900">
              {isKhmer ? "ណែនាំពិសេសសម្រាប់អ្នក" : "Curated for Your Profile"}
            </h2>
            <button 
              onClick={() => onNavigate('jobs')} 
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>{isKhmer ? "មើលទាំងអស់" : "View All"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {matches.map((job) => (
              <div 
                key={job.id} 
                className="p-5 bg-white rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all duration-200 group flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold border border-slate-100 shrink-0 uppercase text-xs">
                    {job.company.substring(0, 2)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                        {job.type}
                      </span>
                      <span className="text-[10px] font-medium text-slate-500">
                        {job.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors text-sm">
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-600 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" />
                      {job.company}
                      <span className="text-slate-300">•</span>
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {job.location.split(',')[0]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-0 pt-3 md:pt-0 border-slate-50">
                  <span className="font-mono font-bold text-slate-700 text-xs md:text-sm">
                    {job.salary}
                  </span>
                  <button 
                    onClick={() => onNavigate('jobs')}
                    className="bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white text-slate-600 font-bold px-4 py-2 rounded-xl transition duration-200 text-[10px] uppercase inline-flex items-center gap-1"
                  >
                    <span>{isKhmer ? "លម្អិត" : "Details"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Local Market Guidance */}
          <div className="bg-gradient-to-br from-amber-50/70 to-orange-50/30 p-6 rounded-2xl border border-amber-100 flex gap-4">
            <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl h-fit">
              <Info className="w-5 h-5 shrink-0" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-amber-900 text-sm md:text-base font-display">
                {isKhmer ? "គុណសម្បត្តិនៃការចេះភាសាបរទេស" : "Bilingual Competitive Edge"}
              </h4>
              <p className="text-xs md:text-sm text-amber-800 leading-relaxed">
                {isKhmer 
                  ? "សហគ្រាសក្នុងភ្នំពេញ ផ្តល់តម្លៃខ្ពស់ដល់បុគ្គលិកដែលមានសមត្ថភាពនិយាយភាសាច្រើន។ ការចេះភាសាខ្មែរ អង់គ្លេស ចិន ឬថៃ នឹងជួយបង្កើនឱកាសទទួលបានការងារខ្ពស់ក្នុងវិស័យធនាគារ ទេសចរណ៍ និងសំណង់លឿនជាងមុន។"
                  : "Cambodian enterprises in Phnom Penh and Siem Reap place a massive premium on bilingual professionals. Showing proficiency in Khmer, English, Chinese, or Thai drastically accelerates your selection rate in Finance, Tourism, and Construction."}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-6">
          
          {/* CV Integrity Check */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-800 font-display text-sm md:text-base">{isKhmer ? "ការវាយតម្លៃគំរូ CV របស់ AI" : "AI CV Integrity Check"}</h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cv ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 bg-slate-50'}`}>
                {cv ? (isKhmer ? 'សកម្ម' : 'Active') : (isKhmer ? 'ខ្វះខាត' : 'Missing')}
              </span>
            </div>

            {cv ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">{isKhmer ? "កម្រិតបំពេញព័ត៌មាន" : "Completeness Score"}</span>
                    <span className="text-slate-800 font-bold">{cvStrength}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${cvStrength}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2 text-[11px] text-slate-500 leading-relaxed">
                  <p className="font-bold text-slate-700">{isKhmer ? "ដើម្បីទទួលបាន ១០០% ៖" : "To achieve 100%:"}</p>
                  {cvStrength < 40 && <p className="flex items-center gap-1.5">• {isKhmer ? "បន្ថែមប្រវត្តិការសិក្សា" : "Add academic & field certifications"}</p>}
                  {cvStrength < 70 && <p className="flex items-center gap-1.5">• {isKhmer ? "បន្ថែមប្រវត្តិកម្រងការងារ" : "Add professional or internship milestones"}</p>}
                  {cvStrength < 90 && <p className="flex items-center gap-1.5">• {isKhmer ? "បន្ថែមសមត្ថភាពភាសា" : "Add bilingual proficiency details"}</p>}
                  {cvStrength === 100 && <p className="text-emerald-600 font-bold flex items-center gap-1.5">✓ {isKhmer ? "CV របស់អ្នករៀបចំបានល្អឥតខ្ចោះ!" : "Your CV is perfectly optimized for recruitment!"}</p>}
                </div>

                <button 
                  onClick={() => onNavigate('cv')}
                  className="w-full text-center bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold py-2.5 rounded-xl text-xs transition duration-200 cursor-pointer"
                >
                  {isKhmer ? "កែសម្រួលប្រវត្តិរូបរូប / CV" : "Edit Digital CV Card"}
                </button>
              </div>
            ) : (
              <div className="space-y-3.5 py-2 text-center">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  {isKhmer 
                    ? "បង្កើតប្រវត្តិរូបសង្ខេបដើម្បីឱ្យប្រព័ន្ធ AI ស្វែងរកការងារដែលសាកសមបំផុតសម្រាប់អ្នក" 
                    : "Create your resume bio card now to unlock premium automated matches directly with top-tier partners."}
                </p>
                <button 
                  onClick={() => onNavigate('cv')}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-xs transition duration-200 cursor-pointer"
                >
                  {isKhmer ? "បង្កើតប្រវត្តិរូបឥឡូវនេះ" : "Build My Profile Card"}
                </button>
              </div>
            )}
          </div>

          {/* Cambodia Market Trends */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 font-display text-sm md:text-base">{isKhmer ? "និន្នាការទីផ្សារការងារកម្ពុជា" : "Cambodia Market Trends"}</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-xs font-semibold text-slate-700">{isKhmer ? "ប្រព័ន្ធហិរញ្ញវត្ថុ Fintech" : "Mobile Fintech Systems"}</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+35% YoY</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-xs font-semibold text-slate-700">{isKhmer ? "អ្នកសម្របសម្រួល NGO" : "NGO Coordinator Admins"}</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+18% YoY</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-xs font-semibold text-slate-700">{isKhmer ? "ជំនាញទីផ្សារឌីជីថល" : "Digital Content & Ads"}</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+22% YoY</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-xs font-semibold text-slate-700">{isKhmer ? "សំណង់ និងដឹកជញ្ជូន" : "Construction & Logistics"}</span>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{isKhmer ? "ថេរ" : "Stable"}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
