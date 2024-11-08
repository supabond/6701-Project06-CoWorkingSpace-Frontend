'use client'
import styles from './banner.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner() {
    const router = useRouter();

    const {data: session} = useSession();

    // return(
    //     <div className="relative">
    //         <div className="w-[100%] h-40 bg-black absolute "></div>
    //         <div className="w-[50%] z-3 h-20 bg-yellow-300 relative "></div>
    //         <div className='w-20 h-20 z-2 bg-red-200 relative'></div>
    //     </div>
    // )

    return (
        <div className = "w-[100vw] h-[100vh] relative bg-white">
            <div className='w-[80%] h-full absolute right-0'>
                <Image src='/img/5541.jpg' 
                alt='cover' 
                fill={true} 
                priority
                objectFit='cover'
                // objectPosition='right'
                />
            </div>

            { 
                session ? 
                <div className='z-20 absolute top-0 right-5 p-2 text-black font-normal'>
                    Welcome, {session.user?.name}
                </div>
                : null
            }

            <div className="absolute z-20 top-28 left-16">
                <h1 className='text-5xl font-bold text-blue-700'>COWORKING</h1>
                <h1 className='text-5xl font-bold text-blue-500'>SPACE</h1>
                <h4 className='text-base font-light text-black mt-16 text-pretty w-[40%]'>Discover and book the best coworking spaces with ease. Explore flexible options and inspiring communities – all in one place!</h4>
                <button className='w-48 bg-orange-500 text-white text-lg
                    font-semibold py-2 px-2 rounded-2xl z-30 absolute mt-20
                    hover:bg-orange-600'
                    onClick={(e)=> { e.stopPropagation; router.push('/hospital')}}> 
                    Get Start!
                </button>
            </div>
        </div>
    )
}

