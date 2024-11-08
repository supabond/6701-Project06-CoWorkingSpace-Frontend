import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export default async function TopMenu() {

    const session = await getServerSession(authOptions);

    return (
        <div className="h-20 bg-white fixed top-0 left-0 right-0 z-30 flex flex-row justify-start" >

            <Link href="/">
                <div className='flex items-center text-3xl ml-16 mr-12 font-bold h-full text-orange-600' >
                    Co-WS
                </div>
            </Link> 


            <TopMenuItem title='Co-working space' pageRef='/booking'/>
            <TopMenuItem title='My Booking' pageRef='/mybooking'/>
            {/* <Link href="/">
                <Image src={'/img/logo.png'} className='h-[100%] w-auto p-[3px] hover:bg-gray-400' alt='logo' width={0} height={0} sizes='100vh'/>
            </Link> */}

            {session ? 
                <div className="absolute top-5 right-48 flex justify-end">
                    <div className='w-24 flex justify-center items-center font-normal  text-base text-gray-400'>
                        {session.user?.name}
                    </div>
                    <Link href='/api/auth/signout'>
                        <div className='w-24 h-10 bg-white text-orange-500 border-2 border-orange-500 flex justify-center items-center text-lg font-semibold py-2 px-2 rounded-2xl z-30 hover:bg-orange-500 hover:text-white hover:border-none'>
                            Logout
                            {/* {session.user?.name} */}
                        </div>
                    </Link>
                </div>
                :
                <Link href='/api/auth/signin'>
                    <div className = 'w-24 h-10 absolute top-5 right-48 bg-white text-orange-500 border-2 border-orange-500 flex justify-center items-center text-lg font-semibold py-2 px-2 rounded-2xl z-30 absolute hover:bg-orange-500 hover:text-white hover:border-none'>
                        Login
                    </div>
                </Link>
            }
            <Link href='/'>
                    <div className = 'w-24 h-10 absolute top-5 right-12 bg-orange-500 flex justify-center items-center text-white text-lg font-semibold py-2 px-2 rounded-2xl z-30 absolute hover:bg-orange-600'>
                        Register
                    </div>
                </Link>
        </div>
    );
}