import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './output.css';

import Signup from './components/user/Signup';
import Nav from './components/nav/Nav';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import User from './components/user/User';
import UserInfo from './components/user/UserInfo';
import Footer from './components/footer/Footer';
import RequestForm from './components/request_form/RequestForm';
import RequestsMap from './components/requests_map/RequestsMap';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import MainChatWindow from './components/messages/MainChatWindow';

function App() {
    const [currUser, setCurrUser] = useState(null);
    const [setShow] = useState(false);

    return (
        <div className="App">
            <div className="bg-light">
                <Router>
                    <Nav
                        currUser={currUser}
                        setCurrUser={setCurrUser}
                        setShow={setShow}
                    />
                    <User currUser={currUser} setCurrUser={setCurrUser} />
                    <div className="container mx-auto">
                        <Routes>
                            <Route
                                path="/home"
                                element={<RequestsMap currUser={currUser} />}
                            />
                            <Route
                                path="/signup"
                                element={
                                    <Signup
                                        setCurrUser={setCurrUser}
                                        setShow={setShow}
                                    />
                                }
                            />
                            <Route
                                path="/about"
                                element={
                                    <About
                                        setCurrUser={setCurrUser}
                                        setShow={setShow}
                                    />
                                }
                            ></Route>
                            <Route
                                path="/contact"
                                element={
                                    <Contact
                                        setCurrUser={setCurrUser}
                                        setShow={setShow}
                                    />
                                }
                            ></Route>
                            <Route
                                path="/profile"
                                element={
                                    <UserInfo
                                        currUser={currUser}
                                        setCurrUser={setCurrUser}
                                    />
                                }
                            ></Route>
                            <Route
                                path="/request"
                                element={<RequestForm currUser={currUser} />}
                            />
                            <Route
                                path="/messages"
                                element={<MainChatWindow currUser={currUser} />}
                            />
                        </Routes>
                    </div>
                    <Footer />
                </Router>
            </div>
        </div>
    );
}

export default App;
