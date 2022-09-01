import React from "react";
import Image from "next/image";
import { stripeProducts } from "../types";

interface Props {
  products: stripeProducts[];
}

const OrderSummary = ({ products }: Props) => {
  const subTotal = products.reduce(
    (total, item) => total + item.price.unit_amount / 100,
    0
  );
  const shippingFee = 20;

  return (
    <div>
      <div className="space-y-4 border-b pb-4">
        {products.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[gray] text-xs text-white">
                  {item.quantity}
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-md border border-gray-300 bg-[#F1F1F1] ">
                  <div className="relative h-7 w-7 animate-bounce rounded-md">
                    <Image
                      src="/apple-logo.png"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </div>
              </div>

              <p className="text-sm font-semibold">{item.description}</p>
            </div>

            <p className="text-sm font-semibold">
              ${item.price.unit_amount / 100}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-1 border-b py-4">
        <div className="flex items-center justify-between text-sm">
          <p className="text-[gray]">Subtotal</p>

          <p className="font-medium">${subTotal.toFixed(2)}</p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <p className="text-[gray]">Discount</p>

          <p className="font-medium"></p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <p className="text-[gray]">Shipping</p>

          <p className="font-medium">${shippingFee}</p>
        </div>
      </div>

      <div className="flex items-center justify-between py-4">
        <p>Total</p>

        <p className="flex items-center text-xl font-medium">
          <span className="mr-2 text-xs text-[gray]">USD</span> $
          {(subTotal + shippingFee).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
