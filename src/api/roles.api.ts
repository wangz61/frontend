import client from "./client";

export const getRoles = async () => {
    const response = await client.get('/roles');
    return response.data;
};


export const getRoleById = async (id: string) => {
    const response = await client.get(`/roles/${id}`);
    return response.data;
};

export const createRole = async (role: any) => {
    const response = await client.post('/roles', role);
    return response.data;
};


export const updateRole = async (id: string, role: any) => {
    const response = await client.put(`/roles/${id}`, role);
    return response.data;
};  

export const deleteRole = async (id: string) => {
    const response = await client.delete(`/roles/${id}`);
    return response.data;
};





