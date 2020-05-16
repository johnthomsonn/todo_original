import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import MainRouter from "./components/core/MainRouter"
import NavBar from './components/main//NavBar/NavBar'

function App() {
  return (
    <div>
    <BrowserRouter>
    <NavBar />
      <MainRouter />
    </BrowserRouter>
    </div>
  );
}

export default App;
