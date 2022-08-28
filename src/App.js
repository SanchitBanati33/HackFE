import "./App.css";
import LeaderBoard from "./components/LeaderBoard";
// import Mint, { Navbar } from "./components/MintPage";
import Mint from "./components/MintPage/Mint";
import Popups from "./components/Popup";
import Popup from "./components/Popup";

function App() {
  return (
    <div className="App">
      {/* <Mint></Mint> */}
      <LeaderBoard />
    </div>
  );
}

export default App;
