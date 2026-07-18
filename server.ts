import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for JSON parsing
app.use(express.json());

// Initialize Google Gen AI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
} else {
  console.warn("WARNING: GEMINI_API_KEY is not defined. AI features will run in mock mode.");
}

// Helper to invoke Gemini
async function callGemini(systemInstruction: string, prompt: string, responseSchema?: any) {
  if (!ai) {
    throw new Error("Gemini API Client is not initialized. Please configure GEMINI_API_KEY.");
  }

  const model = "gemini-2.5-flash";
  const options: any = {
    model,
    contents: prompt,
    config: {
      systemInstruction,
    }
  };

  if (responseSchema) {
    options.config.responseMimeType = "application/json";
    options.config.responseSchema = responseSchema;
  }

  const response = await ai.models.generateContent(options);
  return response.text;
}

// Mock Fallback generators for offline/simulated mode
function getMockChatResponse(historyPrompt: string): string {
  const prompt = historyPrompt.toLowerCase();
  let response = "Suesdey! I'm Coach Sovan, your Cambodian Career Guide. Here is standard, tailored career advice for Cambodia:\n\n";
  if (prompt.includes("driver") || prompt.includes("truck") || prompt.includes("delivery") || prompt.includes("returnee")) {
    response += "### Returnee & Vocational Job Guidance in Cambodia\n" +
      "For vocational jobs (truck driving, express delivery, cleaning, kitchen assistant, security guards, babysitting, and construction):\n" +
      "1. **No Higher Education Needed**: These roles specifically require **high school equivalent or below** (or no formal education at all).\n" +
      "2. **Core Requirements**: Reliability, physical stamina, a polite customer-oriented attitude, and a clean security/safety record.\n" +
      "3. **Top Benefits**: Secure NSSF insurance cards, free on-site accommodation camps, meal allowance, and double-time pay on public holidays.\n" +
      "4. **Action Step**: Go to the **Returnee** tab on the navigation bar to apply directly or call the 24/7 hotline!";
  } else if (prompt.includes("it") || prompt.includes("software") || prompt.includes("developer") || prompt.includes("intern") || prompt.includes("qa") || prompt.includes("coding")) {
    response += "### IT & Software Internships in Phnom Penh\n" +
      "- **Top Companies**: Pathmazing, Sabaicode, Smart Axiata, Wing, Cellcard, Mango Byte, and foreign development firms.\n" +
      "- **Valued Skills**: React, Flutter (highly popular for mobile banking apps), Node.js, and general problem-solving.\n" +
      "- **Salary Expectations**: Internships usually pay $150 to $250/month. Junior developers start around $400 to $700/month.\n" +
      "- **CV Tip**: Highlight your project portfolios, GitHub links, and any team projects from your school/university.";
  } else if (prompt.includes("bank") || prompt.includes("aba") || prompt.includes("acleda") || prompt.includes("finance") || prompt.includes("sathapana") || prompt.includes("amret")) {
    response += "### Banking & Finance Careers in Cambodia\n" +
      "- **Major Financial Institutions**: ABA Bank, ACLEDA, Canadia, Wing Bank, Sathapana Bank, and Amret.\n" +
      "- **Common Entry Roles**: Teller, Customer Service Representative, Credit Officer, and IT Support.\n" +
      "- **Formatting Tip**: Make sure to have a formal, passport-style photo with a solid background on your CV, as Cambodian banks value clean, professional presentations.";
  } else if (prompt.includes("salary") || prompt.includes("pay") || prompt.includes("earn")) {
    response += "### Average Starting Salaries in Cambodia (2026/2027)\n" +
      "- **Vocational / Driver / Security**: $200 - $350 / Month + housing/meals\n" +
      "- **Software Dev Intern**: $150 - $250 / Month\n" +
      "- **Junior Web Developer**: $400 - $800 / Month\n" +
      "- **Marketing Intern / Assistant**: $150 - $300 / Month\n" +
      "- **Bilingual NGO Coordinator**: $450 - $800 / Month depending on organization size.";
  } else {
    response += "### General Career Coaching Advice\n" +
      "- **Complete Your CV**: Tap on the **CV Builder** tab to create your professional profile. Once completed, I can read your skills and analyze your market fit directly.\n" +
      "- **Explore Jobs**: Visit the **Jobs & Internships** or **Returnee** tabs to find actual open positions matched with contact emails and direct phone numbers.\n" +
      "- Let me know if you want to discuss resume writing, starting salaries, or mock interview questions!";
  }
  return response;
}

