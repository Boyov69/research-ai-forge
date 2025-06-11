
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export const useSubscription = () => {
  const { data: subscription, isLoading } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      return data as Tables<'subscriptions'> | null;
    },
  });

  return {
    subscription,
    isLoading,
  };
};
