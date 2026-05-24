"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

export default function Home() {

  const [showNotification, setShowNotification] = useState(true);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-blue-700">
            MediFlow
          </h1>

          <p className="text-gray-600 mt-1">
            Smart Hospital Queue Management
          </p>
        </div>

        {/* Notification Bell */}
        <div className="relative">

          <button className="bg-white p-3 rounded-2xl shadow-lg">
            <Bell className="text-blue-700" size={28} />
          </button>

          <div className="absolute top-0 right-0 bg-red-500 w-3 h-3 rounded-full"></div>

        </div>

      </div>

      {/* Notification Popup */}
      {showNotification && (
        <div className="fixed top-6 right-6 bg-white shadow-2xl rounded-2xl p-4 w-80 border-l-4 border-blue-600 z-50">

          <div className="flex justify-between items-start">

            <div>
              <h3 className="font-bold text-blue-700">
                Notification
              </h3>

              <p className="text-gray-600 mt-2">
                Your token A-108 will be called in 5 minutes.
              </p>
            </div>

            <button
              onClick={() => setShowNotification(false)}
              className="text-gray-500 text-lg"
            >
              ✕
            </button>

          </div>

        </div>
      )}

      {/* Dashboard */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Queue Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6">

          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Queue Status
          </h2>

          <div className="space-y-4">

            <div className="bg-blue-100 rounded-2xl p-4">
              <p className="text-gray-600">
                Current Token
              </p>

              <h3 className="text-4xl font-bold text-blue-700">
                A-102
              </h3>
            </div>

            <div className="bg-green-100 rounded-2xl p-4">
              <p className="text-gray-600">
                Your Token
              </p>

              <h3 className="text-4xl font-bold text-green-700">
                A-108
              </h3>
            </div>

            <div className="bg-yellow-100 rounded-2xl p-4">
              <p className="text-gray-600">
                Estimated Wait Time
              </p>

              <h3 className="text-3xl font-bold text-yellow-700">
                15 mins
              </h3>
            </div>

          </div>

        </div>

        {/* Doctor Availability */}
        <div className="bg-white rounded-3xl shadow-xl p-6">

          <h2 className="text-2xl font-bold text-purple-700 mb-4">
            Doctor Availability
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between bg-purple-100 p-4 rounded-2xl">

              <div>
                <h3 className="font-bold">
                  Dr. Sharma
                </h3>

                <p className="text-gray-600">
                  Cardiology
                </p>
              </div>

              <span className="text-green-600 font-bold">
                Available
              </span>

            </div>

            <div className="flex justify-between bg-red-100 p-4 rounded-2xl">

              <div>
                <h3 className="font-bold">
                  Dr. Mehta
                </h3>

                <p className="text-gray-600">
                  Orthopedics
                </p>
              </div>

              <span className="text-red-600 font-bold">
                Delayed
              </span>

            </div>

            <div className="flex justify-between bg-blue-100 p-4 rounded-2xl">

              <div>
                <h3 className="font-bold">
                  Dr. Rao
                </h3>

                <p className="text-gray-600">
                  General Medicine
                </p>
              </div>

              <span className="text-green-600 font-bold">
                Available
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Buttons */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">

        <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-4 rounded-2xl shadow-lg">
          Book Appointment
        </button>

        <button className="bg-green-600 hover:bg-green-700 text-white text-lg py-4 rounded-2xl shadow-lg">
          Live Queue Tracking
        </button>

        <button className="bg-red-600 hover:bg-red-700 text-white text-lg py-4 rounded-2xl shadow-lg">
          Emergency Priority
        </button>

      </div>

    </main>
  );
}