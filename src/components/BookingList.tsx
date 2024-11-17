'use client'
import React, { useState, useEffect } from 'react';
import getBooking from '@/libs/getBooking';
import deleteBooking from '@/libs/deleteBooking';
import { IconButton } from '@mui/material';
import { BookingItem } from '../../interfaces';
import BookingCard from './BookingCard';

export default function BookingList() {
    const [bookingItems, setBookingItems] = useState<BookingItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getBooking();
                console.log(res);
                setBookingItems(res.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteBooking(id);
            
            setBookingItems((prevItems) => prevItems.filter(item => item._id !== id));
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

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
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}