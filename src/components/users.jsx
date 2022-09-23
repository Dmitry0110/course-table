import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const titleText = () => {
    if (users.length === 0) return "Никто с тобой не тусанет";
    if (users.length === 1 || users.length > 4)
      return users.length + " человек тусанет с тобой сегодня";
    else return users.length + " человека тусанут с тобой сегодня";
  };
  const getTitleColor = () => {
    let classesColor = "badge m-2 ";
    classesColor += users.length === 0 ? "bg-danger" : "bg-primary";
    return classesColor;
  };

  const deleteName = (id) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== id));
  };
  const allUsers = () => {
    if (users.length !== 0)
      return (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился,раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Кнопка</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((qualitie) => (
                    <span
                      key={qualitie._id}
                      className={`badge m-2 bg-${qualitie.color}`}
                    >
                      {qualitie.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{`${user.rate}/5`}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm m-2"
                    onClick={() => deleteName(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
  };

  return (
    <>
      <h4>
        <span className={getTitleColor()}>{titleText()}</span>
      </h4>
      {allUsers()}
    </>
  );
};

export default Users;
