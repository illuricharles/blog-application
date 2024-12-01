import CommentsInput from "./CommentsInput";
import CommentList from "./CommentsList";

export default function Comments() {
    return <div>
        <div className="mt-2">
            <h3 className="text-3xl mb-4">Comments</h3>
            <CommentsInput />

            {/* display list of comments */}
            <div className="mt-7 space-y-6">
                <CommentList />
                <CommentList />
                <CommentList />
                <CommentList />
                <CommentList />
            </div>

        </div>
    </div>
}