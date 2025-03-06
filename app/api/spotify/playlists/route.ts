// @ts-ignore
import { getPlaylists } from "@/lib/spotify"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const playlists = await getPlaylists()
    return NextResponse.json(playlists)
  } catch (error) {
    console.error("Error fetching playlists:", error)
    return NextResponse.json({ error: "Failed to fetch playlists" }, { status: 500 })
  }
}

