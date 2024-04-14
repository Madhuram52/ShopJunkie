import React, { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    shopId:null,
    token:null,
    login: () => { },
    logout: () => { }
}
);