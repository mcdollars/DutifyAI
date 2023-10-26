import { makeAutoObservable } from 'mobx';
import {createContext} from "react";

class AuthStore {
    token: string | null = localStorage.getItem('authToken');

    constructor() {
        makeAutoObservable(this);
    }

    setToken(token: string) {
        this.token = token;
    }

    removeToken() {
        this.token = null;
    }
}

const AuthContext = createContext(new AuthStore());
AuthContext.displayName = "AuthContext";
export default AuthContext;