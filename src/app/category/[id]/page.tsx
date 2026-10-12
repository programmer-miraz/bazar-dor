
import All_Products from '@/src/components/All_Products';
import ProductList from '@/src/components/ProductList';
import SortSelect from '@/src/components/SortSelect';
import Link from 'next/link';
import { Suspense } from 'react';


export const instant = false;
interface IParams {
    params: Promise<{
        id: string;
    }>;


    searchParams: Promise<{
        sort?: string;
    }>;

}

interface IChange {
    dir: "up" | "down";
    pct: number;
}
export interface IProductTypes {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryIcon: string;
    categoryNameBn: string;
    unit: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: IChange;
    image: string;
}

const CetagoryPage = async ({ params, searchParams }: IParams) => {

    const { id } = await params;
    const { sort = "latest" } = await searchParams;

    const res = await fetch(
        `https://openapi.programming-hero.com/api/bazardor/products?category=${id}`);

    const data: IProductTypes[] = await res.json();

    // Sorting

    const sortedData = [...data].sort((a, b) => {
        if (sort === 'price-low') {
            return a.today - b.today;
        }
        if (sort === 'price-high') {
            return b.today - a.today
        }
        return 0
    })





    return (
        <div className="container mx-auto mt-8">
            <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-5">
                <h1 className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f1] text-3xl">
                    {data[0].categoryIcon}
                </h1>

                <div>
                    <h2 className="text-xl font-bold text-slate-900">
                        {data[0].categoryNameBn}
                    </h2>

                    <h3 className="mt-1 text-xs text-slate-500">
                        {data.length}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </h3>
                </div>
            </div>

            {/* Sorting */}

            <div className="mt-6">
                <SortSelect sort={sort} />
                <h1>মোট {sortedData.length}টি পণ্য দেখানো হচ্ছে</h1>
                <div className="mt-2 grid grid-cols-1 gap-3.5 px-3 sm:grid-cols-2 lg:grid-cols-3 lg:px-0">

                    {sortedData.map((item: IProductTypes) => (
                            <ProductList key={item.id}  item={item}></ProductList>
                    ))}
                </div>

            </div>
        </div >

    );
};

export default CetagoryPage;