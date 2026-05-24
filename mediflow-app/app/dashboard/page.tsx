"use client";

import { useEffect, useState } from "react";

import { db } from "@/lib/firebase";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import {
  Bell,
  Clock,
  Activity,
  UserRound,
} from "lucide-react";

export default function DashboardPage() {

  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {

    const unsubscribe = onSnapshot(

      collection(db, "appointments"),

      (snapshot) => {

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAppointments(data);

      }

    );

    return () => unsubscribe();

  }, []);

  // CURRENT SERVING TOKEN

  const currentToken =
    appointments.length > 0
      ? appointments[0].token
      : "A-0";

  // YOUR TOKEN (TEMPORARY FIXED USER)

  const yourToken =
  appointments.length > 0
    ? appointments[appointments.length - 1].token
    : "A-0";

  // TOKEN NUMBER EXTRACTION

  const currentNumber =
    Number(currentToken.replace("A-", ""));

  const yourNumber =
    Number(yourToken.replace("A-", ""));

  // PATIENTS AHEAD

  const patientsAhead =
    yourNumber - currentNumber > 0
      ? yourNumber - currentNumber
      : 0;

  // WAIT TIME

  const estimatedWait = patientsAhead * 5;
  useEffect(() => {

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  }, []);

   useEffect(() => {

    if (
      Notification.permission === "granted" &&
      patientsAhead <= 2 &&
      patientsAhead > 0
    ) {

    new Notification("MediFlow Alert", {
      body: `Only ${patientsAhead} patients ahead of you.`,
    });

    }

    }, [patientsAhead]);

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-cyan-950 text-white p-6">

      {/* Header */}

      <div className="flex justify-between items-start mb-10">

        <div>

          <h1 className="text-5xl font-black text-cyan-400">
            MediFlow
          </h1>

          <p className="text-slate-400 mt-2">
            Smart Patient Queue Dashboard
          </p>

        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/20 px-5 py-3 rounded-2xl flex items-center gap-3">

          <Bell className="text-cyan-400" size={20} />

          <div>

            <p className="text-cyan-300 font-bold">
              Smart Notifications
            </p>

            <p className="text-slate-400 text-sm">
              Active
            </p>

          </div>

        </div>

      </div>

      {/* Top Cards */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        {/* Your Token */}

        <div className="bg-black/30 border border-cyan-500/20 rounded-3xl p-6">

          <p className="text-slate-400 mb-2">
            Your Token
          </p>

          <div className="flex justify-between items-center">

            <h2 className="text-5xl font-black text-cyan-400">
              {yourToken}
            </h2>

            <UserRound className="text-cyan-400" size={42} />

          </div>

        </div>

        {/* Current Token */}

        <div className="bg-black/30 border border-purple-500/20 rounded-3xl p-6">

          <p className="text-slate-400 mb-2">
            Current Serving
          </p>

          <div className="flex justify-between items-center">

            <h2 className="text-5xl font-black text-purple-400">
              {currentToken}
            </h2>

            <Activity className="text-purple-400" size={42} />

          </div>

        </div>

        {/* Wait Time */}

        <div className="bg-black/30 border border-emerald-500/20 rounded-3xl p-6">

          <p className="text-slate-400 mb-2">
            Estimated Wait
          </p>

          <div className="flex justify-between items-center">

            <h2 className="text-5xl font-black text-emerald-400">
              {estimatedWait}m
            </h2>

            <Clock className="text-emerald-400" size={42} />

          </div>

        </div>

      </div>

      {/* Main Card */}

      <div className="bg-black/20 border border-cyan-500/20 rounded-3xl p-8">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-slate-400 mb-3">
              Patients Ahead
            </p>

            <h2 className="text-7xl font-black text-cyan-400">
              {patientsAhead}
            </h2>

          </div>


        </div>

        {/* Queue Progress */}

        <div className="mt-10">

          <div className="w-full bg-slate-800 rounded-full h-5 overflow-hidden">

            <div
              className="bg-cyan-400 h-full transition-all duration-500"
              style={{
                width: `${100 - patientsAhead * 10}%`,
              }}
            />

          </div>

          <p className="text-slate-500 mt-3">
            Queue Progress
          </p>

        </div>

      </div>
     <button
       onClick={() => window.location.href = "/book"}
       className="mt-8 w-full bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 rounded-2xl py-4 text-lg font-bold text-black shadow-lg shadow-cyan-500/20"
>

        Book Another Appointment

     </button>
    </div>

  );

}