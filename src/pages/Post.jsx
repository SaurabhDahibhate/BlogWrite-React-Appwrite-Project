import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    // If the user confirms deletion, proceed with the deletion process
    if (isConfirmed) {
      appwriteService.deletePost(post.$id).then((status) => {
        if (status) {
          appwriteService.deleteFile(post.featuredImage);
          navigate("/");
        }
      });
    }
  };

  return post ? (
    <div className="  dark:text-gray-800 ">
      <Container>
        <div className=" pt-5 border w-4/4 m-auto bg-slate-300 dark:bg-slate-800 border-gray-600 rounded-xl">
          <div className=" w-full flex justify-center relative mb-4  p-2">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl mt-8 w-4/4 sm:w-2/4 xl:w-4/4"
            />

            {isAuthor && (
              <div className="absolute top-0 right-6">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" className="mr-3">
                    Edit
                  </Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>
          <div className="mb-20 w-4/5 m-auto  ">
            <div className="w-full mb-6">
              <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl font-bold">
                {post.title}
              </h1>
            </div>
            <p className="text-sm sm:text-sm md:text-lg lg:text-lg space-y-5">
              {parse(post.content, {
                replace: (domNode) => {
                  if (domNode.name === "p" || domNode.name === "ul") {
                    // Add margin-bottom to <p> and <li> tags
                    domNode.attribs.class =
                      (domNode.attribs.class || " ") + "leading-normal mb-4";
                  }
                },
              })}
            </p>
            {/* <p className="text-lg space-y-10">{parse(post.content)}</p> */}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
