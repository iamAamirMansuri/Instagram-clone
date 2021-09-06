import React, { useEffect } from "react";

import Posts from "../components/Posts";
import "./Home.css";

function Home() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="home__page">
      <Posts />
    </div>
  );
}

export default Home;
