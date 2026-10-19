/* ════════════════════════════════════════════════════════════════════════
   E Doctor — data.js
   All demo data in one place. Nothing here is real.
   ════════════════════════════════════════════════════════════════════════ */

const DEMO = {

  user: {
    name: 'Sarah J.',
    fullName: 'Sarah Johnson',
    id: 'ED-88412',
    initials: 'SJ',
    email: 'sarah.j@demo.example',
    joined: 'March 2025',
    plan: 'E Doctor Free',
  },

  medicine: {
    name: 'Augmentin 625mg',
    generic: 'Amoxicillin + Clavulanic Acid',
    manufacturer: 'GlaxoSmithKline (GSK)',
    batch: '#ED-948201',
    lot: 'LOT: 8092-B',
    ndc: '0029-6075-22',
    expiry: 'Mar 2026',
    barcode: 'GS1-128 / NDC Verified',
    authenticityScore: 99.4,
    status: 'VERIFIED',
    atcCode: 'J01CR02',
    category: 'Antibiotic — Penicillin + β-lactamase inhibitor',
    dosageForms: ['Tablets 625mg', 'Oral Suspension 228mg/5ml'],
    warnings: [
      'Do not use if allergic to penicillin or cephalosporins.',
      'May cause diarrhoea. Take with food to reduce GI side effects.',
      'Complete the full course even if you feel better.',
    ],
    interactions: [
      { drug: 'Warfarin', severity: 'moderate', note: 'Monitor INR closely.' },
      { drug: 'Methotrexate', severity: 'high', note: 'May increase methotrexate toxicity.' },
      { drug: 'Oral contraceptives', severity: 'low', note: 'Reduced efficacy possible.' },
    ],
  },

  prices: {
    brand: { name: 'Augmentin 625mg (GSK)', price: 48.50, per: '10 tabs', mrp: 48.50 },
    generics: [
      { name: 'Amoxyclav 625mg — Sun Pharma',   price: 11.20, per: '10 tabs', savings: 77, approved: true  },
      { name: 'Moxikind-CV 625mg — Mankind',     price: 13.40, per: '10 tabs', savings: 72, approved: true  },
      { name: 'Clavam 625mg — Cipla',            price: 9.80,  per: '10 tabs', savings: 80, approved: true  },
      { name: 'Co-Amoxiclav 625mg — Lupin',      price: 15.60, per: '10 tabs', savings: 68, approved: false },
    ],
    pharmacies: [
      { name: 'MedPlus Pharmacy',    distance: '0.3 mi', stock: true,  price: 44.50 },
      { name: 'Apollo Pharmacy',     distance: '0.7 mi', stock: true,  price: 46.00 },
      { name: 'Netmeds (online)',     distance: 'Online', stock: true,  price: 42.80 },
      { name: 'Wellness Forever',    distance: '1.2 mi', stock: false, price: 48.50 },
    ],
  },

  prescription: {
    patientName: 'Sarah Johnson',
    doctorName: 'Dr. Ananya Krishnan, MD',
    hospital: 'City General Hospital',
    date: 'October 18, 2026',
    refills: 2,
    medications: [
      { name: 'Metformin HCl',  dose: '500mg',  freq: 'Twice daily (with meals)',  duration: '90 days', qty: 180 },
      { name: 'Lisinopril',     dose: '10mg',   freq: 'Once daily (morning)',       duration: '90 days', qty: 90  },
      { name: 'Atorvastatin',   dose: '20mg',   freq: 'Once at night',              duration: '90 days', qty: 90  },
      { name: 'Aspirin',        dose: '75mg',   freq: 'Once daily',                 duration: '90 days', qty: 90  },
    ],
    ocrConfidence: 96.2,
    flags: [
      { field: 'Dosage', note: 'Metformin dose partially obscured — confirm 500mg with pharmacist.' },
    ],
  },

  schedule: [
    { id: 1, name: 'Metformin HCl 500mg', time: '8:00 AM',  taken: true,  icon: 'medication',  color: 'bg-blue-100 text-blue-700',  refillDays: 22 },
    { id: 2, name: 'Lisinopril 10mg',     time: '9:00 AM',  taken: true,  icon: 'favorite',    color: 'bg-red-100 text-red-600',    refillDays: 22 },
    { id: 3, name: 'Atorvastatin 20mg',   time: '9:00 PM',  taken: false, icon: 'nights_stay', color: 'bg-purple-100 text-purple-700', refillDays: 22 },
    { id: 4, name: 'Vitamin D3 1000 IU',  time: '1:00 PM',  taken: false, icon: 'sunny',       color: 'bg-yellow-100 text-yellow-700', refillDays: 14 },
    { id: 5, name: 'Aspirin 75mg',        time: '8:00 AM',  taken: true,  icon: 'water_drop',  color: 'bg-orange-100 text-orange-700', refillDays: 22 },
  ],

  symptoms: {
    chat: [
      { role: 'ai',   text: 'Hello! I can help you understand your symptoms and identify appropriate next steps. What symptoms are you experiencing today?',  time: '10:41 AM' },
      { role: 'user', text: "I've had a dull throbbing headache on my forehead for 2 days, mild nausea, and light sensitivity.",                              time: '10:42 AM' },
      { role: 'ai',   text: 'Thank you for sharing. Based on your symptoms — frontal headache lasting 48h, photophobia, and mild nausea — this may suggest a tension-type headache or early migraine pattern. Do any of these apply to you?', time: '10:42 AM' },
    ],
    clarifiers: ['Fever present (>100.4°F)', 'Neck stiffness', 'Vision changes', 'Taking pain relievers'],
    assessment: {
      title: 'Preliminary Assessment',
      redFlag: false,
      possibleCauses: [
        { label: 'Tension-Type Headache', confidence: 'High', desc: 'Common pattern. Linked to screen strain, muscle tension, or sleep deficit.' },
        { label: 'Early Migraine', confidence: 'Moderate', desc: 'Photophobia and frontal location are consistent. Monitor for aura.' },
        { label: 'Dehydration', confidence: 'Low', desc: 'Ensure adequate fluid intake.' },
      ],
      advice: 'Rest in a quiet, dark room. Stay hydrated. OTC analgesics (paracetamol/ibuprofen) may help. Consult a doctor if symptoms worsen or persist beyond 3 days.',
    },
  },

  alerts: [
    { id: 1, type: 'recall',      icon: 'campaign',       level: 'warning', title: 'FDA Recall — Metformin Lot', desc: 'Lot #A2291 Metformin 500mg by Sun Pharma — voluntary recall due to NDMA levels. Check your batch number.', date: 'Oct 17, 2026' },
    { id: 2, type: 'expiry',      icon: 'event_available',level: 'info',    title: 'Augmentin Expiry in 5 Months', desc: 'Your scanned Augmentin 625mg (Batch #ED-948201) expires March 2026.', date: 'Oct 15, 2026' },
    { id: 3, type: 'interaction', icon: 'science',         level: 'caution', title: 'Drug Interaction Detected', desc: 'Lisinopril + Potassium supplements — elevated potassium risk. Monitor with your doctor.', date: 'Oct 12, 2026' },
    { id: 4, type: 'price',       icon: 'sell',            level: 'info',    title: 'Price Drop Alert', desc: 'Clavam 625mg (Cipla) dropped 12% in your area. Current best price: ₹9.80 / tab.', date: 'Oct 10, 2026' },
  ],

  scanHistory: [
    { medicine: 'Augmentin 625mg', date: 'Oct 19, 2026', result: 'VERIFIED',    score: 99.4 },
    { medicine: 'Metformin 500mg', date: 'Oct 12, 2026', result: 'VERIFIED',    score: 98.1 },
    { medicine: 'Crocin 650mg',    date: 'Oct 5, 2026',  result: 'NEEDS REVIEW',score: 84.2 },
  ],

  alternatives: [
    { name: 'Amoxyclav 625mg',    brand: 'Sun Pharma',  atc: 'J01CR02', equiv: 'A', form: 'Tablet', price: 11.20 },
    { name: 'Moxikind-CV 625mg',  brand: 'Mankind',     atc: 'J01CR02', equiv: 'A', form: 'Tablet', price: 13.40 },
    { name: 'Clavam 625mg',       brand: 'Cipla',       atc: 'J01CR02', equiv: 'A', form: 'Tablet', price: 9.80  },
    { name: 'Augmentin DS 228',   brand: 'GSK',         atc: 'J01CR02', equiv: 'B', form: 'Syrup',  price: 32.00 },
  ],

  navItems: [
    { id: 'dashboard',    label: 'Home',         icon: 'home',                group: 'main'   },
    { id: 'scanner',      label: 'Scan',         icon: 'barcode_scanner',     group: 'main'   },
    { id: 'price-search', label: 'Prices',       icon: 'price_check',         group: 'main'   },
    { id: 'rx-reader',    label: 'Prescription', icon: 'document_scanner',    group: 'main'   },
    { id: 'symptom-ai',   label: 'AI Symptom',   icon: 'psychology',          group: 'main'   },
    { id: 'schedule',     label: 'Schedule',     icon: 'calendar_month',      group: 'health' },
    { id: 'profile',      label: 'Profile',      icon: 'person',              group: 'health' },
    { id: 'help',         label: 'Help',         icon: 'help',                group: 'support'},
  ],

  bottomNavItems: [
    { id: 'dashboard',  label: 'Home',    icon: 'home'             },
    { id: 'scanner',    label: 'Scan',    icon: 'barcode_scanner'  },
    { id: 'rx-reader',  label: 'Rx',      icon: 'document_scanner' },
    { id: 'symptom-ai', label: 'AI',      icon: 'psychology'       },
    { id: 'profile',    label: 'Profile', icon: 'person'           },
  ],
};
