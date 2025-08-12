import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cpu, DollarSign, Clock } from "lucide-react";

export function GpuMarketplace() {
  const { data: resources = [], isLoading } = useQuery({
    queryKey: ["/api/gpu-resources", { available: true }],
  });

  // Mock GPU marketplace data
  const mockResources = [
    {
      id: "1",
      name: "NVIDIA RTX 4090",
      provider: "AWS",
      pricePerHour: 3.25,
      memory: "24GB GDDR6X",
      availability: "available",
      estimatedSetup: "2-3 min"
    },
    {
      id: "2", 
      name: "NVIDIA A100",
      provider: "GCP",
      pricePerHour: 4.50,
      memory: "40GB HBM2",
      availability: "available",
      estimatedSetup: "1-2 min"
    },
    {
      id: "3",
      name: "NVIDIA H100",
      provider: "Azure",
      pricePerHour: 6.75,
      memory: "80GB HBM3",
      availability: "limited",
      estimatedSetup: "3-5 min"
    }
  ];

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-600";
      case "limited": return "bg-yellow-600";
      case "unavailable": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <Card className="bg-dark-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Cpu className="h-5 w-5 mr-2 text-cyan-400" />
          GPU Marketplace
        </CardTitle>
        <CardDescription className="text-gray-400">
          Available GPU resources for scaling
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-600 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {mockResources.map((resource) => (
              <div key={resource.id} className="border border-gray-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">{resource.name}</h4>
                  <Badge className={`${getAvailabilityColor(resource.availability)} text-white text-xs`}>
                    {resource.availability}
                  </Badge>
                </div>
                
                <div className="text-sm text-gray-400 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Provider: {resource.provider}</span>
                    <span className="text-white">{resource.memory}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign className="h-3 w-3 mr-1" />
                      <span>${resource.pricePerHour}/hour</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{resource.estimatedSetup}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  className="w-full mt-3 bg-cyan-600 hover:bg-cyan-700"
                  disabled={resource.availability === "unavailable"}
                >
                  Deploy Now
                </Button>
              </div>
            ))}
            
            <Button variant="outline" className="w-full border-gray-600 text-gray-300">
              View All Resources
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}