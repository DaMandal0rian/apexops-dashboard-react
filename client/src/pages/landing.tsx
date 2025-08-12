import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bot, 
  Cpu, 
  BarChart3, 
  Activity, 
  ArrowRight, 
  Zap, 
  Shield, 
  Globe,
  Database,
  GitBranch,
  Layers,
  CloudLightning,
  Network,
  Brain
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-100 font-inter antialiased overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Sophisticated Logo */}
              <div className="relative">
                <svg width="40" height="40" viewBox="0 0 40 40" className="relative z-10">
                  {/* Animated background rings */}
                  <circle 
                    cx="20" 
                    cy="20" 
                    r="18" 
                    fill="none" 
                    stroke="url(#logoGradient1)" 
                    strokeWidth="0.5" 
                    opacity="0.3"
                    className="animate-pulse"
                  />
                  <circle 
                    cx="20" 
                    cy="20" 
                    r="15" 
                    fill="none" 
                    stroke="url(#logoGradient2)" 
                    strokeWidth="0.5" 
                    opacity="0.5"
                    style={{animationDelay: '0.5s'}}
                    className="animate-pulse"
                  />
                  
                  {/* Central hexagon */}
                  <polygon 
                    points="20,6 30,13 30,27 20,34 10,27 10,13" 
                    fill="url(#logoGradient3)"
                    stroke="url(#logoGradient4)"
                    strokeWidth="1"
                    className="drop-shadow-lg"
                  />
                  
                  {/* Inner neural network pattern */}
                  <g opacity="0.9">
                    <circle cx="20" cy="15" r="1.5" fill="#ffffff" />
                    <circle cx="15" cy="20" r="1.5" fill="#ffffff" />
                    <circle cx="25" cy="20" r="1.5" fill="#ffffff" />
                    <circle cx="20" cy="25" r="1.5" fill="#ffffff" />
                    <line x1="20" y1="15" x2="15" y2="20" stroke="#ffffff" strokeWidth="0.5" opacity="0.7" />
                    <line x1="20" y1="15" x2="25" y2="20" stroke="#ffffff" strokeWidth="0.5" opacity="0.7" />
                    <line x1="15" y1="20" x2="20" y2="25" stroke="#ffffff" strokeWidth="0.5" opacity="0.7" />
                    <line x1="25" y1="20" x2="20" y2="25" stroke="#ffffff" strokeWidth="0.5" opacity="0.7" />
                  </g>
                  
                  {/* Floating particles */}
                  <circle cx="12" cy="10" r="0.5" fill="url(#particleGradient)" className="animate-float" style={{animationDelay: '0s'}} />
                  <circle cx="28" cy="12" r="0.5" fill="url(#particleGradient)" className="animate-float" style={{animationDelay: '1s'}} />
                  <circle cx="32" cy="28" r="0.5" fill="url(#particleGradient)" className="animate-float" style={{animationDelay: '2s'}} />
                  <circle cx="8" cy="30" r="0.5" fill="url(#particleGradient)" className="animate-float" style={{animationDelay: '3s'}} />
                  
                  {/* Gradient definitions */}
                  <defs>
                    <linearGradient id="logoGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <linearGradient id="logoGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <linearGradient id="logoGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="logoGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <radialGradient id="particleGradient">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                    </radialGradient>
                  </defs>
                </svg>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-xl blur-md"></div>
              </div>
              <div className="relative">
                <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent drop-shadow-lg relative z-10">
                  ApexOps
                </span>
                {/* Glowing text shadow effect */}
                <span className="absolute inset-0 text-2xl font-black tracking-tight text-cyan-400/30 blur-sm animate-pulse">
                  ApexOps
                </span>
                {/* Secondary glow layer */}
                <span className="absolute inset-0 text-2xl font-black tracking-tight text-blue-500/20 blur-md">
                  ApexOps
                </span>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#platform" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">Platform</a>
              <a href="#solutions" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">Solutions</a>
              <a href="#pricing" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">Pricing</a>
              <a href="#docs" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">Documentation</a>
            </nav>
            
            <Button 
              onClick={() => window.location.href = '/api/login'} 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-lg shadow-cyan-500/25 transition-all duration-300"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-6 py-3 mb-8">
              <Zap className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-medium text-gray-300">Enterprise-Grade AI Platform Management</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight tracking-tight relative">
              <span className="block text-white mb-2 relative z-10 drop-shadow-lg">AI Infrastructure Solutions</span>
              <span className="block text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text relative z-10 drop-shadow-lg">
                & Services
              </span>
              {/* Dramatic text glow effect */}
              <div className="absolute inset-0 text-6xl md:text-7xl font-bold leading-tight tracking-tight opacity-25 blur-lg">
                <span className="block text-cyan-400 mb-2">AI Infrastructure Solutions</span>
                <span className="block text-blue-500">
                  & Services
                </span>
              </div>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Comprehensive AI infrastructure solutions including intelligent management systems, real-time 
              data aggregation, multi-provider AI routing, and autonomous agent orchestration 
              designed for enterprise scalability and reliability.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg" 
                onClick={() => window.location.href = '/api/login'}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-10 py-4 text-lg font-semibold border-0 shadow-xl shadow-cyan-500/25 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-105"
              >
                Start Free Trial
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-slate-600 bg-slate-800/50 backdrop-blur-sm text-gray-200 hover:bg-slate-700/50 hover:border-cyan-400/50 px-10 py-4 text-lg font-semibold transition-all duration-300"
              >
                Watch Demo
              </Button>
            </div>
            
            {/* OAuth Login Options */}
            <div className="flex flex-wrap justify-center gap-4 max-w-md mx-auto">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/api/login'}
                className="border-slate-600 bg-slate-800/30 backdrop-blur-sm text-gray-300 hover:bg-slate-700/50 hover:border-cyan-400/50 px-6 py-2 transition-all duration-300"
              >
                Continue with Replit
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/api/auth/github'}
                className="border-slate-600 bg-slate-800/30 backdrop-blur-sm text-gray-300 hover:bg-slate-700/50 hover:border-purple-400/50 px-6 py-2 transition-all duration-300"
              >
                Sign in with GitHub
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/api/auth/google'}
                className="border-slate-600 bg-slate-800/30 backdrop-blur-sm text-gray-300 hover:bg-slate-700/50 hover:border-red-400/50 px-6 py-2 transition-all duration-300"
              >
                Sign in with Google
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid Section */}
      <section id="solutions" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Low Latency RPC Services - Cyan/Teal Theme */}
            <Card className="group bg-slate-900/50 backdrop-blur-sm border-slate-700/50 hover:border-teal-400/50 transition-all duration-500 hover:shadow-xl hover:shadow-teal-500/10 hover:scale-105 relative overflow-hidden">
              <CardHeader className="pb-8 relative z-10">
                <div className="mb-6">
                  <div className="relative h-16 bg-slate-800/30 rounded-lg border border-slate-600/50 overflow-hidden mb-4">
                    {/* Dramatic data stream visualization */}
                    <div className="absolute inset-0">
                      {/* Multiple streaming data lanes */}
                      {[...Array(4)].map((_, laneIndex) => (
                        <div key={laneIndex} className={`absolute w-full h-3 top-${laneIndex * 3 + 2}`} style={{top: `${laneIndex * 12 + 8}px`}}>
                          <div className="flex space-x-1 animate-data-stream" style={{animationDelay: `${laneIndex * 0.3}s`, animationDuration: `${2 + laneIndex * 0.5}s`}}>
                            {[...Array(20)].map((_, i) => (
                              <div 
                                key={i} 
                                className="w-3 h-3 flex-shrink-0 rounded-sm relative group-hover:scale-110 transition-transform duration-300"
                                style={{
                                  background: `linear-gradient(45deg, 
                                    hsl(${160 + i * 8}, 85%, ${45 + Math.sin(i) * 20}%), 
                                    hsl(${180 + i * 12}, 90%, ${65 + Math.cos(i) * 15}%))`,
                                  boxShadow: '0 0 8px rgba(20, 184, 166, 0.5)',
                                  animation: `rpcPulse ${1 + Math.random()}s ease-in-out infinite`,
                                  animationDelay: `${i * 0.05 + laneIndex * 0.1}s`
                                }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent rounded-sm"></div>
                                {/* Particle trail effect */}
                                <div 
                                  className="absolute -right-1 top-1/2 w-2 h-0.5 bg-cyan-400/60 rounded-full opacity-0 group-hover:opacity-100"
                                  style={{
                                    animation: `particleTrail 0.5s ease-out infinite`,
                                    animationDelay: `${i * 0.02}s`
                                  }}
                                ></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Dramatic scanning beam */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-0 w-1 h-full bg-gradient-to-b from-transparent via-teal-300 to-transparent opacity-60 group-hover:opacity-100 animate-scanning-beam"></div>
                    </div>
                    
                    {/* Performance indicators with dramatic effects */}
                    <div className="absolute top-1 right-1 flex flex-col space-y-1">
                      {['99.9%', '< 1ms', 'LIVE'].map((label, i) => (
                        <div 
                          key={i}
                          className="text-xs font-mono text-teal-300 bg-teal-400/10 px-1 rounded opacity-70 group-hover:opacity-100 group-hover:bg-teal-400/20 transition-all duration-500"
                          style={{animationDelay: `${i * 0.2}s`}}
                        >
                          {label}
                        </div>
                      ))}
                    </div>
                    
                    {/* Electric border effect */}
                    <div className="absolute inset-0 border border-teal-400/0 group-hover:border-teal-400/50 rounded-lg transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(20,184,166,0.4)]"></div>
                  </div>
                  <div className="text-xs text-teal-400/70 text-center group-hover:text-teal-400 transition-colors duration-300">RPC Monitoring</div>
                </div>
                
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                    <Zap className="h-6 w-6 text-cyan-400" />
                  </div>
                  <CardTitle className="text-white text-xl group-hover:text-cyan-400 transition-colors duration-300">
                    Low Latency RPC Services
                  </CardTitle>
                </div>
                
                <CardDescription className="text-gray-300 text-base leading-relaxed">
                  High-performance remote procedure call infrastructure optimized for minimal latency 
                  and maximum throughput
                </CardDescription>
              </CardHeader>
            </Card>

            {/* AI Gateway & Routing - Orange/Amber Theme */}
            <Card className="group bg-slate-900/50 backdrop-blur-sm border-slate-700/50 hover:border-orange-400/50 transition-all duration-500 hover:shadow-xl hover:shadow-orange-500/10 hover:scale-105 relative overflow-hidden">
              <CardHeader className="pb-8 relative z-10">
                <div className="mb-6">
                  <div className="relative h-16 bg-slate-800/30 rounded-lg border border-slate-600/50 overflow-hidden mb-4">
                    {/* Dramatic neural network visualization */}
                    <svg className="absolute inset-0 w-full h-full">
                      <defs>
                        {/* Advanced gradients for dramatic effect */}
                        <radialGradient id="explosiveGradient" cx="50%" cy="50%">
                          <stop offset="0%" stopColor="#f97316" stopOpacity="1" />
                          <stop offset="50%" stopColor="#fb923c" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.3" />
                        </radialGradient>
                        <linearGradient id="lightningGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0">
                            <animate attributeName="stop-opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite"/>
                          </stop>
                          <stop offset="50%" stopColor="#f97316" stopOpacity="1">
                            <animate attributeName="stop-opacity" values="0.3;1;0.3" dur="0.8s" repeatCount="indefinite"/>
                          </stop>
                          <stop offset="100%" stopColor="#fb923c" stopOpacity="0">
                            <animate attributeName="stop-opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite"/>
                          </stop>
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge> 
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      
                      {/* Central processing core with dramatic pulsing */}
                      <circle 
                        cx="50%" 
                        cy="50%" 
                        r="12" 
                        fill="url(#explosiveGradient)" 
                        filter="url(#glow)"
                        className="group-hover:animate-ping"
                      >
                        <animate attributeName="r" values="10;16;10" dur="2s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
                      </circle>
                      
                      {/* Lightning-fast data pathways */}
                      {[
                        {x1: "10%", y1: "50%", x2: "35%", y2: "50%", delay: "0s"},
                        {x1: "65%", y1: "50%", x2: "90%", y2: "50%", delay: "0.3s"},
                        {x1: "50%", y1: "10%", x2: "50%", y2: "35%", delay: "0.6s"},
                        {x1: "50%", y1: "65%", x2: "50%", y2: "90%", delay: "0.9s"},
                        {x1: "20%", y1: "20%", x2: "40%", y2: "40%", delay: "1.2s"},
                        {x1: "60%", y1: "60%", x2: "80%", y2: "80%", delay: "1.5s"},
                        {x1: "80%", y1: "20%", x2: "60%", y2: "40%", delay: "1.8s"},
                        {x1: "40%", y1: "60%", x2: "20%", y2: "80%", delay: "2.1s"}
                      ].map((path, i) => (
                        <g key={i}>
                          <line 
                            x1={path.x1} y1={path.y1} 
                            x2={path.x2} y2={path.y2}
                            stroke="url(#lightningGradient)" 
                            strokeWidth="3"
                            filter="url(#glow)"
                            opacity="0.4"
                            className="group-hover:opacity-100"
                          >
                            <animate attributeName="stroke-width" values="1;4;1" dur="1.5s" repeatCount="indefinite" begin={path.delay}/>
                            <animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" repeatCount="indefinite" begin={path.delay}/>
                          </line>
                          
                          {/* Data packets traveling along paths */}
                          <circle r="2" fill="#ffffff" opacity="0.8">
                            <animateMotion dur="2s" repeatCount="indefinite" begin={path.delay}>
                              <mpath href={`#path${i}`}/>
                            </animateMotion>
                            <animate attributeName="r" values="1;3;1" dur="2s" repeatCount="indefinite" begin={path.delay}/>
                          </circle>
                          
                          {/* Hidden path for motion */}
                          <path id={`path${i}`} d={`M ${path.x1} ${path.y1} L ${path.x2} ${path.y2}`} fill="none" opacity="0"/>
                        </g>
                      ))}
                      
                      {/* Explosive connection nodes */}
                      {[
                        {x: "10%", y: "50%"}, {x: "90%", y: "50%"},
                        {x: "50%", y: "10%"}, {x: "50%", y: "90%"},
                        {x: "20%", y: "20%"}, {x: "80%", y: "80%"},
                        {x: "80%", y: "20%"}, {x: "20%", y: "80%"}
                      ].map((node, i) => (
                        <circle 
                          key={i}
                          cx={node.x} 
                          cy={node.y} 
                          r="3" 
                          fill="#f97316" 
                          filter="url(#glow)"
                          className="group-hover:animate-pulse"
                        >
                          <animate attributeName="r" values="2;5;2" dur="1.8s" repeatCount="indefinite" begin={`${i * 0.2}s`}/>
                          <animate attributeName="fill" values="#f97316;#fb923c;#fbbf24;#f97316" dur="3s" repeatCount="indefinite" begin={`${i * 0.1}s`}/>
                        </circle>
                      ))}
                    </svg>
                    
                    {/* Performance metrics with dramatic styling */}
                    <div className="absolute top-1 right-1 flex flex-col space-y-0.5">
                      {[
                        {label: '10M', color: 'text-orange-300', bg: 'bg-orange-400/20'},
                        {label: 'RPS', color: 'text-amber-300', bg: 'bg-amber-400/20'},
                        {label: '99.9%', color: 'text-yellow-300', bg: 'bg-yellow-400/20'}
                      ].map((metric, i) => (
                        <div 
                          key={i}
                          className={`text-xs font-mono ${metric.color} ${metric.bg} px-1 rounded opacity-70 group-hover:opacity-100 group-hover:shadow-lg transition-all duration-500 animate-pulse`}
                          style={{animationDelay: `${i * 0.3}s`}}
                        >
                          {metric.label}
                        </div>
                      ))}
                    </div>
                    
                    {/* Electric border with dramatic glow */}
                    <div className="absolute inset-0 border border-orange-400/0 group-hover:border-orange-400/60 rounded-lg transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]"></div>
                  </div>
                  <div className="text-xs text-orange-400/70 text-center group-hover:text-orange-400 transition-colors duration-300">Request Routing</div>
                </div>
                
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-400/10 rounded-full blur-2xl transform -translate-x-16 translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                    <GitBranch className="h-6 w-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-white text-xl group-hover:text-blue-400 transition-colors duration-300">
                    AI Gateway & Routing
                  </CardTitle>
                </div>
                
                <CardDescription className="text-gray-300 text-base leading-relaxed">
                  Intelligent request routing and load balancing for AI model endpoints with failover and 
                  optimization
                </CardDescription>
              </CardHeader>
            </Card>

            {/* GPU Cluster Rentals */}
            <Card className="group bg-slate-900/50 backdrop-blur-sm border-slate-700/50 hover:border-purple-400/50 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 hover:scale-105 relative overflow-hidden">
              <CardHeader className="pb-8 relative z-10">
                <div className="mb-6">
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {[...Array(16)].map((_, i) => (
                      <div 
                        key={i} 
                        className="h-6 bg-slate-700/50 rounded border border-slate-600/50 flex items-center justify-center relative overflow-hidden group-hover:border-violet-400/30 transition-all duration-500"
                        style={{
                          animationDelay: `${Math.random() * 2}s`
                        }}
                      >
                        <div className="w-2 h-2 bg-violet-400/40 rounded-full group-hover:bg-violet-400/80 group-hover:animate-pulse transition-all duration-500"></div>
                        
                        {/* Random activation effect */}
                        <div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            animation: 'gpuFlash 3s ease-in-out infinite',
                            animationDelay: `${Math.random() * 3}s`
                          }}
                        ></div>
                        
                        {/* Corner indicators */}
                        <div className="absolute top-0 right-0 w-1 h-1 bg-violet-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-violet-400/70 text-center group-hover:text-violet-400 transition-colors duration-300">GPU Infrastructure</div>
                </div>
                
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-violet-400/10 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-700"></div>
                
                {/* Data flow lines */}
                <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-40 transition-opacity duration-500">
                  <defs>
                    <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                      <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line x1="0%" y1="20%" x2="100%" y2="20%" stroke="url(#dataFlow)" strokeWidth="1" className="animate-pulse" />
                  <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="url(#dataFlow)" strokeWidth="1" className="animate-pulse" style={{animationDelay: '0.5s'}} />
                  <line x1="0%" y1="80%" x2="100%" y2="80%" stroke="url(#dataFlow)" strokeWidth="1" className="animate-pulse" style={{animationDelay: '1s'}} />
                </svg>
                
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                    <Cpu className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-white text-xl group-hover:text-purple-400 transition-colors duration-300">
                    GPU Cluster Rentals
                  </CardTitle>
                </div>
                
                <CardDescription className="text-gray-300 text-base leading-relaxed">
                  Scalable GPU infrastructure for training and deploying large language models with 
                  enterprise-grade reliability
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Advanced Platform Capabilities
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built for enterprise scalability with intelligent automation and real-time insights
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <Card className="bg-slate-900/30 backdrop-blur-sm border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                    <Bot className="h-6 w-6 text-cyan-400" />
                  </div>
                  <CardTitle className="text-white">Autonomous Agent Orchestration</CardTitle>
                </div>
                <CardDescription className="text-gray-300 leading-relaxed">
                  Intelligent deployment and management of AI agents with automatic scaling, 
                  failover capabilities, and adaptive load distribution.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-slate-900/30 backdrop-blur-sm border-slate-700/50 hover:border-green-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                    <Database className="h-6 w-6 text-green-400" />
                  </div>
                  <CardTitle className="text-white">Real-Time Data Aggregation</CardTitle>
                </div>
                <CardDescription className="text-gray-300 leading-relaxed">
                  High-throughput data processing pipelines with stream analytics, 
                  real-time transformations, and intelligent caching mechanisms.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-slate-900/30 backdrop-blur-sm border-slate-700/50 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20">
                    <CloudLightning className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">Multi-Provider AI Routing</CardTitle>
                </div>
                <CardDescription className="text-gray-300 leading-relaxed">
                  Intelligent routing across multiple AI providers with cost optimization, 
                  performance monitoring, and automatic failover mechanisms.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-slate-900/30 backdrop-blur-sm border-slate-700/50 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
                    <Activity className="h-6 w-6 text-yellow-400" />
                  </div>
                  <CardTitle className="text-white">Predictive Analytics</CardTitle>
                </div>
                <CardDescription className="text-gray-300 leading-relaxed">
                  Advanced machine learning models for capacity planning, anomaly detection, 
                  and predictive maintenance across your infrastructure.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-slate-900/30 backdrop-blur-sm border-slate-700/50 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
                    <Shield className="h-6 w-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">Enterprise Security</CardTitle>
                </div>
                <CardDescription className="text-gray-300 leading-relaxed">
                  Zero-trust architecture with end-to-end encryption, role-based access control, 
                  and compliance with SOC 2, GDPR, and HIPAA standards.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-slate-900/30 backdrop-blur-sm border-slate-700/50 hover:border-red-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-red-500/20 to-pink-500/20">
                    <Layers className="h-6 w-6 text-red-400" />
                  </div>
                  <CardTitle className="text-white">Scalable Infrastructure</CardTitle>
                </div>
                <CardDescription className="text-gray-300 leading-relaxed">
                  Auto-scaling infrastructure that adapts to workload demands with 
                  intelligent resource allocation and cost optimization algorithms.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your AI Infrastructure?
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Join leading enterprises using ApexOps to scale their AI operations with 
              intelligent automation and enterprise-grade reliability.
            </p>
            <Button 
              size="lg" 
              onClick={() => window.location.href = '/api/login'}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-12 py-4 text-lg font-semibold border-0 shadow-xl shadow-cyan-500/25 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-105"
            >
              Start Your Journey Today
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-16 bg-slate-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              {/* Footer Logo - Simplified Version */}
              <div className="relative">
                <svg width="32" height="32" viewBox="0 0 32 32" className="relative z-10">
                  <polygon 
                    points="16,5 24,10 24,22 16,27 8,22 8,10" 
                    fill="url(#footerGradient)"
                    stroke="url(#footerStroke)"
                    strokeWidth="1"
                  />
                  <circle cx="16" cy="13" r="1" fill="#ffffff" opacity="0.8" />
                  <circle cx="13" cy="16" r="1" fill="#ffffff" opacity="0.8" />
                  <circle cx="19" cy="16" r="1" fill="#ffffff" opacity="0.8" />
                  <circle cx="16" cy="19" r="1" fill="#ffffff" opacity="0.8" />
                  
                  <defs>
                    <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
                    </linearGradient>
                    <linearGradient id="footerStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="relative">
                <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent drop-shadow-sm relative z-10">
                  ApexOps
                </span>
                <span className="absolute inset-0 text-xl font-black tracking-tight text-cyan-400/20 blur-sm">
                  ApexOps
                </span>
              </div>
            </div>
            <div className="text-gray-400">
              © 2025 ApexOps. Enterprise AI Infrastructure Solutions.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}