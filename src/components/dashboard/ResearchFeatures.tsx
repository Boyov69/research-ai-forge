
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Quote, Users, Download, BarChart3, Shield } from 'lucide-react';

export const ResearchFeatures = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI Research Agents',
      description: 'Multiple specialized AI agents work together using PaperQA2 to analyze literature and generate insights.',
      color: 'text-blue-400'
    },
    {
      icon: Quote,
      title: 'Smart Citations',
      description: 'Automatically format citations in APA, MLA, Chicago, and IEEE styles with intelligent reference management.',
      color: 'text-green-400'
    },
    {
      icon: Users,
      title: 'Real-time Collaboration',
      description: 'Work together with colleagues in shared workspaces with live editing and comment features.',
      color: 'text-purple-400'
    },
    {
      icon: Download,
      title: 'Multiple Export Formats',
      description: 'Export your research in PDF, Word, LaTeX, and BibTeX formats for seamless integration.',
      color: 'text-yellow-400'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track your research progress with detailed analytics and insights into your academic productivity.',
      color: 'text-cyan-400'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your research data is protected with enterprise-grade security and privacy controls.',
      color: 'text-emerald-400'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Powerful Research Features</h2>
        <p className="text-blue-200">Enhanced with PaperQA2 AI technology</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="bg-white/10 border-white/20 hover:bg-white/15 transition-colors">
              <CardContent className="p-6 text-center space-y-4">
                <Icon className={`h-12 w-12 ${feature.color} mx-auto`} />
                <h3 className="text-white font-semibold text-lg">{feature.title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
