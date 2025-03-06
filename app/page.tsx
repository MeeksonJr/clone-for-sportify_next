import { getNewReleases } from "@/lib/spotify"
import { SearchBar } from "@/components/search-bar"
import { PlaylistGrid } from "@/components/playlist-grid"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default async function Home() {
  let newReleases = []
  let error = null

  try {
    const newReleasesData = await getNewReleases(10)
    newReleases = newReleasesData.albums.items
  } catch (err) {
    console.error("Error fetching new releases:", err)
    error = "Failed to load new releases. Please try again later."
  }

  return (
    <main className="container py-6 space-y-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Discover Music with Spotify</h1>
        <p className="max-w-[700px] text-muted-foreground">
          Search for your favorite songs, artists, and albums or explore new releases.
        </p>
        <SearchBar />
      </div>

      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <PlaylistGrid playlists={newReleases} title="New Releases" />
      )}
    </main>
  )
}

