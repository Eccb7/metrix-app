import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './components/home/Home';
import DetailsPage from './components/details/Details';
import NavBar from './components/navbar/NavBar';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:gameId" element={<DetailsPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
