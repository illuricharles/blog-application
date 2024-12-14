import { auth } from "@/auth";
import { Editor } from "@/components/editor/Editor"
import { Navbar } from "@/components/Navbar";
// import { PublishNavBar } from "@/components/publish/PublishNavBar";
import { redirect } from "next/navigation";

export default async function Publish() {

    // editor add publishing while when user click on publish button
    const session = await auth()
    if (!session) {
        redirect('/login')
    }


    return <div className="">
        <Navbar />
        <div className=" ">
            <Editor />
        </div>
    </div>
}