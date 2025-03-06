// @ts-ignore
import Image from 'next/image';
import Link from 'next/link';
import { getArtistDetails } from '@/lib/spotify';
import { TrackList } from '@/components/track-list';
import { formatNumber } from '@/lib/utils';
import { Globe } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function ArtistPage({ params }: { params: { id: string } }) {
  const artist = await getArtistDetails(params.id);

  if (!artist) {
    notFound();
  }

  return (
    <main className="container py-6">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-8">
        <div className="relative h-64 w-64 flex-shrink-0">
          <Image
            src={artist.images[0]?.url || "/placeholder.svg?height=256&width=256"}
            alt={artist.name}
            fill
            className="object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col space-y-4 text-center md:text-left">
          <h1 className="text-4xl font-bold">{artist.name}</h1>
          {artist.genres && artist.genres.length > 0 && (
            <p className="text-xl text-muted-foreground">{artist.genres.join(', ')}</p>
          )}
          <div className="flex flex-col md:flex-row gap-4">
            {artist.followers && (
              <div>
                <p className="text-sm text-muted-foreground">Followers</p>
                <p className="text-xl font-semibold">{formatNumber(artist.followers.total)}</p>
              </div>
            )}
            {artist.monthlyListeners && (
              <div>
                <p className="text-sm text-muted-foreground">Monthly Listeners</p>
                <p className="text-xl font-semibold">{formatNumber(artist.monthlyListeners)}</p>
              </div>
            )}
            {artist.popularity !== undefined && (
              <div>
                <p className="text-sm text-muted-foreground">Popularity</p>
                <p className="text-xl font-semibold">{artist.popularity}/100</p>
              </div>
            )}
          </div>
          <div className="flex gap-4 justify-center md:justify-start">
            {artist.external_urls?.spotify && (
              <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                <Globe className="h-6 w-6" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {artist.topTracks && artist.topTracks.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Top Tracks</h2>
            <TrackList tracks={artist.topTracks.slice(0, 5)} showAlbum={true} />
          </section>
        )}

        {artist.albums && artist.albums.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Albums</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {artist.albums.map((album: any) => (
                <Link href={`/album/${album.id}`} key={album.id} className="group">
                  <div className="relative aspect-square">
                    <Image
                      src={album.images[0]?.url || "/placeholder.svg?height=200&width=200"}
                      alt={album.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <p className="mt-2 font-medium group-hover:underline">{album.name}</p>
                  <p className="text-sm text-muted-foreground">{album.release_date?.split('-')[0]}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {artist.relatedArtists && artist.relatedArtists.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Related Artists</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {artist.relatedArtists.slice(0, 5).map((relatedArtist: any) => (
                <Link href={`/artist/${relatedArtist.id}`} key={relatedArtist.id} className="group">
                  <div className="relative aspect-square">
                    <Image
                      src={relatedArtist.images[0]?.url || "/placeholder.svg?height=200&width=200"}
                      alt={relatedArtist.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <p className="mt-2 font-medium text-center group-hover:underline">{relatedArtist.name}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
