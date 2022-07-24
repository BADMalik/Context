import { createContext } from "react";
import React, { useState } from "react";

const defaultFormState = {
  firstName: "",
  lastName: "",
  location: "",
  education: [],
};
//create context
const UserContext = createContext(defaultFormState);

//set context provider
const UserContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(defaultFormState);
  return (
    <UserContext.Provider value={[userDetails, setUserDetails]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
