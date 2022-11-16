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
async function productImgUp(client, file) {
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
    const stage = await client.query({
      data: {
        query: createStage,
        variables: {
          input: [
            {
              fileSize: file.size.toString(),
              filename: file.filename,
              httpMethod: 'POST',
              mimeType: file.mimetype,
              resource: 'IMAGE',
            },
          ],
        },
      },
    });

    return stage.body.data.stagedUploadsCreate;
  } catch (err) {
    console.log(err);
    return;
  }
}

//image upload to shopify
// ${stage.stagedTargets[0].resourceUrl}
async function upload(client, file, productId) {
  try {
    const stage = await productImgUp(client, file);
    console.log(stage);
    const imageUpdate = `mutation {
      productCreateMedia(
      media: {
        alt: "image",
        mediaContentType: IMAGE,
        originalSource: "https://static.wixstatic.com/media/192974_3b035943874e45e9999bcf2b0b3e3374~mv2_d_5616_3744_s_4_2.jpeg/v1/fill/w_640,h_504,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/192974_3b035943874e45e9999bcf2b0b3e3374~mv2_d_5616_3744_s_4_2.jpeg",
      }, 
      productId: "${productId}") {
        media {
          alt
          mediaContentType
          status
        }
      }
    }`;

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

    if (req.file) {
      const productId = pack.body.data.productCreate.product.id;
      const file = req.file;
      // console.log(pack.body.data.productCreate.product.id);
      const image = await upload(client, file, productId);
      console.log(image);
    }
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
