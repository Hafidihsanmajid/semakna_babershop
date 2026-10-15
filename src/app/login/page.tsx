"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, User, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { loginAction } from "@/actions/auth.actions";

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAction, null);

  useEffect(() => {
    if (state?.success) {
      router.push("/admin");
      router.refresh();
    }
  }, [state, router]);

  return (
    <div className="min-h-screen bg-[#121315] flex flex-col justify-center items-center px-4 relative overflow-hidden selection:bg-[#D49A58] selection:text-[#121315]">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D49A58]/10 via-[#121315] to-[#0A0B0D] pointer-events-none" />

      {/* Decorative lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#D49A58_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* Back to Home Link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-display tracking-widest text-[#B5B5B7] hover:text-[#D49A58] transition-colors uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          KEMBALI KE BERANDA
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card Container */}
        <div className="bg-[#1C1D21]/95 backdrop-blur-xl border border-[#D49A58]/35 rounded-[4px] p-8 shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
          {/* Header & Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-[#D49A58] p-2 bg-[#121315] flex items-center justify-center shadow-lg">
              <Image
                src="/images/logo.svg"
                alt="Semakna Barbershop"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>

            <h1 className="font-display text-2xl font-bold tracking-[0.2em] uppercase text-white">
              PORTAL ADMIN
            </h1>
            <p className="font-serif-accent text-xs text-[#D49A58] tracking-widest uppercase mt-1">
              SEMAKNA BARBERSHOP CMS
            </p>
          </div>

          {/* Error Message */}
          {state?.error && (
            <div className="mb-6 p-3 bg-red-950/40 border-l-4 border-l-red-500 border-y border-r border-red-500/20 text-red-200 text-xs flex items-center gap-2 rounded-[2px]">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{state.error}</span>
            </div>
          )}

          {/* Form */}
          <form action={formAction} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-display font-semibold tracking-wider text-[#B5B5B7] uppercase mb-2"
              >
                Username
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-[#D49A58]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  defaultValue="admin"
                  placeholder="admin"
                  className="w-full bg-[#121315] border border-white/10 focus:border-[#D49A58] rounded-[2px] pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#7E8085] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-display font-semibold tracking-wider text-[#B5B5B7] uppercase mb-2"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-[#D49A58]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#121315] border border-white/10 focus:border-[#D49A58] rounded-[2px] pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#7E8085] focus:outline-none transition-colors"
                />
              </div>
              <p className="text-[11px] text-[#7E8085] mt-1.5 italic">
                Default kredensial: <span className="text-[#D49A58]">admin</span> / <span className="text-[#D49A58]">semakna123</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-4 py-3 bg-[#D49A58] hover:bg-[#E0A96B] disabled:opacity-50 text-[#121315] font-display font-bold text-xs tracking-[0.2em] uppercase rounded-[2px] transition-all duration-200 shadow-[0_8px_20px_rgba(212,154,88,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  MEMVERIFIKASI...
                </>
              ) : (
                "MASUK KE DASHBOARD"
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-[#7E8085]">
            Dilindungi oleh Next.js Secure Cookie & JWT Session
          </p>
        </div>
      </div>
    </div>
  );
}
