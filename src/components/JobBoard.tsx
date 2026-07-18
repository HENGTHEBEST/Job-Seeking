import React, { useState, useMemo } from 'react';
import { Job, Application, CV } from '../types';
import { 
  Search, 
  MapPin, 
  Building2, 
  Calendar, 
  ExternalLink, 
  Briefcase, 
  DollarSign, 
  FileCheck, 
  Loader2, 
  Globe, 
  Sparkles,
  RefreshCw,
  Mail,
  ArrowLeft,
  ThumbsUp,
  AlertCircle
} from 'lucide-react';

interface JobBoardProps {
  jobs: Job[];
  cv: CV | null;
  applications: Application[];
  onApply: (job: Job) => void;
  onAddScrapedJobs?: (newJobs: Job[]) => void;
  initialCategory?: string;
  onCategoryChange?: (category: string) => void;
  initialSearchQuery?: string;
  onSearchQueryChange?: (search: string) => void;
  initialLocation?: string;
  onLocationChange?: (location: string) => void;
}

export default function JobBoard({ 
  jobs, 
  cv, 
  applications, 
  onApply,
  initialCategory = 'All',
  onCategoryChange,
  initialSearchQuery = '',
  onSearchQueryChange,
  initialLocation = 'All',
  onLocationChange
}: JobBoardProps) {
  // Filters state
  const [searchQuery, setSearchQueryState] = useState(initialSearchQuery);
  const [selectedLocation, setSelectedLocationState] = useState(initialLocation);
  const [selectedCategory, setSelectedCategoryState] = useState(initialCategory);
  const [selectedType, setSelectedType] = useState('All');

  // Sync state with incoming props
  React.useEffect(() => {
    setSearchQueryState(initialSearchQuery);
  }, [initialSearchQuery]);

  React.useEffect(() => {
    setSelectedLocationState(initialLocation);
  }, [initialLocation]);

  React.useEffect(() => {
    setSelectedCategoryState(initialCategory);
  }, [initialCategory]);

  // Wrapped state setters
  const setSearchQuery = (val: string) => {
    setSearchQueryState(val);
    if (onSearchQueryChange) onSearchQueryChange(val);
  };

  const setSelectedLocation = (val: string) => {
    setSelectedLocationState(val);
    if (onLocationChange) onLocationChange(val);
  };

  const setSelectedCategory = (val: string) => {
    setSelectedCategoryState(val);
    if (onCategoryChange) onCategoryChange(val);
  };

  // Active Job Details state
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);

  const cambodiaLocations = ['All', 'Phnom Penh', 'Siem Reap', 'Sihanoukville', 'Battambang', 'Kampot', 'Kandal'];
  const jobCategories = ['All', 'IT & Software', 'Banking & Finance', 'Marketing', 'NGO & Development', 'Hospitality', 'Admin'];

  // Filter computation
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLocation = selectedLocation === 'All' || job.location.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || job.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesType = selectedType === 'All' || job.type === selectedType;

      return matchesSearch && matchesLocation && matchesCategory && matchesType;
    });
  }, [jobs, searchQuery, selectedLocation, selectedCategory, selectedType]);

  // Submit CV application to a Job
  const handleSubmitApplication = (job: Job) => {
    setApplyingJobId(job.id);
    setTimeout(() => {
      onApply(job);
      setApplySuccess(true);
      setApplyingJobId(null);
      setTimeout(() => {
        setApplySuccess(false);
      }, 4000);
    }, 1000);
  };

  // Check if already applied to current selected job
  const hasAppliedToSelected = useMemo(() => {
    if (!selectedJob) return false;
    return applications.some(app => app.jobId === selectedJob.id);
  }, [selectedJob, applications]);

  return (
    <div className="space-y-8" id="job-board-tab">
      
      {selectedJob ? (
        /* Expanded Job Details View */
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden space-y-6">
          <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between shrink-0">
            <button 
              id="btn-back-to-jobs"
              onClick={() => setSelectedJob(null)}
              className="text-slate-600 hover:text-indigo-600 font-bold text-xs flex items-center gap-1.5 py-1.5 px-3 bg-white rounded-lg border border-slate-200 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Job Board
            </button>
            <span className="text-xs font-mono text-slate-500">Source: <b className="text-slate-700">{selectedJob.sourceName}</b></span>
          </div>

          <div className="p-6 md:p-10 space-y-8">
            {/* Main Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-700 font-bold font-display text-lg uppercase shrink-0">
                  {selectedJob.company.substring(0, 2)}
                </div>
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">{selectedJob.type}</span>
                    <span className="text-xs font-medium text-slate-500">{selectedJob.category}</span>
                  </div>
                  <h1 className="text-2xl font-bold font-display text-slate-900">{selectedJob.title}</h1>
                  <p className="text-slate-600 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      {selectedJob.company}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {selectedJob.location}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-2 shrink-0 bg-slate-50 md:bg-transparent p-4 md:p-0 rounded-2xl">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Salary Range</span>
                <span className="text-xl font-bold text-slate-800 flex items-center">
                  <DollarSign className="w-5 h-5 text-indigo-600 shrink-0" />
                  {selectedJob.salary}
                </span>
              </div>
            </div>

            {/* Description and Criteria */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-6">
                <div className="space-y-2.5">
                  <h3 className="font-bold text-slate-900 font-display text-base md:text-lg">Job / Internship Description</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{selectedJob.description}</p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-slate-900 font-display text-base md:text-lg">Job Requirements</h3>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2.5 leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0 mt-2"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-slate-900 font-display text-base md:text-lg">Benefits & Perks</h3>
                  <ul className="space-y-2">
                    {selectedJob.benefits.map((ben, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2.5 leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0 mt-2"></span>
                        {ben}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Apply / Resume Submission Column */}
              <div className="lg:col-span-4">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-6">
                  <h3 className="font-bold text-slate-900 font-display text-sm md:text-base">Apply Now</h3>

                  {cv ? (
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-xl border border-slate-200/60 text-xs space-y-2">
                        <p className="font-bold text-slate-700">Matched Resume Attached</p>
                        <p className="text-slate-500">📄 {cv.fullName}'s CV ({cv.location})</p>
                      </div>

                      {hasAppliedToSelected ? (
                        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-xs space-y-1 text-center font-semibold">
                          <ThumbsUp className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                          <span>Successfully Applied!</span>
                          <p className="text-[10px] font-normal text-emerald-600">We shared your CV with {selectedJob.company} ({selectedJob.contactEmail}).</p>
                        </div>
                      ) : (
                        <button 
                          id="btn-submit-cv-application"
                          onClick={() => handleSubmitApplication(selectedJob)}
                          disabled={applyingJobId !== null}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                        >
                          {applyingJobId === selectedJob.id ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Submitting Profile...
                            </>
                          ) : (
                            <>
                              <FileCheck className="w-4.5 h-4.5" />
                              Submit My CV Profile
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4 text-center py-2">
                      <div className="p-3 bg-amber-50 text-amber-700 rounded-xl max-w-fit mx-auto">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Please construct your professional CV profile before submitting applications. This ensures AI-powered job matches work correctly.
                      </p>
                    </div>
                  )}

                  <div className="border-t border-slate-200/50 pt-5 space-y-3.5">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Direct Employer Contact</p>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                      <a href={`mailto:${selectedJob.contactEmail}`} className="hover:underline text-indigo-600 font-semibold truncate">{selectedJob.contactEmail}</a>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
                      <a href={selectedJob.sourceUrl} target="_blank" rel="noreferrer" className="hover:underline truncate text-slate-500">View source ({selectedJob.sourceName})</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Filters and Main Grid */
        <div className="space-y-6">
          {/* Main Search Panel */}
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex flex-col md:flex-row gap-4 items-center">
            {/* Text Search input */}
            <div className="relative w-full md:flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search job title, internship position, or company in Cambodia..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-xs md:text-sm transition-all"
              />
            </div>

            {/* Location selector */}
            <div className="w-full md:w-56 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 hidden md:block" />
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-white text-xs md:text-sm transition-all"
              >
                {cambodiaLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === 'All' ? 'All Cambodia Provinces' : `${loc}, Cambodia`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Job Type Selector Tabs & Category Tabs */}
          <div className="flex flex-col gap-4">
            {/* Category selection */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5">
              {jobCategories.map((cat) => (
                <button 
                  id={`cat-btn-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${selectedCategory === cat ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'}`}
                >
                  {cat === 'All' ? 'All Industries' : cat}
                </button>
              ))}
            </div>

            {/* Work Type selection */}
            <div className="flex items-center gap-3">
              {['All', 'Full-time', 'Part-time', 'Internship', 'Contract'].map((type) => (
                <button 
                  id={`type-btn-${type.toLowerCase()}`}
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${selectedType === type ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-800 bg-slate-100'}`}
                >
                  {type}
                </button>
              ))}
              <span className="text-xs text-slate-400 ml-auto font-medium">{filteredJobs.length} matches found</span>
            </div>
          </div>

          {/* Jobs Grid */}
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredJobs.map((job) => (
                <div 
                  key={job.id} 
                  className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    {/* Upper Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-indigo-600 font-bold font-display uppercase shrink-0">
                        {job.company.substring(0, 2)}
                      </div>
                      <div className="text-right">
                        <span className="inline-block text-[11px] font-bold text-blue-600 bg-blue-50/70 px-2 py-0.5 rounded-md">
                          {job.type}
                        </span>
                        <p className="text-[10px] text-slate-400 font-medium mt-1 flex items-center gap-1 justify-end">
                          <Calendar className="w-3 h-3" />
                          {job.postedDate}
                        </p>
                      </div>
                    </div>

                    {/* Titles */}
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-display text-base leading-snug">
                        {job.title}
                      </h3>
                      <p className="text-sm text-slate-600 font-medium flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {job.company}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {job.location}
                      </p>
                    </div>

                    {/* Short requirement excerpt */}
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {job.description}
                    </p>
                  </div>

                  {/* Salary & Action button */}
                  <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                    <span className="font-mono text-xs md:text-sm font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg">
                      {job.salary}
                    </span>
                    <button 
                      id={`btn-view-job-${job.id}`}
                      onClick={() => setSelectedJob(job)}
                      className="bg-slate-900 text-white hover:bg-indigo-600 font-semibold px-4 py-2 rounded-xl text-xs transition duration-200"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-100 space-y-4">
              <div className="p-3 bg-slate-50 text-slate-400 rounded-full max-w-fit mx-auto">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 font-display">No matching positions</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  We couldn't find matches in Cambodia with your current query. Try broadening your keywords or trigger the <b>Scraper Simulator</b> above to crawl new listings!
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
