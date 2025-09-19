/*
  Build-time manifest generator for resources documents
  - Scans public/documents/resources/*
  - Emits public/documents/resources.json (array of documents)
  - Intended to run in Netlify build (via `npm run generate:docs`)
*/

import { promises as fs } from 'fs';
import * as path from 'path';

// Adjust these relative to project root
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const RESOURCES_DIR = path.join(PUBLIC_DIR, 'documents', 'resources');
const OUTPUT_JSON = path.join(PUBLIC_DIR, 'documents', 'resources.json');

// Minimal mime map by extension
const mimeByExt: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.csv': 'text/csv',
  '.txt': 'text/plain',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

function inferMime(file: string): string {
  const ext = path.extname(file).toLowerCase();
  return mimeByExt[ext] || 'application/octet-stream';
}

function toUrlPath(absFile: string): string {
  // Convert absolute path under public/ to web path
  const rel = path.relative(PUBLIC_DIR, absFile).split(path.sep).join('/');
  return `/${rel}`;
}

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      const nested = await walk(full);
      out.push(...nested);
    } else if (ent.isFile()) {
      out.push(full);
    }
  }
  return out;
}

function baseName(file: string) {
  return path.basename(file);
}

function makeId(url: string) {
  // Simple stable id from URL path
  return Buffer.from(url).toString('base64').replace(/=+$/g, '');
}

async function main() {
  // Verify resources directory exists
  try {
    await fs.access(RESOURCES_DIR);
  } catch {
    console.warn(`[generate-docs-manifest] Directory does not exist: ${RESOURCES_DIR}`);
    await ensureDir(path.dirname(OUTPUT_JSON));
    await fs.writeFile(OUTPUT_JSON, '[]', 'utf8');
    console.log(`[generate-docs-manifest] Wrote empty manifest: ${OUTPUT_JSON}`);
    return;
  }

  const files = await walk(RESOURCES_DIR);

  const docs = await Promise.all(
    files.map(async (abs) => {
      const stat = await fs.stat(abs);
      const url = toUrlPath(abs);
      const name = baseName(abs);
      const originalName = name; // can be changed if you have mapping
      const type = inferMime(abs);
      const size = stat.size;
      const uploadedAt = new Date(stat.mtimeMs).toISOString();
      return {
        id: makeId(url),
        name,
        originalName,
        url,
        size,
        type,
        uploadedAt,
      };
    })
  );

  await ensureDir(path.dirname(OUTPUT_JSON));
  await fs.writeFile(OUTPUT_JSON, JSON.stringify(docs, null, 2), 'utf8');
  console.log(`[generate-docs-manifest] Wrote ${docs.length} docs -> ${OUTPUT_JSON}`);
}

main().catch((err) => {
  console.error('[generate-docs-manifest] Failed:', err);
  process.exit(1);
});
