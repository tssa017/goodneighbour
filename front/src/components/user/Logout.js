import axios from 'axios';

const Logout = ({ setCurrUser }) => {
    const logout = async (setCurrUser) => {
        try {
            const response = await axios.delete(
                'http://localhost:3000/logout',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );
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
