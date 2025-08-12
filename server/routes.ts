import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { 
  insertAiAgentSchema, 
  insertGpuResourceSchema, 
  insertResourceUsageSchema,
  insertCostAnalyticsSchema,
  insertPerformanceMetricsSchema,
  insertAlertSchema 
} from "@shared/schema";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint for deployment verification
  app.get("/health", (req, res) => {
    res.status(200).json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // Auth middleware
  await setupAuth(app);

  const httpServer = createServer(app);
  
  // WebSocket server for real-time updates
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  // Store connected clients
  const clients = new Set<WebSocket>();
  
  wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('Client connected to WebSocket');
    
    ws.on('close', () => {
      clients.delete(ws);
      console.log('Client disconnected from WebSocket');
    });
    
    // Send initial data
    ws.send(JSON.stringify({ type: 'connected', message: 'WebSocket connected' }));
  });
  
  // Broadcast updates to all connected clients
  const broadcast = (data: any) => {
    const message = JSON.stringify(data);
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  };

  // AI Agents endpoints
  app.get("/api/agents", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const agents = await storage.getAiAgents(userId);
      res.json(agents);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch AI agents" });
    }
  });

  app.get("/api/agents/:id", async (req, res) => {
    try {
      const agent = await storage.getAiAgent(req.params.id);
      if (!agent) {
        return res.status(404).json({ error: "Agent not found" });
      }
      res.json(agent);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch agent" });
    }
  });

  app.post("/api/agents", async (req, res) => {
    try {
      const agentData = insertAiAgentSchema.parse(req.body);
      const agent = await storage.createAiAgent(agentData);
      broadcast({ type: 'agent_created', data: agent });
      res.status(201).json(agent);
    } catch (error) {
      res.status(400).json({ error: "Invalid agent data" });
    }
  });

  app.patch("/api/agents/:id", async (req, res) => {
    try {
      const agent = await storage.updateAiAgent(req.params.id, req.body);
      broadcast({ type: 'agent_updated', data: agent });
      res.json(agent);
    } catch (error) {
      res.status(400).json({ error: "Failed to update agent" });
    }
  });

  app.patch("/api/agents/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const agent = await storage.updateAiAgent(req.params.id, { status });
      broadcast({ type: 'agent_status_updated', data: agent });
      res.json(agent);
    } catch (error) {
      res.status(400).json({ error: "Failed to update agent status" });
    }
  });

  app.delete("/api/agents/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteAiAgent(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Agent not found" });
      }
      broadcast({ type: 'agent_deleted', data: { id: req.params.id } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete agent" });
    }
  });

  // GPU Resources endpoints
  app.get("/api/gpu-resources", async (req, res) => {
    try {
      const availableOnly = req.query.available === 'true';
      const resources = availableOnly 
        ? await storage.getAvailableGpuResources()
        : await storage.getGpuResources();
      res.json(resources);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch GPU resources" });
    }
  });

  app.post("/api/gpu-resources", async (req, res) => {
    try {
      const resourceData = insertGpuResourceSchema.parse(req.body);
      const resource = await storage.createGpuResource(resourceData);
      broadcast({ type: 'gpu_resource_created', data: resource });
      res.status(201).json(resource);
    } catch (error) {
      res.status(400).json({ error: "Invalid GPU resource data" });
    }
  });

  app.patch("/api/gpu-resources/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const resource = await storage.updateGpuResourceStatus(req.params.id, status);
      broadcast({ type: 'gpu_resource_updated', data: resource });
      res.json(resource);
    } catch (error) {
      res.status(400).json({ error: "Failed to update GPU resource status" });
    }
  });

  // Resource Usage endpoints
  app.get("/api/resource-usage", async (req, res) => {
    try {
      const agentId = req.query.agentId as string;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      const usage = agentId
        ? await storage.getResourceUsageByAgent(agentId, limit)
        : await storage.getRecentResourceUsage(limit);
      
      res.json(usage);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch resource usage" });
    }
  });

  app.post("/api/resource-usage", async (req, res) => {
    try {
      const usageData = insertResourceUsageSchema.parse(req.body);
      const usage = await storage.createResourceUsage(usageData);
      broadcast({ type: 'resource_usage_created', data: usage });
      res.status(201).json(usage);
    } catch (error) {
      res.status(400).json({ error: "Invalid resource usage data" });
    }
  });

  // Cost Analytics endpoints
  app.get("/api/cost-analytics", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const period = req.query.period as string;
      
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
      
      const analytics = await storage.getCostAnalytics(userId, period);
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cost analytics" });
    }
  });

  app.post("/api/cost-analytics", async (req, res) => {
    try {
      const analyticsData = insertCostAnalyticsSchema.parse(req.body);
      const analytics = await storage.createCostAnalytics(analyticsData);
      broadcast({ type: 'cost_analytics_created', data: analytics });
      res.status(201).json(analytics);
    } catch (error) {
      res.status(400).json({ error: "Invalid cost analytics data" });
    }
  });

  // Performance Metrics endpoints
  app.get("/api/performance-metrics", async (req, res) => {
    try {
      const agentId = req.query.agentId as string;
      const metrics = await storage.getPerformanceMetrics(agentId);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch performance metrics" });
    }
  });

  app.post("/api/performance-metrics", async (req, res) => {
    try {
      const metricsData = insertPerformanceMetricsSchema.parse(req.body);
      const metrics = await storage.createPerformanceMetrics(metricsData);
      broadcast({ type: 'performance_metrics_created', data: metrics });
      res.status(201).json(metrics);
    } catch (error) {
      res.status(400).json({ error: "Invalid performance metrics data" });
    }
  });

  // Alerts endpoints
  app.get("/api/alerts", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
      
      const alerts = await storage.getAlerts(userId);
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch alerts" });
    }
  });

  app.post("/api/alerts", async (req, res) => {
    try {
      const alertData = insertAlertSchema.parse(req.body);
      const alert = await storage.createAlert(alertData);
      broadcast({ type: 'alert_created', data: alert });
      res.status(201).json(alert);
    } catch (error) {
      res.status(400).json({ error: "Invalid alert data" });
    }
  });

  app.patch("/api/alerts/:id/read", async (req, res) => {
    try {
      const marked = await storage.markAlertAsRead(req.params.id);
      if (!marked) {
        return res.status(404).json({ error: "Alert not found" });
      }
      broadcast({ type: 'alert_read', data: { id: req.params.id } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to mark alert as read" });
    }
  });

  // Dashboard Stats endpoint
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  // Analytics endpoints
  app.get("/api/analytics", async (req, res) => {
    try {
      const timeRange = req.query.timeRange as string || "7d";
      const metricType = req.query.metricType as string || "performance";
      const analytics = await storage.getAnalytics(timeRange, metricType);
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Dashboard stats endpoint
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const userId = req.query.userId as string || "demo-user-1";
      
      const agents = await storage.getAiAgents(userId);
      const gpuResources = await storage.getGpuResources();
      const recentUsage = await storage.getRecentResourceUsage(1);
      
      const activeAgents = agents.filter(agent => agent.status === "running").length;
      const totalAgents = agents.length;
      
      // Calculate average GPU utilization
      const gpuUtilization = recentUsage.length > 0 
        ? parseFloat(recentUsage[0].gpuUtilization)
        : Math.random() * 20 + 70; // Fallback to simulated data
      
      // Calculate total requests per minute
      const totalRequests = agents.reduce((sum, agent) => sum + (agent.requestsPerMinute || 0), 0);
      
      // Mock cost data (in a real app, this would be calculated from actual usage)
      const monthlyCost = 47329;
      
      const stats = {
        activeAgents,
        totalAgents,
        gpuUtilization: gpuUtilization.toFixed(1),
        totalRequests,
        monthlyCost,
        availableGpus: gpuResources.filter(gpu => gpu.status === "available").length,
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  // Data lineage routes
  app.get('/api/data-lineage/:timeRange', isAuthenticated, async (req, res) => {
    try {
      const { timeRange } = req.params;
      // Mock implementation - in real app would fetch from database
      const lineageData = {
        nodes: [],
        edges: [],
        timeRange
      };
      res.json(lineageData);
    } catch (error) {
      console.error("Error fetching data lineage:", error);
      res.status(500).json({ message: "Failed to fetch data lineage" });
    }
  });

  // Simulate real-time data updates
  setInterval(() => {
    broadcast({
      type: 'stats_update',
      data: {
        timestamp: new Date().toISOString(),
        gpuUtilization: Math.random() * 20 + 70,
        cpuUtilization: Math.random() * 30 + 40,
        requestsPerMinute: Math.floor(Math.random() * 1000) + 1500,
        responseTime: Math.floor(Math.random() * 20) + 240,
      }
    });
  }, 5000); // Update every 5 seconds

  return httpServer;
}
