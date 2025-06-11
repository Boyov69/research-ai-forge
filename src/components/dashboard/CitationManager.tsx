
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Copy, Upload, Download } from 'lucide-react';

const sampleCitations = [
  {
    id: 1,
    authors: 'Smith, J. et al.',
    year: '2024',
    style: 'APA',
    title: 'Deep Learning Applications in Quantum Drug Discovery: A Comprehensive Review.',
    journal: 'Journal of Quantum Medicine',
    volume: '15',
    issue: '3',
    pages: '234-267',
    doi: 'https://doi.org/10.1000/jqm.2024.15.3.234',
    cited: 127,
    impactFactor: 8.2
  },
  {
    id: 2,
    authors: 'Chen, L. & Wang, M.',
    year: '2024',
    style: 'IEEE',
    title: 'Ethical Considerations in AI-Driven Pharmaceutical Research.',
    journal: 'AI Ethics Quarterly',
    volume: '8',
    issue: '2',
    pages: '45-62',
    doi: 'https://doi.org/10.1000/aeq.2024.8.2.45',
    cited: 93,
    impactFactor: 6.7
  }
];

export const CitationManager = () => {
  const [citations] = useState(sampleCitations);
  const { toast } = useToast();

  const handleCopy = async (citation: typeof sampleCitations[0]) => {
    const citationText = `${citation.authors} (${citation.year}). "${citation.title}" ${citation.journal}, ${citation.volume}(${citation.issue}), ${citation.pages}. ${citation.doi}`;
    
    try {
      await navigator.clipboard.writeText(citationText);
      toast({
        title: "Citation Copied",
        description: "Citation has been copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy citation to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.bib,.ris,.xml';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        toast({
          title: "File Upload",
          description: `Uploading ${file.name}...`,
        });
        // Handle file upload logic here
      }
    };
    input.click();
  };

  const handleExport = (format: 'bibtex' | 'word' | 'latex') => {
    let content = '';
    let filename = '';
    let mimeType = '';

    switch (format) {
      case 'bibtex':
        content = citations.map(citation => 
          `@article{${citation.authors.split(',')[0].toLowerCase()}${citation.year},
  title={${citation.title}},
  author={${citation.authors}},
  journal={${citation.journal}},
  volume={${citation.volume}},
  number={${citation.issue}},
  pages={${citation.pages}},
  year={${citation.year}},
  doi={${citation.doi.replace('https://doi.org/', '')}}
}`
        ).join('\n\n');
        filename = 'citations.bib';
        mimeType = 'text/plain';
        break;
      
      case 'word':
        content = citations.map(citation => 
          `${citation.authors} (${citation.year}). "${citation.title}" ${citation.journal}, ${citation.volume}(${citation.issue}), ${citation.pages}. ${citation.doi}`
        ).join('\n\n');
        filename = 'citations.txt';
        mimeType = 'text/plain';
        break;
      
      case 'latex':
        content = citations.map(citation => 
          `\\bibitem{${citation.authors.split(',')[0].toLowerCase()}${citation.year}}
${citation.authors} (${citation.year}).
\\textit{${citation.title}}
\\textit{${citation.journal}}, ${citation.volume}(${citation.issue}), ${citation.pages}.
\\url{${citation.doi}}`
        ).join('\n\n');
        filename = 'citations.tex';
        mimeType = 'text/plain';
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `Citations exported as ${format.toUpperCase()}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button
          onClick={handleUpload}
          variant="outline"
          className="border-blue-400/50 text-blue-300 hover:bg-blue-500/20"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Citations
        </Button>
        <Button
          onClick={() => handleExport('bibtex')}
          variant="outline"
          className="border-green-400/50 text-green-300 hover:bg-green-500/20"
        >
          <Download className="h-4 w-4 mr-2" />
          Export BibTeX
        </Button>
        <Button
          onClick={() => handleExport('word')}
          variant="outline"
          className="border-yellow-400/50 text-yellow-300 hover:bg-yellow-500/20"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Word
        </Button>
        <Button
          onClick={() => handleExport('latex')}
          variant="outline"
          className="border-purple-400/50 text-purple-300 hover:bg-purple-500/20"
        >
          <Download className="h-4 w-4 mr-2" />
          Export LaTeX
        </Button>
      </div>

      {/* Citations List */}
      <div className="space-y-4">
        {citations.map((citation) => (
          <div
            key={citation.id}
            className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white font-medium">{citation.authors}</span>
                  <span className="text-blue-200">({citation.year})</span>
                  <Badge variant="outline" className="border-blue-400/50 text-blue-300">
                    {citation.style}
                  </Badge>
                </div>
                <h3 className="text-green-300 font-medium mb-2">
                  "{citation.title}"
                </h3>
                <p className="text-blue-200 text-sm mb-2">
                  {citation.journal}, {citation.volume}({citation.issue}), {citation.pages}. {citation.doi}
                </p>
                <div className="flex items-center gap-4 text-xs text-blue-300">
                  <span>Cited {citation.cited} times</span>
                  <span>Impact Factor: {citation.impactFactor}</span>
                </div>
              </div>
              <Button
                onClick={() => handleCopy(citation)}
                size="sm"
                variant="ghost"
                className="text-blue-400 hover:text-white hover:bg-blue-500/20"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-blue-300 text-sm">
        {citations.length} citations managed
      </div>
    </div>
  );
};
