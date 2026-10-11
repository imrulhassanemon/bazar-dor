
"use client";

import { useEffect, useState } from "react";

export default function TodaysDate() {
  const [todaysDate, setTodaysDate] = useState<string>("");

  useEffect(() => {
    const date: string = new Date().toLocaleDateString("bn-BD", {
      dateStyle: "full",
    });

    setTodaysDate(date);
  }, []);

  return (
    <span className="inline-flex rounded-full bg-[#e1f1e6] px-4 py-1.5 text-sm font-semibold text-emerald-700 sm:text-base">
      {todaysDate || "আজকের তারিখ"}
    </span>
  );
}
