"use client"
import { useReducer } from "react"
import Card from "./Card"
import Link from "next/link"
import { HospitalJson } from "../../interfaces"

// export interface HospitalItem {
//     _id: string;
//     name: string;
//     address: string;
//     district: string;
//     province: string;
//     postalcode: string;
//     tel: string;
//     picture: string;
//     _v?: number;
//     id: string;
// }

// export interface HospitalJson {
//     success: boolean;
//     count: number;
//     pagination: Object,
//     data: HospitalItem[];
// }

export default async function HospitalCatalog({ hospitalsJson }: { hospitalsJson: Promise<HospitalJson> }) {
    const hospitalsJsonReady = await hospitalsJson
    return (
        <div>
            <div className="px-16 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hospitalsJsonReady.data.map((hospitalItem)=>(
                <Link key={hospitalItem.id} href={`/hospital/${hospitalItem.id}`} >
                    <Card hospitalName={hospitalItem.name} imgSrc={hospitalItem.picture} />
                </Link>
            ))} 
            </div>
        </div>

    )
}