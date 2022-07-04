import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Switch,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import GradAppBar from "./components/GradAppBar";

//Import pages
import ActivityPage from "./pages/ActivityPage";
import HomePage from "./pages/HomePage";
import GuestsPage from "./pages/GuestsPage";
import MusicControl from "./pages/MusicControl";

import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

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
