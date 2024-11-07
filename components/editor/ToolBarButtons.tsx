import { Editor } from "@tiptap/react";
interface Props {
    editor: Editor | null
}

export function ToolBarButtons({editor}: Props) {
    if(!editor) return null 

    return <button
    onClick={() => editor.chain().focus().toggleBold().run()}
    className={editor.isActive('bold') ? 'bg-black text-white' : 'text-black bg-white'}
  >
    Bold
  </button>
}