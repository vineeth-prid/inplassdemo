// Centralized mock data for the iNPLASS investor prototype.
// All data is in-memory; no DB persistence by design.

export const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_fbce37e1-6519-46db-a7db-91ba6c43ef94/artifacts/y9r9hl4w_Inplass%20Logo.png";

export const HOTEL = {
  name: "Our Hotel Resort & Spa",
  banner:
    "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGludGVyaW9yfGVufDB8fHx8MTc3OTg1Mjg0NHww&ixlib=rb-4.1.0&q=85",
  lobby:
    "https://images.unsplash.com/photo-1585418694458-dc80a5c20294?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBob3RlbCUyMGludGVyaW9yfGVufDB8fHx8MTc3OTg1Mjg0NHww&ixlib=rb-4.1.0&q=85",
};

export const GUEST = {
  firstName: "John",
  lastName: "Kelly",
  room: "412",
  tier: "Platinum",
  avatar:
    "https://images.unsplash.com/photo-1556474835-b0f3ac40d4d1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRyYXZlbGVyJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzc5ODUyODQ4fDA&ixlib=rb-4.1.0&q=85",
};

export const STAFF = {
  firstName: "Linda",
  lastName: "Martinez",
  role: "Housekeeping Supervisor",
  shift: "On shift • 3h 24m left",
  avatar:
    "https://images.unsplash.com/photo-1677129666186-d29eba893fe3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBob3RlbCUyMGNvbmNpZXJnZXxlbnwwfHx8fDE3Nzk4NTI4NDh8MA&ixlib=rb-4.1.0&q=85",
};

export const QUICK_ACTIONS = [
  {
    key: "housekeeping",
    label: "Housekeeping",
    image:
      "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=400&q=80&auto=format&fit=crop",
  },
  {
    key: "room-service",
    label: "Room Service",
    image:
      "https://images.pexels.com/photos/7243886/pexels-photo-7243886.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    key: "spa",
    label: "Spa & Wellness",
    image:
      "https://images.unsplash.com/photo-1741522509438-a120c0bb5e88?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjBtYXNzYWdlfGVufDB8fHx8MTc3OTg1Mjg1M3ww&ixlib=rb-4.1.0&q=85",
  },
  {
    key: "concierge",
    label: "Concierge",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80&auto=format&fit=crop",
  },
];

export const FEATURED = [
  {
    title: "Sunset Spa Ritual",
    subtitle: "60 min • $129 • 20% off tonight",
    image:
      "https://images.unsplash.com/photo-1741522509438-a120c0bb5e88?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjBtYXNzYWdlfGVufDB8fHx8MTc3OTg1Mjg1M3ww&ixlib=rb-4.1.0&q=85",
  },
  {
    title: "Chef's Tasting Dinner",
    subtitle: "Tonight • 8 PM • 7 courses",
    image:
      "https://images.pexels.com/photos/7243886/pexels-photo-7243886.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    title: "Old Town Walking Tour",
    subtitle: "Tomorrow • 10 AM • 2 spots left",
    image:
      "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=600&q=80&auto=format&fit=crop",
  },
];

export const ITINERARY = [
  { day: "Day 1", title: "Riverside & Old Town", spots: ["Heritage Bridge", "Royal Plaza", "Skyline Deck"], distance: "1.2 km", transport: "Walk + Cab" },
  { day: "Day 2", title: "Business + Culture", spots: ["Innovation Hub", "Modern Art Gallery"], distance: "4.5 km", transport: "Metro" },
  { day: "Day 3", title: "Nature Escape", spots: ["Cliff Gardens", "Sunset Viewpoint"], distance: "12 km", transport: "Private Car" },
];

