┌───────────────────────────────────────────────────────────────┐
│  Search project or task...          Dashboard       + Add New │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  Dashboard                                                    │
│                                                               │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐  │
│  │ Projects   │ │ Active     │ │ Tasks      │ │ Overdue    │  │
│  │            │ │ Projects   │ │            │ │            │  │
│  │    12      │ │     7      │ │    48      │ │     3      │  │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘  │
│                                                               │
│  Recent Projects                            Project Status    │
│  ┌─────────────────────────────────────┐    ┌──────────────┐  │
│  │ Project │ Owner │ Tasks │ Status    │    │ █████  60%   │  │
│  ├─────────────────────────────────────┤    │              │  │
│  │ Website │ Senuka│ 12    │ Active    │    │ ████   45%   │  │
│  │ Mobile  │ Kasun │ 8     │ Active    │    │ ██     25%   │  │
│  │ API     │ Amal  │ 15    │ Completed │    └──────────────┘  │
│  └─────────────────────────────────────┘                      │
│                                                               │
│  My Tasks                                  Recent Activity    │
│  ┌─────────────────────────────────────┐    ┌──────────────┐  │
│  │ Task │ Project │ Due │ Priority     │    │ Task created │  │
│  ├─────────────────────────────────────┤    │ Project ...  │  │
│  │ Login│ Website │ 8/10│ HIGH         │    │ Comment ...  │  │
│  │ API  │ Backend │ 8/12│ MEDIUM       │    │ Status ...   │  │
│  └─────────────────────────────────────┘    └──────────────┘  │
│                                                               │
└───────────────────────────────────────────────────────────────┘


body
└── #f1f2f4 background

    ┌─────────────────────────────────────────┐
    │ Sidebar │ Topbar                        │
    │         ├───────────────────────────────┤
    │         │                               │
    │         │ Dashboard                     │
    │         │                               │
    │         │                               │
    └─────────┴───────────────────────────────┘


Sidebar
┌────────────────────┐
│  PROJECT HUB       │
├────────────────────┤
│                    │
│  ▣ Dashboard       │
│  ▣ Projects        │
│  ▣ My Tasks        │
│  ▣ Kanban          │
│  ▣ Team            │
│                    │
├────────────────────┤
│  SETTINGS          │
│  ▣ Profile         │
│  ▣ Settings        │
│                    │
└────────────────────┘

Dashboard Header
┌──────────────────────────────────────────────────────────────┐
│ Search Project or Task...         Dashboard       + Add New  │
└──────────────────────────────────────────────────────────────┘
                                                    + Add New
                                                        ├── Project
                                                        ├── Task
                                                        └── Team

State
┌──────────────────┐
│ TOTAL PROJECTS   │
│                  │
│ 12               │
└──────────────────┘

Four cards:
TOTAL PROJECTS    ACTIVE PROJECTS    MY TASKS    OVERDUE
12                7                  24          3


Recent Projects
┌────────┬──────────┬────────┬────────────┬──────────────┐
│ Project│ Manager  │ Tasks  │ Status     │ Progress     │
├────────┼──────────┼────────┼────────────┼──────────────┤
│ Web App│ Senuka   │ 12     │ ACTIVE     │ 65%          │
│ Mobile │ Kasun    │ 8      │ ACTIVE     │ 40%          │
│ API    │ Amal     │ 15     │ COMPLETED  │ 100%         │
└────────┴──────────┴────────┴────────────┴──────────────┘


My Tasks
┌──────────────┬──────────┬────────────┬──────────┐
│ Task         │ Project  │ Due Date   │ Priority │
├──────────────┼──────────┼────────────┼──────────┤
│ Login System │ Web App  │ 08/10/2026 │ HIGH     │
│ API Auth     │ Backend  │ 08/12/2026 │ MEDIUM   │
│ UI Design    │ Mobile   │ 08/15/2026 │ LOW      │
└──────────────┴──────────┴────────────┴──────────┘

                    PROJECT MANAGEMENT APP

                            │
             ┌──────────────┼──────────────┐
             ↓              ↓              ↓
         Dashboard      Projects        My Tasks
             │              │              │
          Summary       Project CRUD     Task CRUD
             │                             │
             └──────────────┐              │
                            ↓              ↓
                         Kanban Board ←── Tasks