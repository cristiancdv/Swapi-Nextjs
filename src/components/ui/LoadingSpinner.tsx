'use client';
import Image from 'next/image';
import LoadingLogo from '@/assets/images/LoadingLogo.svg';

export default function LoadingSpinner() {
    return (
      <div className="flex items-center justify-center w-full h-full p-10">
        <div className="animate-spin-slow">
          <Image src={LoadingLogo} alt="Cargando…" width={96} height={96} className="opacity-90 animate-spin-slow" />
        </div>
      </div>
    );
  }