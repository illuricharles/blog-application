import Link from "next/link";

export function Category() {
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

    return (
        <div className="mb-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-7">Popular Categories</h1>
            <ul className="grid grid-cols-2 text-center font-medium gap-y-5 sm:grid-cols-2 gap-x-5 md:grid-cols-3 lg:grid-cols-4">
                {categoryList.map((eachItem) => (
                    <li
                        className={`${eachItem.color} py-3 md:py-4 rounded-md col-span-1 cursor-pointer hover:opacity-80`}
                        key={eachItem.id}
                    >
                        <Link href="/">{eachItem.text}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
