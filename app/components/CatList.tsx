'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image'
const CatList = () => {
  const [cats, setCats] = useState([]);

  async function fetchCats() {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_CAT_URL, {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка запроса к API');
      }

      const data = await response.json();
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
    <ul className="text-black flex flex-wrap gap-[47px] mt-[52px]">
      {cats.map((cat) => (
        <li key={cat.id} className='object-cover'>
            <Image className='object-cover w-[225px] h-[225px]' src={cat.url} width={225} height={225} alt='cat'/>
        </li>
      ))}
    </ul>
  );
};

export default CatList;
