//app/page.js

"use client";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

export default function Home() {
  const [participantsCount, setParticipantsCount] = useState(0);

  useEffect(() => {
    const fetchParticipantsCount = async () => {
      try {
        const response = await axios.get('/api/signature-count');
        if (response.data.count !== undefined) {
          setParticipantsCount(response.data.count);
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
        <title>Petition Page d'Accueil</title>
        <link rel="icon" href="/logo_unem.png" />
      </Head>

      <div className="text-center text-white">
        <h2 className="text-5xl md:text-8xl font-aqmar font-semibold mt-6 mb-3 mx-4">العريضة الطلابية الوطنية</h2>
        <p className="green mt-5 mb-14 text-xl md:text-4xl">
          <span className="font-semibold text-white">لمناهضة التطبيع</span>
          <img src="/logo_unem.png" alt="Logo" className="w-16 mx-auto mt-10 drop-shadow-lg" />
        </p>

        {/* Compteur */}
        <div className="flex items-center justify-center mt-2 mb-12">
          <div className="bg-green-1 rounded-s-lg shadow-lg p-4">
            <p className="text-white text-xl font-semibold">{participantsCount}</p>
          </div>
          <div className="bg-white rounded-e-lg shadow-lg p-4">
            <p className="text-gray-800 text-xl font-semibold">طالب رافض للتطبيع</p>
          </div>
        </div>

        <Link href="/form" className="inline-block bg-green hover:bg-brown text-white py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out">
          <span className="transition-all duration-300 ease-in-out transform inline-block">➜</span>
          <span className="mr-2">تسجيل</span>
        </Link>
      </div>
    </div>
  );
}