import React, { useEffect, useState } from "react";
import "./Login.css";
import { Button, Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { auth, db, storage } from "../firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../Reducer";
import Avatar from "@material-ui/core/Avatar";
import firebase from "firebase";

function Login() {
  const [state, dispatch] = useStateValue();
  const [displayLogin, setDisplayLogin] = useState(true);
  const [displaySignup, setDisplaySignup] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [photourl, setPhotourl] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        // console.log(user);
        if (authUser.displayName) {
          dispatch({
            type: actionTypes.SET_USER,
            user: authUser,
          });
        } else {
          return authUser.updateProfile({
            displayName: username,
            photoURL: photourl,
          });
        }
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: user.email,
        });
        // console.log(user);
        // console.log(authUser.email);
        return authUser.user.updateProfile({
          displayName: username,
          photoURL: photourl,
        });
      })
      .catch((error) => alert(error.message));

    const uploadTask = storage.ref(`images/${file.name}`).put(file);

    uploadTask.on("state_changed", (authUser) => {
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setPhotourl(url);
        });
    });
  };

  const login = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then((authUser) => {
      dispatch({
        type: actionTypes.SET_USER,
        user: user.email,
      });
      // console.log(user.email);
    });
    // .catch((error) => alert(error.message));
  };

  const openSignup = (e) => {
    setDisplayLogin(false);
    setDisplaySignup(true);
  };
  const openLogin = (e) => {
    setDisplaySignup(false);
    setDisplayLogin(true);
  };

  // dp upload

  const handleUploadDp = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  //

  return (
    <div className="login">
      <div className="loginpart">
        {displayLogin && (
          <form>
            <center>
              <img
                className="login__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1024px-Instagram_logo.svg.png"
                alt="instagram logo"
              />
              <TextField
                type="text"
                className="in"
                label="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
              />
              <TextField
                className="in"
                label="password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="small"
              />
              <Button
                type="submit"
                variant="contained"
                className="signup__button"
                onClick={login}
              >
                Login
              </Button>
            </center>
          </form>
        )}
        {displaySignup && (
          <form className="app__signup">
            <center>
              <img
                className="login__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1024px-Instagram_logo.svg.png"
                alt="instagram logo"
              />
              <div className="profile__pic__upload">
                <p className="upload__text">Upload Profile picture</p>
                <input
                  type="file"
                  name="Upload"
                  className="upload__dp"
                  onChange={handleUploadDp}
                />
              </div>

              <TextField
                type="text"
                className="in"
                label="username"
                variant="outlined"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                size="small"
              />
              <TextField
                type="email"
                className="in"
                label="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
              />
              <TextField
                className="in"
                label="password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="small"
              />
              <Button
                type="submit"
                variant="contained"
                className="signup__button"
                onClick={signUp}
              >
                Sign Up
              </Button>
            </center>
          </form>
        )}
      </div>
      {displayLogin && (
        <div className="create__account">
          <p>
            Don't have an account?{" "}
            <span onClick={openSignup} className="signup__link">
              Sign up
            </span>
          </p>
        </div>
      )}
      {displaySignup && (
        <div className="login__account">
          <p>
            Have an account?{" "}
            <span onClick={openLogin} className="signup__link">
              Log in
            </span>
          </p>
        </div>
      )}
      <div className="footer">
        <p>Get the app.</p>
        <div className="app__link">
          <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo">
            <img
              className="insta__link"
              src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
              alt=""
            />
          </a>

          <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb&utm_campaign=loginPage&ig_mid=E0FEBBE1-8E0A-408E-86AD-10E6D1D4F5DE&utm_content=lo&utm_medium=badge">
            <img
              className="insta__link"
              src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
              alt="Google Play"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
