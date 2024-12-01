
"use client"
import { useEditor, EditorContent, mergeAttributes } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { useEffect, useState } from 'react'

type Levels = 1 | 2 | 3

export function Content({ content }: {
    content: string
}) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [content])

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
                const classes: Record<Levels, string> = {
                    1: 'text-4xl text-bold mb-3 mt-3',
                    2: 'text-3xl text-bold mb-3 mt-3',
                    3: 'text-2xl text-bold mb-3 mt-3'
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
        }),
        Image.configure({
            inline: false,
            HTMLAttributes: {
                class: "w-60 aspect-square m-auto  mt-2 rounded"
            }
        })

    ]

    const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mt-3 min-h-96  outline-none  p-2 rounded leading-10',
            },
        },
        immediatelyRender: false,
        editable: false,
    })

    if (loading) {
        return <div>
            loading
        </div>
    }


    if (!editor) return null



    return <div>
        {/* <p className="text-lg leading-7 mb-3 lg:text-base ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae eveniet dolores dignissimos hic, incidunt cupiditate vel doloremque harum vero laboriosam ipsam iure, perferendis quos adipisci quod aliquam maxime officia quo.

        </p>
        <h3 className="text-xl font-semibold mb-3  underline">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, officiis ducimus. Ipsum minima quia earum, enim eius beatae a totam nam esse aspernatur voluptates incidunt ratione reiciendis explicabo dolores rerum.</p> */}
        <EditorContent editor={editor} />
    </div>
}