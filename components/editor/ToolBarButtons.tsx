import { Editor } from "@tiptap/react";
import clsx from "clsx";
import { BiCodeBlock } from "react-icons/bi";
import { BsTypeH1, BsTypeH2, BsTypeH3 } from "react-icons/bs";
import {  FaBold, FaItalic, FaStrikethrough } from "react-icons/fa";
import { GrBlockQuote, GrTextAlignCenter, GrTextAlignLeft, GrTextAlignRight } from "react-icons/gr";
import { LuListOrdered } from "react-icons/lu";
import {  MdFormatListBulleted } from "react-icons/md";

interface Props {
    editor: Editor | null
}

const largeIconSize = 22

const editorButtons = [
  {
    task: 'bold',
    icon: <FaBold size={largeIconSize}/>
  },
  {
    task: 'italic',
    icon: <FaItalic size={largeIconSize}/>
  },
  {
    task: 'strike',
    icon: <FaStrikethrough size={largeIconSize}/>
  },
  {
    task: 'h1',
    icon: <BsTypeH1 size={largeIconSize} />,
    level: 1
  },
  {
    task: 'h2',
    icon: <BsTypeH2 size={largeIconSize}/>,
    level:2
  },
  {
    task: 'h3',
    icon: <BsTypeH3 size = {largeIconSize}/>,
    level: 3
  },
  {
    task: 'codeBlock',
    icon: <BiCodeBlock size={largeIconSize} />
  },
  {
    task: 'bulletList',
    icon: <MdFormatListBulleted size={largeIconSize} />
  }, 
  {
    task: "orderedList",
    icon: <LuListOrdered size={largeIconSize} />
  },
  {
    task: 'blockquote',
    icon: <GrBlockQuote size={largeIconSize}/>
  },
  {
    task: 'left',
    icon: <GrTextAlignLeft size={largeIconSize}/>
  },
  {
    task: 'center',
    icon: <GrTextAlignCenter size={largeIconSize}/>
  },
  {
    task: 'right',
    icon: <GrTextAlignRight size={largeIconSize} />
  },
]

function onClickEditorButton(task: string, editor: Editor) {
  switch(task) {
    case 'bold': 
    return editor.chain().focus().toggleBold().run()
    case 'italic': 
    return editor.chain().focus().toggleItalic().run()
    case 'strike':
    return editor.chain().focus().toggleStrike().run()
    case 'h1':
      return editor.chain().focus().toggleHeading({level:1}).run()
    case 'h2':
      return editor.chain().focus().toggleHeading({level:2}).run()
    case 'h3':
      return editor.chain().focus().toggleHeading({level:3}).run()
    case 'codeBlock':
      return editor.chain().focus().toggleCodeBlock().run()
    case 'bulletList':
      return editor.chain().focus().toggleBulletList().run()
    case 'orderedList':
      return editor.chain().focus().toggleOrderedList().run()
    case 'blockquote': 
      return editor.chain().focus().toggleBlockquote().run()
    case 'left':
      return  editor.chain().focus().setTextAlign('left').run()
    case 'right':
      return  editor.chain().focus().setTextAlign('right').run()
    case 'center':
      return editor.chain().focus().setTextAlign('center').run()
  }
}

export function ToolBarButtons({editor}: Props) {
    if(!editor) return null 

    return <div>
      <div className="">
        {editorButtons.map(eachItem => {
          let isActive = false 
          if(editor.isActive(eachItem.task)) isActive = true
          else if(editor.isActive('heading', {level: eachItem.level})) isActive = true
          else isActive = editor.isActive({ textAlign: eachItem.task })

          return <button key={eachItem.task} 
          className={clsx('p-2', isActive ? "bg-black text-white":"bg-white text-black")}
          onClick={() => onClickEditorButton(eachItem.task, editor)}
          >
            {eachItem.icon}
          </button>
        })}
        
      </div>
    </div>
    
  //   <button
  //   onClick={() => editor.chain().focus().toggleBold().run()}
  //   className={editor.isActive('bold') ? 'bg-black text-white' : 'text-black bg-white'}
  // >
  //   Bold
  // </button>
}