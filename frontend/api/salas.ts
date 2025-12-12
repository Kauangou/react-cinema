import type { VercelRequest, VercelResponse } from '@vercel/node';
import { join } from 'path';
}
  }
    res.status(500).send(JSON.stringify({ error: 'Falha ao ler salas' }));
  } catch (e) {
    res.status(200).send(JSON.stringify(json.salas ?? []));
    res.setHeader('Content-Type', 'application/json');
    const json = JSON.parse(readFileSync(dbPath, 'utf-8'));
    const dbPath = join(process.cwd(), 'frontend', 'db.json');
  try {
export default function handler(req: VercelRequest, res: VercelResponse) {
import { readFileSync } from 'fs';

