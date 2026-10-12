
'use client'

import { authClient } from "@/src/lib/auth-client";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";

const Profile = () => {
    const { data: session } = authClient.useSession()
    const user = session?.user

    const handlesignout = async () => {
        const { data } = await authClient.signOut()
        if (data) {
            toast.success('সফলভাবে সাইন আউট হয়েছে')
        }
    }

    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const user = Object.fromEntries(formData.entries())
        const { data } = await authClient.updateUser({
            name: user.name as string
        })
        if (data) {
            toast.success('নাম সফলভাবে আপডেট হয়েছে।')
        }


    }

    return (

        <div className="min-h-screen bg-[#F0F5F0] px-4 py-6">
            <div className="mx-auto max-w-3xl">
                <div className="mb-5">
                    <h1 className="text-xl font-bold text-[#202A23]">
                        আমার প্রোফাইল
                    </h1>
                    <p className="text-xs text-gray-500">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>
                <div className="mb-5 flex flex-col items-center justify-between gap-4 rounded-xl border border-[#DFE8DF] bg-[#FAFCFA] p-5 sm:flex-row">
                    <div className="flex w-full items-center gap-3">
                        <div className="avatar avatar-online">
                            <div className="avatar avatar-online">
                                <div className="w-24 rounded-full">
                                    <Image
                                        src={user?.image || "/profile.png"}
                                        alt={user?.name || "Profile"}
                                        width={96}
                                        height={96}
                                        className="rounded-full object-cover"
                                    />



                                </div>
                            </div>
                        </div>

                        <div className="min-w-0">
                            <h2 className="font-semibold text-[#263229]">
                                {user?.name}
                            </h2>
                            <p className="truncate text-sm text-gray-500">
                                {user?.email}

                            </p>
                        </div>
                    </div>

                    <button onClick={handlesignout} className="btn btn-outline h-9 min-h-9 w-full rounded-lg border-red-400 bg-transparent px-4 text-xs font-medium text-red-500 hover:bg-red-50 sm:w-auto">
                        ↩ সাইন আউট
                    </button>
                </div>

                <div className="rounded-xl border border-[#DFE8DF] bg-[#FAFCFA] p-5 sm:p-6">
                    <h2 className="mb-7 text-base font-semibold text-[#202A23]">
                        তথ্য
                    </h2>

                    <div className="px-0 sm:px-3">
                        <form onSubmit={onSubmit}>

                            <label className="mb-2 block text-xs font-medium text-[#263229]">
                                নাম
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="নাম পরিবর্তন করুন"
                                className="input h-9 w-full rounded-lg border border-[#DFE8DF] bg-transparent outline-none focus:border-green-600"
                            />

                            <button type="submit" className="btn mt-3 h-9 min-h-9 w-full rounded-lg border-none bg-[#078A43] text-sm font-semibold text-white shadow-md hover:bg-[#067639]">
                                আপডেট
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
