
import { useState } from 'react'
import { Sparkles, X } from 'lucide-react'
import { Link } from 'react-router'

export default function Banner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="relative isolate flex items-center justify-between gap-x-6 overflow-hidden bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-3 sm:px-6">
      {/* Background effect */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -z-10 h-56 w-[48rem] -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl opacity-30"
        style={{
          background:
            'linear-gradient(to right, #60a5fa, #a5b4fc)',
          clipPath:
            'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 75% 28.6%, 58.5% 54.6%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 68.6% 100%)',
        }}
      />

      {/* Content */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-800">
        <Sparkles className="text-blue-600 w-5 h-5" />
        <span className="font-medium">
          <strong className="text-blue-700">CodEdit v1.0</strong> is now live — Empower your coding classrooms today!
          <Link to={"/auth?tab=signup"}
          className="inline-flex ml-4 items-center rounded-full bg-blue-600 px-3 py-1 text-white font-medium text-sm shadow-sm transition hover:bg-blue-700"
        >
          Try Now →
        </Link>
        </span>
        
      </div>

      {/* Dismiss Button */}
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="p-2 text-gray-600 hover:text-gray-800 transition"
      >
        <span className="sr-only">Dismiss banner</span>
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  )
}
