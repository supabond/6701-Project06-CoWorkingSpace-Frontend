import React from 'react'
import { BookingItem } from '../../interfaces';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BookingCard({bookingItem, onDelete }: {bookingItem: BookingItem, onDelete: (id: string) => void}) {
    return (
        <tr key={bookingItem._id} className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6 text-left whitespace-nowrap">
                {bookingItem.coworkingspace.name}
            </td>
            <td className="py-3 px-6 text-left whitespace-nowrap">
                {new Date(bookingItem.bookingDate).toLocaleDateString()}
            </td>
            <td className="py-3 px-6 text-left">{bookingItem.numOfRooms}</td>
            <td className="py-3 px-6 text-left">{bookingItem.user}</td>
            <td className="py-3 px-6 text-left">
                {new Date(bookingItem.createdAt).toLocaleDateString()}
            </td>
            <td className="py-3 px-6 text-left">
                <IconButton color="error" onClick={() => onDelete(bookingItem._id)}>
                    <DeleteIcon />
                </IconButton>
            </td>
        </tr>
    );
}
