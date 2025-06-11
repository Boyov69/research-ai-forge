
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, FileText, Eye, RotateCcw } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

interface RecentQueriesProps {
  queries: Tables<'research_queries'>[];
  onRecall?: (query: Tables<'research_queries'>) => void;
}

export const RecentQueries = ({ queries, onRecall }: RecentQueriesProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-400';
      case 'processing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-400';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-400';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!onRecall) {
    // Original card layout for when used outside history tab
    return (
      <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-400" />
            Recent Research Queries
          </CardTitle>
          <CardDescription className="text-blue-200">
            Track your latest research submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {queries.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-blue-400/50 mx-auto mb-4" />
              <p className="text-blue-200">No research queries yet</p>
              <p className="text-sm text-blue-300">Submit your first query above to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {queries.map((query) => (
                <div
                  key={query.id}
                  className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-medium truncate flex-1 mr-4">
                      {query.title}
                    </h3>
                    <Badge className={getStatusColor(query.status || 'pending')}>
                      {query.status}
                    </Badge>
                  </div>
                  
                  <p className="text-blue-200 text-sm mb-3 line-clamp-2">
                    {query.query_text}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-blue-300">
                        {formatDate(query.created_at)}
                      </span>
                      {query.ai_agents_used && query.ai_agents_used.length > 0 && (
                        <div className="flex gap-1">
                          {query.ai_agents_used.map((agent) => (
                            <Badge key={agent} variant="outline" className="text-xs border-blue-400/50 text-blue-300">
                              {agent}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {query.status === 'completed' && (
                      <Button size="sm" variant="ghost" className="text-blue-400 hover:text-white hover:bg-blue-500/20">
                        <Eye className="h-3 w-3 mr-1" />
                        View Results
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // History tab layout with recall functionality
  return (
    <div>
      {queries.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="h-12 w-12 text-blue-400/50 mx-auto mb-4" />
          <p className="text-blue-200">No research history yet</p>
          <p className="text-sm text-blue-300">Your previous queries will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Research History</h3>
            <span className="text-sm text-blue-300">{queries.length} queries found</span>
          </div>
          
          {queries.map((query) => (
            <div
              key={query.id}
              className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-white font-medium truncate flex-1 mr-4">
                  {query.title}
                </h4>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(query.status || 'pending')}>
                    {query.status}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onRecall(query)}
                    className="text-blue-400 hover:text-white hover:bg-blue-500/20 ml-2"
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Recall
                  </Button>
                </div>
              </div>
              
              <p className="text-blue-200 text-sm mb-3 line-clamp-2">
                {query.query_text}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-blue-300">
                    {formatDate(query.created_at)}
                  </span>
                  {query.ai_agents_used && query.ai_agents_used.length > 0 && (
                    <div className="flex gap-1">
                      {query.ai_agents_used.map((agent) => (
                        <Badge key={agent} variant="outline" className="text-xs border-blue-400/50 text-blue-300">
                          {agent}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                {query.status === 'completed' && (
                  <Button size="sm" variant="ghost" className="text-green-400 hover:text-white hover:bg-green-500/20">
                    <Eye className="h-3 w-3 mr-1" />
                    View Results
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
