import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Play, Pause, Settings, Plus } from "lucide-react";

export function AiAgentsPanel() {
  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["/api/agents"],
  });

  // Mock agents data
  const mockAgents = [
    {
      id: "1",
      name: "GPT-4 Vision",
      status: "running",
      model: "gpt-4-vision-preview",
      requests: 1247,
      uptime: "2d 4h",
      lastActive: "2 min ago"
    },
    {
      id: "2",
      name: "Claude 3 Haiku", 
      status: "idle",
      model: "claude-3-haiku",
      requests: 892,
      uptime: "1d 12h",
      lastActive: "15 min ago"
    },
    {
      id: "3",
      name: "Llama 2 Chat",
      status: "stopped",
      model: "llama-2-70b-chat",
      requests: 234,
      uptime: "0h",
      lastActive: "2h ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-green-600";
      case "idle": return "bg-yellow-600";
      case "stopped": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running": return <Pause className="h-3 w-3" />;
      case "stopped": return <Play className="h-3 w-3" />;
      default: return <Settings className="h-3 w-3" />;
    }
  };

  return (
    <Card className="bg-dark-800 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center">
              <Bot className="h-5 w-5 mr-2 text-cyan-400" />
              AI Agents
            </CardTitle>
            <CardDescription className="text-gray-400">
              Manage your deployed AI agents
            </CardDescription>
          </div>
          <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
            <Plus className="h-4 w-4 mr-1" />
            Deploy
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse border border-gray-600 rounded-lg p-4">
                <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-600 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {mockAgents.map((agent) => (
              <div key={agent.id} className="border border-gray-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-white font-medium">{agent.name}</h4>
                    <Badge className={`${getStatusColor(agent.status)} text-white text-xs`}>
                      {agent.status}
                    </Badge>
                  </div>
                  <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white">
                    {getStatusIcon(agent.status)}
                  </Button>
                </div>
                
                <div className="text-xs text-gray-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Model:</span>
                    <span className="text-gray-300">{agent.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Requests:</span>
                    <span className="text-gray-300">{agent.requests.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uptime:</span>
                    <span className="text-gray-300">{agent.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Active:</span>
                    <span className="text-gray-300">{agent.lastActive}</span>
                  </div>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full border-gray-600 text-gray-300">
              View All Agents
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}