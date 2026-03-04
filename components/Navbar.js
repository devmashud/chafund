"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
const Navbar = () => {
  const {data: session} = useSession();
  // if(session) {
  //   return <>
  //     Signed in as {session.user.email} <br/>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }

  return (
    <nav className='bg-gray-950 border-gray-800 border-b-[0.5px]  text-white flex justify-between items-center px-4
    h-16'>
        <div className="logo font-bold text-xl">ChaFund!</div>
        {/* <ul className='flex justify-between gap-4'>
            <li>Home</li>
            <li>About</li>
            <li>Projects</li>
            <li>Sign up</li>
            <li>Login</li>
        </ul> */}

        <div>
          {session && <Link href={"/dashboard"}><button className="px-4 py-2 mx-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition"
          >Dashboard
          </button></Link>}

           {session && <button onClick={()=>signOut()} className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition"
          >Logout
          </button>}

          {!session &&   <Link href={"/login"}>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition"
          >
            Login
          </button>
          </Link>}
        
        </div>
    </nav>
  )
}

export default Navbar
