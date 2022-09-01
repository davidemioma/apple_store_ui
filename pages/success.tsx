import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import OrderSummary from "../components/OrderSummary";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { fetchStripeProducts } from "../util/fetchData";
import { stripeProducts } from "../types";
import { useSession } from "next-auth/react";

interface Props {
  products: stripeProducts[];
}

const Success = ({ products }: Props) => {
  const { data: session } = useSession();

  const router = useRouter();

  const { session_id } = router.query;

  const [showSummary, setShowSummary] = useState(false);

  return (
    <div className="min-h-screen w-screen">
      <Head>
        <title>Success - Apple Redesign</title>

        <link rel="icon" href="/apple-logo.png" />
      </Head>

      <header className="mx-auto max-w-xl p-2 lg:hidden">
        <Link href="/">
          <div className="relative h-12 w-10 cursor-pointer">
            <Image src="/apple-logo.png" layout="fill" objectFit="contain" />
          </div>
        </Link>
      </header>

      <main className="w-screen lg:flex">
        <section className="lg:w-[60%]">
          <div className="mx-auto max-w-xl lg:px-3 lg:pt-24">
            <Link href="/">
              <div className="relative hidden h-16 w-14 cursor-pointer lg:inline-flex ">
                <Image
                  src="/apple-logo.png"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </Link>
          </div>

          <div className="lg:hidden">
            <div className="bg-[#fafafa]">
              <div className="border-t border-b border-gray-300">
                <div className="mx-auto flex max-w-xl items-center space-x-2 px-3 py-6">
                  <ShoppingCartIcon className="h-6 w-6" />

                  <p className="text-sm">Show order summary</p>

                  <button onClick={() => setShowSummary((prev) => !prev)}>
                    {showSummary ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>

                  <p className="flex-1 text-right text-xl font-medium">
                    $
                    {products
                      .reduce(
                        (total, item) => total + item.price.unit_amount / 100,
                        0
                      )
                      .toFixed(2)}
                  </p>
                </div>
              </div>

              {showSummary && (
                <div className="w-full border-b border-gray-300">
                  <div className="mx-auto max-w-xl p-4">
                    <OrderSummary products={products} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full">
            <div className="mx-auto max-w-xl px-3 py-8">
              <div className="flex items-center space-x-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-black">
                  <CheckIcon className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-sm">Order #{session_id?.slice(-5)}</p>

                  <p className="text-lg font-medium">
                    Thank you{" "}
                    {session ? session.user?.name?.split(" ")[0] : "Guest"}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col space-y-3">
                <div className="rounded-lg border border-gray-300 p-3">
                  <h2 className="mb-3">Your order is confirmed</h2>

                  <p className="border-b border-gray-300 pb-3 text-sm text-gray-500">
                    We’ve accepted your order, and we’re getting it ready. Come
                    back to this page for updates on your shipment status.
                  </p>

                  <p className="mt-3 mb-0.5 text-sm font-semibold text-gray-600">
                    Other tracking number:
                  </p>

                  <p className="text-sm">CNB21441622</p>
                </div>

                <div className="rounded-lg border border-gray-300 p-3">
                  <p className="mb-3">Order updates</p>

                  <p className="text-sm text-gray-500">
                    You’ll get shipping and delivery updates by email and text.
                  </p>
                </div>

                <div className="flex w-full items-center justify-between">
                  <p className="hidden text-sm lg:inline">
                    Need help?{" "}
                    <span className="cursor-pointer hover:underline">
                      Contact us
                    </span>
                  </p>

                  <button
                    className="gradient w-full rounded py-3 text-center text-sm font-semibold lg:w-5/12"
                    onClick={() => router.push("/")}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="hidden h-screen bg-[#fafafa] lg:inline lg:w-[40%]">
          <div className="mr-auto max-w-md py-10 px-6">
            <OrderSummary products={products} />
          </div>
        </section>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sessionId = context.query.session_id;

  const products = await fetchStripeProducts(`${sessionId}`);

  return {
    props: {
      products,
    },
  };
};

export default Success;
