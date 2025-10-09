"use client";

import { useState } from "react";

export default function HomePage() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  // Source the Worker URL from env at build-time.
  // Set NEXT_PUBLIC_WORKER_URL in your environment (Vercel/GitHub) to your deployed workers.dev URL.
  const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL;

  // Fetch time from your Worker and convert to a readable string
  async function handleShowTime() {
    setError("");
    setTime("");

    if (!WORKER_URL) {
      setError(
        "Worker URL not set. Define NEXT_PUBLIC_WORKER_URL to your workers.dev URL."
      );
      return;
    }

    try {
      const res = await fetch(WORKER_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json(); // expects { time: "2025-01-01T12:34:56.000Z" }
      const readable = new Date(data.time).toLocaleString();
      setTime(readable);
    } catch (e) {
      setError(`Failed to fetch from Worker: ${e.message}`);
    }
  }

  return (
    <main className="container">
      <h1>Welcome</h1>
      <button
        className="button"
        onClick={() => setCount((c) => c + 1)}
      >
        Count: {count}
      </button>
      <button className="button" onClick={handleShowTime} style={{ marginTop: 12 }}>
        Show Time
      </button>
      {time && <p className="message">Server time: {time}</p>}
      {error && (
        <p className="message" style={{ color: "#c00" }}>
          {error}
        </p>
      )}
    </main>
  );
}
