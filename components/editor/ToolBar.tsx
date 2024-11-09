import { ToolBarButtons } from "./ToolBarButtons";
import React from "react";
import { Editor } from "@tiptap/react";
import { LinkElement } from "./LinkElement";

interface Props {
    editor: Editor | null
}

export function ToolBar({editor}: Props) {
    if(!editor) {
        return null
    }

    function getLinkInitialValue() {
        const link = editor?.getAttributes('link').href 
        return link
    }

    return <div className="flex">
         <ToolBarButtons editor = {editor}/>
         <LinkElement editor={editor} initialLink = {getLinkInitialValue()}/>
    </div>
}