import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  GitBranch, 
  Database, 
  ArrowRight, 
  Play, 
  Pause, 
  RotateCcw,
  Zap,
  FileText,
  Filter,
  Search
} from "lucide-react";

interface DataNode {
  id: string;
  name: string;
  type: "source" | "transformation" | "model" | "output";
  status: "active" | "idle" | "processing" | "error";
  metadata: {
    lastUpdated: string;
    recordCount?: number;
    size?: string;
    format?: string;
    owner?: string;
  };
  position: { x: number; y: number };
}

interface DataEdge {
  id: string;
  source: string;
  target: string;
  type: "data_flow" | "dependency" | "transformation";
  metadata: {
    volume: number;
    latency: string;
    lastProcessed: string;
  };
  animated: boolean;
}

export default function DataLineage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);
  const [selectedNode, setSelectedNode] = useState<DataNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const { data: lineageData, isLoading } = useQuery({
    queryKey: ["/api/data-lineage", selectedTimeRange],
  });

  // Mock lineage data
  const mockNodes: DataNode[] = [
    {
      id: "src-1",
      name: "User Interaction DB",
      type: "source",
      status: "active",
      metadata: {
        lastUpdated: "2 min ago",
        recordCount: 1247583,
        size: "2.3 GB",
        format: "PostgreSQL",
        owner: "Data Team"
      },
      position: { x: 100, y: 200 }
    },
    {
      id: "src-2", 
      name: "API Request Logs",
      type: "source",
      status: "active", 
      metadata: {
        lastUpdated: "30 sec ago",
        recordCount: 892456,
        size: "1.8 GB",
        format: "JSON",
        owner: "Platform Team"
      },
      position: { x: 100, y: 350 }
    },
    {
      id: "transform-1",
      name: "Data Cleaning Pipeline",
      type: "transformation",
      status: "processing",
      metadata: {
        lastUpdated: "1 min ago",
        size: "Processing",
        format: "Python/Pandas",
        owner: "ML Team"
      },
      position: { x: 350, y: 275 }
    },
    {
      id: "model-1",
      name: "GPT-4 Training Data",
      type: "model",
      status: "active",
      metadata: {
        lastUpdated: "5 min ago",
        recordCount: 2139039,
        size: "4.1 GB",
        format: "Parquet",
        owner: "AI Team"
      },
      position: { x: 600, y: 200 }
    },
    {
      id: "model-2",
      name: "Usage Analytics Model",
      type: "model", 
      status: "idle",
      metadata: {
        lastUpdated: "15 min ago",
        recordCount: 567234,
        size: "1.2 GB",
        format: "MLflow",
        owner: "Analytics Team"
      },
      position: { x: 600, y: 350 }
    },
    {
      id: "output-1",
      name: "Performance Dashboard",
      type: "output",
      status: "active",
      metadata: {
        lastUpdated: "30 sec ago",
        format: "React/Charts",
        owner: "Frontend Team"
      },
      position: { x: 850, y: 275 }
    }
  ];

  const mockEdges: DataEdge[] = [
    {
      id: "edge-1",
      source: "src-1",
      target: "transform-1",
      type: "data_flow",
      metadata: {
        volume: 15420,
        latency: "120ms",
        lastProcessed: "1 min ago"
      },
      animated: true
    },
    {
      id: "edge-2",
      source: "src-2", 
      target: "transform-1",
      type: "data_flow",
      metadata: {
        volume: 8930,
        latency: "85ms",
        lastProcessed: "30 sec ago"
      },
      animated: true
    },
    {
      id: "edge-3",
      source: "transform-1",
      target: "model-1",
      type: "transformation",
      metadata: {
        volume: 24350,
        latency: "340ms", 
        lastProcessed: "1 min ago"
      },
      animated: true
    },
    {
      id: "edge-4",
      source: "transform-1",
      target: "model-2",
      type: "transformation",
      metadata: {
        volume: 12180,
        latency: "220ms",
        lastProcessed: "2 min ago"
      },
      animated: true
    },
    {
      id: "edge-5",
      source: "model-1",
      target: "output-1",
      type: "dependency",
      metadata: {
        volume: 5670,
        latency: "50ms",
        lastProcessed: "30 sec ago"
      },
      animated: true
    },
    {
      id: "edge-6",
      source: "model-2",
      target: "output-1", 
      type: "dependency",
      metadata: {
        volume: 3240,
        latency: "35ms",
        lastProcessed: "45 sec ago"
      },
      animated: true
    }
  ];

  const getNodeColor = (type: string, status: string) => {
    const baseColors = {
      source: "#06b6d4",      // cyan
      transformation: "#8b5cf6", // purple  
      model: "#10b981",       // green
      output: "#f59e0b"       // amber
    };
    
    const statusModifier = status === "error" ? "#ef4444" : 
                          status === "processing" ? "#fbbf24" : 
                          baseColors[type as keyof typeof baseColors];
    
    return statusModifier;
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "source": return <Database className="h-4 w-4" />;
      case "transformation": return <Zap className="h-4 w-4" />;
      case "model": return <GitBranch className="h-4 w-4" />;
      case "output": return <FileText className="h-4 w-4" />;
      default: return <Database className="h-4 w-4" />;
    }
  };

  // Canvas animation for data flow
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let animationTime = 0;

    const animate = () => {
      if (!isAnimationPlaying) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw edges with animated flow
      mockEdges.forEach(edge => {
        const sourceNode = mockNodes.find(n => n.id === edge.source);
        const targetNode = mockNodes.find(n => n.id === edge.target);
        
        if (!sourceNode || !targetNode) return;

        const startX = sourceNode.position.x + 60;
        const startY = sourceNode.position.y + 30;
        const endX = targetNode.position.x;
        const endY = targetNode.position.y + 30;

        // Draw connection line
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Draw animated particles
        if (edge.animated) {
          const progress = (animationTime % 3000) / 3000;
          const particleX = startX + (endX - startX) * progress;
          const particleY = startY + (endY - startY) * progress;

          ctx.fillStyle = getNodeColor(sourceNode.type, sourceNode.status);
          ctx.beginPath();
          ctx.arc(particleX, particleY, 4, 0, 2 * Math.PI);
          ctx.fill();
        }
      });

      animationTime += 50;
      animationRef.current = requestAnimationFrame(animate);
    };

    if (isAnimationPlaying) {
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimationPlaying, mockNodes, mockEdges]);

  const toggleAnimation = () => {
    setIsAnimationPlaying(!isAnimationPlaying);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 font-inter antialiased">
      <Sidebar />
      
      <div className="ml-64 min-h-screen">
        <Header />
        
        <main className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center">
                  <GitBranch className="h-6 w-6 mr-3 text-cyan-400" />
                  Data Lineage & Tracing
                </h1>
                <p className="text-gray-400 mt-1">Track data flow and dependencies across your AI pipeline</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                  <SelectTrigger className="w-32 bg-dark-800 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">Last Hour</SelectItem>
                    <SelectItem value="24h">Last 24h</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="outline" 
                  onClick={toggleAnimation}
                  className="border-gray-600"
                >
                  {isAnimationPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isAnimationPlaying ? "Pause" : "Play"}
                </Button>
                
                <Button className="bg-cyan-600 hover:bg-cyan-700">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="graph" className="space-y-6">
            <TabsList className="bg-dark-800">
              <TabsTrigger value="graph">Lineage Graph</TabsTrigger>
              <TabsTrigger value="table">Data Catalog</TabsTrigger>
              <TabsTrigger value="metrics">Flow Metrics</TabsTrigger>
            </TabsList>

            <TabsContent value="graph" className="space-y-6">
              <div className="grid grid-cols-12 gap-6">
                {/* Main Lineage Visualization */}
                <div className="col-span-9">
                  <Card className="bg-dark-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Data Flow Visualization</CardTitle>
                      <CardDescription className="text-gray-400">
                        Interactive graph showing data movement and transformations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <canvas 
                          ref={canvasRef}
                          className="absolute inset-0 w-full h-96"
                          style={{ background: 'transparent' }}
                        />
                        
                        {/* Node overlays */}
                        <div className="relative w-full h-96">
                          {mockNodes.map((node) => (
                            <div
                              key={node.id}
                              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                              style={{
                                left: node.position.x,
                                top: node.position.y,
                              }}
                              onClick={() => setSelectedNode(node)}
                            >
                              <div 
                                className={`p-3 rounded-lg border-2 bg-dark-800 hover:bg-dark-700 transition-colors ${
                                  selectedNode?.id === node.id ? 'border-cyan-500' : 'border-gray-600'
                                }`}
                                style={{ borderColor: getNodeColor(node.type, node.status) }}
                              >
                                <div className="flex items-center space-x-2 text-white">
                                  {getNodeIcon(node.type)}
                                  <span className="text-sm font-medium">{node.name}</span>
                                </div>
                                <div className="flex items-center mt-1">
                                  <div 
                                    className={`w-2 h-2 rounded-full mr-2 ${
                                      node.status === 'active' ? 'bg-green-400' :
                                      node.status === 'processing' ? 'bg-yellow-400 animate-pulse' :
                                      node.status === 'error' ? 'bg-red-400' : 'bg-gray-400'
                                    }`}
                                  />
                                  <span className="text-xs text-gray-400 capitalize">{node.status}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Node Details Panel */}
                <div className="col-span-3">
                  <Card className="bg-dark-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Node Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedNode ? (
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-white font-medium flex items-center">
                              {getNodeIcon(selectedNode.type)}
                              <span className="ml-2">{selectedNode.name}</span>
                            </h3>
                            <Badge 
                              className="mt-2 text-xs"
                              style={{ backgroundColor: getNodeColor(selectedNode.type, selectedNode.status) }}
                            >
                              {selectedNode.type}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Status:</span>
                              <span className="text-white capitalize">{selectedNode.status}</span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-gray-400">Last Updated:</span>
                              <span className="text-white">{selectedNode.metadata.lastUpdated}</span>
                            </div>
                            
                            {selectedNode.metadata.recordCount && (
                              <div className="flex justify-between">
                                <span className="text-gray-400">Records:</span>
                                <span className="text-white">{selectedNode.metadata.recordCount.toLocaleString()}</span>
                              </div>
                            )}
                            
                            {selectedNode.metadata.size && (
                              <div className="flex justify-between">
                                <span className="text-gray-400">Size:</span>
                                <span className="text-white">{selectedNode.metadata.size}</span>
                              </div>
                            )}
                            
                            <div className="flex justify-between">
                              <span className="text-gray-400">Format:</span>
                              <span className="text-white">{selectedNode.metadata.format}</span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-gray-400">Owner:</span>
                              <span className="text-white">{selectedNode.metadata.owner}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <GitBranch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-400">Select a node to view details</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="table">
              <Card className="bg-dark-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Data Catalog</CardTitle>
                      <CardDescription className="text-gray-400">
                        Complete inventory of data assets and their relationships
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="text"
                          placeholder="Search datasets..."
                          className="pl-10 pr-4 py-2 bg-dark-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                      <Button variant="outline" size="sm" className="border-gray-600">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Dataset</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Records</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Size</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Owner</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Last Updated</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockNodes.map((node) => (
                          <tr key={node.id} className="border-b border-gray-700/50 hover:bg-dark-700/30">
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                {getNodeIcon(node.type)}
                                <span className="text-white font-medium">{node.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge 
                                className="text-xs"
                                style={{ backgroundColor: getNodeColor(node.type, node.status) }}
                              >
                                {node.type}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <div 
                                  className={`w-2 h-2 rounded-full ${
                                    node.status === 'active' ? 'bg-green-400' :
                                    node.status === 'processing' ? 'bg-yellow-400 animate-pulse' :
                                    node.status === 'error' ? 'bg-red-400' : 'bg-gray-400'
                                  }`}
                                />
                                <span className="text-gray-300 capitalize">{node.status}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-300">
                              {node.metadata.recordCount ? node.metadata.recordCount.toLocaleString() : '-'}
                            </td>
                            <td className="py-3 px-4 text-gray-300">{node.metadata.size || '-'}</td>
                            <td className="py-3 px-4 text-gray-300">{node.metadata.owner}</td>
                            <td className="py-3 px-4 text-gray-300">{node.metadata.lastUpdated}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-dark-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Total Data Volume</p>
                        <p className="text-2xl font-bold text-white">847.2 GB</p>
                        <p className="text-green-400 text-sm">↗ +12.3% from last week</p>
                      </div>
                      <Database className="h-8 w-8 text-cyan-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-dark-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Avg Latency</p>
                        <p className="text-2xl font-bold text-white">142ms</p>
                        <p className="text-red-400 text-sm">↗ +8.1% from last hour</p>
                      </div>
                      <Zap className="h-8 w-8 text-yellow-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-dark-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Active Pipelines</p>
                        <p className="text-2xl font-bold text-white">23</p>
                        <p className="text-blue-400 text-sm">4 processing now</p>
                      </div>
                      <GitBranch className="h-8 w-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-dark-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Error Rate</p>
                        <p className="text-2xl font-bold text-white">0.32%</p>
                        <p className="text-green-400 text-sm">↓ -2.1% improvement</p>
                      </div>
                      <Activity className="h-8 w-8 text-red-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-dark-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Pipeline Performance</CardTitle>
                    <CardDescription className="text-gray-400">
                      Processing times and throughput metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockEdges.map((edge, index) => {
                        const sourceNode = mockNodes.find(n => n.id === edge.source);
                        const targetNode = mockNodes.find(n => n.id === edge.target);
                        return (
                          <div key={edge.id} className="flex items-center justify-between p-3 bg-dark-700/50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-1 text-sm text-gray-400">
                                <span>{sourceNode?.name}</span>
                                <ArrowRight className="h-3 w-3" />
                                <span>{targetNode?.name}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="text-right">
                                <div className="text-white">{edge.metadata.volume.toLocaleString()} records</div>
                                <div className="text-gray-400">{edge.metadata.latency}</div>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {edge.type.replace('_', ' ')}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-dark-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Data Quality Metrics</CardTitle>
                    <CardDescription className="text-gray-400">
                      Completeness, accuracy, and consistency scores
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">Completeness</span>
                          <span className="text-sm text-white">97.8%</span>
                        </div>
                        <div className="w-full bg-dark-700 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '97.8%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">Accuracy</span>
                          <span className="text-sm text-white">94.2%</span>
                        </div>
                        <div className="w-full bg-dark-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '94.2%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">Consistency</span>
                          <span className="text-sm text-white">99.1%</span>
                        </div>
                        <div className="w-full bg-dark-700 rounded-full h-2">
                          <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '99.1%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">Freshness</span>
                          <span className="text-sm text-white">91.7%</span>
                        </div>
                        <div className="w-full bg-dark-700 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '91.7%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}