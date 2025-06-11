
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Brain, Search, Users, Download, Quote, ChevronDown, ChevronUp, BarChart3, Settings } from 'lucide-react';
import { ResearchAnalytics } from './dashboard/ResearchAnalytics';
import { AccountSettings } from './dashboard/AccountSettings';
import { ResearchFeatures } from './dashboard/ResearchFeatures';
import { Hero } from './dashboard/Hero';
import { PricingSection } from './dashboard/PricingSection';
import { ResearchInterface } from './dashboard/ResearchInterface';

export const Dashboard = () => {
  const [citationOpen, setCitationOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(true);
  const [accountOpen, setAccountOpen] = useState(true);

  const stats = [
    { title: 'Research Queries', value: '1,247', icon: Search, color: 'text-blue-400' },
    { title: 'Citations', value: '3,856', icon: Quote, color: 'text-green-400' },
    { title: 'Collaborators', value: '28', icon: Users, color: 'text-purple-400' },
    { title: 'Exports', value: '156', icon: Download, color: 'text-yellow-400' }
  ];

  const handleQuerySubmit = () => {
    // Handle query submission
    console.log('Query submitted');
  };

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

        {/* Hero Section */}
        <div className="mb-12">
          <Hero />
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

        {/* AI Research Interface */}
        <div className="mb-6">
          <ResearchInterface 
            subscription={null} 
            onQuerySubmit={handleQuerySubmit} 
          />
        </div>

        {/* Pricing Section */}
        <div className="mb-12">
          <PricingSection />
        </div>

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
          <Card className="backdrop-blur-lg bg-white/10 border-white/20 mb-6">
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

        {/* Research Analytics */}
        <Collapsible open={analyticsOpen} onOpenChange={setAnalyticsOpen}>
          <Card className="backdrop-blur-lg bg-white/10 border-white/20 mb-6">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-orange-400" />
                    Research Analytics
                  </CardTitle>
                  {analyticsOpen ? (
                    <ChevronUp className="h-5 w-5 text-blue-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-blue-400" />
                  )}
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <ResearchAnalytics />
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Account & Settings */}
        <Collapsible open={accountOpen} onOpenChange={setAccountOpen}>
          <Card className="backdrop-blur-lg bg-white/10 border-white/20 mb-8">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Settings className="h-5 w-5 text-gray-400" />
                    Account & Settings
                  </CardTitle>
                  {accountOpen ? (
                    <ChevronUp className="h-5 w-5 text-blue-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-blue-400" />
                  )}
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <AccountSettings />
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Research Features */}
        <ResearchFeatures />
      </div>
    </div>
  );
};
