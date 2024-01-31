import Image from 'next/image';
import CatList from './components/CatList';
import Header from './components/Header';

export default function Home() {
  return (
    <div className="container mx-auto">

        <CatList/>
    </div>
  );
}
