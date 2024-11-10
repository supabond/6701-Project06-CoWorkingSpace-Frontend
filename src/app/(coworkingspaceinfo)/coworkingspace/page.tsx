import getCoworkingspaces from "@/libs/getCoworkingspaces"
import { Suspense, useEffect } from "react"
import { LinearProgress } from "@mui/material"
import CoworkingspaceCatalog from "@/components/CoworkingspaceCatalog"

export default function Coworkingspace() {
    const coworkingspaces = getCoworkingspaces()

    return (
        <main >
            <Suspense fallback={
                <div className="flex flex-col item-center px-9 py-9">
                    <div className='text-xl font-medium mb-5 text-center'>Loading ...</div>
                    <LinearProgress/>
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
