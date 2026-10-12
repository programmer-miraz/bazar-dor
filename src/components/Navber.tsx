import Link from 'next/link';
import { connection } from 'next/server';
import React, { Suspense } from 'react';
import User_info from './User_info';

const DateInfo = async () => {
    await connection();
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });
    return <p>{date}</p>;
};


const Navber = () => {
    return (
        <div className='bg-white'>
            <div className='flex justify-between items-center container mx-auto py-5'>

                <div className="flex items-center gap-3">
                    <Link href='/'>
                        <div className="flex h-15 w-15 items-center justify-center rounded-xl bg-[#05893E] shadow-lg shadow-green-200 ">
                            <span className="text-4xl">🛒</span>
                        </div>
                    </Link>
                    <div className="flex flex-col leading-none">
                        <h1 className="text-[20px] whitespace-nowrap font-bold tracking-tight text-[#1F2937]">   বাজার দর
                        </h1>
                        <Suspense fallback={<p>তারিখ লোড হচ্ছে...</p>}>
                            <DateInfo />
                        </Suspense>
                    </div>
                </div>
                <User_info />

            </div>
        </div>

    );
};

export default Navber;