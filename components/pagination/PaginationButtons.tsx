export function PaginationButtons() {
    return <div>
        <div className="flex  justify-between">
            <Button text={'Previous'}/>
            <Button text={'Next'}/>
        </div>
    </div>
}

function Button({text}: {text:string}) {
    return <button className="bg-red-500 text-white px-4 py-2 w-24 font-medium">
        {text}
    </button>
}