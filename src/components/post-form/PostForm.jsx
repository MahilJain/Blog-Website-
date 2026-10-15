import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form"
import { Button, Input, Select, RTE } from '../index';
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            status: post?.status || "active",

        }
    });

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    const [submitError, setSubmitError] = useState("");
    const [submissionStep, setSubmissionStep] = useState("");

    const submit = async (data) => {
        setSubmitError("");

        if (!userData?.$id) {
            setSubmitError("Your session has expired. Please log in again.");
            navigate("/login", { state: { from: "/add-post" } });
            return;
        }

        let uploadedFileId;
        let postSaved = false;

        try {
            const selectedImage = data.image?.[0];
            let file = null;

            if (selectedImage) {
                setSubmissionStep("Uploading featured image...");
                file = await appwriteService.uploadFile(selectedImage, userData.$id);
                if (!file?.$id) {
                    throw new Error("The image could not be uploaded. Please try again.");
                }
                uploadedFileId = file.$id;
            }

            setSubmissionStep(post ? "Saving your changes..." : "Publishing your post...");
            const postData = {
                    title: data.title,
                    content: data.content,
                    status: data.status,
                    featuredimage: file?.$id || post?.featuredimage,
                    userId: userData.$id,
            };
            const dbPost = post
                ? await appwriteService.updatePost(post.$id, postData)
                : await appwriteService.createPost(postData);

            if (!dbPost?.$id) {
                throw new Error("Your post could not be saved. Please try again.");
            }

            postSaved = true;

            if (post?.featuredimage && file?.$id && file.$id !== post.featuredimage) {
                const deleted = await appwriteService.deleteFile(post.featuredimage);
                if (!deleted) {
                    console.error("Post saved, but the previous featured image could not be deleted.");
                }
            }

            navigate(`/post/${dbPost.$id}`);
        } catch (error) {
            if (uploadedFileId && !postSaved) {
                const deleted = await appwriteService.deleteFile(uploadedFileId);
                if (!deleted) {
                    console.error("Failed to clean up the uploaded image after the post could not be saved.");
                }
            }

            setSubmitError(error.message || "Something went wrong while saving your post. Please try again.");
        } finally {
            setSubmissionStep("");
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-')
                .replace(/^-+|-+$/g, '')
                .slice(0, 36);
        }
        return ""
    }, [])

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                const slug = slugTransform(value.title, { shouldValidate: true });
                setValue('slug', slug);
            }
        })

        return () => {
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue]);
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6 lg:flex-row">
            <div className="w-full lg:w-2/3">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    aria-invalid={Boolean(errors.title)}
                    {...register("title", { required: "Please enter a title for your post." })}
                />
                {errors.title && <p className="-mt-3 mb-4 text-sm text-red-400">{errors.title.message}</p>}
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    disabled
                    {...register("slug", { required: false })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-full lg:w-1/3">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    aria-invalid={Boolean(errors.image)}
                    {...register("image", { required: post ? false : "Please choose a featured image." })}
                />
                {errors.image && <p className="-mt-3 mb-4 text-sm text-red-400">{errors.image.message}</p>}
                {post && post.featuredimage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                {submitError && (
                    <p className="mb-3 rounded-lg border border-red-500/40 bg-red-950/40 p-3 text-sm text-red-200" role="alert">
                        {submitError}
                    </p>
                )}
                {submissionStep && (
                    <p className="mb-3 text-sm text-slate-300" role="status" aria-live="polite">
                        {submissionStep}
                    </p>
                )}
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                >
                    {isSubmitting ? "Please wait..." : post ? "Update post" : "Publish post"}
                </Button>
            </div>
        </form>
    );

}


export default PostForm