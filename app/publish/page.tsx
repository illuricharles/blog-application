import { auth } from "@/auth";
import { Editor } from "@/components/editor/Editor"
import { Navbar } from "@/components/Navbar";
// import { PublishNavBar } from "@/components/publish/PublishNavBar";
import { redirect } from "next/navigation";

export default async function Publish() {

    const session = await auth()
    if (!session) {
        redirect('/auth/login')
    }


    return <div className="">
        <Navbar />
        <div className=" ">
            <Editor />
        </div>
    </div>
}