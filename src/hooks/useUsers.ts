import client from "../api/client";
import { useState } from "react";
import { login as loginApi } from "../api/users.api";
import { loginUser, logoutUser, UserState } from "../slices/users";
import { useAppDispatch } from "./useAppDispatch";

const useUsers = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const setUserData = (user: UserState) => {
        localStorage.setItem('user', JSON.stringify(user));
        client.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        dispatch(loginUser(user));
    }

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        const response = await loginApi(email, password);
        const userData: UserState = {
            id: response.userId,
            name: response.name,
            email: response.email,
            token: response.token
        }
        setUserData(userData)
        setIsLoading(false)
    }

    const logout = () => {
        localStorage.removeItem('user');
        dispatch(logoutUser());
    }

    return {
        isLoading,
        login,
        logout,
        setUserData
    }
};

export default useUsers;

