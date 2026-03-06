"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from 'next/navigation';
const dashboard = () => {
      const { data: session } = useSession();
      if(!session) {
        redirect('/login')
      }
    
  return (
    <div>
      <h1>Welcome To the Dashboard </h1>
    </div>
  )
}

export default dashboard
