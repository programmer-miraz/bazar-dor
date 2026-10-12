import Link from 'next/link';
import React from 'react';
interface ItemType {
    nameBn: string
    id: number
    icon: string
    slug: string
}

const Nav_Link = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/categories', { next: { revalidate: 10 } })
    const data = await res.json()

    return (

        <div className="border-y border-gray-200 bg-white py-2.5">
            <div className="container mx-auto overflow-x-auto px-4">
                <div className="flex w-max min-w-full  items-center gap-5 sm:gap-8">

                    {data.map((item: ItemType, ind: number) => (
                        <Link key={ind} href={`/category/${item.id}`}>
                            <button
                                className="flex mt-0.5 mb-0.5 shrink-0 cursor-pointer items-center gap-1 whitespace-nowrap rounded-lg border border-gray-200 bg-white px-2 py-1 text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-green-300 hover:bg-green-50 hover:shadow-md">
                                {item.icon}
                                {item.nameBn}
                            </button>
                        </Link>

                    ))}

                </div>
            </div>
        </div>

    );
};

export default Nav_Link;