import { deleteCommentById } from "@/actions/comments";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

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

export default function CommentList({ commentDetails, loggedInUser, updateCommentsAfterDelete, userProfileImage }: { commentDetails: Comment, loggedInUser: string | undefined, updateCommentsAfterDelete: (commentId: string) => void, userProfileImage: string | null }) {
    const [confirmDeleteCommentId, setConfirmDeleteCommentId] = useState<null | string>(null)
    const [error, setError] = useState<null | string>(null)

    async function deleteComment() {
        // error handling such as invalid comment id or comment doesn't exist P2025.
        // server side error something went wrong please try again later.
        // delete the user comment.
        let deletedCommentId
        try {
            deletedCommentId = await deleteCommentById(commentDetails.id)
            updateCommentsAfterDelete(deletedCommentId.id)
        }
        catch (e) {
            console.log(e)
            if (e instanceof Error && e.message.length !== 0) {
                setError(e.message || "unexpected Error occurred. Please try again later.")
            }
            else {
                setError("unexpected Error occurred. Please try again later.")
            }
        }
    }

    return <div className="">
        <div className="flex items-center gap-x-2 mb-2.5">
            <div className="relative w-12 h-12">
                <Image
                    src={userProfileImage ? userProfileImage : "/p1.jpeg"}
                    alt="User Avatar"
                    className="object-cover rounded-full"
                    fill
                    sizes="(max-width: 768px) 50px, (max-width: 1200px) 100px, 50px"
                    priority
                />
            </div>
            <div className="flex flex-col leading-5 text-emerald-800 capitalize font-semibold">
                <span>
                    <Link href={`/user-profile/${commentDetails.userId}`}>{commentDetails.user.name}</Link>
                </span>
                <span className="text-gray-600 font-semibold text-sm">{`${commentDetails.updatedAt.getDate()}.${commentDetails.updatedAt.getMonth()}.${commentDetails.updatedAt.getFullYear()}`}</span>
            </div>
            {loggedInUser === commentDetails.userId &&
                <div className="ml-auto ">
                    <button className="" onClick={() => setConfirmDeleteCommentId(commentDetails.id)}>
                        <MdDeleteOutline size={24} className="text-red-600" />
                    </button>
                </div>
            }
        </div>
        <div>
            <p className="pr-3 ml-3 mb-2 font-semibold">{commentDetails.comment}</p>
        </div>

        {confirmDeleteCommentId === commentDetails.id && <div>
            <div className="shadow px-3 py-2.5  rounded-md">
                <p className="mb-3 font-semibold ">Do you want to delete above comment?</p>
                <div className="flex items-center gap-x-4 mb-2">
                    <button className="text-white bg-emerald-600 px-4 py-1 font-semibold" onClick={deleteComment}>
                        Yes
                    </button>
                    <button className="text-white bg-red-600 px-5 py-1 font-semibold" onClick={() => {
                        setConfirmDeleteCommentId(null)
                        setError(null)
                    }}>
                        No
                    </button>
                </div>
                {error && <p className="ml-1 text-red-600 text-sm font-semibold">{error}</p>}
            </div>

        </div>
        }
    </div>
}