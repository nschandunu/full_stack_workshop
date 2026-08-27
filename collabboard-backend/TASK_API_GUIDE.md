# CollabBoard — Task Lifecycle API Documentation (Member 4)

## Overview
The Task Lifecycle API provides full CRUD capabilities and workflow state transition handling for task cards within CollabBoard. It supports fast drag-and-drop column transitions, detail updates, filtering by board and column, and task deletion.

## Base URL
`http://localhost:5000/api/tasks`

## Endpoint Summary Table

| Method | Path | Purpose | Status Code |
|---|---|---|---|
| `GET` | `/api/tasks` | Fetch all tasks with optional `boardId` and `columnId` query filtering | 200 OK |
| `GET` | `/api/tasks/:id` | Fetch a single task by ID | 200 OK / 404 Not Found |
| `POST` | `/api/tasks` | Create a new task card in a column | 201 Created / 400 Bad Request |
| `PUT` | `/api/tasks/:id/move` | Move a task to a target column (drag-and-drop) | 200 OK / 400 Bad Request / 404 Not Found |
| `PUT` | `/api/tasks/:id` | Update full task details | 200 OK / 404 Not Found |
| `PATCH` | `/api/tasks/:id` | Update partial task details | 200 OK / 404 Not Found |
| `DELETE` | `/api/tasks/:id` | Remove a task card | 200 OK / 404 Not Found |

## JSON Payload Examples

### Task Creation (`POST /api/tasks`)
```json
{
  "title": "Design Login Form",
  "description": "Create wireframes and interactive mockups for the login screen.",
  "columnId": "col-todo",
  "boardId": "board-1",
  "priority": "high",
  "assignee": "user-1",
  "dueDate": "2026-09-01T23:59:59.000Z"
}
```

### Task Movement (`PUT /api/tasks/:id/move`)
```json
{
  "targetColumnId": "col-inprogress"
}
```

### Task Editing (`PATCH /api/tasks/:id`)
```json
{
  "priority": "low",
  "assignee": "user-2",
  "dueDate": "2026-09-15T23:59:59.000Z"
}
```

## Error Response Formats

### 400 Bad Request
```json
{
  "error": {
    "message": "Field 'title' is required and cannot be empty."
  }
}
```

### 404 Not Found
```json
{
  "error": {
    "message": "Task with id 'task_999' not found."
  }
}
```
