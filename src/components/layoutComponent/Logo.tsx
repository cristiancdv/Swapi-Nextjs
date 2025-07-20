"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo({width, height, src, alt}: {width: number, height: number, src: string, alt: string, }) {
  const router = useRouter();
  return (
    <div onClick={() => router.push('/')} className="w-32 h-12 overflow-hidden hover:cursor-pointer hidden md:block">
      <Image
        className="object-cover w-full h-full bg-white  rounded-2xl"
        width={width}
        height={height}
        src={src}
        alt={alt}
      />
    </div>
  );
}
