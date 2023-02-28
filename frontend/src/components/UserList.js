import React, { useState, useEffect } from "react";
import axios from "axios";
export const UserList = () => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    const resp = await axios.get("/getUsers");
    console.log(resp);
  
    // if No users are there please dont set the values
    if (resp.data.users.length >= 0) {
      const sortedUserData = resp.data.users.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      setUserData(sortedUserData);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userData]);

  // EDIT
  const handleEdit = async (user) => {
    const datee = new Date();
    const userName = prompt("Enter your new task");
    const userEmail = prompt("Enter Your new task description");

    if (!userName || !userEmail) {
      alert("Please Enter task name and description Both");
    } else {
      const resp = await axios.put(`/editUser/${user._id}`, {
        name: userName,
        email: userEmail,
        date: datee,
      });
      console.log(resp);
    }
  };

  // DELETE
  const handleDelete = async (userId) => {
    const resp = await axios.delete(`/deleteUser/${userId}`);
    console.log(resp);
  };
  
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-8">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            Todo List
          </h1>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Task
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Task Description
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Edit
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Delete
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Date Created/Modified
                </th>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData.map((user) => (
                  <tr>
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      <button
                        className="hover:text-white hover:bg-green-500 p-1 rounded border-2 border-green-500"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-4 py-3 text-lg text-gray-900">
                      <button
                        className="flex-no-shrink p-1 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-4 py-3">{user.date.slice(0, 19).replace('T', ' ')}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
