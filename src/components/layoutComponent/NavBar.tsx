'use client';
import  NavItem  from './NavItem';
import { navItems } from '@/constant/navItems';
import StarWarsLogo from "@/assets/images/StarWarsLogo.svg";
import Logo from './Logo';


export default function NavBar() {
  return (
    <header className="flex items-center px-6 py-4 bg-gray-900 border-b border-gray-700 shadow-lg">
       <Logo  width={100} height={100} src={StarWarsLogo} alt="Logo" />
      <nav className="flex items-center w-full justify-center gap-6">
        <ul className="flex mx-2 gap-6 md:gap-8 text-sm justify-center  items-center">
          {navItems.map((item) => (
            <NavItem key={item.href} href={item.href} label={item.label} />
          ))}
        </ul>
      </nav>
    </header>
  );
}
