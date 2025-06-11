
import { Button } from '@/components/ui/button';
import { Brain, Quote, Users } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 p-8 md:p-12">
      <div className="relative z-10 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          The Future of <span className="text-yellow-300">Academic Research</span>
        </h1>
        
        <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
          Powered by PaperQA2 AI agents, Scholar-AI revolutionizes how researchers discover, analyze, 
          and cite academic literature with superhuman accuracy.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 py-4">
          <div className="flex items-center gap-2 text-white">
            <Brain className="h-5 w-5 text-blue-200" />
            <span>AI Research Agents</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Quote className="h-5 w-5 text-green-300" />
            <span>Smart Citations</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Users className="h-5 w-5 text-purple-300" />
            <span>Real-time Collaboration</span>
          </div>
        </div>
        
        <Button 
          size="lg" 
          className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 text-lg"
        >
          Start Research Now
        </Button>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
    </div>
  );
};
