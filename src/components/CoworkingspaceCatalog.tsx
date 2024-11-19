import Card from "./Card"
import Link from "next/link"
import { CoworkingspaceJson } from "../../interfaces"
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import AddCoworkingspaceButton from "./AddCoworkingspaceButton";

export default async function CoworkingspaceCatalog({ coworkingspacesJson }: { coworkingspacesJson: CoworkingspaceJson }) {
    const coworkingspacesJsonReady = await coworkingspacesJson
    const session = await getServerSession(authOptions);
    

    const profile = session? await getUserProfile(session?.user.token || ''): '';


    return (
        <div>
            <div className="px-16 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(profile && profile.data.role === 'admin')?
               <AddCoworkingspaceButton/>
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