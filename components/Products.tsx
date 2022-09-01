import React from "react";
import { ProductProps } from "../types";
import Product from "./Product";

interface Props {
  products: ProductProps[];
}

const Products = ({ products }: Props) => {
  return (
    <div className="mx-auto grid max-w-fit justify-items-center gap-8 px-8 pb-24 pt-10 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {products.map((item) => (
        <Product key={item._id} product={item} />
      ))}
    </div>
  );
};

export default Products;
