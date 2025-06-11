
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Search, History, Sparkles, FileText, RotateCcw } from 'lucide-react';
import { RecentQueries } from './RecentQueries';
import { useResearchQueries } from '@/hooks/useResearchQueries';
import { useSubscription } from '@/hooks/useSubscription';
import type { Tables } from '@/integrations/supabase/types';

interface ResearchInterfaceProps {
  subscription: Tables<'subscriptions'> | null;
  onQuerySubmit: () => void;
}

export const ResearchInterface = ({ onQuerySubmit }: ResearchInterfaceProps) => {
  const [title, setTitle] = useState('');
  const [queryText, setQueryText] = useState('');
  const [selectedAgents, setSelectedAgents] = useState<string[]>(['gpt-4']);
  const [activeTab, setActiveTab] = useState('research');
  
  const { queries, isLoading: queriesLoading, createQuery } = useResearchQueries();
  const { subscription } = useSubscription();

  const aiAgents = [
    { id: 'gpt-4', name: 'GPT-4', description: 'Advanced reasoning and analysis' },
    { id: 'claude-3', name: 'Claude-3', description: 'Excellent for research synthesis' },
    { id: 'paperqa2', name: 'PaperQA2', description: 'Specialized academic paper analysis' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !queryText.trim()) return;

    await createQuery.mutateAsync({
      title: title.trim(),
      query_text: queryText.trim(),
      ai_agents_used: selectedAgents,
      status: 'pending',
    });

    // Reset form
    setTitle('');
    setQueryText('');
    onQuerySubmit();
  };

  const handleRecall = (query: Tables<'research_queries'>) => {
    setTitle(query.title);
    setQueryText(query.query_text);
    setSelectedAgents(query.ai_agents_used || ['gpt-4']);
    setActiveTab('research');
  };

  const toggleAgent = (agentId: string) => {
    setSelectedAgents(prev => 
      prev.includes(agentId) 
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    );
  };

  return (
    <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="h-6 w-6 text-blue-400" />
          AI Research Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10">
            <TabsTrigger value="research" className="text-white data-[state=active]:bg-blue-500/30">
              <Search className="h-4 w-4 mr-2" />
              New Research
            </TabsTrigger>
            <TabsTrigger value="history" className="text-white data-[state=active]:bg-blue-500/30">
              <History className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="research" className="space-y-6 mt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-blue-200">Research Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a descriptive title for your research"
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="query" className="text-blue-200">Research Query</Label>
                <Textarea
                  id="query"
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  placeholder="Describe your research question in detail. Be specific about what you want to discover or analyze..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-300 min-h-[120px] resize-none"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label className="text-blue-200">AI Agents</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {aiAgents.map((agent) => (
                    <div
                      key={agent.id}
                      onClick={() => toggleAgent(agent.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedAgents.includes(agent.id)
                          ? 'bg-blue-500/20 border-blue-400 text-white'
                          : 'bg-white/5 border-white/20 text-blue-200 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{agent.name}</span>
                        {selectedAgents.includes(agent.id) && (
                          <Sparkles className="h-4 w-4 text-blue-400" />
                        )}
                      </div>
                      <p className="text-xs text-blue-300">{agent.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {subscription && (
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-sm text-blue-200">
                    <span className="font-medium text-white">
                      {subscription.monthly_query_limit - (subscription.monthly_queries_used || 0)}
                    </span>
                    {' '}queries remaining this month
                  </div>
                  <Badge variant="outline" className="border-blue-400 text-blue-300">
                    {subscription.tier}
                  </Badge>
                </div>
              )}

              <Button 
                type="submit" 
                disabled={createQuery.isPending || !title.trim() || !queryText.trim() || selectedAgents.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {createQuery.isPending ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Submit Research Query
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <RecentQueries 
              queries={queries} 
              onRecall={handleRecall}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
