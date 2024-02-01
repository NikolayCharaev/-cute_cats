'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import heart from '@/public/heart.svg';
import heartActive from '@/public/heart-active.svg';
import loadingCat from '@/public/loader.gif';
import { Cat } from '@/types/cat';

const CatList = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [likedCats, setLikedCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLikeClick = (catId: string) => {
    setCats((prevCats) => {
      return prevCats.map((cat) => (cat.id === catId ? { ...cat, isLiked: true } : cat));
    });
  };

  useEffect(() => {
    window.localStorage.setItem('cats', JSON.stringify(likedCats));
  }, [likedCats]);

  async function fetchCats() {
    setLoading(true);
    try {
      //@ts-ignore
      const response = await fetch(process.env.NEXT_PUBLIC_CAT_URL, {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка запроса к API');
      } else {
        setLoading(false);
      }

      const data: Cat[] = await response.json();
      setCats(data);
    } catch (error) {
      console.error('Произошла ошибка:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div>
      <ul className="text-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[47px] mt-[52px] mb-10 ">
        {loading && (
          <div className="flex justify-center items-center w-full h-full">
            <Image className="object-cover" src={loadingCat} width={400} height={400} alt="cat" />
          </div>
        )}
        {cats.map((cat) => (
          <li
            key={cat.id}
            className="group hover:scale-110 transition cursor-pointer hover:shadow-xl relative catItem">
            <Image
              className="object-cover w-full md:w-[225px] h-[225px]"
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
                    setLikedCats((prev) => [...prev, cat]);
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

  
    </div>
  );
};

export default CatList;
