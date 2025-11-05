import { Rocket, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

export default function LandingPage({ onOpenAuth, onGetStarted }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
      <div className="relative max-w-6xl mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium mb-4">
              <Rocket size={14}/> Ship faster with Micro‑SaaS
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
              Track your content with ease
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Create, organize, and publish your posts from one simple dashboard. Built for solo founders and small teams.
            </p>
            <ul className="mt-6 space-y-2 text-gray-700">
              {["Secure authentication","Draft/Publish statuses","Admin oversight"].map((f) => (
                <li key={f} className="flex items-center gap-2"><CheckCircle2 className="text-emerald-500" size={18}/>{f}</li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3">
              <button onClick={onGetStarted} className="px-5 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow">
                Get Started
              </button>
              <button onClick={onOpenAuth} className="px-5 py-3 rounded-lg bg-white hover:bg-gray-50 text-gray-800 font-semibold border shadow-sm">
                Sign In
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border overflow-hidden flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-gray-700 font-medium">Content Tracker Dashboard</p>
                <p className="text-gray-500 text-sm">Manage posts, statuses, and more</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
