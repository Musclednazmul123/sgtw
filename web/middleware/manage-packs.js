import {
  getAll,
  getProduct,
  createPack,
  remProduct,
  updateProduct,
  createSamples,
  createStageUpload,
} from '../helpers/packs.js';
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
    cb(null, './tmp/data');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname.replace(' ', '-');
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// const upload = multer({ storage: storage });

export default function managePacks(app) {
  app.get('/api/packs', (req, res) => getAll(req, res, app));
  app.get('/api/packs/:id', (req, res) => getProduct(req, res, app));
  app.delete('/api/packs/:id', (req, res) => remProduct(req, res, app));
  app.put('/api/packs/:id', upload.none(), (req, res) =>
    updateProduct(req, res, app)
  );
  app.post('/api/packs', upload.single('file'), (req, res) =>
    createPack(req, res, app)
  );

  //getting stage upload url for file upload functionality
  // app.post('/api/stageupload/create', upload.none(), (req, res) =>
  //   createStageUpload(req, res, app)
  // );

  //adding samples
  app.post(
    '/api/packs/samples',
    upload.fields([{ name: 'files', maxCount: 10 }]),
    (req, res) => createSamples(req, res, app)
  );
}
