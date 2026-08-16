// ─── Mock User ──────────────────────────────────────────────────────────────
export const mockUser = {
  id: "user-001",
  name: "Lena Cross",
  username: "lena.cross",
  email: "lena@collabboard.app",
  phone: "+1 (555) 012-3456",
  role: "Senior Designer",
  department: "Product Design",
  jobTitle: "Senior Product Designer",
  timezone: "America/New_York",
  location: "New York, USA",
  bio: "Passionate about creating clean, user-centered experiences. 5+ years in product design, specialising in SaaS tools and scalable design systems. I believe great design solves real problems elegantly.",
  avatarUrl: "",
  memberSince: "2024-02-18",
};

// ─── Mock Stats ──────────────────────────────────────────────────────────────
export const mockStats = {
  activeProjects: 4,
  tasksCompleted: 142,
  tasksOverdue: 3,
  collaborators: 18,
};

// ─── Mock Activity ───────────────────────────────────────────────────────────
export const mockActivity = [
  {
    id: "act-1",
    type: "task_complete",
    description: 'Completed task "Design system audit"',
    project: "Brand Refresh",
    timestamp: "2026-08-16T08:30:00Z",
  },
  {
    id: "act-2",
    type: "comment",
    description: 'Left a comment on "Wireframe Review"',
    project: "Mobile App Redesign",
    timestamp: "2026-08-15T14:20:00Z",
  },
  {
    id: "act-3",
    type: "task_create",
    description: 'Created task "User testing script"',
    project: "Client Sprint",
    timestamp: "2026-08-15T10:05:00Z",
  },
  {
    id: "act-4",
    type: "project_join",
    description: 'Joined project "Launch Campaign"',
    project: "Launch Campaign",
    timestamp: "2026-08-14T16:45:00Z",
  },
  {
    id: "act-5",
    type: "task_overdue",
    description: 'Task "Competitor analysis" marked overdue',
    project: "Market Research",
    timestamp: "2026-08-14T09:00:00Z",
  },
  {
    id: "act-6",
    type: "task_complete",
    description: 'Completed task "Icon set refinement"',
    project: "Design Toolkit",
    timestamp: "2026-08-13T17:30:00Z",
  },
  {
    id: "act-7",
    type: "comment",
    description: 'Replied to a thread in "Q3 Roadmap"',
    project: "Product Planning",
    timestamp: "2026-08-12T11:15:00Z",
  },
];

// ─── Mock Settings ───────────────────────────────────────────────────────────
export const mockSettings = {
  email: "lena@collabboard.app",
  notifications: {
    emailOnAssign: true,
    emailOnComment: false,
    emailOnDeadline: true,
    pushOnMention: true,
    weeklyDigest: false,
    projectUpdates: true,
  },
};

// ─── Select Options ──────────────────────────────────────────────────────────
export const TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Kolkata",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Australia/Sydney",
];

export const DEPARTMENTS = [
  "Product Design",
  "Engineering",
  "Marketing",
  "Sales",
  "Customer Success",
  "Operations",
  "Finance",
  "Human Resources",
];
