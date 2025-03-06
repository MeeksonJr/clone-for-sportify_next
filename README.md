Here’s the updated **README.md** file in one clean, copyable format:

```md
# SoundBite: Spotify-Powered Music Discovery App

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Prerequisites](#prerequisites)
5. [Setup and Installation](#setup-and-installation)
6. [Project Structure](#project-structure)
7. [Key Components](#key-components)
8. [Usage](#usage)
9. [API Routes](#api-routes)
10. [Authentication](#authentication)
11. [Styling](#styling)
12. [Error Handling](#error-handling)
13. [Testing](#testing)
14. [Deployment](#deployment)
15. [Contributing](#contributing)
16. [License](#license)
17. [Acknowledgements](#acknowledgements)
18. [Support](#support)

---

## Overview

SoundBite is a web application built with **Next.js** that leverages the **Spotify API** to provide users with a rich music discovery experience. This app allows users to **search for tracks**, **view artist details**, **explore new releases**, and **play music previews**. For authenticated users, it offers **full track playback** using the **Spotify Web Playback SDK**.

---

## Features

- **Search Functionality**
  - Search for tracks, artists, and albums across Spotify's vast library.
  - Real-time search suggestions.

- **Artist Pages**
  - Detailed artist profiles with top tracks, albums, and related artists.

- **Album Pages**
  - Full track listings and release details.

- **New Releases**
  - Showcase of the latest album drops.

- **Music Playback**
  - Full track playback for logged-in users, 30-second previews for others.

- **User Authentication**
  - Spotify OAuth integration for personalized experiences.

- **Responsive Design**
  - Fully optimized for mobile and desktop.

- **Accessibility**
  - Implemented with web accessibility standards.

---

## Tech Stack

- **Frontend**
  - Next.js 13 with App Router
  - React 18
  - TypeScript

- **Styling**
  - Tailwind CSS
  - CSS Modules

- **UI Components**
  - shadcn/ui

- **State Management**
  - React Context API
  - React Query

- **API Integration**
  - Spotify Web API
  - Next.js API Routes

- **Authentication**
  - Spotify OAuth
  - NextAuth.js

- **Testing**
  - Jest
  - React Testing Library

- **Linting & Formatting**
  - ESLint
  - Prettier

---

## Prerequisites

Ensure you have:

- **Node.js** (v14+)
- **npm** (v6+) or **yarn** (v1.22+)
- A **Spotify Developer account**
- **Git** installed

---

## Setup and Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/MeeksonJr/soundbite.git
   cd soundbite
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file and add:

   ```env
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   NEXT_PUBLIC_BASE_URL=https://api.spotify.com.
   SPOTIFY_REDIRECT_URI=https://open.spotify.com/
   ```

4. Start the development server:

   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## Project Structure

```
.
├── app/                # Next.js app directory
│   ├── api/            # API routes
│   ├── ....            # Folders of content
│   ├── page.tsx        # Page component
│   ├── layout.tsx      # Root layout
│   ├── globals.css     # Global CSS file
├── |components/        # Reusable components
├── |hooks/             # Custom React hooks
├── |lib/               # lib functions
├── public/             # Static assets
├── .env.local          # Environment variables
├── tsconfig.json       # TypeScript configuration
├── next.config.js      # Next.js configuration
├── package.json        # Project dependencies and scripts
```

---

## Key Components

- **`SpotifyPlayer.tsx`** - Handles music playback.
- **`SearchBar.tsx`** - Implements search with auto-suggestions.
- **`ArtistCard.tsx`** - Displays artist details.
- **`TrackList.tsx`** - Renders track lists with playback controls.

---

## Usage

- **Search for music**: Enter a track, artist, or album in the search bar.
- **View artist details**: Click an artist for their top songs, albums, and related artists.
- **Play tracks**: Click play on a track.
- **Login with Spotify**: Sign in for full playback features.

---

## API Routes

- **`/api/spotify/auth`** - Handles Spotify OAuth authentication.
- **`/api/spotify/search`** - Fetches search results from Spotify API.
- **`/api/spotify/artist/[id]`** - Retrieves artist details.
- **`/api/spotify/playlist/[id]`** - Fetches a specific playlist.

---

## Authentication

- Uses **Spotify OAuth 2.0** for user login.
- Tokens are stored in **cookies** for authentication.
- Full track playback is enabled using the **Spotify Web Playback SDK**.

---

## Styling

- **Tailwind CSS** for styling.
- **Mobile-first design** approach.
- **Dark mode support**.

---

## Error Handling

- Friendly **error messages** if something goes wrong.
- Uses **React Error Boundaries** for unexpected failures.
- Handles **Spotify API rate limits** gracefully.

---

## Testing

Run tests using:

```sh
npm test
# or
yarn test
```

---

## Deployment

Deploy SoundBite to **Vercel**:

1. Install the **Vercel CLI**:

   ```sh
   npm install -g vercel
   ```

2. Deploy:

   ```sh
   vercel
   ```

---

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repo.
2. Create a new branch:

   ```sh
   git checkout -b feature-name
   ```

3. Commit your changes:

   ```sh
   git commit -m "Add new feature"
   ```

4. Push the branch:

   ```sh
   git push origin feature-name
   ```

5. Open a **Pull Request**.

---

## License

This project is licensed under the **MIT License**.

---

## Acknowledgements

- **Spotify** for their API.
- Inspired by various **music discovery platforms**.
- Built using **Next.js**, **React**, and **TypeScript**.

---

## Support

For any issues, open an issue on **[GitHub](https://github.com/MeeksonJr/soundbite/issues)**.

---

🚀 **Happy Listening!** 🎵