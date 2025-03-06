"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import type { Player as SpotifyPlayer, Track } from "spotify-web-playback-sdk"

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: typeof Spotify;  // Use typeof here
  }
}

interface SpotifyPlayerProps {
  accessToken: string
}

export function SpotifyPlayerComponent({ accessToken }: SpotifyPlayerProps) {
  const [player, setPlayer] = useState<SpotifyPlayer | null>(null)
  const [is_paused, setPaused] = useState(false)
  const [is_active, setActive] = useState(false)
  const [current_track, setTrack] = useState<Track | null>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://sdk.scdn.co/spotify-player.js"
    script.async = true

    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(accessToken)
        },
        volume: 0.5,
      })

      setPlayer(player)

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id)
        // Set this device as the active playback device
        fetch("https://api.spotify.com/v1/me/player", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            device_ids: [device_id],
            play: false,
          }),
        })
      })

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id)
      })

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return
        }

        setTrack(state.track_window.current_track)
        setPaused(state.paused)

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true)
        })
      })

      player.connect()
    }

    return () => {
      if (player) {
        player.disconnect()
      }
    }
  }, [accessToken, player])

  if (!is_active) {
    return (
      <div className="container">
        
          <b> Instance not active. Transfer your playback using your Spotify app </b>
        </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {current_track?.album.images[0]?.url && (
            <img
              src={current_track.album.images[0].url || "/placeholder.svg"}
              className="h-14 w-14"
              alt="Now playing"
            />
          )}
          <div>
            <div className="font-semibold">{current_track?.name}</div>
            <div className="text-sm text-muted-foreground">{current_track?.artists[0].name}</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              player?.previousTrack()
            }}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            onClick={() => {
              player?.togglePlay()
            }}
          >
            {is_paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              player?.nextTrack()
            }}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
