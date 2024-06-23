import { useState } from 'react';
import './App.css';
import User from './components/user/User';

function App() {
    const [currUser, setCurrUser] = useState(null);
    return (
        <div className="App">
            <User currUser={currUser} setCurrUser={setCurrUser} />
        </div>
    );
}

export default App;
