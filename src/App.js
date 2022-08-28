import { Route } from "react-router-dom";
import "./App.css";
import LeaderBoard from "./components/LeaderBoard";
// import Mint, { Navbar } from "./components/MintPage";
import Mint from "./components/MintPage/Mint";
import Popups from "./components/Popup";
import Popup from "./components/Popup";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <Router>
        <Mint></Mint>
        <Routes>
          <Route exact path="/profile/:wallet">
            <Profile />
          </Route>
          <Route exact path="/lb">
            <LeaderBoard />
          </Route>
        </Routes>
      </Router>

      {/* <Mint></Mint> */}
      {/* <LeaderBoard /> */}
      {/* <Profile /> */}
    </div>
  );
}

export default App;
