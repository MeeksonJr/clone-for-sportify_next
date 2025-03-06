// @ts-ignore
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Music } from "lucide-react"
// @ts-ignore
// import { SpotifyPlayer } from "@/components/spotify-player"
import { cookies } from "next/headers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SoundBite - Spotify Music Explorer",
  description: "Discover and enjoy music with Spotify API",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies();  // Now you can await
  const accessToken = cookieStore.get("spotify_access_token")?.value;

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Music className="h-6 w-6" />
              <span className="text-xl font-bold">SoundBite</span>
            </Link>
            <nav className="flex gap-4">
              <Link href="/" className="text-sm font-medium hover:underline">
                Home
              </Link>
              <Link href="/search" className="text-sm font-medium hover:underline">
                Search
              </Link>
              {accessToken ? (
                <Link href="/api/auth/logout" className="text-sm font-medium hover:underline">
                  Logout
                </Link>
              ) : (
                <Link href="/login" className="text-sm font-medium hover:underline">
                  Login
                </Link>
              )}
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t py-6">
          <div className="container flex flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm text-muted-foreground">Powered by Spotify API</p>
          </div>
        </footer>
        {/* {accessToken && <SpotifyPlayer accessToken={accessToken} />} */}
      </body>
    </html>
  )
}

