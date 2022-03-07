import React, { useContext, useState } from "react";
import AlertContext from "../../context/alert/AlertContext";
import { searchUsers } from "../../context/github/GithubAction";
import GithubContext from "../../context/github/GithubContext";

const UserSearch = () => {
  const [text, setText] = useState("");
  const { users, loading, dispatch } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const submit = async (e) => {
    e.preventDefault();

    if (text === "") {
      setAlert("Please enter something", "error");
    } else {
      // set loading
      dispatch({ type: "SET_LOADING" });
      // search
      const users = await searchUsers(text);
      dispatch({ type: "GET_USERS", payload: users });
      //clear input
      setText("");
    }
  };

  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };
  return (
    <div>
      <form onSubmit={submit}>
        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text">Search for Githubers</span>
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search"
              className="w-full input input-primary input-bordered"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="btn btn-primary">go</button>
          </div>
        </div>
      </form>
      {users.length > 0 && (
        <div className="">
          <button className="btn btn-primary" onClick={() => clearUsers()}>
            clear
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
