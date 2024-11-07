import Link from "next/link";

export function MenuCategoryList() {
    const categoryList = [
        {
            id: 1,
            text: "Styles",
            color: "bg-blue-200"
        },
        {
            id: 2,
            text: "Fashion",
            color: "bg-red-200"
        },
        {
            id: 3,
            text: "Food",
            color: "bg-green-200"
        },
        {
            id: 4,
            text: "Travel",
            color: "bg-pink-200"
        },
        {
            id: 5,
            text: "Culture",
            color: "bg-orange-200"
        },
        {
            id: 6,
            text: "Coding",
            color: "bg-purple-200"
        }
    ];
    return <div>
        <ul className="grid grid-cols-3 gap-3 ">
            
            {categoryList.map(eachList => {
                return <li className="col-span-1" key={eachList.id}>
                    <Link href={'/'} className={`${eachList.color} block py-1 text-center rounded-md text-gray-700 font-semibold`}>{eachList.text}</Link>
                </li> 
            })}
            
        </ul>
    </div>
}