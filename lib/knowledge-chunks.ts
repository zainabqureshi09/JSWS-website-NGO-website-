export interface KnowledgeChunk {
  id: number;
  title: string;
  category: string;
  content: string;
  url?: string;
}

export const JSWS_WEBSITE_CHUNKS: KnowledgeChunk[] = [
  {
    id: 1,
    title: "About Jamila Sultan Welfare Society (JSWS)",
    category: "About & Mission",
    url: "/about",
    content: `Jamila Sultan Welfare Society (JSWS) / Jamiyah Sayyidat-un-Nisa is a registered non-profit organization (Registered NGO KAR No. 214 of 2016-17) operating in Karachi, Pakistan.
Mission: To provide free and heavily subsidized healthcare, prescription medicines, physical rehabilitation, diagnostic laboratory testing, and educational scholarships to underserved families and deserving patients with dignity and professional excellence.
Vision: To build a healthy, educated, and empowered society where every individual has equal access to quality healthcare and welfare services.
Core Values: Compassion, Humanity, Professional Excellence, Transparency & Trust.
Scale & Impact: Over 15 years of community service, 100,000+ patients treated, 150+ free medical camps organized across Sindh, and 50,000+ diagnostic tests conducted.`
  },
  {
    id: 2,
    title: "Official Bank Transfer & Donation Details",
    category: "Donation & Zakat",
    url: "/donate",
    content: `Official Bank Transfer Details for Jamila Sultan Welfare Society:
Bank Name: BankIslami Pakistan Ltd.
Account Name / Title: JAMILA SULTAN WELFARE SOCIETY
Account Number: 2002-3622415-0001
IBAN Number: PK62BKIP0103600357930001 (also PK87 BKIP 2002 3622 4150 001)
SWIFT Code: BKIPPKKA (for overseas international donations)
Branch: D.H.A. Phase-I, Karachi, Pakistan.

Donation Categories Supported:
1. Zakat (100% Shariah Audit Certified)
2. Sadqah & General Healthcare Fund
3. Sponsor a Patient (covers complete medical and surgical costs for needy patients)
4. Sponsor Clinic Operations
5. Sponsor Medicines (funds 100% free prescription pharmacy)
6. Sponsor Medical Equipment

Receipt Acknowledgment: After transferring funds, donors can optionally send payment receipts via WhatsApp to +92 307 2021882 or email to jswswelfare@gmail.com / info@jsws.org.pk.`
  },
  {
    id: 3,
    title: "Shariah Audit Certification & Zakat Compliance",
    category: "Shariah & Legal Credentials",
    url: "/registration",
    content: `Shariah Approval Certificate for Zakat Funds:
Issued by: Alhamd Shariah Advisory Services (Pvt) Ltd
Certificate Number: ASA/0416/001 (Valid through June 30, 2027)
Shariah Auditors: Mufti Asjad Shoaib & Mufti Afnan Ahmed
Compliance: Certifies that JSWS collects and consumes Zakat funds strictly in accordance with Islamic Shariah rules and the Tamleek (constructive ownership) mechanism for deserving, eligible patients.

Legal & Tax Credentials:
- Social Welfare NGO Registration: Directorate of Social Welfare, Government of Sindh (Registration KAR No. 214 of 2016-17)
- Federal Board of Revenue (FBR) NTN: 7488236 (Registered Non-Profit Organization, eligible for Corporate CSR donations)
- Healthcare Commission License: Registered with Sindh Health Care Commission (SHCC) for JSMDC General OPD, Dental Care, Dental X-Ray, and SARC Therapy Center.`
  },
  {
    id: 4,
    title: "Jamila Sultan Medical & Dental Centre (JSMDC)",
    category: "JSMDC Medical OPD",
    url: "/jsmdc",
    content: `Jamila Sultan Medical & Dental Centre (JSMDC) is the primary OPD healthcare facility of JSWS located in Korangi, Karachi.
Available OPD Services & Clinics:
1. General Outpatient (OPD): Daily medical consultations by qualified general physicians.
2. Dental Care & Dental X-Ray Clinic: Cleanings, extractions, fillings, root canals, dental X-ray imaging, and oral surgery (SHCC registered).
3. Gynecology & Maternal Care: Prenatal checkups, postnatal care, routine screening, women's health counseling.
4. ENT Clinic: Comprehensive ear, nose, throat, sinus, and hearing treatments.
5. Chest Clinic: Specialized respiratory care for asthma, COPD, tuberculosis, and pulmonary conditions.
6. Eye Clinic & Vision Testing: Vision testing, refraction, cataract screening.
7. Mother & Child Clinic: Antenatal care, pediatric checkups, immunizations.
8. Family Planning Clinic: Reproductive health counseling and maternal wellness.
9. 100% Free Pharmacy: Prescribed medications dispensed completely free for Zakat-eligible and deserving patients.
10. Diagnostic Ultrasound & Radiology: Subsidized imaging with fast report delivery.`
  },
  {
    id: 5,
    title: "Doctors & Specialist OPD Timings Schedule",
    category: "Doctors & Timings",
    url: "/doctors",
    content: `Official Consultant & Doctor Schedule at JSMDC Clinics:
1. Dr. Saira Irfan (General Physician, MBBS) - Availability: Daily (10:30 AM - 1:00 PM)
2. Dr. Taha Sabir (Dental Surgeon, BDS, RDS) - Availability: Daily (10:00 AM - 4:00 PM)
3. Dr. Javed (Diabetic Consultant) - Availability: Monday, Thursday, Saturday (11:00 AM - 1:00 PM)
4. Dr. Shehla Aalam (General Physician, MBBS) - Availability: Monday, Tuesday, Thursday (4:30 PM - 6:30 PM)
5. Dr. Shaheen Ismail (Gynecologist & Sonologist, MBBS) - Availability: Monday, Wednesday, Friday (4:30 PM - 6:30 PM)
6. Dr. Asfia Waseem (Psychiatrist / Consultant) - Availability: Thursday (4:30 PM - 6:30 PM)
7. Dr. C.M Rathore (General Physician, MBBS) - Availability: Monday, Wednesday, Friday (3:30 PM - 6:00 PM)
8. Mr. Masroor Ahmed (Opt. Refractionist / Eye Care) - Availability: Monday, Wednesday, Friday (4:00 PM - 6:30 PM)

OPD Appointments Helpline: +92 307 2021882`
  },
  {
    id: 6,
    title: "Sultan Ahmed Rehabilitation Centre (SARC)",
    category: "SARC Rehabilitation & Autism",
    url: "/sarc",
    content: `Sultan Ahmed Rehabilitation Centre (SARC) is JSWS's specialized facility for physical rehabilitation, special needs, and autism care.
Therapeutic Care Programs:
1. Autism Spectrum Disorder Care: Early intervention, sensory play integration, behavioral therapy, and socialization for autistic children.
2. Physical Therapy & Motor Rehabilitation: Post-stroke mobility restoration, gait training, joint rehabilitation, cerebral palsy therapy, muscle recovery.
3. Speech & Language Therapy: Diagnostic speech evaluation, articulation exercises, stuttering therapy, developmental speech delay management.
4. Occupational Therapy: Fine motor skills, joint adjustment, and day-to-day functional movement training.
5. Psychological & Parent Counseling: Mental health guidance, emotional support, and family counseling to empower parents of special needs children.

Sessions are fully subsidized or free for eligible underprivileged families with certified 1-on-1 physiotherapists.`
  },
  {
    id: 7,
    title: "AMTF Laboratory Collection Point & Online Reports",
    category: "Laboratory & Diagnostics",
    url: "/laboratory",
    content: `AMTF Laboratory Collection Point at JSWS provides diagnostic laboratory services using modern medical equipment and certified pathology oversight at highly subsidized rates (free for Zakat patients).
Diagnostic Menu:
- Complete Blood Count (CBC)
- Liver Function Test (LFT)
- Kidney Function Test (KFT)
- Lipid Profile
- Thyroid Profile (T3, T4, TSH)
- Blood Sugar (Fasting & Random)
- HbA1c Glycated Hemoglobin
- Vitamin D & Vitamin B12 Screening
- Hormonal Assays
- Infectious Disease & Hepatitis Screening (HBsAg, Anti-HCV, HIV)

Online Report Download: Patients can view and download their medical reports online on the website at /laboratory by entering their MR Number and Password provided on their receipt.`
  },
  {
    id: 8,
    title: "Muhammad Aslam Scholarship Program (MASP)",
    category: "Scholarships & Education",
    url: "/scholarships",
    content: `Muhammad Aslam Scholarship Program (MASP) is an educational welfare initiative by JSWS to support bright and deserving students facing financial hardship.
Financial Support Provided: Covers tuition fees, textbooks, examination fees, and educational stipends.
Educational Levels Supported:
- Matriculation / Secondary School
- Intermediate / FSc / FA
- University / Undergraduate Bachelor's Degrees
- Vocational & Technical Skills Training

Eligibility Criteria:
1. Academic Record: Minimum 65%+ marks or equivalent B grade in recent examinations.
2. Financial Need: Verified by JSWS educational committee based on family income.
3. Enrolled in a recognized school, college, university, or vocational institute.

Online Application: Students can apply online via the MASP Scholarship Form on the website at /scholarships.`
  },
  {
    id: 9,
    title: "Contact Information, Address & Operating Hours",
    category: "Contact & Location",
    url: "/contact",
    content: `Jamila Sultan Welfare Society Contact Details & Location:
Physical Address: P-66 - 15 A, Sector 31A, Allah Wala Town, Korangi, Karachi, 74900, Pakistan.
Location Reference: Sector 31A Korangi, Karachi.
Primary Helpline: +92 307 2021882
Secondary Helpline: +92 336 3398787
Email Addresses: jswswelfare@gmail.com / info@jsws.org.pk
Official Website: https://jsws.org.pk

Working Days & Hours:
- General OPD & Office: Monday to Saturday (10:00 AM - 6:30 PM)
- Sunday: Closed

Emergency Notice: JSWS and JSMDC provide outpatient OPD consultations, diagnostic, and rehabilitation services. Emergency services / 24/7 ER services are NOT available.`
  },
  {
    id: 10,
    title: "JSWS Volunteer Program & Community Drives",
    category: "Volunteer",
    url: "/volunteer",
    content: `JSWS Volunteer Program invites doctors, medical students, healthcare workers, and passionate community members to participate in welfare initiatives.
Volunteer Activities:
- Assisting in Free Mobile Medical Camps in rural and urban Sindh
- Community Health Awareness Drives
- Blood Donation Campaigns
- Clinical & Administrative Support

Interested volunteers can apply online via the Volunteer Form at /volunteer.`
  }
];
