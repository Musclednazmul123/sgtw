import { Shopify } from '@shopify/shopify-api';

export default async function getClient(req, res, app) {
  try {
    const session = await Shopify.Utils.loadCurrentSession(
      req,
      res,
      app.get('use-online-tokens')
    );
    const client = new Shopify.Clients.Graphql(
      session.shop,
      session.accessToken
    );

    return client;
  } catch (error) {
    console.log(error);
  }
}
