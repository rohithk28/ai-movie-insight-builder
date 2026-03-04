# AI Movie Insight Builder

## Overview

AI Movie Insight Builder is a simple full-stack web application that allows a user to enter an IMDb movie ID and instantly view key information about the movie along with an AI-generated audience sentiment summary.

The goal of this project was to build a clean and maintainable application using modern JavaScript technologies while demonstrating full-stack development skills with Next.js.

The application retrieves movie data from TMDB, analyzes audience reviews, and provides a summarized sentiment classification for the movie.

---

## Features

* Enter an IMDb movie ID (example: `tt0133093`)
* Fetch movie metadata including title, poster, release year, and rating
* Display the main cast of the movie
* Show a short plot summary
* Retrieve audience reviews
* Generate an AI-based audience sentiment summary
* Classify overall sentiment as **Positive**, **Mixed**, or **Negative**
* Clean and responsive user interface
* Basic input validation and error handling

---

## Tech Stack

### Frontend

* **Next.js (React)**
* **Tailwind CSS**

### Backend

* **Next.js API Routes (Node.js runtime)**

### External APIs

* **TMDB API** – Used to retrieve movie details, cast information, and audience reviews.
* **OpenAI API** – Used to summarize audience sentiment and classify overall sentiment.

### Libraries

* **Axios** – Used for making API requests to external services.

---

## Tech Stack Rationale

Next.js was chosen because it provides both frontend and backend capabilities in a single framework. Using API routes allowed the project to implement backend logic without creating a separate server.

React enables component-based UI development, making the interface modular and easy to maintain.

TMDB API was used as a reliable source for movie data since it allows searching using IMDb IDs and provides structured movie metadata.

OpenAI was used to summarize audience reviews and extract insights from user comments, which adds intelligent analysis to the application.

---

## Assumptions

* The first 10 available audience reviews are used for sentiment analysis.
* If the OpenAI API quota is exceeded, a fallback sentiment classification mechanism is used to keep the application functional.
* TMDB API is used instead of scraping IMDb directly to ensure reliable and structured data retrieval.

---

## Project Structure

```
ai-movie-insight-builder
│
├── app
│   ├── api
│   │   └── movie
│   │       └── route.ts
│   ├── layout.tsx
│   └── page.tsx
│
├── lib
│   ├── ai.ts
│   └── tmdb.ts
│
├── __tests__
│   └── basic.test.ts
│
├── README.md
├── package.json
└── .gitignore
```

---

## Running the Project Locally

### 1. Clone the repository

```
git clone <repository-url>
cd ai-movie-insight-builder
```

### 2. Install dependencies

```
npm install
```

### 3. Create environment variables

Create a file named:

```
.env.local
```

Add the following variables:

```
TMDB_API_KEY=your_tmdb_api_key
OPENAI_API_KEY=your_openai_api_key
```

### 4. Start the development server

```
npm run dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

## Deployment

The application is deployed using **Vercel**, which provides native support for Next.js applications and automatically handles serverless API routes.

The deployed application can be accessed at:

```
<live-deployment-url>
```

---

## Author

Rohith Kontham
