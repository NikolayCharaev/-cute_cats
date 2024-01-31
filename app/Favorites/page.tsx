'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import heartActive from '@/public/heart-active.svg';
import { Cat } from '@/types/cat';
const Favorites = () => {
  const [allCats, setAllCats] = useState<Cat[]>([]);
  useEffect(() => {
    //@ts-ignore
    const cats = JSON.parse(localStorage.getItem('cats')) || [];
    setAllCats(cats);
  }, []);

  const handleRemoveFromFavorites = (catId: string) => {
    const updatedCats = allCats.filter((cat) => cat.id !== catId);
    setAllCats(updatedCats);
    localStorage.setItem('cats', JSON.stringify(updatedCats));
  };
  return (
    <div className="text-black">
      <ul className="text-black flex flex-wrap w-full gap-[47px] mt-[52px]">
        {allCats.map((cat) => (
          <li
            key={cat.id}
            className="group object-cover hover:scale-110 transition cursor-pointer hover:shadow-xl relative catItem">
            <Image
              className="object-cover w-[225px] h-[225px]"
              src={cat.url}
              width={225}
              height={225}
              alt="cat"
            />
            <div className="opacity-0 group-hover:opacity-100 absolute bottom-0 right-0 p-2">
              <Image
                onClick={() => handleRemoveFromFavorites(cat.id)}
                alt="heart"
                width={48}
                height={48}
                src={heartActive}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
