
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { ResearchInterface } from './dashboard/ResearchInterface';
import { RecentQueries } from './dashboard/RecentQueries';
import { SubscriptionCard } from './dashboard/SubscriptionCard';
import { WorkspaceList } from './dashboard/WorkspaceList';
import type { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;
type Subscription = Tables<'subscriptions'>;
type ResearchQuery = Tables<'research_queries'>;

export const Dashboard = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [recentQueries, setRecentQueries] = useState<ResearchQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      // Fetch subscription
      const { data: subscriptionData } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Fetch recent queries
      const { data: queriesData } = await supabase
        .from('research_queries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setProfile(profileData);
      setSubscription(subscriptionData);
      setRecentQueries(queriesData || []);
    } catch (error: any) {
      toast({
        title: "Error loading data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <DashboardHeader profile={profile} />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ResearchInterface subscription={subscription} onQuerySubmit={fetchUserData} />
            <RecentQueries queries={recentQueries} />
          </div>
          
          <div className="space-y-8">
            <SubscriptionCard subscription={subscription} />
            <WorkspaceList />
          </div>
        </div>
      </main>
    </div>
  );
};
