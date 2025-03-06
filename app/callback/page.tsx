import { getAccessToken } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function CallbackPage({
  searchParams,
}: {
  searchParams: { code?: string };
}) {
  const code = searchParams.code;

  if (!code) {
    return <div>Error: No code provided</div>;
  }

  try {
    const tokenData = await getAccessToken(code);

    // Before storing the token in cookies, you need to await cookies()
    const cookieStore = await cookies();
    cookieStore.set("spotify_access_token", tokenData.access_token, {
      maxAge: tokenData.expires_in,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    // Store the access token in localStorage (client-side)
    // We need to use a script tag to set localStorage from the server
    return (
      <>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              localStorage.setItem('spotify_access_token', '${tokenData.access_token}');
              window.location.href = '/';
            `,
          }}
        />
        <p>Logging you in...</p>
      </>
    );
  } catch (error) {
    console.error("Error getting access token:", error);
    return <div>Error: Failed to authenticate</div>;
  }
}
