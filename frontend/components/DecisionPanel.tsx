'use client';
import { useState, useEffect } from 'react';
import { 
      Target, Brain, CheckCircle, Clock, AlertTriangle, 
      TrendingUp, DollarSign, Users, Zap, ThumbsUp, 
      ThumbsDown, Eye, Shield, MessageSquare
} from 'lucide-react';

interface DecisionPanelProps {
      decisions?: any[];
}

export default function DecisionPanel({ decisions: propDecisions }: DecisionPanelProps) {
      const [internalDecisions, setInternalDecisions] = useState<any[]>([]);
      const [loading, setLoading] = useState(true);

  const decisions = (propDecisions || internalDecisions).map(d => ({
          ...d,
          title: d.title || 'Untitled Decision',
          description: d.description || 'No description provided',
          status: d.status || 'pending',
          agent: d.agent_id || d.agent || 'System',
          timestamp: d.created_at || d.timestamp || new Date().toISOString()
  }));

  useEffect(() => {
          if (!propDecisions) fetchDecisions();
          else setLoading(false);y-between mb-4">
                          <div className="flex items-center space-x-3">
          {getStatusIcon(decision.status)}
                    <div>
                              <h3 className="text-lg font-semibold text-white">{decision.title}</h3>h3>
                              <p className="text-sm text-gray-400">{decision.agent} - {new Date(decision.timestamp).toLocaleTimeString()}</p>p>
              </div>
              </>div>
              </div>
                        <p className="text-gray-300 mb-4">{decision.description}</p>p>
                        <div className="grid grid-cols-2 gap-4 text-sm text-white">
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                                  <span className="text-gray-400 block mb-1">Impact</span>span>
                                                  <span>{decision.impact_level || decision.impact || 'N/A'}</span>span>
                                    </div>div>
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                                  <span className="text-gray-400 block mb-1">Confidence</span>span>
                                                  <span>{decision.confidence}%</span>span>
                                    </div>div>
                        </div>div>
              </>div>
                    ))}
            </div>
              );
}
</h3>
  }, [propDecisions]);

  const fetchDecisions = async () => {
          try {
                    const response = await fetch('http://localhost:8001/api/v1/decisions');
                    if (response.ok) {
                                const data = await response.json();
                                setInternalDecisions(data.decisions || []);
                    }
          } catch (error) { console.error(error); }
          finally { setLoading(false); }
  };

  const getStatusIcon = (status: string) => {
          switch (status.toLowerCase()) {
              case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
              case 'approved': return <CheckCircle className="w-5 h-5 text-green-500" />;
              case 'rejected': return <ThumbsDown className="w-5 h-5 text-red-500" />;
              case 'implemented': return <Zap className="w-5 h-5 text-blue-500" />;
              default: return <Clock className="w-5 h-5 text-gray-500" />;
          }
  };

  if (loading) return <div className="p-4 bg-white/5 rounded-xl border border-white/10 animate-pulse h-24" />;

  return (
          <div className="space-y-4">
              {decisions.map((decision, idx) => (
                      <div key={decision.id || idx} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                                <div className="flex items-start justif</div>
