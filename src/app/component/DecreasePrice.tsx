import Link from "next/link";
import { MarketPrice } from "./IncreasePrice";
import ProductCart from "./ProductCart";

const DecreasePrice = async() => {

    // const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products')//api-1
    // const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products')//api-2
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products')//api-main
        const data = await res.json()
    
        const increasedProducts : MarketPrice[] = data.filter((product : MarketPrice) => product.change.dir ==='down')
        const sortedProducts = increasedProducts.sort((a, b) => b.change.pct - a.change.pct);
        const products = sortedProducts.slice(0, 6)

    return (
        <div className='max-w-7xl mx-auto mt-5'>
            <h1 className='text-2xl font-bold mb-3'> <span className="text-green-500">▼</span> আজকে দাম কমেছে</h1>
            <div>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5'>
                {products.map((product) => <Link href={`/product/${product.id}`} key={product.id}>
                <ProductCart product={product} /></Link>)}
            </div>
            </div>
        </div>
    );
};

export default DecreasePrice;