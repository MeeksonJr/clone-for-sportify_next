## PlanSmart AI

PlanSmart AI is an innovative web application that leverages artificial intelligence to generate personalized, actionable plans based on users' goals, resources, and constraints. This project aims to revolutionize the way individuals and businesses approach planning and decision-making.

## Features

- AI-powered plan generation using OpenAI's GPT-4 model
- User-friendly interface for inputting goals, resources, and constraints
- Dynamic dashboard for tracking multiple plans and tasks
- Real-time progress monitoring and task management
- Responsive design for seamless use across devices
- Secure user authentication and data protection

## Tech Stack

- Next.js 13+ (App Router)
- React
- TypeScript
- Tailwind CSS
- Drizzle ORM
- Neon Database (PostgreSQL)
- OpenAI API
- Vercel (for deployment)
- Clerk Auth (future use)

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn
- A Neon Database account
- An OpenAI API key
- Clerk API keys (future use)

### Installation

Clone the repository:

```bash
git clone https://github.com/MeeksonJr/PlanSmart-ai.git
cd plansmart-ai
Install dependencies:

npm install
   or
yarn install
```

## Set up your environment variables
```
Create a .env.local file in the root of the project.
Add the following variables:
bash
Copy code
NEXT_PUBLIC_OPENAI_API_KEY=your-openai-api-key
NEXT_PUBLIC_NEON_DB_URL=your-neon-database-url
If you plan to use Clerk for authentication in the future, also add:

bash
Copy code
CLERK_FRONTEND_API=your-clerk-frontend-api
CLERK_API_KEY=your-clerk-api-key
Run the development server:
```
## npm run dev or yarn dev
This will start the application on http://localhost:3000.

## Database Setup
PlanSmart AI uses Neon (PostgreSQL) as the database backend. Follow the instructions below to set up your Neon Database:
- Create a Neon account if you don't have one: Neon Database.
- Create a new Neon database and note the connection URL.
- Set up the database schema using the provided migration scripts (or manually, depending on your preferences).
- Authentication Setup
- PlanSmart AI includes user authentication with Clerk (for future implementation). For now, the app functions without authentication, but Clerk can be integrated by following these steps:

## Sign up for Clerk: Clerk.
- After setting up Clerk, create an API key and configure it in your .env.local file.
- Wrap your pages requiring authentication in the <ClerkProvider /> component (refer to the example in the code for how to implement this).

## Deployment
- The application is deployed on Vercel for seamless hosting. If you wish to deploy it yourself, follow these steps:
- Push your code to your GitHub repository.
- Connect your GitHub repository to Vercel and follow the deployment steps.
- Set up your environment variables in the Vercel dashboard under "Settings" → "Environment Variables."
- Once deployed, your app will be accessible on a public URL provided by Vercel.

## Contributing
- We welcome contributions to PlanSmart AI! To contribute, please follow these steps:

## Fork the repository.
- Create a new branch (git checkout -b feature-name).
Make your changes.
- Commit your changes (git commit -am 'Add new feature').
- Push to the branch (git push origin feature-name).
Open a pull request.
- Please ensure your code follows the existing code style and includes tests where appropriate.

# License
This project is licensed under the MIT License - see the LICENSE file for details.

# Acknowledgments
- Special thanks to OpenAI for providing the GPT-4 model API.
- Thanks to Clerk for user authentication (future integration).
