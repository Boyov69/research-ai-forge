
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

export const useResearchQueries = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: queries = [], isLoading } = useQuery({
    queryKey: ['research-queries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('research_queries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Tables<'research_queries'>[];
    },
  });

  const createQuery = useMutation({
    mutationFn: async (query: Omit<TablesInsert<'research_queries'>, 'user_id'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('research_queries')
        .insert({
          ...query,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['research-queries'] });
      toast({
        title: "Research query submitted",
        description: "Your query is being processed",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error submitting query",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateQuery = useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<Tables<'research_queries'>>) => {
      const { data, error } = await supabase
        .from('research_queries')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['research-queries'] });
    },
  });

  return {
    queries,
    isLoading,
    createQuery,
    updateQuery,
  };
};
