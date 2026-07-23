import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { Button, Container } from '../components'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

export default function Post() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    const userData = useSelector((state) => state.auth.userData)
    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        if (!id) {
            navigate('/')
            return
        }

        let isMounted = true

        appwriteService
            .getPost(id)
            .then((response) => {
                if (isMounted) {
                    if (response) {
                        setPost(response)
                    } else {
                        navigate('/')
                    }
                }
            })
            .catch(() => {
                if (isMounted) {
                    navigate('/')
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
    }, [id, navigate])

    const deletePost = async () => {
        if (!post) {
            return
        }

        const confirmed = window.confirm('Are you sure you want to delete this post?')
        if (!confirmed) {
            return
        }

        setIsDeleting(true)

        try {
            const status = await appwriteService.deletePost(post.$id)
            if (status && post.featuredimage) {
                await appwriteService.deleteFile(post.featuredimage)
            }
            navigate('/')
        } catch (error) {
            console.error('Failed to delete post', error)
        } finally {
            setIsDeleting(false)
        }
    }

    if (loading) {
        return (
            <div className="py-8 text-center text-slate-300">
                <Container>Loading post...</Container>
            </div>
        )
    }

    return post ? (
        <div className="py-8">
            <Container>
                {post.featuredimage && post.featuredimage.trim() ? (
                    <div className="relative mb-6 flex justify-center rounded-2xl border border-slate-800 bg-slate-900/50 p-3">
                        <img
                            src={appwriteService.getFilePreview(post.featuredimage)}
                            alt={post.title || 'Post image'}
                            className="max-h-[480px] w-full rounded-xl object-cover"
                        />

                        {isAuthor && (
                            <div className="absolute right-6 top-6 flex gap-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500">Edit</Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost} disabled={isDeleting}>
                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                </Button>
                            </div>
                        )}
                    </div>
                ) : (
                    isAuthor && (
                        <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-center">
                            <p className="mb-3 text-slate-300">No featured image</p>
                            <div className="flex justify-center gap-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500">Edit</Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost} disabled={isDeleting}>
                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                </Button>
                            </div>
                        </div>
                    )
                )}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white">{post.title}</h1>
                </div>
                <div className="browser-css rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-slate-100">
                    {post.content ? parse(post.content) : <p>No content available</p>}
                </div>
            </Container>
        </div>
    ) : null
}