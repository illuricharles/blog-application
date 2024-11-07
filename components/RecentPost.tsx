import { Menu } from "./Menu";
import { PaginationButtons } from "./pagination/PaginationButtons";
import { RecentPostCard } from "./RecentPostCard";

export function RecentPost() {
    return <div className="mb-10">
        <div className="grid grid-cols-7 gap-x-7">
            <div className="col-span-7 lg:col-span-5 space-y-9">
                <RecentPostCard/>
                <RecentPostCard/>
                <RecentPostCard/>
                <RecentPostCard/>
                <PaginationButtons/>
            </div>
            <div className="hidden col-span-2 lg:block">
                <Menu/>
            </div>

        </div>
    </div>
}