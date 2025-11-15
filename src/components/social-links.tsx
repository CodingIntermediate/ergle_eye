'use client';

import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

const iconComponents: { [key: string]: React.ElementType } = {
  Github,
  Linkedin,
  Twitter,
};

type SocialLink = {
  name: string;
  url: string;
  icon: string;
};

export default function SocialLinks({ links }: { links: SocialLink[] }) {
  return (
    <div className="flex items-center gap-2 mt-4">
      {links.map(social => {
        const IconComponent = iconComponents[social.icon];
        return (
          <Button
            key={social.name}
            variant="outline"
            size="icon"
            asChild
            className="text-muted-foreground hover:text-accent-foreground hover:bg-accent/20 border-border hover:border-accent transition-colors duration-300"
          >
            <Link href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
              <IconComponent className="h-5 w-5" />
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
