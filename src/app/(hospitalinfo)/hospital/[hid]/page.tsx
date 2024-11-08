import Image from "next/image"
import getHospital from "@/libs/getHospital"
import { MobileDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { useState } from "react";
import DateReserve from "@/components/DateReserve";
import BookingSection from "@/components/BookingSection";

export default async function HospitalInformation( {params}:{ params: {hid:string}}) {
    
    const hospitalDetail = await getHospital(params.hid)

    // const [bookDate, setBookDate] = useState<Dayjs|null>(dayjs())

    return (
        // <main className="w-[100%] flex flex-col items-center p-2.5">
        //     <div className="w-[70%] rounded-lg shadow-md mt-20 p-10 bg-white border-2 border-gray-300">
        //         <div className="text-2xl mb-10 font-medium text-center">{ hospitalDetail.data.name }</div>
        //         <div className="flex flex-row items-left">
        //             <Image src={ hospitalDetail.data.picture }
        //                 alt='Hospital Image'
        //                 width={0} height={0} sizes="100vw"
        //                 className="rounded-lg w-[50%] border-2 border-gray-100"
        //             />   
        //             <div className="flex flex-col mx-5">
        //                 <div className="text-lg ml-5 mb-2">Name: { hospitalDetail.data.name }</div>
        //                 <div className="text-lg ml-5 mb-2">Address: { hospitalDetail.data.address }</div>
        //                 <div className="text-lg ml-5 mb-2">Phone: { hospitalDetail.data.district }</div>
        //                 <div className="text-lg ml-5 mb-2">Postal Code: { hospitalDetail.data.postalcode }</div>
        //                 <div className="text-lg ml-5 mb-2">Tel: { hospitalDetail.data.tel }</div>
        //             </div>
        //         </div>
        //     </div>
        // </main>
        

        <main className="w-[100%] flex flex-col items-center p-2.5">
            <div className="text-xl text-gray-500 mt-12 mb-5 font-light text-center">
                    Co-working space detail and booking
                </div>
            <div className="flex flex-row w-[70%] justify-center space-x-6 mt-5">
                <div className="w-[55%] relative h-[300px] rounded-lg shadow-none bg-white outline outline-2 outline-gray-400 outline-offset-4">
                    {/* <div className="text-2xl mb-10 font-medium text-center">{ hospitalDetail.data.name }</div> */}
                    
                    {/* <div className="flex items-center justify-center">
                        <hr className="mb-4 w-[100%] h-0.5 bg-gray-400" />
                    </div> */}


                        <Image src={ hospitalDetail.data.picture }
                            alt='Hospital Image'
                            layout = 'fill'
                            objectFit="cover"
                            // width={4} height={3} sizes="100vw"
                            className="rounded-lg"
                        /> 

                </div>
                <div className="w-[45%] rounded-lg shadow-none bg-white  outline outline-2 outline-gray-400 outline-offset-4 flex flex-col py-5 px-10 space-y-1">  
                            <div className="text-2xl font-semibold text-orange-500 mb-4">Info</div>
                            <div className="text-base flex flex-row">
                                <div className="w-[35%] font-medium">Name:</div>
                                <div className="w-[65%] font-light">{ hospitalDetail.data.name }</div>
                            </div>
                            <div className="text-base flex flex-row">
                                <div className="w-[35%] font-medium">Address:</div>
                                <div className="w-[65%] font-light">{ hospitalDetail.data.address }</div>
                            </div>
                            <div className="text-base flex flex-row">
                                <div className="w-[35%] font-medium">District:</div>
                                <div className="w-[65%] font-light">{ hospitalDetail.data.district }</div>
                            </div>
                            <div className="text-base flex flex-row">
                                <div className="w-[35%] font-medium">Postal Code:</div>
                                <div className="w-[65%] font-light">{ hospitalDetail.data.postalcode }</div>
                            </div>
                            <div className="text-base flex flex-row">
                                <div className="w-[35%] font-medium">Tel:</div>
                                <div className="w-[65%] font-light">{ hospitalDetail.data.tel }</div>
                            </div>               
                </div>
            </div>
            <BookingSection />
        </main>
    )
}