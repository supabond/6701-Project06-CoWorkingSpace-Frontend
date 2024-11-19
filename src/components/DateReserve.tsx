'use client';
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