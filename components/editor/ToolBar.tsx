import { ToolBarButtons } from "./ToolBarButtons";
import React from "react";
import { Editor } from "@tiptap/react";

interface Props {
    editor: Editor | null,
    onImageSelect: () => void
}

export function ToolBar({ editor, onImageSelect }: Props) {
    if (!editor) {
        return null
    }



    return <div className="sticky top-0 z-40 flex justify-center w-5/6 sm:w-full m-auto mb-5">
        <ToolBarButtons editor={editor} onImageSelect={onImageSelect} />
    </div>
}