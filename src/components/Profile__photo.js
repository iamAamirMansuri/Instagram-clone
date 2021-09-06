import React from "react";
import { useStateValue } from "../StateProvider";
import "./Profile__photo.css";

function Profile__photo({ photo, username, postId }) {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="profile__photo">
      {username === user.displayName && (
        <div className="profile__photo__section">
          <img src={photo} alt="" className="profile__photo__img" />
        </div>
      )}
    </div>
  );
}

export default Profile__photo;
