import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Github } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight">AuraCV</span>
          </Link>
          <span className="px-3 py-1.5 text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 text-white rounded-lg shadow-md border border-orange-400/50">
            Beta
          </span>
        </div>

        <nav className="flex items-center space-x-4">
          <Link href="https://github.com" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Button>Get Started</Button>
        </nav>
      </div>
    </header>
  );
}
