'use client';
import { useState, useEffect } from 'react';
import { 
    AlertTriangle, TrendingDown, TrendingUp, Clock, Brain, 
    Shield, Zap, CheckCircle, XCircle, AlertCircle, Eye
} from 'lucide-react';

interface Alert {
    id: string;
    type: 'critical' | 'high' | 'medium' | 'low';
    title: string;
    description: string;
    timestamp: string;
    agent: string;
    confidence: number;
    impact: string;
    status: 'active' | 'acknowledged' | 'resolved';
}

interface AlertPanelProps {
    alerts?: Alert[];
}

export default function AlertPanel({ alerts: propAlerts }: AlertPanelProps) {
    const [internalAlerts, setInternalAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);
    const alerts = propAlerts || internalAlerts;

  useEffect(() => {
        if (!propAlerts) fetchAlerts();
        else setLoading(false);
  }, [propAlerts]);

  const fetchAlerts = async () => {
        try {
                const response = await fetch('http://localhost:8001/api/v1/alerts');
                if (response.ok) {
                          const data = await response.json();
                          setInternalAlerts(data.alerts || []);
                }
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
  };

  const getAlertIcon = (type: string) => {
        switch (type) {
          case 'critical': return <XCircle className="w-5 h-5 text-red-500" />;
          case 'high': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
          case 'medium': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
          case 'low': return <CheckCircle className="w-5 h-5 text-blue-500" />;
          default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
        }
  };

  const getAlertColor = (type: string) => {
        switch (type) {
          case 'critical': return 'border-red-500/50 bg-red-500/5';
          case 'high': return 'border-orange-500/50 bg-orange-500/5';
          case 'medium': return 'border-yellow-500/50 bg-yellow-500/5';
          case 'low': return 'border-blue-500/50 bg-blue-500/5';
          default: return 'border-gray-500/50 bg-gray-500/5';
        }
  };

  const getStatusColor = (status: string) => {
        switch (status) {
          case 'active': return 'text-red-400 bg-red-500/20';
          case 'acknowledged': return 'text-yellow-400 bg-yellow-500/20';
          case 'resolved': return 'text-green-400 bg-green-500/20';
          default: return 'text-gray-400 bg-gray-500/20';
        }
  };

  const getAgentIcon = (agent: string) => {
        if (agent.includes('Monitor')) return <Eye className="w-4 h-4" />;
        if (agent.includes('Predictor')) return <TrendingUp className="w-4 h-4" />;
        if (agent.includes('Analyst')) return <Brain className="w-4 h-4" />;
        return <Shield className="w-4 h-4" />;
  };

  const formatTimeAgo = (timestamp: string) => {
        const now = new Date();
        const alertTime = new Date(timestamp);
        const diffMs = now.getTime() - alertTime.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${Math.floor(diffHours / 24)}d ago`;
  };

  if (loading) return <div className="p-4 bg-white/5 rounded-xl border border-white/10 animate-pulse h-24" />;

  return (
        <div className="space-y-4">
          {alerts.map((alert) => (
                  <div key={alert.id} className={`bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 ${getAlertColor(alert.type)}`}>
                            <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                          {getAlertIcon(alert.type)}
                                                      <div>
                                                                      <h3 className="text-lg font-semibold text-white">{alert.title}</h3>h3>
                                                                      <div className="flex items-center space-x-4 mt-1">
                                                                                        <div className="flex items-center space-x-1 text-blue-300">
                                                                                          {getAgentIcon(alert.agent)}
                                                                                                            <span className="text-sm">{alert.agent}</span>span>
                                                                                          </div>div>
                                                                                        <div className="flex items-center space-x-1 text-gray-300">
                                                                                                            <Clock className="w-4 h-4" />
                                                                                                            <span className="text-sm">{formatTimeAgo(alert.timestamp)}</span>span>
                                                                                          </div>div>
                                                                      </div>div>
                                                      </div>div>
                                        </div>div>
                            </div>div>
                            <p className="text-gray-300">{alert.description}</p>p>
                  </div>div>
                ))}
        </div>div>
      );
}
</div>
