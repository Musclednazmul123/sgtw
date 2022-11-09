import { getAll, createPack } from '../helpers/packs.js';

export default function managePacks(app) {
  app.get('/api/packs', (req, res) => getAll(req, res, app));
  app.post('/api/packs', (req, res) => createPack(req, res, app));
}
