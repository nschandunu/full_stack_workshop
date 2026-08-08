// @ts-check
import { z } from "zod";

export const TaskPriority = z.enum(["low", "medium", "high"]);
export const UserRole = z.enum(["admin", "member"]);

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  columnId: z.string(),
  priority: TaskPriority.default("medium"),
  assignee: z.string().optional(),
  dueDate: z.string().datetime({ offset: true }).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ColumnSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  order: z.number().int().nonnegative(),
  taskIds: z.array(z.string()),
});

export const BoardSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  columnIds: z.array(z.string()),
  createdAt: z.string(),
});

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  avatarUrl: z.string().url().optional(),
  role: UserRole.default("member"),
});

/** @typedef {z.infer<typeof TaskPriority>} TaskPriority */
/** @typedef {z.infer<typeof UserRole>} UserRole */
/** @typedef {z.infer<typeof TaskSchema>} Task */
/** @typedef {z.infer<typeof ColumnSchema>} Column */
/** @typedef {z.infer<typeof BoardSchema>} Board */
/** @typedef {z.infer<typeof UserSchema>} User */