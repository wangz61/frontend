import client from "./client";

export const getUsers = async () => {
    const response = await client.get('/users');
    return response.data;
};


export const getUserById = async (id: string) => {
    const response = await client.get(`/users/${id}`);
    return response.data;
};

export const createUser = async (user: any) => {
    const response = await client.post('/users', user);
    return response.data;
};


export const updateUser = async (id: string, user: any) => {
    const response = await client.put(`/users/${id}`, user);
    return response.data;
};  

export const deleteUser = async (id: string) => {
    const response = await client.delete(`/users/${id}`);
    return response.data;
};


export const login = async (email: string, password: string) => {
    const response = await client.post('/auth/login', { email: email, password: password });
    return response.data;
};


