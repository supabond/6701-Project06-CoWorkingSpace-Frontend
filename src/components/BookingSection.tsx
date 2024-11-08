'use client';

import { useState } from "react";
import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";

export default function BookingSection() {
    const [bookDate, setBookDate] = useState<Dayjs | null>(dayjs());


    return (
        <div className="w-[70%] rounded-lg shadow-none mt-5 bg-white outline outline-2 outline-gray-400 outline-offset-4 py-5 px-10">
            <div className="text-2xl font-semibold text-orange-500 mb-4">Booking</div>
            <div className=" flex flex-row flex-justify-start items-center">
                <div className="text-lg text-left text-black font-normal mr-5">
                    Enter Book Date: 
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                        value={bookDate}
                        onChange={(newDate) => setBookDate(newDate)}
                        className="w-[40%]"
                        orientation="landscape"
                        
                    />
                </LocalizationProvider>
            </div>
        </div>
    );
}
