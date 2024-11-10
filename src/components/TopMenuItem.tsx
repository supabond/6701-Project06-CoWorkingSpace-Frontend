import Link from "next/link";
import Image from "next/image";
import styles from './topmenu.module.css';

export default function TopMenuItem( {title,pageRef,hoverTextColor}: {title:string, pageRef:string, hoverTextColor:string}) {

    return (
        <Link href={pageRef} className={`w-[200px] flex justify-center items-center font-normal  text-base text-black
        ${hoverTextColor}`}>
            {title}
        </Link>
    );

}