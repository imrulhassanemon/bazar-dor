"use client";

import ProductCart from "@/app/component/ProductCart";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
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
    dir: string;
    pct: number;
  };
  markets: Market[];
}

interface CategoryClientProps {
  params: Promise<{ category: string }>;
}

export default function CategoryClient({ params }: CategoryClientProps) {
  const [categorySlug, setCategorySlug] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Resolve route params
  useEffect(() => {
    let active = true;

    params.then((result) => {
      if (active) {
        setCategorySlug(result.category);
      }
    });

    return () => {
      active = false;
    };
  }, [params]);

  // Fetch products
  useEffect(() => {
    if (!categorySlug) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(categorySlug)}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await res.json();

        // Supports either an array or { data: [...] }
        const productList = Array.isArray(result)
          ? result
          : result.data;

        if (!Array.isArray(productList)) {
          throw new Error("Invalid product data");
        }

        setProducts(productList);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  // Sort products by today's price
  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "price-asc") {
      result.sort((a, b) => a.today - b.today);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sort]);

  if (loading) {
    return (
      <div className="mx-auto mt-10 max-w-7xl p-6">
        পণ্য লোড হচ্ছে...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mt-10 max-w-7xl p-6 text-red-600">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="mx-auto mt-10 max-w-7xl p-6">
        কোনো পণ্য পাওয়া যায়নি।
      </div>
    );
  }

  const categoryInfo = products[0];

  return (
    <div className="mx-auto mt-10 max-w-7xl px-4">
      <section className="w-full space-y-6">
        {/* Category Header */}
        <div className="flex min-h-[104px] items-center gap-5 rounded-2xl border border-[#dfe7df] bg-[#fbfcfa] px-6 py-5 sm:px-8">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#eff5ed] text-3xl">
            {categoryInfo.categoryIcon}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#18271b]">
              {categoryInfo.categoryNameBn}
            </h2>

            <p className="mt-1 text-sm text-[#647368] sm:text-base">
              {products.length.toLocaleString('bn-BD')} টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* Product Count and Sorting */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#637267] sm:text-base">
            মোট {products.length.toLocaleString('bn-BD')} টি পণ্য দেখানো হচ্ছে
          </p>

          <div className="flex items-center gap-3">
            <label
              htmlFor="price-sort"
              className="shrink-0 text-sm font-medium text-[#647368]"
            >
              সাজান
            </label>

            <select
              id="price-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="min-w-40 cursor-pointer rounded-xl border border-[#d3ddd4] bg-[#fbfcfa] px-3 py-2.5 text-sm text-[#253329] outline-none focus:border-[#64866a] focus:ring-2 focus:ring-[#64866a]/20"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">
                দাম: কম থেকে বেশি
              </option>
              <option value="price-desc">
                দাম: বেশি থেকে কম
              </option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}><ProductCart key={product.id} product={product} /></Link>
        ))}
      </div>
    </div>
  );
}