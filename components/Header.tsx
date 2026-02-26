import Link from 'next/link';  
import { Menu, Key } from 'lucide-react';  
import { cn } from '@/lib/utils';  
  
export function Header() {  
  return (  
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">  
      <div className="container mx-auto flex items-center justify-between px-4 py-4">  
        {/* Logo Section (Code-based SVG) */}  
        <Link href="/" className="flex items-center gap-3 group">  
          {/* ส่วนของไอคอนบ้าน */}
          <div className="bg-[#B72E25] w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
            <svg 
              viewBox="0 0 64 64" 
              className="w-8 h-8" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* หลังคาบ้าน */}
              <path d="M6 34 L32 14 L58 34" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* ตัวบ้าน */}
              <path d="M12 29.5 L12 52 L52 52 L52 29.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* ปล่องไฟ */}
              <path d="M45 24 L45 15 L50 15 L50 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* รูกุญแจ */}
              <circle cx="32" cy="37" r="5.5" fill="white" />
              <path d="M28.2 40 L24 52 L40 52 L35.8 40 Z" fill="white" />
            </svg>
          </div>

          {/* ส่วนของข้อความ KEY PLATFORM */}
          <div className="flex flex-col justify-center -mt-0.5">
            <span className="text-[1.75rem] font-black text-[#B72E25] leading-none tracking-tight">
              KEY
            </span>
            <span className="text-[0.65rem] font-bold text-gray-500 tracking-[0.25em] leading-none mt-1 uppercase">
              PLATFORM
            </span>
          </div>
        </Link> 
  
        {/* Right Actions */}  
        <div className="flex items-center gap-4">  
          <button className="hidden md:block px-4 py-2 text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors">  
            เข้าสู่ระบบ  
          </button>  
          <button className="p-2 hover:bg-gray-50 rounded-full transition-colors border border-transparent hover:border-gray-200">  
            <Menu className="h-6 w-6 text-gray-700" />  
            <span className="sr-only">Menu</span>  
          </button>  
        </div>  
      </div>  
    </header>  
  );  
}
