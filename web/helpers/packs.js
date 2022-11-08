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
  console.log('hello world');
  try {
    const client = await getClient(req, res, app);
    const packs = await client.query({
      data: queryString,
    });
    console.log(packs);
    res.send(packs);
  } catch (error) {
    console.log(error);
  }
}
