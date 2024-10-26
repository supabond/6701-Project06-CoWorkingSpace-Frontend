'use client'
import { useState } from "react"
import  VideoPlayer  from "./VideoPlayer"
import { useWindowListener } from "@/hooks/useWindowListener"

export default function PromoteCard() {

    const [playing, setPlaying] = useState(true)

    useWindowListener("contextmenu", (e) => {
        e.preventDefault()
    })

    return (
        <main className="w-[100%] flex flex-col items-center p-2.5">
            <div className="w-[50%] flex flex-col rounded-lg shadow-md mt-10 p-5 bg-white border-2 border-gray-300">
                    <div className="text-xl font-medium text-center">Get your vaccine today.</div>
                    <button className="w-[20%] block rounded-t-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                        onClick={ () => {
                            setPlaying(!playing)
                        }}>
                        { playing? 'Pause':'Play'}
                    </button>
                    <VideoPlayer className="" vdoSrc="/vdo/getvaccine.mp4" isPlaying={playing}></VideoPlayer>
            </div>
        </main>
    )
}
