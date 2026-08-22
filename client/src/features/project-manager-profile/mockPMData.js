export const pmProfile = {
  id: "pm-001",
  name: "Noah Sinclair",
  username: "noah.sinclair",
  email: "noah@coreflow.app",
  phone: "+1 (415) 555-0192",
  role: "Project Manager",
  department: "Product Operations",
  jobTitle: "Senior Project Manager",
  timezone: "America/Los_Angeles",
  bio: "Coordinates product delivery across multiple squads, balancing roadmap priorities, team capacity, and stakeholder alignment.",
  avatarUrl: "",
  joinedDate: "04 Jun 2024",
  location: "San Francisco, CA",
};

export const pmStats = {
  projectsManaged: 12,
  activeTasks: 48,
  teamMembers: 18,
  tasksOverdue: 6,
  projectsCompleted: 9,
};

export const pmProjects = [
  {
    id: "proj-1",
    name: "Mobile App Launch",
    status: "On Track",
    deadline: "15 Aug 2026",
    progress: 72,
    teamSize: 8,
  },
  {
    id: "proj-2",
    name: "Workflow Automation",
    status: "At Risk",
    deadline: "24 Aug 2026",
    progress: 46,
    teamSize: 6,
  },
  {
    id: "proj-3",
    name: "Analytics Upgrade",
    status: "Completed",
    deadline: "02 Jul 2026",
    progress: 100,
    teamSize: 5,
  },
  {
    id: "proj-4",
    name: "Customer Portal",
    status: "In Review",
    deadline: "19 Sep 2026",
    progress: 58,
    teamSize: 9,
  },
];

export const pmTeam = [
  { id: "t-1", name: "Amina Yusuf", role: "Frontend Engineer", tasks: 5, avatarUrl: "" },
  { id: "t-2", name: "Leo Hart", role: "QA Analyst", tasks: 3, avatarUrl: "" },
  { id: "t-3", name: "Chloe Nguyen", role: "Product Designer", tasks: 4, avatarUrl: "" },
  { id: "t-4", name: "Marco Silva", role: "Backend Engineer", tasks: 6, avatarUrl: "" },
];

export const pmActivity = [
  { id: 1, title: "Assigned task to Amina Yusuf", detail: "Marketing landing page QA", time: "2 hours ago", type: "info" },
  { id: 2, title: "Updated project deadline for Mobile App Launch", detail: "Moved from 12 Aug to 15 Aug", time: "Yesterday", type: "success" },
  { id: 3, title: "Reviewed customer portal scope", detail: "Stakeholder sign-off pending", time: "2 days ago", type: "warning" },
  { id: 4, title: "Approved design handoff", detail: "Workflow automation sprint", time: "4 days ago", type: "info" },
];

export const pmSettings = {
  email: "noah@coreflow.app",
  password: "********",
  notifications: {
    "Project updates": true,
    "Team reminders": true,
    "Deadline alerts": true,
    "Weekly summary": false,
  },
};

export const departments = [
  "Product Operations",
  "Engineering",
  "Design",
  "Marketing",
  "Customer Success",
];

export const timezones = [
  "America/Los_Angeles",
  "America/New_York",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Australia/Sydney",
];