function getMockCvAnalysis(cv: any) {
  return {
    score: 75,
    strengths: [
      "Bilingual proficiency in Khmer and English",
      cv && cv.skills && cv.skills.length > 0 ? `Explicit skills listed: ${cv.skills.slice(0, 3).join(", ")}` : "Clear statement of skills",
      cv && cv.education ? "Solid educational background details" : "Completed primary or secondary education foundation"
    ],
    improvements: [
      "Add a professional passport-style photo if applying to Cambodian banking/corporate sectors",
      "Explicitly mention any specific driving licenses or vocational certificates if seeking vocational roles",
      "List past projects or practical experience with tools/machines used"
    ],
    recommendedSkills: [
      "English or Thai communication",
      "Basic customer handling & communication",
      "Safety regulations & emergency response"
    ],
    suggestedRoles: [
      "Logistics Coordinator / Delivery Driver",
      "Bilingual Customer Service Specialist",
      "Office Administrator or Kitchen Supervisor"
    ],
    marketInsight: "Cambodian employers are increasingly valuing bi-lingual candidates and those with certified vocational skills (like heavy machinery operating, hospitality customer care, or technical certifications)."
  };
}

function getMockScrapedReturneeJobs(url: string, category: string): any[] {
  return [
    {
      id: "scraped-ret-" + Math.random().toString(36).substring(2, 7),
      title: "Airport Luggage Handler (បុគ្គលិកលើកដាក់ឥវ៉ាន់ព្រលានយន្តហោះ)",
      company: "Cambodia Airports (SCA)",
      location: "Phnom Penh International Airport, Cambodia",
      type: "Full-time",
      category: "Cleaner",
      salary: "$280 - $380 / Month",
      postedDate: new Date().toISOString().split('T')[0],
      description: "Safely handle, sort, load, and unload passenger luggage to and from aircraft luggage compartment. Operate basic electric baggage carts.",
      requirements: [
        "Education: High school equivalent or below (ក្រោមកម្រិតមធ្យមសិក្សាទុតិយភូមិ)",
        "Strong physical fitness, stamina, and ability to lift heavy luggage",
        "Punctual and highly disciplined regarding safety protocols",
        "Willingness to work in rotating day/night shifts"
      ],
      benefits: [
        "NSSF accident & health insurance fully covered",
        "Free uniforms, safety boots, and high-visibility jackets",
        "Shift meals provided and transportation allowance",
        "Monthly attendance bonus ($20)"
      ],
      sourceUrl: url || "https://www.bongthom.com/jobs/sca-baggage",
      sourceName: "BongThom",
      contactEmail: "recruitment.pnh@cambodia-airports.aero"
    },
    {
      id: "scraped-ret-" + Math.random().toString(36).substring(2, 7),
      title: "Warehouse Sorting Staff (បុគ្គលិករៀបចំ និងលំដាប់ទំនិញ)",
      company: "J&T Express Cambodia",
      location: "Phnom Penh (National Road 4), Cambodia",
      type: "Full-time",
      category: "Cleaner",
      salary: "$240 - $320 / Month",
      postedDate: new Date().toISOString().split('T')[0],
      description: "Unpack inbound shipping parcels, scan barcode tags, and sort packages into respective provincial distribution bags for delivery riders.",
      requirements: [
        "Education: Primary school completed or equivalent (កម្រិតបឋមសិក្សា ឬក្រោម)",
        "Basic computer typing or barcode scanner literacy (training provided)",
        "Careful, rapid, and detail-oriented worker",
        "Active and honest background"
      ],
      benefits: [
        "Free modern dormitory lodging near National Road 4",
        "Full NSSF health insurance card coverage",
        "Overtime salary (1.5x on normal days, 2x on Sundays)",
        "Free company t-shirts and safety gear"
      ],
      sourceUrl: url || "https://www.camhr.com/jobs/jt-sorting-staff",
      sourceName: "CamHR",
      contactEmail: "careers@jt-express.com.kh"
    },
    {
      id: "scraped-ret-" + Math.random().toString(36).substring(2, 7),
      title: "Eco-Resort Gardener & Groundkeeper (បុគ្គលិកថែសួន និងបរិស្ថាន)",
      company: "Shinta Mani Angkor Resort",
      location: "Siem Reap (Riverside), Cambodia",
      type: "Full-time",
      category: "Cleaner",
      salary: "$220 - $300 / Month",
      postedDate: new Date().toISOString().split('T')[0],
      description: "Maintain grass lawns, trim decorative trees, nurture flowers, clean swimming pool leaves, and ensure the boutique hotel grounds look pristine.",
      requirements: [
        "Education: No formal education required (មិនតម្រូវឱ្យមានសញ្ញាបត្រ)",
        "Previous basic gardening or farming experience",
        "Deep love for nature, plants, and working outdoors",
        "Reliable, honest, and hardworking character"
      ],
      benefits: [
        "Shared service charge tips ($40 - $80/month additional)",
        "Two free meals per day at staff cafeteria",
        "Uniforms provided and laundered by hotel",
        "Public holiday premium pay"
      ],
      sourceUrl: url || "https://www.pelprek.com/jobs/shintamani-gardener",
      sourceName: "Pelprek",
      contactEmail: "careers.sr@shintamani.com"
    }
  ];
}

