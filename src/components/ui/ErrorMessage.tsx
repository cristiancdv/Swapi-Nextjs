'use client';
import Image from 'next/image';
import triangleAlert from '@/assets/images/triangleAlert.svg';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ title = "¡Ups! Algo salió mal.", message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 bg-red-900/10 text-red-400 rounded-lg shadow-md">
      <Image src={triangleAlert} alt="alt" width={48} height={48} className="mb-4 text-red-500" />
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm mt-2">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 text-sm font-medium rounded bg-red-500 hover:bg-red-600 text-white transition"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}
