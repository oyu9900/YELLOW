# Yellow_Book Performance Notes

## Measured pages
- `/yellow-books` – TTFB ~ 200ms, LCP ~ 1.4s (desktop)
- `/yellow-books/[id]` – TTFB ~ 120ms, LCP ~ 1.0s (desktop)

## Changes we made
- Enabled ISR (revalidate=60) on `/yellow-books`.
- Added streaming `<Suspense>` section for highlights.
- Switched `/yellow-books/[id]` to SSG with `generateStaticParams`.
- Made `/yellow-books/search` SSR with a small client map island instead of full client rendering.

## Why this helps
- ISR: reduces database hits for list page, but keeps data ~fresh.
- SSG: almost zero TTFB for details pages.
- Streaming + Suspense: first content appears earlier → better LCP.
- SSR search: keeps filters in sync with URL and SEO-friendly.

## Next risks / improvements
- Map library bundle size can increase LCP on slow mobiles.
- If YellowBookEntry grows huge, ISR revalidate=60 may still be heavy → need pagination or cursor.
- Auth endpoints currently not cached; high traffic might need rate limiting.
