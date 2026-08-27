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
