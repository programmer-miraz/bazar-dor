'use client'
import { authClient } from '@/src/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const Sign_Up = () => {
    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const user = Object.fromEntries(formData.entries()) as { name: string, email: string, password: string }
        const { data, error } = await authClient.signUp.email({
            ...user,
            callbackURL: '/'
        })

        if (data) {
            toast.success('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে')
            redirect("/")

        }
        if (error) {
            toast.error('কিছু একটা সমস্যা আছে')
        }

    }
    const handlegooglesign = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: 'google'
        })
        if (data) {
            toast.success('গুগল দিয়ে সফলভাবে সাইন আপ হয়েছে')
        }
        if (error) {
            toast.error('কিছু একটা সমস্যা আছে')
        }
    }
    const handlegithubsignup = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: 'github'
        })
        if (data) {
            toast.success('গুগল দিয়ে সফলভাবে সাইন আপ হয়েছে')
        }
        if (error) {
            toast.error('কিছু একটা সমস্যা আছে')
        }
    }


    return (
        <div className='flex justify-center mt-10 mb-10'>
            <div>
                <h1 className="text-center text-2xl font-bold sm:text-3xl"> অ্যাকাউন্ট তৈরি করুন </h1>
                <p className="mb-5 text-sm text-center text-[#7B867E]"> বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন। </p>
                <form onSubmit={onSubmit}>

                    <fieldset className="fieldset bg-base-100  border-base-300 rounded-box w-xs border p-6">

                        <label className="label">নাম</label>
                        <input type="text" name="name" className="input" placeholder="নাম" />

                        <label className="label">ইমেইল</label>
                        <input type="email" name="email" className="input" placeholder="ইমেইল" />

                        <label className="label">পাসওয়ার্ড</label>
                        <input type="password" name="password" className="input" placeholder="পাসওয়ার্ড" />

                        <label className="label">পাসওয়ার্ড নিশ্চিত করুন</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="input"
                            placeholder="কমপক্ষে ৮ অক্ষর"
                        />

                        <button type="submit" className="btn bg-green-700 rounded-xl text-white font-bold mt-4">
                            অ্যাকাউন্ট তৈরি করুন
                        </button>

                        <div className="flex items-center gap-4 py-1"> <div className="h-0.5 flex-1 bg-[#E3E9E4]" /> <span className="text-sm text-[#657168]">অথবা</span> <div className="h-0.5 flex-1 bg-[#E3E9E4]" /> </div>
                        <button onClick={handlegooglesign} className="btn btn-outline w-full border-base-300 bg-white">
                            <Image

                                width={20}
                                height={20}
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                                className="h-5 w-5"
                            />
                            Google দিয়ে চালিয়ে যান
                        </button>
                        <button onClick={handlegithubsignup} className="btn btn-outline w-full border-base-300 bg-white">
                            <Image
                                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                                alt="GitHub"
                                  width={20}
                                height={20}
                                className="h-5 w-5"
                            />
                            GitHub দিয়ে চালিয়ে যান
                        </button>

                        <Link href='/signin'>
                            <p className="mt-4 text-center text-sm"> অ্যাকাউন্ট আছে?{' '} <span className="cursor-pointer font-medium text-green-700"> সাইন ইন করুন </span> </p>
                        </Link>

                    </fieldset>
                </form>
                <Link href='/'>
                    <p className="mt-6 text-center text-sm text-[#7B867E]"> <span className="cursor-pointer"> ← হোম পেজে ফিরে যান </span> </p>
                </Link>
            </div>
        </div>
    );
};

export default Sign_Up;