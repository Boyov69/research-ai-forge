
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Users, Plus, Lock, Globe, MoreVertical, Edit, Trash2, Share, Eye, UserPlus, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Workspace = Tables<'workspaces'>;

export const WorkspaceList = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  const [newWorkspace, setNewWorkspace] = useState({
    name: '',
    description: '',
    is_public: false
  });

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

  const createWorkspace = async () => {
    try {
      const { data, error } = await supabase
        .from('workspaces')
        .insert([{
          name: newWorkspace.name,
          description: newWorkspace.description,
          is_public: newWorkspace.is_public,
          owner_id: 'temp-user-id' // This would be the actual user ID from auth
        }])
        .select()
        .single();

      if (error) throw error;

      setWorkspaces(prev => [data, ...prev]);
      setCreateDialogOpen(false);
      setNewWorkspace({ name: '', description: '', is_public: false });
    } catch (error) {
      console.error('Error creating workspace:', error);
    }
  };

  const updateWorkspace = async () => {
    if (!selectedWorkspace) return;

    try {
      const { data, error } = await supabase
        .from('workspaces')
        .update({
          name: selectedWorkspace.name,
          description: selectedWorkspace.description,
          is_public: selectedWorkspace.is_public
        })
        .eq('id', selectedWorkspace.id)
        .select()
        .single();

      if (error) throw error;

      setWorkspaces(prev => 
        prev.map(w => w.id === selectedWorkspace.id ? data : w)
      );
      setEditDialogOpen(false);
      setSelectedWorkspace(null);
    } catch (error) {
      console.error('Error updating workspace:', error);
    }
  };

  const deleteWorkspace = async (workspaceId: string) => {
    try {
      const { error } = await supabase
        .from('workspaces')
        .delete()
        .eq('id', workspaceId);

      if (error) throw error;

      setWorkspaces(prev => prev.filter(w => w.id !== workspaceId));
    } catch (error) {
      console.error('Error deleting workspace:', error);
    }
  };

  const WorkspaceCard = ({ workspace }: { workspace: Workspace }) => (
    <div className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-1">
          <h3 className="text-white font-medium truncate">
            {workspace.name}
          </h3>
          <Badge variant="outline" className="text-xs">
            {workspace.is_public ? (
              <>
                <Globe className="h-3 w-3 mr-1 text-green-400" />
                Public
              </>
            ) : (
              <>
                <Lock className="h-3 w-3 mr-1 text-blue-400" />
                Private
              </>
            )}
          </Badge>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4 text-blue-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-slate-800 border-white/20">
            <DropdownMenuItem 
              onClick={() => {
                setSelectedWorkspace(workspace);
                setEditDialogOpen(true);
              }}
              className="text-white hover:bg-white/10"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Workspace
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => {
                setSelectedWorkspace(workspace);
                setShareDialogOpen(true);
              }}
              className="text-white hover:bg-white/10"
            >
              <Share className="h-4 w-4 mr-2" />
              Share & Collaborate
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-white/10">
              <Eye className="h-4 w-4 mr-2" />
              Monitor Activity
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-white/10">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => deleteWorkspace(workspace.id)}
              className="text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {workspace.description && (
        <p className="text-blue-200 text-sm mb-2 line-clamp-2">
          {workspace.description}
        </p>
      )}
      
      <div className="flex items-center justify-between text-xs text-blue-300">
        <span>Updated {new Date(workspace.updated_at).toLocaleDateString()}</span>
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>3 members</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-400" />
            Collaborative Workspaces
          </CardTitle>
          <CardDescription className="text-blue-200">
            Create, manage, and collaborate on research projects
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
                onClick={() => setCreateDialogOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                <Plus className="h-3 w-3 mr-1" />
                Create Workspace
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {workspaces.map((workspace) => (
                <WorkspaceCard key={workspace.id} workspace={workspace} />
              ))}
              
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setCreateDialogOpen(true)}
                className="w-full border-white/20 text-white hover:bg-white/10"
              >
                <Plus className="h-3 w-3 mr-1" />
                New Workspace
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Workspace Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="bg-slate-800 border-white/20 text-white">
          <DialogHeader>
            <DialogTitle>Create New Workspace</DialogTitle>
            <DialogDescription className="text-blue-200">
              Set up a new collaborative research workspace
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-white">Workspace Name</Label>
              <Input
                id="name"
                value={newWorkspace.name}
                onChange={(e) => setNewWorkspace(prev => ({ ...prev, name: e.target.value }))}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Enter workspace name"
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-white">Description</Label>
              <Input
                id="description"
                value={newWorkspace.description}
                onChange={(e) => setNewWorkspace(prev => ({ ...prev, description: e.target.value }))}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Brief description of the workspace"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="public"
                checked={newWorkspace.is_public}
                onChange={(e) => setNewWorkspace(prev => ({ ...prev, is_public: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="public" className="text-white">Make workspace public</Label>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createWorkspace} disabled={!newWorkspace.name}>
                Create Workspace
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Workspace Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-slate-800 border-white/20 text-white">
          <DialogHeader>
            <DialogTitle>Edit Workspace</DialogTitle>
            <DialogDescription className="text-blue-200">
              Update workspace information and settings
            </DialogDescription>
          </DialogHeader>
          {selectedWorkspace && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name" className="text-white">Workspace Name</Label>
                <Input
                  id="edit-name"
                  value={selectedWorkspace.name}
                  onChange={(e) => setSelectedWorkspace(prev => 
                    prev ? { ...prev, name: e.target.value } : null
                  )}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="edit-description" className="text-white">Description</Label>
                <Input
                  id="edit-description"
                  value={selectedWorkspace.description || ''}
                  onChange={(e) => setSelectedWorkspace(prev => 
                    prev ? { ...prev, description: e.target.value } : null
                  )}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-public"
                  checked={selectedWorkspace.is_public}
                  onChange={(e) => setSelectedWorkspace(prev => 
                    prev ? { ...prev, is_public: e.target.checked } : null
                  )}
                  className="rounded"
                />
                <Label htmlFor="edit-public" className="text-white">Make workspace public</Label>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={updateWorkspace}>
                  Update Workspace
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Share & Collaborate Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="bg-slate-800 border-white/20 text-white">
          <DialogHeader>
            <DialogTitle>Share & Collaborate</DialogTitle>
            <DialogDescription className="text-blue-200">
              Invite collaborators and manage workspace access
            </DialogDescription>
          </DialogHeader>
          {selectedWorkspace && (
            <div className="space-y-4">
              <div>
                <Label className="text-white">Invite by Email</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="colleague@university.edu"
                    className="bg-white/10 border-white/20 text-white"
                  />
                  <Button size="sm">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <Label className="text-white">Share Link</Label>
                <div className="flex gap-2">
                  <Input
                    value={`https://scholar-ai.com/workspace/${selectedWorkspace.id}`}
                    readOnly
                    className="bg-white/10 border-white/20 text-white"
                  />
                  <Button size="sm" variant="outline">
                    Copy
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-white">Current Members</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs">
                        JD
                      </div>
                      <span className="text-sm">john.doe@university.edu</span>
                      <Badge variant="outline" className="text-xs">Owner</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs">
                        AS
                      </div>
                      <span className="text-sm">alice.smith@research.org</span>
                      <Badge variant="outline" className="text-xs">Editor</Badge>
                    </div>
                    <Button size="sm" variant="ghost">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
