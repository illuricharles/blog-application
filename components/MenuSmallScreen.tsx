"use client"

import Link from "next/link";
import { useState } from "react";


function HamburgerIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
}

function CloseIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
  
}

export function MenuSmallScreen() {
    const [open, setOpen] = useState(false)

    return <button className="md:hidden" onClick={() => setOpen(!open)}>
        {!open ? <HamburgerIcon /> : <CloseIcon />}
        {open && 
        <div className="absolute bg-white shadow-xl top-full right-0 px-5 py-4 z-50">
            
            <div className="flex flex-col space-y-4 ">
                <Link href={'/'}>Homepage</Link>
                <Link href={'/'}>Contact</Link>
                <Link href={'/'}>About</Link>
                <Link href={'/'}>Login</Link>
            </div>
        </div>}
    </button>
}