
 const ProductCart = ({ product }) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <div className="w-full rounded-[20px] border border-[#dce5dd] bg-[#fbfdfb] p-[18px] transition-shadow hover:shadow-sm">
      {/* Product information */}
      <div className="flex items-center gap-3.5">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-[27px]">
          {product.image}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-[18px] font-bold leading-6 text-[#14251b]">
            {product.nameBn}
          </h3>
          <p className="text-sm text-[#7d8980]">
            প্রতি {product.unit === "kg" ? "কেজিতে" : product.unit}
          </p>
        </div>
      </div>

      {/* Price information */}
      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-sm text-[#7d8980]">আজকের দাম</p>
          <p className="text-[21px] font-bold leading-7 text-[#14251b]">
            ৳ {product.today} <span className="text-base">টাকা</span>
          </p>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            isUp
              ? "bg-[#f0f5f0] text-red-500"
              : isDown
                ? "bg-[#f0f5f0] text-green-600"
                : "bg-gray-100 text-gray-500"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}
          {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
        </span>
      </div>
    </div>
  );
};

export default ProductCart;
