
import { ShieldCheck } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-navy text-white px-4 md:px-8 h-16 flex items-center justify-between border-b-4 border-gold z-10 sticky top-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center font-extrabold text-lg text-navy tracking-tighter">
          SH
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm md:text-base font-bold tracking-wide text-white leading-tight">
            SH Group HR Assistant
          </h1>
          <span className="text-[10px] md:text-xs text-white/50 tracking-widest uppercase">
            Internal Employee Portal
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <div className="hidden sm:flex text-[10px] md:text-xs px-2.5 py-1 rounded-full font-medium bg-gold-light text-gold border border-gold-border flex items-center gap-1.5 backdrop-blur-sm">
          <ShieldCheck className="w-3 h-3" />
          Confidential — Staff Only
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy text-white/40 text-[10px] md:text-xs text-center py-4 border-t border-white/10 shrink-0">
      <div className="max-w-7xl mx-auto px-4">
        &copy; {new Date().getFullYear()} <span className="text-gold font-medium">SH Group of Companies</span> — Solid Horizon &bull; Falcon Safe Marketing &bull; Premier Channel &mdash; Internal Use Only
      </div>
    </footer>
  );
}
