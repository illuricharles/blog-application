import { redirect } from "next/navigation"

enum PaginationModes {
    PREVIOUS,
    NEXT
}

export function PaginationButtons({ totalPages, currentPage }: {
    totalPages: number,
    currentPage: number
}) {
    return <div>
        <div className="flex  justify-between">
            <Button text={'Previous'} mode={PaginationModes.PREVIOUS} currentPage={currentPage} disabled={currentPage === 1} />
            <Button text={'Next'} mode={PaginationModes.NEXT} currentPage={currentPage} disabled={currentPage === totalPages} />
        </div>
    </div>
}

function Button({ text, mode, currentPage, disabled }: { text: string, mode: PaginationModes, currentPage: number, disabled: boolean }) {

    if (disabled) {
        return <div></div>
    }

    return <form action={async () => {
        "use server"
        if (mode === PaginationModes.NEXT) {
            redirect(`/${currentPage + 1}`)
        }
        else {
            redirect(`/${currentPage - 1}`)
        }
    }}>
        <button className="bg-red-500 text-white px-4 py-2 w-24 font-medium" >
            {text}
        </button>
    </form>
}