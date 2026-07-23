import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredimage }) {
    return (
        <Link to={`/post/${$id}`} className="block h-full">
            <article className="h-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/30 transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 hover:shadow-blue-950/30">
                {featuredimage && (
                    <div className="mb-4 overflow-hidden rounded-xl">
                        <img
                            src={appwriteService.getFilePreview(featuredimage)}
                            alt={title}
                            className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                )}
                <h2 className="text-xl font-semibold text-white transition-colors duration-200 hover:text-blue-400">
                    {title}
                </h2>
            </article>
        </Link>
    )
}

export default PostCard