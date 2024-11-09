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
// import { BookingItem } from "../../../interfaces";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SendIcon from '@mui/icons-material/Send';

// import getUserProfile from "@/libs/getUserProfile";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default function CreateCoworkingspace() {

    const [name, setName] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [operatingHours, setOperatingHours] = useState<string>('')
    const [province, setProvince] = useState<string>('')
    const [postalCode, setPostalCode] = useState<string>('')
    const [tel, setTel] = useState<string>('')
    const [picture, setPicture] = useState<string>('')
    const [loading, setLoading] = useState(false);
    const [completed, setCompleted] = useState(false);

    const dispatch = useDispatch<AppDispatch>()

    // const handleButtonClick = () => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         const success = handleCreateCoworkingspace();
    //         setLoading(false);
    //         if (success) {
    //             setCompleted(true);
    //             setTimeout(() => {
    //                 setCompleted(false);
    //             }, 2000); // Change back to original text after 1 seconds
    //         }
    //     }, 2000); // Simulate a 1-second loading time
    // };
    
    const handleCreateCoworkingspace = async () => {
        // alert(1);
        // const response = await postBooking(bookDate?.format('YYYY-MM-DD') || '', numOfRooms, 'coworkingspace', createdAt.format('YYYY-MM-DD'), token);    
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setCompleted(true);
                setTimeout(() => {
                    setCompleted(false);
            }, 2000);
        }, 2000);
    };
    

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
        <main className="w-[100%] flex flex-col items-center mt-5">
            <div className="text-lg text-gray-500 font-light mt-12 mb-8 text-center">
                Provide coworking space information and submit.
            </div>
                <div className="w-[70%] justify-center px-2 py-16 grid grid-cols-[40%_40%] gap-y-8 gap-x-20 border border-2 rounded-lg">
                    <div>
                        <div className="text-md text-left text-black font-semibold">
                            Enter Name
                        </div>
                        <TextField placeholder="Name" name="Name" variant="standard" className="w-[100%] mb-5" 
                        onChange={(e)=>{setName(e.target.value)}}
                        />
                    </div>
                    <div>
                        <div className="text-md text-left text-black font-semibold" >
                            Enter Address
                        </div>
                        <TextField multiline placeholder="Address" name="Address" variant="standard" className="w-[100%] mb-5" required
                        onChange={(e)=>{setAddress(e.target.value)}}/>
                    </div>
                    <div>
                        <div className="text-md text-left text-black font-semibold" >
                            Enter Operating Hours
                        </div>
                        <TextField placeholder="OperatingHours" name="OperatingHours" variant="standard" className="w-[100%] mb-5" required
                        onChange={(e)=>{setOperatingHours(e.target.value)}}/>
                    </div>
                    <div>
                        <div className="text-md text-left text-black font-semibold" >
                            Enter Province
                        </div>
                        <TextField placeholder="Province" name="Province" variant="standard" className="w-[100%] mb-5" required
                        onChange={(e)=>{setProvince(e.target.value)}}/>
                    </div>
                    <div>
                        <div className="text-md text-left text-black font-semibold" >
                            Enter Tel.
                        </div>
                        <TextField placeholder="Tel" name="Tel" variant="standard" className="w-[100%] mb-5" required
                        onChange={(e)=>{setTel(e.target.value)}}/>
                    </div>
                    <div>
                        <div className="text-md text-left text-black font-semibold">
                            Enter Postal Code
                        </div>
                        <TextField placeholder="Postal Code" name="Postal Code" variant="standard" className="w-[100%] mb-5" required
                        onChange={(e)=>{setPostalCode(e.target.value)}}/>
                    </div>
                    <div>
                        <div className="text-md text-left text-black font-semibold" >
                            Enter Picture URL
                        </div>
                        <TextField placeholder="Picture" name="Picture" variant="standard" className="w-[100%] mb-5" required
                        onChange={(e)=>{setPicture(e.target.value)}}/>
                    </div>

  

                    <div className="flex items-end">
                        <Button
                            name="Create coworkingspace"
                            className={`w-[100%] h-[80%] block px-3 py-2 mt-5 text-white shadow-sm hover ${
                                loading ? '' : completed ? '!bg-green-600' : 'bg-sky-600 hover:bg-indigo-600'
                            }`}
                            sx={{ textTransform: 'none', borderRadius: '1rem', fontSize: '1rem' }}
                            onClick={handleCreateCoworkingspace}
                            disabled={(loading || completed)}
                            variant="contained"
                            color="primary"
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : completed ? (
                                <CheckCircleOutlineIcon sx={{ color: 'white', fontSize: '36px'}}/>
                            ) : (
                                <div>Create<SendIcon className="ml-3"/></div>
                                
                            )}
                        </Button>
                    </div>
                </div>

        </main>
    );

}