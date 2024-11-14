'use client';

import { useState } from "react";
import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import postBooking from "@/libs/postBooking";
import { Slider } from "@mui/material";
import { useAppSelector } from "@/redux/store";
// import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import BookIcon from '@mui/icons-material/Book';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

export default function BookingSection({token, cid}:{token:string, cid:string}) {
    const [bookDate, setBookDate] = useState<Dayjs | null>(dayjs());
    const [numOfRooms, setNumOfRooms] = useState<number>(1);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [completed, setCompleted] = useState(false);
    const roleColor = useAppSelector( (state) => state.colorSlice )

    const handleBookingSubmit = async () => {
        if (!token) {
            setShowModal(true);
            return;
        }
    
        const createdAt = dayjs();
        setLoading(true);
    
        try {
            const success = await new Promise((resolve) => {
                setTimeout(async () => {
                    const result = await postBooking(
                        bookDate?.format('YYYY-MM-DD') || '',
                        numOfRooms,
                        cid,
                        createdAt.format('YYYY-MM-DD'),
                        token
                    );
                    resolve(result);
                }, 2000); // Simulate a 2-second loading time
            });
    
            if (success) {
                setLoading(false);
                setCompleted(true);
                setTimeout(() => {
                    setCompleted(false);
                }, 2000); // Change back to original text after 2 seconds
            }
        } catch (error) {
            console.error("Booking failed:", error);
        } 
    };


    return (
        <div className="w-[70%] rounded-lg shadow-none mt-5 bg-white border border-2 border-gray-400 py-5 px-10">
            <div className={`text-xl font-semibold ${roleColor.textColor} mb-4`}>Booking</div>
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
                    {/* <button onClick={handleBookingSubmit} className={`w-full h-full text-lg p-2 ${roleColor.bgColor} ${roleColor.hoverBgColor} text-white rounded-2xl`}>Book</button> */}
                    <button className={`w-full h-full text-lg p-5 text-white rounded-2xl  flex items-center justify-center ${
                            loading ? 'bg-gray-300' : completed ? '!bg-green-600' : `${roleColor.bgColor} ${roleColor.hoverBgColor}`}`}
                        onClick={handleBookingSubmit}
                        disabled={loading || completed}
      
 

                    >
                    {loading ? (
                                <CircularProgress size={24} sx={{color: 'black'}} color="inherit" />
                            ) : completed ? (
                                <CheckCircleOutlineIcon sx={{ color: 'white', fontSize: '36px'}}/>
                            ) : (
                                <div className="flex flex-row">Book<BookIcon className="ml-1"/></div>
                                
                            )}

                    </button>
                </div>
                {/* Modal */}
                {/* Modal */}
                
            </div>

    
      
            {showModal && (
                <Dialog
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Login Required"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You need to login to book a coworking space.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowModal(false)} color="primary" sx={{ textTransform: 'none', color: '#F97316' }}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        
        </div>
    )

}