import { Menu } from "../Menu";
import Comments from "./Comments";
import { Content } from "./Content";

export function BlogContent() {
    return <div className="mb-10">
    <div className="grid grid-cols-7 gap-x-10">
        <div className="col-span-7 lg:col-span-5 space-x-8 xl:space-y-10">
            <div>
                <Content/>
                <Comments/>
            </div> 
        </div>

        <div className="hidden col-span-2 lg:block">
            <Menu/>
        </div>

    </div>
</div>
}