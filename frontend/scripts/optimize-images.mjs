// Generates web-optimised WebP derivatives of the raw photos in /public.
// Originals are left untouched. Run with: npm run optimize:images
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');

const jobs = [
  { dir: 'hobbies', width: 960 },
  { dir: '.', width: 900, only: ['photo.jpg'] },
];

for (const job of jobs) {
  const dir = path.join(root, job.dir);
  const files = (await readdir(dir)).filter(
    (f) => /\.(jpe?g|png)$/i.test(f) && (!job.only || job.only.includes(f)),
  );

  for (const file of files) {
    const input = path.join(dir, file);
    const output = input.replace(/\.(jpe?g|png)$/i, '.webp');
    await sharp(input)
      .rotate()
      .resize({ width: job.width, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(output);
    const [a, b] = await Promise.all([stat(input), stat(output)]);
    console.log(`${path.relative(root, output)}  ${(a.size / 1024).toFixed(0)}KB -> ${(b.size / 1024).toFixed(0)}KB`);
  }
}
