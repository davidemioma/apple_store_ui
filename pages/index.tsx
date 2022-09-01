import React, { useState } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ViewBtn from "../components/ViewBtn";
import { Category, ProductProps } from "../types";
import { fetchCategories, fetchProducts } from "../util/fetchData";
import Products from "../components/Products";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { cartSelector } from "../store/cart-slice";
import { getSession } from "next-auth/react";
import type { Session } from "next-auth";

interface Props {
  categories: Category[];
  products: ProductProps[];
  session: Session | null;
}

const Home = ({ categories, products }: Props) => {
  const [view, setView] = useState("Mac");

  const cart = useSelector(cartSelector);

  return (
    <div>
      <Head>
        <title>Apple Redesign</title>

        <link rel="icon" href="/apple-logo.png" />
      </Head>

      <Header />

      <main className="relative h-[200vh] bg-[#e7ecee]">
        <Banner />
      </main>

      <section
        id="product"
        className="relative z-40 -mt-[100vh] min-h-screen w-screen overflow-hidden bg-[#1b1b1b]"
      >
        <div className="flex flex-col space-y-10 py-16">
          <h1 className="text-center text-4xl font-medium tracking-wide text-white md:text-5xl">
            New Promos
          </h1>

          <div className="mx-auto flex max-w-sm items-center border-b border-[#747474] text-sm text-[#747474] sm:space-x-2 md:max-w-md md:text-base">
            {categories.map((category, i) => (
              <ViewBtn
                key={category._id}
                text={category.title}
                isActive={view === category.title}
                setView={() => setView(category.title)}
              />
            ))}
          </div>

          <Products
            products={products.filter((item) => item.category.title === view)}
          />

          <Link href="/checkout">
            <div className="fixed bottom-8 right-8 cursor-pointer">
              {cart.length > 0 && (
                <span className="gradient absolute -top-2 -right-1 flex h-7 w-7 items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}

              <div className="group flex h-16 w-16 items-center justify-center rounded-full bg-gray-300">
                <ShoppingBagIcon className="h-8 w-8 opacity-75 group-hover:opacity-100" />
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const categories = await fetchCategories();

  const products = await fetchProducts();

  const session = await getSession(context);

  return {
    props: {
      categories,
      products,
      session,
    },
  };
};

export default Home;
