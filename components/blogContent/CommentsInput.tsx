"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CommentSchema } from "@/utils/CommentSchema";
import { addComment } from "@/actions/comments";

type Comment = {
    user: {
        image: string | null;
        name: string | null;
        id: string;
    };
    comment: string;
    id: string;
    postId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};

type CommentTypes = z.infer<typeof CommentSchema>

export default function CommentsInput({ postId, getNewComment }:
    {
        postId: string,
        getNewComment: (newComment: Comment) => void
    }) {

    const [formSubmitError, setFormSubmitError] = useState("")
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentTypes>({
        resolver: zodResolver(CommentSchema),
        defaultValues: {
            comment: ""
        }
    })

    async function onSubmitComment(data: CommentTypes) {
        setFormSubmitError("")
        let response
        try {
            response = await addComment(data, postId)
            if (response?.error) {
                if (response.message.fieldErrors.comment) {
                    const errorMessage = response.message.fieldErrors.comment.join(',')
                    setFormSubmitError(errorMessage)
                }
                else {
                    const errorMessage = response.message.formErrors.join(',')
                    setFormSubmitError(errorMessage)
                }

            } else if (response.newComment) {
                getNewComment(response.newComment)
            }

        } catch (e) {
            if (e instanceof Error) {
                setFormSubmitError("Unable to send the comments. Please try again.")
            }
            else {
                setFormSubmitError("Something went wrong. Please try again.")
            }
        }
        reset({ comment: "" })

    }

    return <div className="space-y-1">
        <form className="flex gap-4" onSubmit={handleSubmit(onSubmitComment)}>
            <input {...register('comment')} className="border-2 py-1.5 border-gray-500 w-4/5  px-3 rounded block " placeholder="Enter your comments..." />
            <button type="submit" className="border px-6 bg-green-600 text-white py-2 rounded">Send</button>
        </form>
        {errors.comment?.message || formSubmitError ? (
            <p className="ml-1 text-red-600 font-semibold text-sm">
                {errors.comment?.message || formSubmitError}
            </p>
        ) : null}
    </div>
}



