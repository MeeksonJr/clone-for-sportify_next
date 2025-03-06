// Spotify API utilities

// Function to get access token using client credentials flow
export async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error("Missing Spotify API credentials")
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.statusText}`)
  }

  const data = await response.json()
  return data.access_token
}

// Function to fetch data from Spotify Web API
export async function fetchSpotifyApi(endpoint: string, method = "GET") {
  try {
    const token = await getAccessToken()

    const response = await fetch(`https://api.spotify.com/${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      const errorBody = await response.json()
      console.error(`Spotify API error (${response.status}):`, errorBody)
    }

    return response.json()
  } catch (error) {
    console.error("Error in fetchSpotifyApi:", error)
    throw error
  }
}

// Function to search tracks
export async function searchTracks(query: string, limit = 10) {
  if (!query) return { tracks: { items: [] } }

  return fetchSpotifyApi(`v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`)
}

// Function to search tracks without authentication
export async function searchTracksPublic(query: string, limit = 10) {
  if (!query) return { tracks: { items: [] } }

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// Function to get a user's playlists (requires user authentication)
export async function getPlaylists(limit = 10) {
  try {
    return await fetchSpotifyApi(`v1/browse/featured-playlists?limit=${limit}`)
  } catch (error) {
    console.error("Error fetching playlists:", error)
    return { playlists: { items: [] } }
  }
}

// Function to get featured playlists
export async function getFeaturedPlaylists(limit = 10) {
  try {
    return await fetchSpotifyApi(`v1/browse/featured-playlists?limit=${limit}`)
  } catch (error) {
    console.error("Error fetching featured playlists:", error)
    return { playlists: { items: [] } }
  }
}

// Function to get new releases
export async function getNewReleases(limit = 10) {
  try {
    return await fetchSpotifyApi(`v1/browse/new-releases?limit=${limit}`)
  } catch (error) {
    console.error("Error fetching new releases:", error)
    return { albums: { items: [] } }
  }
}

// Function to get tracks from a playlist
export async function getPlaylistTracks(playlistId: string, limit = 10) {
  return fetchSpotifyApi(`v1/playlists/${playlistId}/tracks?limit=${limit}`)
}

// Function to get track details
export async function getTrack(trackId: string) {
  return fetchSpotifyApi(`v1/tracks/${trackId}`)
}

export async function getArtistDetails(id: string) {
  try {
    const [artistData, topTracks, albums, relatedArtists] = await Promise.all([
      fetchSpotifyApi(`v1/artists/${id}`).catch(error => {
        console.error("Error fetching artist data:", error);
        return null;
      }),
      fetchSpotifyApi(`v1/artists/${id}/top-tracks?market=US`).catch(error => {
        console.error("Error fetching top tracks:", error);
        return { tracks: [] };
      }),
      fetchSpotifyApi(`v1/artists/${id}/albums?include_groups=album,single&market=US&limit=10`).catch(error => {
        console.error("Error fetching albums:", error);
        return { items: [] };
      }),
      fetchSpotifyApi(`v1/artists/${id}/related-artists`).catch(error => {
        console.error("Error fetching related artists:", error);
        return { artists: [] };
      })
    ]);

    if (!artistData) {
      return null; // Artist not found
    }

    // Fetch artist's monthly listeners (this is not directly available in the API, so we're estimating)
    const monthlyListeners = Math.floor(artistData.followers.total * (artistData.popularity / 100));

    return {
      ...artistData,
      monthlyListeners,
      topTracks: topTracks.tracks,
      albums: albums.items,
      relatedArtists: relatedArtists.artists
    };
  } catch (error) {
    console.error("Error in getArtistDetails:", error);
    return null;
  }
}
