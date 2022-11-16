import getClient from '../middleware/get-client.js';

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
    const client = await getClient(req, res, app);
    const packs = await client.query({
      data: queryString,
    });

    res.send(packs);
  } catch (error) {
    console.log(error);
  }
}

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

    // console.log(product);
    res.send(product.body.data.product);
  } catch (error) {
    console.log(error);
  }
}

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

    // console.log(product);
    res.status(200).send('product delete success');
  } catch (error) {
    console.log(error);
  }
}

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

    // console.log(product);
    res.send(product);
  } catch (error) {
    console.log(error);
  }
}

//image stage upload
async function productImgUp(client, data) {
  const createStage = `mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
    stagedUploadsCreate(input: $input) {
      stagedTargets {
        url
        resourceUrl
        parameters {
          name
          value
        }
      }
      userErrors {
        field
        message
      }
    }
  }`;
  try {
    if (req.body.name) {
      const stage = await client.query({
        data: {
          query: createStage,
          variables: {
            input: [
              {
                fileSize: data.size,
                filename: data.name,
                httpMethod: 'POST',
                mimeType: data.type,
                resource: data.resource,
              },
            ],
          },
        },
      });

      return stage.body.data.stagedUploadsCreate;
    }
  } catch (err) {
    console.log(err);
    return;
  }
}

//image upload to shopify
async function upload(client, file, productId) {
  try {
    const stage = await productImgUp(client, data);
  } catch (err) {
    console.log(err);
  }
  const imageUpdate = `mutation {
    productCreateMedia(
    media: {
      alt: "",
      mediaContentType: IMAGE,
      originalSource: "${stage.resource}",
    }, 
    productId: "${productId}") {
      media {
        alt
        mediaContentType
        status
      }
    }
  }`;

  try {
    const image = await client.query({
      data: {
        query: imageUpdate,
      },
    });

    return image;
  } catch (err) {
    console.log(err);
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

    const productId = pack.body.data.productCreate.product.id;
    const file = req.file;
    // console.log(pack.body.data.productCreate.product.id);
    upload(client, file, productId);
    res.send(pack);
  } catch (error) {
    console.log(error.response);
  }
}

//handle samples creation
// id: "gid:\/\/shopify\/ProductVariant\/${req.body.variantid}",

export async function createSamples(req, res, app) {
  try {
    for (let i = 0; i < req.files.length(); i++) {
      console.log(req.files[i]);
    }
    // const client = await getClient(req, res, app);
    // const sample = await client.query({
    //   data: {
    //     query: `mutation {
    //       productUpdate(input: {
    //         id: "gid:\/\/shopify\/Product\/${req.params.id}",
    //         variants: [
    //           {
    //             title: ${req.body.title}
    //             price: ${req.body.price || 0}
    //           }
    //         ],
    //       }
    //     }`,
    //   },
    // });
    console.log(req.file);
  } catch (err) {
    console.log(err);
  }
}

//creating stage upload url
//IMAGE is resource
export async function createStageUpload(req, res, app) {
  const createStage = `mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
    stagedUploadsCreate(input: $input) {
      stagedTargets {
        url
        resourceUrl
        parameters {
          name
          value
        }
      }
      userErrors {
        field
        message
      }
    }
  }`;
  try {
    const client = await getClient(req, res, app);

    if (req.body.name) {
      const stage = await client.query({
        data: {
          query: createStage,
          variables: {
            input: [
              {
                fileSize: req.body.size,
                filename: req.body.name,
                httpMethod: 'POST',
                mimeType: req.body.type,
                resource: req.body.resource,
              },
            ],
          },
        },
      });

      res.send({ data: stage.body.data.stagedUploadsCreate });
    }
  } catch (err) {
    console.log(err.response);
  }
}
