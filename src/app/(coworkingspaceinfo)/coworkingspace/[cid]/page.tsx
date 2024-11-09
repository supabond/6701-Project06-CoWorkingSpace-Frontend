// 'use client'

import Image from "next/image"
import getCoworkingspace from "@/libs/getCoworkingspace";
import { MobileDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { useState } from "react";
import DateReserve from "@/components/DateReserve";
import BookingSection from "@/components/BookingSection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function CoworkingspaceInformation( {params}:{ params: {cid:string}}) {
    
    const hospitalDetail = await getCoworkingspace(params.cid)

    const session = await getServerSession(authOptions);



    // const [bookDate, setBookDate] = useState<Dayjs|null>(dayjs())

    return (
        <main className="w-[100%] flex flex-col items-center p-2.5">
            <div className="text-xl text-gray-500 mt-12 mb-5 font-light text-center">
                    Co-working space detail and booking
                </div>
            <div className="flex flex-row w-[70%] justify-center space-x-10 mt-5 mb-5">
                <div className="w-[55%] relative h-[300px] rounded-lg shadow-none bg-white border border-2 border-gray-400">
                    {/* <div className="text-2xl mb-10 font-medium text-center">{ hospitalDetail.data.name }</div> */}
                    
                    {/* <div className="flex items-center justify-center">
                        <hr className="mb-4 w-[100%] h-0.5 bg-gray-400" />
                    </div> */}


                        <Image src={ hospitalDetail.data.picture }
                            alt='Hospital Image'
                            layout = 'fill'
                            objectFit="cover"
                            // width={4} height={3} sizes="100vw"
                            objectPosition="bottom"
                            className="rounded-md"
                        /> 

                </div>
                <div className="w-[45%] rounded-lg shadow-none bg-white border border-2 border-gray-400 flex-col py-5 px-10 space-y-1">  
                            <div className="text-xl font-semibold text-orange-500 mb-4">Info</div>
                            <div className="text-sm flex flex-row">
                                <div className="w-[35%] font-medium">Name:</div>
                                <div className="w-[65%] font-light">{ hospitalDetail.data.name }</div>
                            </div>
                            <div className="text-sm flex flex-row">
                                <div className="w-[35%] font-medium">Address:</div>
                                <div className="w-[65%] font-light">{ hospitalDetail.data.address }</div>
                            </div>
                            <div className="text-sm flex flex-row">
                                <div className="w-[35%] font-medium">Operating hours:</div>
                                <div className="w-[65%] font-light">{ hospitalDetail.data.operatingHours }</div>
                            </div>
                            <div className="text-sm flex flex-row">
                                <div className="w-[35%] font-medium">Province:</div>
                                <div className="w-[65%] font-light">{ hospitalDetail.data.province }</div>
                            </div>
                            <div className="text-sm flex flex-row">
                                <div className="w-[35%] font-medium">Postal Code:</div>
                                <div className="w-[65%] font-light">{ hospitalDetail.data.postalcode }</div>
                            </div>
                            <div className="text-sm flex flex-row">
                                <div className="w-[35%] font-medium">Tel:</div>
                                <div className="w-[65%] font-light">{ hospitalDetail.data.tel }</div>
                            </div>               
                </div>
            </div>
            <BookingSection token={session?.user.token || ''}/>
        </main>
    )
}