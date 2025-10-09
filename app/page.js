"use client";

import { useState } from "react";

export default function HomePage() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState("");

  // Replace with your actual Workers URL
  const WORKER_URL = "https://steep-bar-7c57.zacyandell.workers.dev";

  // Fetch time from your Worker and convert to a readable string
  async function handleShowTime() {
    const res = await fetch(WORKER_URL);
    const data = await res.json(); // expects { time: "2025-01-01T12:34:56.000Z" }
    const readable = new Date(data.time).toLocaleString();
    setTime(readable);
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
    </main>
  );
}
