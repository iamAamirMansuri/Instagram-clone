import React, { useEffect, useState } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import firebase from "firebase";
import Modal from "@material-ui/core/Modal";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";

import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function Post({ dp, username, post, caption, postId }) {
  const [{ user }, dispatch] = useStateValue();
  // const [likes, setLikes] = useState([]);
  // const [likeBtn, setLikeBtn] = useState("false");

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  /////////////////////////////////////////////modal

  // getModalStyle is not a pure function, we roll the style only on the first render

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //////////////////////////////////////////comment

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((docs) => docs.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      image: user.photoURL,
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  //////////////////////////////////////post like

  // const handleLike = (e) => {
  //   // setLikeBtn(!likeBtn);
  //   db.collection("posts").doc(postId).collection("likes").add({
  //     userLiked: user.displayName,
  //   });
  // };

  // const handleUnlike = (e) => {
  //   // setLikeBtn(!likeBtn);
  //   db.collection("posts").doc(postId).collection("likes").update({
  //     userLiked: firebase.firestore.FieldValue.delete(),
  //   });
  // };

  ////////////////////////////////////modal

  const body = (
    <div className="modal__body">
      <div className="modal__post">
        <img className="modal__image" src={post} alt="" />
      </div>
      <div className="modal__details">
        <div className="modal__nav">
          <ArrowBackIcon
            className="back"
            onClick={handleClose}
            fontSize="large"
          />
          <p className="nav__comment">Comments</p>
        </div>
        <div className="modal__header">
          <Avatar className="modal__dp" src={dp} />
          <p className="modal__username modal__username__cap">
            <strong>{username}</strong>
          </p>
        </div>

        <div className="modal__comments">
          <div className="modal__caption">
            <Avatar className="modal__dp" src={dp} />
            <p className="modal__username__cap">
              <strong>{username}</strong> {caption}
            </p>
            {/* <p className="modal__cap">{caption}</p> */}
          </div>
          {comments.map((comment) => (
            <div className="modal__comment__ind">
              <Avatar
                className="modal__dp"
                src={comment.image}
                fontSize="small"
              />
              <p>
                <strong>{comment.username}</strong> {comment.text}
              </p>
            </div>
          ))}
        </div>
        <form className="modal__comment__box">
          <input
            type="text"
            className="modal__comment__input"
            placeholder="Add a comment..."
            value={comment}
            autoFocus
            onChange={(e) => {
              setComment(e.target.value.substring(0, 100));
            }}
          />
          {!comment ? (
            <button
              className="disable__button"
              disabled={!comment}
              type="submit"
              onClick={postComment}
            >
              Post{" "}
            </button>
          ) : (
            <button
              className="able__button"
              disabled={!comment}
              type="submit"
              onClick={postComment}
            >
              {" "}
              Post
            </button>
          )}
        </form>
      </div>
    </div>
  );

  ///////////////////////////////////////////////
  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__dp" src={dp} />
        <p className="post__username">
          <strong>{username}</strong>
        </p>
      </div>
      <img className="post__image" src={post} alt="" />
      <div className="post__icons">
        {/* <FavoriteBorderOutlinedIcon
          className="post__icon unlike__icon"
          fontSize="large"
          onClick={}
        />

        <FavoriteIcon
          className="post__icon like__icon"
          fontSize="large"
          onClick={}
        /> */}
        <img
          src="https://cdn0.iconfinder.com/data/icons/instagram-ui-1/24/Instagram-UI_comment-512.png"
          alt="comment"
          onClick={handleOpen}
          className="modal__icon comment"
        />
        {/* <ChatBubbleOutlineOutlinedIcon
          onClick={handleOpen}
          className="modal__icon comment"
          fontSize="large"
        /> */}
      </div>
      <div className="caption">
        <p className="post__caption">
          <strong>{username}</strong> {caption}
        </p>
        {comments.length >= 1 ? (
          <p className="comments__length" onClick={handleOpen}>
            View all {comments.length} comments
          </p>
        ) : null}
      </div>
      <form className="modal__comment__box">
        <input
          type="text"
          className="modal__comment__input"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value.substring(0, 150));
          }}
        />
        {!comment ? (
          <button
            className="disable__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post{" "}
          </button>
        ) : (
          <button
            className="able__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            {" "}
            Post
          </button>
        )}
      </form>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
}

export default Post;