// 1. API: AI Chat Coach
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, userProfile } = req.body;
    
    // Format chat history for prompt
    const historyPrompt = messages ? messages.map((m: any) => `${m.role === 'user' ? 'User' : 'Coach Sovan'}: ${m.content}`).join("\n") + "\nCoach Sovan:" : "Suesdey!";

    if (!ai) {
      const responseText = getMockChatResponse(historyPrompt);
      return res.json({ content: responseText });
    }

    const systemInstruction = `You are "Sovan", a professional Cambodian Career Coach & Internship Expert.
Your purpose is to help job seekers, students, and fresh graduates in Cambodia find internships, draft CVs, prepare for interviews, and understand the local job market.

Local Market Context:
- Main job websites in Cambodia: BongThom.com, CamHR.com, Pelprek.com, Anakut, LinkedIn, and Telegram channels.
- Key employment hubs: Phnom Penh, Siem Reap, Sihanoukville, Battambang.
- High-demand sectors: IT (Software Dev, Cybersecurity, IT Support), Banking & Finance (ABA Bank, Canadia, ACLEDA, Sathapana, Amret), NGO/Development (UN, USAID, World Vision, local NGOs), Marketing & Hospitality (Tourism in Siem Reap).
- Average salary expectations: Internships ($100-$250/mo), Fresh Graduates ($250-$450/mo), Junior Devs ($400-$800/mo), Mid-level ($800-$1500/mo).

User Context:
${userProfile ? JSON.stringify(userProfile) : "No CV created yet. Advise them to fill out the CV Builder to get personalized advice."}

Tone: Friendly, highly encouraging, structured, practical, and tailored to the Cambodian context. Write in clean Markdown. You can occasionally use Khmer greetings like "Choum Reap Sour" or "Suesdey" to add warm local flavor.`;

    const aiResponse = await callGemini(systemInstruction, historyPrompt);
    res.json({ content: aiResponse });
  } catch (error: any) {
    console.warn("AI Chat request fallback activated (rate-limit or pending config):", error.message || error);
    // Fall back to a beautiful mock response
    const lastMessage = req.body.messages ? req.body.messages[req.body.messages.length - 1]?.content : "Suesdey!";
    const responseText = getMockChatResponse(lastMessage);
    res.json({ content: responseText });
  }
});

// 2. API: CV Analysis
app.post("/api/cv-analysis", async (req, res) => {
  const { cv } = req.body;
  try {
    if (!cv) {
      return res.status(400).json({ error: "CV data is required" });
    }

    if (!ai) {
      return res.json(getMockCvAnalysis(cv));
    }

    const systemInstruction = `You are an expert CV Auditor specializing in the Cambodian job market.
Analyze the user's CV and return a JSON object containing specific recommendations to improve their chances of getting hired in Cambodia.

You MUST respond strictly with a valid JSON object matching this schema:
{
  "score": number (0 to 100),
  "strengths": string[],
  "improvements": string[],
  "recommendedSkills": string[],
  "suggestedRoles": string[],
  "marketInsight": string
}`;

    const prompt = `Here is my current CV:
${JSON.stringify(cv, null, 2)}

Provide a thorough review. Look closely at their education, experience, and languages (Cambodians are highly valued for being bi-lingual or tri-lingual, like Khmer + English, Chinese, or French). Give tailored suggestions for top companies in Phnom Penh or elsewhere.`;

    const schema = {
      type: "OBJECT",
      properties: {
        score: { type: "INTEGER" },
        strengths: { type: "ARRAY", items: { type: "STRING" } },
        improvements: { type: "ARRAY", items: { type: "STRING" } },
        recommendedSkills: { type: "ARRAY", items: { type: "STRING" } },
        suggestedRoles: { type: "ARRAY", items: { type: "STRING" } },
        marketInsight: { type: "STRING" }
      },
      required: ["score", "strengths", "improvements", "recommendedSkills", "suggestedRoles", "marketInsight"]
    };

    const aiResponse = await callGemini(systemInstruction, prompt, schema);
    res.json(JSON.parse(aiResponse || "{}"));
  } catch (error: any) {
    console.warn("CV Analysis fallback activated (rate-limit or pending config):", error.message || error);
    res.json(getMockCvAnalysis(cv || {}));
  }
});

