"use client";
import {
  BubbleMenu,
  EditorContent,
  useEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import React, { useEffect, useState } from 'react';

export default function ImageUploadEditor() {
  const [inputContent, setInputContent] = useState("Initial content");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: false,
      }),
    ],
    content: inputContent,
    onUpdate: ({ editor }) => {
      setInputContent(editor.getHTML());
    },
  });

  const [isEditable, setIsEditable] = useState(true);

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  // Handler to insert an image from a file input
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      editor.chain().focus().setImage({ src: reader.result }).run();
    };

    if (file) {
      reader.readAsDataURL(file); // Convert to base64
    }
  };

  // Handler to remove the selected image
  const handleRemoveImage = () => {
    if (editor) {
      editor.chain().focus().deleteSelection().run();
    }
  };

  // Handler to log the current HTML content to the console
  const handleLogContent = () => {
    console.log("Current content:", editor.getHTML());
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={isEditable}
            onChange={() => setIsEditable(!isEditable)}
            className="form-checkbox text-blue-600 relative"
          />
          <span className="ml-2">Editable</span>
        </label>
      </div>

      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex space-x-2 bg-white p-2 rounded shadow">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
            >
              Bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
            >
              Italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`p-2 rounded ${editor.isActive('strike') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
            >
              Strike
            </button>
            <button
              onClick={handleRemoveImage}
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove Image
            </button>
          </div>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} className="my-4 border p-2 rounded-lg shadow-inner" />

      {/* Buttons to log content and insert an image */}
      <div className="mt-4">
        <button
          onClick={handleLogContent}
          className="mr-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Log Content
        </button>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageUpload}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
        />
      </div>

      {/* Image Styling with Tailwind CSS */}
      <style jsx>{`
        img {
          width: 50%; /* Responsive */
          height: auto; /* Maintain aspect ratio */
          border: 2px solid #ccc; /* Default border */
          border-radius: 0.375rem; /* Rounded corners */
          margin: 10px 0; /* Spacing */
          box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2); /* Shadow for better visibility */
        }
      `}</style>
    </div>
  );
}
