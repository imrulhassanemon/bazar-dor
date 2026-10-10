
import { notFound } from "next/navigation";

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
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
}

interface ProductDetailsProps {
  product: Product;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

const formatPrice = (price: number) => price.toLocaleString("bn-BD");

const unitLabel = (unit: string) => {
  switch (unit) {
    case "kg":
      return "কেজি";
    case "litre":
      return "লিটার";
    case "piece":
      return "পিস";
    default:
      return unit;
  }
};

// Product details UI
function ProductDetails({ product }: ProductDetailsProps) {
  const { change } = product;


  const changeColor =
    change.dir === "up"
      ? "text-red-500 bg-red-50"
      : change.dir === "down"
        ? "text-green-600 bg-green-50"
        : "text-gray-500 bg-gray-100";

  const changeIcon =
    change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "—";

  const minPrices = product.markets.map((market) => market.min);
  const maxPrices = product.markets.map((market) => market.max);

  const lowestPrice = minPrices.length ? Math.min(...minPrices) : 0;
  const highestPrice = maxPrices.length ? Math.max(...maxPrices) : 0;

  const increasedtaka = product.today - product.yesterday;
  const decrease = product.yesterday - product.today;
  console.log(increasedtaka);

  return (
    <main className="mx-auto max-w-6xl space-y-5 px-4 py-6 text-[#183126] sm:px-6">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
        <span>হোম</span>
        <span>›</span>
        <span>{product.categoryNameBn}</span>
        <span>›</span>
        <span className="text-green-700">{product.nameBn}</span>
      </div>

      {/* Product Header */}
      <section className="flex items-center justify-between gap-4 rounded-xl border border-[#dce6dd] bg-[#fbfdfb] p-4 sm:p-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#eff5ef] text-3xl">
            {product.image || product.categoryIcon}
          </div>

          <div className="min-w-0">
            <h1 className="text-xl font-bold sm:text-2xl">{product.nameBn}</h1>
            <p className="text-sm text-gray-500">
              প্রতি {unitLabel(product.unit)} .{product.categoryNameBn}
            </p>
            <p className="mt-1 text-xs text-gray-500">
                গতকালের তুলনায় আজকে{" "}
              {change.dir === "up" ? (
                <>
                  <span className="font-semibold"> বেড়েছে </span>
                  {increasedtaka.toLocaleString('bn-BD')}
                </>
              ) : (
                <>
                <span className="font-semibold">কমেছে {decrease.toLocaleString('bn-BD')} </span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="shrink-0 rounded-xl bg-[#f0f5f0] px-3 py-2 text-right">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-2xl font-bold">{formatPrice(product.today)}</p>
          <p className="text-xs text-gray-500">
            টাকা / {unitLabel(product.unit)}
          </p>

          <span
            className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${changeColor}`}
          >
            {changeIcon} {formatPrice(Math.abs(change.pct))}%
          </span>
        </div>
      </section>

      {/* Price Summary */}
      <section className="rounded-xl border border-[#dce6dd] bg-[#fbfdfb] p-4">
        <h2 className="mb-3 font-bold">দামের সারসংক্ষেপ</h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { label: "গতকালকের দাম", price: product.yesterday },
            { label: "গত সপ্তাহের দাম", price: product.lastWeek },
            { label: "গত মাসের দাম", price: product.lastMonth },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-[#dce6dd] p-3"
            >
              <p className="text-xs text-gray-500">{item.label}</p>
              <p className="mt-1 text-lg font-bold">
                {formatPrice(item.price)} টাকা
              </p>
              <p className="text-xs text-gray-500">
                প্রতি {unitLabel(product.unit)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-[#f0f5f0] p-3">
            <p className="text-xs text-gray-500">বাজারের সর্বনিম্ন দাম</p>
            <p className="font-bold text-green-700">
              {formatPrice(lowestPrice)} টাকা
            </p>
          </div>

          <div className="rounded-lg bg-[#f0f5f0] p-3">
            <p className="text-xs text-gray-500">বাজারের সর্বোচ্চ দাম</p>
            <p className="font-bold text-red-500">
              {formatPrice(highestPrice)} টাকা
            </p>
          </div>
        </div>
      </section>

      {/* Market Price Table */}
      <section className="rounded-xl border border-[#dce6dd] bg-[#fbfdfb] p-3 sm:p-4">
        <h2 className="mb-3 font-bold">বাজারভিত্তিক আজকের দাম</h2>

        <div className="overflow-x-auto rounded-xl border border-[#dce6dd]">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead className="bg-[#f6f9f6] text-gray-500">
              <tr>
                <th className="px-3 py-3 font-medium">বাজার</th>
                <th className="px-3 py-3 font-medium">বিভাগ</th>
                <th className="px-3 py-3 text-right font-medium">সর্বনিম্ন</th>
                <th className="px-3 py-3 text-right font-medium">সর্বোচ্চ</th>
                <th className="px-3 py-3 text-right font-medium">গড়</th>
              </tr>
            </thead>

            <tbody>
              {product.markets.map((market, index) => (
                <tr
                  key={`${market.market}-${market.division}`}
                  className={`border-t border-[#e4ebe4] ${
                    index % 2 === 0 ? "bg-white" : "bg-[#f0f5f0]"
                  }`}
                >
                  <td className="whitespace-nowrap px-3 py-3 font-medium">
                    {market.market}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-gray-500">
                    {market.division}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-right text-green-700">
                    {formatPrice(market.min)} টাকা
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-right text-red-500">
                    {formatPrice(market.max)} টাকা
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-right font-medium">
                    {formatPrice(Math.round((market.min + market.max) / 2))}{" "}
                    টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          * বাজারভেদে দাম পরিবর্তিত হতে পারে।
        </p>
      </section>

      <div className="flex items-center gap-2 text-sm font-medium text-green-800">
        <span>{product.categoryIcon}</span>
        <span>{product.categoryNameBn}</span>
      </div>
    </main>
  );
}

// Fetch product from API
export default async function ProductDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${id}`, //api main
    { cache: "no-store" },
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch product details");
  }

  const data = await res.json();

  // Supports APIs returning either a product or { product: ... }
  const product: Product = data.product ?? data;

  if (!product || !product.id) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
