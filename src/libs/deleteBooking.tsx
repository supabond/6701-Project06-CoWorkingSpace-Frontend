'use server'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export default async function deleteBooking(id: string) {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error('No session found');
    }

    const res = await fetch(`http://localhost:5555/api/v1/bookings/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${session.user.token}`,
        },
    })

    if (!res.ok) {
        throw new Error('Delete booking failed');
    }

    return await res.json();
}