# CollabBoard — State Management Plan

## State Variables

| State | Type | Description |
| --- | --- | --- |
| boards | `Board[]` | Collection of all boards available in the app. |
| columns | `Column[]` | Ordered workflow columns for the active board, such as To Do, Doing, and Done. |
| tasks | `Task[]` | Task items displayed inside each column, including their current status and metadata. |
| activeBoardId | `string \| null` | Identifier for the board currently selected by the user. |
| taskFormInput | `string` | Local input value used while composing a new task in `AddTaskForm`. |

## State Ownership

`Board` owns the shared application state: `boards`, `columns`, `tasks`, and `activeBoardId`. Keeping these values in `Board` makes them available to `Column` and `TaskCard` through props, which is important because both components need the same source of truth for rendering and updates. This is a classic case for lifting state up so sibling components can stay in sync without duplicating task data.

`AddTaskForm` owns its own input state, such as `taskFormInput`, because that value is only needed while the user is typing in the form. Once the form is submitted, the value is passed upward to `Board` through a callback prop and then cleared locally.

This split keeps shared board data centralized while allowing small UI-specific state to stay close to the component that uses it.

## Update Flow

State changes follow a simple path: user action in a child component → callback prop → state update in `Board` → re-render down through props.

For example, when a user adds a task from `AddTaskForm`, the form submits the new data to a callback owned by `Board`. `Board` updates its task list, and the new state flows back into `Column` and `TaskCard` through props. The same pattern applies to actions like moving a task between columns.

## Future API Integration

This local state can later be replaced with state synced from a Node/Express + MongoDB API without changing how child components consume data. `Board` can load and refresh data with `useEffect` and `fetch`, or through a data-fetching library, while `Column`, `TaskCard`, and `AddTaskForm` continue to receive the same props and callbacks.

That lets the app evolve from local state to server-backed state without rewriting the component structure.
