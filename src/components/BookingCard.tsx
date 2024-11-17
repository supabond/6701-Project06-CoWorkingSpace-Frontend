import React, { useState } from 'react'; // Import useState for editing state
import { BookingItem } from '../../interfaces';
import { IconButton, TextField, Button } from '@mui/material';
import DateReserve from '@/components/DateReserve';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BookingCard({ bookingItem, onDelete, onEdit }: { bookingItem: BookingItem; onDelete: (id: string) => void; onEdit: (updatedBooking: BookingItem) => void }) {
  const [isEdit, setIsEdit] = useState(false);
  const [editedBooking, setEditedBooking] = useState({ ...bookingItem });

  const handleEditClick = () => {
    setIsEdit(true);
  };

  const handleSaveClick = () => {
    onEdit(editedBooking);
    setIsEdit(false);
  };

  const handleCancelClick = () => {
    setEditedBooking({ ...bookingItem });
    setIsEdit(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedBooking({ ...editedBooking, [event.target.name]: event.target.value });
  };

  return (
    <tr key={bookingItem._id} className="border-b border-gray-200 hover:bg-gray-100">
      {isEdit ? (
        <>
          <td className="py-3 px-6 text-left whitespace-nowrap">
            {bookingItem.coworkingspace.name}
          </td>
          <td className="py-3 px-6 text-left whitespace-nowrap">
            <DateReserve label="Booking Date" value={dayjs(editedBooking.bookingDate)} onChange={(date) => setEditedBooking({ ...editedBooking, bookingDate: date?.format('YYYY-MM-DD') || '' })} />
          </td>
          <td className="py-3 px-6 text-left">
            <TextField
              name="numOfRooms"
              label="Number of Rooms"
              type="number"
              value={editedBooking.numOfRooms}
              onChange={handleChange}
              inputProps={{
                min: 1,
                max: 3,
            }}
            />
          </td>
          <td className="py-3 px-6 text-left">{editedBooking.user}</td>
          <td className="py-3 px-6 text-left">
            {new Date(bookingItem.createdAt).toLocaleDateString()}
          </td>
          <td className="py-3 px-6 text-left">
            <Button variant="contained" color="primary" size="small" endIcon={<SaveIcon />} onClick={handleSaveClick}>
              Save
            </Button>
            <Button variant="contained" color="error" size="small" endIcon={<CancelIcon />} onClick={handleCancelClick}>
              Cancel
            </Button>
          </td>
        </>
      ) : (
        <>
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
            <IconButton color="primary" onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => onDelete(bookingItem._id)}>
              <DeleteIcon />
            </IconButton>
            </td>
        </>
    )}
    </tr>
  )}