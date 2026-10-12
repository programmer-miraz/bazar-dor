import Link from 'next/link';
import React from 'react';
import All_Products from './All_Products';
interface IChange {
    dir: 'up' | 'down';
    pct: number;
}

export interface IProductType {
    id: number;
    nameBn: string;
    image: string;
    unit: string;
    today: number;
    change: IChange;
}
const Baza_poduct = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
    const data = await res.json()

    const increeseItem = data.filter((item: IProductType) => item.change.dir === "up").sort((a: IProductType, b: IProductType) => b.change.pct - a.change.pct).slice(0, 6)

    const decreeseItem = data.filter((item: IProductType) => item.change.dir === "up").sort((a: IProductType, b: IProductType) => a.change.pct - b.change.pct).slice(0, 6)

    return (
        <div className='container mx-auto mt-8'>

            <div>
                <h1 className='text-xl font-bold mb-3 lg:px-0 px-3'> <span className=' text-red-600 '>▲</span>আজ দাম বেড়েছে</h1>

                <div className='grid lg:px-0 px-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5'>
                    {increeseItem.map((item: IProductType) =>
                        <div
                            key={item.id}
                            className="rounded-2xl border border-gray-200 bg-white p-4 hover:shadow-md hover:-translate-y-1 transition-all duration-200  hover:border-gray-300  hover:border-sm"
                        >
                            <Link href={`/details/${item.id}`}>
                                <div className="flex items-center justify-between gap-3 cursor-pointer">


                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F0F6F2]">
                                            <span className="text-3xl">{item.image}</span>
                                        </div>

                                        <div className="min-w-0">
                                            <h2 className="truncate text-lg font-bold text-[#1F2937]">
                                                {item.nameBn}
                                            </h2>

                                            <p className="text-sm text-gray-500">
                                                প্রতি {item.unit}
                                            </p>
                                        </div>
                                    </div>


                                    <div
                                        className={`shrink - 0 rounded - full px - 3 py - 1 text - xs font - medium ${item.change.dir === "up"
                                            ? "bg-red-50 rounded-xl px-1 py-0.5 text-red-600"
                                            : "bg-green-50 rounded-xl px-1 py-0.5 text-green-600"
                                            }`}
                                    >
                                        <span>
                                            {item.change.dir === "up" ? "▲" : "▼"}
                                            {Math.abs(item.change.pct)}%
                                        </span>
                                    </div>
                                </div>


                                <div className="mt-4">
                                    <p className="text-sm text-gray-500">আজকের দাম</p>

                                    <h3 className="text-[20px] font-bold text-[#111827]">
                                        {item.today} টাকা
                                    </h3>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* আজ দাম কমেছে */}

            <div className='mt-8'>
                <h1 className='text-xl lg:px-0 px-3 font-bold mb-3'> <span className=' text-green-600'>▲</span>আজ দাম কমেছে</h1>

                <div className='grid lg:px-0 px-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5'>
                    {decreeseItem.map((item: IProductType) =>
                        <div
                            key={item.id}
                            className="rounded-2xl border border-gray-200 bg-white p-4 hover:shadow-md hover:-translate-y-1 transition-all duration-200  hover:border-gray-300  hover:border-sm"
                        >
                            <Link href={`/details/${item.id}`}>
                                <div className="flex items-center justify-between gap-3 cursor-pointer">


                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F0F6F2]">
                                            <span className="text-3xl">{item.image}</span>
                                        </div>

                                        <div className="min-w-0">
                                            <h2 className="truncate text-lg font-bold text-[#1F2937]">
                                                {item.nameBn}
                                            </h2>

                                            <p className="text-sm text-gray-500">
                                                প্রতি {item.unit}
                                            </p>
                                        </div>
                                    </div>


                                    <div
                                        className={`shrink - 0 rounded - full px - 3 py - 1 text - xs font - medium ${item.change.dir === "down"
                                            ? "bg-red-50 rounded-xl px-1 py-0.5 text-red-600"
                                            : "bg-green-50 rounded-xl px-1 py-0.5 text-green-600"
                                            }`}
                                    >
                                        <span>
                                            {item.change.dir === "down" ? "▲" : "▼"}
                                            {Math.abs(item.change.pct)}%
                                        </span>
                                    </div>
                                </div>

                                {/* Today's price */}
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500">আজকের দাম</p>

                                    <h3 className="text-[20px] font-bold text-[#111827]">
                                        {item.today} টাকা
                                    </h3>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* সব পণ্য */}

            <div className='mt-8'>
                <div className='px-3 lg:px-0'>
                    <h2 className='font-bold text-xl'>সব পণ্য</h2>
                    <p className='text-gray-500'>মোট {data.length} টি পণ্য দেখানো হচ্ছে</p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:px-0 px-3 lg:grid-cols-3 gap-3.5 mt-4'>
                    {data.map((item: IProductType) => <All_Products key={item.id} item={item}></All_Products>)}
                </div>

            </div>

        </div>
    );
};

export default Baza_poduct;