
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Search, Download, Users, Clock } from 'lucide-react';

export const ResearchAnalytics = () => {
  const usageData = [
    { label: 'AI Queries', current: 247, total: 500, color: 'bg-blue-500' },
    { label: 'Storage', current: 2.3, total: 10, unit: 'GB', color: 'bg-green-500' }
  ];

  const researchCategories = [
    { category: 'AI & Machine Learning', percentage: 34 },
    { category: 'Quantum Computing', percentage: 28 },
    { category: 'Climate Science', percentage: 22 },
    { category: 'Biomedical Research', percentage: 16 }
  ];

  const recentActivity = [
    {
      icon: Search,
      title: 'Research query completed: "Quantum computing in drug discovery"',
      time: '2 hours ago',
      detail: '156 results',
      color: 'text-blue-400'
    },
    {
      icon: Download,
      title: 'PDF report exported: "Climate Change Literature Review"',
      time: '4 hours ago',
      detail: 'PDF',
      color: 'text-green-400'
    },
    {
      icon: Users,
      title: 'Collaboration workspace created',
      time: '1 day ago',
      detail: '3 members',
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Usage Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Monthly Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {usageData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-blue-200">{item.label}</span>
                  <span className="text-white font-medium">
                    {item.current}{item.unit || ''}/{item.total}{item.unit || ''}
                  </span>
                </div>
                <Progress 
                  value={(item.current / item.total) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Research Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {researchCategories.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-blue-200">{item.category}</span>
                <span className="text-white font-medium">{item.percentage}%</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentActivity.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="flex items-start gap-3">
                <Icon className={`h-5 w-5 ${activity.color} mt-0.5`} />
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-blue-300 text-xs">{activity.time}</span>
                    <span className="text-blue-300 text-xs">•</span>
                    <span className="text-blue-300 text-xs">{activity.detail}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
