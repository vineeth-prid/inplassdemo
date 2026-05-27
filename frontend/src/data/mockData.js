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
    type: "Extra Towels",
    dept: "Housekeeping",
    priority: 96,
    priorityLevel: "high",
    slaMin: 15,
    etaMin: 6,
    distance: "6 min walk",
    vip: true,
  },
  {
    id: "T-402",
    room: "415",
    guest: "Sarah Chen",
    type: "Turndown Service",
    dept: "Housekeeping",
    priority: 82,
    priorityLevel: "med",
    slaMin: 25,
    etaMin: 12,
    distance: "Same floor",
    vip: false,
  },
  {
    id: "T-403",
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
  },
  {
    id: "T-404",
    room: "208",
    guest: "Carlos M.",
    type: "Room Service Tray Pickup",
    dept: "Room Service",
    priority: 54,
    priorityLevel: "low",
    slaMin: 45,
    etaMin: 8,
    distance: "Floor 2",
    vip: false,
  },
  {
    id: "T-405",
    room: "611",
    guest: "Aisha N.",
    type: "Wi-Fi Reset",
    dept: "Maintenance",
    priority: 78,
    priorityLevel: "med",
    slaMin: 20,
    etaMin: 11,
    distance: "Floor 6",
    vip: false,
  },
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
  { room: "412", guest: "John Kelly", req: "Extra Towels", dept: "Housekeeping", assignee: "Maria L.", sla: "8m", status: "In Progress", priority: 96 },
  { room: "412", guest: "John Kelly", req: "AC Noise Fix", dept: "Maintenance", assignee: "Robert K.", sla: "18m", status: "Assigned", priority: 88 },
  { room: "611", guest: "Aisha N.", req: "Wi-Fi Reset", dept: "Maintenance", assignee: "Robert K.", sla: "12m", status: "In Progress", priority: 78 },
  { room: "208", guest: "Carlos M.", req: "Tray Pickup", dept: "Room Service", assignee: "Diego P.", sla: "32m", status: "Queued", priority: 54 },
  { room: "510", guest: "Yuki T.", req: "Spa Booking", dept: "Concierge", assignee: "Anna F.", sla: "—", status: "Completed", priority: 40 },
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
