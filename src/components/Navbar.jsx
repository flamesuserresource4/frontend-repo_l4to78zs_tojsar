import { LogOut, Shield, LayoutDashboard, Home } from 'lucide-react'

export default function Navbar({ user, onNavigate, onLogout }) {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">CT</div>
          <span className="font-semibold text-gray-800">Content Tracker</span>
        </div>
        <nav className="flex items-center gap-2">
          <button onClick={() => onNavigate('landing')} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center gap-1">
            <Home size={16}/> Home
          </button>
          {user && (
            <>
              <button onClick={() => onNavigate('dashboard')} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center gap-1">
                <LayoutDashboard size={16}/> Dashboard
              </button>
              {user.admin && (
                <button onClick={() => onNavigate('admin')} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center gap-1">
                  <Shield size={16}/> Admin
                </button>
              )}
              <button onClick={onLogout} className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 flex items-center gap-2">
                <LogOut size={16}/> Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
