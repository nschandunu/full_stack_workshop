# CollabBoard — API Contract (Frontend Expectations)

## Task Object Shape

~~~json
{
  "id": "task_123",
  "title": "Design login flow",
  "description": "Create desktop and mobile wireframes for login.",
  "status": "todo",
  "boardId": "board_001",
  "createdAt": "2026-08-07T10:15:30.000Z",
  "updatedAt": "2026-08-07T11:05:12.000Z"
}
~~~

## Board Object Shape

~~~json
{
  "id": "board_001",
  "name": "Product Sprint Board",
  "ownerId": "user_789",
  "createdAt": "2026-08-07T09:00:00.000Z"
}
~~~

## Expected Endpoints

| Method | Endpoint | Purpose | Expected Response |
| --- | --- | --- | --- |
| GET | /api/boards | Fetch all boards visible to the current user. | 200 OK with an array of board objects. |
| POST | /api/boards | Create a new board. | 201 Created with the created board object. |
| GET | /api/boards/:id/tasks | Fetch all tasks for a specific board. | 200 OK with an array of task objects for that board. |
| POST | /api/tasks | Create a task within a board and column. | 201 Created with the created task object. |
| PATCH | /api/tasks/:id | Update task fields, especially status for column movement. | 200 OK with the updated task object. |
| DELETE | /api/tasks/:id | Remove a task. | 200 OK or 204 No Content with successful deletion confirmation. |

## Notes for Backend Team

- Keep status values consistent and restricted to todo, doing, and done.
- Always return createdAt and updatedAt timestamps to support ordering and conflict detection.
- Use a consistent error format with HTTP status code and a readable message.
- Return stable ids as strings so frontend state updates and caching remain predictable.
