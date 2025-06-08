import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Search, Brain, Eye, Zap, Flame } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

interface ResearchInterfaceProps {
  subscription: Tables<'subscriptions'> | null;
  onQuerySubmit: () => void;
}

const AI_AGENTS = [
  { id: 'crow', name: 'Crow', icon: Brain, description: 'Literature synthesis' },
  { id: 'falcon', name: 'Falcon', icon: Eye, description: 'Data analysis' },
  { id: 'owl', name: 'Owl', icon: Search, description: 'Deep research' },
  { id: 'phoenix', name: 'Phoenix', icon: Flame, description: 'Innovation discovery' }
];

export const ResearchInterface = ({ subscription, onQuerySubmit }: ResearchInterfaceProps) => {
  const [title, setTitle] = useState('');
  const [query, setQuery] = useState('');
  const [selectedAgents, setSelectedAgents] = useState<string[]>(['crow']);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAgentToggle = (agentId: string) => {
    setSelectedAgents(prev => 
      prev.includes(agentId) 
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !query.trim() || selectedAgents.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields and select at least one AI agent.",
        variant: "destructive",
      });
      return;
    }

    if (!subscription) {
      toast({
        title: "Subscription Required",
        description: "Please subscribe to start researching.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('research_queries')
        .insert({
          user_id: user.id,
          title: title.trim(),
          query_text: query.trim(),
          ai_agents_used: selectedAgents,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Research Query Submitted",
        description: "Your query is being processed by our AI agents.",
      });

      setTitle('');
      setQuery('');
      setSelectedAgents(['crow']);
      onQuerySubmit();
    } catch (error: any) {
      toast({
        title: "Error submitting query",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const queriesRemaining = subscription 
    ? (subscription.monthly_query_limit - (subscription.monthly_queries_used || 0))
    : 0;

  return (
    <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-400" />
          Research Query Interface
        </CardTitle>
        <CardDescription className="text-blue-200">
          Submit your research question to our superhuman AI agents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Research Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a descriptive title for your research"
              className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="query" className="text-white">Research Question</Label>
            <Textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe your research question in detail..."
              rows={4}
              className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-white">Select AI Agents</Label>
            <div className="grid grid-cols-2 gap-3">
              {AI_AGENTS.map((agent) => {
                const Icon = agent.icon;
                return (
                  <div
                    key={agent.id}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      selectedAgents.includes(agent.id)
                        ? 'bg-blue-500/20 border-blue-400'
                        : 'bg-white/5 border-white/20 hover:border-white/40'
                    }`}
                    onClick={() => handleAgentToggle(agent.id)}
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={selectedAgents.includes(agent.id)}
                        onChange={() => handleAgentToggle(agent.id)}
                        className="border-white/40"
                      />
                      <Icon className="h-4 w-4 text-blue-400" />
                      <div className="flex-1">
                        <p className="text-white font-medium">{agent.name}</p>
                        <p className="text-xs text-blue-200">{agent.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-blue-200">
              Queries remaining: <span className="font-semibold text-white">{queriesRemaining}</span>
            </div>
            <Button
              type="submit"
              disabled={loading || queriesRemaining <= 0}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Start Research
                </div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
