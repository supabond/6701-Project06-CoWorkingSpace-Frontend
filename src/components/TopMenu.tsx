'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useAppSelector, AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setOrange, setBlue } from '../redux/features/colorSlice';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import Profile from './ProfileIcon';

export default function TopMenu() {
    const { data: session } = useSession();
    const roleColor = useAppSelector((state) => state.colorSlice);
    const dispatch = useDispatch<AppDispatch>();

    // State to track the selected color
    const [selectedColor, setSelectedColor] = useState('orange'); // Default selected color

    const handleColorChange = (event: SelectChangeEvent<string>) => {
        const color = event.target.value as string;
        setSelectedColor(color);
        if (color === 'orange') {
            dispatch(setOrange());
        } else {
            dispatch(setBlue());
        }
    };

    return (
        <div className="h-20 bg-white fixed top-0 left-0 right-0 z-30 flex flex-row justify-start">
            <Link href="/">
                <div className="flex items-center ml-16 mr-12 h-full">
                    <Image src="/img/logo.png" alt="logo" width={100} height={100} sizes="100vh" />
                </div>
            </Link>

            <TopMenuItem title="Co-working space" pageRef="/coworkingspace" hoverTextColor={roleColor.hoverTextColor} />
            <TopMenuItem title="My Booking" pageRef="/mybooking" hoverTextColor={roleColor.hoverTextColor} />
            <div className="flex flex-row w-[20%] space-x-5">
                <div className="w-[200px] flex flex-col items-center justify-center">
                    <FormControl
                        variant="outlined"
                        size="small"
                        
                        sx={{
                        width: 120,
                        marginTop: 0,
                        paddingTop: 0,
                        
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'transparent',
                        },
                        }}
                    >
                        <Select
                        id="color-select"
                        value={selectedColor}
                        onChange={handleColorChange}
                        displayEmpty
                        MenuProps={{
                            disableScrollLock: true,
                        }}
                        sx={{
                            padding: 0,
                            backgroundColor: selectedColor === 'orange' ? '#fed7aa' : '#bfdbfe', // Light orange and light blue
                            borderRadius: 10,
                        }}
                        >
                        <MenuItem value="orange">Orange</MenuItem>
                        <MenuItem value="blue">Blue</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>


            {session ? (
                <Profile name={session.user.name} />
            ) : (
                <div>
                    <Link href="/login">
                        <div className = {`w-24 h-10 absolute top-5 right-48 bg-white ${roleColor.textColor} border-2 ${roleColor.borderColor} flex justify-center items-center text-lg font-semibold py-2 px-2 rounded-2xl z-30 absolute ${roleColor.hoverBgColor} hover:text-white hover:border-none`}>
                            Login
                        </div>
                    </Link>
                    <Link href="/register">
                    <div className = {`w-24 h-10 absolute top-5 right-12 ${roleColor.bgColor} flex justify-center items-center text-white text-lg font-semibold py-2 px-2 rounded-2xl z-30 absolute ${roleColor.hoverBgColor}`}>
                            Register
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
}