"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className={`hover:text-yellow-400 cursor-pointer ${isActive ? 'text-yellow-400' : ''}`}>
      <Link href={href}>{label}</Link>
    </li>
  );
}
