import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

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
import AuthGuard from "./components/AuthGuard";

function Router() {
  return (
    <Switch>
      {/* Landing page always accessible at root */}
      <Route path="/" component={Landing} />
      
      {/* Admin dashboard routes - temporarily disable auth guard */}
      <Route path="/admin" component={Dashboard} />
      <Route path="/admin/dashboard" component={Dashboard} />
      <Route path="/admin/agents" component={Agents} />
      <Route path="/admin/gpu-resources" component={GpuResources} />
      <Route path="/admin/analytics" component={Analytics} />
      <Route path="/admin/performance" component={Performance} />
      <Route path="/admin/costs" component={Costs} />
      <Route path="/admin/alerts" component={Alerts} />
      <Route path="/admin/lineage" component={Lineage} />
      
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
