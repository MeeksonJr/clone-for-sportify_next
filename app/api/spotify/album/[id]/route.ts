import { fetchSpotifyApi } from "@/lib/spotify"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const albumId = params.id

  try {
    const [albumDetails, albumTracks] = await Promise.all([
      fetchSpotifyApi(`v1/albums/${albumId}`),
      fetchSpotifyApi(`v1/albums/${albumId}/tracks?limit=50`),
    ])

    return NextResponse.json({
      ...albumDetails,
      tracks: albumTracks.items,
    })
  } catch (error) {
    console.error("Error fetching album details:", error)
    return NextResponse.json({ error: "Failed to fetch album details" }, { status: 500 })
  }
}

