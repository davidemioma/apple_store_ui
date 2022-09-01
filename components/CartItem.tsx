import React from "react";
import Image from "next/image";
import { CartItem } from "../types";
import { urlFor } from "../util/sanity";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../store/store";
import toast from "react-hot-toast";

interface Props {
  item: CartItem;
}

const CartItem = ({ item }: Props) => {
  const dispatch = useDispatch();

  const removeCartItemHandler = () => {
    dispatch(removeFromCart(item._id));

    toast.error(`${item.title} removed from cart`, {
      position: "bottom-center",
    });
  };

  return (
    <div className="flex items-end justify-between border-b border-gray-300 py-4 lg:items-center">
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-5">
        <div className="relative h-44 w-44">
          <Image
            src={urlFor(item.image[0]).url()}
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className="lg:flex lg:flex-col lg:space-y-5">
          <h2 className="text-xl font-semibold lg:text-2xl">{item.title}</h2>

          <div className="mb-4 mt-1 flex items-start space-x-1.5 lg:hidden">
            <p className="text-xl font-semibold">{item.quantity}</p>

            <ChevronDownIcon className="h-7 w-7 text-blue-500" />
          </div>

          <div className="flex items-start space-x-0.5">
            <p className="text-blue-500">Show product details</p>

            <ChevronDownIcon className="h-6 w-6 text-blue-500" />
          </div>
        </div>
      </div>

      <div className="mr-48 hidden items-start space-x-1.5 lg:ml-auto lg:inline-flex">
        <p className="text-xl font-semibold">{item.quantity}</p>

        <ChevronDownIcon className="h-7 w-7 text-blue-500" />
      </div>

      <div className="flex flex-col space-y-4">
        <p className="text-xl font-semibold">${item.price.toFixed(2)}</p>

        <button
          className="text-right text-blue-500"
          onClick={removeCartItemHandler}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