// 3. API: Mock Scrape/Sync jobs from specific Cambodian job portals
app.post("/api/scrape-jobs", async (req, res) => {
  try {
    const { url, category, isReturnee } = req.body;
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    if (!ai) {
      if (isReturnee) {
        return res.json(getMockScrapedReturneeJobs(url, category || "Cleaner"));
      }
      return res.json([]);
    }

    let systemInstruction = `You are a web scraper that crawls Cambodian job boards (e.g. BongThom, CamHR, Pelprek, Anakut, etc.) and parses their listings.
Based on the provided URL and optional category, generate 3-5 realistic, highly authentic job/internship listings in Cambodia. Make sure they include real Cambodian location references (such as Beoung Keng Kang, Tuol Kork, Phnom Penh, or Siem Reap City), authentic companies (e.g., ABA Bank, Smart Axiata, Cellcard, Pathmazing, Rosewood Phnom Penh, World Vision Cambodia, Chip Mong Group, Canadia Bank, Khmer Enterprise), realistic salary ranges (in USD, which is standard in Cambodia), and actual requirements.`;

    if (isReturnee) {
      systemInstruction += `\n\nCRITICAL DIRECTIVE: Every single generated job posting MUST be a low-education, low-barrier vocational job suitable for Cambodian returnees.
The requirement array MUST explicitly include an education entry like 'Education: High school equivalent or below (ក្រោមកម្រិតមធ្យមសិក្សាទុតិយភូមិ)', 'Education: Primary school completed or equivalent', or 'Education: No formal education required'.
The job titles should be practical/vocational (such as Heavy-Duty Truck Driver, Delivery Rider, Office Cleaner, Kitchen Dishwasher, Hotel Security Guard, Restaurant Waiter/Waitress, Babysitter, Construction Builder).`;
    }

    systemInstruction += `\n\nYou MUST respond strictly with a JSON array of job objects matching this schema:
[
  {
    "id": "string (unique string)",
    "title": "string",
    "company": "string",
    "location": "string (e.g., Phnom Penh, Cambodia or Siem Reap, Cambodia)",
    "type": "string (one of: Full-time, Part-time, Internship, Contract)",
    "category": "string",
    "salary": "string",
    "postedDate": "string (YYYY-MM-DD)",
    "description": "string",
    "requirements": ["string"],
    "benefits": ["string"],
    "sourceUrl": "string (the original url or variation)",
    "sourceName": "string (one of: BongThom, CamHR, Pelprek, LinkedIn Cambodia, Anakut Job, Other)",
    "contactEmail": "string"
  }
]`;

    const prompt = isReturnee 
      ? `Simulate scraping vocational and returnee jobs from this URL: ${url}. Category: ${category || "Vocational"}. Filter strictly for jobs requiring: Education: High school equivalent or below.`
      : `Simulate scraping jobs from this URL: ${url}
Category of interest: ${category || "General"}
Generate high-fidelity, complete job postings. Do not return placeholders.`;

    const schema = {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING" },
          title: { type: "STRING" },
          company: { type: "STRING" },
          location: { type: "STRING" },
          type: { type: "STRING" },
          category: { type: "STRING" },
          salary: { type: "STRING" },
          postedDate: { type: "STRING" },
          description: { type: "STRING" },
          requirements: { type: "ARRAY", items: { type: "STRING" } },
          benefits: { type: "ARRAY", items: { type: "STRING" } },
          sourceUrl: { type: "STRING" },
          sourceName: { type: "STRING" },
          contactEmail: { type: "STRING" }
        },
        required: ["id", "title", "company", "location", "type", "category", "salary", "postedDate", "description", "requirements", "benefits", "sourceUrl", "sourceName", "contactEmail"]
      }
    };

    const aiResponse = await callGemini(systemInstruction, prompt, schema);
    res.json(JSON.parse(aiResponse || "[]"));
  } catch (error: any) {
    console.warn("Scraping simulator fallback activated (rate-limit or pending config):", error.message || error);
    if (req.body.isReturnee) {
      return res.json(getMockScrapedReturneeJobs(req.body.url, req.body.category || "Cleaner"));
    }
    res.status(500).json({ error: error.message || "Failed to simulate scrape" });
  }
});

// Configure Vite middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
