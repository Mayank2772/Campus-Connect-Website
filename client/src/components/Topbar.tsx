import { useState } from 'react'
import type { Page } from '../App'

interface Props {
  title: string
  onNav: (p: Page) => void
}

export default function Topbar({ title, onNav }: Props) {
  const [showNotifDrop, setShowNotifDrop] = useState(false)

  return (
    <header
      className="flex items-center justify-between px-6 h-16 flex-shrink-0 relative"
      style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}
    >
      {/* Page title */}
      <h1
        className="text-slate-900 text-lg font-semibold"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h1>

      {/* Right cluster */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden sm:block">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            placeholder="Search companies, roles..."
            className="h-9 pl-9 pr-4 rounded-xl text-sm outline-none transition-all"
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              fontFamily: 'var(--font-body)',
              width: '220px',
              color: '#334155',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#2563eb'
              e.target.style.background = '#fff'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e2e8f0'
              e.target.style.background = '#f8fafc'
            }}
          />
        </div>

        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifDrop(!showNotifDrop)}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-slate-100 relative"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: '#ef4444' }}
            />
          </button>

          {showNotifDrop && (
            <div
              className="absolute right-0 top-11 rounded-2xl shadow-xl overflow-hidden z-50"
              style={{
                width: '300px',
                background: '#fff',
                border: '1px solid #e2e8f0',
              }}
            >
              <div
                className="px-4 py-3 border-b flex items-center justify-between"
                style={{ borderColor: '#f1f5f9' }}
              >
                <span className="text-sm font-semibold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>
                  Notifications
                </span>
                <span className="text-xs text-blue-600 cursor-pointer hover:underline">Mark all read</span>
              </div>
              {[
                {
                  title: 'Google Drive opens tomorrow',
                  desc: 'Registration closes at 11:59 PM tonight.',
                  time: '2h ago',
                  unread: true,
                },
                {
                  title: 'Profile incomplete',
                  desc: 'Add your resume to improve visibility.',
                  time: '1d ago',
                  unread: true,
                },
                {
                  title: 'TCS drive results out',
                  desc: 'Shortlist has been published.',
                  time: '3d ago',
                  unread: false,
                },
              ].map((n, i) => (
                <div
                  key={i}
                  className="px-4 py-3 flex gap-3 cursor-pointer transition-colors hover:bg-slate-50"
                  style={{ borderBottom: i < 2 ? '1px solid #f1f5f9' : 'none' }}
                >
                  <div
                    className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: n.unread ? '#2563eb' : 'transparent', border: n.unread ? 'none' : '1px solid #cbd5e1' }}
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-800">{n.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{n.desc}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile avatar */}
        <button
          onClick={() => onNav('profile')}
          className="flex items-center gap-2.5 pl-2 pr-3 h-9 rounded-xl transition-all hover:bg-slate-100"
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #60a5fa)' }}
          >
            MV
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-semibold text-slate-800 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Mayank Verma
            </div>
            <div className="text-[10px] text-slate-400 leading-tight">Student</div>
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </header>
  )
}
