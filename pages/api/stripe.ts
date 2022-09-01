import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { CartItem } from "../../types";
import { urlFor } from "../../util/sanity";

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`, {
  apiVersion: "2022-08-01",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const products: CartItem[] = req.body.items;

    try {
      const session: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: products.map((item) => ({
            price_data: {
              currency: "usd",
              product_data: {
                name: item.title,
                images: [urlFor(item.image[0]).url()],
              },
              unit_amount: +item.price * 100,
            },
            quantity: item.quantity,
          })),
          payment_intent_data: {},
          mode: "payment",
          success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/checkout`,
          metadata: {
            images: JSON.stringify(
              products.map((item) => urlFor(item.image[0]).url())
            ),
          },
        });

      res.status(200).json(session);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";

      res.status(500).json({ status: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");

    res.status(405).end("Method Not Allowed");
  }
}
