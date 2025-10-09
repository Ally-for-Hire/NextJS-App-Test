"use client";

import { useState } from "react";

export default function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <main className="container">
      <h1>Welcome</h1>
      <button
        className="button"
        onClick={() => setCount((c) => c + 1)}
      >
        Count: {count}
      </button>
    </main>
  );
}
