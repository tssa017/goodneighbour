import { Link } from 'react-router-dom';

const Nav = ({ setCurrUser, setShow }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrUser(null);
    setShow(false);
  };

  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">AppName</div>
        <div className="space-x-4">
          <Link to="/home" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link to="/profile" className="text-white hover:text-gray-200">
            Profile
          </Link>
          <Link to="/request/new" className="text-white hover:text-gray-200">
            Request
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
