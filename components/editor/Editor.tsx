"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ToolBar } from './ToolBar'

export function Editor() {

    const extensions = [
        StarterKit
    ]

    const editor = useEditor({
        extensions,
        editorProps: {
            attributes: {
              class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mt-3 min-h-96 focus:outline-none outline outline-gray-200 p-2 rounded',
            },
        },
        immediatelyRender:false
    })
    return <div className="">
        <ToolBar editor={editor}/>
        <EditorContent editor={editor} />
    </div>
}