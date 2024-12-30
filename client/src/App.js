import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Index from './pages/index';
import Main from './pages/main';
import './styles.css';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/index" element={<Index />} />
                <Route exact path="/main" element={<Main />} />
            </Routes>
        </Router>
    );
  }