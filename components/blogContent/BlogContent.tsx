
import { Menu } from "../Menu";
// import Comments from "./Comments";
import { Content } from "./Content";

// This component is currently not used in the application but might be needed in the future.
// Keeping it here for potential use later. pasted the code in /blog/[id] to avoid prop drilling issue
export async function BlogContent({ content }: {
    content: string
}) {
    return <div className="">
        <div className="grid grid-cols-7 gap-x-10">
            <div className="col-span-7 lg:col-span-5 space-x-8 xl:space-y-10">
                <div>
                    <Content content={content} />
                    {/* <Comments postId="" /> */}
                </div>
            </div>

            <div className="hidden col-span-2 lg:block">
                <Menu />
            </div>

        </div>
    </div>
}