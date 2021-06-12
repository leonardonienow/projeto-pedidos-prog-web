import React, { createContext, useState, useCallback } from 'react';

export const UserContext = createContext();

export default ({ children }) =>
{
    const prevAuth = window.localStorage.getItem('authenticated');
    const [authenticated, setAuthenticated] = useState(prevAuth);
    const [headerText, setHeaderText] = useState('');
 

    const setUserAuthenticated = useCallback(() =>
    {
        window.localStorage.setItem('authenticated', true);
        setAuthenticated(true);
    }, []);

    const removeUserAuthenticated = useCallback(() =>
    {
        window.localStorage.removeItem('authenticated');
        setAuthenticated(null);
    }, []);

    const defaultValues = {
        authenticated,
        setUserAuthenticated,
        removeUserAuthenticated,
        headerText,
        setHeaderText,
    };

    return (
        <UserContext.Provider value={defaultValues}>
            {children}
        </UserContext.Provider>
    );
};
