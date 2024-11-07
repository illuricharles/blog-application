"use client";
import { useEffect, useState } from "react";

export function SignInOptions() {
  const [showEmailSignIn, setShowEmailSignIn] = useState<boolean | null>(null);

  useEffect(() => {
        setShowEmailSignIn(false)
  }, []) 

  if (showEmailSignIn === null) {
    return <div className="text-center"> loading.....</div>;
  }

  return (
    <>
      <div className="px-4 mb-8 sm:mb-10">
        <h1 className="text-center mb-8 font-semibold text-3xl sm:text-4xl sm:mb-10">Sign In</h1>
        {showEmailSignIn ? <ShowEmail /> : <ShowOptions />}
      </div>
      <div className="text-center">
        <NavigateDifferentOptions
          onClick={() => setShowEmailSignIn(!showEmailSignIn)}
          alternativeOptionsText={showEmailSignIn ? "Different login options? " : "No account? "}
          navigationText={showEmailSignIn ? "Click Here" : "Create one"}
        />
      </div>
    </>
  );
}

function ShowEmail() {
  return (
    <div className="flex flex-col space-y-4 font-medium">
      <div className="flex flex-col space-y-1 px-2 " key={'form_email'}> 
        <label >Email</label>
        <input
          type="text"
          placeholder="Email"
          className="border-2 px-2 py-1.5 font-normal rounded-md"
          id="email"
        />
      </div> 
      <div className="flex flex-col space-y-1 px-2" key={'form_password'}>
        <label >Password</label>
        <input
          type="password"
          placeholder="Password"
          className="border-2 px-2 py-1.5 font-normal rounded-md"
          id="password"
        />
     </div> 
    </div>
  );
}

function ShowOptions() {
  return (
    <div className="flex flex-col space-y-5 font-medium sm:space-y-6 sm:px-5">
      <button className="border border-black rounded-full py-1.5 text-sm px-0.5 sm:px-0 sm:py-2.5 sm:text-base">
        Sign in with Google
      </button>
      <button className="border border-black rounded-full py-1.5 text-sm px-0.5 sm:px-0 sm:py-2.5 sm:text-base">
        Sign in with Facebook
      </button>
      <button className="border border-black rounded-full py-1.5 text-sm px-0.5 sm:px-0 sm:py-2.5 sm:text-base">
        Sign in with Email
      </button>
    </div>
  );
}

function NavigateDifferentOptions({
  alternativeOptionsText,
  navigationText,
  onClick,
}: {
    alternativeOptionsText: string,
    navigationText: string,
    onClick: () => void
}) {
  return (
    <>
      <span>{alternativeOptionsText}</span>
      <button onClick={onClick} className="text-green-600 font-bold">
        {navigationText}
      </button>
    </>
  );
}
