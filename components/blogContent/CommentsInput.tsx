"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const CommentSchema = z.object({
    comment: z.string().min(1, {
        message: "Comment shouldn't be empty",
    }),
});

type CommentTypes = z.infer<typeof CommentSchema>

export default function CommentsInput() {
    const [loading, setLoading] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm<CommentTypes>({
        resolver: zodResolver(CommentSchema),
        defaultValues: {
            comment: ""
        }
    })

    useEffect(() => {
        setLoading(false)
    }, [])

    if (loading) {
        return <div>
            loading....
        </div>
    }

    function onSubmitComment(data: CommentTypes) {
        console.log(data)
    }

    return <div className="space-y-1">
        <form className="flex gap-4" onSubmit={handleSubmit(onSubmitComment)}>
            <input {...register('comment')} className="border-2 py-1.5 border-gray-500 w-4/5  px-3 rounded block " placeholder="Enter your comments..." />
            <button type="submit" className="border px-6 bg-green-600 text-white py-2 rounded">Send</button>
        </form>
        {errors.comment ? <p className="ml-1 text-red-600 font-semibold text-sm">{errors.comment.message}</p> : null}
    </div>
}



