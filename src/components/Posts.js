import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Post from "./Post";
import "./Posts.css";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [posts]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
      );
  }, []);

  return (
    <div className="posts">
      {posts.map(({ id, post }) => (
        <Post
          key={id}
          postId={id}
          dp={post.dp}
          username={post.username}
          post={post.image}
          caption={post.caption}
        />
      ))}
    </div>
  );
}

export default Posts;
