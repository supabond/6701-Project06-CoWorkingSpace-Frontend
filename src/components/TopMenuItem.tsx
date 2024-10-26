import Link from "next/link";
import Image from "next/image";
import styles from './topmenu.module.css';

export default function TopMenuItem( {title,pageRef}: {title:string, pageRef:string}) {
    return (
        <Link href={pageRef} className='w-[150px] text-center pt-2.5 font-medium font-sans text-base text-black
        hover:bg-gray-400 hover:text-white'>
            {title}
        </Link>
    );

}