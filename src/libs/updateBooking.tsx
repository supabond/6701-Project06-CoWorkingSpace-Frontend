'use server'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { BookingItem } from '../../interfaces';

export default async function updateBooking(updatedBooking: BookingItem) {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error('No session found');
    }

    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${updatedBooking._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${session.user.token}`,
        },
        body: JSON.stringify(updatedBooking),
    });

    if (!res.ok) {
        throw new Error('Update booking failed');
    }

    return await res.json();
}
