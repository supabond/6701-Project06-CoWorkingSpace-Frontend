export default async function postBooking(bookingDate:string, numOfRooms:number, coworkingspace:string, createdAt:string, token:string) {
    
    const response = await fetch( `${process.env.BACKEND_URL}/api/v1/coworkingspaces/${coworkingspace}/bookings` ,{
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