
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

export const AccountSettings = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Current Plan */}
      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-lg">Current Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-blue-400 font-medium">Research Plan</h3>
              <p className="text-blue-200 text-sm">€99/month</p>
            </div>
            <Badge className="bg-green-500 text-white border-0">
              Active
            </Badge>
          </div>
          <p className="text-blue-300 text-sm">Next billing: January 15, 2024</p>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Manage Subscription
          </Button>
        </CardContent>
      </Card>

      {/* PaperQA2 Settings */}
      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-lg">PaperQA2 Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-blue-200 text-sm">Default LLM</label>
            <select className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white text-sm">
              <option>GPT-4o-2024-11-20</option>
              <option>GPT-4-turbo</option>
              <option>Claude-3-opus</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-blue-200 text-sm">Citation Style</label>
            <select className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white text-sm">
              <option>APA</option>
              <option>MLA</option>
              <option>Chicago</option>
              <option>IEEE</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-blue-200 text-sm">Auto-save Research</span>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
