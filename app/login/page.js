"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const Login = () => {
  const { data: session } = useSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <div className="min-h-[calc(100vh-124px)] bg-gray-950 flex flex-col items-center justify-center   text-white">
        {/* Heading */}
        <h2 className="font-bold text-3xl text-center mb-6">
          Login / Signup to Get Your Fans to Support You
        </h2>
        <p className="text-gray-400 text-center max-w-md mb-10">
          Sign in with your preferred method and start receiving support from
          your fans instantly.
        </p>

        {/* Social Login Buttons */}
        <div className="social-login-buttons flex flex-col md:flex-row flex-wrap items-center justify-center gap-6 w-full max-w-lg">
          {/* GitHub */}
          <button 
          onClick={()=> signIn()}
          className="bg-[linear-gradient(135deg,_rgb(100,103,242),_rgb(133,80,226))] font-medium px-6 py-3 rounded-xl text-sm flex items-center gap-2.5 hover:opacity-90 transition-all shadow-glow group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-github w-4 h-4"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            Start with GitHub
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-arrow-right w-4 h-4 group-hover:translate-x-0.5 transition-transform"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>

          {/* Google */}
          <button 
          
          className="flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-white text-black font-medium hover:opacity-90 transition w-full md:w-auto">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
