import Image from "next/image";
import Link from "next/link";

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

export default function CommentList({ commentDetails }: { commentDetails: Comment }) {

    return <div className="">
        <div className="flex items-center gap-x-2 mb-2.5">
            <div className="relative w-11 h-11">
                <Image
                    src="/p1.jpeg"
                    alt="User Avatar"
                    className="object-cover rounded-full"
                    fill
                    sizes="(max-width: 768px) 50px, (max-width: 1200px) 100px, 50px"
                    priority
                />
            </div>
            <div className="flex flex-col leading-5 text-emerald-600 font-semibold">
                <span>
                    <Link href={`/user-profile/${commentDetails.userId}`}>{commentDetails.user.name}</Link>
                </span>
                <span className="text-gray-500 text-sm">{`${commentDetails.updatedAt.getDate()}.${commentDetails.updatedAt.getMonth()}.${commentDetails.updatedAt.getFullYear()}`}</span>
            </div>
        </div>
        <div>
            <p className="pr-3 ml-3 ">{commentDetails.comment}</p>
        </div>
    </div>
}