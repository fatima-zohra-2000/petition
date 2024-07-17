"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function PetitionForm() {
  const [formData, setFormData] = useState({
    name: '',
    studentNumber: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleBackClick = () => {
    router.push('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'studentNumber' && !/^\d*$/.test(value)) {
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/submit-petition', formData);
      setSubmitted(true);
      setError(null);
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleNewSubmission = () => {
    setFormData({
      name: '',
      studentNumber: '',
      email: '',
    });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <p className="text-3xl font-medium mb-4">تم إرسال توقيعكم بنجاح</p>
        <button 
          onClick={handleNewSubmission} 
          className="mt-4 py-2 px-4 text-xl border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green hover:bg-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown">
          إرسال توقيع آخر
        </button>
      </div>
    );
  }

  return (

    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Right Column */}
      <div className="lg:w-1/2 w-full bg-slate-50 p-6 flex flex-col justify-start">
        <div className="flex flex-wrap justify-center items-center mb-6 p-6">
          <div className="flex flex-wrap items-center sm:justify-between justify-center w-full sm:w-auto">
            <img src="/logo_unem.png" alt="Logo" className="w-16 mx-2 drop-shadow-lg" />
            <div className="mx-20 md:mx-4 lg:mx-6 text-center">
              <p className="text-brown text-base/4 font-semibold mb-0 pb-0">الاتحاد الوطني لطلبة المغرب</p>
              <p className="text-base mt-0 pt-0">الكتابة الوطنية</p>
            </div>
            <img src="/LOL.png" alt="New Image" className="w-24 hidden sm:block" />
          </div>
        </div>
        <div className="mb-20 text-center">
          <h2 className="text-brown mt-6 mb-2 text-6xl/10 font-aqmar font-semibold">العريضة الطلابية الوطنية</h2>
          <p className="green mt-5 text-3xl">
            <span className="font-semibold text-green">لمناهضة التطبيع</span>
          </p>
        </div>
        <div className="max-w-md w-full mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-base font-medium text-gray-700">الاسم الكامل :</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="studentNumber" className="block text-base font-medium text-gray-700">رقم الطالب :</label>
                <input
                  id="studentNumber"
                  name="studentNumber"
                  type="text"
                  value={formData.studentNumber}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-base font-medium text-gray-700">البريد الالكتروني :</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-center mt-4">
              <button
                type="submit"
                className="mt-3 pt-1 px-5 pb-2 mx-2 border border-transparent rounded-lg shadow text-base font-medium text-white bg-brown hover:bg-green-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                تسجيل
              </button>
              <button
                type="button"
                onClick={handleBackClick}
                className="mt-3 pt-1 px-5 pb-2 mx-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-slate-600 bg-slate-200 hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                عودة
              </button>
            </div>
            {error && <p className="error text-red-500">{error}</p>}
          </form>
        </div>
      </div>

      {/* Left Column */}
      <div className="lg:w-1/2 w-full flex flex-col">
        <div className="w-full h-screen bg-cover bg-bottom flex flex-row justify-center items-end" style={{ backgroundImage: "url('/group2.png')" }}>
          <div className="z-10 text-white font-extralight text-base/5 mb-4 text-center">
            <p className="">©  جمیع الحقوق محفوظة </p>
            <p>unem.net | 2024 </p>
          </div>
        </div>
      </div>
    </div>
  );
}
