import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Signup from './components/user/Signup';
import Nav from './components/nav/Nav';
import './output.css';
import User from './components/user/User';
import UpdateUser from './components/user/UpdateUser';
import UserInfo from './components/user/UserInfo';
import Footer from './components/footer/Footer';
import RequestForm from './components/request_form/RequestForm';
import RequestsMap from './components/requests_map/RequestsMap';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
function App() {
    const [currUser, setCurrUser] = useState(null);
    const [show, setShow] = useState(false);

    return (
        <div className="App">
            <div className="">
                <Router>
                    <Nav setCurrUser={setCurrUser} setShow={setShow} />
                    <div className="container mx-auto p-4">
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
                                path="/profile"
                                element={
                                    <UserInfo
                                        currUser={currUser}
                                        setCurrUser={setCurrUser}
                                    />
                                }
                            >
                                {/* <Profile currUser={currUser} setCurrUser={setCurrUser} /> */}
                            </Route>
                            <Route
                                path="/profile/update"
                                element={
                                    <UpdateUser
                                        currUser={currUser}
                                        setCurrUser={setCurrUser}
                                    />
                                }
                            >
                                {/* <UpdateUser currUser={currUser} setCurrUser={setCurrUser} setShow={setShow} /> */}
                            </Route>
                            <Route
                                path="/request/new"
                                element={<RequestForm currUser={currUser} />}
                            />
                        </Routes>
                    </div>

                    <User currUser={currUser} setCurrUser={setCurrUser} />
                    <Footer />
                </Router>
            </div>
        </div>
    );
}

export default App;
