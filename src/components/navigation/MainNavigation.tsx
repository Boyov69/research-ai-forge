
import { useState } from 'react';
import { Brain, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const navigationItems = [
  {
    title: 'Dashboard',
    href: '#dashboard',
    description: 'Overview of your research activities, statistics, and recent queries'
  },
  {
    title: 'Research',
    href: '#research',
    description: 'AI-powered research interface for academic queries and analysis',
    subItems: [
      { title: 'Query Interface', description: 'Submit research questions and get AI-powered answers' },
      { title: 'Analytics', description: 'Track and analyze your research patterns and productivity' },
      { title: 'History', description: 'Access previous research queries and results' }
    ]
  },
  {
    title: 'Citations',
    href: '#citations',
    description: 'Manage, organize, and export your research citations',
    subItems: [
      { title: 'Citation Manager', description: 'Organize and format your citations' },
      { title: 'Export Tools', description: 'Export citations in various formats (APA, MLA, Chicago)' },
      { title: 'Bibliography', description: 'Generate complete bibliographies for your research' }
    ]
  },
  {
    title: 'Workspaces',
    href: '#workspaces',
    description: 'Collaborative research environments for team projects',
    subItems: [
      { title: 'My Workspaces', description: 'Access your personal and shared workspaces' },
      { title: 'Collaboration', description: 'Invite team members and manage permissions' },
      { title: 'Sharing', description: 'Share research findings and collaborate in real-time' }
    ]
  },
  {
    title: 'Pricing',
    href: '#pricing',
    description: 'Explore subscription plans and upgrade options for enhanced features'
  },
  {
    title: 'Features',
    href: '#features',
    description: 'Discover all the powerful AI research tools and capabilities available'
  }
];

export const MainNavigation = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Glassmorphic Navigation Bar */}
      <nav className="backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">Scholar-AI</span>
            </div>

            {/* Navigation Menu */}
            <NavigationMenu className="flex-1 justify-center">
              <NavigationMenuList className="flex gap-1">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.subItems ? (
                      <>
                        <NavigationMenuTrigger 
                          className="bg-transparent text-white hover:bg-white/10 data-[active]:bg-white/10 data-[state=open]:bg-white/10"
                          onMouseEnter={() => setHoveredItem(item.title)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="min-w-[400px] bg-slate-900/95 backdrop-blur-xl border border-white/20">
                          <div className="p-4">
                            <div className="mb-3">
                              <h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4>
                              <p className="text-sm text-blue-200">{item.description}</p>
                            </div>
                            <div className="grid gap-2">
                              {item.subItems.map((subItem) => (
                                <button
                                  key={subItem.title}
                                  onClick={() => scrollToSection(item.href)}
                                  className="text-left p-3 rounded-lg hover:bg-white/10 transition-colors group"
                                >
                                  <div className="font-medium text-white group-hover:text-blue-400 transition-colors">
                                    {subItem.title}
                                  </div>
                                  <div className="text-sm text-blue-200">
                                    {subItem.description}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <button
                        onClick={() => scrollToSection(item.href)}
                        onMouseEnter={() => setHoveredItem(item.title)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className="relative h-10 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-md transition-colors group"
                      >
                        {item.title}
                        
                        {/* Tooltip on hover */}
                        {hoveredItem === item.title && (
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 p-3 bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-xl z-50">
                            <div className="text-sm text-blue-200">
                              {item.description}
                            </div>
                            {/* Arrow pointer */}
                            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 border-l border-t border-white/20 rotate-45"></div>
                          </div>
                        )}
                      </button>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-blue-400 hover:text-white hover:bg-white/10">
                Sign In
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
