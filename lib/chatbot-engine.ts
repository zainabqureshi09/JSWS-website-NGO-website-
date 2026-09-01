/**
 * JSWS Internal Knowledge Base & Intelligent Response Engine
 * Provides context-aware answers to user queries regarding JSWS services,
 * doctors, donations, Shariah compliance, location, lab tests, and SARC rehab
 * without relying on external APIs.
 */

export interface KnowledgeCategory {
  id: string;
  keywords: string[];
  title: string;
  response: string;
}

export function cleanPlainText(text: string): string {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/^#+\s+/gm, '')
    .replace(/^[\-\*]\s+/gm, '• ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export const JSWS_KNOWLEDGE_BASE: KnowledgeCategory[] = [
  {
    id: "about",
    keywords: ["who", "what is jsws", "about", "jsws", "jamila sultan", "mission", "vision", "ngo", "society", "history", "values", "story"],
    title: "About Jamila Sultan Welfare Society (JSWS)",
    response: `Jamila Sultan Welfare Society (JSWS) (Jamiyah Sayyidat-un-Nisa) is a registered non-profit organization (Registered NGO KAR No. 214 of 2016-17) based in Karachi, Pakistan.

Our Mission:
To provide accessible, high-quality, free and subsidized healthcare, physical rehabilitation, diagnostic laboratory testing, and educational scholarships to underserved families with dignity and professional excellence.

Key Highlights:
• 15+ Years of dedicated community welfare and healthcare service
• Over 100,000+ patients served across general OPD, specialty clinics and rehab
• 100% Shariah Compliant Zakat utilization (Alhamd Shariah Certificate ASA/0416/001)
• Key Facilities: JSMDC Medical Centre, SARC Rehabilitation Centre, AMTF Laboratory, and MASP Scholarships.

Is there a specific program or service you would like to know more about?`
  },
  {
    id: "donate_zakat",
    keywords: ["donate", "donation", "zakat", "sadqah", "bank", "account", "iban", "swift", "transfer", "give", "money", "charity", "pay", "bankislami", "raast", "sponsorship"],
    title: "Donation & Zakat Information",
    response: `Thank you for your interest in supporting Jamila Sultan Welfare Society (JSWS)! 100% of your contributions go towards life-saving medical care, free medicines, and welfare.

Official Bank Transfer Details:
• Bank Name: BankIslami Pakistan Ltd.
• Account Title: JAMILA SULTAN WELFARE SOCIETY
• Account No: 2002-3622415-0001
• IBAN: PK62BKIP0103600357930001 (or PK87 BKIP 2002 3622 4150 001)
• SWIFT Code: BKIPPKKA (for overseas donations)
• Branch: D.H.A. Phase-I, Karachi

Donation Categories:
1. Zakat (100% Shariah Audit Certified)
2. Sadqah & General Healthcare Fund
3. Sponsor a Patient (Full treatment & surgery costs)
4. Sponsor Medicines (100% Free Pharmacy supply)
5. Sponsor Equipment & Clinic Operations

Receipt Acknowledgment:
After transferring, optionally share your receipt via WhatsApp at +92 307 2021882 or email jswswelfare@gmail.com for an official receipt!`
  },
  {
    id: "shariah_legal",
    keywords: ["shariah", "certificate", "audit", "zakat compliant", "tamleek", "legal", "registration", "ntn", "fbr", "tax", "alhamd", "kar 214", "accreditation", "verified"],
    title: "Legal Registration & Shariah Zakat Certification",
    response: `Jamila Sultan Welfare Society (JSWS) operates with uncompromising transparency and legal accountability:

Shariah Audit Certificate:
• Issuing Body: Alhamd Shariah Advisory Services (Pvt) Ltd
• Certificate No: ASA/0416/001 (Valid till June 30, 2027)
• Auditors: Mufti Asjad Shoaib & Mufti Afnan Ahmed
• Status: Certifies 100% Shariah compliance in Zakat collection and constructive Tamleek ownership mechanism for deserving patients.

Government & Tax Credentials:
• NGO Registration: Government of Sindh Directorate of Social Welfare (KAR No. 214 of 2016-17)
• FBR NTN: 7488236 (Non-Profit Organization Status, eligible for Corporate CSR)
• SHCC License: Registered with Sindh Health Care Commission (SHCC) for OPD, Dental Care & Dental X-Ray services.`
  },
  {
    id: "doctors_schedule",
    keywords: ["doctor", "doctors", "physician", "dentist", "dental", "gynecologist", "psychiatrist", "optician", "refractionist", "timing", "schedule", "availability", "appointment", "consultant", "dr"],
    title: "Doctors & Specialist OPD Timings",
    response: `Here is the official consultant schedule at Jamila Sultan Medical & Dental Centre (JSMDC):

General Physicians (OPD):
• Dr. Saira Irfan (MBBS) — Daily (10:30 AM - 1:00 PM)
• Dr. Shehla Aalam (MBBS) — Mon, Tue, Thu (4:30 PM - 6:30 PM)
• Dr. C.M Rathore (MBBS) — Mon, Wed, Fri (3:30 PM - 6:00 PM)

Dental Surgery & X-Ray:
• Dr. Taha Sabir (BDS, RDS) — Daily (10:00 AM - 4:00 PM)

Specialists:
• Dr. Javed (Diabetic Consultant) — Mon, Thu, Sat (11:00 AM - 1:00 PM)
• Dr. Shaheen Ismail (Gynecologist & Sonologist) — Mon, Wed, Fri (4:30 PM - 6:30 PM)
• Dr. Asfia Waseem (Psychiatrist) — Thu (4:30 PM - 6:30 PM)
• Mr. Masroor Ahmed (Opt. Refractionist / Eye Care) — Mon, Wed, Fri (4:00 PM - 6:30 PM)

To book an OPD consultation or check helpline updates, call +92 307 2021882.`
  },
  {
    id: "jsmdc_services",
    keywords: ["jsmdc", "clinic", "opd", "medicine", "pharmacy", "dental", "gynecology", "ent", "chest", "eye", "mother child", "family planning", "ultrasound", "x-ray", "treatment"],
    title: "JSMDC Medical & Dental Centre Services",
    response: `Jamila Sultan Medical & Dental Centre (JSMDC) is the flagship healthcare facility of JSWS located in Korangi, Karachi.

Available OPD Clinics & Facilities:
1. General Outpatient OPD: Daily consultations for acute and chronic conditions.
2. Dental Clinic & Dental X-Ray: Cleanings, extractions, root canals, fillings, oral surgery (SHCC registered).
3. Gynecology & Maternal Care: Antenatal checkups, postnatal care, ultrasound screenings.
4. ENT Clinic: Ear, nose, throat, sinus, and hearing evaluation.
5. Chest Clinic: Asthma, COPD, tuberculosis, and pulmonary care.
6. Eye Clinic & Vision Testing: Refraction, vision checks, cataract screening.
7. 100% Free Pharmacy: Prescribed medications provided completely free for Zakat-eligible and needy patients.
8. Diagnostic Ultrasound & X-Ray: Fast turnaround diagnostic imaging.

Timings: Monday to Saturday (Morning & Evening OPD slots).`
  },
  {
    id: "sarc_rehab",
    keywords: ["sarc", "rehab", "rehabilitation", "autism", "autistic", "physiotherapy", "physical therapy", "occupational therapy", "speech therapy", "child", "children", "stroke", "paralysis", "cerebral palsy", "special needs", "counseling"],
    title: "Sultan Ahmed Rehabilitation Centre (SARC)",
    response: `SARC (Sultan Ahmed Rehabilitation Centre) is JSWS's dedicated facility for physical rehabilitation and autism care.

Specialized Programs:
• Autism Spectrum Disorder Care: Early intervention, sensory play integration, behavioral therapy.
• Physical Therapy (PT): Motor recovery, joint rehab, post-stroke gait restoration, cerebral palsy care.
• Speech & Language Therapy: Diagnostic speech evaluation, articulation therapy, stuttering management.
• Occupational Therapy: Daily functional movement training and fine motor skills development.
• Psychological & Parent Counseling: Mental health guidance and emotional support for parents.

Features: Subsidized and free sessions for deserving families with certified 1-on-1 physiotherapists.

To book a rehab assessment session, contact the SARC team at +92 307 2021882.`
  },
  {
    id: "laboratory_tests",
    keywords: ["lab", "laboratory", "test", "blood test", "report", "amtf", "cbc", "lft", "kft", "lipid", "thyroid", "sugar", "hba1c", "vitamin", "download report", "mr number"],
    title: "AMTF Laboratory Collection Point & Online Reports",
    response: `AMTF Laboratory Collection Point at JSWS provides state-of-the-art diagnostic testing at heavily subsidized rates (and free for deserving Zakat patients).

Common Diagnostic Tests:
• Complete Blood Count (CBC)
• Liver Function Test (LFT) & Kidney Function Test (KFT)
• Lipid Profile & Blood Sugar (Fasting/Random, HbA1c)
• Thyroid Profile (T3, T4, TSH) & Hormonal Assays
• Vitamin D & Vitamin B12 Screening
• Infectious Disease & Hepatitis Screenings

Online Report Download:
Patients can view and download their medical test reports online on our website Laboratory section by entering their MR Number and Password printed on their receipt.`
  },
  {
    id: "scholarships_masp",
    keywords: ["scholarship", "scholarships", "masp", "education", "school", "college", "university", "tuition", "aslam", "fee", "student", "stipend", "study"],
    title: "Muhammad Aslam Scholarship Program (MASP)",
    response: `MASP (Muhammad Aslam Scholarship Program) is JSWS's educational welfare initiative ensuring no bright student loses education due to financial hardship.

Coverage & Benefits:
• Full or partial coverage of tuition fees, examination costs, and textbooks.
• Educational stipends for deserving students.
• Covers Secondary (Matriculation), Intermediate (FSc/FA), University (Bachelors), and Vocational Technical Training.

Eligibility Criteria:
1. Minimum 65%+ academic record or equivalent B grade.
2. Verified financial need (evaluated by JSWS welfare board).
3. Enrollment in a recognized educational institution.

How to Apply: You can fill out the online application form directly on our website Scholarships section.`
  },
  {
    id: "contact_location",
    keywords: ["contact", "phone", "number", "helpline", "address", "location", "where", "map", "korangi", "karachi", "email", "hours", "timings", "emergency", "open", "directions"],
    title: "Contact Information, Address & Working Hours",
    response: `Location & Address:
Jamila Sultan Welfare Society
P-66 - 15 A, Sector 31A, Allah Wala Town, Korangi, Karachi, 74900, Pakistan.

Helplines & Phone Numbers:
• Primary Helpline: +92 307 2021882
• Secondary Helpline: +92 336 3398787

Email Address:
• jswswelfare@gmail.com or info@jsws.org.pk

Working Hours:
• General OPD & Admin: Monday to Saturday (10:00 AM to 6:30 PM)
• Sunday: Closed

Important Note: JSWS provides Outpatient (OPD) and Rehabilitation services. Emergency / 24/7 ER services are NOT available.`
  },
  {
    id: "volunteer",
    keywords: ["volunteer", "join", "help", "work", "campaign", "participate", "doctor volunteer", "community"],
    title: "JSWS Volunteer Program",
    response: `Join the JSWS Volunteer Corps!

We welcome doctors, medical students, allied healthcare workers, and passionate community volunteers to join our cause.

Volunteer Opportunities:
• Assisting in Free Medical Camps across Sindh
• Health Education & Awareness Campaigns
• Blood Donation Drives & Community Support
• Administrative & Clinical Assistance

You can fill out the Volunteer Application Form online on our website Volunteer section.`
  }
];

/**
 * Normalizes input text for keyword matching.
 */
function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .replace(/[^\w\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Scores and selects the most relevant knowledge category for a user query.
 */
export function generateInternalChatResponse(userQuery: string): string {
  const normalized = normalizeQuery(userQuery);

  if (!normalized || normalized.length < 2) {
    return cleanPlainText(`Hello! Welcome to Jamila Sultan Welfare Society (JSWS). 

How can I help you today? You can ask me about:
• Donations & Bank Details
• Doctors & OPD Schedule
• JSMDC OPD Clinics & Free Pharmacy
• SARC Autism & Physical Rehab
• AMTF Lab Tests & Online Reports
• Shariah Audit Certificate & NTN
• Location, Address & Contact Numbers`);
  }

  // Handle greetings
  const greetings = ["hi", "hello", "assalam", "salam", "hey", "greetings", "aoa", "adaab"];
  const isGreetingOnly = greetings.some(g => normalized === g || normalized.startsWith(g + " "));
  if (isGreetingOnly && normalized.split(" ").length <= 3 && !normalized.includes("doctor") && !normalized.includes("donate")) {
    return cleanPlainText(`Wa Alaikum Assalam & Welcome to Jamila Sultan Welfare Society (JSWS)!

I am your official JSWS AI Assistant. How can I assist you today?

Here are quick topics you can ask me about:
1. Donation & Zakat Details (BankIslami IBAN & Shariah compliance)
2. Doctor Timings (General OPD, Dental, Gynecology, Diabetes, Psychiatry)
3. SARC Rehabilitation (Autism therapy & Physical Rehab)
4. AMTF Lab Tests (Subsidized diagnostic tests & report lookup)
5. Contact & Address (Sector 31A Korangi Karachi)`);
  }

  let bestMatch: KnowledgeCategory | null = null;
  let highestScore = 0;

  for (const cat of JSWS_KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of cat.keywords) {
      if (normalized.includes(kw)) {
        score += kw.length > 5 ? 3 : 2;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = cat;
    }
  }

  if (bestMatch && highestScore >= 2) {
    return cleanPlainText(bestMatch.response);
  }

  // Fallback response for uncaptured queries
  return cleanPlainText(`Thank you for reaching out to Jamila Sultan Welfare Society (JSWS)!

I want to make sure you get the exact information you need. Here is a quick overview of what we offer:

• JSMDC OPD Clinics: Free consultations & 100% free prescription pharmacy.
• SARC Rehabilitation: Autism therapy, physical therapy & speech therapy.
• Donations & Zakat: BankIslami IBAN PK62BKIP0103600357930001 (100% Shariah Audit Certified).
• Doctors: Available Mon-Sat (call +92 307 2021882 for appointments).
• Lab Reports: Subsidized diagnostic tests & online report download.
• Address: Sector 31A, Allah Wala Town, Korangi, Karachi.

Would you like specific details on any of the above topics? Or contact us directly at jswswelfare@gmail.com!`);
}
