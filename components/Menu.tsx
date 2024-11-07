import { MenuCategoryList } from "./menu/MenuCategoryList";
import { PopularPost } from "./menu/PopularPost";

export function Menu() {
    return <div>
        <div>
            <span className="text-gray-500 font-semibold">What&apos;s hot</span>
            <h3 className="text-2xl font-semibold mb-5">Most Popular</h3>
            <div className="space-y-7 mb-14">
                <PopularPost/>
                <PopularPost/>
                <PopularPost/>
                <PopularPost/>
            </div>
            
            <span className="text-gray-500 font-semibold">Chosen by editor</span>
            <h3 className="text-2xl font-semibold mb-5">Categories</h3>
                <MenuCategoryList/>
        </div>
    </div>
}