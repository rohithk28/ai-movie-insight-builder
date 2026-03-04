"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {

  const [imdbId, setImdbId] = useState("");
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchMovie = async () => {

    if (!imdbId) {
      alert("Please enter an IMDb ID");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post("/api/movie", {
        imdbId
      });

      setMovie(res.data);

    } catch (error: any) {

      alert(error.response?.data?.error || "Something went wrong");

    } finally {

      setLoading(false);

    }

  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="text-center w-full max-w-3xl">

        <h1 className="text-4xl font-bold mb-8">
          AI Movie Insight Builder
        </h1>

        {/* INPUT */}

        <div className="flex justify-center gap-3 mb-10">

          <input
            className="p-3 text-white bg-gray-800 rounded w-64 border border-gray-600"
            placeholder="Enter IMDb ID (tt0133093)"
            value={imdbId}
            onChange={(e) => setImdbId(e.target.value)}
          />

          <button
            onClick={fetchMovie}
            className="bg-blue-600 px-5 py-3 rounded hover:bg-blue-700"
          >
            {loading ? "Loading..." : "Search"}
          </button>

        </div>

        {/* RESULTS */}

        {movie && (

          <div className="space-y-6 text-left">

            <div className="flex gap-6">

              <img
                src={movie.poster}
                width={200}
                alt="poster"
                className="rounded"
              />

              <div>

                <h2 className="text-2xl font-semibold">
                  {movie.title}
                </h2>

                <p className="mt-2">
                  {movie.year} | Rating: {movie.rating}
                </p>

                <p className="mt-4">
                  {movie.plot}
                </p>

              </div>

            </div>

            <div>

              <h3 className="font-bold text-lg mb-2">
                Cast
              </h3>

              <ul className="list-disc ml-6">

                {movie.cast.map((c: any) => (
                  <li key={c.id}>
                    {c.name}
                  </li>
                ))}

              </ul>

            </div>

            <div>

              <h3 className="font-bold text-lg">
                Audience Sentiment
              </h3>

              <p className="mt-2">
                {movie.aiSummary}
              </p>

              <p className="mt-2">
                Overall Sentiment:
                <strong> {movie.overallSentiment}</strong>
              </p>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}