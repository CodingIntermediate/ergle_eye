import Image from 'next/image';
import { profile, projects } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProjectCard from './project-card';
import TechStackVisualizer from './tech-stack-visualizer';
import SocialLinks from './social-links';

export default function DeveloperSection() {
  return (
    <section className="space-y-12 py-12">
      <Card className="bg-card/50 backdrop-blur-sm p-6 border-primary/20">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Avatar className="h-24 w-24 border-2 border-accent">
            <AvatarImage src={profile.imageUrl} alt={profile.name} />
            <AvatarFallback>{profile.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-headline font-bold text-primary">{profile.name}</h1>
            <p className="text-muted-foreground mt-1 max-w-md">{profile.bio}</p>
            <SocialLinks links={profile.socials} />
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-headline font-bold text-center text-primary">My Tech Arsenal</h2>
        <TechStackVisualizer />
      </div>

      <div className="space-y-8">
         <h2 className="text-2xl font-headline font-bold text-center text-primary">Featured Projects</h2>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
