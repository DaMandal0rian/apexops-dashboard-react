import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Landing from "@/pages/landing";
import Agents from "@/pages/agents";
import GpuResources from "@/pages/gpu-resources";
import Analytics from "@/pages/analytics";
import Performance from "@/pages/performance";
import Costs from "@/pages/costs";
import Alerts from "@/pages/alerts";
import Lineage from "@/pages/lineage";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Switch>
      {!isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <>
          <Route path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/agents" component={Agents} />
          <Route path="/gpu-resources" component={GpuResources} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/performance" component={Performance} />
          <Route path="/costs" component={Costs} />
          <Route path="/alerts" component={Alerts} />
          <Route path="/lineage" component={Lineage} />
          <Route path="/alerts" component={Alerts} />
          <Route path="/lineage" component={Lineage} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="dark">
        <Toaster />
        <Router />
      </div>
    </QueryClientProvider>
  );
}

export default App;
