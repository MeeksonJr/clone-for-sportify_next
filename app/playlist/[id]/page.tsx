import { getPlaylistTracks } from "@/lib/spotify"
import { TrackList } from "@/components/track-list"
import { fetchSpotifyApi } from "@/lib/spotify"
import Image from "next/image"

interface PlaylistPageProps {
  params: { id: string }
}

export default async function PlaylistPage({ params }: PlaylistPageProps) {
  const playlistId = params.id

  // Fetch playlist details
  const playlist = await fetchSpotifyApi(`v1/playlists/${playlistId}`)

  // Fetch playlist tracks
  const tracksResponse = await getPlaylistTracks(playlistId, 20)
  const tracks = tracksResponse.items.map((item: any) => item.track)

  return (
    <main className="container py-6 space-y-8">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="relative h-64 w-64 flex-shrink-0">
          <Image
            src={playlist.images[0]?.url || "/placeholder.svg?height=256&width=256"}
            alt={playlist.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col space-y-2 text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tighter">{playlist.name}</h1>
          <p className="text-muted-foreground">{playlist.description}</p>
          <p className="text-sm">
            {playlist.tracks.total} tracks • By {playlist.owner.display_name}
          </p>
        </div>
      </div>

      <TrackList tracks={tracks} title="Tracks" />
    </main>
  )
}

