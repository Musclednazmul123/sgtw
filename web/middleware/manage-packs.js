import {
  getAll,
  getProduct,
  createPack,
  remProduct,
  updateProduct,
} from '../helpers/packs.js';
import { createSamples, deleteSample } from '../helpers/samples.js';
import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/files');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + '-' + file.originalname.replace(/\s/g, '-');
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// const upload = multer({ storage: storage });

export default function managePacks(app) {
  app.get('/api/packs', (req, res) => getAll(req, res, app));
  app.get('/api/packs/:id', (req, res) => getProduct(req, res, app));
  app.delete('/api/packs/:id', (req, res) => remProduct(req, res, app));
  app.put('/api/packs/:id', upload.single('image'), (req, res) =>
    updateProduct(req, res, app)
  );
  app.post('/api/packs', upload.single('image'), (req, res) =>
    createPack(req, res, app)
  );

  //getting stage upload url for file upload functionality
  // app.post('/api/stageupload/create', upload.none(), (req, res) =>
  //   createStageUpload(req, res, app)
  // );

  //adding samples
  app.post('/api/packs/samples', upload.single('file'), (req, res) =>
    createSamples(req, res, app)
  );
  app.delete('/api/packs/samples', (req, res)=>deleteSample(req, res, app))
}
