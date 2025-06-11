
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Progress } from '@/components/ui/progress';
import { Brain, Search, Users, Download, Quote, ChevronDown, ChevronUp, Play } from 'lucide-react';

export const Dashboard = () => {
  const [query, setQuery] = useState('What are the latest developments in quantum computing for drug discovery?');
  const [researchProgress, setResearchProgress] = useState(73);
  const [citationOpen, setCitationOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);

  const stats = [
    { title: 'Research Queries', value: '1,247', icon: Search, color: 'text-blue-400' },
    { title: 'Citations', value: '3,856', icon: Quote, color: 'text-green-400' },
    { title: 'Collaborators', value: '28', icon: Users, color: 'text-purple-400' },
    { title: 'Exports', value: '156', icon: Download, color: 'text-yellow-400' }
  ];

  const aiAgents = [
    { name: 'Crow Agent', description: 'Literature discovery', status: 'Active', color: 'bg-green-500' },
    { name: 'Falcon Agent', description: 'Data analysis', status: 'Ready', color: 'bg-blue-500' },
    { name: 'Owl Agent', description: 'Citation generation', status: 'Processing', color: 'bg-orange-500' },
    { name: 'Phoenix Agent', description: 'Synthesis & insights', status: 'Standby', color: 'bg-gray-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Scholar-AI</h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-blue-200">Dashboard</span>
                <span className="text-sm text-blue-200">•</span>
                <span className="text-sm text-blue-200">Pricing</span>
                <span className="text-sm text-blue-200">•</span>
                <span className="text-sm text-blue-200">Features</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-blue-400 hover:text-white">
              Sign In
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Get Started
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="backdrop-blur-lg bg-white/10 border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-200 text-sm font-medium">{stat.title}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* AI Research Assistant */}
        <Card className="backdrop-blur-lg bg-white/10 border-white/20 mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-400" />
                AI Research Assistant
              </CardTitle>
              <ChevronUp className="h-5 w-5 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            {/* AI Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {aiAgents.map((agent, index) => (
                <Card key={index} className="bg-white/5 border-white/10">
                  <CardContent className="p-4 text-center">
                    <div className="mb-3">
                      <Brain className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                      <h3 className="text-white font-medium">{agent.name}</h3>
                      <p className="text-blue-200 text-xs">{agent.description}</p>
                    </div>
                    <Badge 
                      className={`${agent.color} text-white border-0`}
                    >
                      {agent.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Research Query Section */}
            <div className="space-y-4">
              <div>
                <label className="text-white font-medium block mb-2">Research Query</label>
                <Textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 min-h-[100px]"
                  placeholder="Enter your research question..."
                />
              </div>

              <div className="flex items-center gap-4">
                <select className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white text-sm">
                  <option>GPT-4o-2024-11-20</option>
                </select>
                <select className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white text-sm">
                  <option>Temperature: 0.5</option>
                </select>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white ml-auto">
                  <Play className="h-4 w-4 mr-2" />
                  Run Query
                </Button>
              </div>

              {/* Research Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Research Progress</span>
                  <span className="text-blue-200 text-sm">{researchProgress}% Complete</span>
                </div>
                <Progress value={researchProgress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Citation Management */}
        <Collapsible open={citationOpen} onOpenChange={setCitationOpen}>
          <Card className="backdrop-blur-lg bg-white/10 border-white/20 mb-6">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Quote className="h-5 w-5 text-green-400" />
                    Citation Management
                  </CardTitle>
                  {citationOpen ? (
                    <ChevronUp className="h-5 w-5 text-blue-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-blue-400" />
                  )}
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <p className="text-blue-200">
                  Manage your research citations, generate bibliographies, and organize references.
                </p>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Collaborative Workspaces */}
        <Collapsible open={workspaceOpen} onOpenChange={setWorkspaceOpen}>
          <Card className="backdrop-blur-lg bg-white/10 border-white/20">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-400" />
                    Collaborative Workspaces
                  </CardTitle>
                  {workspaceOpen ? (
                    <ChevronUp className="h-5 w-5 text-blue-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-blue-400" />
                  )}
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <p className="text-blue-200">
                  Share workspaces, collaborate on research projects, and work together with your team.
                </p>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>
    </div>
  );
};
