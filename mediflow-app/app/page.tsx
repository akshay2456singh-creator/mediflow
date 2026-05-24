"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { Ambulance, LogIn, Activity } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const handleLogin = () => {
    if (auth.currentUser) {
      router.push("/book");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black flex flex-col items-center justify-center p-6 text-white">
      
      {/* Title */}
      <h1 className="text-5xl font-bold mb-4">
        MediFlow
      </h1>

      <p className="text-gray-300 mb-10 text-center">
        Smart Hospital Queue Management System
      </p>

      {/* Buttons */}
      <div className="w-full max-w-md space-y-6">

        {/* Login */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-6 rounded-2xl shadow-lg flex items-center gap-4"
        >
          <LogIn size={32} />

          <div className="text-left">
            <h2 className="text-xl font-semibold">
              Login & Book
            </h2>

            <p className="text-sm text-gray-200">
              Secure patient login
            </p>
          </div>
        </button>

        {/* Emergency */}
        <button
          onClick={() => router.push("/emergency")}
          className="w-full bg-red-600 hover:bg-red-700 transition p-6 rounded-2xl shadow-lg flex items-center gap-4"
        >
          <Ambulance size={32} />

          <div className="text-left">
            <h2 className="text-xl font-semibold">
              Emergency
            </h2>

            <p className="text-sm text-gray-200">
              Immediate emergency support
            </p>
          </div>
        </button>

        {/* Live Queue */}
        <button
          onClick={() => router.push("/queue")}
          className="w-full bg-green-600 hover:bg-green-700 transition p-6 rounded-2xl shadow-lg flex items-center gap-4"
        >
          <Activity size={32} />

          <div className="text-left">
            <h2 className="text-xl font-semibold">
              Live Queue
            </h2>

           
          </div>
        </button>

      </div>
    </div>
  );
}