'use client'

import BookingList from "@/components/BookingList"

export default function CartPage() {
    return (
        <main>
            <div className="flex items-left justify-center mt-16 mb-4"><div className="text-xl  font-medium  w-[95%]">My Booking</div></div>
            <div className="flex items-center justify-center">
                <hr className="mb-4 w-[95%] h-0.5 bg-black" />
            </div>
            <BookingList></BookingList>
        </main>
    )
}