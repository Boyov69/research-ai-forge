
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

export const PricingSection = () => {
  const plans = [
    {
      name: 'Student',
      price: '€29',
      period: '/month',
      description: 'Perfect for individual students',
      features: ['50 AI research queries/month', 'Basic citation formats', 'Export to PDF & Word', 'Email support'],
      popular: false
    },
    {
      name: 'Research',
      price: '€99',
      period: '/month',
      description: 'For serious researchers',
      features: ['500 AI research queries/month', 'All citation formats', 'Advanced analytics', 'Collaboration tools', 'Priority support'],
      popular: true
    },
    {
      name: 'Institution',
      price: '€299',
      period: '/month',
      description: 'For universities & research teams',
      features: ['Unlimited AI research queries', 'Team management', 'Custom integrations', 'Dedicated support', 'Enterprise security'],
      popular: false
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Choose Your Research Plan
        </h2>
        <p className="text-xl text-blue-200">
          Select the perfect plan for your academic research needs
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={`relative backdrop-blur-lg border-white/20 ${
              plan.popular 
                ? 'bg-white/15 border-blue-400 shadow-xl' 
                : 'bg-white/10'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white border-0">
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl font-bold">
                {plan.name}
              </CardTitle>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-blue-200">{plan.period}</span>
              </div>
              <p className="text-blue-200 text-sm">{plan.description}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-blue-100">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
