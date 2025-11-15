import ArtCard from './art-card';
import { artworks } from '@/lib/data';

export default function ArtistSection() {
  return (
    <section className="space-y-12 py-12">
      <div className="text-center">
        <h2 className="text-3xl font-headline font-bold text-primary">Digital Canvas</h2>
        <p className="text-muted-foreground mt-2">A gallery of drawings, edits, and creative explorations.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {artworks.map((art, index) => (
          <ArtCard key={art.id} artwork={art} index={index} />
        ))}
      </div>
    </section>
  );
}
