import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Index from './pages/index';
import Main from './pages/main';
import './styles.css';
import Swal from "sweetalert2";
import { AjaxManager } from "./ajaxManager";

export default function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");

    return (
        <Router>
            <Routes>
                <Route exact path="/index" element={<Index signup={signup} login={login} emailChange={emailChange} passwordChange={passwordChange}/>} />
                <Route exact path="/main" element={
                    <RequireAuth token={token}>
                        <Main token={token}/>
                    </RequireAuth>
                } />
            </Routes>
        </Router>
    );

    function RequireAuth(props) {
        if (!props.token) {
          Swal.fire({
            icon: 'error',
            title: 'Ошибка',
            text: 'Вы не авторизованы',
          })
          return <Navigate to="/index" />;
        }
      
        return props.children;
      }

    function signup() {
        AjaxManager.signup({email: email, password: password});
    }

    function login() {
        AjaxManager.login({email: email, password: password, setToken: setToken});
    }

    function emailChange(e) {
        setEmail(e.target.value);
    }

    function passwordChange(e) {
        setPassword(e.target.value);
    }
  }