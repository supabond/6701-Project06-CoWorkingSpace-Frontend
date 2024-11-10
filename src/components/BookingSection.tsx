'use client';

import { useState } from "react";
import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import postBooking from "@/libs/postBooking";
import { Slider } from "@mui/material";

export default function BookingSection({token, cid}:{token:string, cid:string}) {
    const [bookDate, setBookDate] = useState<Dayjs | null>(dayjs());
    const [numOfRooms, setNumOfRooms] = useState<number>(1);
    const [showModal, setShowModal] = useState(false);

    const handleBookingSubmit = async () => {
        if (!token) {
            setShowModal(true);
            return;
        }
        const createdAt = dayjs();
        const response = await postBooking(bookDate?.format('YYYY-MM-DD') || '', numOfRooms, cid, createdAt.format('YYYY-MM-DD'), token);    
        
    };


    return (
        <div className="w-[70%] rounded-lg shadow-none mt-5 bg-white border border-2 border-gray-400 py-5 px-10">
            <div className="text-xl font-semibold text-orange-500 mb-4">Booking</div>
            <div className="flex flex-row flex-justify-start items-center">
                <div className="text-base text-left text-black font-normal mr-2">
                    Book Date: 
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                        value={bookDate}
                        onChange={(newDate) => setBookDate(newDate)}
                        className="w-[20%]"
                        orientation="landscape"
                        
                    />
                </LocalizationProvider>
                <div className="ml-4 mr-4 text-base text-left text-black font-normal pl-4">
                    The number of rooms:
                </div>
                {/* <input type='number' name='numOfGuests' min={1} 
                    value={numOfGuests}
                    onChange={(e) => setNumOfGuests(parseInt(e.target.value))}
                className='w-[8%] bg-white border-2 mr-24 border-gray-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400'/> */}
                <div className="px-5 py-2 border border-1 border-gray-300 w-[20%] mr-24 rounded hover:border-gray-500">
                    <Slider
                        aria-label="Always visible"
                        defaultValue={numOfRooms}
                        getAriaValueText={(value) => `${value}`}
                        onChange={(e, value) => {setNumOfRooms(value as number)}}
                        step={1}
                        valueLabelDisplay="on"
                        marks={[
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ]}
                        min={1}  // Optional: To ensure the slider starts at 1
                        max={3}  // Optional: To ensure the slider ends at 3
                        
                    />
                </div>

                <div className="rounded w-[15%] h-14 flex">
                    <button onClick={handleBookingSubmit} className="w-full h-full text-lg p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl">Book</button>
                </div>
                {/* Modal */}
                {/* Modal */}
                {showModal && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-85 flex flex-col justify-center items-center"
                        onClick={() => setShowModal(false)} // Close modal on overlay click
                    >
                        {/* Modal Content */}
                        <div 
                            className="bg-white h-[20%] w-[30%] text-gray-700 p-5  shadow-md flex flex-col justify-center items-center"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                        >
                            <p className="text-lg font-normal">
                                Please log in to book co-working space.
                            </p>
                        </div>
                        <div className="mt-5 text-base text-white">Tap anywhere else to close.</div>
                    </div>
                )}
            </div>
        </div>
    );
}
