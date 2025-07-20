'use client';
import Image from 'next/image';
import LoadingLogo from '@/assets/images/LoadingLogo.svg';

export default function LoadingSpinner() {
    return (
      <div className="flex flex-col items-center h-[80vh] justify-center w-full  max-h-screen">
        <div className="animate-spin">
          <Image 
            src={LoadingLogo} 
            alt="Cargando…" 
            width={128} 
            height={128} 
            className="opacity-90 " 
          />
        </div>
         <p className="text-white text-sm">Cargando…</p>
      </div>
    );
  }