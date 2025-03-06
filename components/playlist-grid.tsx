import { PlaylistCard } from "@/components/playlist-card"

interface Album {
  id: string
  name: string
  images: { url: string; height: number; width: number }[]
  artists: { name: string }[]
}

interface Playlist {
  id: string
  name: string
  description: string
  images: { url: string; height: number; width: number }[]
}

interface PlaylistGridProps {
  playlists: (Album | Playlist)[]
  title?: string
}

export function PlaylistGrid({ playlists, title }: PlaylistGridProps) {
  return (
    <div className="space-y-4">
      {title && <h2 className="text-2xl font-bold">{title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {playlists.map((item) => (
          <PlaylistCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

