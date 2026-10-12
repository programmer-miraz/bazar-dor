import Link from 'next/link';
import React from 'react';
import { IProductTypes } from '../app/category/[id]/page';
interface IProductItem{
    item:IProductTypes
}

const ProductList =  ({ item }:IProductItem) => {
    return (
        <div>
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
        </div>
    );
};

export default ProductList;