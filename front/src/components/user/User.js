import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';
import UpdateUser from './UpdateUser';
import PrivateText from '../map/PrivateText';
import { useState } from 'react';
const User = ({ currUser, setCurrUser }) => {
    const [show, setShow] = useState(true);
    if (currUser)
        return (
            <div>
                Hello {currUser.email} {currUser.first_name}{' '}
                {currUser.last_name}
                <PrivateText currUser={currUser} />
                <UpdateUser currUser={currUser} />
                <Logout setCurrUser={setCurrUser} />
            </div>
        );
    return (
        <div>
            {show ? (
                <Login setCurrUser={setCurrUser} setShow={setShow} />
            ) : (
                <Signup setCurrUser={setCurrUser} setShow={setShow} />
            )}
        </div>
    );
};
export default User;
