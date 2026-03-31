"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="min-h-screen  p-10 text-white">
      <h1 className="text-3xl font-bold mb-8">Creator Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-gray-400">Total Earnings</p>
          <h2 className="text-2xl font-bold">$17,590</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-gray-400">Supporters</p>
          <h2 className="text-2xl font-bold">2311</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-gray-400">This Month</p>
          <h2 className="text-2xl font-bold">$1200</h2>
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
            <tr>
              <td>Rahim</td>
              <td>$20</td>
              <td>Love your work</td>
            </tr>

            <tr>
              <td>Karim</td>
              <td>$10</td>
              <td>Great content</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
