import { ToolBarButtons } from "./ToolBarButtons";
import React from "react";
import { Editor } from "@tiptap/react";

interface Props {
    editor: Editor | null
}

export function ToolBar({editor}: Props) {
    return <div className="">
        <ToolBarButtons editor = {editor}/>
    </div>
}