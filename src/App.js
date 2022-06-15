import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import GradAppBar from "./components/GradAppBar";
import ActivityPage from "./pages/ActivityPage";
function App() {
  return (
    <BrowserRouter>
      <GradAppBar />
      <Routes>
        <Route path="/" element={<div>Hello world!</div>} />
        <Route path="/activity" element={<ActivityPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
