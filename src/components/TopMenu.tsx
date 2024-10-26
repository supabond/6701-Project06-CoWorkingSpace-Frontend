import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export default async function TopMenu() {

    const session = await getServerSession(authOptions);

    return (
        <div className="h-12 bg-gray-200  fixed top-0 left-0 right-0 z-30 flex flex-row justify-end border-b-2 border-gray-300" >
            {session ? 
                <Link href='/api/auth/signout'>
                    <div className='flex items-center absolute left-6 h-full px-2 text-cyan-600 text-base hover:text-fuchsia-800 hover:underline'>
                        Sign-Out of {session.user?.name}
                    </div>
                </Link>
                :
                <Link href='/api/auth/signin'>
                    <div className='flex items-center absolute left-6 h-full px-2 text-cyan-600 text-base hover:text-fuchsia-800 hover:underline'>
                        Sign-In
                    </div>
                </Link>
            }
            <TopMenuItem title='Booking' pageRef='/booking'/>
            <TopMenuItem title='My Booking' pageRef='/mybooking'/>
            <Link href="/">
                <Image src={'/img/logo.png'} className='h-[100%] w-auto p-[3px] hover:bg-gray-400' alt='logo' width={0} height={0} sizes='100vh'/>
            </Link>
        </div>
    );
}