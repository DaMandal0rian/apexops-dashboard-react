import { Link, useLocation } from "wouter";
import { 
  Home, 
  Bot, 
  Cpu, 
  BarChart3, 
  Activity, 
  DollarSign,
  Bell,
  GitBranch,
  LogOut
} from "lucide-react";

export function Sidebar() {
  const [location] = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "AI Agents", href: "/admin/agents", icon: Bot },
    { name: "GPU Resources", href: "/admin/gpu-resources", icon: Cpu },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Performance", href: "/admin/performance", icon: Activity },
    { name: "Cost Management", href: "/admin/costs", icon: DollarSign },
    { name: "Alerts", href: "/admin/alerts", icon: Bell },
    { name: "Data Lineage", href: "/admin/lineage", icon: GitBranch },
  ];

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-dark-800 border-r border-gray-700 md:block hidden">
      <div className="flex h-16 items-center px-4 md:px-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div className="relative">
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent drop-shadow-sm relative z-10">
              ApexOps
            </span>
            <span className="absolute inset-0 text-xl font-black tracking-tight text-cyan-400/20 blur-sm">
              ApexOps
            </span>
          </div>
        </div>
      </div>

      <nav className="mt-8 px-2 md:px-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location === item.href || (item.href === "/admin/dashboard" && (location === "/admin" || location === "/admin/"));
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-cyan-600 text-white"
                      : "text-gray-300 hover:text-white hover:bg-dark-700"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
        <button
          onClick={() => window.location.href = "/api/logout"}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:text-white hover:bg-dark-700 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}