import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import GradAppBar from "./components/GradAppBar";

//Import pages
import ActivityPage from "./pages/ActivityPage";
import HomePage from "./pages/HomePage";
import GuestsPage from "./pages/GuestsPage";
import MusicControl from "./pages/MusicControl";
import TokenProcessor from "./pages/TokenProcessor";
import GuestWiFiPage from "./pages/GuestWiFiPage";
function App() {
  return (
    <BrowserRouter>
      <GradAppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/404" element={<HomePage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/guests" element={<GuestsPage />} />
        <Route path="/music" element={<MusicControl />} />
        <Route path="/wifi" element={<GuestWiFiPage />} />
        <Route path="/:token" element={<TokenProcessor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
