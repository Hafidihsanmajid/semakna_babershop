import { getSession } from "@/lib/auth";
import { logoutAction } from "@/actions/auth.actions";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, LogOut, LayoutDashboard, Scissors, Camera } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-[#121315] text-white flex flex-col selection:bg-[#D49A58] selection:text-[#121315]">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#1C1D21] border-b border-[#D49A58]/30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left Brand */}
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-[#D49A58] p-1 bg-[#121315] flex items-center justify-center">
                <Image
                  src="/images/logo.svg"
                  alt="Semakna"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold tracking-wider text-white">
                  SEMAKNA <span className="text-[#D49A58]">CMS</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest text-[#B5B5B7] uppercase -mt-1">
                  ADMIN DASHBOARD
                </span>
              </div>
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-2 pl-4 border-l border-white/10">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-display font-semibold tracking-wider text-white hover:text-[#D49A58] rounded-[2px] transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#D49A58]" />
                KONTEN HERO & STORY
              </Link>
              <Link
                href="/admin/services"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-display font-semibold tracking-wider text-white hover:text-[#D49A58] rounded-[2px] transition-colors"
              >
                <Scissors className="w-3.5 h-3.5 text-[#D49A58]" />
                LAYANAN (CRUD)
              </Link>
              <Link
                href="/admin/photos"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-display font-semibold tracking-wider text-white hover:text-[#D49A58] rounded-[2px] transition-colors"
              >
                <Camera className="w-3.5 h-3.5 text-[#D49A58]" />
                GALERI FOTO
              </Link>
            </nav>
          </div>

          {/* Right: User & Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-display tracking-wider text-[#B5B5B7] hover:text-[#D49A58] transition-colors"
            >
              <span className="hidden sm:inline">LIHAT WEBSITE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-white leading-none">
                {session?.name || "Administrator"}
              </span>
              <span className="text-[10px] text-[#7E8085] leading-none mt-1">
                @{session?.username || "admin"}
              </span>
            </div>

            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-red-500/40 hover:bg-red-950/40 text-red-300 text-xs font-display tracking-wider rounded-[2px] transition-colors cursor-pointer"
                title="Keluar dari Dashboard"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">LOGOUT</span>
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Subnav */}
        <div className="flex md:hidden border-t border-white/5 bg-[#17181C] px-4 py-2 gap-4 text-xs font-display">
          <Link href="/admin" className="text-white hover:text-[#D49A58]">
            KONTEN
          </Link>
          <Link href="/admin/services" className="text-white hover:text-[#D49A58]">
            LAYANAN
          </Link>
          <Link href="/admin/photos" className="text-white hover:text-[#D49A58]">
            FOTO
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
