'use client'
import styles from './banner.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner() {
    const covers = ['/img/cover.jpg', '/img/cover2.jpg', '/img/cover3.jpg', '/img/cover4.jpg' ];
    const [index, setIndex] = useState(0);
    const router = useRouter();

    const {data: session} = useSession();

    return (
        <div className = {styles.banner} onClick = {() => { setIndex(index+1)}}>
            <div>
                <Image src={covers[index % covers.length]} 
                alt='cover' 
                fill={true} 
                priority
                objectFit='cover'/>
            </div>

            { 
                session ? 
                <div className='z-20 absolute top-0 right-5 p-2 text-white font-normal'>
                    Welcome, {session.user?.name}
                </div>
                : null
            }

            <div className = {styles.bannerText}>
                <h1 className='text-4xl font-medium text-white'>Vaccine Service Center</h1>
                <h4 className='text-xl font-serif text-white' style={{fontWeight:"normal", marginTop:"10px", textShadow:"none"}}>Join us for vaccination services to protect your health!</h4>
            </div>
            <button className='w-48 bg-white text-gray-500 border border-gray-500
                font-semibold py-4 px-4 m-5 rounded z-30 absolute bottom-0 right-0
                hover:bg-gray-500 hover:text-white hover:border-transparent'
                onClick={(e)=> { e.stopPropagation; router.push('/hospital')}}> 
                Select Hospital
            </button>
        </div>
    )
}

