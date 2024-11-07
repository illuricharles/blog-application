"use client"
import {
  BubbleMenu, EditorContent, useEditor,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useState } from 'react'

export default function DisplayEditor() {
  const [inputContent, setInputContent] = useState("Initial content")
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: inputContent,
    onUpdate: ({ editor }) => {
      setInputContent(editor.getText()) // Update state whenever the content changes
    },
    immediatelyRender: false
  })

  const [isEditable, setIsEditable] = React.useState(true)

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable)
    }
  }, [isEditable, editor])

  if(!editor) {
    return null
  }

  // Handler to log the current content to the console
  const handleLogContent = () => {
    console.log("Current content:", editor?.getHTML())
  }

  // Handler to change the editor content
  const handleChangeContent = () => {
    const newValue = "This is the new content!"
    editor.commands.setContent(newValue)
    setInputContent(newValue)
  }

  return (
    <>
      <div>
        <label>
          <input type="checkbox" checked={isEditable} onChange={() => setIsEditable(!isEditable)} />
          Editable
        </label>
      </div>

      {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className="bubble-menu">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            Strike
          </button>
        </div>
      </BubbleMenu>}
      
      {/* Display editor content */}
      <EditorContent editor={editor} />

      {/* Buttons to log and change content */}
      <div className="mt-4">
        <button onClick={handleLogContent} className="mr-2 p-2 bg-blue-500 text-white rounded">
          Log Content
        </button>
        <button onClick={handleChangeContent} className="p-2 bg-green-500 text-white rounded">
          Change Content
        </button>
      </div>
    </>
  )
}
