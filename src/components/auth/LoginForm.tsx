
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Brain, GraduationCap, Microscope } from 'lucide-react';

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (email: string, password: string, isSignUp: boolean) => {
    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
          }
        });
        if (error) throw error;
        toast({
          title: "Check your email",
          description: "We've sent you a confirmation link.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">Scholar-AI</h1>
          </div>
          <p className="text-blue-200">Superhuman Research Platform</p>
        </div>

        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Welcome to Scholar-AI</CardTitle>
            <CardDescription className="text-blue-200">
              Sign in or create an account to access advanced AI research tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger value="signin" className="text-white data-[state=active]:bg-blue-500">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="text-white data-[state=active]:bg-blue-500">
                  Sign Up
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <AuthForm onSubmit={(email, password) => handleAuth(email, password, false)} loading={loading} />
              </TabsContent>
              
              <TabsContent value="signup">
                <AuthForm onSubmit={(email, password) => handleAuth(email, password, true)} loading={loading} isSignUp />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="text-blue-200">
            <GraduationCap className="h-6 w-6 mx-auto mb-2" />
            <p className="text-xs">Students</p>
            <p className="text-xs font-semibold">€29/month</p>
          </div>
          <div className="text-blue-200">
            <Microscope className="h-6 w-6 mx-auto mb-2" />
            <p className="text-xs">Researchers</p>
            <p className="text-xs font-semibold">€99/month</p>
          </div>
          <div className="text-blue-200">
            <Brain className="h-6 w-6 mx-auto mb-2" />
            <p className="text-xs">Institutions</p>
            <p className="text-xs font-semibold">€299/month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AuthFormProps {
  onSubmit: (email: string, password: string) => void;
  loading: boolean;
  isSignUp?: boolean;
}

const AuthForm = ({ onSubmit, loading, isSignUp = false }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-white">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            {isSignUp ? 'Creating Account...' : 'Signing In...'}
          </div>
        ) : (
          isSignUp ? 'Create Account' : 'Sign In'
        )}
      </Button>
    </form>
  );
};
