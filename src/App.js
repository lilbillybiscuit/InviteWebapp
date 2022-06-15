import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import GradAppBar from "./components/GradAppBar";
function App() {
  return (
    <BrowserRouter>
      <GradAppBar />
      <Routes>
        <Route path="/" element={<div>Hello world!</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
