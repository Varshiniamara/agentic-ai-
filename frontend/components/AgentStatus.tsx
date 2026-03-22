'use client';
import { useState, useEffect } from 'react';
import { 
      Brain, Eye, TrendingUp, BarChart3, Shield, Cpu, 
      Activity, Clock, CheckCircle, AlertCircle, Zap, Target 
} from 'lucide-react';

interface AgentStatusProps {
      agents?: any[];
}

export default function AgentStatus({ agents: propAgents }: AgentStatusProps) {
      const [internalAgents, setInternalAgents] = useState<any[]>([]);
      const [loading, setLoading] = useState(true);
      const agents = propAgents || internalAgents;

  useEffect(() => {
          if (!propAgents) fetchAgentStatus();
          else setLoading(false);
  }, [propAgents]);

  const fetchAgentStatus = async () => {
          try {
                    const response = await fetch('http://localhost:8001/api/v1/agents');
                    if (response.ok) {
                                const data = await response.json();
                                setInternalAgents(data.agents || []);
                    }
          } catch (error) { console.error(error); }
          finally { setLoading(false); }
  };

  const getStatusColor = (status: string) => {
          if (!status) return 'text-gray-400 bg-gray-500/20';
          switch (status.toLowerCase()) {
              case 'active': return 'text-green-400 bg-green-500/20';
              case 'idle': return 'text-blue-400 bg-blue-500/20';
              case 'processing': case 'busy': return 'text-yellow-400 bg-yellow-500/20';
              case 'error': case 'offline': return 'text-red-400 bg-red-500/20';
              default: return 'text-gray-400 bg-gray-500/20';
          }
  };

  if (loading) return <div className="p-4 bg-white/5 rounded-xl border border-white/10 animate-pulse h-24" />;

  return (
          <div className="space-y-4">
              {agents.map((agent, idx) => (
                      <div key={agent.id || idx} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 text-white">
                                <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                          <div className="p-2 bg-blue-500/10 rounded-lg">
                                                                          <Cpu className="w-6 h-6 text-blue-400" />
                                                          </div>div>
                                                          <div>
                                                                          <h3 className="font-semibold">{agent.name || 'Unknown Agent'}</h3>h3>
                                                                          <p className="text-sm text-gray-400">{agent.type || 'Assistant'}</p>p>
                                                          </div>div>
                                            </div>div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                                                {agent.status || 'unknown'}
                                            </span>span>
                                </div>div>
                                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center space-x-2 text-gray-400">
                                                          <Activity className="w-4 h-4" />
                                                          <span>{agent.performance || agent.efficiency || 0}% performance</span>span>
                                            </div>div>
                                            <div className="flex items-center space-x-2 text-gray-400">
                                                          <CheckCircle className="w-4 h-4" />
                                                          <span>{agent.tasksCompleted || 0} tasks</span>span>
                                            </div>div>
                                </div>div>
                      </div>div>
                    ))}
          </div>div>
        );
}
</div>
