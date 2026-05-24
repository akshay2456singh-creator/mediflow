"use client";
import { db } from "@/lib/firebase";

import { CalendarDays, Stethoscope, UserRound } from "lucide-react";
import { useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";

export default function BookPage() {

  const [patientName, setPatientName] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const bookAppointment = async () => {
  try {
    const snapshot = await getDocs(
      collection(db, "appointments")
   );

    const tokenNumber = snapshot.size + 1;
    const existingQuery = query(
        collection(db, "appointments"),
        where("patientName", "==", patientName),
        where("status", "==", "pending")
      );

const existingSnapshot = await getDocs(existingQuery);

if (!existingSnapshot.empty) {
  alert("You already have an active appointment.");
  return;
}

    const generatedToken = `A-${tokenNumber}`;
    await addDoc(collection(db, "appointments"), {
      patientName,
      department,
      date,
      createdAt: new Date(),
      token: generatedToken,
      status: "pending",
    });

    alert("Appointment Booked Successfully!");
  } catch (error) {
    console.error(error);
    alert("Booking Failed");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-cyan-950 text-white flex items-center justify-center p-8">

      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-10 shadow-2xl shadow-cyan-500/10">

        {/* Header */}
        <div className="text-center mb-10">

          <h1 className="text-5xl font-black text-cyan-400 mb-3">
            Book Appointment
          </h1>

          <p className="text-slate-400 text-lg">
            Smart AI Hospital Queue Registration
          </p>

        </div>

        {/* Form */}
        <div className="space-y-6">

          {/* Name */}
          <div>
            <label className="block mb-2 text-slate-300 font-semibold">
              Patient Name
            </label>

            <div className="flex items-center bg-slate-900/70 border border-cyan-500/20 rounded-2xl px-4 py-4">

              <UserRound className="text-cyan-400 mr-3" />

              <input
                type="text"
                placeholder="Enter patient name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full bg-black/30 border border-cyan-500/30 rounded-2xl px-14 py-5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
                />

            </div>
          </div>

          {/* Department */}
          <div>
            <label className="block mb-2 text-slate-300 font-semibold">
              Select Department
            </label>

            <div className="flex items-center bg-slate-900/70 border border-purple-500/20 rounded-2xl px-4 py-4">

              <Stethoscope className="text-purple-400 mr-3" />

              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-slate-900 text-white border border-purple-500/30 rounded-2xl px-14 py-5 focus:outline-none focus:border-purple-400 transition-all"
>
                <option value="">Select Department</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="General Medicine">General Medicine</option>
              </select>

            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block mb-2 text-slate-300 font-semibold">
              Appointment Date
            </label>

            <div className="flex items-center bg-slate-900/70 border border-green-500/20 rounded-2xl px-4 py-4">

              <CalendarDays className="text-green-400 mr-3" />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-black/30 border border-emerald-500/30 rounded-2xl px-14 py-5 text-white focus:outline-none focus:border-emerald-400 transition-all"
              />

            </div>
          </div>

          {/* AI Suggestion Box */}
          <div className="bg-cyan-500/10 border border-cyan-400 rounded-2xl p-5 animate-pulse">

            <h3 className="text-cyan-300 font-bold mb-2">
              AI Suggestion
            </h3>

            <p className="text-slate-300">
              Best available slot detected with minimum waiting time between 11:00 AM - 11:20 AM.
            </p>

          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">

            <button 
              onClick={bookAppointment} 
              className="flex-1 bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-cyan-500/30 hover:scale-105">
              Generate Token
            </button>

            
          </div>

        </div>

      </div>

    </div>
  );
}