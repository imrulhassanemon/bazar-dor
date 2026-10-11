import React from "react";
import ProductCart from "./ProductCart";
import { MarketPrice } from "./IncreasePrice";
import Link from "next/link";

const AllProducts = async () => {
  // const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products')//api - 1
  // const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products"); //api - 2
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products"); //api - 2
  const allProducts: MarketPrice[] = await res.json();

  return (
    <div className=" max-w-7xl mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-3">সব প্রডাক্ট</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
        {allProducts.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}><ProductCart  product={product} /></Link>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
