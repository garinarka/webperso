# DEPENDENCIES TO ADD
# Run from your project root:

pnpm add @vercel/kv

# That's the only required new dependency.
# Everything else (framer-motion, lucide-react, next-sanity) already exists.

# ─── Optional for syntax highlighting ────────────────────────────────────────
# pnpm add highlight.js
# Then in app/layout.tsx add:
#   import 'highlight.js/styles/github-dark.css'
#
# Then in PortableTextComponents.tsx, add hljs.highlightElement() in a useEffect
# for the code blocks. The current implementation renders class="language-xxx"
# which highlight.js auto-detects if you call hljs.highlightAll() once on mount.

# ─── If NOT using Vercel KV (any other host) ─────────────────────────────────
# pnpm remove @vercel/kv
# pnpm add @upstash/redis
# 
# Then update lib/redis.ts:
#   import { Redis } from '@upstash/redis'
#   export const redis = new Redis({
#     url: process.env.UPSTASH_REDIS_REST_URL!,
#     token: process.env.UPSTASH_REDIS_REST_TOKEN!,
#   })
