import { Editor } from "@/components/editor/Editor"
import { PublishNavBar } from "@/components/publish/PublishNavBar";

export default function Publish() {
    return <div className="">
        <PublishNavBar/>
        <div className=" ">
            <Editor/>
        </div>
    </div>
}