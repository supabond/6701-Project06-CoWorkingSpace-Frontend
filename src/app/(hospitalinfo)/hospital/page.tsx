// import CardPanel from "@/components/CardPanel"
import getHospitals from "@/libs/getHospitals"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import HospitalCatalog from "@/components/HospitalCatalog"

export default function Hospital() {
    const hospitals = getHospitals()

    return (
        <main >
            <Suspense fallback={
                <div className="flex flex-col item-center px-9 py-9">
                    <div className='text-xl font-medium mb-5 text-center'>Loading ...</div>
                    <LinearProgress/>
                </div>
                }>
                <div className="text-xl font-medium" style={{padding:"30px 35px 5px 35px"}}>
                    Hospital :
                </div>
                <HospitalCatalog hospitalsJson = {hospitals}/>
            </Suspense>
        </main>
    )
}
