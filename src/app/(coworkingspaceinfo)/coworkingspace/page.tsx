import getCoworkingspaces from "@/libs/getCoworkingspaces"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import CoworkingspaceCatalog from "@/components/CoworkingspaceCatalog"
import { CoworkingspaceJson } from "../../../../interfaces"
export default async function Coworkingspace() {
    const coworkingspaces: CoworkingspaceJson = await getCoworkingspaces()

    return (
        <main >
            <Suspense fallback={
               <div className="flex flex-col item-center ml-16 mr-12">
                   <div className='text-lg text-gray-500 font-light mt-28 mb-6 text-center'>Loading ...</div>
                   <LinearProgress style={{  backgroundColor: '#6b7280' }} sx={{ height:3, '& .MuiLinearProgress-bar': { backgroundColor: '#d1d5db' } }} />
               </div>
                }>
                <div className="text-lg text-gray-500 font-light mt-24 text-center">
                    Click on the co-working space to see more details and book.
                </div>
                <CoworkingspaceCatalog coworkingspacesJson = {coworkingspaces}/>
            </Suspense>
        </main>
    )
}
