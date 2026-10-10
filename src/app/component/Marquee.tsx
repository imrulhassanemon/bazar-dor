import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

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
    dir: "up" | "down";
    pct: number;
  };
  markets: Array<{
    market: string;
    division: string;
    min: number;
    max: number;
  }>;
}

const Marquee = async () => {
  // const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products",); //api - 1
  // const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products",); //api - 2
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products",); //api - 3
  const data = await res.json();

  return (
    <div>
      <div className="w-full overflow-hidden border-y border-gray-200 bg-white">
        <MarqueeText
        direction="right"
        duration={10}
        >
          <div className="group flex w-max animate-marquee hover:[animation-play-state:paused]">
            {data.map((product: Product, index: number) => {
              const isUp = product.change.dir === "up";

              return (
                <div
                  key={`${product.id}-${index}`}
                  className="flex shrink-0 items-center gap-2 border-r border-gray-200 px-4 py-2.5 text-sm"
                >
                  {/* Product icon and name */}
                  <span className="text-base">
                    {product.image || product.categoryIcon}
                  </span>

                  <span className="whitespace-nowrap font-medium text-gray-700">
                    {product.nameBn}
                  </span>

                  {/* Current price */}
                  <span className="whitespace-nowrap font-semibold text-gray-800">
                    {product.today} টাকা/
                    {product.unit === "kg" ? "কেজি" : product.unit}
                  </span>

                  {/* Price movement */}
                  <span
                    className={`flex items-center gap-1 whitespace-nowrap text-xs font-bold ${
                      isUp ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    <span>{isUp ? "▲" : "▼"}</span>
                    {Math.abs(product.change.pct).toLocaleString("en-US", {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                    %
                  </span>
                </div>
              );
            })}
          </div>
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;
