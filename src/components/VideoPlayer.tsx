'use client'
import { useRef, useEffect } from "react"

export default function VideoPlayer( {vdoSrc, isPlaying, className}: {vdoSrc:string, isPlaying:boolean, className:string} ) {
    
    const vdoRef = useRef<HTMLVideoElement>(null)

    useEffect( () => {
        if (isPlaying) {
            vdoRef.current?.play()
        } else {
            vdoRef.current?.pause()
        }
    }, [isPlaying])

    return (
        <video className={className} src={vdoSrc} ref={vdoRef} controls loop muted/>
    )

}
