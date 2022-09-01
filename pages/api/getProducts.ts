import type { NextApiRequest, NextApiResponse } from "next";
import { productQuery } from "../../util/queries";
import { client } from "../../util/sanity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const products = await client.fetch(productQuery);

    res.status(200).json(products);
  }
}
