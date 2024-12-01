"use client"

import { useEffect, useState } from "react"


export default function CommentsInput() {
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [])

    if (loading) {
        return <div>
            loading....
        </div>
    }

    return <div>
        <form className="flex gap-4">
            <input value={comment} onChange={(e) => setComment(e.target.value)} className="border-2 py-1.5 border-gray-500 w-4/5  px-3 rounded block " placeholder="Enter your comments..." />
            <button className="border px-6 bg-green-600 text-white py-2 rounded">Send</button>
        </form>
    </div>
}