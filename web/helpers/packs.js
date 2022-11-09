import getClient from '../middleware/get-client.js';

//getting all products or packs
export async function getAll(req, res, app) {
  const queryString = `{
    products (first: 10) {
      edges {
        node {
          id
          title
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

export async function createPack(req, res, app) {
  const createnew = `mutation productCreate($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
        title
      }
    }
  }`;

  const imageUpdate = `mutation productCreateMedia($media: [CreateMediaInput!]!, $productId: ID!) {
    productCreateMedia(media: $media, productId: $productId) {
      media {
        # Media fields
      }
    }
  }`;

  console.log('start');
  console.log(req.body.file);
  try {
    const client = await getClient(req, res, app);
    const pack = await client.query({
      data: {
        query: createnew,
        variables: {
          input: {
            title: `${req.body.title}`,
            variants: [{ price: req.body.price || 0 }],
          },
        },
      },
    });
    if (req.body.image) {
      console.log(pack.body.data.productCreate.product.id);
      await client.query({
        data: {
          query: imageUpdate,
          variables: {
            input: {
              productId: pack.body.data.productCreate.product.id,
              media: {
                alt: req.body.image.name,
                mediaContentType: req.body.image.type,
                originalSource: req.body.image,
              },
            },
          },
        },
      });
      console.log(req.body.image);
    }
    res.send(pack);
  } catch (error) {
    console.log(error);
  }
}
