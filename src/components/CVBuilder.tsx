import React, { useState } from 'react';
import { CV } from '../types';
import { 
  Plus, 
  Trash2, 
  FileText, 
  Sparkles, 
  Download, 
  Save, 
  Check, 
  ChevronRight, 
  BookOpen, 
  Briefcase, 
  Wrench, 
  Languages, 
  AlertCircle 
} from 'lucide-react';

interface CVBuilderProps {
  initialCv: CV | null;
  onSave: (cv: CV) => void;
  onAnalyze: (cv: CV) => Promise<any>;
}

export default function CVBuilder({ initialCv, onSave, onAnalyze }: CVBuilderProps) {
  // Local state for CV form
  const [fullName, setFullName] = useState(initialCv?.fullName || '');
  const [email, setEmail] = useState(initialCv?.email || '');
  const [phone, setPhone] = useState(initialCv?.phone || '');
  const [location, setLocation] = useState(initialCv?.location || 'Phnom Penh');
  const [about, setAbout] = useState(initialCv?.about || '');
  
  // Education state
  const [education, setEducation] = useState(initialCv?.education || [
    { school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '' }
  ]);

  // Experience state
  const [experience, setExperience] = useState(initialCv?.experience || [
    { company: '', position: '', startDate: '', endDate: '', current: false, description: '' }
  ]);

  // Skills tags
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>(initialCv?.skills || ['Communication', 'Microsoft Office']);

  // Languages state
  const [languages, setLanguages] = useState<Array<{ name: string; level: 'Native' | 'Fluent' | 'Intermediate' | 'Basic' }>>(
    initialCv?.languages || [
      { name: 'Khmer', level: 'Native' },
      { name: 'English', level: 'Intermediate' }
    ]
  );

  // UI state
  const [activeStep, setActiveStep] = useState<'personal' | 'education' | 'experience' | 'skills_languages'>('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Location suggestions
  const cambodiaLocations = [
    'Phnom Penh', 'Siem Reap', 'Sihanoukville', 'Battambang', 'Kampot', 'Kandal', 'Kep', 'Poipet', 'Banteay Meanchey'
  ];

  // Handlers for dynamic lists
  const handleAddEducation = () => {
    setEducation([...education, { school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '' }]);
  };

  const handleRemoveEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    setEducation(updated);
  };

  const handleAddExperience = () => {
    setExperience([...experience, { company: '', position: '', startDate: '', endDate: '', current: false, description: '' }]);
  };

  const handleRemoveExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const handleExperienceChange = (index: number, field: string, value: any) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    setExperience(updated);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (tag: string) => {
    setSkills(skills.filter(s => s !== tag));
  };

  const handleAddLanguage = () => {
    setLanguages([...languages, { name: '', level: 'Basic' }]);
  };

  const handleRemoveLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const handleLanguageChange = (index: number, field: string, value: string) => {
    const updated = [...languages];
    updated[index] = { ...updated[index], [field]: value } as any;
    setLanguages(updated);
  };

  // Compile full CV object
  const getCompiledCV = (): CV => ({
    fullName,
    email,
    phone,
    location,
    about,
    education: education.filter(e => e.school),
    experience: experience.filter(exp => exp.company),
    skills,
    languages: languages.filter(l => l.name)
  });

  const handleSaveCV = () => {
    setIsSaving(true);
    const cvData = getCompiledCV();
    onSave(cvData);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  const handleAnalyzeCV = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      const cvData = getCompiledCV();
      const result = await onAnalyze(cvData);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="cv-builder-tab">
      {/* Form Area - 7 columns */}
      <div className="lg:col-span-7 space-y-6">
        {/* Navigation Steps */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-wrap gap-2 md:justify-between">
          <button 
            id="step-personal"
            onClick={() => setActiveStep('personal')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs md:text-sm transition-all duration-200 ${activeStep === 'personal' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <FileText className="w-4 h-4" />
            Personal
          </button>
          <button 
            id="step-education"
            onClick={() => setActiveStep('education')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs md:text-sm transition-all duration-200 ${activeStep === 'education' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <BookOpen className="w-4 h-4" />
            Education
          </button>
          <button 
            id="step-experience"
            onClick={() => setActiveStep('experience')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs md:text-sm transition-all duration-200 ${activeStep === 'experience' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Briefcase className="w-4 h-4" />
            Experience
          </button>
          <button 
            id="step-skills"
            onClick={() => setActiveStep('skills_languages')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs md:text-sm transition-all duration-200 ${activeStep === 'skills_languages' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Wrench className="w-4 h-4" />
            Skills & Languages
          </button>
        </div>

        {/* Step Contents */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          {activeStep === 'personal' && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold font-display text-slate-900 border-b pb-3 border-slate-100">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Sophy Chann"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="e.g. sophy.chann@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="e.g. +855 12 345 678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700">Location (City/Province)</label>
                  <select 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white transition text-sm"
                  >
                    {cambodiaLocations.map((loc) => (
                      <option key={loc} value={loc}>{loc}, Cambodia</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700">Professional Summary / About Me</label>
                <textarea 
                  rows={4}
                  placeholder="Introduce yourself. Highlight your primary career aspirations, key training, or internship expectations in Cambodia."
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition text-sm resize-none"
                />
              </div>
              <div className="flex justify-end pt-2">
                <button 
                  id="btn-goto-education"
                  onClick={() => setActiveStep('education')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl text-sm flex items-center gap-1.5 transition"
                >
                  Continue to Education
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {activeStep === 'education' && (
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                <h2 className="text-xl font-bold font-display text-slate-900">Education Details</h2>
                <button 
                  id="btn-add-edu"
                  onClick={handleAddEducation}
                  className="text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Education
                </button>
              </div>

              {education.map((edu, idx) => (
                <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 relative">
                  {education.length > 1 && (
                    <button 
                      id={`btn-remove-edu-${idx}`}
                      onClick={() => handleRemoveEducation(idx)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Education #{idx + 1}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700">School / University</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Royal University of Phnom Penh (RUPP)"
                        value={edu.school}
                        onChange={(e) => handleEducationChange(idx, 'school', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none bg-white transition text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700">Degree / Certificate</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Bachelor of Science"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(idx, 'degree', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none bg-white transition text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700">Field of Study</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Computer Science"
                        value={edu.fieldOfStudy}
                        onChange={(e) => handleEducationChange(idx, 'fieldOfStudy', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none bg-white transition text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-700">Start Date</label>
                        <input 
                          type="text" 
                          placeholder="YYYY"
                          value={edu.startDate}
                          onChange={(e) => handleEducationChange(idx, 'startDate', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none bg-white transition text-xs"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-700">End Date (or Expected)</label>
                        <input 
                          type="text" 
                          placeholder="YYYY"
                          value={edu.endDate}
                          onChange={(e) => handleEducationChange(idx, 'endDate', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none bg-white transition text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between pt-2">
                <button 
                  id="btn-back-personal"
                  onClick={() => setActiveStep('personal')}
                  className="text-slate-600 hover:bg-slate-50 border border-slate-200 font-medium px-5 py-2.5 rounded-xl text-sm transition"
                >
                  Back
                </button>
                <button 
                  id="btn-goto-experience"
                  onClick={() => setActiveStep('experience')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl text-sm flex items-center gap-1.5 transition"
                >
                  Continue to Experience
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {activeStep === 'experience' && (
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                <h2 className="text-xl font-bold font-display text-slate-900">Work & Internship Experience</h2>
                <button 
                  id="btn-add-exp"
                  onClick={handleAddExperience}
                  className="text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Experience
                </button>
              </div>

              {experience.map((exp, idx) => (
                <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 relative">
                  {experience.length > 1 && (
                    <button 
                      id={`btn-remove-exp-${idx}`}
                      onClick={() => handleRemoveExperience(idx)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Experience #{idx + 1}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700">Company Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. ABA Bank / Smart Axiata"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(idx, 'company', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none bg-white transition text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700">Job / Internship Position</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Junior Mobile Developer Intern"
                        value={exp.position}
                        onChange={(e) => handleExperienceChange(idx, 'position', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none bg-white transition text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-700">Start Date</label>
                        <input 
                          type="text" 
                          placeholder="Month YYYY"
                          value={exp.startDate}
                          onChange={(e) => handleExperienceChange(idx, 'startDate', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none bg-white transition text-xs"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-700">End Date</label>
                        <input 
                          type="text" 
                          placeholder={exp.current ? 'Present' : 'Month YYYY'}
                          disabled={exp.current}
                          value={exp.endDate}
                          onChange={(e) => handleExperienceChange(idx, 'endDate', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none bg-white transition text-xs disabled:bg-slate-100 disabled:text-slate-400"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-6">
                      <input 
                        type="checkbox" 
                        id={`current-job-${idx}`}
                        checked={exp.current}
                        onChange={(e) => handleExperienceChange(idx, 'current', e.target.checked)}
                        className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor={`current-job-${idx}`} className="text-xs font-semibold text-slate-700 cursor-pointer">I am currently working here</label>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700">Description of Responsibilities</label>
                    <textarea 
                      rows={3}
                      placeholder="e.g. Developed and styled web interfaces using Tailwind CSS. Collaborated on mobile system enhancements."
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(idx, 'description', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none bg-white transition text-xs resize-none"
                    />
                  </div>
                </div>
              ))}

              <div className="flex justify-between pt-2">
                <button 
                  id="btn-back-education"
                  onClick={() => setActiveStep('education')}
                  className="text-slate-600 hover:bg-slate-50 border border-slate-200 font-medium px-5 py-2.5 rounded-xl text-sm transition"
                >
                  Back
                </button>
                <button 
                  id="btn-goto-skills"
                  onClick={() => setActiveStep('skills_languages')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl text-sm flex items-center gap-1.5 transition"
                >
                  Continue to Skills & Languages
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {activeStep === 'skills_languages' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold font-display text-slate-900 border-b pb-3 border-slate-100">Skills & Languages</h2>
              
              {/* Skills section */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-700">Skills / Expertise Tags</label>
                <form onSubmit={handleAddSkill} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g. React, UI/UX Design, Financial Analysis"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none text-sm transition"
                  />
                  <button 
                    id="btn-add-skill-tag"
                    type="submit"
                    className="bg-slate-800 hover:bg-slate-950 text-white px-4 rounded-xl text-sm font-semibold transition"
                  >
                    Add
                  </button>
                </form>
                <div className="flex flex-wrap gap-2 pt-1.5">
                  {skills.map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 font-medium px-3 py-1 rounded-full text-xs"
                    >
                      {tag}
                      <button 
                        id={`btn-remove-skill-${tag}`}
                        type="button" 
                        onClick={() => handleRemoveSkill(tag)}
                        className="text-slate-400 hover:text-slate-600 transition"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages section */}
              <div className="space-y-3">
                <div className="flex justify-between items-center pt-2">
                  <label className="text-xs font-semibold text-slate-700">Languages Known</label>
                  <button 
                    id="btn-add-lang"
                    type="button"
                    onClick={handleAddLanguage}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Language
                  </button>
                </div>

                <div className="space-y-3">
                  {languages.map((lang, idx) => (
                    <div key={idx} className="flex gap-3 items-center">
                      <input 
                        type="text" 
                        placeholder="e.g. English, Chinese, French"
                        value={lang.name}
                        onChange={(e) => handleLanguageChange(idx, 'name', e.target.value)}
                        className="flex-1 px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none text-sm transition"
                      />
                      <select 
                        value={lang.level}
                        onChange={(e) => handleLanguageChange(idx, 'level', e.target.value)}
                        className="px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none bg-white text-sm transition"
                      >
                        <option value="Native">Native</option>
                        <option value="Fluent">Fluent</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Basic">Basic</option>
                      </select>
                      {languages.length > 1 && (
                        <button 
                          id={`btn-remove-lang-${idx}`}
                          type="button"
                          onClick={() => handleRemoveLanguage(idx)}
                          className="text-slate-400 hover:text-red-500 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-100">
                <button 
                  id="btn-back-experience"
                  onClick={() => setActiveStep('experience')}
                  className="text-slate-600 hover:bg-slate-50 border border-slate-200 font-medium px-5 py-2.5 rounded-xl text-sm transition"
                >
                  Back
                </button>
                <div className="flex gap-2">
                  <button 
                    id="btn-analyze-cv"
                    onClick={handleAnalyzeCV}
                    disabled={isAnalyzing || !fullName}
                    className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 disabled:opacity-55 font-semibold px-5 py-2.5 rounded-xl text-sm flex items-center gap-1.5 transition shadow-xs"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    {isAnalyzing ? 'Analyzing...' : 'AI Insights'}
                  </button>
                  <button 
                    id="btn-save-cv"
                    onClick={handleSaveCV}
                    disabled={isSaving || !fullName}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl text-sm flex items-center gap-1.5 transition shadow-sm"
                  >
                    {saveSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        {isSaving ? 'Saving...' : 'Save Profile'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview and AI analysis - 5 columns */}
      <div className="lg:col-span-5 space-y-6">
        {/* AI Insight Section */}
        {analysisResult && (
          <div className="bg-gradient-to-br from-indigo-900 to-slate-950 text-white p-6 rounded-3xl border border-indigo-900 shadow-lg space-y-5">
            <div className="flex items-center justify-between border-b border-indigo-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold font-display text-lg">Sovan's CV Audit</h3>
              </div>
              <div className="flex items-center gap-1.5 bg-indigo-500/30 px-3 py-1 rounded-full">
                <span className="text-xs font-medium text-slate-300">CV Score:</span>
                <span className="text-sm font-bold text-amber-300">{analysisResult.score}/100</span>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="space-y-1.5">
                <p className="font-bold text-amber-400 text-xs uppercase tracking-wider">Cambodian Market Fit</p>
                <p className="text-slate-300 leading-relaxed text-xs">{analysisResult.marketInsight}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <p className="font-bold text-emerald-400 text-xs uppercase tracking-wider">Strengths</p>
                  <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                    {analysisResult.strengths?.slice(0, 3).map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-1.5">
                  <p className="font-bold text-rose-400 text-xs uppercase tracking-wider">Suggested Actions</p>
                  <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                    {analysisResult.improvements?.slice(0, 3).map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-1.5 border-t border-indigo-900/50 pt-3">
                <p className="font-bold text-indigo-400 text-xs uppercase tracking-wider">Suggested Roles in Cambodia</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {analysisResult.suggestedRoles?.map((role: string, idx: number) => (
                    <span key={idx} className="bg-indigo-800/60 px-2.5 py-1 rounded-lg text-[11px] font-semibold">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live CV Interactive Preview */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[560px]">
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center shrink-0">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-600" />
              Live CV Preview
            </span>
            <button 
              id="btn-print-cv"
              onClick={() => window.print()}
              className="text-xs font-semibold text-slate-600 hover:text-slate-800 flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition"
            >
              <Download className="w-3.5 h-3.5" />
              Print / Export
            </button>
          </div>

          <div className="p-6 md:p-8 overflow-y-auto flex-1 font-sans text-slate-800 text-xs leading-relaxed space-y-6" id="cv-print-area">
            {/* Header */}
            <div className="text-center space-y-2 border-b pb-5 border-slate-100">
              <h3 className="text-xl font-bold font-display text-slate-900 uppercase tracking-wide">
                {fullName || 'Your Name'}
              </h3>
              <p className="text-slate-500 flex flex-wrap justify-center gap-x-3 gap-y-1">
                <span>{email || 'your.email@example.com'}</span>
                <span>•</span>
                <span>{phone || '+855 12 345 678'}</span>
                <span>•</span>
                <span>{location}, Cambodia</span>
              </p>
            </div>

            {/* Profile Summary */}
            {about && (
              <div className="space-y-2">
                <h4 className="font-bold font-display text-slate-900 uppercase tracking-wider border-b pb-1 text-sm">Professional Summary</h4>
                <p className="text-slate-600 leading-relaxed">{about}</p>
              </div>
            )}

            {/* Experience */}
            <div className="space-y-3">
              <h4 className="font-bold font-display text-slate-900 uppercase tracking-wider border-b pb-1 text-sm">Experience</h4>
              {experience.some(exp => exp.company) ? (
                <div className="space-y-4">
                  {experience.filter(exp => exp.company).map((exp, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{exp.position || 'Position Name'}</span>
                        <span className="text-slate-500 font-normal">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                      </div>
                      <p className="font-semibold text-indigo-700">{exp.company}</p>
                      <p className="text-slate-600 text-[11px] whitespace-pre-line">{exp.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 italic">No experience points added yet.</p>
              )}
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h4 className="font-bold font-display text-slate-900 uppercase tracking-wider border-b pb-1 text-sm">Education</h4>
              {education.some(edu => edu.school) ? (
                <div className="space-y-4">
                  {education.filter(edu => edu.school).map((edu, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{edu.degree || 'Degree'} in {edu.fieldOfStudy || 'Field of study'}</span>
                        <span className="text-slate-500 font-normal">{edu.startDate} - {edu.endDate}</span>
                      </div>
                      <p className="font-semibold text-slate-600">{edu.school}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 italic">No education history added yet.</p>
              )}
            </div>

            {/* Skills & Languages */}
            <div className="grid grid-cols-2 gap-4 border-t pt-4 border-slate-100">
              <div className="space-y-2">
                <h4 className="font-bold font-display text-slate-900 uppercase tracking-wider border-b pb-1 text-xs">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {skills.map((skill) => (
                    <span key={skill} className="bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-sm font-medium text-[10px]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold font-display text-slate-900 uppercase tracking-wider border-b pb-1 text-xs">Languages</h4>
                <div className="space-y-1">
                  {languages.filter(l => l.name).map((lang, idx) => (
                    <div key={idx} className="flex justify-between text-[11px]">
                      <span className="font-semibold text-slate-700">{lang.name}</span>
                      <span className="text-slate-500">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
