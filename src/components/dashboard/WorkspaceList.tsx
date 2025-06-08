
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Lock, Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Workspace = Tables<'workspaces'>;

export const WorkspaceList = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const { data } = await supabase
        .from('workspaces')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(5);

      setWorkspaces(data || []);
    } catch (error) {
      console.error('Error fetching workspaces:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-400" />
          Workspaces
        </CardTitle>
        <CardDescription className="text-blue-200">
          Collaborate on research projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="w-6 h-6 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
          </div>
        ) : workspaces.length === 0 ? (
          <div className="text-center py-6">
            <Users className="h-8 w-8 text-blue-400/50 mx-auto mb-3" />
            <p className="text-blue-200 mb-4">No workspaces yet</p>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              <Plus className="h-3 w-3 mr-1" />
              Create Workspace
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {workspaces.map((workspace) => (
              <div
                key={workspace.id}
                className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-medium truncate flex-1">
                    {workspace.name}
                  </h3>
                  {workspace.is_public ? (
                    <Globe className="h-4 w-4 text-green-400" />
                  ) : (
                    <Lock className="h-4 w-4 text-blue-400" />
                  )}
                </div>
                
                {workspace.description && (
                  <p className="text-blue-200 text-sm mb-2 line-clamp-2">
                    {workspace.description}
                  </p>
                )}
                
                <div className="text-xs text-blue-300">
                  Updated {new Date(workspace.updated_at).toLocaleDateString()}
                </div>
              </div>
            ))}
            
            <Button 
              size="sm" 
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              <Plus className="h-3 w-3 mr-1" />
              New Workspace
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
