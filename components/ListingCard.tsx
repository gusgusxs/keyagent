"use client";

import { useState } from 'react';
import { Heart, EyeOff, CheckCircle2, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import { ListingProps } from '@/types/property';

export function ListingCard({
  id,
  title,
  price,
  location,
  specs,
  images = [], // ใส่ค่าเริ่มต้นเป็น Array ว่างเพื่อกันพัง
  verified = false,
  pricePerSqm
}: ListingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ฟังก์ชันเช็กว่ามีรูปไหม
  const hasImages = images && images.length > 0;
  const isMultiImage = images && images.length > 1;

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToImage = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-4 group/card hover:shadow-xl transition-all duration-500">
      
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <Link href={`/property/${id}`} className="block w-full h-full relative">
          {hasImages ? (
            <img
              src={images[currentIndex]}
              alt={`${title} - image ${currentIndex + 1}`}
              className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700 ease-in-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">ไม่มีรูปภาพ</div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
        </Link>

        {/* 🌟 ปุ่มเลื่อนซ้าย-ขวา (ปรับขนาดให้กดง่ายขึ้นแต่ดูละมุนขึ้น) */}
        {isMultiImage && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between items-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10">
            <button
              onClick={prevImage}
              className="p-2 bg-white/90 rounded-full hover:bg-white text-gray-900 shadow-lg backdrop-blur-sm transition-all active:scale-90"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="p-2 bg-white/90 rounded-full hover:bg-white text-gray-900 shadow-lg backdrop-blur-sm transition-all active:scale-90"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Badges & Icons */}
        <div className="absolute top-4 left-4 z-10">
          {verified && (
            <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
              <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wider">Verified</span>
            </div>
          )}
        </div>

        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button className="p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full transition-colors">
            <Heart className="h-4 w-4 text-white" />
          </button>
        </div>

        {/* 🌟 จุดไข่ปลา (Dots Indicator) - ปรับให้นิ่งขึ้นและสวยขึ้น */}
        {isMultiImage && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => goToImage(e, i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'bg-white w-5' : 'bg-white/50 w-1.5 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="mb-3">
          <span className="text-2xl font-black text-[#a51c24] tracking-tight">{price}</span>
          <span className="text-sm font-medium text-gray-400 ml-1">/เดือน</span>
        </div>

        <Link href={`/property/${id}`}>
          <h4 className="font-bold text-gray-900 text-lg mb-1 hover:text-[#a51c24] transition-colors line-clamp-1">
            {title}
          </h4>
        </Link>

        <div className="flex items-center gap-1 text-gray-500 mb-4">
          <MapPin className="w-3.5 h-3.5 text-gray-400" />
          <p className="text-sm font-medium line-clamp-1">{location}</p>
        </div>

        {/* Specs Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="bg-red-50 text-[#a51c24] px-3 py-1 rounded-lg text-[11px] font-bold border border-red-100/50">
            {specs}
          </span>
          <span className="bg-gray-50 text-gray-500 px-3 py-1 rounded-lg text-[11px] font-bold border border-gray-100">
            {pricePerSqm}
          </span>
        </div>

        {/* Action Button */}
        <Link 
          href={`/property/${id}`} 
          className="w-full py-3.5 rounded-2xl bg-gray-900 text-white font-bold text-sm hover:bg-[#a51c24] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-gray-200 hover:shadow-red-100"
        >
          ดูรายละเอียดโครงการ
        </Link>
      </div>
    </div>
  );
}