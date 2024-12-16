"use client"

import { useEditor, EditorContent, mergeAttributes } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import { ToolBar } from './ToolBar'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import { ImageGallery } from '../imageUploader/ImageGallery'
import { useRef, useState } from 'react'
import Image from '@tiptap/extension-image'
import { UploadCoverPic } from './UploadCoverPic'
import { PostSchema } from '@/utils/editor/editorValidation'
import { publishBlog } from '@/actions/blogPost'
import { useRouter } from 'next/navigation'

interface BlogPostErrorsTypes {
    content: string,
    title: string,
    description: string,
    coverPicUrl: string,
}


type Levels = 1 | 2 | 3



export function Editor() {
    const titleRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const descriptionRef = useRef<HTMLInputElement>(null)
    const [publishError, setPublishError] = useState('')
    const [showGallery, setShowGallery] = useState(false)
    const [coverPic, setCoverPic] = useState('')
    const [errors, setErrors] = useState<BlogPostErrorsTypes>({
        content: "",
        title: "",
        description: "",
        coverPicUrl: ""
    })


    function handleCoverPic(coverPicUrl: string) {
        setCoverPic(coverPicUrl)
    }

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
                class: "w-60 aspect-square m-auto  mt-2 mb-2 rounded"
            }
        })

    ]

    const editor = useEditor({
        extensions,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mt-3 min-h-96  outline outline-gray-200 p-2 rounded leading-10',
            },
        },
        immediatelyRender: false,
    })

    function handleShowImageGallery(value: boolean) {
        setShowGallery(value)
    }

    function handleBlogPostPublishErrors(fieldErrors: {
        title?: string[] | undefined;
        description?: string[] | undefined;
        content?: string[] | undefined;
        coverPicUrl?: string[] | undefined;
    }) {
        console.log(fieldErrors)
        const defaultErrors: BlogPostErrorsTypes = {
            content: "",
            title: "",
            description: "",
            coverPicUrl: ""
        }

        Object.entries(fieldErrors).map((eachError) => {
            defaultErrors[eachError[0] as keyof BlogPostErrorsTypes] = eachError[1][0]

        })
        setErrors(defaultErrors)
    }



    async function publishPost() {
        setPublishError("")
        const response = PostSchema.safeParse({
            content: editor?.getHTML(),
            title: titleRef.current?.value,
            description: descriptionRef.current?.value,
            coverPicUrl: coverPic
        })
        if (response.success) {
            setErrors({
                content: "",
                title: "",
                description: "",
                coverPicUrl: ""
            })
            const publishPost = await publishBlog(response.data)
            if (publishPost?.zodValidationErrors) {
                // field errors
                handleBlogPostPublishErrors(publishPost.issues)
            }

            else if (publishPost?.error) {
                // todo server function error

                setPublishError(publishPost.message || "something went wrong. please try again after sometime")
            }
            else if (!publishPost?.error) {
                if (publishPost?.post?.id) {
                    router.push(`/blog/${publishPost?.post?.id}`)
                }
                else {
                    router.push('/')
                }
            }
        }
        if (!response.success) {
            handleBlogPostPublishErrors(response.error.formErrors.fieldErrors)
        }
    }

    if (!editor) return null



    return <div className="min-h-screen flex flex-col gap-y-5 ">
        <div>
            <ToolBar editor={editor} onImageSelect={() => setShowGallery(true)} />
            <input ref={titleRef} type='text' placeholder='Enter the title of the blog post here also (Same will be displayed to users)'
                className='text-3xl  w-full border-l-4 py-1.5 px-3 outline-none mb-2'
            />
            {errors.title ? <p className='text-red-600 font-semibold  capitalize'>{errors.title}</p> : null}
            <EditorContent editor={editor} />
            {errors.content ? <p className='text-red-600 font-semibold  capitalize mt-3'>{errors.content}</p> : null}
            <ImageGallery editor={editor} visible={showGallery} handleShowImageGallery={handleShowImageGallery} />
            <div className='mt-10 flex flex-col gap-y-4'>

                <input ref={descriptionRef} type='text' placeholder='Enter the description of the blog here(Same will be displayed to users)'
                    className='text-2xl  w-full border-l-4 py-1.5 px-3 outline-none'
                />
                {errors.description ? <p className='text-red-600 font-semibold  capitalize'>{errors.description}</p> : null}

                <hr />
                <div className='space-y-3'>
                    <p className='text-3xl text-slate-800 mb-4'>Add cover Image</p>
                    <UploadCoverPic handleCoverPic={handleCoverPic} coverPic={coverPic} />
                    {errors.coverPicUrl ? <p className='text-red-600 font-semibold  capitalize'>{errors.coverPicUrl}</p> : null}
                </div>
                <div className='mt-3 mb-5 text-center'>
                    <button className="mb-3 font-semibold text-xl py-2 px-4 rounded-md border text-white bg-green-600" type="submit"
                        onClick={async () => await publishPost()}>
                        publish
                    </button>
                    {publishError ? <p className='capitalize text-red-600 font-semibold'>{publishError}</p> : null}

                </div>
            </div>

            <div>

            </div>

        </div>
    </div>
}