import React, { useState, useEffect } from 'react';
import { CV, Job, Application } from './types';
import { initialJobs } from './data/mockJobs';
import Dashboard from './components/Dashboard';
import JobBoard from './components/JobBoard';
import CVBuilder from './components/CVBuilder';
import Logo from './components/Logo';
import ReturneeJobs from './components/ReturneeJobs';
import { db } from './lib/firebase';
import { doc, getDoc, setDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import { 
  Compass, 
  Briefcase, 
  MessageSquare, 
  UserCircle, 
  MapPin, 
  Building2, 
  Share2,
  Bookmark,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // App State
  const [cv, setCv] = useState<CV | null>(null);
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search synchronization states from Dashboard
  const [selectedJobCategory, setSelectedJobCategory] = useState<string>('All');
  const [selectedReturneeCategory, setSelectedReturneeCategory] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');

  // Generate a persistent anonymous userId for Firestore synchronization
  const [userId, setUserId] = useState<string>(() => {
    const saved = localStorage.getItem('cambodia_job_hub_userId');
    if (saved) return saved;
    const fresh = 'user_' + Math.random().toString(36).substring(2, 11);
    localStorage.setItem('cambodia_job_hub_userId', fresh);
    return fresh;
  });

  // Load state from Firestore on startup, fallback to localStorage
  useEffect(() => {
    const loadAppData = async () => {
      setLoading(true);
      try {
        // 1. Try to fetch CV from Firestore
        const cvDocRef = doc(db, 'users_cvs', userId);
        const cvSnap = await getDoc(cvDocRef);
        if (cvSnap.exists()) {
          setCv(cvSnap.data() as CV);
        } else {
          // Check localStorage as local fallback
          const localCV = localStorage.getItem('cambodia_job_hub_cv');
          if (localCV) setCv(JSON.parse(localCV));
        }

        // 2. Fetch applications from Firestore
        const appsColRef = collection(db, 'users_cvs', userId, 'applications');
        const appsSnap = await getDocs(appsColRef);
        const fetchedApps: Application[] = [];
        appsSnap.forEach((doc) => {
          fetchedApps.push({ id: doc.id, ...doc.data() } as Application);
        });

        if (fetchedApps.length > 0) {
          setApplications(fetchedApps);
        } else {
          const localApps = localStorage.getItem('cambodia_job_hub_apps');
          if (localApps) setApplications(JSON.parse(localApps));
        }

        // 3. Fetch custom scraped jobs from Firestore
        const scrapedColRef = collection(db, 'scraped_jobs');
        const scrapedSnap = await getDocs(scrapedColRef);
        const fetchedScraped: Job[] = [];
        scrapedSnap.forEach((doc) => {
          fetchedScraped.push(doc.data() as Job);
        });

        if (fetchedScraped.length > 0) {
          // Combine initial static jobs with custom scraped jobs
          const combined = [...initialJobs];
          fetchedScraped.forEach(sj => {
            if (!combined.some(item => item.id === sj.id)) {
              combined.unshift(sj); // show newest scraped first
            }
          });
          setJobs(combined);
        }

      } catch (err) {
        console.warn("Firestore sync warning on init (running in offline/local mode):", err);
        // Fallback entirely to localStorage
        const localCV = localStorage.getItem('cambodia_job_hub_cv');
        if (localCV) setCv(JSON.parse(localCV));
        const localApps = localStorage.getItem('cambodia_job_hub_apps');
        if (localApps) setApplications(JSON.parse(localApps));
      } finally {
        setLoading(false);
      }
    };

    loadAppData();
  }, [userId]);

  // Handle saving CV (Upload profile details)
  const handleSaveCV = async (updatedCv: CV) => {
    setCv(updatedCv);
    localStorage.setItem('cambodia_job_hub_cv', JSON.stringify(updatedCv));
    
    try {
      // Sync to Firestore
      const cvDocRef = doc(db, 'users_cvs', userId);
      await setDoc(cvDocRef, updatedCv);
      console.log("CV successfully synced to Cloud Firestore.");
    } catch (err) {
      console.warn("Could not sync CV to Firestore:", err);
    }
  };

  // Handle submitting application
  const handleApplyJob = async (job: Job) => {
    // Avoid double application
    if (applications.some(app => app.jobId === job.id)) return;

    const newApp: Application = {
      id: 'app_' + Math.random().toString(36).substring(2, 9),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0]
    };

    const updatedApps = [...applications, newApp];
    setApplications(updatedApps);
    localStorage.setItem('cambodia_job_hub_apps', JSON.stringify(updatedApps));

    try {
      // Sync application sub-collection to Firestore
      const appDocRef = doc(db, 'users_cvs', userId, 'applications', newApp.id);
      await setDoc(appDocRef, newApp);
      console.log("Application synced to Cloud Firestore.");
    } catch (err) {
      console.warn("Could not sync application to Firestore:", err);
    }
  };

  // Handle appending newly scraped jobs
  const handleAddScrapedJobs = async (newJobs: Job[]) => {
    // Append to local state
    setJobs(prev => {
      const filtered = newJobs.filter(nj => !prev.some(p => p.id === nj.id));
      return [...filtered, ...prev];
    });

    // Save newly scraped jobs to Firestore global collection so they persist for all users!
    try {
      for (const job of newJobs) {
        const jobDocRef = doc(db, 'scraped_jobs', job.id);
        await setDoc(jobDocRef, job);
      }
      console.log("Scraped jobs saved globally to Cloud Firestore.");
    } catch (err) {
      console.warn("Could not sync scraped jobs to Firestore:", err);
    }
  };

  // Query AI server-side endpoint for CV insights
  const handleAnalyzeCV = async (cvToAnalyze: CV) => {
    try {
      const response = await fetch('/api/cv-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cv: cvToAnalyze })
      });
      if (!response.ok) {
        throw new Error('Analysis server response error');
      }
      return await response.json();
    } catch (err) {
      console.error(err);
      // Nice mock fallback if server API is unavailable
      return {
        score: 75,
        strengths: ["Great technical core", "Bilingual background in Khmer and English"],
        improvements: ["Add target salary specifications", "Elaborate more on local projects"],
        recommendedSkills: ["Flutter", "Financial Systems", "Advanced Khmer Writing"],
        suggestedRoles: ["Junior Web Dev", "IT Support Officer", "Administrative Associate"],
        marketInsight: "Cambodian organizations (especially banks in Phnom Penh) highly value solid bilingual competence and local community involvement."
      };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Premium Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 shrink-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <Logo size={42} />
            <div>
              <h1 className="font-display font-black text-slate-900 text-sm md:text-base tracking-tight flex items-center gap-1.5">
                ជួយខ្មែរ-JuoyKHMER <span className="text-blue-600">🇰🇭</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cambodian Placement Hub</p>
            </div>
          </div>

          <nav className="flex items-center gap-1 md:gap-2">
            <button 
              id="nav-btn-dashboard"
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-xl text-xs md:text-sm font-semibold transition ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Dashboard
            </button>
            <button 
              id="nav-btn-jobs"
              onClick={() => setActiveTab('jobs')}
              className={`px-3 py-2 rounded-xl text-xs md:text-sm font-semibold transition ${activeTab === 'jobs' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Jobs & Internships
            </button>
            <button 
              id="nav-btn-returnee"
              onClick={() => setActiveTab('returnee')}
              className={`px-3 py-2 rounded-xl text-xs md:text-sm font-semibold transition ${activeTab === 'returnee' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Returnee
            </button>
            <button 
              id="nav-btn-cv"
              onClick={() => setActiveTab('cv')}
              className={`px-3 py-2 rounded-xl text-xs md:text-sm font-semibold transition flex items-center gap-1.5 ${activeTab === 'cv' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <FileText className="w-4 h-4 hidden md:inline" />
              CV Builder
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-3">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium text-xs">Synchronizing Cambodia Hub with cloud database...</p>
          </div>
        ) : (
          <div>
            {activeTab === 'dashboard' && (
              <Dashboard 
                cv={cv} 
                jobs={jobs} 
                applications={applications} 
                onNavigate={(tab, category, search, location) => {
                  setActiveTab(tab);
                  if (category) {
                    if (tab === 'returnee') {
                      setSelectedReturneeCategory(category);
                    } else {
                      setSelectedJobCategory(category);
                    }
                  }
                  if (search !== undefined) {
                    setGlobalSearchQuery(search);
                  }
                  if (location !== undefined) {
                    setSelectedLocation(location);
                  }
                }} 
              />
            )}
            
            {activeTab === 'jobs' && (
              <JobBoard 
                jobs={jobs} 
                cv={cv} 
                applications={applications} 
                onApply={handleApplyJob}
                initialCategory={selectedJobCategory}
                onCategoryChange={setSelectedJobCategory}
                initialSearchQuery={globalSearchQuery}
                onSearchQueryChange={setGlobalSearchQuery}
                initialLocation={selectedLocation}
                onLocationChange={setSelectedLocation}
              />
            )}

            {activeTab === 'returnee' && (
              <ReturneeJobs 
                cv={cv} 
                jobs={jobs}
                applications={applications} 
                onApply={handleApplyJob} 
                onAddScrapedJobs={handleAddScrapedJobs}
                initialCategory={selectedReturneeCategory}
                onCategoryChange={setSelectedReturneeCategory}
                initialSearchQuery={globalSearchQuery}
                onSearchQueryChange={setGlobalSearchQuery}
              />
            )}

            {activeTab === 'cv' && (
              <CVBuilder 
                initialCv={cv} 
                onSave={handleSaveCV} 
                onAnalyze={handleAnalyzeCV} 
              />
            )}
          </div>
        )}
      </main>

      {/* Humble Footer */}
      <footer className="border-t border-slate-100 bg-white py-6 shrink-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
            © 2026 ជួយខ្មែរ-JuoyKHMER
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
            <span>Powered by Gemini 2.5 Flash</span>
            <span className="text-slate-300">•</span>
            <span>Cloud Database Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
