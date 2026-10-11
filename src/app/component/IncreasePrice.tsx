export interface MarketPrice {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
  markets: Market[];
}

export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface PriceMarqueeProps {
  products: MarketPrice[];
}

import Link from 'next/link';
import ProductCart from './ProductCart.jsx';

const IncreasePrice = async () => {

    // const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products')//api - 1
    // const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products')//api - 2
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products')//api - main
    const data = await res.json()

    const increasedProducts : MarketPrice[] = data.filter((product : MarketPrice) => product.change.dir ==='up')
    const sortedProducts = increasedProducts.sort((a, b) => b.change.pct - a.change.pct);
    const products = sortedProducts.slice(0, 6)

    return (
        <div className='max-w-7xl mx-auto mt-5'>
            <h1 className='text-2xl font-bold mb-3'> <span className="text-red-500">▲</span> আজ দাম বেড়েছে</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5'>
                {products.map((product) => <Link href={`/product/${product.id}`} key={product.id}>
                <ProductCart product={product} /></Link>)}
            </div>
        </div>
    );
};

export default IncreasePrice;