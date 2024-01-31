'use client';
import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [navigation, setNavigation] = useState('home');
  return (
    <div className="bg-[#2196F3]  flex items-center">
      <div className="container mx-auto">
        <div className="flex ">
          <Link
            onClick={() => {
              setNavigation('home');
            }}
            className={` h-[64px] flex justify-center items-center  px-6 ${
              navigation === 'home' ? 'active' : ''
            } `}
            href="/">
            Все котики
          </Link>
          <Link
            onClick={() => {
              setNavigation('favorites');
            }}
            className={` h-[64px] flex justify-center items-center  px-6 ${
              navigation === 'favorites' ? 'active' : ''
            } `}
            href="/Favorites">
            Любимые котики
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
