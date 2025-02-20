import client from "./client";

export const getProductions = async () => {
    const response = await client.get('/productions');
    return response.data;
};


export const getProductionById = async (id: string) => {
    const response = await client.get(`/productions/${id}`);
    return response.data;
};

export const createProduction = async (production: any) => {
    const response = await client.post('/productions', production);
    return response.data;
};


export const updateProduction = async (id: string, production: any) => {
    const response = await client.put(`/productions/${id}`, production);
    return response.data;
};  

export const deleteProduction = async (id: string) => {
    const response = await client.delete(`/productions/${id}`);
    return response.data;
};





