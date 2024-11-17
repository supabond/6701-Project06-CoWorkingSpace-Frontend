'use client'
import React, { useState, useEffect } from 'react';
import getBooking from '@/libs/getBooking';
import updateBooking from '@/libs/updateBooking';
import deleteBooking from '@/libs/deleteBooking';
import { IconButton } from '@mui/material';
import { BookingItem } from '../../interfaces';
import BookingCard from './BookingCard';
import Oval from 'react-loading';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function BookingList() {
    const [bookingItems, setBookingItems] = useState<BookingItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await getBooking();
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
        <div className="flex justify-center pt-20">
            <Oval
                color="#0000FF"
                height={80}
                width={80}
                aria-label="Loading"
            />
        </div>
        );
    }

    return (
        <div className="flex justify-center pt-20">
            {bookingItems.length === 0 ? (
                <h1 className="text-4xl text-center font-bold text-blue-700 p-3.5 text-[2.05rem]">
                    No Coworking Space Booked
                </h1>
            ) : (
                <div className="bg-white shadow-md rounded my-6 w-[80%]">
                    <table className="min-w-max w-full table-auto">
                        <thead>
                            <tr className="bg-blue-200 text-gray-600 uppercase text-sm leading-normal">
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