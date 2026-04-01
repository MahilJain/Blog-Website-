import React from "react";
import appwriteService from "../appwrite/config"
import {Link} from "react-router-dom";
function PostCard({$id , title, featuredimage}) {

    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                {featuredimage && (
                    <div className="w-full justify-center mb-4">
                        <img
                            src={appwriteService.getFilePreview(featuredimage)}
                            alt={title}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                    </div>
                )}
                <h2
                className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200"
                >{title}</h2>
            </div>
        </Link>
    );
} 

export default PostCard;