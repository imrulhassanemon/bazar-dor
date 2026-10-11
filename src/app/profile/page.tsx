"use client"

import { useEffect, useState } from "react";
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

interface UserProfile {
  name: string;
  email: string;
  joined: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const { data } = useSession();

  const [user, setUser] = useState<UserProfile>({
    name: `${data?.user?.name}`,
    email: "imrul@example.com",
    joined: "September 2026",
  });
  console.log(data);
  const [formData, setFormData] = useState<UserProfile>(user);

  useEffect(() => {
    if (data?.user) {
      const sessionUser: UserProfile = {
        name: data.user.name || "",
        email: data.user.email || "",
        joined: user.joined || '',
      };
      setUser(sessionUser);
      setFormData(sessionUser);
    }
  }, [data?.user]);

  if (!data?.user) {
    return <Loading />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
    updateUser({
      name: formData.name,
    });
    console.log(formData);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  console.log(data.user.createdAt);
  const banglaTime = data.user.createdAt.toLocaleString("bn-BD", {
  dateStyle: "full",
  timeStyle: "medium",
});

  return (
    <main className="min-h-screen  bg-[#F0F5F0]   text-white sm:px-6 lg:px-8">
      <div className="bg-[#F5F7F2] border border-[#E1E8DE] rounded-2xl max-w-7xl mx-auto p-10">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8 ">


            <h1 className="text-3xl text-[#17251C]  font-black tracking-tight sm:text-4xl">
              আমার প্রফাইল
            </h1>

            <p className="mt-2 text-sm text-[#66736A]   ">
              আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
            </p>
          </div>

          {/* Profile Hero */}
          <section className="relative mb-6 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-[#929B2A] to-[#176E3A]">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#CCFF00]/10 via-transparent to-blue-500/5" />

            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                {/* User Info */}
                <div className="flex items-center gap-5">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[#CCFF00] text-3xl font-black text-black shadow-[0_0_35px_rgba(204,255,0,0.12)]">
                      {user?.name?.charAt(0)}
                    </div>

                    <button
                      type="button"
                      className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl border-4 border-[#0B1220] bg-white text-black transition hover:bg-[#CCFF00]"
                      aria-label="Change profile picture"
                    >
                      <Camera size={15} />
                    </button>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">{user.name}</h2>

                    <div className="mt-2 flex items-center gap-2 text-sm text-white">
                      <Mail size={15} />
                      {user.email}
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-xs text-white">
                      <CalendarDays size={14} />
                      Joined {banglaTime}
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08]"
                  >
                    <Edit3 size={17} />
                   নাম হালনাগাদ করুন
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Stats */}

          {/* Main Grid */}
          <div className="grid gap-6 ">
            {/* Profile Details */}
            <section className="rounded-3xl text-black border border-white/10 bg-green-800 p-6 lg:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">ব্যাক্তিগত  তথ্য</h2>

                  <p className="mt-1 text-xs text-slate-300">
                    Your basic account information
                  </p>
                </div>

                <User className="text-slate-600" size={20} />
              </div>

              {isEditing ? (
                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                       নাম                   </label>

                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      className="h-12 w-full rounded-xl border border-white/10 bg-[#070B14] px-4 text-sm text-white outline-none transition focus:border-[#CCFF00]/50 focus:ring-2 focus:ring-[#CCFF00]/10"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      ই-মেইল 
                    </label>

                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      readOnly
                      className="h-12 w-full rounded-xl border border-white/10 bg-[#070B14] px-4 text-sm text-white outline-none transition focus:border-[#CCFF00]/50 focus:ring-2 focus:ring-[#CCFF00]/10"
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
                      Save Changes
                    </button>

                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5"
                    >
                      <X size={17} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <InfoRow label="Full name" value={user.name} />

                  <InfoRow label="Email address" value={user.email} />
                </div>
              )}
            </section>

            {/* Quick Actions */}
          </div>
        </div>
      </div>
    </main>
  );
}


/* --------------------------------
   Info Row
------------------------------ */

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="border-b border-white/5 pb-4 last:border-0">
      <p className="mb-1 text-xs uppercase tracking-wider text-slate-300">
        {label}
      </p>

      <p className="text-sm font-medium text-slate-200">{value}</p>
    </div>
  );
}