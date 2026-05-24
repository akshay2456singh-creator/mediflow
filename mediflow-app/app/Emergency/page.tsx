"use client";

import { useState } from "react";

import { db } from "@/lib/firebase";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { HeartPulse } from "lucide-react";

export default function EmergencyPage() {

  const [patientName, setPatientName] = useState("");
  const [department, setDepartment] = useState("");

  const createEmergency = async () => {

    await addDoc(collection(db, "appointments"), {

      patientName,
      department,

      token: "EMERGENCY",

      emergency: true,

      createdAt: serverTimestamp(),

    });

    alert("Emergency patient added!");

    setPatientName("");
    setDepartment("");
  };

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-xl bg-red-950/40 border border-red-500/20 rounded-3xl p-10">

        <div className="flex items-center gap-4 mb-8">

          <HeartPulse
            size={52}
            className="text-red-400"
          />

          <div>

            <h1 className="text-4xl font-black text-red-400">

              Emergency Queue

            </h1>

            <p className="text-slate-400">

              Priority patient management

            </p>

          </div>
        </div>

        <div className="space-y-6">

          <input
            type="text"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full bg-black/40 border border-red-500/20 rounded-2xl p-4"
          />

          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full bg-black/40 border border-red-500/20 rounded-2xl p-4"
          />

          <button
            onClick={createEmergency}
            className="w-full bg-red-500 hover:bg-red-400 transition-all rounded-2xl py-4 font-bold text-lg"
          >

            Add Emergency Patient

          </button>

        </div>
      </div>
    </div>
  );
}