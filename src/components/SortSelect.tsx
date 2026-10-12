'use client'

import React from 'react';

const SortSelect = ({ sort }: { sort: string }) => {
    return (
        <div>
            <div className="mb-4 flex items-center justify-end-safe rounded-2xl border border-gray-200 bg-white px-5 py-4">
                <form>
      
                    <select
                        className="rounded-xl border border-green-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm outline-none cursor-pointer transition-all duration-200 hover:border-green-500 hover:shadow-md focus:border-green-500 focus:ring-2 focus:ring-green-200"
                        defaultValue={sort}
                        name="sort"
                        onChange={(e) => e.currentTarget.form?.requestSubmit()}
                    >
                        <option value="latest">ডিফল্ট</option>
                        <option value="price-low">দাম কম থেকে বেশি</option>
                        <option value="price-high">দাম বেশি থেকে কম</option>
                    </select>

                </form>
            </div>
        </div>
    );
};

export default SortSelect;