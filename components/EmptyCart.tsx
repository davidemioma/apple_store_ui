import React from "react";
import { useRouter } from "next/router";

const EmptyCart = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col space-y-4 py-5">
      <h1 className="text-3xl font-semibold lg:text-4xl">Your bag is empty.</h1>

      <p>Free delivery and free returns.</p>

      <button
        onClick={() => router.push("/")}
        className="gradient w-56 rounded p-2 text-center"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default EmptyCart;
