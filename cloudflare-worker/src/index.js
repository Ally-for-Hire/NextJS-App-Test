function buildCorsHeaders(contentType = "application/json; charset=utf-8") {
  return {
    "content-type": contentType,
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,OPTIONS",
    "access-control-allow-headers": "*",
  };
}

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: buildCorsHeaders("text/plain") });
    }

    const body = JSON.stringify({ time: new Date().toISOString() });
    return new Response(body, { headers: buildCorsHeaders() });
  },
};
