import { inject } from "@vercel/analytics";

// Vercel Web Analytics: no cookies. Enable it in the Vercel project's Analytics tab.
// Skipped on other hosts, where its script doesn't exist.
if (__ON_VERCEL__) inject();
