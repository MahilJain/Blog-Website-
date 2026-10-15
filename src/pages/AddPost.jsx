import React from 'react'
import { Container, PostForm } from "../components"

function AddPost() {
    return (
        <div className="py-8">
            <Container>
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white">Create a post</h1>
                    <p className="mt-2 text-slate-300">Add a title, write your story, and choose a featured image to publish.</p>
                </div>
                <PostForm />
            </Container>
        </div>
    )
}
export default AddPost;