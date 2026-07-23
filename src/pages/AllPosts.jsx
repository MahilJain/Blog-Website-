import React, { useEffect, useMemo, useState } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        let isMounted = true

        appwriteService
            .getPosts([])
            .then((response) => {
                if (response && isMounted) {
                    setPosts(response.documents)
                }
            })
            .catch(() => {
                if (isMounted) {
                    setPosts([])
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false)
                }
            })

        return () => {
            isMounted = false
        }
    }, [])

    const filteredPosts = useMemo(() => {
        const query = search.trim().toLowerCase()

        if (!query) {
            return posts
        }

        return posts.filter((post) =>
            post.title.toLowerCase().includes(query) ||
            (post.content || '').toLowerCase().includes(query)
        )
    }, [posts, search])

    return (
        <div className="w-full py-8">
            <Container>
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white">All Posts</h1>
                        <p className="text-slate-300">Manage and review your published content.</p>
                    </div>
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search your posts"
                        className="w-full max-w-sm rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                    />
                </div>

                {loading ? (
                    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center text-slate-300">
                        Loading posts...
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-10 text-center text-slate-300">
                        <h2 className="text-2xl font-semibold text-white">No matching posts</h2>
                        <p className="mt-2">Adjust your search or publish a new post to get started.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {filteredPosts.map((post) => (
                            <div key={post.$id} className="h-full">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllPosts