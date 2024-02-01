import React from 'react';
import Image from 'next/image';
import loadingCat from '@/public/loader.gif';
const Preloader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Image className="object-cover" src={loadingCat} width={400} height={400} alt="cat" />
    </div>
  );
};

export default Preloader;
