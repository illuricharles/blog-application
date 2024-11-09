"use client"

import { useEditor, EditorContent, mergeAttributes } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import { ToolBar } from './ToolBar'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'

type Levels = 1 | 2 | 3

export function Editor() {

    const extensions = [
        StarterKit.configure({
            paragraph: {
                HTMLAttributes: {
                    class: "text-lg"
                }
            },
            strike: {
                HTMLAttributes: {
                    class: "line-through"
                }
            },
            heading: false,
            codeBlock: {
                HTMLAttributes: {
                    class: "bg-gray-900 text-gray-100 p-2 rounded-lg overflow-x-auto font-mono"
                }
            },
            bulletList: {
                HTMLAttributes: {
                    class: "list-disc ml-4"
                }
            },
            orderedList: {
                HTMLAttributes: {
                    class: "list-decimal ml-4"
                }
            },
            blockquote: {
                HTMLAttributes: {
                    class: "border-l-2 ml-2 pl-2"
                }
            }
        }),
        Link.configure({
            openOnClick: false,
            autolink: false,
            linkOnPaste: false,
            HTMLAttributes: {
                target: "_blank",
                class: "underline text-blue-500"
            }
        }),
        Heading.configure({ levels: [1, 2, 3] }).extend({
            levels: [1, 2],
            renderHTML({ node, HTMLAttributes }) {
              const level = (this.options.levels.includes(node.attrs.level) 
                ? node.attrs.level 
                : this.options.levels[0]) as Levels
              const classes:Record<Levels, string> = {
                1: 'text-4xl text-bold',
                2: 'text-3xl text-bold',
                3: 'text-2xl text-bold'
              }
              return [
                `h${level}`,
                mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                  class: `${classes[level]}`,
                }),
                0,
              ]
            },
        }),
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        })
    
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