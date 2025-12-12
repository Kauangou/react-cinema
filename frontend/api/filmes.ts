import { readFileSync } from 'fs';
import { join } from 'path';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function handler(req: any, res: any) {
  try {
    const dbPath = join(process.cwd(), 'frontend', 'db.json');
    const json = JSON.parse(readFileSync(dbPath, 'utf-8'));
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(json.filmes ?? []));
  } catch {
    res.status(500).send(JSON.stringify({ error: 'Falha ao ler filmes' }));
  }
}
