import React, { useEffect, useState } from "react";
import Profile__photo from "./Profile__photo";
import { db } from "../firebase";

import "./Profile__photos.css";

function Profile__photos() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
      );
  }, []);

  return (
    <div className="profile__photos">
      {posts.map(({ id, post }) => (
        <Profile__photo
          key={id}
          postId={id}
          username={post.username}
          photo={post.image}
        />
      ))}
    </div>
  );
}

export default Profile__photos;
