"use client";

import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      
      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
        
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mt-2">
          Your payment has been processed successfully.
        </p>

        <div className="my-6 border-t"></div>

        <button
          onClick={() => router.push("/")}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}