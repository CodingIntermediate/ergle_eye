import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import { EnvironmentGenerator } from '@/components/environment-generator';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-background/50 backdrop-blur-sm">
      <h1 className="text-2xl font-headline font-bold text-primary tracking-wider">
        Immersio<span className="text-accent">Verse</span>
      </h1>
      <EnvironmentGenerator>
        <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-background transition-all duration-300 group">
          <Wand2 className="mr-2 h-4 w-4 transition-transform group-hover:rotate-45" />
          Generate Environment
        </Button>
      </EnvironmentGenerator>
    </header>
  );
}
