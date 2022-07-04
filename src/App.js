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

function App() {
  return (
    <BrowserRouter>
      <GradAppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/guests" element={<GuestsPage />} />
        <Route path="/music" element={<MusicControl />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
