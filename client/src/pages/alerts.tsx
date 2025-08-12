import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Bell, 
  BellRing, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCircle,
  Clock,
  Filter,
  Plus,
  Settings
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
// import { formatDistanceToNow } from "date-fns";

interface Alert {
  id: string;
  title: string;
  message: string;
  severity: "critical" | "warning" | "info" | "success";
  category: string;
  timestamp: string;
  isRead: boolean;
  acknowledged: boolean;
  source: string;
  metadata?: Record<string, any>;
}

export default function Alerts() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const { data: alerts = [], isLoading } = useQuery({
    queryKey: ["/api/alerts"],
  });

  const markAsReadMutation = useMutation({
    mutationFn: (alertId: string) => apiRequest(`/api/alerts/${alertId}/read`, "POST", {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alerts"] });
    },
  });

  const acknowledgeMutation = useMutation({
    mutationFn: (alertId: string) => apiRequest(`/api/alerts/${alertId}/acknowledge`, "POST", {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alerts"] });
    },
  });

  // Mock alerts data
  const mockAlerts: Alert[] = [
    {
      id: "alert-1",
      title: "High GPU Memory Usage",
      message: "GPU memory usage has exceeded 90% on agent gpt-4-vision for the past 15 minutes",
      severity: "critical",
      category: "Performance",
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      isRead: false,
      acknowledged: false,
      source: "GPU Monitor",
      metadata: { agentId: "gpt-4-vision", usage: 92, threshold: 90 }
    },
    {
      id: "alert-2", 
      title: "API Rate Limit Approaching",
      message: "OpenAI API usage is at 85% of monthly quota",
      severity: "warning",
      category: "API",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      isRead: true,
      acknowledged: false,
      source: "API Monitor",
      metadata: { provider: "OpenAI", usage: 85, limit: 100 }
    },
    {
      id: "alert-3",
      title: "Cost Budget Alert",
      message: "Monthly spending has reached 75% of allocated budget ($1,950 / $2,600)",
      severity: "warning", 
      category: "Cost",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      isRead: true,
      acknowledged: true,
      source: "Cost Monitor",
      metadata: { current: 1950, budget: 2600, percentage: 75 }
    },
    {
      id: "alert-4",
      title: "Agent Deployment Successful",
      message: "New Claude 3 Haiku agent deployed successfully on Azure GPU",
      severity: "success",
      category: "Deployment",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      isRead: true,
      acknowledged: true,
      source: "Deployment Manager",
      metadata: { agentName: "Claude 3 Haiku", provider: "Azure" }
    },
    {
      id: "alert-5",
      title: "System Maintenance Scheduled",
      message: "Scheduled maintenance window for GPU cluster upgrade on Jan 15, 2025 at 2:00 AM UTC",
      severity: "info",
      category: "Maintenance",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      isRead: false,
      acknowledged: false,
      source: "System Admin",
      metadata: { scheduledTime: "2025-01-15T02:00:00Z", duration: "2 hours" }
    }
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case "warning": return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      case "info": return <Info className="h-4 w-4 text-blue-400" />;
      case "success": return <CheckCircle className="h-4 w-4 text-green-400" />;
      default: return <Bell className="h-4 w-4 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-600";
      case "warning": return "bg-yellow-600";
      case "info": return "bg-blue-600";
      case "success": return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesFilter = filter === "all" || 
      (filter === "unread" && !alert.isRead) ||
      (filter === "critical" && alert.severity === "critical") ||
      (filter === "acknowledged" && alert.acknowledged);
    
    const matchesSearch = searchTerm === "" || 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const alertStats = {
    total: mockAlerts.length,
    unread: mockAlerts.filter(a => !a.isRead).length,
    critical: mockAlerts.filter(a => a.severity === "critical").length,
    acknowledged: mockAlerts.filter(a => a.acknowledged).length
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 font-inter antialiased">
      <Sidebar />
      
      <div className="ml-64 min-h-screen">
        <Header />
        
        <main className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center">
                  <Bell className="h-6 w-6 mr-3 text-cyan-400" />
                  Alerts & Notifications
                </h1>
                <p className="text-gray-400 mt-1">Monitor system alerts and manage notifications</p>
              </div>
              <Button className="bg-cyan-600 hover:bg-cyan-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Alert Rule
              </Button>
            </div>

            {/* Alert Statistics */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card className="bg-dark-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Alerts</p>
                      <p className="text-2xl font-bold text-white">{alertStats.total}</p>
                    </div>
                    <Bell className="h-8 w-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-dark-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Unread</p>
                      <p className="text-2xl font-bold text-yellow-400">{alertStats.unread}</p>
                    </div>
                    <BellRing className="h-8 w-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-dark-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Critical</p>
                      <p className="text-2xl font-bold text-red-400">{alertStats.critical}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-dark-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Acknowledged</p>
                      <p className="text-2xl font-bold text-green-400">{alertStats.acknowledged}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="alerts" className="space-y-6">
            <TabsList className="bg-dark-800">
              <TabsTrigger value="alerts">Alert Feed</TabsTrigger>
              <TabsTrigger value="rules">Alert Rules</TabsTrigger>
              <TabsTrigger value="settings">Notification Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="alerts" className="space-y-6">
              {/* Filters and Search */}
              <Card className="bg-dark-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Filter className="h-4 w-4 text-gray-400" />
                      <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-32 bg-dark-700 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="unread">Unread</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                          <SelectItem value="acknowledged">Acknowledged</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Input
                      placeholder="Search alerts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm bg-dark-700 border-gray-600"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Alerts List */}
              <div className="space-y-4">
                {isLoading ? (
                  <Card className="bg-dark-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="animate-pulse space-y-4">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="flex space-x-4">
                            <div className="h-4 w-4 bg-gray-600 rounded"></div>
                            <div className="flex-1 space-y-2">
                              <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                              <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  filteredAlerts.map((alert) => (
                    <Card key={alert.id} className={`bg-dark-800 border-gray-700 ${!alert.isRead ? 'ring-1 ring-cyan-500/50' : ''}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 mt-1">
                            {getSeverityIcon(alert.severity)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <h3 className={`text-lg font-medium ${!alert.isRead ? 'text-white' : 'text-gray-300'}`}>
                                  {alert.title}
                                </h3>
                                <Badge className={`${getSeverityColor(alert.severity)} text-white text-xs`}>
                                  {alert.severity}
                                </Badge>
                                <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                                  {alert.category}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                {!alert.isRead && (
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={() => markAsReadMutation.mutate(alert.id)}
                                    className="text-xs border-gray-600"
                                  >
                                    Mark Read
                                  </Button>
                                )}
                                {!alert.acknowledged && alert.severity === "critical" && (
                                  <Button 
                                    size="sm" 
                                    onClick={() => acknowledgeMutation.mutate(alert.id)}
                                    className="text-xs bg-yellow-600 hover:bg-yellow-700"
                                  >
                                    Acknowledge
                                  </Button>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-gray-400 mb-3">{alert.message}</p>
                            
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center space-x-4">
                                <span>Source: {alert.source}</span>
                                {alert.acknowledged && (
                                  <span className="text-green-400">✓ Acknowledged</span>
                                )}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{new Date(alert.timestamp).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="rules">
              <Card className="bg-dark-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Alert Rules</CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure conditions that trigger alerts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Alert rules configuration coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="bg-dark-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Notification Settings</CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage how you receive alerts and notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Email Notifications</Label>
                      <p className="text-sm text-gray-400">Receive alerts via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Browser Notifications</Label>
                      <p className="text-sm text-gray-400">Show desktop notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Critical Alerts Only</Label>
                      <p className="text-sm text-gray-400">Only notify for critical severity</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}