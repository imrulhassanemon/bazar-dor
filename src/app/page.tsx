import Image from "next/image";
import Link from "next/link";
import IncreasePrice from "./component/IncreasePrice";

export default function Home() {

  const todaysDate = new Date().toLocaleDateString('bn-BD',{dateStyle:'full'})

  return (
    <div>
      <section className="bg-[#f0f5f0] px-3 py-3 sm:px-5 lg:px-6">
        {" "}
        <div className="mx-auto grid min-h-85 max-w-7xl grid-cols-1 items-center overflow-hidden rounded-[28px] border border-[#dce6dd] bg-[#fbfdfb] px-5 py-8 sm:px-8 md:min-h-[370px] md:grid-cols-[1.3fr_0.7fr] md:px-10 lg:min-h-[425px] lg:px-16">
          {" "}
          {/* Left content */}{" "}
          <div className="relative z-10 max-w-[680px]">
            {" "}
            <span className="inline-flex rounded-full bg-[#e1f1e6] px-4 py-1.5 text-sm font-semibold text-emerald-700 sm:text-base">
              {" "}
              {todaysDate}
            </span>{" "}
            <h1 className="mt-4 max-w-[620px] text-3xl font-extrabold leading-[1.35] tracking-tight text-[#19271e] sm:text-4xl lg:text-[44px] lg:leading-[1.25]">
              {" "}
              আজকের বাজারের দাম এক নজরে{" "}
            </h1>{" "}
            <p className="mt-4 max-w-[640px] text-base leading-7 text-[#667168] sm:text-lg sm:leading-8">
              {" "}
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক
              জায়গায়।{" "}
            </p>{" "}
            <Link
              href="/products"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#008b43] px-5 py-3 text-sm font-bold text-white shadow-md shadow-emerald-800/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#007538] hover:shadow-lg sm:text-base"
            >
              {" "}
              সব পণ্য দেখুন{" "}
            </Link>{" "}
          </div>{" "}
          {/* Right illustration */}{" "}
          <div className="mx-auto mt-8 w-full max-w-[350px] md:mt-0 md:max-w-[390px]">
            {" "}
            <svg
              viewBox="0 0 360 300"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Basket filled with colorful fresh vegetables"
              className="h-auto w-full"
            >
              {" "}
              {/* Ground shadow */}{" "}
              <ellipse cx="180" cy="274" rx="148" ry="18" fill="#e5e8e5" />{" "}
              {/* Red vegetable */}{" "}
              <path
                d="M87 134 C84 111 103 88 128 88 C151 88 171 111 170 138 C169 164 149 180 125 180 C102 180 86 161 87 134Z"
                fill="#f44349"
              />{" "}
              <ellipse cx="113" cy="120" rx="10" ry="18" fill="#ff8b89" />{" "}
              <path
                d="M127 88 Q135 68 157 63"
                fill="none"
                stroke="#149447"
                strokeWidth="10"
                strokeLinecap="round"
              />{" "}
              {/* Green vegetable */}{" "}
              <path
                d="M174 119 C164 89 182 62 211 59 C240 57 262 82 260 113 C259 144 242 161 214 162 C190 162 175 145 174 119Z"
                fill="#20c55a"
              />{" "}
              <ellipse cx="195" cy="97" rx="10" ry="17" fill="#85ecaa" />{" "}
              <path
                d="M214 60 Q203 39 185 35"
                fill="none"
                stroke="#13833e"
                strokeWidth="10"
                strokeLinecap="round"
              />{" "}
              <path
                d="M214 60 Q220 38 238 29"
                fill="none"
                stroke="#13833e"
                strokeWidth="10"
                strokeLinecap="round"
              />{" "}
              {/* Purple vegetable */}{" "}
              <ellipse cx="92" cy="153" rx="27" ry="21" fill="#a855f7" />{" "}
              <path
                d="M92 132 Q95 119 109 111"
                fill="none"
                stroke="#159447"
                strokeWidth="8"
                strokeLinecap="round"
              />{" "}
              {/* Orange vegetable */}{" "}
              <ellipse cx="171" cy="144" rx="29" ry="21" fill="#fb7817" />{" "}
              <path
                d="M172 123 Q178 109 192 104"
                fill="none"
                stroke="#159447"
                strokeWidth="8"
                strokeLinecap="round"
              />{" "}
              {/* Yellow vegetable */}{" "}
              <ellipse cx="270" cy="148" rx="31" ry="23" fill="#f5a20b" />{" "}
              <path
                d="M269 125 Q274 111 288 107"
                fill="none"
                stroke="#159447"
                strokeWidth="8"
                strokeLinecap="round"
              />{" "}
              {/* Basket rim */}{" "}
              <path d="M64 174 L296 174 L281 202 L78 202 Z" fill="#97400c" />{" "}
              {/* Basket body */}{" "}
              <path
                d="M74 200 L286 200 L269 263 Q266 282 248 282 L112 282 Q94 282 90 263 Z"
                fill="#b95109"
              />{" "}
              {/* Basket woven lines */}{" "}
              <g
                fill="none"
                stroke="#873807"
                strokeWidth="6"
                strokeLinecap="round"
              >
                {" "}
                <path d="M101 203 L110 269" /> <path d="M139 203 L141 272" />{" "}
                <path d="M187 203 L187 272" /> <path d="M235 203 L228 269" />{" "}
                <path d="M278 203 L267 266" />{" "}
              </g>{" "}
            </svg>{" "}
          </div>{" "}
        </div>{" "}
      </section>

      <IncreasePrice/>
    </div>
  );
}
