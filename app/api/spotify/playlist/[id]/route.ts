import { getPlaylistTracks } from "@/lib/spotify"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const playlistId = params.id

  try {
    const tracks = await getPlaylistTracks(playlistId)
    return NextResponse.json(tracks)
  } catch (error) {
    console.error("Error fetching playlist tracks:", error)
    return NextResponse.json({ error: "Failed to fetch playlist tracks" }, { status: 500 })
  }
}

