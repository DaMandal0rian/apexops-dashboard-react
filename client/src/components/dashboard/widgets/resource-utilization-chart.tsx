import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function ResourceUtilizationChart() {
  const { data: usage = [], isLoading } = useQuery({
    queryKey: ["/api/resource-usage", { limit: 24 }],
  });

  // Mock data for demonstration
  const mockData = [
    { time: "00:00", gpu: 65, cpu: 45, memory: 78 },
    { time: "02:00", gpu: 72, cpu: 52, memory: 81 },
    { time: "04:00", gpu: 68, cpu: 48, memory: 75 },
    { time: "06:00", gpu: 85, cpu: 65, memory: 88 },
    { time: "08:00", gpu: 92, cpu: 78, memory: 95 },
    { time: "10:00", gpu: 88, cpu: 72, memory: 92 },
    { time: "12:00", gpu: 94, cpu: 82, memory: 97 },
    { time: "14:00", gpu: 89, cpu: 75, memory: 89 },
    { time: "16:00", gpu: 86, cpu: 69, memory: 86 },
    { time: "18:00", gpu: 78, cpu: 58, memory: 82 },
    { time: "20:00", gpu: 74, cpu: 54, memory: 79 },
    { time: "22:00", gpu: 69, cpu: 49, memory: 76 },
  ];

  return (
    <Card className="bg-dark-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Resource Utilization</CardTitle>
        <CardDescription className="text-gray-400">
          Real-time GPU, CPU, and memory usage across all agents
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-80 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={mockData}>
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
                dataKey="gpu" 
                stroke="#06b6d4" 
                strokeWidth={2} 
                name="GPU (%)"
                dot={{ fill: "#06b6d4", strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="cpu" 
                stroke="#8b5cf6" 
                strokeWidth={2} 
                name="CPU (%)"
                dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="memory" 
                stroke="#f59e0b" 
                strokeWidth={2} 
                name="Memory (%)"
                dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}