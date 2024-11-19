'use client'
import React, { useState, useEffect } from 'react';
import getBooking from '@/libs/getBooking';
import updateBooking from '@/libs/updateBooking';
import deleteBooking from '@/libs/deleteBooking';
import { BookingItem } from '../../interfaces';
import BookingCard from './BookingCard';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LinearProgress } from '@mui/material';
import { useAppSelector } from '@/redux/store';

export default function BookingList() {
    const [bookingItems, setBookingItems] = useState<BookingItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const roleColor = useAppSelector((state) => state.colorSlice);
    const headerColor = (roleColor.bgColor === 'bg-orange-500') ? 'bg-orange-200' : 'bg-blue-200'

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await getBooking();
                console.log('Booking data:', res);
                setBookingItems(res.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEdit = async (updatedBooking: BookingItem) => {
        try {
            await updateBooking(updatedBooking);
            setBookingItems((prevItems) => prevItems.map((item) => (item._id === updatedBooking._id ? updatedBooking : item)));
            toast.success('Booking updated');
        } catch (error) {
            toast.error('Error updating booking');
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteBooking(id);
            setBookingItems((prevItems) => prevItems.filter(item => item._id !== id));
            toast.success('Booking deleted');
        } catch (error) {
            toast.error('Error deleting booking');
        }
    };

    if (isLoading) {
        return (
        <div className="flex flex-col item-center ml-16 mr-12">
            <div className='text-lg text-gray-500 font-light mt-28 mb-6 text-center'>Loading ...</div>
            <LinearProgress style={{  backgroundColor: '#6b7280' }} sx={{ height:3, '& .MuiLinearProgress-bar': { backgroundColor: '#d1d5db' } }} />
        </div>
        );
    }

    return (
        <div className="flex justify-center pt-20">
            {bookingItems.length === 0 ? (
                // <h1 className="mt-10 text-2xl text-center font-light text-gray-400 p-3.5 text-[2.05rem]">
                //     No Coworking Space Booked
                // </h1>
                <div className="text-lg text-gray-500 font-light mt-10 text-center">
                    No Coworking Space Booked
                </div>
            ) : (
                <div className="bg-white shadow-md rounded my-6 w-[80%]">
                    <table className=" w-full table-auto">
                        <thead>
                            <tr className={`${headerColor} text-gray-600 uppercase text-sm leading-normal`}>
                                <th className="py-3 px-6 text-left">Coworking Space</th>
                                <th className="py-3 px-6 text-left">Booking Date</th>
                                <th className="py-3 px-6 text-left">Number of Rooms</th>
                                <th className="py-3 px-6 text-left">User ID</th>
                                <th className="py-3 px-6 text-left">Created At</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {bookingItems.map((bookingItem) => (
                                <BookingCard
                                    key={bookingItem._id}
                                    bookingItem={bookingItem}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}