export const RESTAURANTS = [
  { name: "Azure Skyline", cuisine: "Modern Mediterranean", rating: 4.9, distance: "0.4 km", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80&auto=format&fit=crop" },
  { name: "Kobe Lantern", cuisine: "Japanese Omakase", rating: 4.8, distance: "0.8 km", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80&auto=format&fit=crop" },
  { name: "Saffron Royal", cuisine: "North Indian", rating: 4.7, distance: "1.1 km", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80&auto=format&fit=crop" },
];

export const COMMUTE = [
  { type: "Premium Cab", eta: "3 min", price: "$14", icon: "car" },
  { type: "Metro Line 2", eta: "6 min walk", price: "$2", icon: "train" },
  { type: "Hotel Shuttle", eta: "20 min", price: "Free", icon: "bus" },
];

export const GUEST_REQUESTS = [
  {
    id: "R-4121",
    title: "2 Extra Towels",
    dept: "Housekeeping",
    assignee: "Maria L.",
    status: "in_progress",
    eta: "8 min",
    progress: 65,
    sla: 15,
  },
  {
    id: "R-4122",
    title: "AC Noise Fix",
    dept: "Maintenance",
    assignee: "Robert K.",
    status: "assigned",
    eta: "18 min",
    progress: 25,
    sla: 30,
  },
  {
    id: "R-4123",
    title: "Late Checkout — 2 PM",
    dept: "Front Desk",
    assignee: "System",
    status: "completed",
    eta: "Confirmed",
    progress: 100,
    sla: 0,
  },
];

export const STAFF_TASKS = [
  {
    id: "T-401",
    room: "412",
    guest: "John Kelly",
    type: "Towel Request",
    dept: "Housekeeping",
    priority: 96,
    priorityLevel: "high",
    slaMin: 15,
    etaMin: 6,
    distance: "6 min walk",
    vip: true,
    kind: "delivery",
    details: {
      items: [
        { name: "Bath towels", qty: 2 },
        { name: "Hand towels", qty: 1 },
      ],
      pickup: "Linen room · Floor 4",
      note: "Guest prefers Egyptian cotton. VIP courtesy mat included.",
    },
  },
  {
    id: "T-402",
    room: "305",
    guest: "Sarah Chen",
    type: "Water Bottle",
    dept: "Housekeeping",
    priority: 72,
    priorityLevel: "med",
    slaMin: 20,
    etaMin: 9,
    distance: "Floor 3",
    vip: false,
    kind: "delivery",
    details: {
      items: [
        { name: "Still water 500ml", qty: 2 },
        { name: "Sparkling water 500ml", qty: 1 },
      ],
      pickup: "F&B mini-bar pantry · Floor 3",
      note: "Chilled. Add lemon wedges on tray.",
    },
  },
  {
    id: "T-403",
    room: "208",
    guest: "Carlos M.",
    type: "Food Placed",
    dept: "Room Service",
    priority: 84,
    priorityLevel: "high",
    slaMin: 18,
    etaMin: 7,
    distance: "Floor 2",
    vip: false,
    kind: "food",
    details: {
      order: "Truffle Risotto · Caesar Salad · Sparkling water",
      table: "By window · Tray service",
      ticket: "RS-#21043",
      diet: "Lactose-free cheese substitute",
      pickup: "Main kitchen pass · Hot hold #2",
    },
  },
  {
    id: "T-404",
    room: "510",
    guest: "Yuki T.",
    type: "Checkout",
    dept: "Front Desk",
    priority: 90,
    priorityLevel: "high",
    slaMin: 25,
    etaMin: 12,
    distance: "Floor 5",
    vip: true,
    kind: "checkout",
    details: {
      folio: "$1,248.40 (3 nights)",
      keys: "2 cards to recover",
    },
  },
  {
    id: "T-405",
    room: "412",
    guest: "John Kelly",
    type: "AC Noisy",
    dept: "Maintenance",
    priority: 88,
    priorityLevel: "high",
    slaMin: 30,
    etaMin: 18,
    distance: "Floor 4",
    vip: true,
    kind: "diagnostic",
  },
  {
    id: "T-406",
    room: "611",
    guest: "Aisha N.",
    type: "Wi-Fi Reset",
    dept: "Maintenance",
    priority: 64,
    priorityLevel: "med",
    slaMin: 20,
    etaMin: 11,
    distance: "Floor 6",
    vip: false,
    kind: "diagnostic_short",
  },
];

// Per-kind sub-task templates
export const DELIVERY_STEPS = [
  { id: 1, text: "Pickup items from supply" },
  { id: 2, text: "Confirm guest occupancy via PMS" },
  { id: 3, text: "Deliver to room · photo QA" },
];

export const FOOD_STEPS = [
  { id: 1, text: "Collect tray from hot hold" },
  { id: 2, text: "Verify dietary substitutions" },
  { id: 3, text: "Place table-side, lift cloche" },
  { id: 4, text: "Photo QA + guest signature" },
];

export const CHECKOUT_CHECKLIST = [
  { id: 1, text: "Verify guest identity & folio", done: true },
  { id: 2, text: "Mini-bar inventory scan", done: false },
  { id: 3, text: "Room damage walk-through", done: false },
  { id: 4, text: "Recover room keycards (2)", done: false },
  { id: 5, text: "Settle balance · email receipt", done: false },
  { id: 6, text: "Offer luggage assistance + cab", done: false },
  { id: 7, text: "Update PMS · release room to HK", done: false },
];

export const WIFI_STEPS = [
  { id: 1, text: "Power-cycle in-room router", done: false },
  { id: 2, text: "Test 5GHz + 2.4GHz signal", done: false },
  { id: 3, text: "Re-bind guest MAC on captive portal", done: false },
];

export const RAISE_REQUEST_TYPES = [
  { key: "towel", label: "Towel / Linen", dept: "Housekeeping", kind: "delivery" },
  { key: "water", label: "Water / Beverage", dept: "Housekeeping", kind: "delivery" },
  { key: "food", label: "Food Order", dept: "Room Service", kind: "food" },
  { key: "maint", label: "Maintenance", dept: "Maintenance", kind: "diagnostic_short" },
  { key: "amenity", label: "Amenity", dept: "Housekeeping", kind: "delivery" },
  { key: "other", label: "Other", dept: "Concierge", kind: "delivery" },
];

export const ROOMS_FOR_RAISE = [
  { room: "208", guest: "Carlos M." },
  { room: "305", guest: "Sarah Chen" },
  { room: "412", guest: "John Kelly" },
  { room: "510", guest: "Yuki T." },
  { room: "611", guest: "Aisha N." },
  { room: "702", guest: "Hassan O." },
];

export const AC_CHECKLIST = [
  { id: 1, text: "Check filter for dust buildup", done: true },
  { id: 2, text: "Inspect fan blades for obstruction", done: false },
  { id: 3, text: "Test thermostat calibration", done: false },
  { id: 4, text: "Verify refrigerant pressure", done: false },
  { id: 5, text: "Run 5-min idle test for noise", done: false },
];

export const HANDOVER_BULLETS = [
  { tag: "Open", text: "Room 611 Wi-Fi reset — pending router replacement (ETA 9 PM)." },
  { tag: "VIP", text: "Room 412 (John Kelly, Platinum) — flagged AC pattern; preventive scheduled tomorrow." },
  { tag: "Blocker", text: "Linen pickup delayed 40 min — backup stock used; reorder placed." },
  { tag: "Tip", text: "Floor 4 staff load is 30% above avg — consider rebalancing at 10 PM." },
];

// Admin / GM data
export const KPIS = [
  { label: "Occupancy", value: "87%", delta: "+4.2%", positive: true },
  { label: "Avg SLA", value: "94%", delta: "+1.8%", positive: true },
  { label: "Guest Satisfaction", value: "4.7★", delta: "+0.2", positive: true },
  { label: "Active Tasks", value: "42", delta: "-6", positive: true },
];

export const REQUEST_VOLUME = [
  { hour: "06", v: 8 },
  { hour: "08", v: 22 },
  { hour: "10", v: 41 },
  { hour: "12", v: 56 },
  { hour: "14", v: 38 },
  { hour: "16", v: 34 },
  { hour: "18", v: 52 },
  { hour: "20", v: 68 },
  { hour: "22", v: 31 },
];

export const DEPT_LOAD = [
  { name: "Housekeeping", value: 46, color: "#5B2C91" },
  { name: "Maintenance", value: 22, color: "#F47B20" },
  { name: "Room Service", value: 18, color: "#A78BD9" },
  { name: "Front Desk", value: 14, color: "#7B3FBF" },
];

export const COMPLAINTS = [
  { category: "Wi-Fi", count: 14, severity: "high" },
  { category: "AC / HVAC", count: 11, severity: "high" },
  { category: "Cleanliness", count: 6, severity: "med" },
  { category: "Noise", count: 4, severity: "low" },
  { category: "Slow Service", count: 3, severity: "low" },
];

export const ANOMALIES = [
  {
    id: "A-01",
    title: "Maintenance ticket spike on Floor 6",
    detail: "+340% vs 14-day average. Likely cause: HVAC zone failure.",
    severity: "high",
    action: "Dispatch HVAC tech now",
  },
  {
    id: "A-02",
    title: "Room service delay between 9–10 PM",
    detail: "Median delay +12 min. Staffing is 1 below forecast.",
    severity: "med",
    action: "Pull 1 floater from front desk",
  },
  {
    id: "A-03",
    title: "Recurring AC complaints on Floor 4",
    detail: "4 tickets this week clustered in rooms 410–415.",
    severity: "med",
    action: "Schedule preventive maintenance",
  },
];

export const LIVE_OPS = [
  { room: "412", guest: "John Kelly", req: "Towel Request", dept: "Housekeeping", assignee: "Maria L.", sla: "8m", status: "In Progress", priority: 96 },
  { room: "412", guest: "John Kelly", req: "AC Noise Fix", dept: "Maintenance", assignee: "Robert K.", sla: "18m", status: "Assigned", priority: 88 },
  { room: "305", guest: "Sarah Chen", req: "Water Bottle", dept: "Housekeeping", assignee: "Sam O.", sla: "12m", status: "Assigned", priority: 72 },
  { room: "208", guest: "Carlos M.", req: "Food Placed", dept: "Room Service", assignee: "Diego P.", sla: "7m", status: "In Progress", priority: 84 },
  { room: "510", guest: "Yuki T.", req: "Checkout", dept: "Front Desk", assignee: "Anna F.", sla: "12m", status: "In Progress", priority: 90 },
  { room: "611", guest: "Aisha N.", req: "Wi-Fi Reset", dept: "Maintenance", assignee: "Robert K.", sla: "11m", status: "Queued", priority: 64 },
  { room: "203", guest: "Hassan O.", req: "Bathroom Leak", dept: "Maintenance", assignee: "Unassigned", sla: "2m", status: "At Risk", priority: 99 },
];

export const STAFFING_HEATMAP = {
  hours: ["8a", "10a", "12p", "2p", "4p", "6p", "8p", "10p"],
  rows: [
    { dept: "Housekeeping", current: [3, 4, 4, 4, 3, 3, 2, 2], rec: [4, 5, 5, 4, 4, 3, 3, 2] },
    { dept: "Maintenance", current: [2, 2, 2, 2, 2, 2, 1, 1], rec: [2, 3, 3, 3, 2, 2, 2, 1] },
    { dept: "Room Service", current: [2, 2, 3, 3, 2, 3, 4, 3], rec: [2, 2, 3, 3, 2, 4, 5, 3] },
    { dept: "Front Desk", current: [2, 2, 2, 2, 2, 2, 2, 1], rec: [2, 2, 2, 2, 2, 2, 2, 2] },
  ],
};

export const LANGUAGES = [
  { code: "EN", label: "English" },
  { code: "ES", label: "Español" },
  { code: "FR", label: "Français" },
  { code: "AR", label: "العربية" },
  { code: "中文", label: "中文" },
];

// Admin · Staff performance (AI-derived)
export const STAFF_PERF = [
  {
    name: "Linda Martinez",
    role: "Housekeeping Supervisor",
    dept: "Housekeeping",
    avatar: "https://images.unsplash.com/photo-1677129666186-d29eba893fe3?w=200&q=80&auto=format&fit=crop",
    completed: 18, sla: 97, csat: 4.9, burnout: 22, sentiment: "warm",
    aiNote: "Top performer this week. Consider rotating to onboarding Mentor role.",
  },
  {
    name: "Maria L.",
    role: "Housekeeper",
    dept: "Housekeeping",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop",
    completed: 24, sla: 94, csat: 4.7, burnout: 58, sentiment: "tired",
    aiNote: "Burnout risk rising (+18% vs 7d). Suggest shorter floor allocation tomorrow.",
  },
  {
    name: "Robert K.",
    role: "Maintenance Tech",
    dept: "Maintenance",
    avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&q=80&auto=format&fit=crop",
    completed: 11, sla: 88, csat: 4.5, burnout: 36, sentiment: "neutral",
    aiNote: "HVAC ticket throughput +30%. Pair with junior tech for upcoming Floor 4 preventive.",
  },
  {
    name: "Diego P.",
    role: "Room Service Runner",
    dept: "Room Service",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80&auto=format&fit=crop",
    completed: 15, sla: 92, csat: 4.6, burnout: 28, sentiment: "warm",
    aiNote: "Average delivery 8% faster than dept avg. Strong candidate for VIP track.",
  },
  {
    name: "Anna F.",
    role: "Concierge",
    dept: "Concierge",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop",
    completed: 9, sla: 99, csat: 4.95, burnout: 18, sentiment: "warm",
    aiNote: "Driver of +0.3 CSAT this week. Spotlight in shift huddle.",
  },
  {
    name: "Sam O.",
    role: "Housekeeper",
    dept: "Housekeeping",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&auto=format&fit=crop",
    completed: 19, sla: 81, csat: 4.2, burnout: 71, sentiment: "stressed",
    aiNote: "3 late tasks today. AI suggests 1:1 coaching + lighter Floor 7 load.",
  },
];

// Admin · Analytics
export const REVENUE_BY_DAY = [
  { day: "Mon", rev: 18400, csat: 4.4 },
  { day: "Tue", rev: 19200, csat: 4.5 },
  { day: "Wed", rev: 21100, csat: 4.6 },
  { day: "Thu", rev: 22800, csat: 4.7 },
  { day: "Fri", rev: 27300, csat: 4.7 },
  { day: "Sat", rev: 31600, csat: 4.8 },
  { day: "Sun", rev: 24900, csat: 4.6 },
];

export const SENTIMENT_TREND = [
  { week: "W-4", positive: 62, neutral: 28, negative: 10 },
  { week: "W-3", positive: 65, neutral: 27, negative: 8 },
  { week: "W-2", positive: 68, neutral: 25, negative: 7 },
  { week: "W-1", positive: 71, neutral: 23, negative: 6 },
  { week: "Now", positive: 74, neutral: 21, negative: 5 },
];

export const FUNNEL = [
  { stage: "Bookings", value: 412 },
  { stage: "Check-ins", value: 387 },
  { stage: "In-stay requests", value: 612 },
  { stage: "Repeat-intent (AI scored)", value: 218 },
  { stage: "Loyalty signups", value: 94 },
];

export const ANALYTICS_NARRATIVES = [
  {
    title: "Why CSAT is up 0.3pts",
    body: "Faster towel & water delivery on Floors 3–5 cut median fulfillment time from 18m → 11m. The improvement correlates with a 14% rise in 5-star post-stay reviews.",
    confidence: 94,
  },
  {
    title: "Revenue opportunity flagged",
    body: "23% of in-stay guests show high spa-intent signals but no booking. AI projects a $4,200/wk uplift with a targeted Tuesday-Wednesday push notification.",
    confidence: 87,
  },
  {
    title: "Risk · Sunday afternoon dip",
    body: "Recurring 9-week pattern: SLA drops 6% between 2–5 PM on Sundays due to overlapping shift handovers. Stagger by 30 min to recover.",
    confidence: 91,
  },
];
