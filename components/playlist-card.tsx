import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

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

interface PlaylistCardProps {
  item: Album | Playlist
}

export function PlaylistCard({ item }: PlaylistCardProps) {
  const isAlbum = "artists" in item

  return (
    <Link href={isAlbum ? `/album/${item.id}` : `/playlist/${item.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardContent className="p-0">
          <div className="aspect-square relative">
            <Image
              src={item.images[0]?.url || "/placeholder.svg?height=200&width=200"}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium line-clamp-1">{item.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {isAlbum ? item.artists.map((artist) => artist.name).join(", ") : item.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

