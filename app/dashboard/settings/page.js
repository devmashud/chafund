"use client";
import { useState } from "react";
export default function Settings() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [coverPic, setCoverPic] = useState("");
  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-10">Profile Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* SETTINGS FORM */}
        <div className="space-y-6">
          {/* Profile Info */}
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h2 className="text-xl font-semibold mb-4">Profile Info</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1">
                  Email
                </label>
                <input className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md focus:border-purple-500 outline-none" />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1">
                  Username
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md focus:border-purple-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h2 className="text-xl font-semibold mb-4">Page Appearance</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1">
                  Profile Picture URL
                </label>
                <input
                  value={profilePic}
                  onChange={(e) => setProfilePic(e.target.value)}
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1">
                  Cover Picture URL
                </label>
                <input
                  value={coverPic}
                  onChange={(e) => setCoverPic(e.target.value)}
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md focus:border-purple-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h2 className="text-xl font-semibold mb-4">Payment Settings</h2>

            <div>
              <label className="text-sm text-gray-400 block mb-1">
                Razorpay Key
              </label>

              <input className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md focus:border-purple-500 outline-none" />
            </div>
          </div>

          {/* Save Button */}
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 font-semibold">
            Save Changes
          </button>
        </div>

        {/* PROFILE PREVIEW */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 h-fit">
          <h2 className="text-xl font-semibold mb-6">Profile Preview</h2>

          <div className="bg-slate-800 h-32 rounded-lg">
            <img
              src={coverPic || "https://placehold.co/600x200"}
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>

          <div className="-mt-12 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gray-500 border-4 border-slate-900">
              <img
                src={profilePic || "https://placehold.co/100"}
                className="w-24 h-24 rounded-full border-4 border-slate-900"
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-lg font-semibold">{username}</p>
            <p className="text-gray-400 text-sm">Your creator page preview</p>
          </div>
        </div>
      </div>
    </div>
  );
}
