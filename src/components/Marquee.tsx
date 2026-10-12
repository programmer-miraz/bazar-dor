import React from 'react';
import MarqueeText from 'react-marquee-text';


interface IChange {
    dir: 'up' | 'down';
    pct: number;
}

interface IProduct {
    id: number;
    categoryIcon: string;
    nameBn: string;
    today: number;
    unit: string;
    change: IChange;
}

const Marquee = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products', { cache: 'force-cache' })
    const data = await res.json()


    return (
        <>
            <div className=' flex border-y border-gray-300 bg-white'>
                <MarqueeText direction='right' duration={8} >
                    {
                        data.map((item: IProduct, ind: number) =>
                            <div key={ind} className='flex items-center gap-2 h-10 whitespace-nowrap  border-l border-gray-300 px-6'>
                                <h1>{item.categoryIcon}</h1>
                                <h2>{item.nameBn}</h2>
                                <h3>{item.today}টাকা / {item.unit}</h3>

                                <span className={`${item.change.dir === 'up' ? 'text-[#05893E] items-center' : 'text-red-600 items-center'}`}>
                                    {item.change.dir === 'up' ? "▼" : "▲"}
                                    <span className='font-bold'>
                                        {Math.abs(item.change.pct)}%
                                    </span>
                                </span>
                            </div>
                        )
                    }
                </MarqueeText>


            </div>
        </>
    )

};

export default Marquee;