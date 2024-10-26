import Image from "next/image"
import getHospital from "@/libs/getHospital"
export default async function HospitalInformation( {params}:{ params: {hid:string}}) {
    
    const hospitalDetail = await getHospital(params.hid)

    return (
        <main className="w-[100%] flex flex-col items-center p-2.5">
            <div className="w-[70%] rounded-lg shadow-md mt-10 p-10 bg-white border-2 border-gray-300">
                <div className="text-2xl mb-10 font-medium text-center">{ hospitalDetail.data.name }</div>
                <div className="flex flex-row items-left">
                    <Image src={ hospitalDetail.data.picture }
                        alt='Hospital Image'
                        width={0} height={0} sizes="100vw"
                        className="rounded-lg w-[50%] border-2 border-gray-100"
                    />   
                    <div className="flex flex-col mx-5">
                        <div className="text-lg ml-5 mb-2">Name: { hospitalDetail.data.name }</div>
                        <div className="text-lg ml-5 mb-2">Address: { hospitalDetail.data.address }</div>
                        <div className="text-lg ml-5 mb-2">Phone: { hospitalDetail.data.district }</div>
                        <div className="text-lg ml-5 mb-2">Postal Code: { hospitalDetail.data.postalcode }</div>
                        <div className="text-lg ml-5 mb-2">Tel: { hospitalDetail.data.tel }</div>
                    </div>
                </div>
            </div>
        </main>
    )
}