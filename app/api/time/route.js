export async function GET() {
  const workerUrl = process.env.WORKER_URL || process.env.NEXT_PUBLIC_WORKER_URL;
  if (!workerUrl) {
    return Response.json(
      { error: "WORKER_URL env var not set" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(workerUrl, {
      headers: { accept: "application/json" },
      // Ensure no caching so the time looks fresh in demos
      cache: "no-store",
    });
    if (!res.ok) {
      return Response.json(
        { error: `Worker responded ${res.status}` },
        { status: 502 }
      );
    }
    const data = await res.json();
    return Response.json(data, { headers: { "cache-control": "no-store" } });
  } catch (e) {
    return Response.json(
      { error: `Fetch to worker failed: ${e.message}` },
      { status: 502 }
    );
  }
}

