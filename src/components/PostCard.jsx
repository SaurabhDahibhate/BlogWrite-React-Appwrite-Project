import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({
  $id,
  // The appwrite takes the id in this way $id , nothing more
  featuredImage,
  title,
}) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full  bg-slate-300 border border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl p-4  ">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl h-fit"
          />
        </div>
        <h2 className="text-base sm:text-xs md:text-sm lg:text-xl font-bold">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
