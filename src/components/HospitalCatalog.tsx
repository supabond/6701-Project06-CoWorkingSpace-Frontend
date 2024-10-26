"use client"
import { useReducer } from "react"
import Card from "./Card"
import Link from "next/link"

export interface HospitalItem {
    _id: string;
    name: string;
    address: string;
    district: string;
    province: string;
    postalcode: string;
    tel: string;
    picture: string;
    _v?: number;
    id: string;
}

export interface HospitalJson {
    success: boolean;
    count: number;
    pagination: Object,
    data: HospitalItem[];
}

export default async function HospitalCatalog({ hospitalsJson }: { hospitalsJson: Promise<HospitalJson> }) {
    const hospitalsJsonReady = await hospitalsJson
    return (
        <div>
            <div style={{padding:"20px 10px 50px 10px", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"flex-start"}}>
            {hospitalsJsonReady.data.map((hospitalItem)=>(
                <Link key={hospitalItem.id} href={`/hospital/${hospitalItem.id}`} className="w-1/5 mx-5">
                    <Card hospitalName={hospitalItem.name} imgSrc={hospitalItem.picture} />
                </Link>
            ))} 
            </div>
        </div>

    )
}