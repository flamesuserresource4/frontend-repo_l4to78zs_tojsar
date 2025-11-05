import { useState } from 'react'

export default function AuthModal({ open, onClose, onAuthed, apiBase }) {
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!open) return null

  const reset = () => {
    setName(''); setEmail(''); setPassword(''); setError('')
  }

  const handleSignup = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch(`${apiBase}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      if (!res.ok) throw new Error((await res.json()).detail || 'Signup failed')
      // Auto-login after signup
      await handleLogin(email, password)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (emailArg, passArg) => {
    setLoading(true); setError('')
    try {
      const res = await fetch(`${apiBase}/auth/login`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailArg ?? email, password: passArg ?? password })
      })
      if (!res.ok) throw new Error((await res.json()).detail || 'Login failed')
      const data = await res.json()
      const token = data.access_token
      const meRes = await fetch(`${apiBase}/auth/me`, { headers: { 'Authorization': `Bearer ${token}` } })
      const user = await meRes.json()
      onAuthed({ token, user })
      reset()
      onClose()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl overflow-hidden">
        <div className="flex">
          <button className={`flex-1 py-3 font-semibold ${mode==='login'?'bg-gray-900 text-white':'bg-gray-100'}`} onClick={() => setMode('login')}>Login</button>
          <button className={`flex-1 py-3 font-semibold ${mode==='signup'?'bg-gray-900 text-white':'bg-gray-100'}`} onClick={() => setMode('signup')}>Sign Up</button>
        </div>
        <div className="p-6 space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" placeholder="Jane Founder" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="mt-1 w-full rounded-md border px-3 py-2" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="mt-1 w-full rounded-md border px-3 py-2" placeholder="••••••••" />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="pt-2 flex gap-2">
            {mode === 'login' ? (
              <button disabled={loading} onClick={() => handleLogin()} className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold disabled:opacity-60">{loading?'Signing in...':'Login'}</button>
            ) : (
              <button disabled={loading} onClick={handleSignup} className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold disabled:opacity-60">{loading?'Creating account...':'Create account'}</button>
            )}
            <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
