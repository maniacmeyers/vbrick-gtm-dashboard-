// Netlify Function: queue a research request
// POST /.netlify/functions/queue-research
//
// Body: { prompt, requested_at, requested_by }
//
// Behavior:
//   1. Validates the request
//   2. Logs it (visible in Netlify Functions logs)
//   3. Optionally forwards to a private webhook (set RESEARCH_WEBHOOK_URL env var)
//   4. Returns { ok: true, queued_at } so the dashboard can show the toast
//
// The endpoint name is intentionally generic ("queue-research") — there is no
// reference to the underlying research engine in the URL or response.

exports.handler = async (event) => {
  // CORS — same-origin only in production, but allow preflight just in case
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: "method_not_allowed" }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (e) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: "invalid_json" }),
    };
  }

  const { prompt, requested_at, requested_by } = payload;

  if (!prompt || typeof prompt !== "string") {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: "missing_prompt" }),
    };
  }

  const queuedAt = new Date().toISOString();

  // Log to Netlify Functions output (visible in the dashboard log stream)
  console.log("[research-queue]", JSON.stringify({
    queued_at: queuedAt,
    requested_at: requested_at || null,
    requested_by: requested_by || "unknown",
    prompt_length: prompt.length,
    prompt_preview: prompt.slice(0, 240),
  }));

  // Optional: forward to a private webhook (n8n / Zapier / your own server)
  // Set the env var RESEARCH_WEBHOOK_URL in Netlify site settings.
  const webhookUrl = process.env.RESEARCH_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.RESEARCH_WEBHOOK_SECRET
            ? { "X-Webhook-Secret": process.env.RESEARCH_WEBHOOK_SECRET }
            : {}),
        },
        body: JSON.stringify({
          queued_at: queuedAt,
          requested_at: requested_at || null,
          requested_by: requested_by || "unknown",
          prompt,
        }),
      });
    } catch (err) {
      console.error("[research-queue] webhook forward failed:", err.message);
      // Do not fail the user-facing request just because the webhook missed
    }
  }

  return {
    statusCode: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true, queued_at: queuedAt }),
  };
};
