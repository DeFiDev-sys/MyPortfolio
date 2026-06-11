# Assets

The hero profile photo is served from the **`public/`** folder so it can be
swapped without touching code or rebuilding.

To use your own photo:

1. Drop your image into `public/profile.jpg` (replace the placeholder).
2. That's it — it's referenced as `/profile.jpg` in `src/data/portfolio.ts`.

If you prefer importing from `src/assets/` instead, place your file here as
`profile.jpg`, then change `image: '/profile.jpg'` in
`src/data/portfolio.ts` to:

```ts
import profileImg from '../assets/profile.jpg';
// ...
image: profileImg,
```
