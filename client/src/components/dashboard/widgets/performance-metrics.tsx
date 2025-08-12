import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, Clock, Zap } from "lucide-react";

export function PerformanceMetrics() {
  const { data: metrics = [], isLoading } = useQuery({
    queryKey: ["/api/performance-metrics"],
  });

  // Mock performance data
  const mockData = [
    { name: "GPT-4", responseTime: 145, throughput: 850, successRate: 99.2 },
    { name: "Claude 3", responseTime: 118, throughput: 920, successRate: 99.6 },
    { name: "Llama 2", responseTime: 180, throughput: 650, successRate: 98.1 },
    { name: "Mistral", responseTime: 95, throughput: 1200, successRate: 99.8 },
  ];

  const avgMetrics = {
    responseTime: 134,
    throughput: 905,
    successRate: 99.2
  };

  return (
    <Card className="bg-dark-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Activity className="h-5 w-5 mr-2 text-purple-400" />
          Performance Metrics
        </CardTitle>
        <CardDescription className="text-gray-400">
          Real-time agent performance overview
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Clock className="h-4 w-4 text-cyan-400 mr-1" />
                  <span className="text-xs text-gray-400">Avg Response</span>
                </div>
                <p className="text-lg font-bold text-white">{avgMetrics.responseTime}ms</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Zap className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-xs text-gray-400">Throughput</span>
                </div>
                <p className="text-lg font-bold text-white">{avgMetrics.throughput}/min</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Activity className="h-4 w-4 text-purple-400 mr-1" />
                  <span className="text-xs text-gray-400">Success Rate</span>
                </div>
                <p className="text-lg font-bold text-white">{avgMetrics.successRate}%</p>
              </div>
            </div>

            {/* Response Time Chart */}
            <div>
              <h4 className="text-white text-sm font-medium mb-3">Response Time by Agent</h4>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={mockData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#1F2937", 
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      fontSize: "12px"
                    }}
                  />
                  <Bar 
                    dataKey="responseTime" 
                    fill="#8b5cf6" 
                    radius={[4, 4, 0, 0]}
                    name="Response Time (ms)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}