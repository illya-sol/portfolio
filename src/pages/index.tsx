import { useEffect } from 'react';

import { useRouter } from 'next/router';

import Footer from '../layout/Footer';
import Header from '../layout/Header';
import { initThree } from '../threejs/init';
import { AppConfig } from '../utils/AppConfig';

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    initThree(router.basePath);
  }, [router.basePath]);

  return (
    <div className="bg-indigo-500 antialiased w-full text-dark-third px-1">
      <Header />
      <div className="max-w-screen-md mx-auto">
        <div className="border-b border-gray-300">
          <div className="pt-16 pb-8">
            <div className="font-bold text-3xl text-dark-fourth">
              {AppConfig.title}
            </div>
            <div className="text-xl">{AppConfig.description}</div>
            <canvas id="renderElement" />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};
export default Index;
