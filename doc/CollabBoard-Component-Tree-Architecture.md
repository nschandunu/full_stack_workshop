# CollabBoard — Component Tree Architecture

## Diagram

```text
App
└── Board
    ├── BoardHeader
    │   └── AddTaskForm
    ├── Column ("To Do")
    │   ├── TaskCard
    │   ├── TaskCard
    │   └── TaskCard
    ├── Column ("Doing")
    │   ├── TaskCard
    │   ├── TaskCard
    │   └── TaskCard
    └── Column ("Done")
        ├── TaskCard
        ├── TaskCard
        └── TaskCard
```

## Component Responsibilities

| Component | Type (Container/Presentational) | Responsibility |
| --- | --- | --- |
| App | Container | Bootstraps the frontend, owns the top-level layout, and renders the board shell. |
| Board | Container | Holds the board state, coordinates task data, and passes props and callbacks to child components. |
| BoardHeader | Presentational | Renders the board title, summary actions, and the entry point for adding tasks. |
| AddTaskForm | Presentational | Collects new task input and emits submit events back to Board. |
| Column | Presentational | Displays tasks for a single workflow stage and receives data plus handlers via props. |
| TaskCard | Presentational | Renders an individual task and exposes user actions such as move, edit, or delete through callbacks. |

## Data Flow

State lives in Board and flows downward through props to Column and TaskCard. User actions such as adding a task or moving a task flow upward through callback props, so Board remains the single place that coordinates updates.

This keeps Column and TaskCard simple, reusable, and presentational. They do not own board logic; they only display data and notify Board when an action occurs.

## Notes for Later Sessions

Local React state can later be swapped for API-backed state from Node/Express + MongoDB without changing the component structure. The same prop boundaries can continue to work while the data source moves from in-memory state to server-backed persistence.

TaskCard move actions are the natural hook point for real-time updates with Socket.io and for conflict detection when multiple users edit the board at the same time.
