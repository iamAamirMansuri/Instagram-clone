import React, { useState } from "react";
import "./Header.css";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import Avatar from "@material-ui/core/Avatar";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import { Link } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { useStateValue } from "../StateProvider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import firebase from "firebase";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Header() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const signof = () => {
    auth
      .signOut()
      .then(() => {
        dispatch({
          type: "REMOVE_USER",
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on("state_changed", () => {
      storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then((url) => {
          db.collection("posts").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption,
            image: url,
            username: user.displayName,
            dp: user.photoURL,
          });
          setCaption("");
          setImage(null);
          setOpen(false);
        });
    });
  };

  // avatar menu

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //

  /// scroll to top
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="header">
      <div className="header__nav">
        <Link to="/">
          <img
            onClick={scrollTop}
            className="header__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1024px-Instagram_logo.svg.png"
            alt="instagram logo"
          />
        </Link>
        <div className="header__nav__icons">
          <Link to="/">
            {/* <img
              src="https://static.thenounproject.com/png/682477-200.png"
              alt="home icon"
              className="header__icon home"
            /> */}
            <HomeOutlinedIcon
              className="header__icon home"
              onClick={scrollTop}
            />
          </Link>
          <AddBoxOutlinedIcon
            className="header__icon upload__button"
            onClick={() => {
              setOpen(true);
            }}
          />

          {/* popup for upload*/}

          <Dialog
            className="upload__popup"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {
              setOpen(false);
            }}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"New Post"}
            </DialogTitle>

            <div className="upload__top">
              <Avatar
                className="upload__avatar"
                src={user.photoURL}
                alt={user.displayName}
              />
              {/* <TextField
                className="upload__caption"
                label="Write a caption..."
                type="text"
                // placeholder="Write a caption..."
                multiline
                onChange={(e) => setCaption(e.target.value)}
              /> */}
              <input
                className="upload__caption"
                type="text"
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value.substring(0, 100))}
              />
            </div>
            <input
              className="upload__file"
              type="file"
              onChange={handleChange}
            />

            <DialogActions>
              <Button
                className="share__button"
                onClick={handleUpload}
                variant="contained"
              >
                Share
              </Button>
            </DialogActions>
          </Dialog>

          {/*  */}

          {/* <Link to="/likes">
            <FavoriteBorderOutlinedIcon className="header__icon like" />
          </Link> */}
          <Avatar
            onClick={handleClick}
            className="header__icon avatar"
            src={user.photoURL}
            alt={user.displayName}
            fontSize="small"
          />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link to="/profile" className="profile__link">
              <MenuItem onClick={handleClose}>
                <AccountCircleOutlinedIcon className="profile__icon" />
                Profile
              </MenuItem>
            </Link>

            <MenuItem
              // onClick={handleClose}
              onClick={signof}
              className="logout__button"
            >
              <ExitToAppOutlinedIcon className="logout__icon" />
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Header;
