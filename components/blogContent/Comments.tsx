"use client"
import { useEffect, useState } from "react";
import CommentsInput from "./CommentsInput";
import { FaExclamationTriangle } from "react-icons/fa";
import { getAllComments } from "@/actions/comments";
import CommentList from "./CommentsList";
// import CommentList from "./CommentsList";

type Comment = {
    user: {
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




export default function Comments({ postId }: { postId: string }) {
    const [loading, setLoading] = useState(true)
    const [comments, setComments] = useState<Comment[]>([])
    const [error, setError] = useState("")




    useEffect(() => {
        async function getAllPostComments() {
            try {
                const postComments = await getAllComments(postId)
                setComments(postComments)
            }
            catch (e) {
                if (e instanceof Error) {
                    const message = e.message || "Unable to get the comments now."
                    setError(message)
                }
            }
        }
        getAllPostComments()
        setLoading(false)
    }, [postId])

    function getNewComment(newComment: Comment) {
        setComments(prevState => ([newComment, ...prevState]))
        console.log(comments)
    }




    function NoComments() {
        return <div className="text-center text-gray-500 text-xl font-semibold  mb-5 mt-5">
            No comments yet. Be the first to comment!
        </div>
    }

    if (loading) {
        return <div>
            loading....
        </div>
    }

    return <div>
        <div className="">
            <CommentsInput postId={postId} getNewComment={getNewComment} />
            {/* display list of comments */}
            {/* Todo 
                display the comments,
                add error handling.
            */}
            {error ?
                <div className="h-36 flex justify-center items-center">
                    <FaExclamationTriangle size={25} className="text-red-600" />
                    <p className="text-red-600 ml-1 font-semibold">{error}</p>
                </div>
                : null}

            <div className="mt-7 space-y-6">

                {comments.length === 0 ? <NoComments /> : comments.map(eachComment => {
                    return <CommentList key={eachComment.id} commentDetails={eachComment} />
                })}
                {/* <CommentList />
                <CommentList />
                <CommentList />
                <CommentList />
                <CommentList /> */}
            </div>
        </div>
    </div>
}