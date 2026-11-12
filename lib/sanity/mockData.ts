import { BlogPost, Category, Tag, Author } from './types';

export const mockCategories: Category[] = [
  {
    _id: 'cat-1',
    name: 'Health & Wellness',
    slug: 'health-wellness',
    description: 'Practical guidelines and advice for maintaining physical and psychological wellness.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
  },
  {
    _id: 'cat-2',
    name: 'Mental Health',
    slug: 'mental-health',
    description: 'Expert insights into emotional well-being, stress management, and psychological care.',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop',
  },
  {
    _id: 'cat-3',
    name: 'Eye Health',
    slug: 'eye-health',
    description: 'Vision care, cataract awareness, and protective eye healthcare tips.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    _id: 'cat-4',
    name: 'Rehabilitation',
    slug: 'rehabilitation',
    description: 'Physiotherapy, stroke recovery, pediatric therapy, and physical rehabilitation resources.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop',
  },
  {
    _id: 'cat-5',
    name: 'Preventive Healthcare',
    slug: 'preventive-healthcare',
    description: 'Early screening, hypertension management, diabetes prevention, and routine checkups.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop',
  },
  {
    _id: 'cat-6',
    name: 'Women\'s Health',
    slug: 'womens-health',
    description: 'Maternal health, prenatal guidance, and specialized wellness for women.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop',
  },
  {
    _id: 'cat-7',
    name: 'Children\'s Health',
    slug: 'childrens-health',
    description: 'Pediatric care, child immunization, growth monitoring, and nutritional advice.',
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1200&auto=format&fit=crop',
  },
  {
    _id: 'cat-8',
    name: 'Nutrition',
    slug: 'nutrition',
    description: 'Dietary guidance, balanced meal plans, and combating malnutrition in families.',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1200&auto=format&fit=crop',
  },
  {
    _id: 'cat-9',
    name: 'Community Health',
    slug: 'community-health',
    description: 'Public healthcare outreach, free medical camps, and community hygiene initiatives.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1200&auto=format&fit=crop',
  },
  {
    _id: 'cat-10',
    name: 'JSWS Updates',
    slug: 'jsws-updates',
    description: 'Latest news, project announcements, and medical camp reports from JSWS NGO.',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1200&auto=format&fit=crop',
  },
];

export const mockTags: Tag[] = [
  { _id: 'tag-1', name: 'Mental Health', slug: 'mental-health' },
  { _id: 'tag-2', name: 'Eye Care', slug: 'eye-care' },
  { _id: 'tag-3', name: 'Rehab', slug: 'rehab' },
  { _id: 'tag-4', name: 'Prevention', slug: 'prevention' },
  { _id: 'tag-5', name: 'Nutrition', slug: 'nutrition' },
  { _id: 'tag-6', name: 'Maternal Care', slug: 'maternal-care' },
  { _id: 'tag-7', name: 'Pediatrics', slug: 'pediatrics' },
  { _id: 'tag-8', name: 'OPD Clinics', slug: 'opd-clinics' },
];

export const mockAuthors: Author[] = [
  {
    _id: 'author-1',
    name: 'Dr. Tariq Mahmood',
    designation: 'Senior Consultant Physician, MBBS, FCPS',
    organization: 'Jamila Sultan Medical & Dental Centre (JSMDC)',
    bio: 'Dr. Tariq Mahmood has over 18 years of clinical experience in internal medicine and preventive community health.',
    profileImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop',
    socialLinks: { twitter: 'https://twitter.com', linkedin: 'https://linkedin.com' },
  },
  {
    _id: 'author-2',
    name: 'Dr. Ayesha Alvi',
    designation: 'Consultant Ophthalmologist & Eye Surgeon',
    organization: 'JSWS Eye Care Initiative',
    bio: 'Specialist in refractive errors, cataract surgery, and community vision screening programs.',
    profileImage: 'https://images.unsplash.com/photo-1594824813566-88855ce78907?q=80&w=600&auto=format&fit=crop',
  },
  {
    _id: 'author-3',
    name: 'Dr. Farhan Siddiqui',
    designation: 'Head of Physical Rehabilitation (SARC)',
    organization: 'Sultan Ahmed Rehabilitation Centre (SARC)',
    bio: 'Expert in neurological rehabilitation, stroke therapy, and physical therapy for adult and pediatric patients.',
    profileImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600&auto=format&fit=crop',
  },
];

