import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { Header } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { DollarSign, TrendingDown, TrendingUp, Calendar, Download, AlertTriangle, Target } from "lucide-react";

export default function Costs() {
  const [period, setPeriod] = useState("month");
  const [breakdown, setBreakdown] = useState("category");

  const { data: costData = {}, isLoading } = useQuery({
    queryKey: ["/api/cost-analytics", period],
  });

  // Mock cost data
  const monthlySpending = [
    { month: "Jan", total: 1245, gpu: 890, api: 245, infrastructure: 110 },
    { month: "Feb", total: 1580, gpu: 1150, api: 310, infrastructure: 120 },
    { month: "Mar", total: 1420, gpu: 980, api: 320, infrastructure: 120 },
    { month: "Apr", total: 1890, gpu: 1340, api: 410, infrastructure: 140 },
    { month: "May", total: 2100, gpu: 1520, api: 420, infrastructure: 160 },
    { month: "Jun", total: 1950, gpu: 1380, api: 390, infrastructure: 180 },
  ];

  const costBreakdown = [
    { name: "GPU Rental", value: 1380, color: "#06b6d4", percentage: 70.8 },
    { name: "API Usage", value: 390, color: "#8b5cf6", percentage: 20.0 },
    { name: "Infrastructure", value: 180, color: "#f59e0b", percentage: 9.2 },
  ];

  const optimizationSuggestions = [
    {
      id: 1,
      title: "Switch to Spot Instances",
      description: "Use spot GPU instances for non-critical workloads",
      savings: "$145/month",
      impact: "medium",
      effort: "low"
    },
    {
      id: 2,
      title: "Optimize Model Deployment",
      description: "Consolidate underutilized models on shared resources",
      savings: "$320/month",
      impact: "high",
      effort: "medium"
    },
    {
      id: 3,
      title: "Implement Auto-scaling",
      description: "Automatically scale resources based on demand",
      savings: "$210/month",
      impact: "high",
      effort: "high"
    }
  ];

  const budgetAlerts = [
    {
      type: "warning",
      message: "GPU spending is 85% of monthly budget",
      amount: "$1,380",
      threshold: "$1,620"
    },
    {
      type: "info",
      message: "API usage trending 15% below forecast",
      amount: "$390",
      threshold: "$460"
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "bg-green-600";
      case "medium": return "bg-yellow-600";
      case "low": return "bg-gray-600";
      default: return "bg-gray-600";
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case "low": return "text-green-400";
      case "medium": return "text-yellow-400";
      case "high": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100">
      <Sidebar />
      <MobileNav />
      
      <div className="md:ml-64 min-h-screen">
        <Header />
        
        <main className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Cost Management</h1>
              <p className="text-gray-400 mt-1">Monitor spending and optimize resource costs</p>
            </div>
            
            <div className="flex space-x-4">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-32 bg-dark-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-700 border-gray-600">
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="quarter">Quarter</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="border-gray-600">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Budget Alerts */}
          {budgetAlerts.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-3">Budget Alerts</h2>
              <div className="space-y-3">
                {budgetAlerts.map((alert, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border ${
                      alert.type === "warning" 
                        ? "bg-yellow-900/20 border-yellow-700" 
                        : "bg-blue-900/20 border-blue-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className={`h-5 w-5 ${
                          alert.type === "warning" ? "text-yellow-400" : "text-blue-400"
                        }`} />
                        <div>
                          <p className="text-white font-medium">{alert.message}</p>
                          <p className="text-sm text-gray-400">
                            Current: {alert.amount} / Budget: {alert.threshold}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cost Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="bg-dark-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Current Month</p>
                    <p className="text-2xl font-bold text-white mt-1">$1,950</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-red-400 mr-1" />
                      <span className="text-sm text-red-400">+8.5% from last month</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-cyan-600">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Daily Average</p>
                    <p className="text-2xl font-bold text-white mt-1">$65</p>
                    <div className="flex items-center mt-2">
                      <TrendingDown className="h-4 w-4 text-green-400 mr-1" />
                      <span className="text-sm text-green-400">-2.1% from last week</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-600">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Potential Savings</p>
                    <p className="text-2xl font-bold text-white mt-1">$675</p>
                    <div className="flex items-center mt-2">
                      <Target className="h-4 w-4 text-green-400 mr-1" />
                      <span className="text-sm text-green-400">34.6% reduction</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-green-600">
                    <TrendingDown className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">YTD Total</p>
                    <p className="text-2xl font-bold text-white mt-1">$11,165</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-cyan-400 mr-1" />
                      <span className="text-sm text-cyan-400">On track for $22K/year</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-600">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            {/* Spending Trends */}
            <Card className="col-span-12 lg:col-span-8 bg-dark-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Spending Trends</CardTitle>
                <CardDescription className="text-gray-400">
                  Monthly spending breakdown by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlySpending}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#1F2937", 
                        border: "1px solid #374151",
                        borderRadius: "8px"
                      }}
                    />
                    <Legend />
                    <Bar dataKey="gpu" stackId="a" fill="#06b6d4" name="GPU Rental" />
                    <Bar dataKey="api" stackId="a" fill="#8b5cf6" name="API Usage" />
                    <Bar dataKey="infrastructure" stackId="a" fill="#f59e0b" name="Infrastructure" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Cost Breakdown */}
            <Card className="col-span-12 lg:col-span-4 bg-dark-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Cost Breakdown</CardTitle>
                <CardDescription className="text-gray-400">
                  Current month distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={costBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {costBreakdown.map((entry, index) => (
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
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {costBreakdown.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-gray-400">{item.name}</span>
                      </div>
                      <span className="text-white">${item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Optimization Suggestions */}
          <Card className="bg-dark-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Cost Optimization Suggestions</CardTitle>
              <CardDescription className="text-gray-400">
                Actionable recommendations to reduce spending
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {optimizationSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="p-4 bg-dark-700 rounded-lg border border-gray-600">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-white font-medium">{suggestion.title}</h3>
                          <Badge className={`${getImpactColor(suggestion.impact)} text-white text-xs`}>
                            {suggestion.impact} impact
                          </Badge>
                          <span className={`text-xs ${getEffortColor(suggestion.effort)}`}>
                            {suggestion.effort} effort
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">{suggestion.description}</p>
                        <p className="text-green-400 font-medium">{suggestion.savings} potential savings</p>
                      </div>
                      <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                        Apply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}