import { getAll, createPack } from '../helpers/packs.js';
import fileupload from 'express-fileupload';

export default function managePacks(app) {
  app.get('/api/packs', (req, res) => getAll(req, res, app));
  app.post('/api/packs', fileupload({ createParentPath: true }), (req, res) =>
    createPack(req, res, app)
  );
}
