import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { Header } from "@/components/dashboard/header";
import { QuickStats } from "@/components/dashboard/widgets/quick-stats";
import { ResourceUtilizationChart } from "@/components/dashboard/widgets/resource-utilization-chart";
import { GpuMarketplace } from "@/components/dashboard/widgets/gpu-marketplace";
import { AiAgentsPanel } from "@/components/dashboard/widgets/ai-agents-panel";
import { PerformanceMetrics } from "@/components/dashboard/widgets/performance-metrics";
import { CostAnalytics } from "@/components/dashboard/widgets/cost-analytics";
import { OptimizationTips } from "@/components/dashboard/widgets/optimization-tips";
import { useWebSocket } from "@/hooks/use-websocket";

export default function Dashboard() {
  const { isConnected } = useWebSocket();

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 font-inter antialiased">
      <Sidebar />
      <MobileNav />
      
      <div className="md:ml-64 min-h-screen">
        <Header />
        
        <main className="p-4 md:p-6">
          {/* Quick Stats Row */}
          <div className="mb-6">
            <QuickStats />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            {/* Resource Utilization Chart */}
            <div className="lg:col-span-8">
              <ResourceUtilizationChart />
            </div>

            {/* GPU Marketplace Panel */}
            <div className="lg:col-span-4">
              <GpuMarketplace />
            </div>

            {/* Active AI Agents Management */}
            <div className="lg:col-span-6">
              <AiAgentsPanel />
            </div>

            {/* Performance Metrics */}
            <div className="lg:col-span-6">
              <PerformanceMetrics />
            </div>

            {/* Cost Analytics */}
            <div className="lg:col-span-8">
              <CostAnalytics />
            </div>

            {/* Optimization Tips */}
            <div className="lg:col-span-4">
              <OptimizationTips />
            </div>
          </div>
        </main>
      </div>
      
      {/* Connection Status Indicator */}
      {!isConnected && (
        <div className="fixed bottom-4 right-4 bg-accent-red text-white px-4 py-2 rounded-lg shadow-lg">
          Disconnected from real-time updates
        </div>
      )}
    </div>
  );
}
