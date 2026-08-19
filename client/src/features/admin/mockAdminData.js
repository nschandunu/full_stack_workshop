export const adminProfile = {
  id: "admin-001",
  name: "Ava Mercer",
  username: "ava.mercer",
  email: "ava@coreflow.app",
  phone: "+1 (415) 555-0139",
  role: "Admin",
  department: "Engineering & Ops",
  jobTitle: "Head of Infrastructure",
  timezone: "America/Los_Angeles",
  bio: "Leads infrastructure strategy, governance controls, and platform reliability priorities across the organisation.",
  avatarUrl: "",
  joinedDate: "12 Aug 2023",
  location: "San Francisco, CA",
};

export const adminStats = {
  totalUsers: 248,
  totalProjects: 36,
  totalTasks: 542,
  activeUsers: 193,
  inactiveUsers: 55,
};

export const adminUsers = [
  {
    id: "u-1",
    name: "Noah Lee",
    email: "noah.lee@coreflow.app",
    role: "Project Manager",
    department: "Operations",
    status: "Active",
    avatarUrl: "",
  },
  {
    id: "u-2",
    name: "Lina Shah",
    email: "lina.shah@coreflow.app",
    role: "Designer",
    department: "Product Design",
    status: "Active",
    avatarUrl: "",
  },
  {
    id: "u-3",
    name: "Kai Brooks",
    email: "kai.brooks@coreflow.app",
    role: "Developer",
    department: "Engineering & Ops",
    status: "Inactive",
    avatarUrl: "",
  },
  {
    id: "u-4",
    name: "Amira Hassan",
    email: "amira.hassan@coreflow.app",
    role: "Marketing Lead",
    department: "Marketing",
    status: "Active",
    avatarUrl: "",
  },
  {
    id: "u-5",
    name: "Daniel Cruz",
    email: "daniel.cruz@coreflow.app",
    role: "Support Analyst",
    department: "Customer Support",
    status: "Active",
    avatarUrl: "",
  },
];

export const adminActivity = [
  { id: 1, title: "Invited new team member: Claire Sutton", user: "Ava Mercer", time: "2 hours ago", type: "info" },
  { id: 2, title: "Updated project permissions for Product Launch", user: "Ava Mercer", time: "Yesterday", type: "success" },
  { id: 3, title: "Disabled inactive account: Eric Holt", user: "System", time: "3 days ago", type: "warning" },
  { id: 4, title: "Approved migration checklist", user: "Ava Mercer", time: "5 days ago", type: "success" },
];

export const adminSettings = {
  email: "ava@coreflow.app",
  notifications: {
    "Product updates": true,
    "Team activity": true,
    "Security alerts": true,
    "Weekly digest": false,
  },
  permissions: {
    Admin: true,
    "Project Manager": true,
    Developer: true,
    Designer: false,
    Support: false,
  },
};

export const roleOptions = ["Admin", "Project Manager", "Developer", "Designer", "Support Analyst", "Marketing Lead"];

export const departments = [
  "Engineering & Ops",
  "Product Design",
  "Operations",
  "Marketing",
  "Customer Support",
  "Product Management",
];

export const timezones = [
  "America/Los_Angeles",
  "America/New_York",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Australia/Sydney",
];

export const DEPARTMENTS = departments;
export const TIMEZONES = timezones;
