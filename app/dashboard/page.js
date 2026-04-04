"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { getDashboardStats } from "@/actions/useractions";
import { useRouter } from "next/navigation";
import { fetchUser } from "@/actions/useractions";

export default function Dashboard() {
  const { data: session } = useSession();

  const [currentUser, setcurrentUser] = useState([]);

  const [stats, setStats] = useState({
    totalAmount: 0,
    totalSupport: 0,
    last7DaysTotal: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.username) {
        // console.log("username: ", session.user.username); // debug

        const data = await getDashboardStats(session?.user?.username);
        // console.log("Data:", data); // debug
        setStats(data);
      }
    };

    fetchData();
  }, []);
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session]);

  const getData = async () => {
    const payments = await fetchUser(session?.user?.username);
    setcurrentUser(payments);
    console.log(payments);
  };

  useEffect(() => {
    getData();
  }, []);



  return (
    <div className="min-h-screen  p-10 text-white">
      <h1 className="text-3xl font-bold mb-8">Creator Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-gray-400">Total Earnings</p>
          <h2 className="text-2xl font-bold">${stats.totalAmount}</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-gray-400">Supporters</p>
          <h2 className="text-2xl font-bold">{stats.totalSupport}</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-gray-400">This Week</p>
          <h2 className="text-2xl font-bold">{stats.last7DaysTotal}</h2>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-slate-900 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Recent Payments</h2>

        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-left">
              <th>Name</th>
              <th>Amount</th>
              <th>Message</th>
            </tr>
          </thead>

          <tbody>
            {currentUser.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>${item.amount}</td>
                <td>{item.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <button onClick={()=>{getData()}} className="border p-4 px-10 bg-red-600 m-10"> click</button> */}
    </div>
  );
}
