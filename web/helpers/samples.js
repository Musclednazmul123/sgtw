import getClient from '../middleware/get-client.js';
import { uploadFileToS3, deletefiles3 } from './file-up-dos.js';
import fs from 'fs';
import { packsModel } from '../model/pack.model.js';

//handle samples creation
// id: "gid:\/\/shopify\/ProductVariant\/${req.body.variantid}",

export async function createSamples(req, res, app) {
  console.log('request receve')
  try {
    if (req.file) {
      //upload files to digitalocean space
      const stage = await uploadFileToS3({
        fileName: req.file.filename,
        contentType: req.file.mimetype,
        destination: req.file.path,
      });
      //delete files from the server
      // console.log("stage"+stage);
      fs.unlinkSync(req.file.path);
      const client = await getClient(req, res, app);
      const data = await client.query({
        data: {
          "query": `mutation productVariantCreate($input: ProductVariantInput!) {
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
          "variables": {
            "input": {
              "inventoryItem": {
                "cost": 50,
                "tracked": false
              },
              "inventoryPolicy": "DENY",
              "inventoryQuantities": {
                "availableQuantity": 1000,
                "locationId": "gid://shopify/Location/67371466892"
              },
              "price": 0.0,
              "productId": `gid:\/\/shopify\/Product\/${req.body.id}`,
              "requiresShipping": false,
              "options": `${req.file.filename}`
            }
          },
        },
      });
      
      // save the data to mongo db database
      
      const pack = await packsModel.findOneAndUpdate(
        {productId: `gid://shopify/Product/${req.body.id}`},{ $push: { variants: {
          filesurl:stage.Url,
          variant_id:data.body.data.productVariantCreate.productVariant.id,
          title:data.body.data.productVariantCreate.productVariant.displayName.replace(".", " "),
          price: data.body.data.productVariantCreate.productVariant.price,
          sales: req.body.sales || 0,
          downloads:req.body.downloads || 0,
          status:req.body.status || true
        }}});
        
      console.log(data.body.data.productVariantCreate.productVariant)
      return res.send({data:data});
    } else {
      return res.send({status:'File is require'});
    }
  } catch (err) {
    console.log(err);
  }
}


//delete samples 
export async function deleteSample(req, res, app){
  try{
    const client = await getClient(req, res, app);

    //delete variant from shopify
    const data = await client.query({
      data: {
        "query": `mutation productVariantDelete($id: ID!) {
          productVariantDelete(id: $id) {
            deletedProductVariantId
            product {
              id
              title
            }
            userErrors {
              field
              message
            }
          }
        }`,
        "variables": {
          "id": `${req.body.variantId}`
        },
      },
    });

    //delete from database
    await packsModel.findOneAndUpdate(
      {productId: req.body.productId},
      { $pull: { variants: { variant_id: req.body.variantId }}},
      { safe: true, multi: false }
    );

    //delete files from digitalocean
    await deletefiles3(req.body.filesurl)
    res.send({data:data})

  }catch(error){
    console.log(error.response.errors)
  }
}