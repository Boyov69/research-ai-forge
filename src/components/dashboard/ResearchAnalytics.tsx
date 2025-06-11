import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Download, Users, Clock, Share, Heart, Bookmark, Trash2, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

export const ResearchAnalytics = () => {
  const [taskDetailsOpen, setTaskDetailsOpen] = useState(true);

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

  const taskFlow = {
    title: "Punten voor verbetering: Kwantitatieve gegevens: Hoewel algemene trends genoemd zijn, ontbreekt gedetailleerde kwantitatieve informatie (zoals exacte marktomvang...",
    source: "Falcon - Deep Search",
    status: "SUCCESS",
    followupTask: "FOLLOWUP TASK",
    start: "06/10/2025 09:37 AM",
    duration: "19m 62s",
    promptTokens: 188721,
    resultTokens: 45185,
    queries: 71,
    sources: {
      candidates: 204,
      relevant: 60,
      referenced: 19
    },
    contexts: {
      candidates: 205,
      relevant: 192,
      usedInAnswer: 40
    },
    models: {
      reasoning: "gpt-4.1-mini",
      answering: "o3-mini"
    }
  };

  return (
    <div className="space-y-6">
      {/* Task Flow Interface */}
      <Card className="bg-white/10 border-white/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-white font-medium">Task:</div>
              <div className="text-blue-200 text-sm flex-1">{taskFlow.title}</div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-blue-400 hover:text-white">
                <Share className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-blue-400 hover:text-white">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-blue-400 hover:text-white">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-blue-400 hover:text-white">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <span className="text-blue-200 text-sm">{taskFlow.source}</span>
              <Badge className="bg-green-600 text-white text-xs">{taskFlow.status}</Badge>
              <Badge className="bg-blue-600 text-white text-xs">{taskFlow.followupTask}</Badge>
            </div>
            <div className="text-blue-200 text-sm">Originating Task</div>
          </div>
        </CardHeader>

        <Collapsible open={taskDetailsOpen} onOpenChange={setTaskDetailsOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors py-2">
              <div className="flex items-center gap-2">
                <span className="text-white text-sm">Task Details</span>
                <ChevronDown className={`h-4 w-4 text-blue-400 transition-transform ${taskDetailsOpen ? 'rotate-180' : ''}`} />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <CardContent className="space-y-4">
              {/* Task Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="text-blue-200 text-xs">Start</div>
                  <div className="text-white text-sm">{taskFlow.start}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-blue-200 text-xs">Duration</div>
                  <div className="text-white text-sm">{taskFlow.duration}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-blue-200 text-xs">Prompt Tokens</div>
                  <div className="text-white text-sm">{taskFlow.promptTokens.toLocaleString()}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-blue-200 text-xs">Result Tokens</div>
                  <div className="text-white text-sm">{taskFlow.resultTokens.toLocaleString()}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-blue-200 text-xs">Queries</div>
                  <div className="text-white text-sm">{taskFlow.queries}</div>
                </div>
              </div>

              {/* Sources and Contexts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="space-y-3">
                  <div className="text-blue-200 text-sm font-medium">Sources</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-blue-300 text-sm">Candidates</span>
                      <span className="text-white text-sm">{taskFlow.sources.candidates}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300 text-sm">Relevant</span>
                      <span className="text-white text-sm">{taskFlow.sources.relevant}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300 text-sm">Referenced</span>
                      <span className="text-white text-sm">{taskFlow.sources.referenced}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-blue-200 text-sm font-medium">Contexts</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-blue-300 text-sm">Candidates</span>
                      <span className="text-white text-sm">{taskFlow.contexts.candidates}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300 text-sm">Relevant</span>
                      <span className="text-white text-sm">{taskFlow.contexts.relevant}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300 text-sm">Used in Answer</span>
                      <span className="text-white text-sm">{taskFlow.contexts.usedInAnswer}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Models */}
              <div className="space-y-3">
                <div className="text-blue-200 text-sm font-medium">Models</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-300 text-sm">Reasoning</span>
                    <span className="text-white text-sm">{taskFlow.models.reasoning}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300 text-sm">Answering</span>
                    <span className="text-white text-sm">{taskFlow.models.answering}</span>
                  </div>
                </div>
              </div>

              {/* Task Navigation Tabs */}
              <div className="flex items-center gap-6 mt-6 pt-4 border-t border-white/20">
                <button className="text-blue-400 text-sm font-medium border-b-2 border-blue-400 pb-1">
                  Results
                </button>
                <button className="text-blue-300 text-sm hover:text-white transition-colors">
                  Reasoning
                </button>
                <button className="text-blue-300 text-sm hover:text-white transition-colors">
                  References <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded ml-1">19</span>
                </button>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Existing Analytics Content */}
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
