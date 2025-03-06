"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Pause, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

interface Artist {
  id: string
  name: string
}

interface Album {
  id: string
  name: string
  images: { url: string; height: number; width: number }[]
}

export interface Track {
  id: string
  name: string
  artists: Artist[]
  album: Album
  duration_ms: number
  preview_url: string | null
  track_number?: number
}

interface TrackListProps {
  tracks: Track[]
  title?: string
  showAlbum?: boolean
}

export function TrackList({ tracks, title, showAlbum = true }: TrackListProps) {
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null)
  const [volume, setVolume] = useState(0.5)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handlePlay = (track: Track) => {
    if (!track.preview_url) {
      console.log("No preview available for this track")
      return
    }

    if (playingTrackId === track.id) {
      audioRef.current?.pause()
      setPlayingTrackId(null)
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      audioRef.current = new Audio(track.preview_url)
      audioRef.current.volume = volume
      audioRef.current.play()
      setPlayingTrackId(track.id)
      audioRef.current.onended = () => setPlayingTrackId(null)
    }
  }

  return (
    <div className="space-y-4">
      {title && <h2 className="text-2xl font-bold">{title}</h2>}
      <div className="flex items-center space-x-2">
        <Volume2 className="h-4 w-4" />
        <Slider
          value={[volume * 100]}
          max={100}
          step={1}
          onValueChange={(value) => setVolume(value[0] / 100)}
          className="w-[100px]"
        />
      </div>
      <div className="grid gap-4">
        {tracks.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No tracks found</p>
        ) : (
          tracks.map((track) => (
            <Card key={track.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 p-4">
                  {showAlbum && (
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={track.album.images[0]?.url || "/placeholder.svg?height=64&width=64"}
                        alt={track.album.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {!showAlbum && track.track_number && (
                    <div className="w-8 text-center text-muted-foreground">{track.track_number}</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{track.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {track.artists.map((artist, index) => (
                        <span key={artist.id}>
                          {index > 0 && ", "}
                          <Link href={`/artist/${artist.id}`} className="hover:underline">
                            {artist.name}
                          </Link>
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">{formatDuration(track.duration_ms)}</div>
                  <div className="flex-shrink-0">
                    <Button
                      variant={playingTrackId === track.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePlay(track)}
                      disabled={!track.preview_url}
                    >
                      {playingTrackId === track.id ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" /> Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" /> Preview
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

