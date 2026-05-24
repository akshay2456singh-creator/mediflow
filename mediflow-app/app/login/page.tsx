"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { db } from "@/lib/firebase";

import {
  collection,
  addDoc,
 getDocs,
} from "firebase/firestore";

import {
  ShieldCheck,
  UserRound,
  Lock,
} from "lucide-react";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    // ADMIN LOGIN

    if (
      email === "admin@mediflow.com" &&
      password === "admin123"
    ) {

      alert("Admin Login Success");

      router.push("/admin");

      return;
    }

    // GET USERS

    const snapshot = await getDocs(
      collection(db, "users")
    );

    const users = snapshot.docs.map((doc) => doc.data());

    // CHECK EMAIL

    const existingUser = users.find(
      (user: any) => user.email === email
    );

    // EXISTING USER

    if (existingUser) {

      // CORRECT PASSWORD

      if (existingUser.password === password) {

        alert("Welcome Back!");

        router.push("/dashboard");

      }

      // WRONG PASSWORD

      else {

        alert("Wrong Password!");

      }

      return;
    }

    // NEW USER

    await addDoc(collection(db, "users"), {

      email,
      password,

    });

    alert("New Account Created!");

    router.push("/dashboard");
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-cyan-950 flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-black/40 border border-cyan-500/20 rounded-3xl p-10 backdrop-blur-xl shadow-2xl">

        {/* Header */}

        <div className="text-center mb-10">

          <div className="w-24 h-24 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-6">

            <ShieldCheck
              size={52}
              className="text-cyan-400"
            />

          </div>

          <h1 className="text-5xl font-black text-cyan-400 mb-3">

            MediFlow

          </h1>

          <p className="text-slate-400">

            Smart Hospital Login Portal

          </p>

        </div>

        {/* Email */}

        <div className="mb-6">

          <label className="text-slate-400 text-sm mb-2 block">

            Email Address

          </label>

          <div className="flex items-center gap-3 bg-black/30 border border-cyan-500/20 rounded-2xl px-4 py-4">

            <UserRound className="text-cyan-400" />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="bg-transparent outline-none w-full text-white"
            />

          </div>

        </div>

        {/* Password */}

        <div className="mb-8">

          <label className="text-slate-400 text-sm mb-2 block">

            Password

          </label>

          <div className="flex items-center gap-3 bg-black/30 border border-cyan-500/20 rounded-2xl px-4 py-4">

            <Lock className="text-cyan-400" />

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="bg-transparent outline-none w-full text-white"
            />

          </div>

        </div>

        {/* Login Button */}

        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 rounded-2xl py-4 text-lg font-bold text-black shadow-lg shadow-cyan-500/20"
        >

          Continue

        </button>

        {/* Footer */}

        <p className="text-center text-slate-500 text-sm mt-8">

          New users automatically create accounts

        </p>

      </div>

    </div>

  );

}