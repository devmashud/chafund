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
    document.title = "Creator Dashboard | ChaFund";
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
      <div className="grid md:grid-cols-3 gap-3 md:gap-6 mb-10">
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
      <div className="hidden md:block overflow-x-auto bg-slate-900 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Recent Payments</h2>

        <table className="min-w-full">
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

      <div className="md:hidden space-y-4">
        {currentUser.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-2xl shadow-lg border border-slate-700 hover:scale-[1.02] transition-all duration-200"
          >
            {/* Top Row */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-white">
                {item.name || "Anonymous"}
              </h3>

              <span className="bg-green-500/10 text-green-400 px-3 py-1 text-sm rounded-full font-medium">
                ${item.amount}
              </span>
            </div>

            {/* Message */}
            <p className="text-gray-300 text-sm leading-relaxed">
              {item.message || "No message provided."}
            </p>

            {/* Divider */}
            <div className="border-t border-slate-700 my-3"></div>

            {/* Footer */}
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>Supporter</span>
              <span>#{index + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
