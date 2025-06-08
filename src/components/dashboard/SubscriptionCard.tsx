
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap, Building2 } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

interface SubscriptionCardProps {
  subscription: Tables<'subscriptions'> | null;
}

export const SubscriptionCard = ({ subscription }: SubscriptionCardProps) => {
  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'student': return Crown;
      case 'research': return Zap;
      case 'institution': return Building2;
      default: return Crown;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'student': return 'text-yellow-400';
      case 'research': return 'text-blue-400';
      case 'institution': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getTierPrice = (tier: string) => {
    switch (tier) {
      case 'student': return '€29';
      case 'research': return '€99';
      case 'institution': return '€299';
      default: return '€0';
    }
  };

  if (!subscription) {
    return (
      <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white">Choose Your Plan</CardTitle>
          <CardDescription className="text-blue-200">
            Subscribe to unlock research capabilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              { tier: 'student', queries: 100, price: '€29' },
              { tier: 'research', queries: 500, price: '€99' },
              { tier: 'institution', queries: 2000, price: '€299' }
            ].map((plan) => {
              const Icon = getTierIcon(plan.tier);
              return (
                <div key={plan.tier} className="p-3 rounded-lg bg-white/5 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${getTierColor(plan.tier)}`} />
                      <span className="text-white capitalize font-medium">{plan.tier}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{plan.price}/month</p>
                      <p className="text-xs text-blue-200">{plan.queries} queries</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
            Choose Plan
          </Button>
        </CardContent>
      </Card>
    );
  }

  const Icon = getTierIcon(subscription.tier);
  const usagePercentage = ((subscription.monthly_queries_used || 0) / subscription.monthly_query_limit) * 100;

  return (
    <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Icon className={`h-5 w-5 ${getTierColor(subscription.tier)}`} />
          Your Subscription
        </CardTitle>
        <CardDescription className="text-blue-200">
          Plan details and usage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge className={`${getTierColor(subscription.tier)} bg-white/10 border-current`}>
            {subscription.tier.toUpperCase()}
          </Badge>
          <span className="text-white font-semibold">
            {getTierPrice(subscription.tier)}/month
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-blue-200">Queries Used</span>
            <span className="text-white">
              {subscription.monthly_queries_used || 0} / {subscription.monthly_query_limit}
            </span>
          </div>
          <Progress 
            value={usagePercentage} 
            className="h-2 bg-white/20"
          />
        </div>

        <div className="text-xs text-blue-300">
          <p>Status: <span className="capitalize text-white">{subscription.status}</span></p>
          {subscription.current_period_end && (
            <p>Renews: {new Date(subscription.current_period_end).toLocaleDateString()}</p>
          )}
        </div>

        <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
          Manage Subscription
        </Button>
      </CardContent>
    </Card>
  );
};
