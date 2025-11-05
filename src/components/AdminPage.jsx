import { useEffect, useState } from 'react'
import { Shield } from 'lucide-react'

export default function AdminPage({ apiBase, token }) {
  const [posts, setPosts] = useState([])
  const headers = { 'Authorization': `Bearer ${token}` }

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${apiBase}/admin/posts`, { headers })
      if (res.ok) {
        const data = await res.json()
        setPosts(data)
      }
    }
    load()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 text-indigo-700"><Shield size={18}/> <h2 className="text-xl font-bold">Admin: All Posts</h2></div>
        <p className="text-gray-600 text-sm">Read-only view of all posts across users.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(p => (
          <div key={p.id} className="bg-white rounded-xl border shadow-sm p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{p.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${p.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>{p.status}</span>
            </div>
            <p className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">{p.content}</p>
            <div className="mt-3 text-xs text-gray-500">Owner: {p.author_name || p.user_id}</div>
          </div>
        ))}
        {posts.length === 0 && <div className="md:col-span-2 lg:col-span-3 text-center text-gray-500">No posts to display.</div>}
      </div>
    </div>
  )
}
