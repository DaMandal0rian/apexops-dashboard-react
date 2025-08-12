import { 
  type User, 
  type InsertUser,
  type UpsertUser,
  type AiAgent,
  type InsertAiAgent,
  type GpuResource,
  type InsertGpuResource,
  type ResourceUsage,
  type InsertResourceUsage,
  type CostAnalytics,
  type InsertCostAnalytics,
  type PerformanceMetrics,
  type InsertPerformanceMetrics,
  type Alert,
  type InsertAlert,
  users,
  aiAgents,
  gpuResources,
  resourceUsage,
  costAnalytics,
  performanceMetrics,
  alerts
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  // User management (auth compatible)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // AI Agent management
  getAiAgents(userId?: string): Promise<AiAgent[]>;
  getAiAgent(id: string): Promise<AiAgent | undefined>;
  createAiAgent(agent: InsertAiAgent): Promise<AiAgent>;
  updateAiAgent(id: string, agent: Partial<AiAgent>): Promise<AiAgent>;
  deleteAiAgent(id: string): Promise<boolean>;

  // GPU Resource management
  getGpuResources(): Promise<GpuResource[]>;
  getAvailableGpuResources(): Promise<GpuResource[]>;
  getGpuResource(id: string): Promise<GpuResource | undefined>;
  createGpuResource(resource: InsertGpuResource): Promise<GpuResource>;
  updateGpuResourceStatus(id: string, status: string): Promise<GpuResource>;

  // Resource Usage tracking
  createResourceUsage(usage: InsertResourceUsage): Promise<ResourceUsage>;
  getResourceUsageByAgent(agentId: string, limit?: number): Promise<ResourceUsage[]>;
  getRecentResourceUsage(limit?: number): Promise<ResourceUsage[]>;

  // Cost Analytics
  getCostAnalytics(userId: string, period?: string): Promise<CostAnalytics[]>;
  createCostAnalytics(analytics: InsertCostAnalytics): Promise<CostAnalytics>;

  // Performance Metrics
  getPerformanceMetrics(agentId?: string): Promise<PerformanceMetrics[]>;
  createPerformanceMetrics(metrics: InsertPerformanceMetrics): Promise<PerformanceMetrics>;

  // Alerts
  getAlerts(userId: string): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  markAlertAsRead(id: string): Promise<boolean>;

  // Dashboard and Analytics
  getDashboardStats(): Promise<any>;
  getAnalytics(timeRange: string, metricType: string): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  // User methods (auth compatible)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }



  // AI Agent methods
  async getAiAgents(userId?: string): Promise<AiAgent[]> {
    if (userId) {
      return await db.select().from(aiAgents).where(eq(aiAgents.userId, userId));
    }
    return await db.select().from(aiAgents);
  }

  async getAiAgent(id: string): Promise<AiAgent | undefined> {
    const [agent] = await db.select().from(aiAgents).where(eq(aiAgents.id, id));
    return agent;
  }

  async createAiAgent(insertAgent: InsertAiAgent): Promise<AiAgent> {
    const [agent] = await db.insert(aiAgents).values(insertAgent).returning();
    return agent;
  }

  async updateAiAgent(id: string, update: Partial<AiAgent>): Promise<AiAgent> {
    const [agent] = await db
      .update(aiAgents)
      .set({ ...update, updatedAt: new Date() })
      .where(eq(aiAgents.id, id))
      .returning();
    
    if (!agent) throw new Error("Agent not found");
    return agent;
  }

  async deleteAiAgent(id: string): Promise<boolean> {
    const result = await db.delete(aiAgents).where(eq(aiAgents.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // GPU Resource methods
  async getGpuResources(): Promise<GpuResource[]> {
    return await db.select().from(gpuResources);
  }

  async getAvailableGpuResources(): Promise<GpuResource[]> {
    return await db.select().from(gpuResources).where(eq(gpuResources.status, "available"));
  }

  async getGpuResource(id: string): Promise<GpuResource | undefined> {
    const [resource] = await db.select().from(gpuResources).where(eq(gpuResources.id, id));
    return resource;
  }

  async createGpuResource(insertResource: InsertGpuResource): Promise<GpuResource> {
    const [resource] = await db.insert(gpuResources).values(insertResource).returning();
    return resource;
  }

  async updateGpuResourceStatus(id: string, status: string): Promise<GpuResource> {
    const [resource] = await db
      .update(gpuResources)
      .set({ status, updatedAt: new Date() })
      .where(eq(gpuResources.id, id))
      .returning();
    
    if (!resource) throw new Error("GPU resource not found");
    return resource;
  }

  // Resource Usage methods
  async createResourceUsage(insertUsage: InsertResourceUsage): Promise<ResourceUsage> {
    const [usage] = await db.insert(resourceUsage).values(insertUsage).returning();
    return usage;
  }

  async getResourceUsageByAgent(agentId: string, limit = 100): Promise<ResourceUsage[]> {
    return await db
      .select()
      .from(resourceUsage)
      .where(eq(resourceUsage.agentId, agentId))
      .orderBy(desc(resourceUsage.timestamp))
      .limit(limit);
  }

  async getRecentResourceUsage(limit = 100): Promise<ResourceUsage[]> {
    return await db
      .select()
      .from(resourceUsage)
      .orderBy(desc(resourceUsage.timestamp))
      .limit(limit);
  }

  // Cost Analytics methods
  async getCostAnalytics(userId: string, period?: string): Promise<CostAnalytics[]> {
    let query = db.select().from(costAnalytics).where(eq(costAnalytics.userId, userId));
    
    if (period) {
      query = query.where(eq(costAnalytics.period, period));
    }
    
    return await query.orderBy(costAnalytics.date);
  }

  async createCostAnalytics(insertAnalytics: InsertCostAnalytics): Promise<CostAnalytics> {
    const [analytics] = await db.insert(costAnalytics).values(insertAnalytics).returning();
    return analytics;
  }

  // Performance Metrics methods
  async getPerformanceMetrics(agentId?: string): Promise<PerformanceMetrics[]> {
    if (agentId) {
      return await db
        .select()
        .from(performanceMetrics)
        .where(eq(performanceMetrics.agentId, agentId))
        .orderBy(performanceMetrics.timestamp);
    }
    return await db.select().from(performanceMetrics).orderBy(performanceMetrics.timestamp);
  }

  async createPerformanceMetrics(insertMetrics: InsertPerformanceMetrics): Promise<PerformanceMetrics> {
    const [metrics] = await db.insert(performanceMetrics).values(insertMetrics).returning();
    return metrics;
  }

  // Alert methods
  async getAlerts(userId: string): Promise<Alert[]> {
    return await db
      .select()
      .from(alerts)
      .where(eq(alerts.userId, userId))
      .orderBy(alerts.createdAt);
  }

  async createAlert(insertAlert: InsertAlert): Promise<Alert> {
    const [alert] = await db.insert(alerts).values(insertAlert).returning();
    return alert;
  }

  async markAlertAsRead(id: string): Promise<boolean> {
    const result = await db
      .update(alerts)
      .set({ isRead: true })
      .where(eq(alerts.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Dashboard and Analytics methods
  async getDashboardStats(): Promise<any> {
    // Mock implementation for demonstration
    return {
      activeAgents: 1,
      totalAgents: 3,
      gpuUtilization: 78,
      totalCost: 1950,
      monthlyRequests: 32100,
      avgResponseTime: 118
    };
  }

  async getAnalytics(timeRange: string, metricType: string): Promise<any> {
    // Mock implementation for demonstration
    return {
      timeRange,
      metricType,
      data: []
    };
  }
}

export const storage = new DatabaseStorage();
