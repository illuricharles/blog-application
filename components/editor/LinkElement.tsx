
import { Editor } from "@tiptap/react"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { MdAddLink } from "react-icons/md"

interface Props {
    editor: Editor,
    initialLink: string | null
}

interface DisplayLinkInputProps {
    handleTextLinkInput: (value: string) => void ,
    inputValue: string,
    setLinkToText: (url:string) => void,
    closeShowLinkInput: () => void,
    editor: Editor
}

const taskItems = [
    {
        task: "link",
        icon: <MdAddLink size={22} />
    }
]



function DisplayLinkInput({handleTextLinkInput, inputValue, setLinkToText, closeShowLinkInput}: DisplayLinkInputProps) {

    
    

    return <div className="absolute top-10 z-50 bg-white border border-gray-700 rounded px-2 py-1">
        <input type="text" placeholder="https://example.com" className=" rounded outline-none"
        onChange={(e) => handleTextLinkInput(e.target.value)}
        value={inputValue}
        />
        <button
        onClick={() => {
            setLinkToText(inputValue)
            closeShowLinkInput()

        }
    }
        className="px-2 bg-green-700 text-white py-1 rounded"
        >ok</button>
    </div>
}

export function LinkElement({ editor, initialLink }: Props) {
    const [showLinkInput, setShowLinkInput] = useState(false)
    const[textLinkInput, setTextLinkInput] = useState('')
    
    useEffect(() => {
        if(initialLink) {
            setTextLinkInput(initialLink)
        }
        else {
            setTextLinkInput("")
        }
    }, [initialLink])


    function handleTextLinkInput(value: string) {
        setTextLinkInput(value)
    }

    function closeShowLinkInput() {
        setShowLinkInput(false)
    }

    function setLinkToText(url: string) {
        if (!url) {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }
    
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run() // Add `unsetLink()` here
    }

    return <div >
        <div className="relative">
            <button
            className={clsx('p-2', editor.isActive(taskItems[0].task) ? "bg-black text-white" : "bg-white text-black")}
            onClick={() => setShowLinkInput(!showLinkInput)}
            >
                {taskItems[0].icon}
            </button>
        </div>
        {showLinkInput? <DisplayLinkInput editor={editor} closeShowLinkInput={closeShowLinkInput} setLinkToText={setLinkToText} handleTextLinkInput={handleTextLinkInput} inputValue ={textLinkInput}/>:null}
    </div>
}