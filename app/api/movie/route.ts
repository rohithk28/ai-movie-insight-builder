import { NextResponse } from "next/server";
import { getMovieFromIMDb } from "@/lib/tmdb";
import { analyzeSentiment } from "@/lib/ai";

export async function POST(req: Request) {

  try {

    const body = await req.json();
    const { imdbId } = body;

    if (!imdbId) {
      return NextResponse.json(
        { error: "IMDb ID is required" },
        { status: 400 }
      );
    }
    

    const movie = await getMovieFromIMDb(imdbId);

    if (!movie) {
      console.log("Fetching movie: no movie found for", imdbId);
      return NextResponse.json(
        { error: "Movie not found" },
        { status: 404 }
      );
    }

    console.log("Fetching movie:", imdbId);
    console.log("Reviews fetched:", (movie.reviews || []).length);

    const sentiment = await analyzeSentiment(movie.reviews);

    return NextResponse.json({
      title: movie.title,
      poster: movie.poster,
      year: movie.year,
      rating: movie.rating,
      plot: movie.plot,
      cast: movie.cast,
      aiSummary: sentiment.summary,
      overallSentiment: sentiment.sentiment
    });

  } catch (error: any) {

    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );

  }

}