
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

export const useWorkspaces = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: workspaces = [], isLoading } = useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('workspaces')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data as Tables<'workspaces'>[];
    },
  });

  const createWorkspace = useMutation({
    mutationFn: async (workspace: Omit<TablesInsert<'workspaces'>, 'owner_id'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('workspaces')
        .insert({
          ...workspace,
          owner_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      toast({
        title: "Workspace created",
        description: "Your workspace has been created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error creating workspace",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateWorkspace = useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<Tables<'workspaces'>>) => {
      const { data, error } = await supabase
        .from('workspaces')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      toast({
        title: "Workspace updated",
        description: "Your workspace has been updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating workspace",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteWorkspace = useMutation({
    mutationFn: async (workspaceId: string) => {
      const { error } = await supabase
        .from('workspaces')
        .delete()
        .eq('id', workspaceId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      toast({
        title: "Workspace deleted",
        description: "Your workspace has been deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error deleting workspace",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    workspaces,
    isLoading,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
  };
};
