"use client"
import { useReducer } from "react"
import Card from "./Card"
import Link from "next/link"

export default function CardPanel() {

    const ratingReducer = ( ratingMap:Map<string,number>, action:{type:string, hospitalName:string, rating:number}) => {
        switch (action.type) {
            case 'add': {
                return new Map( ratingMap.set(action.hospitalName, action.rating))
            }
            case 'remove': {
                ratingMap.delete(action.hospitalName)
                return new Map(ratingMap)
            } 
            default: return ratingMap
        }
    }

    const [ ratingMap, dispatchRating] = useReducer(ratingReducer,new Map<string, number>([["Chulalongkorn Hospital", 0], ["Rajavithi Hospital", 0], ["Thammasat University Hospital", 0]]))

        /**
     *  Mock data for demonstration only
     */
    const mockHospitalRepo = [
        {hid:"001", hospitalName:"Chulalongkorn Hospital", imgSrc:"/img/chula.jpg"},
        {hid:"002", hospitalName:"Rajavithi Hospital", imgSrc:"/img/rajavithi.jpg"},
        {hid:"003", hospitalName:"Thammasat University Hospital", imgSrc:"/img/thammasat.jpg"},
    ]

    return (
        <div>
            <div style={{padding:"20px 10px 50px 10px", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"flex-start"}}>
            {mockHospitalRepo.map((hospital)=>(
                <Link href={`/hospital/${hospital.hid}`} className="w-1/5 mx-5">
                    <Card hospitalName={hospital.hospitalName} imgSrc={hospital.imgSrc} onRating = { (hospital:string, rate:number)=> dispatchRating({type:'add', hospitalName:hospital, rating:rate})}/>
                </Link>
            ))} 
                {/* <Card hospitalName='Chulalongkorn Hospital' imgSrc='/img/chula.jpg' onRating = { (hospital:string, rate:number)=>dispatchRating({type:'add',hospitalName:hospital,rating:rate})}/>
                <Card hospitalName='Rajavithi Hospital' imgSrc='/img/rajavithi.jpg' onRating = { (hospital:string, rate:number)=>dispatchRating({type:'add',hospitalName:hospital,rating:rate})}/>
                <Card hospitalName='Thammasat University Hospital' imgSrc='/img/thammasat.jpg' onRating = { (hospital:string, rate:number)=>dispatchRating({type:'add',hospitalName:hospital,rating:rate})}/> */}
            </div>
            <div className="h-96" style={{padding:"30px 35px 15px 35px", display:"flex", flexDirection:"column"}}>
                <div className = "w-full text-xl font-medium">Hospital List with Ratings : { ratingMap.size} </div>
                {Array.from(ratingMap).map(([hospital, rate]) => (
                <div 
                    key={hospital} 
                    data-testid={hospital}
                    className="w-2/5 my-2.5 border border-black p-1.5 rounded-lg bg-blue-100 hover:bg-red-300"
                    onClick={() => dispatchRating({ type: 'remove', hospitalName: hospital, rating: rate })}
                >
                    {hospital + " Rating : " + rate}
                    
                </div>
                ))}
            </div>

        </div>

    )
}