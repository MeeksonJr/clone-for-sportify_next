import { fetchSpotifyApi } from "@/lib/spotify"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const artistId = params.id

  try {
    const artistData = await fetchSpotifyApi(`v1/artists/${artistId}`)
    return NextResponse.json(artistData)
  } catch (error) {
    console.error("Error fetching artist details:", error)
    return NextResponse.json({ error: "Failed to fetch artist details" }, { status: 500 })
  }
}

