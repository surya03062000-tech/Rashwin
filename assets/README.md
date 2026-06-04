# Assets

## Background music
Place your background music track here as **`music.mp3`** (a soft instrumental
or hymn works beautifully). The floating ♪ button will play/pause it.

The site works fine without it — the music toggle simply stays silent until a
`music.mp3` file is added.

## Photos
The gallery currently uses tasteful Unsplash placeholder photos loaded from a
CDN (see `script.js` → `photos` array). To use your own pre-wedding /
engagement / family photos:

1. Drop your images into this folder, e.g. `assets/photo1.jpg`.
2. In `script.js`, replace the `imgUrls` mapping with your local paths:
   ```js
   const imgUrls = [
     "assets/photo1.jpg",
     "assets/photo2.jpg",
     // ...
   ];
   ```

## Favicon
`favicon.svg` is the little "S&J" tab icon — replace it with your own if you like.
