import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cpu, DollarSign, MapPin, Search, Filter, Zap, HardDrive } from "lucide-react";

export default function GpuResources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [providerFilter, setProviderFilter] = useState("all");

  const { data: resources = [], isLoading } = useQuery({
    queryKey: ["/api/gpu-resources"],
  });

  const filteredResources = resources.filter((resource: any) => {
    const matchesSearch = resource.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || resource.status === statusFilter;
    const matchesProvider = providerFilter === "all" || resource.provider === providerFilter;
    
    return matchesSearch && matchesStatus && matchesProvider;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-600";
      case "in_use": return "bg-yellow-600";
      case "maintenance": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const uniqueProviders = [...new Set(resources.map((r: any) => r.provider))];

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100">
      <Sidebar />
      
      <div className="ml-64 min-h-screen">
        <Header />
        
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">GPU Resources</h1>
              <p className="text-gray-400 mt-1">Browse and rent GPU resources from multiple providers</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6 p-4 bg-dark-800 rounded-lg border border-gray-700">
            <div className="flex items-center space-x-2 flex-1 min-w-64">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search GPU models or providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-dark-700 border-gray-600"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-dark-700 border-gray-600">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-dark-700 border-gray-600">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="in_use">In Use</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={providerFilter} onValueChange={setProviderFilter}>
              <SelectTrigger className="w-40 bg-dark-700 border-gray-600">
                <SelectValue placeholder="Provider" />
              </SelectTrigger>
              <SelectContent className="bg-dark-700 border-gray-600">
                <SelectItem value="all">All Providers</SelectItem>
                {uniqueProviders.map((provider: string) => (
                  <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-gray-400">
              Showing {filteredResources.length} of {resources.length} GPU resources
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="bg-dark-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded w-1/2 mb-4"></div>
                      <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource: any) => (
                <Card key={resource.id} className="bg-dark-800 border-gray-700 hover:border-gray-600 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Cpu className="h-5 w-5 text-cyan-400" />
                        <CardTitle className="text-white text-lg">{resource.model}</CardTitle>
                      </div>
                      <Badge className={`${getStatusColor(resource.status)} text-white`}>
                        {resource.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-400">
                      {resource.provider} • {resource.region}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400 flex items-center">
                          <HardDrive className="h-4 w-4 mr-1" />
                          VRAM
                        </span>
                        <span className="text-white">{resource.vram}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400 flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          Price/Hour
                        </span>
                        <span className="text-white font-semibold">${resource.pricePerHour}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          Location
                        </span>
                        <span className="text-white">{resource.region}</span>
                      </div>
                      
                      {resource.specifications && (
                        <div className="pt-2 border-t border-gray-600">
                          <div className="flex items-center text-sm text-gray-400 mb-1">
                            <Zap className="h-4 w-4 mr-1" />
                            Specifications
                          </div>
                          <div className="text-xs text-gray-500 space-y-1">
                            {Object.entries(resource.specifications).map(([key, value]: [string, any]) => (
                              <div key={key} className="flex justify-between">
                                <span>{key}:</span>
                                <span>{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <Button
                        className="flex-1 bg-cyan-600 hover:bg-cyan-700"
                        disabled={resource.status !== "available"}
                      >
                        {resource.status === "available" ? "Rent Now" : "Unavailable"}
                      </Button>
                      
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                    </div>
                    
                    {resource.status === "available" && (
                      <div className="mt-2 text-xs text-green-400 text-center">
                        Ready for immediate deployment
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredResources.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <Cpu className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No GPU resources found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}