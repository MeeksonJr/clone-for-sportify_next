// @ts-ignore
import { searchTracks } from "@/lib/spotify"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Missing search query" }, { status: 400 })
  }

  try {
    const results = await searchTracks(query)
    return NextResponse.json(results)
  } catch (error) {
    console.error("Error searching tracks:", error)
    return NextResponse.json({ error: "Failed to search tracks" }, { status: 500 })
  }
}

