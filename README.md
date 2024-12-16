# Vitrav

An AI-powered itinerary travel planner that helps you create personalized and optimized travel itineraries. Vitrav leverages AI and real-time data to deliver customized travel plans based on user preferences, destinations, and travel timeframes.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Setup and Installation](#setup-and-installation)
4. [Environment Variables](#environment-variables)
5. [Usage](#usage)
6. [Deployment](#deployment)
7. [Contributing](#contributing)
8. [License](#license)

---

## Features

- **AI-Powered Planning**: Personalized itineraries based on your interests and preferences.
- **Real-Time Data**: Fetch accurate location data and recommendations.
- **Interactive Maps**: Visualize your itinerary on a map.
- **User Authentication**: Secure sign-in and personalized profiles.
- **Responsive Design**: Works seamlessly across devices.
- **Save & Share Itineraries**: Easily save and share travel plans.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: NestJS, Prisma
- **Database**: PostgreSQL
- **Authentication**: Google Auth
- **Maps API**: Google Maps API
- **Deployment**: Vercel (Frontend), AWS Lambda (Backend)

## Setup and Installation

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn**
- **PostgreSQL**

### Clone the Repository

```bash
git clone https://github.com/yourusername/vitrav.git
cd vitrav
```

### Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

## Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```plaintext
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

```

## Usage

### Run the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Deployment

### Vercel

1. Install the [Vercel CLI](https://vercel.com/docs/cli):
   ```bash
   npm install -g vercel
   ```
2. Deploy the app:
   ```bash
   vercel
   ```

Follow the prompts to complete deployment.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make changes and commit them: `git commit -m "Add some feature"`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
