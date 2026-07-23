import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between gap-4">
              <div className="inline-flex items-center">
                <Logo width="100px" />
              </div>
              <p className="text-sm text-slate-400">
                &copy; 2026 MegaBlog. Built for publishing, reading, and sharing ideas.
              </p>
            </div>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Company</h3>
            <ul className="space-y-3 text-slate-300">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/all-posts" className="hover:text-white">All Posts</Link></li>
              <li><Link to="/add-post" className="hover:text-white">Add Post</Link></li>
            </ul>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Support</h3>
            <ul className="space-y-3 text-slate-300">
              <li><Link to="/login" className="hover:text-white">Login</Link></li>
              <li><Link to="/signup" className="hover:text-white">Signup</Link></li>
              <li><Link to="/" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Legals</h3>
            <ul className="space-y-3 text-slate-300">
              <li><Link to="/" className="hover:text-white">Terms</Link></li>
              <li><Link to="/" className="hover:text-white">Privacy</Link></li>
              <li><Link to="/" className="hover:text-white">Licensing</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer