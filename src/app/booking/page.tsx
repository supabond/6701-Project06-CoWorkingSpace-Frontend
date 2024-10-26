'use client'

import { Select, MenuItem, SelectChangeEvent } from "@mui/material"
import { MobileDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
import { BookingItem } from "../../../interfaces";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

// import getUserProfile from "@/libs/getUserProfile";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default function Booking() {

    const [name, setName] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [cid, setCID] = useState<string>('')
    const [hospital, setHospital] = useState<string>('')
    const [bookDate, setBookDate] = useState<Dayjs|null>(null)
    const [loading, setLoading] = useState(false);
    const [completed, setCompleted] = useState(false);

    const dispatch = useDispatch<AppDispatch>()

    const handleButtonClick = () => {
        setLoading(true);
        setTimeout(() => {
            const success = makeBooking();
            setLoading(false);
            if (success) {
                setCompleted(true);
                setTimeout(() => {
                    setCompleted(false);
                }, 2000); // Change back to original text after 1 seconds
            }
        }, 2000); // Simulate a 1-second loading time
    };
    
    const makeBooking = () => {
        if( cid && name && lastname && hospital && bookDate) {
            const item:BookingItem = {
                name: name,
                surname: lastname,
                id: cid,
                hospital: hospital,
                bookDate: bookDate.format('YYYY/MM/DD')
            }
            
            dispatch(addBooking(item))
            return true;
        }else {
            alert("Please fill in all fields")
            return false;
        }
    }

    // const session = await getServerSession(authOptions);
    // if(!session || !session.user.token) {
    //     return (
    //         <main className="w-[100%] flex flex-col items-center">
    //             <div className="w-[30%] h-fit flex flex-col items-center border-2 border-gray-300 rounded-lg shadow-md mt-20 p-2.5 bg-white">
    //                 <div className="p-2.5 text-base font-medium ">
    //                     Please Sign In to Book Vaccine
    //                 </div>
    //             </div>
    //         </main>
    //     )
    // }
    // const profile = await getUserProfile(session.user.token);
    // var createdAt = new Date(profile.data.createdAt);

    return (
        <main className="w-[100%] flex flex-col items-center p-2.5">
            {/* <div className="w-[90%] h-fit flex flex-col items-left border-2 border-gray-300 rounded-lg shadow-md mt-5 p-5 bg-white">
                <div className="flex flex-row">
                    <div className="w-[25%]">
                        <div className="text-md text-left text-black font-semibold">
                            Full Name
                        </div>
                        <div className="text-md text-left text-black">
                            {profile.data.name}
                        </div>
                    </div>
                    <div className="w-[25%]">
                        <div className="text-md text-left text-black font-semibold">
                            Email
                        </div>
                        <div className="text-md text-left text-black">
                            {profile.data.email}
                        </div>
                    </div>
                    <div className="w-[25%]">
                        <div className="text-md text-left text-black font-semibold">
                            Tel.
                        </div>
                        <div className="text-md text-left text-black">
                            {profile.data.tel}
                        </div>
                    </div>
                    <div className="w-[25%]">
                        <div className="text-md text-left text-black font-semibold">
                            Member Since
                        </div>
                        <div className="text-md text-left text-black">
                            {createdAt.toString()}
                        </div>
                    </div>
                </div>
            </div> */}



            <div className="w-[50%] flex flex-col items-left space-y-3 border-2 border-gray-300 rounded-lg shadow-md mt-2.5 px-10 py-5 bg-white">
                <div className="p-2.5 mb-5 text-center text-2xl font-bold ">
                    Vaccine Booking
                </div>
                <div>
                    <div className="text-md text-left text-black font-semibold">
                        Enter Your Name
                    </div>
                    <TextField label="Name" name="Name" variant="standard" className="w-[100%] mb-5" required
                    onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div>
                    <div className="text-md text-left text-black font-semibold" >
                        Enter Your Lastname
                    </div>
                    <TextField label="Lastname" name="Lastname" variant="standard" className="w-[100%] mb-5" required
                    onChange={(e)=>{setLastname(e.target.value)}}/>
                </div>
                <div>
                    <div className="text-md text-left text-black font-semibold">
                        Enter Your Citizen ID
                    </div>
                    <TextField label="Citizen ID" name="Citizen ID" variant="standard" className="w-[100%] mb-5" required
                    onChange={(e)=>{setCID(e.target.value)}}/>
                </div>
                <div>
                    <div className="text-md text-left text-black font-semibold">
                        Select Hospital
                    </div>
                    <Select variant="standard" name="hospital" id="hospital" className="h-[2em] w-[100%] mb-5" required
                    value={hospital} onChange={(e: SelectChangeEvent<string>) => setHospital(e.target.value)}>
                        <MenuItem value="Chula">Chulalongkorn Hospital</MenuItem>
                        <MenuItem value="Rajavithi">Rajavithi Hospital</MenuItem>
                        <MenuItem value="Thammasat">Thammasat University Hospital</MenuItem>
                    </Select>
                </div>
                <div>
                    <div className="text-md text-left text-black font-semibold mb-2">
                        Pick a Date for Vaccine Appointment
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker  className="w-[100%]" value={bookDate} 
                            onChange={(value)=>{setBookDate(value);}}
                        /> 
                    </LocalizationProvider>

                </div>
                <div className="flex justify-center">
                    <Button
                        name="Book Vaccine"
                        className={`w-[100%] block rounded-md px-3 py-2 mt-5 text-white shadow-sm hover ${
                            loading ? 'bg-sky-600' : completed ? 'bg-green-600 hover:bg-green-600' : 'bg-sky-600 hover:bg-indigo-600'
                        }`}
                        onClick={handleButtonClick}
                        disabled={loading}
                        variant="contained"
                        color="primary"
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : completed ? (
                            'Complete'
                        ) : (
                            'Book Vaccine'
                        )}
                    </Button>
                </div>



            </div>

        </main>
    );

}