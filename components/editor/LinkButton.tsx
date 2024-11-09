import clsx from "clsx";
import { MdAddLink } from "react-icons/md";
import { Editor } from "@tiptap/react";

const taskItems = [
    {
        task: "link",
        icon: <MdAddLink size={22} />
    }
]

export function LinkButton({editor, onClick}: {editor: Editor, onClick: ()=>void}) {
    return <button
        className={clsx('p-2', editor.isActive(taskItems[0].task) ? "bg-black text-white" : "bg-white text-black")}
        onClick={onClick}>
            {taskItems[0].icon}
    </button>
}