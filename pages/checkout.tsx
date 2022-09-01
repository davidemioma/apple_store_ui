import React, { useState } from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import { cartSelector, totalAmount } from "../store/cart-slice";
import Header from "../components/Header";
import EmptyCart from "../components/EmptyCart";
import CartItem from "../components/CartItem";
import { ChevronDownIcon, LightningBoltIcon } from "@heroicons/react/outline";
import { fetchPostJSON } from "../util/apiHelpers";
import getStripe from "../util/getStripe";
import { Stripe } from "stripe";

const Checkout = () => {
  const cart = useSelector(cartSelector);

  const total = useSelector(totalAmount);

  const [loading, setLoading] = useState(false);

  const createCheckoutSession = async () => {
    setLoading(true);

    const stripe = await getStripe();

    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      "/api/stripe",
      { items: cart }
    );

    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);

      return;
    }

    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
    });

    if (error) {
      alert(error.message);

      console.warn(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-screen overflow-hidden bg-[#e7ecee]">
      <Head>
        <title>Cart - Apple Redesign</title>

        <link rel="icon" href="/apple-logo.png" />
      </Head>

      <Header />

      <main className="mx-auto max-w-5xl overflow-hidden px-6 pt-6 pb-44 lg:px-4">
        {cart.length > 0 ? (
          <div>
            <h1 className="mb-4 text-3xl font-semibold lg:text-4xl">
              Review your bag.
            </h1>

            <p>Free delivery and free returns.</p>

            <div className="mt-8 mb-5">
              {cart?.map((item, i) => (
                <CartItem key={i} item={item} />
              ))}
            </div>

            <div className="ml-auto max-w-3xl">
              <div className="border-b border-gray-300 py-3">
                <div className="flex items-center justify-between">
                  <p>Subtotal</p>

                  <p>${total.toFixed(2)}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p>Shipping</p>

                  <p>FREE</p>
                </div>

                <div className="flex items-center justify-between">
                  <p>Estimated tax for:</p>

                  <p>$-</p>
                </div>

                <div className="flex items-center space-x-1 text-blue-500">
                  <p>Enter zip code</p>

                  <ChevronDownIcon className="h-6 w-6" />
                </div>
              </div>

              <div className="flex items-center justify-between py-3 pb-10 text-xl font-semibold">
                <p>Total</p>

                <p>${total.toFixed(2)}</p>
              </div>

              <p className="mb-3 text-xl font-semibold">
                How would you like to check out?
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="card md:col-start-2">
                  <h2 className="text-center text-xl font-semibold">
                    Pay in full
                    <br />${total.toFixed(2)}
                  </h2>

                  <button
                    onClick={createCheckoutSession}
                    className="cardBtn mt-10"
                  >
                    <LightningBoltIcon className="h-6" />

                    {loading ? (
                      <div className="h-6 w-6 animate-spin rounded-full border-b border-white" />
                    ) : (
                      <p>Checkout</p>
                    )}
                  </button>
                </div>

                <div className="card md:row-start-1">
                  <h2 className="text-center text-xl font-semibold">
                    Pay Monthly
                    <br />
                    with Apple Card
                    <br />
                    $283.16/mo. at 0% APR◊
                  </h2>

                  <button className="cardBtn my-3 px-8">
                    Check out with apple card monthly installments
                  </button>

                  <p className="w-[60%] text-center text-sm">
                    $0.00 due today, which includes applicable full-price items,
                    down payments, shipping, and taxes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </main>
    </div>
  );
};

export default Checkout;
