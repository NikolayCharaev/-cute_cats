'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import heart from '@/public/heart.svg';
import heartActive from '@/public/heart-active.svg';
interface Cat {
  breeds: any[];
  categories: CatCategory[];
  height: number;
  id: string;
  url: string;
  width: number;
  isLiked?: boolean;
}

interface CatCategory {
  id: number;
  name: string;
}

const CatList = () => {
  const [cats, setCats] = useState<Cat[]>([]);

  const handleLikeClick = (catId: string) => {
   const likedCat =  cats.filter(elem => elem.id === catId)
   window.localStorage.setItem('cats' , JSON.stringify(likedCat))
    setCats((prevCats) => {
      return prevCats.map((cat) => (cat.id === catId ? { ...cat, isLiked: true } : cat));
    });

  };

  async function fetchCats() {
    try {
      //@ts-ignore
      const response = await fetch(process.env.NEXT_PUBLIC_CAT_URL, {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка запроса к API');
      }

      const data: Cat[] = await response.json();
      setCats(data);
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }

  useEffect(() => {
    fetchCats();
  }, []);

  console.log(cats);

  return (
    <ul className="text-black flex flex-wrap w-full gap-[47px] mt-[52px]">
      {cats.map((cat) => (
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
            {cat.isLiked === false || cat.isLiked === undefined ? (
              <Image
                onClick={() => {
                  handleLikeClick(cat.id);
                }}
                alt="heart"
                width={48}
                height={48}
                src={heart}
              />
            ) : (
              <Image
                onClick={() => {
                  handleLikeClick(cat.id);
                  console.log(cat);
                }}
                alt="heart"
                width={48}
                height={48}
                src={heartActive}
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CatList;
