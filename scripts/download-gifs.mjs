// Télécharge le top 20 dans gifs/ pour faire tourner la Gifbox hors-ligne.
// Usage : node scripts/download-gifs.mjs   (Node 18+)
import { readFile, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import path from "node:path";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const sandbox = { window: {} };
vm.runInNewContext(await readFile(path.join(root, "gifs.js"), "utf8"), sandbox);

let missing = 0;
for (const gif of sandbox.window.GIFS) {
  const dest = path.join(root, "gifs", `${gif.slug}.gif`);
  if (await access(dest).then(() => true, () => false)) {
    console.log(`✓ ${gif.title} (déjà présent)`);
    continue;
  }
  let ok = false;
  for (const id of gif.giphy) {
    try {
      const res = await fetch(`https://media.giphy.com/media/${id}/giphy.gif`);
      const type = res.headers.get("content-type") || "";
      if (!res.ok || !type.startsWith("image/")) continue;
      await writeFile(dest, Buffer.from(await res.arrayBuffer()));
      console.log(`✓ ${gif.title} ← ${id}`);
      ok = true;
      break;
    } catch {}
  }
  if (!ok) {
    missing++;
    console.log(`✗ ${gif.title} : introuvable, ajoute gifs/${gif.slug}.gif à la main`);
  }
}
process.exitCode = missing ? 1 : 0;
