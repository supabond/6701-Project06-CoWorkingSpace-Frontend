// "use client"
// import { DatePicker } from "@mui/x-date-pickers"
// import { LocalizationProvider } from "@mui/x-date-pickers"
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

// export default function DateReserve() {
//     return (
//         <div className="bg-slate-100 rounded-lg space-x-2 space-y-2 w-[100%] px-2.5 py-2.5 flex flex-row justify-center">
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DatePicker 
//                     className="bg-white w-[100%]"
//                     sx={{ '& .MuiInputBase-root': { height: '40px'} }} // Adjust the height as needed
//                 />
//             </LocalizationProvider>
//         </div>    
//     )
// }

'use client';

import { useState } from 'react';
import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

interface LocationDatePickerProps {
    label: string;
    value: Dayjs | null;
    onChange: (date: Dayjs | null) => void;
}

export default function DateReserve({ label, value, onChange }: LocationDatePickerProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
                label={label}
                value={value}
                onChange={onChange}
                className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
            />
        </LocalizationProvider>
    );
}