import React, { createContext, useContext } from "react";

const UserListContext = createContext([]);

export const useUserList = () => useContext(UserListContext);

export const MemberProvider = ({ userList, children }) => {
  return (
    <UserListContext.Provider value={userList}>
      {children}
    </UserListContext.Provider>
  );
};
