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
      <Mint></Mint>
      {/* <LeaderBoard /> */}
      {/* <Profile /> */}
    </div>
  );
}

export default App;
