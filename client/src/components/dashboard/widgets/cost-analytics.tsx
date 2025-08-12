import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

export function CostAnalytics() {
  const { data: analytics = [], isLoading } = useQuery({
    queryKey: ["/api/cost-analytics", "month"],
  });

  // Mock cost data
  const mockData = [
    { day: "1", cost: 45.2, gpu: 32.1, api: 8.5, infra: 4.6 },
    { day: "5", cost: 52.8, gpu: 38.9, api: 9.2, infra: 4.7 },
    { day: "10", cost: 48.3, gpu: 35.1, api: 8.8, infra: 4.4 },
    { day: "15", cost: 61.7, gpu: 44.2, api: 12.1, infra: 5.4 },
    { day: "20", cost: 58.9, gpu: 42.1, api: 11.3, infra: 5.5 },
    { day: "25", cost: 65.4, gpu: 46.8, api: 13.2, infra: 5.4 },
    { day: "30", cost: 69.2, gpu: 49.1, api: 14.1, infra: 6.0 },
  ];

  const monthlyTotal = 1950;
  const previousMonth = 1795;
  const percentChange = ((monthlyTotal - previousMonth) / previousMonth * 100).toFixed(1);
  const isIncrease = monthlyTotal > previousMonth;

  return (
    <Card className="bg-dark-800 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-green-400" />
              Cost Analytics
            </CardTitle>
            <CardDescription className="text-gray-400">
              Monthly spending trends and breakdown
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">${monthlyTotal}</p>
            <div className={`flex items-center text-sm ${isIncrease ? 'text-red-400' : 'text-green-400'}`}>
              {isIncrease ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {isIncrease ? '+' : ''}{percentChange}% vs last month
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cost Breakdown */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-xs text-gray-400">GPU Rental</p>
                <p className="text-lg font-bold text-cyan-400">$1,380</p>
                <p className="text-xs text-gray-500">70.8%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">API Usage</p>
                <p className="text-lg font-bold text-purple-400">$390</p>
                <p className="text-xs text-gray-500">20.0%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">Infrastructure</p>
                <p className="text-lg font-bold text-amber-400">$180</p>
                <p className="text-xs text-gray-500">9.2%</p>
              </div>
            </div>

            {/* Daily Spending Chart */}
            <div>
              <h4 className="text-white text-sm font-medium mb-3">Daily Spending Trend</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#1F2937", 
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      fontSize: "12px"
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cost" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                    name="Total Cost ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}