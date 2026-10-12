import { notFound } from 'next/navigation';
import React from 'react';
interface IProduct {
    id: number;
    slug: string;
    nameBn: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: string;
        pct: number;
    };
    markets: IMarket[];
}
interface IMarket {
    market: string;
    division: string;
    min: number;
    max: number;
}

export const instant = false;
const DetailsPage = async ({ params }: { params: Promise<{ id: string}> }) => {
    const { id } = await params;
    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${id}`)

    const data: IProduct = await res.json()
    const price = data.today - data.yesterday
    let message = ''
    if (price > 0) {
        message = "দাম বেড়েছে "
    }
    else if (price === 0) {
        message = "দাম অপরিবর্তিত"
    }
    else {
        message = "দাম কমেছে"
    }

    const highestPrice = Math.max(...data.markets.map((item: IMarket) => item.max));
    const lowghestPrice = Math.min(...data.markets.map((item: IMarket) => item.min));
    const avaragePrice = Math.ceil(data.markets.reduce((sum, acc) => sum + (acc.max + acc.min) / 2, 0) / data.markets.length)



    return (

        <div className="min-h-screen rounded-xl bg-[#F0F5F0] px-4 py-6 sm:px-6 container mx-auto">
            <div className="mx-auto max-w-6xl">

                {/* Breadcrumb */}
                <p className="mb-5 text-md text-gray-600">
                    হোম <span className="mx-1">›</span>
                    {data.categoryNameBn} <span className="mx-1">›</span>
                    <span className='font-medium text-gray-800'>
                    {data.nameBn}
                    </span>
                </p>

                {/* Product Header */}
                <div className="mb-3 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-2xl">
                            {data.image}
                        </div>

                        <div>
                            <h1 className="text-lg font-bold text-gray-800 sm:text-2xl">
                                {data.nameBn}
                            </h1>
                            <p className="mt-1 text-xs text-gray-500">
                                {data.categoryNameBn} · {data.unit}
                            </p>
                            <p className="mt-1 text-xs text-gray-600">
                                গতকালের তুলনায় আজ{" "}
                                <span
                                    className={`font-semibold ${price > 0
                                            ? "text-red-600"
                                            : price < 0
                                                ? "text-green-600"
                                                : "text-gray-600"
                                        }`}
                                >
                                    {message} {Math.abs(price)} টাকা
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Today's Price */}
                    <div className="w-full rounded-xl bg-[#F0F5F0] px-5 py-3 text-center sm:w-36">
                        <p className="text-xs text-gray-500">আজকের দাম</p>
                        <h2 className="text-2xl font-bold text-gray-800">
                            ৳{data.today}
                        </h2>
                        <p className="text-xs text-gray-500">
                            টাকা / {data.unit}
                        </p>
                        <p
                            className={`mt-1 text-xs font-semibold ${data.change.dir === "up"
                                    ? "text-red-600"
                                    : data.change.dir === "down"
                                        ? "text-green-600"
                                        : "text-gray-500"
                                }`}
                        >
                            {data.change.dir === "up"
                                ? "▲"
                                : data.change.dir === "down"
                                    ? "▼"
                                    : "—"}{" "}
                            {Math.abs(data.change.pct)}%
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">

                    {/* Price Summary */}
                    <h2 className="mb-3 text-sm font-bold text-gray-800">
                        দামের সারসংক্ষেপ
                    </h2>

                    <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="rounded-xl border border-gray-200 p-4">
                            <p className="text-xs text-gray-600">সর্বনিম্ন দাম</p>
                            <h3 className="mt-1 text-xl font-bold text-green-600">
                                ৳{lowghestPrice}
                            </h3>
                            <p className="mt-1 text-xs text-gray-500">
                                বাজারে পাওয়া সর্বনিম্ন দাম
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 p-4">
                            <p className="text-xs text-gray-600">সর্বোচ্চ দাম</p>
                            <h3 className="mt-1 text-xl font-bold text-red-600">
                                ৳{highestPrice}
                            </h3>
                            <p className="mt-1 text-xs text-gray-500">
                                বাজারে পাওয়া সর্বোচ্চ দাম
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 p-4">
                            <p className="text-xs text-gray-600">গড় দাম</p>
                            <h3 className="mt-1 text-xl font-bold text-green-600">
                                ৳{avaragePrice}
                            </h3>
                            <p className="mt-1 text-xs text-gray-500">
                                প্রতি {data.unit} হিসাবে
                            </p>
                        </div>
                    </div>

                    {/* Market Price Table */}
                    <h2 className="mb-3 text-sm font-bold text-gray-800">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                    <div className="overflow-x-auto rounded-xl border border-gray-200 ">
                        <table className="w-full min-w-[600px] border-collapse text-left text-xs sm:text-sm">
                            <thead className="bg-[#F8FAF8] text-gray-600">
                                <tr>
                                    <th className="px-3 py-3 font-medium">বাজার</th>
                                    <th className="px-3 py-3 font-medium">বিভাগ</th>
                                    <th className="px-3 py-3 text-right font-medium">
                                        সর্বনিম্ন
                                    </th>
                                    <th className="px-3 py-3 text-right font-medium">
                                        সর্বোচ্চ
                                    </th>
                                    <th className="px-3 py-3 text-right font-medium">গড়</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.markets.map((details, ind) => (
                                    <tr
                                        key={ind}
                                        className={`border-t border-gray-200 ${ind % 2 === 0 ? "bg-white" : "bg-[#F0F5F0]"
                                            }`}
                                    >
                                        <td className="whitespace-nowrap px-3 py-3 font-medium text-gray-800">
                                            {details.market}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-gray-600">
                                            {details.division}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-right text-gray-700">
                                            ৳{details.min}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-right text-gray-700">
                                            ৳{details.max}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-right font-semibold text-gray-800">
                                            ৳{Math.ceil((details.min + details.max) / 2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default DetailsPage;