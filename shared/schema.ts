import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table with auth support
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const aiAgents = pgTable("ai_agents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  model: text("model").notNull(),
  status: text("status").notNull().default("stopped"), // running, stopped, scaling, error
  gpuId: varchar("gpu_id"),
  cpuUtilization: decimal("cpu_utilization", { precision: 5, scale: 2 }).default("0"),
  requestsPerMinute: integer("requests_per_minute").default(0),
  lastActivity: timestamp("last_activity").defaultNow(),
  configuration: jsonb("configuration"),
  userId: varchar("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const gpuResources = pgTable("gpu_resources", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  model: text("model").notNull(), // RTX 4090, A100, H100
  vram: text("vram").notNull(), // 24GB VRAM, 80GB HBM2e, etc.
  pricePerHour: decimal("price_per_hour", { precision: 8, scale: 2 }).notNull(),
  status: text("status").notNull().default("available"), // available, in_use, maintenance
  provider: text("provider").notNull(),
  region: text("region"),
  specifications: jsonb("specifications"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const resourceUsage = pgTable("resource_usage", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  agentId: varchar("agent_id").references(() => aiAgents.id),
  gpuId: varchar("gpu_id").references(() => gpuResources.id),
  gpuUtilization: decimal("gpu_utilization", { precision: 5, scale: 2 }).notNull(),
  cpuUtilization: decimal("cpu_utilization", { precision: 5, scale: 2 }).notNull(),
  memoryUsage: decimal("memory_usage", { precision: 5, scale: 2 }).notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const costAnalytics = pgTable("cost_analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  period: text("period").notNull(), // daily, weekly, monthly
  gpuRentalCost: decimal("gpu_rental_cost", { precision: 10, scale: 2 }).default("0"),
  apiUsageCost: decimal("api_usage_cost", { precision: 10, scale: 2 }).default("0"),
  infrastructureCost: decimal("infrastructure_cost", { precision: 10, scale: 2 }).default("0"),
  totalCost: decimal("total_cost", { precision: 10, scale: 2 }).default("0"),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const performanceMetrics = pgTable("performance_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  agentId: varchar("agent_id").references(() => aiAgents.id),
  avgResponseTime: decimal("avg_response_time", { precision: 8, scale: 2 }).notNull(), // in milliseconds
  throughput: integer("throughput").notNull(), // requests per minute
  successRate: decimal("success_rate", { precision: 5, scale: 2 }).notNull(), // percentage
  errorRate: decimal("error_rate", { precision: 5, scale: 2 }).notNull(), // percentage
  timestamp: timestamp("timestamp").defaultNow(),
});

export const alerts = pgTable("alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  type: text("type").notNull(), // cost, performance, resource, error
  severity: text("severity").notNull(), // low, medium, high, critical
  title: text("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// UpsertUser for auth system
export const upsertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertAiAgentSchema = createInsertSchema(aiAgents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertGpuResourceSchema = createInsertSchema(gpuResources).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertResourceUsageSchema = createInsertSchema(resourceUsage).omit({
  id: true,
  timestamp: true,
});

export const insertCostAnalyticsSchema = createInsertSchema(costAnalytics).omit({
  id: true,
  createdAt: true,
});

export const insertPerformanceMetricsSchema = createInsertSchema(performanceMetrics).omit({
  id: true,
  timestamp: true,
});

export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertAiAgent = z.infer<typeof insertAiAgentSchema>;
export type AiAgent = typeof aiAgents.$inferSelect;

export type InsertGpuResource = z.infer<typeof insertGpuResourceSchema>;
export type GpuResource = typeof gpuResources.$inferSelect;

export type InsertResourceUsage = z.infer<typeof insertResourceUsageSchema>;
export type ResourceUsage = typeof resourceUsage.$inferSelect;

export type InsertCostAnalytics = z.infer<typeof insertCostAnalyticsSchema>;
export type CostAnalytics = typeof costAnalytics.$inferSelect;

export type InsertPerformanceMetrics = z.infer<typeof insertPerformanceMetricsSchema>;
export type PerformanceMetrics = typeof performanceMetrics.$inferSelect;

export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type Alert = typeof alerts.$inferSelect;
