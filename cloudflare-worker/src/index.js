export default {
  async fetch(request, env, ctx) {
    const body = JSON.stringify({ time: new Date().toISOString() });
    return new Response(body, {
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  },
};

