// @ts-ignore
import { getAuthUrl } from "@/lib/auth"
import { Button } from "@/components/ui/button"

export default async function LoginPage() {
  const authUrl = await getAuthUrl()

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Login to Spotify</h1>
        <Button asChild>
          <a href={authUrl}>Login with Spotify</a>
        </Button>
      </div>
    </div>
  )
}

