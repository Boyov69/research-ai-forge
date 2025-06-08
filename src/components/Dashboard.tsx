
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, LogOut, Search, BookOpen, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Sign Out Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">Scholar-AI</h1>
          </div>
          <Button
            onClick={handleSignOut}
            disabled={loading}
            variant="outline"
            className="text-white border-white/20 hover:bg-white/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Welcome to Scholar-AI
          </h2>
          <p className="text-xl text-blue-200 mb-8">
            Your superhuman research platform powered by AI
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="backdrop-blur-lg bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Search className="h-5 w-5" />
                AI Research
              </CardTitle>
              <CardDescription className="text-blue-200">
                Conduct advanced research with AI assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/80">
                Use our AI agents to analyze papers, extract insights, and generate comprehensive research summaries.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-lg bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Smart Citations
              </CardTitle>
              <CardDescription className="text-blue-200">
                Automatic citation generation and management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/80">
                Generate properly formatted citations in multiple styles with our intelligent citation system.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-lg bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5" />
                Collaboration
              </CardTitle>
              <CardDescription className="text-blue-200">
                Work together on research projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/80">
                Share workspaces, collaborate on queries, and build knowledge together with your team.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 text-lg"
          >
            Start New Research Query
          </Button>
        </div>
      </div>
    </div>
  );
};
