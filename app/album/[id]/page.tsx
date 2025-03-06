import Image from "next/image"
import { fetchSpotifyApi } from "@/lib/spotify"
import { TrackList } from "@/components/track-list"

async function getAlbumDetails(id: string) {
  const albumData = await fetchSpotifyApi(`v1/albums/${id}`)
  const tracksData = await fetchSpotifyApi(`v1/albums/${id}/tracks?limit=50`)
  return { ...albumData, tracks: tracksData.items }
}

export default async function AlbumPage({ params }: { params: { id: string } }) {
  const album = await getAlbumDetails(params.id)

  return (
    <main className="container py-6">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-8">
        <div className="relative h-64 w-64 flex-shrink-0">
          <Image
            src={album.images[0]?.url || "/placeholder.svg?height=256&width=256"}
            alt={album.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col space-y-2 text-center md:text-left">
          <h1 className="text-4xl font-bold">{album.name}</h1>
          <p className="text-xl text-muted-foreground">{album.artists.map((artist) => artist.name).join(", ")}</p>
          <p className="text-sm text-muted-foreground">
            {album.release_date} • {album.total_tracks} tracks
          </p>
        </div>
      </div>

      <TrackList
        tracks={album.tracks.map((track: any) => ({
          ...track,
          album: {
            id: album.id,
            name: album.name,
            images: album.images,
          },
        }))}
        title="Tracks"
      />
    </main>
  )
}

