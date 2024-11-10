export default async function postBooking(bookingDate:string, numOfRooms:number, coworkingspace:string, createdAt:string, token:string) {
    
    const dummy_coworkingspace = '6724d1163b3649fca966d9e7';
    const response = await fetch( `http://localhost:5555/api/v1/coworkingspaces/${coworkingspace}/bookings` ,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "bookingDate": bookingDate,
            "numOfRooms": numOfRooms,
            "createdAt": createdAt
        }),
   
    })

    if(!response.ok) {
        throw new Error('Post Booking failed');
    }

    return await response.json();
}