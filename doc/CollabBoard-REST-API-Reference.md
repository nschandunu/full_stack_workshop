# CollabBoard — REST API Reference

> **Version:** 1.0.0 &nbsp;|&nbsp; **Base URL:** `http://localhost:5000/api` &nbsp;|&nbsp; **Content-Type:** `application/json`

Complete endpoint reference for the CollabBoard Kanban application.
All timestamps follow ISO 8601 format. All IDs are returned as strings.

---

## Table of Contents

1. [Conventions](#conventions)
2. [Authentication](#1-authentication)
   - [POST /api/auth/register](#11-register-a-new-user)
   - [POST /api/auth/login](#12-log-in)
3. [Boards](#2-boards)
   - [GET /api/boards](#21-list-boards)
   - [POST /api/boards](#22-create-a-board)
   - [PUT /api/boards/:id](#23-update-a-board)
   - [DELETE /api/boards/:id](#24-delete-a-board)
4. [Columns (nested under Boards)](#3-columns)
   - [POST /api/boards/:id/columns](#31-add-a-column-to-a-board)
5. [Tasks](#4-tasks)
   - [GET /api/tasks](#41-list-tasks)
   - [GET /api/tasks/:id](#42-get-a-single-task)
   - [POST /api/tasks](#43-create-a-task)
   - [PUT /api/tasks/:id/move](#44-move-a-task-drag--drop)
   - [PUT /api/tasks/:id](#45-full-update-a-task)
   - [PATCH /api/tasks/:id](#46-partial-update-a-task)
   - [DELETE /api/tasks/:id](#47-delete-a-task)

---

## Conventions

### Authentication Header

All **protected** endpoints require a JSON Web Token passed in the `Authorization` header:

```
Authorization: Bearer <jwt>
```

Tokens are obtained from the `/api/auth/register` or `/api/auth/login` endpoints and expire according to the `JWT_EXPIRES_IN` environment variable (default: `7d`).

### Standard Error Envelope

Every error response uses one of two shapes, depending on the endpoint group:

**Auth endpoints:**
```json
{
  "error": "Human-readable error message."
}
```

**Board endpoints:**
```json
{
  "message": "Human-readable error message."
}
```

**Task endpoints:**
```json
{
  "error": {
    "message": "Human-readable error message."
  }
}
```

### Common HTTP Status Codes

| Code  | Meaning                                                 |
| ----- | ------------------------------------------------------- |
| `200` | Request succeeded                                       |
| `201` | Resource created                                        |
| `400` | Validation error — missing or malformed request body    |
| `401` | Authentication failed — missing, expired, or bad token  |
| `404` | Resource not found                                      |
| `409` | Conflict — duplicate resource (e.g. duplicate email)    |
| `500` | Internal server error                                   |

### Role System

| Role      | Display Name | Notes                              |
| --------- | ------------ | ---------------------------------- |
| `admin`   | Admin        | Full system access, user management |
| `manager` | Manager      | Create and edit boards/tasks        |
| `member`  | User         | View-only access                    |

---

## 1. Authentication

Auth endpoints are **public** (no token required) unless stated otherwise.

---

### 1.1 Register a New User

Creates a new user account and returns a signed JWT.

| Property      | Value                    |
| ------------- | ------------------------ |
| **Method**    | `POST`                   |
| **Path**      | `/api/auth/register`     |
| **Auth**      | None (public)            |

#### Headers

| Header         | Value              | Required |
| -------------- | ------------------ | -------- |
| `Content-Type` | `application/json` | Yes      |

#### Request Body Schema

| Field      | Type     | Required | Constraints                | Description                      |
| ---------- | -------- | -------- | -------------------------- | -------------------------------- |
| `name`     | `string` | Yes      | Non-empty                  | Full name of the user            |
| `email`    | `string` | Yes      | Valid email, unique         | Account email (stored lowercase) |
| `password` | `string` | Yes      | Minimum 6 characters       | Plain-text password              |
| `role`     | `string` | No       | `admin`, `manager`, `member` | Defaults to `member`           |

#### Example Request

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@company.com",
    "password": "secret123",
    "role": "manager"
  }'
```

#### Success Response — `201 Created`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI0NjUyODAwLCJleHAiOjE3MjUyNTc2MDB9.aBcDeFgHiJkLmNoPqRsTuVwXyZ",
  "user": {
    "id": 1,
    "name": "Jane Smith",
    "email": "jane@company.com",
    "role": "manager",
    "createdAt": "2026-08-27T10:00:00.000Z"
  }
}
```

#### Error Responses

**`400 Bad Request` — Missing required field:**
```json
{
  "error": "name, email, and password are required."
}
```

**`400 Bad Request` — Password too short:**
```json
{
  "error": "Password must be at least 6 characters."
}
```

**`409 Conflict` — Duplicate email:**
```json
{
  "error": "An account with that email already exists."
}
```

---

### 1.2 Log In

Authenticates an existing user and returns a signed JWT.

| Property      | Value                |
| ------------- | -------------------- |
| **Method**    | `POST`               |
| **Path**      | `/api/auth/login`    |
| **Auth**      | None (public)        |

#### Headers

| Header         | Value              | Required |
| -------------- | ------------------ | -------- |
| `Content-Type` | `application/json` | Yes      |

#### Request Body Schema

| Field      | Type     | Required | Description       |
| ---------- | -------- | -------- | ----------------- |
| `email`    | `string` | Yes      | Account email     |
| `password` | `string` | Yes      | Account password  |

#### Example Request

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@company.com",
    "password": "secret123"
  }'
```

#### Success Response — `200 OK`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI0NjUyODAwLCJleHAiOjE3MjUyNTc2MDB9.aBcDeFgHiJkLmNoPqRsTuVwXyZ",
  "user": {
    "id": 1,
    "name": "Jane Smith",
    "email": "jane@company.com",
    "role": "manager",
    "createdAt": "2026-08-27T10:00:00.000Z"
  }
}
```

#### Error Responses

**`400 Bad Request` — Missing credentials:**
```json
{
  "error": "email and password are required."
}
```

**`401 Unauthorized` — Invalid credentials:**
```json
{
  "error": "Invalid email or password."
}
```

> **Security note:** The same `401` message is returned whether the email or password is wrong, to prevent user enumeration.

---

## 2. Boards

All board endpoints are **protected** — a valid JWT must be sent via the `Authorization` header. Board operations are scoped to the authenticated user (owner).

---

### 2.1 List Boards

Returns all boards owned by the authenticated user.

| Property      | Value            |
| ------------- | ---------------- |
| **Method**    | `GET`            |
| **Path**      | `/api/boards`    |
| **Auth**      | Bearer token     |

#### Headers

| Header          | Value              | Required |
| --------------- | ------------------ | -------- |
| `Authorization` | `Bearer <jwt>`     | Yes      |

#### Request Body

_None._

#### Example Request

```bash
curl -X GET http://localhost:5000/api/boards \
  -H "Authorization: Bearer eyJhbGci..."
```

#### Success Response — `200 OK`

```json
[
  {
    "_id": "669f1a2b3c4d5e6f7a8b9c0d",
    "title": "Product Sprint Board",
    "owner": "669e0a1b2c3d4e5f6a7b8c9d",
    "columns": [
      { "_id": "669f1a2b3c4d5e6f7a8b9c0e", "name": "To Do", "order": 0 },
      { "_id": "669f1a2b3c4d5e6f7a8b9c0f", "name": "Doing", "order": 1 },
      { "_id": "669f1a2b3c4d5e6f7a8b9c10", "name": "Done", "order": 2 }
    ],
    "createdAt": "2026-08-27T09:00:00.000Z"
  }
]
```

#### Error Responses

**`401 Unauthorized` — Missing or invalid token:**
```json
{
  "message": "Not authorized, token failed"
}
```

**`500 Internal Server Error`:**
```json
{
  "message": "Failed to fetch boards",
  "error": "Detailed error description"
}
```

---

### 2.2 Create a Board

Creates a new board with three default columns: **To Do**, **Doing**, **Done**.

| Property      | Value            |
| ------------- | ---------------- |
| **Method**    | `POST`           |
| **Path**      | `/api/boards`    |
| **Auth**      | Bearer token     |

#### Headers

| Header          | Value              | Required |
| --------------- | ------------------ | -------- |
| `Authorization` | `Bearer <jwt>`     | Yes      |
| `Content-Type`  | `application/json` | Yes      |

#### Request Body Schema

| Field   | Type     | Required | Description            |
| ------- | -------- | -------- | ---------------------- |
| `title` | `string` | Yes      | Name of the new board  |

#### Example Request

```bash
curl -X POST http://localhost:5000/api/boards \
  -H "Authorization: Bearer eyJhbGci..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Product Sprint Board"
  }'
```

#### Success Response — `201 Created`

```json
{
  "_id": "669f1a2b3c4d5e6f7a8b9c0d",
  "title": "Product Sprint Board",
  "owner": "669e0a1b2c3d4e5f6a7b8c9d",
  "columns": [
    { "_id": "669f1a2b3c4d5e6f7a8b9c0e", "name": "To Do", "order": 0 },
    { "_id": "669f1a2b3c4d5e6f7a8b9c0f", "name": "Doing", "order": 1 },
    { "_id": "669f1a2b3c4d5e6f7a8b9c10", "name": "Done", "order": 2 }
  ],
  "createdAt": "2026-08-27T09:00:00.000Z"
}
```

#### Error Responses

**`400 Bad Request` — Missing title:**
```json
{
  "message": "Title is required"
}
```

**`500 Internal Server Error`:**
```json
{
  "message": "Failed to create board",
  "error": "Detailed error description"
}
```

---

### 2.3 Update a Board

Renames an existing board. The board must be owned by the authenticated user.

| Property      | Value                |
| ------------- | -------------------- |
| **Method**    | `PUT`                |
| **Path**      | `/api/boards/:id`    |
| **Auth**      | Bearer token         |

#### Path Parameters

| Parameter | Type     | Description                |
| --------- | -------- | -------------------------- |
| `id`      | `string` | MongoDB ObjectId of board  |

#### Headers

| Header          | Value              | Required |
| --------------- | ------------------ | -------- |
| `Authorization` | `Bearer <jwt>`     | Yes      |
| `Content-Type`  | `application/json` | Yes      |

#### Request Body Schema

| Field   | Type     | Required | Description        |
| ------- | -------- | -------- | ------------------ |
| `title` | `string` | Yes      | New board title    |

#### Example Request

```bash
curl -X PUT http://localhost:5000/api/boards/669f1a2b3c4d5e6f7a8b9c0d \
  -H "Authorization: Bearer eyJhbGci..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Renamed Sprint Board"
  }'
```

#### Success Response — `200 OK`

```json
{
  "_id": "669f1a2b3c4d5e6f7a8b9c0d",
  "title": "Renamed Sprint Board",
  "owner": "669e0a1b2c3d4e5f6a7b8c9d",
  "columns": [
    { "_id": "669f1a2b3c4d5e6f7a8b9c0e", "name": "To Do", "order": 0 },
    { "_id": "669f1a2b3c4d5e6f7a8b9c0f", "name": "Doing", "order": 1 },
    { "_id": "669f1a2b3c4d5e6f7a8b9c10", "name": "Done", "order": 2 }
  ],
  "createdAt": "2026-08-27T09:00:00.000Z"
}
```

#### Error Responses

**`404 Not Found`:**
```json
{
  "message": "Board not found"
}
```

**`500 Internal Server Error`:**
```json
{
  "message": "Failed to update board",
  "error": "Detailed error description"
}
```

---

### 2.4 Delete a Board

Permanently deletes a board. The board must be owned by the authenticated user.

> **Note:** Deleting a board does **not** currently cascade-delete its tasks. This is a planned Milestone 3 enhancement.

| Property      | Value                |
| ------------- | -------------------- |
| **Method**    | `DELETE`             |
| **Path**      | `/api/boards/:id`    |
| **Auth**      | Bearer token         |

#### Path Parameters

| Parameter | Type     | Description                |
| --------- | -------- | -------------------------- |
| `id`      | `string` | MongoDB ObjectId of board  |

#### Headers

| Header          | Value              | Required |
| --------------- | ------------------ | -------- |
| `Authorization` | `Bearer <jwt>`     | Yes      |

#### Request Body

_None._

#### Example Request

```bash
curl -X DELETE http://localhost:5000/api/boards/669f1a2b3c4d5e6f7a8b9c0d \
  -H "Authorization: Bearer eyJhbGci..."
```

#### Success Response — `200 OK`

```json
{
  "message": "Board deleted"
}
```

#### Error Responses

**`404 Not Found`:**
```json
{
  "message": "Board not found"
}
```

**`500 Internal Server Error`:**
```json
{
  "message": "Failed to delete board",
  "error": "Detailed error description"
}
```

---

## 3. Columns

Columns are **nested sub-documents** within a Board. They are managed through the parent board's endpoint.

---

### 3.1 Add a Column to a Board

Appends a new column to the board's `columns` array. The `order` value is auto-assigned based on the current column count.

| Property      | Value                         |
| ------------- | ----------------------------- |
| **Method**    | `POST`                        |
| **Path**      | `/api/boards/:id/columns`     |
| **Auth**      | Bearer token                  |

#### Path Parameters

| Parameter | Type     | Description                |
| --------- | -------- | -------------------------- |
| `id`      | `string` | MongoDB ObjectId of board  |

#### Headers

| Header          | Value              | Required |
| --------------- | ------------------ | -------- |
| `Authorization` | `Bearer <jwt>`     | Yes      |
| `Content-Type`  | `application/json` | Yes      |

#### Request Body Schema

| Field  | Type     | Required | Description              |
| ------ | -------- | -------- | ------------------------ |
| `name` | `string` | Yes      | Display name of column   |

#### Example Request

```bash
curl -X POST http://localhost:5000/api/boards/669f1a2b3c4d5e6f7a8b9c0d/columns \
  -H "Authorization: Bearer eyJhbGci..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "QA Review"
  }'
```

#### Success Response — `201 Created`

Returns the full board object with the new column appended:

```json
{
  "_id": "669f1a2b3c4d5e6f7a8b9c0d",
  "title": "Product Sprint Board",
  "owner": "669e0a1b2c3d4e5f6a7b8c9d",
  "columns": [
    { "_id": "669f1a2b3c4d5e6f7a8b9c0e", "name": "To Do", "order": 0 },
    { "_id": "669f1a2b3c4d5e6f7a8b9c0f", "name": "Doing", "order": 1 },
    { "_id": "669f1a2b3c4d5e6f7a8b9c10", "name": "Done", "order": 2 },
    { "_id": "669f1a2b3c4d5e6f7a8b9c11", "name": "QA Review", "order": 3 }
  ],
  "createdAt": "2026-08-27T09:00:00.000Z"
}
```

#### Error Responses

**`400 Bad Request` — Missing name:**
```json
{
  "message": "Column name is required"
}
```

**`404 Not Found`:**
```json
{
  "message": "Board not found"
}
```

**`500 Internal Server Error`:**
```json
{
  "message": "Failed to add column",
  "error": "Detailed error description"
}
```

---

## 4. Tasks

Task endpoints currently use an **in-memory store** (Milestone 2). The schema and response shapes will remain the same when migrated to MongoDB in Milestone 3.

> **Note:** Task routes do not currently enforce JWT auth. This will be added in Milestone 3.

---

### 4.1 List Tasks

Returns all tasks, with optional filtering by `boardId` and/or `columnId`.

| Property      | Value            |
| ------------- | ---------------- |
| **Method**    | `GET`            |
| **Path**      | `/api/tasks`     |
| **Auth**      | None (Milestone 2) / Bearer token (Milestone 3) |

#### Query Parameters

| Parameter   | Type     | Required | Description                              |
| ----------- | -------- | -------- | ---------------------------------------- |
| `boardId`   | `string` | No       | Filter tasks belonging to a specific board |
| `columnId`  | `string` | No       | Filter tasks belonging to a specific column |

#### Headers

| Header          | Value              | Required |
| --------------- | ------------------ | -------- |
| `Content-Type`  | `application/json` | No       |

#### Request Body

_None._

#### Example Request

```bash
# Fetch all tasks
curl -X GET http://localhost:5000/api/tasks

# Filter by board
curl -X GET "http://localhost:5000/api/tasks?boardId=board-1"

# Filter by column
curl -X GET "http://localhost:5000/api/tasks?columnId=col-inprogress"

# Combine filters
curl -X GET "http://localhost:5000/api/tasks?boardId=board-1&columnId=col-todo"
```

#### Success Response — `200 OK`

```json
[
  {
    "id": "task-1",
    "title": "Set up project scaffolding",
    "description": "Initialise Vite + React, configure ESLint and Prettier.",
    "columnId": "col-done",
    "boardId": "board-1",
    "priority": "high",
    "assignee": "user-1",
    "dueDate": "2026-08-10T23:59:59.000Z",
    "createdAt": "2026-08-01T08:00:00.000Z",
    "updatedAt": "2026-08-02T10:30:00.000Z"
  },
  {
    "id": "task-2",
    "title": "Design board layout",
    "description": "Wireframe the column and card components.",
    "columnId": "col-inprogress",
    "boardId": "board-1",
    "priority": "medium",
    "assignee": "user-2",
    "dueDate": "2026-08-10T23:59:59.000Z",
    "createdAt": "2026-08-03T09:00:00.000Z",
    "updatedAt": "2026-08-08T08:15:00.000Z"
  }
]
```

---

### 4.2 Get a Single Task

Returns a single task by its ID.

| Property      | Value                |
| ------------- | -------------------- |
| **Method**    | `GET`                |
| **Path**      | `/api/tasks/:id`     |
| **Auth**      | None (Milestone 2) / Bearer token (Milestone 3) |

#### Path Parameters

| Parameter | Type     | Description     |
| --------- | -------- | --------------- |
| `id`      | `string` | Task identifier |

#### Headers

| Header          | Value              | Required |
| --------------- | ------------------ | -------- |
| `Content-Type`  | `application/json` | No       |

#### Request Body

_None._

#### Example Request

```bash
curl -X GET http://localhost:5000/api/tasks/task-1
```

#### Success Response — `200 OK`

```json
{
  "id": "task-1",
  "title": "Set up project scaffolding",
  "description": "Initialise Vite + React, configure ESLint and Prettier.",
  "columnId": "col-done",
  "boardId": "board-1",
  "priority": "high",
  "assignee": "user-1",
  "dueDate": "2026-08-10T23:59:59.000Z",
  "createdAt": "2026-08-01T08:00:00.000Z",
  "updatedAt": "2026-08-02T10:30:00.000Z"
}
```

#### Error Responses

**`404 Not Found`:**
```json
{
  "error": {
    "message": "Task with id 'task-999' not found."
  }
}
```

---

### 4.3 Create a Task

Creates a new task card within a board column.

| Property      | Value            |
| ------------- | ---------------- |
| **Method**    | `POST`           |
| **Path**      | `/api/tasks`     |
| **Auth**      | None (Milestone 2) / Bearer token (Milestone 3) |

#### Headers

| Header          | Value              | Required |
| --------------- | ------------------ | -------- |
| `Content-Type`  | `application/json` | Yes      |

#### Request Body Schema

| Field         | Type     | Required | Default     | Constraints                                   | Description                        |
| ------------- | -------- | -------- | ----------- | --------------------------------------------- | ---------------------------------- |
| `title`       | `string` | Yes      | —           | Non-empty, whitespace-trimmed                 | Task card title                    |
| `description` | `string` | No       | `""`        |                                               | Detailed description               |
| `columnId`    | `string` | Yes      | —           | Must match a valid column ID                  | Column the task belongs to         |
| `boardId`     | `string` | No       | `"board-1"` |                                               | Board the task belongs to          |
| `priority`    | `string` | No       | `"medium"`  | `"low"`, `"medium"`, `"high"`                 | Task priority level                |
| `assignee`    | `string` | No       | `null`      |                                               | User ID of the assignee            |
| `dueDate`     | `string` | No       | `null`      | ISO 8601 date-time                            | Deadline for the task              |

#### Example Request

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Design Login Form",
    "description": "Create wireframes and interactive mockups for the login screen.",
    "columnId": "col-todo",
    "boardId": "board-1",
    "priority": "high",
    "assignee": "user-1",
    "dueDate": "2026-09-01T23:59:59.000Z"
  }'
```

#### Success Response — `201 Created`

```json
{
  "id": "task_1724652800000",
  "title": "Design Login Form",
  "description": "Create wireframes and interactive mockups for the login screen.",
  "columnId": "col-todo",
  "boardId": "board-1",
  "priority": "high",
  "assignee": "user-1",
  "dueDate": "2026-09-01T23:59:59.000Z",
  "createdAt": "2026-08-27T10:00:00.000Z",
  "updatedAt": "2026-08-27T10:00:00.000Z"
}
```

#### Error Responses

**`400 Bad Request` — Missing required field:**
```json
{
  "error": {
    "message": "Field 'title' is required and cannot be empty."
  }
}
```

---

### 4.4 Move a Task (Drag & Drop)

Moves a task to a different column. Designed for drag-and-drop interactions — only the `targetColumnId` is required.

| Property      | Value                     |
| ------------- | ------------------------- |
| **Method**    | `PUT`                     |
| **Path**      | `/api/tasks/:id/move`     |
| **Auth**      | None (Milestone 2) / Bearer token (Milestone 3) |

#### Path Parameters

| Parameter | Type     | Description     |
| --------- | -------- | --------------- |
| `id`      | `string` | Task identifier |

#### Headers

| Header          | Value              | Required |
| --------------- | ------------------ | -------- |
| `Content-Type`  | `application/json` | Yes      |

#### Request Body Schema

| Field            | Type     | Required | Description                         |
| ---------------- | -------- | -------- | ----------------------------------- |
| `targetColumnId` | `string` | Yes      | ID of the destination column        |

#### Example Request

```bash
curl -X PUT http://localhost:5000/api/tasks/task-1/move \
  -H "Content-Type: application/json" \
  -d '{
    "targetColumnId": "col-inprogress"
  }'
```

#### Success Response — `200 OK`

```json
{
  "id": "task-1",
  "title": "Set up project scaffolding",
  "description": "Initialise Vite + React, configure ESLint and Prettier.",
  "columnId": "col-inprogress",
  "boardId": "board-1",
  "priority": "high",
  "assignee": "user-1",
  "dueDate": "2026-08-10T23:59:59.000Z",
  "createdAt": "2026-08-01T08:00:00.000Z",
  "updatedAt": "2026-08-27T10:15:00.000Z"
}
```

#### Error Responses

**`400 Bad Request` — Missing target column:**
```json
{
  "error": {
    "message": "Field 'targetColumnId' is required."
  }
}
```

**`404 Not Found`:**
```json
{
  "error": {
    "message": "Task with id 'task-999' not found."
  }
}
```

---

### 4.5 Full Update a Task

Replaces all mutable fields on a task. Any field not provided will remain unchanged (the controller merges only defined fields).

| Property      | Value                |
| ------------- | -------------------- |
| **Method**    | `PUT`                |
| **Path**      | `/api/tasks/:id`     |
| **Auth**      | None (Milestone 2) / Bearer token (Milestone 3) |

#### Path Parameters

| Parameter | Type     | Description     |
| --------- | -------- | --------------- |
| `id`      | `string` | Task identifier |

#### Headers

| Header          | Value              | Required |
| --------------- | ------------------ | -------- |
| `Content-Type`  | `application/json` | Yes      |

#### Request Body Schema

| Field         | Type     | Required | Description                        |
| ------------- | -------- | -------- | ---------------------------------- |
| `title`       | `string` | No       | Updated title (whitespace-trimmed) |
| `description` | `string` | No       | Updated description                |
| `columnId`    | `string` | No       | Move to a different column         |
| `boardId`     | `string` | No       | Move to a different board          |
| `priority`    | `string` | No       | `"low"`, `"medium"`, `"high"`      |
| `assignee`    | `string` | No       | Reassign to a different user       |
| `dueDate`     | `string` | No       | Updated deadline (ISO 8601)        |

#### Example Request

```bash
curl -X PUT http://localhost:5000/api/tasks/task-1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Scaffolding Task",
    "priority": "medium",
    "assignee": "user-3",
    "dueDate": "2026-09-15T23:59:59.000Z"
  }'
```

#### Success Response — `200 OK`

```json
{
  "id": "task-1",
  "title": "Updated Scaffolding Task",
  "description": "Initialise Vite + React, configure ESLint and Prettier.",
  "columnId": "col-done",
  "boardId": "board-1",
  "priority": "medium",
  "assignee": "user-3",
  "dueDate": "2026-09-15T23:59:59.000Z",
  "createdAt": "2026-08-01T08:00:00.000Z",
  "updatedAt": "2026-08-27T11:30:00.000Z"
}
```

#### Error Responses

**`404 Not Found`:**
```json
{
  "error": {
    "message": "Task with id 'task-999' not found."
  }
}
```

---

### 4.6 Partial Update a Task

Updates only the specified fields on a task. Functionally identical to `PUT /api/tasks/:id` — both use the same controller logic and merge only provided fields.

| Property      | Value                |
| ------------- | -------------------- |
| **Method**    | `PATCH`              |
| **Path**      | `/api/tasks/:id`     |
| **Auth**      | None (Milestone 2) / Bearer token (Milestone 3) |

#### Path Parameters

| Parameter | Type     | Description     |
| --------- | -------- | --------------- |
| `id`      | `string` | Task identifier |

#### Headers

| Header          | Value              | Required |
| --------------- | ------------------ | -------- |
| `Content-Type`  | `application/json` | Yes      |

#### Request Body Schema

All fields are optional. Only provided fields will be updated.

| Field         | Type     | Description                        |
| ------------- | -------- | ---------------------------------- |
| `title`       | `string` | Updated title (whitespace-trimmed) |
| `description` | `string` | Updated description                |
| `columnId`    | `string` | Move to a different column         |
| `boardId`     | `string` | Move to a different board          |
| `priority`    | `string` | `"low"`, `"medium"`, `"high"`      |
| `assignee`    | `string` | Reassign to a different user       |
| `dueDate`     | `string` | Updated deadline (ISO 8601)        |

#### Example Request

```bash
curl -X PATCH http://localhost:5000/api/tasks/task-1 \
  -H "Content-Type: application/json" \
  -d '{
    "priority": "low",
    "assignee": "user-2"
  }'
```

#### Success Response — `200 OK`

```json
{
  "id": "task-1",
  "title": "Set up project scaffolding",
  "description": "Initialise Vite + React, configure ESLint and Prettier.",
  "columnId": "col-done",
  "boardId": "board-1",
  "priority": "low",
  "assignee": "user-2",
  "dueDate": "2026-08-10T23:59:59.000Z",
  "createdAt": "2026-08-01T08:00:00.000Z",
  "updatedAt": "2026-08-27T12:00:00.000Z"
}
```

#### Error Responses

**`404 Not Found`:**
```json
{
  "error": {
    "message": "Task with id 'task-999' not found."
  }
}
```

---

### 4.7 Delete a Task

Permanently removes a task from the store.

| Property      | Value                |
| ------------- | -------------------- |
| **Method**    | `DELETE`             |
| **Path**      | `/api/tasks/:id`     |
| **Auth**      | None (Milestone 2) / Bearer token (Milestone 3) |

#### Path Parameters

| Parameter | Type     | Description     |
| --------- | -------- | --------------- |
| `id`      | `string` | Task identifier |

#### Headers

| Header          | Value              | Required |
| --------------- | ------------------ | -------- |
| `Content-Type`  | `application/json` | No       |

#### Request Body

_None._

#### Example Request

```bash
curl -X DELETE http://localhost:5000/api/tasks/task-1
```

#### Success Response — `200 OK`

```json
{
  "message": "Task 'task-1' deleted successfully."
}
```

#### Error Responses

**`404 Not Found`:**
```json
{
  "error": {
    "message": "Task with id 'task-999' not found."
  }
}
```

---

## Appendix A — Data Model Schemas

### User Object

```json
{
  "id": 1,
  "name": "Jane Smith",
  "email": "jane@company.com",
  "role": "manager",
  "createdAt": "2026-08-27T10:00:00.000Z"
}
```

> `passwordHash` is never exposed in API responses.

### Board Object (Mongoose)

```json
{
  "_id": "669f1a2b3c4d5e6f7a8b9c0d",
  "title": "Product Sprint Board",
  "owner": "669e0a1b2c3d4e5f6a7b8c9d",
  "columns": [
    { "_id": "669f1a2b3c4d5e6f7a8b9c0e", "name": "To Do", "order": 0 },
    { "_id": "669f1a2b3c4d5e6f7a8b9c0f", "name": "Doing", "order": 1 },
    { "_id": "669f1a2b3c4d5e6f7a8b9c10", "name": "Done", "order": 2 }
  ],
  "createdAt": "2026-08-27T09:00:00.000Z"
}
```

### Column Sub-Document

```json
{
  "_id": "669f1a2b3c4d5e6f7a8b9c0e",
  "name": "To Do",
  "order": 0
}
```

### Task Object (In-Memory Store)

```json
{
  "id": "task-1",
  "title": "Set up project scaffolding",
  "description": "Initialise Vite + React, configure ESLint and Prettier.",
  "columnId": "col-done",
  "boardId": "board-1",
  "priority": "high",
  "assignee": "user-1",
  "dueDate": "2026-08-10T23:59:59.000Z",
  "createdAt": "2026-08-01T08:00:00.000Z",
  "updatedAt": "2026-08-02T10:30:00.000Z"
}
```

---

## Appendix B — Endpoint Quick-Reference

| #  | Method   | Path                          | Auth   | Status Codes           | Description                        |
|----|----------|-------------------------------|--------|------------------------|------------------------------------|
| 1  | `POST`   | `/api/auth/register`          | Public | `201`, `400`, `409`    | Register a new user                |
| 2  | `POST`   | `/api/auth/login`             | Public | `200`, `400`, `401`    | Log in an existing user            |
| 3  | `GET`    | `/api/boards`                 | Bearer | `200`, `401`, `500`    | List boards for current user       |
| 4  | `POST`   | `/api/boards`                 | Bearer | `201`, `400`, `500`    | Create a new board                 |
| 5  | `PUT`    | `/api/boards/:id`             | Bearer | `200`, `404`, `500`    | Rename a board                     |
| 6  | `DELETE` | `/api/boards/:id`             | Bearer | `200`, `404`, `500`    | Delete a board                     |
| 7  | `POST`   | `/api/boards/:id/columns`     | Bearer | `201`, `400`, `404`, `500` | Add a column to a board        |
| 8  | `GET`    | `/api/tasks`                  | —*     | `200`                  | List all tasks (with filters)      |
| 9  | `GET`    | `/api/tasks/:id`              | —*     | `200`, `404`           | Get a single task                  |
| 10 | `POST`   | `/api/tasks`                  | —*     | `201`, `400`           | Create a new task                  |
| 11 | `PUT`    | `/api/tasks/:id/move`         | —*     | `200`, `400`, `404`    | Move task to another column        |
| 12 | `PUT`    | `/api/tasks/:id`              | —*     | `200`, `404`           | Full-update a task                 |
| 13 | `PATCH`  | `/api/tasks/:id`              | —*     | `200`, `404`           | Partial-update a task              |
| 14 | `DELETE` | `/api/tasks/:id`              | —*     | `200`, `404`           | Delete a task                      |

_*Task auth will be enforced via Bearer token in Milestone 3._

---

## Appendix C — Milestone 3 API Roadmap

These changes are planned but **not yet implemented**:

- [ ] `GET /api/auth/me` — Returns full profile with extended fields (`phone`, `jobTitle`, `bio`, etc.)
- [ ] `PATCH /api/auth/profile` — Save profile edits for the authenticated user
- [ ] JWT auth middleware on all `/api/tasks` routes
- [ ] Cascade-delete tasks when a board is deleted
- [ ] Mongoose migration for the Task model (replacing in-memory store)
- [ ] Real aggregation queries for dashboard stats
- [ ] Admin-only endpoint to change user roles
