import InteractiveCard from './InteractiveCard'
import Image from 'next/image'
import { Rating } from '@mui/material'


export default function Card( {coworkingspaceName, coworkingspaceAddress, coworkingspaceOperatingHours, imgSrc, onRating}:
    {coworkingspaceName:string, coworkingspaceAddress:string, coworkingspaceOperatingHours:string, imgSrc:string,onRating?:Function}) {
    return (
        <InteractiveCard>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={imgSrc}
                    alt='Product Picture'
                    fill = {true}
                    className = 'object-cover object-bottom rounded-t-md'
                />
            </div>
            <div className='w-full  px-2.5 mt-2.5'>
                <div className={`h-[100%] overflow-auto text-lg text-left font-normal`}>{coworkingspaceName}</div>
            </div>
            <div className='w-full  px-2.5'>
                <div className='h-[100%] overflow-auto text-left text-sm text-gray-400 font-light'>{coworkingspaceAddress}</div>
                {/* <div className='h-[100%] overflow-auto text-left text-sm text-gray-400 font-light'>{coworkingspaceOperatingHours}</div> */}
            </div>
            {onRating ?
                <div className='w-full h-[15%] p-2.5'>
                    <Rating id={coworkingspaceName+" Rating"} name={coworkingspaceName+" Rating"} data-testid={coworkingspaceName+" Rating"} 
                    onClick = {(e)=> {e.stopPropagation();}}
                    onChange={(e, value)=> {
                        e.stopPropagation();
                        if (value === null) value = 0;
                        onRating(coworkingspaceName, value);
                    }}/>
                </div>
                : ''
            }
        </InteractiveCard>
    )
}