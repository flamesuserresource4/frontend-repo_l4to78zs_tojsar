import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import AuthModal from './components/AuthModal'
import Dashboard from './components/Dashboard'
import AdminPage from './components/AdminPage'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [route, setRoute] = useState('landing') // landing | dashboard | admin
  const [authOpen, setAuthOpen] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => {
    if (token) localStorage.setItem('token', token); else localStorage.removeItem('token')
    if (user) localStorage.setItem('user', JSON.stringify(user)); else localStorage.removeItem('user')
  }, [token, user])

  const onAuthed = ({ token, user }) => {
    setToken(token)
    setUser(user)
    setRoute('dashboard')
  }

  const onLogout = () => {
    setToken(''); setUser(null); setRoute('landing')
  }

  const navigate = (r) => {
    if (r === 'dashboard' || r === 'admin') {
      if (!user) { setAuthOpen(true); return }
      if (r === 'admin' && !user.admin) return
    }
    setRoute(r)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <Navbar user={user} onNavigate={navigate} onLogout={onLogout} />
      {route === 'landing' && (
        <LandingPage onOpenAuth={() => setAuthOpen(true)} onGetStarted={() => navigate('dashboard')} />
      )}
      {route === 'dashboard' && user && (
        <Dashboard apiBase={API_BASE} token={token} />
      )}
      {route === 'admin' && user?.admin && (
        <AdminPage apiBase={API_BASE} token={token} />
      )}

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuthed={onAuthed} apiBase={API_BASE} />

      <footer className="text-center text-xs text-gray-500 py-10">© {new Date().getFullYear()} Content Tracker</footer>
    </div>
  )
}
