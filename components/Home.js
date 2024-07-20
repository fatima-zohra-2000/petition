"use client";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home({ participantsCount: initialCount }) {
  const [participantsCount, setParticipantsCount] = useState(initialCount);

  useEffect(() => {
    const fetchParticipantsCount = async () => {
      try {
        console.log('Fetching participants count...');
        const response = await fetch('/api/signature-count');
        const data = await response.json();
        console.log('API response:', data);
        if (data.count !== undefined) {
          setParticipantsCount(data.count);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre de signatures : ', error);
      }
    };

    fetchParticipantsCount();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/3.png')" }}>
      <Head>
        <title>عريضة طلابية وطنية لإسقاط التطبيع</title>
        <link rel="icon" href="/logo_unem.png" />
      </Head>

      <div className="text-center text-white flex flex-col items-center">
        <h2 className="text-5xl md:text-6xl/8 lg:text-8xl font-aqmar font-semibold mt-6 mb-1 lg:mb-3 mx-8">العريضة الطلابية الوطنية</h2>
        <p className="mt-1 md:mt-3 mb-14 text-xl lg:text-4xl/8">
          <span className="font-semibold text-white">لإسقاط التطبيع</span>
          <img src="/logo_unem.png" alt="Logo" className="w-16 mx-auto mt-16 drop-shadow-lg" />
        </p>

        {/* Compteur */}
        <div className="flex items-center justify-center mx-3 mt-2 mb-12">
          <div className="bg-green-1 rounded-s-lg shadow-lg p-4">
            <p className="text-white text-sm md:text-xl font-semibold">{participantsCount}</p>
          </div>
          <div className="bg-white rounded-e-lg shadow-lg p-4">
            <p className="text-gray-800 text-sm md:text-xl font-semibold">طالب رافض للتطبيع</p>
          </div>
        </div>

        <Link href="/form" className="inline-block bg-green hover:bg-brown text-white py-3 px-6 mb-4 rounded-full shadow-lg transition-all duration-300 ease-in-out">
          <span className="transition-all duration-300 ease-in-out transform inline-block">➜</span>
          <span className="mr-2">توقيع</span>
        </Link>
      </div>
    </div>
  );
}