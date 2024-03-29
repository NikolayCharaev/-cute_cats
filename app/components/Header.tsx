'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="bg-[#2196F3]  flex items-center">
      <div className="container mx-auto">
        <div className="flex ">
          <Link
            className={`h-[64px] flex justify-center items-center opacity-70  px-6 ${
              pathname === '/' && 'active '
            } `}
            href="/">
            Все котики
          </Link>
          <Link
            className={` h-[64px] flex justify-center items-center opacity-70  px-6 ${
              pathname === '/Favorites' && 'active'
            } `}
            href="/Favorites">
            Любимые котики
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
