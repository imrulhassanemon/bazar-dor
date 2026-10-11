
import Link from "next/link";
import { ShoppingBasket, ArrowLeft, TrendingUp } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F0F5F0] px-4">
      <section className="flex w-full max-w-2xl flex-col items-center text-center">
        {/* Basket Icon */}
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#E1EDE3]">
          <ShoppingBasket
            size={54}
            strokeWidth={1.6}
            className="text-[#D58A45]"
          />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold leading-tight text-[#172719] sm:text-3xl">
          পাতাটি খুঁজে পাওয়া যায়নি
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-xl text-sm leading-7 text-[#647268] sm:text-lg">
          আপনি যে পণ্য বা পাতাটি খুঁজছেন সেটি সরানো হয়েছে
          অথবা কখনো ছিল না।
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#07883F] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_3px_0_#056B32] transition-all duration-200 hover:bg-[#067535] hover:shadow-none active:translate-y-0.5 sm:text-base"
          >
            <ArrowLeft size={18} />
            হোম পেজে যান
          </Link>

          <Link
            href="/category/chal"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#26382B] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#172719] transition-colors duration-200 hover:bg-[#E1EDE3] sm:text-base"
          >
            <TrendingUp size={18} />
            বাজার তুলনা দেখুন
          </Link>
        </div>

        {/* Footer Note */}
        <p className="mt-10 text-xs text-[#849087]">
          বাজারদর জানুন, সচেতনভাবে কেনাকাটা করুন।
        </p>
      </section>
    </main>
  );
}
