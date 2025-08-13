import { promises as fs } from 'node:fs';
import path from 'node:path';

async function ensureManifestInRouteGroup(groupDir) {
  const source = path.join('.next', 'server', 'app', 'page_client-reference-manifest.js');
  const target = path.join('.next', 'server', 'app', groupDir, 'page_client-reference-manifest.js');

  try {
    // Skip if already exists
    await fs.access(target).then(() => true).catch(() => false);
    const exists = await fs
      .access(target)
      .then(() => true)
      .catch(() => false);
    if (exists) return;

    // Read from root app manifest
    const content = await fs.readFile(source, 'utf8');
    // Ensure directory exists
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, content, 'utf8');
    // eslint-disable-next-line no-console
    console.log(`Injected client-reference-manifest into ${groupDir}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(`Failed to inject manifest into ${groupDir}:`, err?.message || err);
  }
}

async function main() {
  const appDir = path.join('.next', 'server', 'app');
  const entries = await fs.readdir(appDir, { withFileTypes: true });
  const groupDirs = entries
    .filter(d => d.isDirectory() && d.name.startsWith('(') && d.name.endsWith(')'))
    .map(d => d.name);

  await Promise.all(groupDirs.map(ensureManifestInRouteGroup));
}

main().catch(err => {
  console.error('fix-manifests failed:', err);
  process.exit(0); // do not fail build on this step
});


