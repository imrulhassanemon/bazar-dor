"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";
import { email, object } from "better-auth";
import { authClient, signIn, signUp } from "@/lib/auth-client";
import { error } from "console";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";

type AuthFormProps = {
  mode: "signup" | "signin";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const isSignup = mode === "signup";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (isSignup && password !== confirmPassword) {
    toast.error("দুটি পাসওয়ার্ড মিলছে না।");
    console.log(error);
    return;
  }

  if (password.length < 8) {
    toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
    console.log(error);
    return;
  }

  setLoading(true);

  const callbackURL = "/";

  console.log("Callback URL:", callbackURL);
  console.log("Signup email:", email);

  try {
    const result = isSignup
      ? await signUp.email({
          name,
          email,
          password,
          callbackURL,
        })
      : await signIn.email({
          email,
          password,
          callbackURL,
        })
        toast.success('সফল ভাবে সাইনইন হয়েছে।')
        ;

    console.log("Better Auth result:", result);
    console.log("Auth error:", result.error);
    console.log("Returned data:", result.data);

    if (result.error) {
      toast.error(result.error.message || "অনুরোধটি সফল হয়নি।");
      console.log(error);
      return;
    }

    console.log("Authentication successful!");
    console.log("Redirecting to:", callbackURL);

    router.push(callbackURL);
    router.refresh();
  } catch (err) {
    console.error("Authentication exception:", err);
    toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
  } finally {
    setLoading(false);
  }
  console.log(error);
  };

  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider:'google'
    })
    console.log(data);
    toast.success('সফল ভাবে সাইন ইন হয়েছে।')
  }

  const handleGithubLogin = async () => {
    const data = await authClient.signIn.social({
      provider:'github'
    })
    console.log(data);
    toast.success('সফল ভাবে সাইন ইন হয়েছে।')
  }


  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-[#fbfdfb] py-3 pl-11 pr-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4 py-10">
      <div className="w-full max-w-md">
        {/* Brand */}
        <Link href="/" className="mb-7 flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-800/20">
            <ShoppingCart size={27} strokeWidth={2.5} />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
              বাজার দর
            </h2>
            <p className="text-xs text-gray-500">আপনার বিশ্বস্ত বাজার সহায়ক</p>
          </div>
        </Link>

        {/* Auth Card */}
        <section className="rounded-2xl border border-[#e0e9e0] bg-white p-5 shadow-[0_12px_40px_rgba(22,60,35,0.06)] sm:p-8">
          <div className="mb-6">
            <span className="text-sm font-semibold text-emerald-700">
              {isSignup ? "আমাদের সাথে যোগ দিন" : "স্বাগতম"}
            </span>

            <h1 className="mt-2 text-2xl font-extrabold text-gray-900">
              {isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন করুন"}
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              {isSignup
                ? "বাজারের সর্বশেষ দর জানতে আপনার অ্যাকাউন্ট তৈরি করুন।"
                : "আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন।"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            {isSignup && (
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  নাম
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="যেমন: রহিম উদ্দিন"
                    autoComplete="name"
                    required
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                ইমেইল
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                পাসওয়ার্ড
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  minLength={8}
                  required
                  className={inputClass}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="পাসওয়ার্ড দেখুন বা লুকান"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            {isSignup && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  পাসওয়ার্ড নিশ্চিত করুন
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="আবার পাসওয়ার্ড লিখুন"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label="নিশ্চিতকরণ পাসওয়ার্ড দেখুন বা লুকান"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Forgot password */}
            {!isSignup && (
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-emerald-700 hover:underline"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white shadow-md shadow-emerald-800/20 transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-600/20"
            >
              {isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন করুন"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social buttons: UI only */}
          <div className="grid grid-cols-2 gap-3">
            <button
            onClick={handleGoogleSignIn}
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <svg viewBox="0 0 48 48" className="h-4 w-4" aria-hidden="true">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.95 46.98 31.85 46.98 24.55Z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 43.62 14.62 48 24 48Z"
                />
              </svg>
              Google
            </button>

            <button
            onClick={handleGithubLogin}
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <Image width={20} height={20} src={'/github.png'} alt="" />
              GitHub
            </button>
          </div>

          {/* Switch auth mode */}
          <p className="mt-6 text-center text-sm text-gray-500">
            {isSignup ? "আগেই অ্যাকাউন্ট আছে?" : "অ্যাকাউন্ট নেই?"}{" "}
            <Link
              href={isSignup ? "/signin" : "/signup"}
              className="font-bold text-emerald-700 hover:underline"
            >
              {isSignup ? "সাইন ইন করুন" : "অ্যাকাউন্ট তৈরি করুন"}
            </Link>
          </p>
        </section>

        <Link
          href="/"
          className="mt-6 block text-center text-sm text-gray-500 transition hover:text-emerald-700"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
