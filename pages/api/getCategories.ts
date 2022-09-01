import type { NextApiRequest, NextApiResponse } from "next";
import { categoryQuery } from "../../util/queries";
import { client } from "../../util/sanity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const categories = await client.fetch(categoryQuery);

    res.status(200).json(categories);
  }
}
