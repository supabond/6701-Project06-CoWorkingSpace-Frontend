import Link from "next/link";
import Image from "next/image";
import styles from './topmenu.module.css';

export default function TopMenuItem( {title,pageRef}: {title:string, pageRef:string}) {
    return (
        <Link href={pageRef} className='w-[200px] flex justify-center items-center font-normal  text-base text-black
        hover:text-orange-600'>
            {title}
        </Link>
    );

}