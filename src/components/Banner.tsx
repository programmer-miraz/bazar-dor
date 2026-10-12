import { connection } from 'next/server';
import React, { Suspense } from 'react';
import benner from '../../public/bazar-hero.png'
import Image from 'next/image';

const CurrentDate = async () => {
    await connection();

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return <p className="mt-1 min-h-6 font-bold text-black">{date}</p>;
};
const Benner = () => {
    return (

        <div className='container mx-auto'>
            <div className='flex flex-col items-center justify-between gap-6 md:flex-row mt-5 bg-base-100 shadow-sm px-5 pb-8 rounded-2xl'>
                <div className='space-y-5 text-center md:text-left'>
                    <h1> </h1>
                    <Suspense fallback={<p></p>}>
                        <CurrentDate />
                    </Suspense>
                    <h1 className='text-3xl md:text-4xl font-bold'>আজকের বাজারের দাম এক নজরে</h1>
                    <p className='text-gray-500'>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — <br />বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
                    <button className='btn bg-[#05893E] text-white rounded-xl px-6 py-4'>সব পণ্য দেখুন</button>
                </div>
                <div>
                    <Image src={benner} alt='benner' />
                </div>
            </div>

        </div>

        // <Bazar6product />
    );
};

export default Benner;