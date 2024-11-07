"use client"
import { SignInOptions } from "@/components/signin/SignInOptions";

export default function  signIn() {
    return <div className="">
        <div className="flex justify-center items-center  min-h-screen  ">
            <div className=" py-8 px-3 rounded-lg shadow-[-1px_0px_9px_1px_rgba(0,_0,_0,_0.1)]  sm:py-10 h-fit  w-4/6 sm:w-3/5 md:4/6 md:px-7 lg:w-2/5 xl:w-2/6 flex flex-col justify-center">
                <SignInOptions/>
            </div>
        </div>
        
    </div>
}