// import { removeBooking } from "@/redux/features/colorSlice";
// import { AppDispatch, useAppSelector } from "@/redux/store";
// import { IconButton } from '@mui/material';
// import { useDispatch } from "react-redux";

// export default function BookingList() {
//     // const bookItems = useAppSelector((state) => state.bookSlice.bookItems);
//     const dispatch = useDispatch<AppDispatch>();

//     if (bookItems.length === 0) {
//         return (
//             <div className="flex flex-col items-center py-40">
//                 <div className="text-xl text-gray-400">No Vaccine Booking</div>
//             </div>
//         )
//     }


//     return (
//         <div className="flex flex-col items-center">
//             <div className="w-[95%] flex flex-col items-center">
//             <div className="w-full flex-grow overflow-y-auto" style={{ maxHeight: '500px' }}>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {bookItems.map((bookItem) => (
//                             <div className="flex flex-col border-2 border-gray-300 rounded-lg shadow-md p-5 bg-white" key={bookItem.id}>
//                                 <div className="grid grid-cols-[1fr_1fr] gap-2">
//                                     <div className="font-bold">Name:</div>
//                                     <div>{bookItem.name}</div>
//                                     <div className="font-bold">Lastname:</div>
//                                     <div>{bookItem.surname}</div>
//                                     <div className="font-bold">CitizenID:</div>
//                                     <div>{bookItem.id}</div>
//                                     <div className="font-bold">Hospital:</div>
//                                     <div>{bookItem.hospital}</div>
//                                     <div className="font-bold">BookDate:</div>
//                                     <div>{bookItem.bookDate}</div>
//                                 </div>
//                                 <div className="flex justify-end">
//                                     <IconButton
//                                         aria-label="delete"
//                                         color="secondary"
//                                         onClick={() => dispatch(removeBooking(bookItem.id))}
//                                         className="hover:bg-gray-500 rounded-full p-1"
//                                     >
//                                         <img src='./img/icons8-delete-48.png' alt="Delete" width="24" height="24" />
//                                     </IconButton>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>


//     );
// }