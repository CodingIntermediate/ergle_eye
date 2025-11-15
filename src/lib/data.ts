import { PlaceHolderImages } from './placeholder-images';

export const projects = [
  {
    id: 'proj-1',
    title: 'QuantumLeap CRM',
    description: 'A futuristic CRM platform designed for startups, focusing on AI-driven analytics and a seamless user experience.',
    tech: ['React', 'Firebase', 'MERN'],
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-1')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-1')?.imageHint || '',
  },
  {
    id: 'proj-2',
    title: 'AetherFlow Data Pipeline',
    description: 'High-throughput, real-time data processing engine for IoT applications, built with a microservices architecture.',
    tech: ['JavaScript', 'Firebase'],
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-2')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-2')?.imageHint || '',
  },
  {
    id: 'proj-3',
    title: 'ChronoGuard Security',
    description: 'A blockchain-based security solution for decentralized applications, ensuring data integrity and user privacy.',
    tech: ['React', 'JavaScript'],
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-3')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-3')?.imageHint || '',
  },
];

export const artworks = [
  {
    id: 'art-1',
    title: 'Metropolis Dreams',
    description: 'Digital painting',
    imageUrl: PlaceHolderImages.find(p => p.id === 'art-1')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'art-1')?.imageHint || '',
  },
  {
    id: 'art-2',
    title: 'Neon Noir',
    description: 'Photo edit',
    imageUrl: PlaceHolderImages.find(p => p.id === 'art-2')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'art-2')?.imageHint || '',
  },
  {
    id: 'art-3',
    title: 'Celestial Glitch',
    description: 'Drawing',
    imageUrl: PlaceHolderImages.find(p => p.id === 'art-3')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'art-3')?.imageHint || '',
  },
  {
    id: 'art-4',
    title: 'Synthwave Serenity',
    description: 'Digital art',
    imageUrl: PlaceHolderImages.find(p => p.id === 'art-4')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'art-4')?.imageHint || '',
  },
];

export const profile = {
  name: "Pranav S Prasad",
  bio: "Full-stack developer and digital artist, crafting immersive digital experiences where technology and creativity intersect.",
  imageUrl: PlaceHolderImages.find(p => p.id === 'profile-picture')?.imageUrl || '',
  imageHint: PlaceHolderImages.find(p => p.id === 'profile-picture')?.imageHint || '',
  socials: [
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: 'Github',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: 'Linkedin',
    },
    {
        name: 'Twitter',
        url: 'https://twitter.com',
        icon: 'Twitter',
    }
  ]
}
