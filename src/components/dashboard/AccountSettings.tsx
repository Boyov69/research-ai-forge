
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { useSubscription } from '@/hooks/useSubscription';

export const AccountSettings = () => {
  const { profile, updateProfile } = useProfile();
  const { subscription } = useSubscription();
  
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [institution, setInstitution] = useState(profile?.institution || '');

  const handleSaveProfile = async () => {
    await updateProfile.mutateAsync({
      full_name: fullName,
      institution: institution,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Profile Information */}
      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-lg">Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-blue-200">Full Name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-white/10 border-white/20 text-white"
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-200">Email</Label>
            <Input
              id="email"
              value={profile?.email || ''}
              className="bg-white/10 border-white/20 text-gray-400"
              disabled
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="institution" className="text-blue-200">Institution</Label>
            <Input
              id="institution"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="bg-white/10 border-white/20 text-white"
              placeholder="Enter your institution"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-blue-200">Role</Label>
            <div className="p-2 bg-white/5 rounded-md">
              <Badge variant="outline" className="border-blue-400 text-blue-300 capitalize">
                {profile?.role || 'student'}
              </Badge>
            </div>
          </div>
          
          <Button 
            onClick={handleSaveProfile}
            disabled={updateProfile.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {updateProfile.isPending ? 'Saving...' : 'Save Profile'}
          </Button>
        </CardContent>
      </Card>

      {/* Current Plan */}
      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-lg">Current Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {subscription ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-blue-400 font-medium capitalize">{subscription.tier} Plan</h3>
                  <p className="text-blue-200 text-sm">
                    {subscription.tier === 'student' && '€29/month'}
                    {subscription.tier === 'research' && '€99/month'}
                    {subscription.tier === 'institution' && '€299/month'}
                  </p>
                </div>
                <Badge className={`border-0 ${
                  subscription.status === 'active' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'
                }`}>
                  {subscription.status}
                </Badge>
              </div>
              
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-blue-200">Queries used this month</span>
                  <span className="text-white">
                    {subscription.monthly_queries_used || 0} / {subscription.monthly_query_limit}
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ 
                      width: `${((subscription.monthly_queries_used || 0) / subscription.monthly_query_limit) * 100}%` 
                    }}
                  />
                </div>
              </div>
              
              {subscription.current_period_end && (
                <p className="text-blue-300 text-sm">
                  Next billing: {new Date(subscription.current_period_end).toLocaleDateString()}
                </p>
              )}
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-blue-200 mb-4">No active subscription</p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Choose Plan
              </Button>
            </div>
          )}
          
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Manage Subscription
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
