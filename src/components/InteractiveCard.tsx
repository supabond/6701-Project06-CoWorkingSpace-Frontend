'use client'
import React from 'react'

export default function InteractiveCard({children, contentName}:{children: React.ReactNode, contentName:string}) {
    function onCarSelected() {
        alert('You select: '+contentName)
    }
    function onCardMouseAction(event:React.SyntheticEvent)
    {
        if (event.type === 'mouseover'){
            // event.currentTarget.classList.remove('shadow-lg')
            // event.currentTarget.classList.add('shadow-2xl')
            event.currentTarget.classList.remove('outline-2')
            event.currentTarget.classList.add('outline-4')
            event.currentTarget.classList.remove('bg-white')
            event.currentTarget.classList.add('bg-neutral-200')
        }
        else {
            // event.currentTarget.classList.remove('shadow-2xl')
            // event.currentTarget.classList.add('shadow-lg')
            event.currentTarget.classList.remove('outline-4')
            event.currentTarget.classList.add('outline-2')
            event.currentTarget.classList.remove('bg-neutral-200')
            event.currentTarget.classList.add('bg-white')
        }
    }
    return (
        <div className='w-full h-[300px] bg-white outline outline-2 outline-offset-4 outline-orange-400 border border-2 rounded-md border-gray-300 hover:border-neutral-200' 
        onMouseOver={(e)=>onCardMouseAction(e)}
        onMouseOut={(e)=>onCardMouseAction(e)}>
           {children}
        </div>
    )
}