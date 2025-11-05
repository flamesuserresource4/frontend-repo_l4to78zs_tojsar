import { useEffect, useState } from 'react'
import { Plus, Trash2, Pencil } from 'lucide-react'

export default function Dashboard({ apiBase, token }) {
  const [posts, setPosts] = useState([])
  const [form, setForm] = useState({ title: '', content: '', status: 'Draft' })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }

  const load = async () => {
    const res = await fetch(`${apiBase}/posts`, { headers })
    const data = await res.json()
    setPosts(data)
  }

  useEffect(() => { load() }, [])

  const submit = async () => {
    setLoading(true)
    try {
      if (editingId) {
        await fetch(`${apiBase}/posts/${editingId}`, { method: 'PUT', headers, body: JSON.stringify(form) })
      } else {
        await fetch(`${apiBase}/posts`, { method: 'POST', headers, body: JSON.stringify(form) })
      }
      setForm({ title: '', content: '', status: 'Draft' })
      setEditingId(null)
      await load()
    } finally {
      setLoading(false)
    }
  }

  const edit = (p) => {
    setEditingId(p.id)
    setForm({ title: p.title, content: p.content, status: p.status })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const del = async (id) => {
    await fetch(`${apiBase}/posts/${id}`, { method: 'DELETE', headers })
    await load()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{editingId ? 'Edit Post' : 'Create a Post'}</h2>
        <div className="grid gap-4">
          <input className="w-full border rounded-md px-3 py-2" placeholder="Title" value={form.title} onChange={e=>setForm({ ...form, title: e.target.value })}/>
          <textarea className="w-full border rounded-md px-3 py-2 h-28" placeholder="Content" value={form.content} onChange={e=>setForm({ ...form, content: e.target.value })}/>
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select className="border rounded-md px-2 py-1" value={form.status} onChange={e=>setForm({ ...form, status: e.target.value })}>
              <option>Draft</option>
              <option>Published</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <button disabled={loading} onClick={submit} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold disabled:opacity-60 flex items-center gap-2">
              <Plus size={16}/>{editingId ? 'Save Changes' : 'Add Post'}
            </button>
            {editingId && (
              <button onClick={() => { setEditingId(null); setForm({ title: '', content: '', status: 'Draft' }) }} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium">Cancel</button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(p => (
          <div key={p.id} className="bg-white border rounded-xl shadow-sm p-5 flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-gray-900">{p.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${p.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>{p.status}</span>
            </div>
            <p className="mt-2 text-gray-600 text-sm whitespace-pre-wrap flex-1">{p.content}</p>
            <div className="mt-4 flex items-center gap-2">
              <button onClick={() => edit(p)} className="px-3 py-1.5 rounded-md bg-white border hover:bg-gray-50 text-gray-800 flex items-center gap-1"><Pencil size={14}/> Edit</button>
              <button onClick={() => del(p.id)} className="px-3 py-1.5 rounded-md bg-red-50 border border-red-200 hover:bg-red-100 text-red-700 flex items-center gap-1"><Trash2 size={14}/> Delete</button>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3 text-center text-gray-500">No posts yet. Create your first one above.</div>
        )}
      </div>
    </div>
  )
}
