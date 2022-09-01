import React from "react";
import Image from "next/image";
import { ProductProps } from "../types";
import { urlFor } from "../util/sanity";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/store";
import toast from "react-hot-toast";

interface Props {
  product: ProductProps;
}

const Product = ({ product }: Props) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));

    toast.success(`${product.title} added to cart`, {
      position: "bottom-center",
    });
  };

  return (
    <div className=" flex h-fit w-[320px] flex-col space-y-3 rounded-xl bg-[#35383C] p-8 md:h-[500px] md:w-[400px] md:p-10">
      <div className="relative h-64 w-full md:h-72">
        <Image
          src={urlFor(product.image[0]).url()}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="flex flex-1 items-center justify-between space-x-3">
        <div className="flex flex-col space-y-2 text-xl text-white md:text-2xl">
          <p className="max-w-[180px] md:max-w-[250px]">{product.title}</p>

          <p>{product.price}</p>
        </div>

        <button
          onClick={addToCartHandler}
          className="gradient flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full"
        >
          <ShoppingCartIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};

export default Product;
