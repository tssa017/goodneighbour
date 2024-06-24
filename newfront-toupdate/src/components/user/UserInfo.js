import { useRef, useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const UserInfo = ({ currUser, setCurrUser, setShow }) => {
  const formRef = useRef();
  const [user, setUser] = useState(currUser);

  useEffect(() => {
    setUser(currUser);
  }, [currUser]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-center text-gray-700">
          User Information
        </h2>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium">First Name:</label>
          <p className="text-gray-800">{user.first_name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium">Last Name:</label>
          <p className="text-gray-800">{user.last_name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium">Email:</label>
          <p className="text-gray-800">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium">ID Photo:</label>
          {user.id_photo ? (
            <img
              src={user.id_photo}
              alt="User ID"
              className="w-full h-auto rounded-md shadow-sm"
            />
          ) : (
            <p className="text-gray-800">No photo available</p>
          )}
        </div>

        <Link to="/profile/update" className=" hover:text-gray-200">
            Update infos
        </Link>
      </div>

    </div>
  );
};

export default UserInfo;
