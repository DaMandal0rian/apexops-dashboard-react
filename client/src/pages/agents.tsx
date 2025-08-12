import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { Header } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAiAgentSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Bot, Play, Square, Settings, Trash2, Plus, Activity, Cpu, Clock } from "lucide-react";
import { z } from "zod";

const createAgentSchema = insertAiAgentSchema.extend({
  name: z.string().min(1, "Name is required"),
  model: z.string().min(1, "Model is required"),
});

type CreateAgentForm = z.infer<typeof createAgentSchema>;

export default function Agents() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["/api/agents"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: CreateAgentForm) => {
      return apiRequest("/api/agents", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/agents"] });
      setIsCreateOpen(false);
      toast({
        title: "Success",
        description: "AI agent created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/agents/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/agents"] });
      toast({
        title: "Success",
        description: "AI agent deleted successfully",
      });
    },
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return apiRequest(`/api/agents/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/agents"] });
    },
  });

  const form = useForm<CreateAgentForm>({
    resolver: zodResolver(createAgentSchema),
    defaultValues: {
      name: "",
      model: "",
      status: "stopped",
      configuration: {},
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-green-600";
      case "stopped": return "bg-gray-600";
      case "scaling": return "bg-yellow-600";
      case "error": return "bg-red-600";
      default: return "bg-gray-600";
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
              <h1 className="text-3xl font-bold text-white">AI Agents</h1>
              <p className="text-gray-400 mt-1">Manage and monitor your AI agents</p>
            </div>
            
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="bg-cyan-600 hover:bg-cyan-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Agent
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-dark-800 border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Create New AI Agent</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Deploy a new AI agent to your infrastructure
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((data) => createMutation.mutate(data))} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200">Agent Name</FormLabel>
                          <FormControl>
                            <Input placeholder="GPT-4 Vision Agent" {...field} className="bg-dark-700 border-gray-600" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200">Model</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-dark-700 border-gray-600">
                                <SelectValue placeholder="Select a model" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-dark-700 border-gray-600">
                              <SelectItem value="gpt-4">GPT-4</SelectItem>
                              <SelectItem value="gpt-4-vision">GPT-4 Vision</SelectItem>
                              <SelectItem value="claude-3">Claude 3</SelectItem>
                              <SelectItem value="llama-2">Llama 2</SelectItem>
                              <SelectItem value="mistral-7b">Mistral 7B</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={createMutation.isPending} className="bg-cyan-600 hover:bg-cyan-700">
                        {createMutation.isPending ? "Creating..." : "Create Agent"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-dark-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent: any) => (
                <Card key={agent.id} className="bg-dark-800 border-gray-700 hover:border-gray-600 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-5 w-5 text-cyan-400" />
                        <CardTitle className="text-white text-lg">{agent.name}</CardTitle>
                      </div>
                      <Badge className={`${getStatusColor(agent.status)} text-white`}>
                        {agent.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-400">
                      Model: {agent.model}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400 flex items-center">
                          <Cpu className="h-4 w-4 mr-1" />
                          CPU Usage
                        </span>
                        <span className="text-white">{agent.cpuUtilization}%</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400 flex items-center">
                          <Activity className="h-4 w-4 mr-1" />
                          Requests/min
                        </span>
                        <span className="text-white">{agent.requestsPerMinute}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Last Activity
                        </span>
                        <span className="text-white">
                          {new Date(agent.lastActivity).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      {agent.status === "stopped" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => statusMutation.mutate({ id: agent.id, status: "running" })}
                          disabled={statusMutation.isPending}
                          className="flex-1"
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Start
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => statusMutation.mutate({ id: agent.id, status: "stopped" })}
                          disabled={statusMutation.isPending}
                          className="flex-1"
                        >
                          <Square className="h-4 w-4 mr-1" />
                          Stop
                        </Button>
                      )}
                      
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteMutation.mutate(agent.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}