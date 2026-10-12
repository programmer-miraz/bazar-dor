
const Loading = () => {
    return (

        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">

            {/* Loading Icon */}
            <div className="relative flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-green-100 border-t-[#05893E]"></div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#05893E] shadow-md">
                    <span className="text-3xl">🛒</span>
                </div>
            </div>

            {/* Title */}
            <h1 className="mt-6 text-2xl font-extrabold tracking-wide text-[#05893E]">
                বাজার দর
            </h1>

            <p className="mt-2 text-sm text-gray-500">
                আপনার বাজারের তথ্য প্রস্তুত করা হচ্ছে
            </p>

            {/* Loading Dots */}
            <div className="mt-6 flex items-center gap-2">
                <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#05893E] [animation-delay:0ms]"></span>
                <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#05893E] [animation-delay:150ms]"></span>
                <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#05893E] [animation-delay:300ms]"></span>
            </div>

            <p className="mt-4 text-xs font-medium text-gray-400">
                একটু অপেক্ষা করুন...
            </p>

        </div>

    );
};

export default Loading;
