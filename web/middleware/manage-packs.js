import { getAll } from '../helpers/packs.js';

export default function managePacks(app) {
  app.get('/api/packs', (req, res) => getAll(req, res, app));
}
