"use client";

import { useState } from "react";
import {
  User,
  Mail,
  CalendarDays,
  Edit3,
  Camera,
  Check,
  X,
} from "lucide-react";
import { updateUser, useSession } from "@/lib/auth-client";
import Loading from "@/loading";

interface ProfileUser {
  name: string;
  email: string;
}

interface InfoRowProps {
  label: string;
  value: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { data, isPending } = useSession();

  const [user, setUser] = useState<ProfileUser>({
    name: data?.user?.name || "",
    email: data?.user?.email || "",
  });

  const [formData, setFormData] = useState<ProfileUser>({
    name: data?.user?.name || "",
    email: data?.user?.email || "",
  });

  if (isPending || !data?.user) {
    return <Loading />;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (): Promise<void> => {
    try {
      const result = await updateUser({
        name: formData.name,
      });

      if (result.error) {
        console.error("Failed to update user:", result.error);
        return;
      }

      setUser((prev) => ({
        ...prev,
        name: formData.name,
      }));

      setIsEditing(false);
    } catch (error: unknown) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const handleCancel = (): void => {
    setFormData(user);
    setIsEditing(false);
  };

  const createdAt = data.user.createdAt;

  const banglaTime = createdAt
    ? new Date(createdAt).toLocaleDateString("bn-BD", {
        dateStyle: "long",
      })
    : "তথ্য পাওয়া যায়নি";

  return (
    <main className="min-h-screen bg-[#F0F5F0] text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-2xl border border-[#E1E8DE] bg-[#F5F7F2] p-6 sm:p-10">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#66736A]">
              Account
            </p>

            <h1 className="text-3xl font-black tracking-tight text-[#17251C] sm:text-4xl">
              আমার প্রোফাইল
            </h1>

            <p className="mt-2 text-sm text-[#66736A]">
              আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
            </p>
          </div>

          {/* Profile Hero */}
          <section className="relative mb-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#929B2A] to-[#176E3A]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#CCFF00]/10 via-transparent to-blue-500/5" />

            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                {/* User Info */}
                <div className="flex items-center gap-5">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[#CCFF00] text-3xl font-black text-black shadow-[0_0_35px_rgba(204,255,0,0.12)]">
                      {user.name.charAt(0).toUpperCase() || (
                        <User size={32} />
                      )}
                    </div>

                    <button
                      type="button"
                      className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl border-4 border-[#176E3A] bg-white text-black transition hover:bg-[#CCFF00]"
                      aria-label="Change profile picture"
                    >
                      <Camera size={15} />
                    </button>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {user.name}
                    </h2>

                    <div className="mt-2 flex items-center gap-2 text-sm text-white">
                      <Mail size={15} />
                      <span>{user.email}</span>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-xs text-white/80">
                      <CalendarDays size={14} />
                      <span>যোগ দিয়েছেন {banglaTime}</span>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    <Edit3 size={17} />
                    হালনাগাদ করুন
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Profile Details */}
          <div className="grid gap-6">
            <section className="rounded-3xl border border-white/10 bg-green-800 p-6 text-black lg:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    ব্যক্তিগত তথ্য
                  </h2>

                  <p className="mt-1 text-xs text-slate-300">
                    আপনার অ্যাকাউন্টের মৌলিক তথ্য
                  </p>
                </div>

                <User className="text-slate-300" size={20} />
              </div>

              {isEditing ? (
                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-slate-200"
                    >
                      নাম
                    </label>

                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      required
                      className="h-12 w-full rounded-xl border border-white/10 bg-[#070B14] px-4 text-sm text-white outline-none transition focus:border-[#CCFF00]/50 focus:ring-2 focus:ring-[#CCFF00]/10"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-slate-200"
                    >
                      ই-মেইল
                    </label>

                    <input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      readOnly
                      className="h-12 w-full rounded-xl border border-white/10 bg-[#070B14] px-4 text-sm text-white outline-none"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleSave}
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#CCFF00] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#d9ff38]"
                    >
                      <Check size={17} />
                      পরিবর্তন সংরক্ষণ করুন
                    </button>

                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5"
                    >
                      <X size={17} />
                      বাতিল
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <InfoRow
                    label="পূর্ণ নাম"
                    value={user.name}
                  />

                  <InfoRow
                    label="ই-মেইল ঠিকানা"
                    value={user.email}
                  />
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

/* --------------------------------
   Info Row Component
-------------------------------- */

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="border-b border-white/10 pb-4 last:border-0">
      <p className="mb-1 text-xs uppercase tracking-wider text-slate-300">
        {label}
      </p>

      <p className="text-sm font-medium text-slate-100">
        {value}
      </p>
    </div>
  );
}
