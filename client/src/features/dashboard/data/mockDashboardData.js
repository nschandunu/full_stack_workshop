export const dashboardData = {
  stats: {
    totalProjects: 12,
    activeProjects: 7,
    completedProjects: 4,
    overdueTasks: 3,
  },

  projects: [
    {
      id: 1,
      name: "Project Management Platform",
      owner: "Senuka",
      tasks: 18,
      completedTasks: 12,
      status: "Active",
      progress: 67,
    },
    {
      id: 2,
      name: "Mobile Application",
      owner: "Kasun",
      tasks: 24,
      completedTasks: 10,
      status: "Active",
      progress: 42,
    },
    {
      id: 3,
      name: "Marketing Website",
      owner: "Amal",
      tasks: 15,
      completedTasks: 15,
      status: "Completed",
      progress: 100,
    },
  ],

  tasks: [
    {
      id: 1,
      title: "Implement authentication",
      project: "Project Management Platform",
      dueDate: "2026-08-10",
      priority: "High",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Create project API",
      project: "Project Management Platform",
      dueDate: "2026-08-12",
      priority: "Medium",
      status: "Todo",
    },
    {
      id: 3,
      title: "Design mobile dashboard",
      project: "Mobile Application",
      dueDate: "2026-08-15",
      priority: "Low",
      status: "Todo",
    },
  ],
};