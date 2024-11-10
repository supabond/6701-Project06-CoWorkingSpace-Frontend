import { useReducer } from "react"
import Card from "./Card"
import Link from "next/link"
import { CoworkingspaceJson, CoworkingspaceItem } from "../../interfaces"
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";

export default async function CoworkingspaceCatalog({ coworkingspacesJson }: { coworkingspacesJson: Promise<CoworkingspaceJson> }) {
    const coworkingspacesJsonReady = await coworkingspacesJson
    const session = await getServerSession(authOptions);
    

    const profile = session? await getUserProfile(session?.user.token || ''): '';


    return (
        <div>
            <div className="px-16 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(profile && profile.data.role === 'admin')?
                <div className='w-full h-[300px] bg-white border border-2 rounded-md border-gray-300 outline outline-2 outline-offset-4 outline-blue-700 flex justify-center items-center' >
                        {/* <AddCircleIcon fontSize="inherit" sx={{ width: '60%', height: '60%' }} color="primary"/> */}
                    <Link href="/coworkingspace/create" passHref className="flex justify-center itmes-center">
                    <IconButton 
                                sx={{
                                    width: '60%',
                                    height: '60%',
                                    color: 'primary.main', // Color of icon
                                    '&:hover': {
                                    color: 'primary.dark', // Color of icon when hovered
                                    },
                                }}>
                        <AddCircleOutlineIcon fontSize="large" sx={{ width: '100%', height: '100%' }}/>
                    </IconButton>
                    </Link>
                </div>
                :null
            }
            {coworkingspacesJsonReady.data.map((coworkingspaceItem)=>(
                <Link key={coworkingspaceItem.id} href={`/coworkingspace/${coworkingspaceItem.id}`} >
                    <Card coworkingspaceName={coworkingspaceItem.name} coworkingspaceAddress={coworkingspaceItem.address} coworkingspaceOperatingHours={coworkingspaceItem.operatingHours} imgSrc={coworkingspaceItem.picture}/>
                </Link>
            ))} 
            </div>
        </div>

    )
}