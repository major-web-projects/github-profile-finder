import React from "react";
import UserResults from "../components/users/UserResults";
import UserSearch from "../components/users/UserSearch";

const HomePage = () => {
  return (
    <div>
      <UserSearch />
      <UserResults />
    </div>
  );
};

export default HomePage;
