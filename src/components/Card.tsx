import InteractiveCard from './InteractiveCard'
import Image from 'next/image'
import { Rating } from '@mui/material'

export default function Card( {hospitalName, imgSrc, onRating}:{hospitalName:string, imgSrc:string, onRating?:Function}) {
    return (
        <InteractiveCard contentName={hospitalName}>
            <div className='w-full h-[60%] relative rounded-t-lg'>
                <Image src={imgSrc}
                    alt='Product Picture'
                    fill = {true}
                    className = 'object-cover object-top rounded-t-md'
                />
            </div>
            <div className='w-full h-[25%] p-2.5'>
                <div className='h-[100%] overflow-auto text-left font-medium'>{hospitalName}</div>
            </div>
            {onRating ?
                <div className='w-full h-[15%] p-2.5'>
                    <Rating id={hospitalName+" Rating"} name={hospitalName+" Rating"} data-testid={hospitalName+" Rating"} 
                    onClick = {(e)=> {e.stopPropagation();}}
                    onChange={(e, value)=> {
                        e.stopPropagation();
                        if (value === null) value = 0;
                        onRating(hospitalName, value);
                    }}/>
                </div>
                : ''
            }
        </InteractiveCard>
    )
}