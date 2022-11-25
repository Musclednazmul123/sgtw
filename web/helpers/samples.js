import getClient from '../middleware/get-client.js';
import { uploadFileToS3, deletefiles3 } from './file-up-dos.js';
import fs from 'fs';

//handle samples creation
// id: "gid:\/\/shopify\/ProductVariant\/${req.body.variantid}",

export async function createSamples(req, res, app) {
  try {
    if (req.file) {
      //upload files to digitalocean space
      const stage = await uploadFileToS3({
        fileName: req.file.filename,
        contentType: req.file.mimetype,
        destination: req.file.path,
      });
      //delete files from the server
      console.log(stage);
      fs.unlinkSync(req.file.path);
    } else {
      return res.send('File is require');
    }
    const client = await getClient(req, res, app);
    const data = await client.query({
      data: {
        query: `mutation productVariantCreate($input: ProductVariantInput!) {
          productVariantCreate(input: $input) {
            product {
              id
              title
            }
            productVariant {
              createdAt
              displayName
              id
              inventoryItem {
                unitCost {
                  amount
                }
                tracked
              }
              inventoryPolicy
              inventoryQuantity
              price
              product {
                id
              }
              title
            }
            userErrors {
              field
              message
            }
          }
        }`,
        variables: {
          input: {
            inventoryItem: {
              cost: 0.0,
              tracked: false,
            },
            inventoryPolicy: 'DENY',
            inventoryQuantities: {
              availableQuantity: 1000,
              locationId: 'gid://shopify/Location/67371466892',
            },
            price: 0.0,
            productId: `gid:\/\/shopify\/Product\/${req.params.id}`,
            requiresShipping: false,
            options: 'Samples',
          },
        },
      },
    });

    // save the data to mongo db database

    return res.send(data);
  } catch (err) {
    console.log(err.response);
  }
}
