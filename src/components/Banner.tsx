'use client'

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useRole } from '@/providers/RoleProvider';
import { useAppSelector } from '@/redux/store';


export default function Banner() {
    const router = useRouter();

    const roleColor = useAppSelector( (state) => state.colorSlice )



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


            <div className="absolute z-20 top-28 left-16">
                <h1 className='text-5xl font-bold text-blue-700'>COWORKING</h1>
                <h1 className='text-5xl font-bold text-blue-500'>SPACE</h1>
                <h4 className='text-base font-light text-black mt-16 text-pretty w-[40%]'>Discover and book the best coworking spaces with ease. Explore flexible options and inspiring communities – all in one place!</h4>
                <button className={`w-48 ${roleColor.bgColor} text-white text-lg
                    font-semibold py-2 px-2 rounded-2xl z-30 absolute mt-20
                    ${roleColor.hoverBgColor}`}
                    onClick={(e)=> { e.stopPropagation; router.push('/coworkingspace')}}> 
                    Get Start!
                </button>
            </div>
        </div>
    )
}

