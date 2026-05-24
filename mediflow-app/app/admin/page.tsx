"use client";
import { useEffect, useState } from "react";

import { db } from "@/lib/firebase";

import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc
} from "firebase/firestore";
import {
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function AdminPage() {

  const [appointments, setAppointments] = useState<any[]>([]);

  const [completedCount, setCompletedCount] = useState(0);

     useEffect(() => {

     const q = query(collection(db, "appointments"),
     orderBy("createdAt", "desc")
     );

     const unsubscribe = onSnapshot(q, (snapshot) => {

        const data = snapshot.docs.map((doc) => ({
        id: doc.id,
       ...doc.data(),
    }));

      setAppointments(data);
    });

    return () => unsubscribe();

    }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-blue-950 text-white p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-5xl font-black text-cyan-400">
            MediFlow Admin
          </h1>

          <p className="text-slate-400 mt-2 text-lg">
            Hospital Queue Control Panel
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-slate-900/70 border border-cyan-500/20 rounded-3xl p-6">
          <p className="text-slate-400 mb-2">
            Current Token
          </p>

          <h2 className="text-4xl font-black text-cyan-400">
           {appointments[0]?.token || "A-0"}
          </h2>
        </div>

        <div className="bg-slate-900/70 border border-purple-500/20 rounded-3xl p-6">
          <p className="text-slate-400 mb-2">
            Waiting Patients
          </p>

          <h2 className="text-4xl font-black text-purple-400">
            {appointments.length}
          </h2>
        </div>

        <div className="bg-slate-900/70 border border-emerald-500/20 rounded-3xl p-6">
          <p className="text-slate-400 mb-2">
            Completed Today
          </p>

          <h2 className="text-4xl font-black text-emerald-400">
            {completedCount}
          </h2>
        </div>

      </div>

      {/* Queue */}
      <div className="bg-slate-900/70 border border-cyan-500/20 rounded-3xl p-8">

        <div className="flex items-center gap-3 mb-8">
          <Users className="text-cyan-400" />

          <h2 className="text-3xl font-bold text-cyan-300">
            Live Queue
          </h2>
        </div>

        {/* Patient Card */}
        {appointments.map((appointment, index) => (

          <div
            key={appointment.id}
            className="bg-black/30 border border-cyan-500/20 rounded-2xl p-6 mb-5 flex justify-between items-center"> 

             <div>
               <p className="text-slate-400">
                Token
               </p>

              <h3 className="text-3xl font-black text-cyan-400">
              {appointment.token}
              </h3>

             <p className="text-slate-400 mt-2">
             {appointment.department}
             </p>

            <p className="text-slate-500 text-sm mt-1">
              {appointment.patientName}
            </p>
          </div>

    <div className="flex gap-4">

      <button
         onClick={() => {
           if (index < appointments.length - 1) {
              const nextToken = appointments[index + 1].token;
              alert(`Now Serving ${nextToken}`);
    }           
     }}
     className="bg-cyan-500 hover:bg-cyan-400 transition px-5 py-3 rounded-2xl flex items-center gap-2 font-bold"
    >
    <ArrowRight size={18} />
    Next
      </button>

      <button
        onClick={async () => {
          await deleteDoc(doc(db, "appointments", appointment.id));
     }}
       className="bg-emerald-500 hover:bg-emerald-400 transition px-5 py-3 rounded-2xl flex items-center gap-2 font-bold">
         <CheckCircle2 size={18} />
        Complete
     </button>

    </div>

  </div>

))}

      </div>
    </div>
  );
}