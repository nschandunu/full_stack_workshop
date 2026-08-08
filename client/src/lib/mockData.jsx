// @ts-check
import {
  TaskSchema,
  ColumnSchema,
  BoardSchema,
  UserSchema,
} from "./types.jsx";

export const mockUsers = [
  UserSchema.parse({
    id: "user-1",
    name: "Alice Chen",
    email: "alice.chen@example.com",
    avatarUrl: "https://i.pravatar.cc/150?u=alice.chen@example.com",
    role: "admin",
  }),
  UserSchema.parse({
    id: "user-2",
    name: "Bob Martinez",
    email: "bob.martinez@example.com",
    avatarUrl: "https://i.pravatar.cc/150?u=bob.martinez@example.com",
    role: "member",
  }),
  UserSchema.parse({
    id: "user-3",
    name: "Clara Osei",
    email: "clara.osei@example.com",
    avatarUrl: "https://i.pravatar.cc/150?u=clara.osei@example.com",
    role: "member",
  }),
];

export const mockTasks = [
  TaskSchema.parse({
    id: "task-1",
    title: "Set up project scaffolding",
    description: "Initialise Vite + React, configure ESLint and Prettier.",
    columnId: "col-done",
    priority: "high",
    assignee: "user-1",
    createdAt: "2026-08-01T08:00:00.000Z",
    updatedAt: "2026-08-02T10:30:00.000Z",
  }),
  TaskSchema.parse({
    id: "task-2",
    title: "Design board layout",
    description: "Wireframe the column and card components.",
    columnId: "col-inprogress",
    priority: "medium",
    assignee: "user-2",
    dueDate: "2026-08-10T23:59:59.000Z",
    createdAt: "2026-08-03T09:00:00.000Z",
    updatedAt: "2026-08-08T08:15:00.000Z",
  }),
  TaskSchema.parse({
    id: "task-3",
    title: "Implement drag-and-drop",
    description: "Use @dnd-kit to enable card reordering between columns.",
    columnId: "col-inprogress",
    priority: "high",
    assignee: "user-3",
    dueDate: "2026-08-15T23:59:59.000Z",
    createdAt: "2026-08-04T11:00:00.000Z",
    updatedAt: "2026-08-08T09:00:00.000Z",
  }),
  TaskSchema.parse({
    id: "task-4",
    title: "Write unit tests for schemas",
    description: "Cover all Zod schemas with Vitest test cases.",
    columnId: "col-todo",
    priority: "low",
    assignee: "user-1",
    dueDate: "2026-08-20T23:59:59.000Z",
    createdAt: "2026-08-05T14:00:00.000Z",
    updatedAt: "2026-08-05T14:00:00.000Z",
  }),
];

export const mockColumns = [
  ColumnSchema.parse({
    id: "col-todo",
    title: "To Do",
    order: 0,
    taskIds: ["task-4"],
  }),
  ColumnSchema.parse({
    id: "col-inprogress",
    title: "In Progress",
    order: 1,
    taskIds: ["task-2", "task-3"],
  }),
  ColumnSchema.parse({
    id: "col-done",
    title: "Done",
    order: 2,
    taskIds: ["task-1"],
  }),
];

export const mockBoard = BoardSchema.parse({
  id: "board-1",
  title: "Full-Stack Workshop Board",
  columnIds: ["col-todo", "col-inprogress", "col-done"],
  createdAt: "2026-08-01T07:00:00.000Z",
});
