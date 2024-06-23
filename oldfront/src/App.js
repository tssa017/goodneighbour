import './output.css';
// import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {
    // AuthContext,
    AuthProvider,
} from './components/auth_context/AuthContext';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';

import Profile from './components/profile/Profile';
import Home from './components/home/Home';
import RequestForm from './components/request_form/RequestForm';
import RequestDetails from './components/requestdetails/RequestDetails';
import Messages from './components/messages/Messages';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/request/new" element={<RequestForm />} />
                    <Route path="/request/:id" element={<RequestDetails />} />
                    <Route
                        path="/request/:requestId/messages"
                        element={<Messages />}
                    />
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
};

export default App;
