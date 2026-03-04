import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const client = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

export async function getMovieFromIMDb(imdbId: string) {
  const API_KEY = process.env.TMDB_API_KEY;

  if (!API_KEY) {
    console.error("TMDB_API_KEY is not set. Make sure .env.local contains TMDB_API_KEY and restart the dev server.");
    throw new Error("TMDB API key missing");
  }

  try {
    const findUrl = `${BASE_URL}/find/${imdbId}?api_key=${API_KEY}&external_source=imdb_id`;
    console.log("TMDB: fetching find endpoint", findUrl);
    const findRes = await client.get(findUrl);

    const movie = findRes.data.movie_results?.[0];

    if (!movie) {
      console.warn("TMDB: movie not found for IMDb ID", imdbId);
      throw new Error("Movie not found");
    }

    const movieId = movie.id;

    const detailsUrl = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
    const creditsUrl = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;
    const reviewsUrl = `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`;

    console.log("TMDB: fetching details", detailsUrl);
    const details = await client.get(detailsUrl);

    console.log("TMDB: fetching credits", creditsUrl);
    const credits = await client.get(creditsUrl);

    console.log("TMDB: fetching reviews", reviewsUrl);
    const reviews = await client.get(reviewsUrl);

    return {
      title: details.data.title,
      poster: details.data.poster_path ? `https://image.tmdb.org/t/p/w500${details.data.poster_path}` : null,
      year: details.data.release_date?.split("-")[0] ?? null,
      rating: details.data.vote_average,
      plot: details.data.overview,
      cast: (credits.data.cast || []).slice(0, 5),
      reviews: (reviews.data.results || []).slice(0, 10),
    };
  } catch (err: any) {
    console.error("TMDB error for IMDb ID", imdbId, err?.response?.status, err?.message || err);
    throw err;
  }
}