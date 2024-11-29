import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => { 

    const [user, setUser] = useState({
        email:'',
        fullName:{
            firstName:'',
            lastName:''
        }
    })

    

  const value = {
    user, setUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider