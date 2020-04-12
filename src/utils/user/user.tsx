import React, { useContext, useState } from 'react';



let userObject = {
  name: "Cody Jones",
  handle: "mager1794"
}

export type UserDataTypes = {
  name?: string,
  location? : string,
  bio?: string,
  following?: string,
  followers?: string,
  tickers?: string,
  profileUrl?: string
    }


export type UserProviderTypes = {
  user?: any,
  setUser?: any
    }

const UserContext = React.createContext({} as UserProviderTypes);


export const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState(userObject);

	
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};


export function withUser(Component) {
  return (props)  => {
    const { user, setUser } = useContext(UserContext);

    return (
      <Component
        {...props}
        User={user}
        setUser={setUser}
      />
    );
  };
}