export const mockPosts: BlogPost[] = [
  {
    _id: 'post-1',
    title: 'Understanding Mental Health: When Should You Seek Help?',
    slug: 'understanding-mental-health-when-should-you-seek-help',
    excerpt: 'Mental health is just as vital as physical wellness. Recognize the early warning signs of chronic stress, anxiety, and depression, and know when professional psychological care is needed.',
    featuredImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop',
    publishedAt: '2026-09-15T09:00:00Z',
    updatedAt: '2026-09-20T10:30:00Z',
    readingTime: 6,
    featured: true,
    category: mockCategories[1], // Mental Health
    tags: [mockTags[0], mockTags[3]],
    author: mockAuthors[0],
    seoTitle: 'Understanding Mental Health: When to Seek Help | JSWS Health',
    seoDescription: 'Learn to recognize key signs of emotional distress and depression, and discover professional psychological support services available at JSWS.',
    medicalDisclaimer: 'This article is provided for mental health education and awareness. If you or someone you know is experiencing a mental health emergency, please contact a local crisis hotline or visit the nearest healthcare facility.',
    references: [
      { title: 'World Health Organization (WHO) Mental Health Action Guidelines', url: 'https://www.who.int/mental_health', journal: 'WHO Public Health Reports' },
      { title: 'Depression and Anxiety in Primary Care Communities', url: 'https://pubmed.ncbi.nlm.nih.gov', journal: 'Journal of Psychiatric Research' },
    ],
    body: `
### Why Mental Health Matters in Our Community

Mental health shapes how we think, feel, act, handle stress, and relate to others. Despite its profound impact on physical health and quality of life, psychological distress often carries an unmerited stigma in many communities.

At **Jamila Sultan Welfare Society (JSWS)**, we believe that emotional well-being is an indispensable foundation of overall healthcare.

---

### Key Warning Signs of Psychological Distress

It is normal to experience temporary sadness or stress in response to difficult life events. However, persistent symptoms lasting longer than two weeks require professional attention. Watch out for:

* **Persistent Emotional Shifts:** Ongoing feelings of hopelessness, emptiness, or excessive anxiety.
* **Sleep Disruption:** Insomnia, frequent night awakenings, or sleeping excessively.
* **Loss of Interest:** Withdrawal from family activities, social hobbies, or daily work responsibilities.
* **Physical Complaints:** Unexplained headaches, chronic digestive issues, or muscle tension with no apparent physical cause.
* **Changes in Appetite:** Significant weight loss or weight gain due to emotional eating or loss of appetite.

> **Important Clinical Insight:** Mental healthcare is not a luxury — it is a medical necessity. Seeking counseling or psychological guidance early prevents severe emotional breakdown and improves long-term recovery outcomes.

---

### Practical Steps for Daily Mental Well-being

1. **Maintain Consistent Routine:** Regular sleep schedules and structured daily activities foster mental stability.
2. **Prioritize Physical Activity:** Moderate daily exercise releases endorphins that naturally alleviate anxiety.
3. **Establish Strong Social Support:** Share your feelings with trusted family members or community support groups.
4. **Limit Negative Digital Overload:** Reduce constant exposure to stressful news feeds and social media comparison.

---

### How JSWS Supports Mental Health Access

Through our **Sultan Ahmed Rehabilitation Centre (SARC)** and JSMDC OPD clinics, JSWS provides confidential psychological consultations, counseling, and guidance for families in need, ensuring financial constraint never stands in the way of care.
    `,
  },
  {
    _id: 'post-2',
    title: 'Why Regular Eye Checkups Matter',
    slug: 'why-regular-eye-checkups-matter',
    excerpt: 'Clear vision is crucial for education, work, and quality of life. Discover why routine eye examinations prevent irreversible vision loss from glaucoma, diabetic retinopathy, and cataracts.',
    featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    publishedAt: '2026-09-10T10:00:00Z',
    readingTime: 5,
    featured: true,
    category: mockCategories[2], // Eye Health
    tags: [mockTags[1], mockTags[3]],
    author: mockAuthors[1],
    seoTitle: 'Why Regular Eye Checkups Matter | JSWS Vision Care',
    seoDescription: 'Discover the importance of early eye screenings for cataracts, glaucoma, and refractive errors at JSWS Eye Clinic.',
    references: [
      { title: 'Global Guidelines on Refractive Error & Cataract Prevention', url: 'https://www.who.int', journal: 'International Ophthalmology Reviews' },
    ],
    body: `
### Protecting Your Sight Through Early Detection

Vision loss significantly impacts an individual's independence, academic achievement, and livelihood. Many sight-threatening conditions — such as **glaucoma, diabetic retinopathy, and early-stage cataracts** — progress silently without causing pain or sudden vision shifts in their early stages.

---

### Common Eye Conditions Diagnosed in Community Clinics

* **Refractive Errors (Myopia & Presbyopia):** Blurry vision easily corrected with prescription eyeglasses.
* **Cataracts:** Clouding of the natural eye lens, leading to progressive vision loss. Cataract surgery can completely restore vision.
* **Glaucoma:** Increased pressure within the eye causing irreversible optic nerve damage if left untreated.
* **Diabetic Retinopathy:** Damage to retinal blood vessels caused by uncontrolled blood sugar levels.

> **Clinical Recommendation:** Adults aged 40 and above, as well as individuals with diabetes or hypertension, should undergo a comprehensive eye examination at least once every year.

---

### Practical Eye Care Tips for Everyday Life

1. **Follow the 20-20-20 Rule:** When working on digital screens, look at an object 20 feet away for 20 seconds every 20 minutes.
2. **Protect Against UV Rays:** Wear sunglasses or protective headwear during peak sunlight hours.
3. **Monitor Blood Sugar Levels:** Maintaining optimal glycemic control is the single best way to protect your retina.
4. **Never Ignore Sudden Eye Symptoms:** Seek immediate emergency care if you experience sudden loss of vision, eye pain, or flashing lights.
    `,
  },
  {
    _id: 'post-3',
    title: 'Simple Steps for a Healthier Lifestyle',
    slug: 'simple-steps-for-a-healthier-lifestyle',
    excerpt: 'Small, daily lifestyle adjustments can lower your risk of cardiovascular disease, diabetes, and stroke. Learn actionable habits for long-term health.',
    featuredImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
    publishedAt: '2026-09-05T08:30:00Z',
    readingTime: 4,
    featured: false,
    category: mockCategories[0], // Health & Wellness
    tags: [mockTags[3], mockTags[4]],
    author: mockAuthors[0],
    seoTitle: 'Simple Steps for a Healthier Lifestyle | JSWS Wellness',
    seoDescription: 'Actionable healthcare tips for balanced nutrition, physical activity, hydration, and disease prevention.',
    body: `
### Building Sustainable Health Habits

Good health is not achieved through drastic temporary diets, but through consistent, daily lifestyle choices. Preventive healthcare empowers families to stay active and avoid preventable chronic illness.

---

### Core Pillars of Community Health

1. **Balanced Whole-Food Nutrition:** Include fresh vegetables, whole grains, pulses, and lean proteins while reducing refined sugars and trans-fats.
2. **Adequate Daily Hydration:** Drink at least 8 to 10 glasses of clean water daily to support kidney function and digestion.
3. **Regular Physical Activity:** Aim for at least 30 minutes of moderate walking or physical exercise 5 days a week.
4. **Routine Health Screenings:** Monitor your blood pressure, blood glucose, and cholesterol annually.
    `,
  },
  {
    _id: 'post-4',
    title: 'Understanding the Importance of Rehabilitation',
    slug: 'understanding-the-importance-of-rehabilitation',
    excerpt: 'Physical rehabilitation transforms lives after stroke, trauma, or pediatric developmental delay. Explore how structured therapy restores physical independence.',
    featuredImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop',
    publishedAt: '2026-08-28T11:15:00Z',
    readingTime: 7,
    featured: false,
    category: mockCategories[3], // Rehabilitation
    tags: [mockTags[2]],
    author: mockAuthors[2],
    seoTitle: 'Importance of Physical Rehabilitation & Therapy | SARC JSWS',
    seoDescription: 'Learn how physical therapy, speech therapy, and occupational rehab empower patients at Sultan Ahmed Rehabilitation Centre.',
    references: [
      { title: 'Principles of Neurological Rehabilitation in Community Settings', journal: 'Archives of Physical Medicine and Rehabilitation' },
    ],
    body: `
### Restoring Mobility and Dignity

Physical rehabilitation is designed to help individuals regain functional mobility, reduce pain, and rebuild confidence following severe medical events such as stroke, cerebral palsy, orthopaedic surgery, or spinal injuries.

---

### Specialized Therapies Offered at SARC

* **Physiotherapy:** Rebuilding muscular strength, joint flexibility, and gait stability.
* **Occupational Therapy:** Enabling patients to perform essential daily tasks like dressing, eating, and writing independently.
* **Speech & Language Therapy:** Helping patients overcome communication barriers and swallowing difficulties.
* **Pediatric Rehabilitation:** Supporting children with delayed motor milestones and cerebral palsy.
    `,
  },
  {
    _id: 'post-5',
    title: 'Preventive Healthcare: Small Steps, Better Outcomes',
    slug: 'preventive-healthcare-small-steps-better-outcomes',
    excerpt: 'Preventive medicine focuses on stopping diseases before they start. Discover why early screenings, blood pressure checks, and vaccinations save lives.',
    featuredImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop',
    publishedAt: '2026-08-18T09:45:00Z',
    readingTime: 5,
    featured: false,
    category: mockCategories[4], // Preventive Healthcare
    tags: [mockTags[3], mockTags[7]],
    author: mockAuthors[0],
    seoTitle: 'Preventive Healthcare: Small Steps, Better Outcomes | JSWS',
    seoDescription: 'Discover the power of preventive checkups, diagnostic screenings, and free OPD care at JSWS Medical Centre.',
    body: `
### Prevention is Better Than Cure

Preventive healthcare emphasizes proactive health management. By identifying hypertension, high blood sugar, or nutritional deficiencies early, healthcare providers can intervene before complications arise.

---

### Key Preventive Services Available at JSMDC

* **Routine OPD Consultations:** General physical checkups by experienced doctors.
* **Subsidized Diagnostic Tests:** Complete Blood Count (CBC), Lipid Profile, Kidney & Liver Function panels via AMTF collection point.
* **Free Prescription Dispensing:** 100% free prescription medicines for deserving families.
    `,
  },
];
