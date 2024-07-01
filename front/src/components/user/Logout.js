import axios from 'axios';

const Logout = ({ setCurrUser }) => {
    const logout = async (setCurrUser) => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_BACKEND_URL}/logout`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );
            // Clear token from local storage + set `currUser` status to `null`, immediately logging them out
            localStorage.removeItem('token');
            setCurrUser(null);
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        logout(setCurrUser);
    };
    return (
        <div>
            <input type="button" value="Logout" onClick={handleClick} />
        </div>
    );
};
export default Logout;
