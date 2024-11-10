'use client'

import TopMenuItem from './TopMenuItem';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import  {useRole} from '@/providers/RoleProvider';
import { useSession } from 'next-auth/react';
import { useAppSelector } from '@/redux/store';
import PurgeButton from './PurgeButton';

export default function TopMenu() {

    const { data: session } = useSession();

    const roleColor = useAppSelector( (state) => state.colorSlice )

    // console.log('roleColor:',roleColor);

    // const {roleColor} = useRole();
    // const logoColor = roleColor === 'orange-500' ? 'text-orange-600' : 'text-blue-900';
    // const textColor = roleColor === 'orange-500' ? 'text-orange-500' : 'text-blue-700';
    // const bgColor = roleColor === 'orange-500' ? 'bg-orange-500' : 'bg-blue-700';
    // const borderColor = roleColor === 'orange-500' ? 'border-orange-500' : 'border-blue-700';
    // const hoverColor = roleColor === 'orange-500' ? 'hover:bg-orange-600' : 'hover:bg-blue-800';
    // const hoverTextColor = roleColor === 'orange-500' ? 'hover:text-orange-500' : 'hover:text-blue-700';


    return (
        <div className="h-20 bg-white fixed top-0 left-0 right-0 z-30 flex flex-row justify-start" >

            <Link href="/">
                <div className={`flex items-center text-3xl ${roleColor.logoColor} ml-16 mr-12 font-bold h-full`} >
                    Co-WS
                </div>
            </Link> 


            <TopMenuItem title='Co-working space' pageRef='/coworkingspace' hoverTextColor={roleColor.hoverTextColor}/>
            <TopMenuItem title='My Booking' pageRef='/mybooking' hoverTextColor={roleColor.hoverTextColor}/>
            <div className="flex flex-col justify-center">
                <PurgeButton/>
            </div>
            {/* <Link href="/">
                <Image src={'/img/logo.png'} className='h-[100%] w-auto p-[3px] hover:bg-gray-400' alt='logo' width={0} height={0} sizes='100vh'/>
            </Link> */}

            {session ? 
                <div className="absolute top-5 right-44 flex justify-end">
                    <div className='w-24 flex justify-center items-center font-normal  text-base text-gray-400'>
                        {session.user?.name}
                    </div>
                    <Link href='/api/auth/signout'>
                        <div className={`w-24 h-10 bg-white ${roleColor.textColor} border-2 ${roleColor.borderColor} flex justify-center items-center text-lg font-semibold py-2 px-2 rounded-2xl z-30 ${roleColor.hoverBgColor} hover:text-white hover:border-none`}>
                            Logout
                            {/* {session.user?.name} */}
                        </div>
                    </Link>
                </div>
                :
                <Link href='/api/auth/signin'>
                    <div className = {`w-24 h-10 absolute top-5 right-48 bg-white ${roleColor.textColor} border-2 ${roleColor.borderColor} flex justify-center items-center text-lg font-semibold py-2 px-2 rounded-2xl z-30 absolute ${roleColor.hoverBgColor} hover:text-white hover:border-none`}>
                        Login
                    </div>
                </Link>
            }
            <Link href='/'>
                    <div className = {`w-24 h-10 absolute top-5 right-12 ${roleColor.bgColor} flex justify-center items-center text-white text-lg font-semibold py-2 px-2 rounded-2xl z-30 absolute ${roleColor.hoverBgColor}`}>
                        Register
                    </div>
                </Link>
        </div>
    );
}