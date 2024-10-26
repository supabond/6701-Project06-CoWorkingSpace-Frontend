"use client"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

export default function DateReserve() {
    return (
        <div className="bg-slate-100 rounded-lg space-x-2 space-y-2 w-[100%] px-2.5 py-2.5 flex flex-row justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    className="bg-white w-[100%]"
                    sx={{ '& .MuiInputBase-root': { height: '40px'} }} // Adjust the height as needed
                />
            </LocalizationProvider>
        </div>    
    )
}