import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <Container>
      <div className="flex flex-wrap ">
        {posts.map((post) => (
          <div
            key={post.$id}
            className="p-2 w-4/4 sm:w-2/4 xl:w-1/4 sm:space-x-8"
          >
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </Container>
  );
}
