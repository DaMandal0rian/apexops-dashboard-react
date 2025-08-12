import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Bot, Cpu, DollarSign } from "lucide-react";

export function QuickStats() {
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const quickStats = [
    {
      title: "Active Agents",
      value: stats.activeAgents || 0,
      total: stats.totalAgents || 0,
      icon: Bot,
      color: "text-cyan-400",
      bgColor: "bg-cyan-600",
    },
    {
      title: "GPU Utilization",
      value: `${stats.gpuUtilization || 0}%`,
      trend: "+5%",
      icon: Cpu,
      color: "text-purple-400",
      bgColor: "bg-purple-600",
    },
    {
      title: "Monthly Cost",
      value: `$${stats.totalCost || 0}`,
      trend: "+8.5%",
      icon: DollarSign,
      color: "text-green-400",
      bgColor: "bg-green-600",
    },
    {
      title: "Requests/Hour",
      value: stats.monthlyRequests ? Math.floor(stats.monthlyRequests / 30 / 24) : 0,
      trend: "+12%",
      icon: Activity,
      color: "text-orange-400",
      bgColor: "bg-orange-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-dark-800 border-gray-700">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-600 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-600 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {quickStats.map((stat, index) => (
        <Card key={index} className="bg-dark-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stat.value}
                  {stat.total && <span className="text-gray-400 text-lg">/{stat.total}</span>}
                </p>
                {stat.trend && (
                  <p className="text-green-400 text-sm mt-1">{stat.trend} from last month</p>
                )}
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}