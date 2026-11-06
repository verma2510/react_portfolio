/**
 * Generates lightweight WebP copies of the portfolio photos into public/opt/.
 * The UI serves these via <picture> and falls back to the original JPGs.
 *
 *   npm run optimize:images
 */
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const PUBLIC = path.resolve(import.meta.dirname, '..', 'public');
const OUT = path.join(PUBLIC, 'opt');
const sources = ['photo.jpg', ...(await readdir(path.join(PUBLIC, 'hobbies'))).map((f) => `hobbies/${f}`)].filter((f) =>
  /\.(jpe?g|png)$/i.test(f),
);

await mkdir(OUT, { recursive: true });
for (const file of sources) {
  const out = path.join(OUT, `${path.parse(file).name}.webp`);
  const info = await sharp(path.join(PUBLIC, file))
    .rotate() // respect EXIF orientation
    .resize({ width: 1100, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(out);
  console.log(`${file} → opt/${path.basename(out)}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} kB`);
}
