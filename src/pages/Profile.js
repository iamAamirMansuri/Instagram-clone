import React from "react";
import "./Profile.css";
import Avatar from "@material-ui/core/Avatar";
import GridOnOutlinedIcon from "@material-ui/icons/GridOnOutlined";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Profile__photos from "../components/Profile__photos";
import { useStateValue } from "../StateProvider";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function Profile() {
  const [{ user }, dispatch] = useStateValue();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="profile">
      <div className="profile__details">
        <Avatar className="profile__details__pic" src={user.photoURL} />
        <div className="profile__detail">
          <h1 className="profile__username">{user.displayName}</h1>
          <p className="profile__email">{user.email}</p>
        </div>
      </div>
      <div className="photo__section">
        <div className="photo__section__top">
          <GridOnOutlinedIcon className="photos__logo" />
          <p>Photos</p>
        </div>
        {/* <div className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab icon={<GridOnOutlinedIcon />} className="profile__tab" />
            <Tab
              icon={<BookmarkBorderOutlinedIcon />}
              className="profile__tab"
            />
          </Tabs>
        </div>
      </div> */}
        <Profile__photos />
      </div>
    </div>
  );
}

export default Profile;
