import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingDown, Clock, Zap } from "lucide-react";

export function OptimizationTips() {
  const tips = [
    {
      id: 1,
      title: "Switch to Spot Instances",
      description: "Use spot GPU instances for non-critical workloads to save up to 60%",
      impact: "high",
      effort: "low", 
      savings: "$145/month",
      icon: TrendingDown,
      color: "text-green-400"
    },
    {
      id: 2,
      title: "Auto-scale Resources",
      description: "Implement automatic scaling based on demand patterns",
      impact: "medium",
      effort: "medium",
      savings: "$210/month",
      icon: Zap,
      color: "text-yellow-400"
    },
    {
      id: 3,
      title: "Optimize Model Size",
      description: "Use smaller model variants for simple tasks",
      impact: "medium",
      effort: "high",
      savings: "$85/month", 
      icon: Clock,
      color: "text-blue-400"
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
    <Card className="bg-dark-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-amber-400" />
          Optimization Tips
        </CardTitle>
        <CardDescription className="text-gray-400">
          AI-powered recommendations to improve efficiency
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tips.map((tip) => (
            <div key={tip.id} className="border border-gray-600 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-dark-700 ${tip.color}`}>
                  <tip.icon className="h-4 w-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white text-sm font-medium">{tip.title}</h4>
                    <Badge className={`${getImpactColor(tip.impact)} text-white text-xs`}>
                      {tip.impact}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-400 text-xs mb-3">{tip.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-green-400 text-xs font-medium">{tip.savings}</span>
                      <span className={`text-xs ${getEffortColor(tip.effort)}`}>
                        {tip.effort} effort
                      </span>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs border-gray-600">
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full border-gray-600 text-gray-300 text-sm">
            View All Recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}