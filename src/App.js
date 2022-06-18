import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import GradAppBar from "./components/GradAppBar";

//Import pages
import ActivityPage from "./pages/ActivityPage";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <BrowserRouter>
      <GradAppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/activity" element={<ActivityPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
