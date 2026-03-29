"use client";

import { useLayoutEffect, useState, useEffect } from "react";
import { initiate, fetchUser } from "@/actions/useractions";

export default function PaymentForm({ username , user}) {
  // console.log(user, "user");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const [currentUser, setcurrentUser] = useState([]);

  //console.log("username in client:", username);

  const handlePay = async () => {
    try {
      console.log("clicked 🔥");

      if (!amount || Number(amount) <= 0) {
        return alert("Enter valid amount");
      }

      // 1️⃣ Server Action call
      const checkoutUrl = await initiate(Number(amount), user.username, {
        name,
        message,
      });

      // redirect
      window.location.href = checkoutUrl;
      console.log("url:", checkoutUrl);
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  const getData = async () => {
    const payments = await fetchUser(user.username);
    setcurrentUser(payments);
    console.log(payments);
  };

  useEffect(() => {
    getData();
  }, []);

  const getUser = () => {
    console.log(currentUser);
  };

  return (
    <>
      <div className="cover w-full  relative">
        <img
          className="object-cover w-full"
          src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/20.gif?token-hash=py2NffPgVZJ_D3KVIWQy3gULEUawvLTB1KS-4uTwq2I%3D&token-time=1775260800"
          alt=""
        />

        <div className=" profile-pic rounded-lg border w-40 h-40 absolute -bottom-20 left-1/2 -translate-x-1/2 ">
          <img
            className="object-cover w-full h-full"
            width={200}
            height={100}
            src="https://plus.unsplash.com/premium_photo-1677545183884-421157b2da02?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>

      <div className="info flex justify-center items-center flex-col py-30 gap-2">
        <div className="font-bold text-3xl">@{user.username}</div>
        <div className="text-gray-400">Creating Animated art for VTT's</div>
        <div className="text-gray-400">
          23,311 members108 posts$17,590/release
        </div>

        <div className="payment mt-11 flex gap-3 w-[80%]">
          <div className="supporters w-1/2 bg-slate-900 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Supporters</h3>

            <ul className="space-y-4">
              {currentUser.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-slate-800 p-3 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={`https://i.pravatar.cc/100?img=${index + 1}`}
                      alt=""
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-400">{item.message}</p>
                    </div>
                  </div>
                  <span className="font-bold text-green-500">
                    ${item.amount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="makePayment w-1/2 bg-slate-900 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Make a Payment</h3>

            <div className="flex flex-col gap-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 outline-none"
              />

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount ($)"
                className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 outline-none"
              />

              <textarea
                placeholder="Write a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 outline-none"
                rows="3"
              ></textarea>

              <button
                onClick={handlePay}
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-md text-sm px-4 py-2.5 text-center leading-5"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
