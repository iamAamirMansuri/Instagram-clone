import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
// import Liked from "./pages/Liked";
import { useStateValue } from "./StateProvider";
import { useEffect } from "react";

function App() {
  const [{ user }, dispatch] = useStateValue();
  // const user = "aamir";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <div className="app">
        {!user ? (
          <Login />
        ) : (
          <Switch>
            <Route path="/profile">
              <Header />
              <Profile />
            </Route>
            {/* <Route path="/likes">
              <Header />
              <Liked />
            </Route> */}
            <Route path="/">
              <Header />
              <Home />
            </Route>
          </Switch>
        )}
      </div>
    </Router>
  );
}

export default App;
