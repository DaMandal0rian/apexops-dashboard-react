import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Activity, Clock, TrendingUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function Performance() {
  const [selectedAgent, setSelectedAgent] = useState("all");
  const [timeRange, setTimeRange] = useState("24h");

  const { data: agents = [] } = useQuery({
    queryKey: ["/api/agents"],
  });

  const { data: metrics = [], isLoading } = useQuery({
    queryKey: ["/api/performance-metrics", selectedAgent, timeRange],
  });

  // Mock performance data
  const performanceData = [
    { time: "00:00", responseTime: 120, throughput: 450, successRate: 99.2, errorRate: 0.8 },
    { time: "02:00", responseTime: 115, throughput: 520, successRate: 99.5, errorRate: 0.5 },
    { time: "04:00", responseTime: 130, throughput: 480, successRate: 98.8, errorRate: 1.2 },
    { time: "06:00", responseTime: 108, throughput: 580, successRate: 99.7, errorRate: 0.3 },
    { time: "08:00", responseTime: 125, throughput: 510, successRate: 99.1, errorRate: 0.9 },
    { time: "10:00", responseTime: 95, throughput: 620, successRate: 99.8, errorRate: 0.2 },
    { time: "12:00", responseTime: 102, throughput: 590, successRate: 99.6, errorRate: 0.4 },
    { time: "14:00", responseTime: 118, throughput: 545, successRate: 99.3, errorRate: 0.7 },
    { time: "16:00", responseTime: 135, throughput: 485, successRate: 98.9, errorRate: 1.1 },
    { time: "18:00", responseTime: 122, throughput: 520, successRate: 99.4, errorRate: 0.6 },
    { time: "20:00", responseTime: 110, throughput: 555, successRate: 99.6, errorRate: 0.4 },
    { time: "22:00", responseTime: 128, throughput: 490, successRate: 99.0, errorRate: 1.0 },
  ];

  const agentStats = [
    { name: "GPT-4 Vision", avgResponseTime: 145, requests: 12500, successRate: 99.2, status: "healthy" },
    { name: "Claude 3", avgResponseTime: 118, requests: 8900, successRate: 99.6, status: "healthy" },
    { name: "Llama 2", avgResponseTime: 180, requests: 6200, successRate: 98.1, status: "warning" },
    { name: "Mistral 7B", avgResponseTime: 95, requests: 4500, successRate: 99.8, status: "healthy" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy": return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case "error": return <XCircle className="h-4 w-4 text-red-400" />;
      default: return <CheckCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-green-600";
      case "warning": return "bg-yellow-600";
      case "error": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100">
      <Sidebar />
      
      <div className="ml-64 min-h-screen">
        <Header />
        
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Performance Monitoring</h1>
              <p className="text-gray-400 mt-1">Real-time performance metrics and system health</p>
            </div>
            
            <div className="flex space-x-4">
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger className="w-48 bg-dark-700 border-gray-600">
                  <SelectValue placeholder="Select Agent" />
                </SelectTrigger>
                <SelectContent className="bg-dark-700 border-gray-600">
                  <SelectItem value="all">All Agents</SelectItem>
                  {agents.map((agent: any) => (
                    <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 bg-dark-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-700 border-gray-600">
                  <SelectItem value="1h">1 Hour</SelectItem>
                  <SelectItem value="6h">6 Hours</SelectItem>
                  <SelectItem value="24h">24 Hours</SelectItem>
                  <SelectItem value="7d">7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Agent Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {agentStats.map((agent) => (
              <Card key={agent.name} className="bg-dark-800 border-gray-700">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-sm font-medium">{agent.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(agent.status)}
                      <Badge className={`${getStatusColor(agent.status)} text-white text-xs`}>
                        {agent.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Avg Response</span>
                      <span className="text-white">{agent.avgResponseTime}ms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Requests</span>
                      <span className="text-white">{agent.requests.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Success Rate</span>
                      <span className="text-white">{agent.successRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Performance Charts */}
          <div className="grid grid-cols-12 gap-6">
            {/* Response Time Trends */}
            <Card className="col-span-12 lg:col-span-6 bg-dark-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-cyan-400" />
                  Response Time Trends
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Average response time over the selected period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#1F2937", 
                        border: "1px solid #374151",
                        borderRadius: "8px"
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="responseTime" 
                      stroke="#06b6d4" 
                      strokeWidth={2} 
                      name="Response Time (ms)"
                      dot={{ fill: "#06b6d4", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Throughput */}
            <Card className="col-span-12 lg:col-span-6 bg-dark-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-purple-400" />
                  Throughput Analysis
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Requests per minute processed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#1F2937", 
                        border: "1px solid #374151",
                        borderRadius: "8px"
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="throughput" 
                      stroke="#8b5cf6" 
                      fill="#8b5cf6" 
                      fillOpacity={0.6}
                      name="Requests/min"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Success Rate */}
            <Card className="col-span-12 lg:col-span-6 bg-dark-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                  Success & Error Rates
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Request success and error percentages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#1F2937", 
                        border: "1px solid #374151",
                        borderRadius: "8px"
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="successRate" 
                      stroke="#10b981" 
                      strokeWidth={2} 
                      name="Success Rate (%)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="errorRate" 
                      stroke="#ef4444" 
                      strokeWidth={2} 
                      name="Error Rate (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* System Health Summary */}
            <Card className="col-span-12 lg:col-span-6 bg-dark-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">System Health Summary</CardTitle>
                <CardDescription className="text-gray-400">
                  Current system status and alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-900/20 border border-green-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="text-white font-medium">All Systems Operational</p>
                        <p className="text-green-400 text-sm">Last updated: 2 minutes ago</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Overall Uptime</span>
                      <span className="text-green-400 font-medium">99.97%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Active Agents</span>
                      <span className="text-white">4/4</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Avg Response Time</span>
                      <span className="text-white">118ms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Total Requests Today</span>
                      <span className="text-white">32,100</span>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-600">
                    <p className="text-xs text-gray-500">
                      Next maintenance window: Sunday 2:00 AM UTC
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}