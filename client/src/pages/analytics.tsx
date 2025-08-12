import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { Header } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Activity, Cpu, Clock, Download } from "lucide-react";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7d");
  const [metricType, setMetricType] = useState("performance");

  const { data: analytics = {}, isLoading } = useQuery({
    queryKey: ["/api/analytics", timeRange, metricType],
  });

  // Mock data for demonstration
  const performanceData = [
    { name: "Mon", responseTime: 120, throughput: 450, successRate: 99.2 },
    { name: "Tue", responseTime: 115, throughput: 520, successRate: 99.5 },
    { name: "Wed", responseTime: 130, throughput: 480, successRate: 98.8 },
    { name: "Thu", responseTime: 108, throughput: 580, successRate: 99.7 },
    { name: "Fri", responseTime: 125, throughput: 510, successRate: 99.1 },
    { name: "Sat", responseTime: 95, throughput: 420, successRate: 99.8 },
    { name: "Sun", responseTime: 102, throughput: 390, successRate: 99.6 },
  ];

  const costData = [
    { name: "GPU Rental", value: 450, color: "#06b6d4" },
    { name: "API Usage", value: 120, color: "#8b5cf6" },
    { name: "Infrastructure", value: 80, color: "#f59e0b" },
    { name: "Storage", value: 45, color: "#10b981" },
  ];

  const utilizationData = [
    { name: "00:00", gpu: 45, cpu: 30, memory: 60 },
    { name: "04:00", gpu: 55, cpu: 40, memory: 65 },
    { name: "08:00", gpu: 75, cpu: 65, memory: 70 },
    { name: "12:00", gpu: 85, cpu: 80, memory: 75 },
    { name: "16:00", gpu: 90, cpu: 85, memory: 80 },
    { name: "20:00", gpu: 70, cpu: 60, memory: 70 },
  ];

  const agentPerformance = [
    { name: "GPT-4 Vision", requests: 1200, avgTime: 150, errors: 8 },
    { name: "Claude 3", requests: 890, avgTime: 120, errors: 3 },
    { name: "Llama 2", requests: 650, avgTime: 180, errors: 12 },
    { name: "Mistral 7B", requests: 450, avgTime: 95, errors: 2 },
  ];

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <Card className="bg-dark-800 border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
            <div className="flex items-center mt-2">
              {change > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
              )}
              <span className={`text-sm ${change > 0 ? "text-green-400" : "text-red-400"}`}>
                {Math.abs(change)}% from last period
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100">
      <Sidebar />
      <MobileNav />
      
      <div className="md:ml-64 min-h-screen">
        <Header />
        
        <main className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Analytics</h1>
              <p className="text-gray-400 mt-1">Comprehensive performance and cost analytics</p>
            </div>
            
            <div className="flex space-x-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 bg-dark-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-700 border-gray-600">
                  <SelectItem value="24h">24 Hours</SelectItem>
                  <SelectItem value="7d">7 Days</SelectItem>
                  <SelectItem value="30d">30 Days</SelectItem>
                  <SelectItem value="90d">90 Days</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="border-gray-600">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              title="Avg Response Time"
              value="114ms"
              change={-8.2}
              icon={Clock}
              color="bg-cyan-600"
            />
            <StatCard
              title="Total Throughput"
              value="3.2K/min"
              change={12.5}
              icon={Activity}
              color="bg-purple-600"
            />
            <StatCard
              title="GPU Utilization"
              value="78%"
              change={5.1}
              icon={Cpu}
              color="bg-amber-600"
            />
            <StatCard
              title="Monthly Cost"
              value="$695"
              change={-3.4}
              icon={DollarSign}
              color="bg-green-600"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Performance Trends */}
            <Card className="col-span-12 lg:col-span-8 bg-dark-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Performance Trends</CardTitle>
                <CardDescription className="text-gray-400">
                  Response time, throughput, and success rate over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#1F2937", 
                        border: "1px solid #374151",
                        borderRadius: "8px"
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="responseTime" stroke="#06b6d4" strokeWidth={2} name="Response Time (ms)" />
                    <Line type="monotone" dataKey="throughput" stroke="#8b5cf6" strokeWidth={2} name="Throughput (req/min)" />
                    <Line type="monotone" dataKey="successRate" stroke="#10b981" strokeWidth={2} name="Success Rate (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Cost Breakdown */}
            <Card className="col-span-12 lg:col-span-4 bg-dark-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Cost Breakdown</CardTitle>
                <CardDescription className="text-gray-400">
                  Current month spending distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={costData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {costData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#1F2937", 
                        border: "1px solid #374151",
                        borderRadius: "8px"
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Resource Utilization */}
            <Card className="col-span-12 lg:col-span-6 bg-dark-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Resource Utilization</CardTitle>
                <CardDescription className="text-gray-400">
                  GPU, CPU, and memory usage patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={utilizationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#1F2937", 
                        border: "1px solid #374151",
                        borderRadius: "8px"
                      }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="gpu" stackId="1" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} name="GPU %" />
                    <Area type="monotone" dataKey="cpu" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name="CPU %" />
                    <Area type="monotone" dataKey="memory" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} name="Memory %" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Agent Performance */}
            <Card className="col-span-12 lg:col-span-6 bg-dark-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Agent Performance</CardTitle>
                <CardDescription className="text-gray-400">
                  Requests handled by each AI agent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={agentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#1F2937", 
                        border: "1px solid #374151",
                        borderRadius: "8px"
                      }}
                    />
                    <Legend />
                    <Bar dataKey="requests" fill="#06b6d4" name="Requests" />
                    <Bar dataKey="avgTime" fill="#8b5cf6" name="Avg Time (ms)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}