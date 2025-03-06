// @ts-ignore
import { searchTracks } from "@/lib/spotify"
import { SearchBar } from "@/components/search-bar"
import { TrackList } from "@/components/track-list"

interface SearchPageProps {
  searchParams: { q?: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Wait for the searchParams to be available, if it's a Promise.
  const query = searchParams.q || ""

  const searchResults = query ? await searchTracks(query).then((data) => data.tracks.items) : []

  return (
    <main className="container py-6 space-y-8">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter">Search Results</h1>
        <SearchBar initialQuery={query} />
      </div>

      {query && <TrackList tracks={searchResults} title={`Results for "${query}"`} />}
    </main>
  )
}
