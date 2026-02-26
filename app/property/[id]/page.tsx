import { Header } from "@/components/Header";
import { ChevronRight, MapPin, BedDouble, Bath, Ruler, Building2 } from "lucide-react";
import Link from "next/link";
import { RECOMMENDED_LISTINGS } from "@/constants/mock-data";

// 🌟 1. Import Component สำหรับแสดงแกลเลอรีรูปภาพ
import { ImageGallery } from "@/components/ImageGallery";

export default async function PropertyDetail({ params }: { params: Promise<{ id: string }> }) {

  // 1. รอรับค่า params และดึงข้อมูล
  const resolvedParams = await params;
  const currentId = resolvedParams.id;
  const property = RECOMMENDED_LISTINGS.find((item) => String(item.id) === String(currentId));

  if (!property) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">ไม่พบข้อมูลอสังหาฯ ที่คุณค้นหา</h1>
          <Link href="/" className="text-red-600 hover:underline font-medium">กลับไปหน้าแรก</Link>
        </div>
      </div>
    );
  }

  // 2. แยกตัวเลขห้องนอน ห้องน้ำ ตร.ม. ออกมาจาก specs
  const beds = property.specs.match(/(\d+|สตูดิโอ)\s*ห้องนอน/)?.[1] || "-";
  const baths = property.specs.match(/(\d+)\s*ห้องน้ำ/)?.[1] || "-";
  const sqm = property.specs.match(/(\d+(?:\.\d+)?)\s*ตร\.ม\./)?.[1] || "-";

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-5xl">

        {/* 1. Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-900 transition-colors">หน้าแรก</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/" className="hover:text-gray-900 transition-colors">คอนโด</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-red-600 font-medium cursor-default">{property.title}</span>
        </div>

        {/* 2. Title & Price */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{property.title}</h1>
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin className="w-5 h-5 text-red-600" />
              <span className="text-base">{property.location}</span>
            </div>
          </div>
          <div className="text-left md:text-right shrink-0">
            <div className="text-4xl font-bold text-red-600">
              {property.price} <span className="text-lg font-normal text-gray-500">/เดือน</span>
            </div>
            <div className="text-sm text-gray-400 mt-2">
              {property.pricePerSqm}
            </div>
          </div>
        </div>

        {/* 🌟 3. เรียกใช้ ImageGallery Component ตรงนี้ (แทนที่ Grid เดิมที่ยาวๆ) */}
        <ImageGallery images={property.images} title={property.title} />

        {/* 4. ภาพรวมอสังหาฯ (Overview Bar) */}
        <div className="mb-12 mt-12"> {/* เติม mt-12 เผื่อเว้นระยะจากรูปภาพ */}
          <h2 className="text-xl font-bold text-gray-900 mb-6">ภาพรวมอสังหาฯ</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200 border-y border-gray-200 py-6">
            <div className="flex flex-col items-center justify-center gap-2 p-2">
              <BedDouble className="w-7 h-7 text-red-600" />
              <div className="font-bold text-gray-900 text-xl">{beds}</div>
              <div className="text-sm text-gray-500">ห้องนอน</div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-2">
              <Bath className="w-7 h-7 text-red-600" />
              <div className="font-bold text-gray-900 text-xl">{baths}</div>
              <div className="text-sm text-gray-500">ห้องน้ำ</div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-2">
              <Ruler className="w-7 h-7 text-red-600" />
              <div className="font-bold text-gray-900 text-xl">{sqm}</div>
              <div className="text-sm text-gray-500">ตร.ม.</div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-2">
              <Building2 className="w-7 h-7 text-red-600" />
              <div className="font-bold text-gray-900 text-xl">คอนโด</div>
              <div className="text-sm text-gray-500">ประเภท</div>
            </div>
          </div>
        </div>

        {/* 5. รายละเอียดเนื้อหา (ดึงแบบไดนามิกจาก mock-data) */}
        <div className="mb-12 text-gray-600 leading-relaxed whitespace-pre-line">
          <p>
            {property.description || `ค้นพบชีวิตที่ลงตัวในคอนโดมิเนียมสไตล์โมเดิร์นใจกลางเมือง ที่ ${property.title} ห้องมุมชั้น 8 วิวสวย โปร่งโล่งสบาย ขนาด ${sqm} ตร.ม. ตกแต่งครบพร้อมเข้าอยู่ทันที เดินทางสะดวกใกล้แหล่งช้อปปิ้งและรถไฟฟ้า`}
          </p>
        </div>

        {/* 6. คุณสมบัติเด่น (ดึงแบบไดนามิกจาก mock-data) */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-7 bg-red-600 rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-900">สิ่งอำนวยความสะดวก & จุดเด่น</h2>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 px-2">
            {(property.features || [
              "โครงการใหม่ สภาพมือหนึ่ง",
              "เฟอร์นิเจอร์ครบ (Fully Furnished)",
              "ใกล้รถไฟฟ้าและห้างสรรพสินค้า"
            ]).map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700">
                <div className="min-w-2 w-2 h-2 rounded-full bg-red-600"></div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 7. ทำเลที่ตั้ง */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            {/* เส้นสีแดงข้างหัวข้อ */}
            <div className="w-1.5 h-7 bg-[#a51c24] rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-900">ทำเลที่ตั้ง</h2>
          </div>

          <div className="w-full h-[450px] bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 relative group">
            <iframe allowFullScreen width="100%" height="100%" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.7633826846168!2d100.45440059678955!3d13.672146900000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2a3d97c5f5f45%3A0xa7970a9bc34018e5!2z4Lie4Lil4Lix4LihIOC4hOC4reC4meC5guC4lCDguJ7guKPguLDguKPguLLguKEgMg!5e0!3m2!1sth!2sth!4v1772097843365!5m2!1sth!2sth" loading="lazy" ></iframe>
          </div>

        </div>

      </main>
    </div>
  );
}