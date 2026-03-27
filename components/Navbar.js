"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
const Navbar = () => {
  const { data: session } = useSession();
  const [showdropdown, setShowdropdown] = useState(false)
  // if(session) {
  //   return <>
  //     Signed in as {session.user.email} <br/>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }

  return (
    <nav
      className="bg-gray-950 border-gray-800 border-b-[0.5px]  text-white flex justify-between items-center px-4
    h-16"
    >
      <div className="logo font-bold text-xl"><Link href={"/"}>ChaFund!</Link></div>
      {/* <ul className='flex justify-between gap-4'>
            <li>Home</li>
            <li>About</li>
            <li>Projects</li>
            <li>Sign up</li>
            <li>Login</li>
        </ul> */}

      <div>
        {session && (
          <>
            <button
            onClick={()=>setShowdropdown(!showdropdown)} 
            onBlur={()=>(setTimeout(()=>{
              setShowdropdown(false)
            },1000))}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="bg-gradient-to-r  from-purple-600 mx-3 to-blue-500 hover:opacity-90 transition inline-flex items-center justify-center text-white  border border-transparent  focus:ring-[1px] focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none"
              type="button"
            >
              Welcome {session.user.name}
              <svg
                className="w-4 h-4 ms-1.5 -me-0.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>

            <div
              id="dropdown"
              className={`z-10 bg-gray-900 ${showdropdown?"":"hidden"} absolute right-28 bg-neutral-primary-medium border border-default-medium rounded shadow w-44`}
            >
              <ul
                className="p-2 text-sm text-body font-medium"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <Link
                   href={"/dashboard"}
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                   href={`/${session.user.username}`}
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  >
                    Your Page
                  </Link>
                </li>
                <li>
                  <Link
                    href={"dashboard/settings"}
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  >
                    Settings
                  </Link>
                </li>
               
                <li>
                  <Link
                  onClick={()=>signOut()}
                    href="#"
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
     

        {session && (
          <button
            onClick={() => signOut()}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition"
          >
            Logout
          </button>
        )}

        {!session && (
          <Link href={"/login"}>
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
