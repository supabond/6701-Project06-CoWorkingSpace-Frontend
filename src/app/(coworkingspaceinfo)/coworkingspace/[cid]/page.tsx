import getCoworkingspace from "@/libs/getCoworkingspace";
import { Suspense } from "react";
import BookingSection from "@/components/BookingSection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import InfoSection from "@/components/InfoSection";
import CoworkingspaceToolBar from "@/components/CoWorkingspaceToolBar";
import getUserProfile from "@/libs/getUserProfile";
import {LinearProgress} from "@mui/material";

export default async function CoworkingspaceInformation( {params}:{ params: {cid:string}}) {
    
    const hospitalDetail = await getCoworkingspace(params.cid)

    const session = await getServerSession(authOptions);
    const profile = session? await getUserProfile(session?.user.token || ''): '';

    return (
        <main className="w-[100%] flex flex-col items-center p-2.5">
            <Suspense fallback={
                <div className="flex flex-col item-center ml-16 mr-12">
                   <div className='text-lg text-gray-500 font-light mt-28 mb-6 text-center'>Loading ...</div>
                   <LinearProgress style={{  backgroundColor: '#6b7280' }} sx={{ height:3, '& .MuiLinearProgress-bar': { backgroundColor: '#d1d5db' } }} />
               </div>
            }>
                <div className="text-lg text-gray-500 mt-20 mb-5 font-light text-center">
                        Co-working space details and booking
                </div>
                {
                (profile && profile.data.role === 'admin')?
                    <CoworkingspaceToolBar cid={params.cid} token={session?.user.token || ''}/>
                    :null
                }
                    <InfoSection hospitalDetail = {hospitalDetail}cid={params.cid} token={session?.user.token || ''} />

                <BookingSection token={session?.user.token || ''} cid={params.cid}/>
            </Suspense>
        </main>
    )
}