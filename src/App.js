import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
        <Routes>
          <Route
            exact
            path="/profile/:wallet"
            element={
              <>
                <Profile></Profile>
              </>
            }
          />

          <Route
            exact
            path="/"
            element={
              <>
                <Mint />
              </>
            }
          />

          <Route
            exact
            path="/lb"
            element={
              <>
                <LeaderBoard />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
