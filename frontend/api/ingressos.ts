import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req: any, res: any) {
  try {
    const dbPath = join(process.cwd(), 'frontend', 'db.json');
    const json = JSON.parse(readFileSync(dbPath, 'utf-8'));
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(json.ingressos ?? []));
  } catch {
    res.status(500).send(JSON.stringify({ error: 'Falha ao ler ingressos' }));
  }
}
