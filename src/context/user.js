import React, { createContext, useState, useCallback } from 'react';

export const UserContext = createContext();

export default ({ children }) =>
{
    const prevAuth = window.localStorage.getItem('authenticated');
    const prevUser = window.localStorage.getItem('user');
    const [authenticated, setAuthenticated] = useState(prevAuth);
    const [user, setUser] = useState(prevUser);
    const [headerText, setHeaderText] = useState('');
 

    const setUserAuthenticated = useCallback((user) =>
    {
        window.localStorage.setItem('authenticated', true);
        window.localStorage.setItem('user', user.usu_cpf);
        setAuthenticated(true);
        setUser(user.usu_cpf);

    }, []);

    const removeUserAuthenticated = useCallback(() =>
    {
        window.localStorage.removeItem('authenticated');
        window.localStorage.removeItem('user');
        setAuthenticated(null);
        setUser(null);
    }, []);

    const defaultValues = {
        authenticated,
        setUserAuthenticated,
        removeUserAuthenticated,
        headerText,
        setHeaderText,
        user,
        setUser,
    };

    return (
        <UserContext.Provider value={defaultValues}>
            {children}
        </UserContext.Provider>
    );
};
