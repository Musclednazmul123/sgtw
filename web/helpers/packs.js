import getClient from '../middleware/get-client.js';
import { uploadFileToS3, deletefiles3 } from './file-up-dos.js';
import { packsModel } from '../model/pack.model.js';
import fs from 'fs';

//getting all products or packs
export async function getAll(req, res, app) {
  const queryString = `{
    products (first: 10) {
      edges {
        node {
          id
          featuredImage{
            url
          }
        }
      }
    }
  }`;

  try {
    // const client = await getClient(req, res, app);
    // const packs = await client.query({
    //   data: queryString,
    // });
    const packs = await packsModel.find();

    // console.log('get all pack: ' + packs);
    res.send({ pack: packs });
  } catch (error) {
    console.log(error);
  }
}

//get single product
export async function getProduct(req, res, app) {
  const getone = `query {
    product(id: "gid:\/\/shopify\/Product\/${req.params.id}") {
      id
      title
      description
      totalVariants
      featuredImage{
        url
      }
      variants(first: 1) {
        edges {
          node {
            id
            price
          }
        }
      }
    }
  }`;

  try {
    const client = await getClient(req, res, app);
    const product = await client.query({
      data: getone,
    });

    const pack = await packsModel
      .findOne({ productId: `gid://shopify/Product/${req.params.id}` })
      .exec();

    console.log(pack);
    res.send({data:pack});
  } catch (error) {
    console.log(error);
  }
}

//delete product
export async function remProduct(req, res, app) {
  const deleteone = `mutation {
    productDelete(input: {id: "gid:\/\/shopify\/Product\/${req.params.id}"}) {
      deletedProductId
    }
  }`;

  try {
    const client = await getClient(req, res, app);
    const product = await client.query({
      data: deleteone,
    });

    console.log('product is: ' + product);
    const fileUrl = await packsModel
      .findOne({ productId: `gid://shopify/Product/${req.params.id}` })
      .exec();
    //delete the thumbnails mongodb
    if (fileUrl.thumbnail) {
      const deletefiles = deletefiles3(fileUrl.thumbnail);
      console.log('delete file is called:' + deletefiles);
    }
    for (let index = 0; index < fileUrl.variants.length; index++) {
      const element = fileUrl.variants[index].filesurl;
      deletefiles3(element)
    }

    console.log('file url: ' + fileUrl.thumbnail);
    // delete product from database
    const pack = await packsModel.deleteOne({
      productId: `gid://shopify/Product/${req.params.id}`,
    });

    console.log('Delete pack: ' + pack);
    res.send({status:'product delete success'});
  } catch (error) {
    console.log(error);
  }
}

//update product
export async function updateProduct(req, res, app) {
  //gid:\/\/shopify\/Product\/${req.params.id}
  try {
    const client = await getClient(req, res, app);
    const product = await client.query({
      data: `mutation {
        productUpdate(input: {
          id: "gid:\/\/shopify\/Product\/${req.params.id}", 
          variants: [
            { 
              id: "gid:\/\/shopify\/ProductVariant\/${req.body.variantid}",
              price: ${req.body.price || 0} 
            }
          ],
          title: "${req.body.title}"}
          ) {
          product {
            id
          }
        }
      }`,
    });

    if (req.file) {
      const productId = `gid:\/\/shopify\/Product\/${req.params.id}`;
      const file = req.file;
      // console.log(pack.body.data.productCreate.product.id);

      // update image from digital ocean
      const stage = await uploadFileToS3({
        fileName: file.filename,
        contentType: file.mimetype,
        destination: file.path,
      });
      console.log(stage.Url);

      fs.unlinkSync(file.path);
    }
    // update the pack info to our database

    // console.log(product);
    res.send({product:product});
  } catch (error) {
    console.log(error);
  }
}

//creating pack
export async function createPack(req, res, app) {
  const createnew = `mutation productCreate($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
        title
      }
    }
  }`;

  console.log(req.file);
  // return res.send('product is not created');
  try {
    const client = await getClient(req, res, app);
    const pack = await client.query({
      data: {
        query: createnew,
        variables: {
          input: {
            title: req.body.title,
            variants: [{ price: req.body.price || 0 }],
            descriptionHtml: req.body.description || '',
          },
        },
      },
    });

    let imagethumb;
    const productId = pack.body.data.productCreate.product.id;
    if (req.file) {
      const file = req.file;
      // console.log(pack.body.data.productCreate.product.id);
      const stage = await uploadFileToS3({
        fileName: file.filename,
        contentType: file.mimetype,
        destination: file.path,
      });
      console.log(stage.Url);

      imagethumb = stage.Url;
      fs.unlinkSync(file.path);
    }
    // save the pack info to our database
    const savepack = new packsModel({
      productId: productId,
      title: req.body.title,
      description: req.body.description || '',
      price: parseFloat(req.body.price || 0),
      thumbnail: imagethumb || '',
    });

    savepack.save();
    res.send({pack:pack});
  } catch (error) {
    console.log(error);
  }
}
