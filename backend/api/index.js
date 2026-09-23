// Vercel serverless entry point. Any request to /api/* on this
// project is routed here (see ../vercel.json) and handled directly
// by the same Express app used for local dev.
//
// NO serverless-http wrapper here (previously used, now removed) —
// it's built for AWS Lambda's event/context calling convention, which
// is NOT what Vercel's own Node.js function runtime uses. Running
// both together caused a real, reproducible bug: request bodies on
// POST/PATCH got truncated ("request size did not match content
// length" from raw-body), breaking admin login, cron triggers, and
// admin overrides — anything with a JSON body.
//
// The fix: Vercel's Node runtime just needs a plain (req, res)
// handler — exactly what an Express app already is (the same shape
// http.createServer(app) uses). No adapter needed.
const app = require("../src/app");

module.exports = app;
