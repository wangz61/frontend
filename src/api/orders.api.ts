import client from "./client";

export const getOrders = async () => {
    const response = await client.get('/orders');
    return response.data;
};


export const getOrderById = async (id: string) => {
    const response = await client.get(`/orders/${id}`);
    return response.data;
};

export const createOrder = async (order: any) => {
    const response = await client.post('/orders', order);
    return response.data;
};


export const updateOrder = async (id: string, order: any) => {
    const response = await client.put(`/orders/${id}`, order);
    return response.data;
};  

export const deleteOrder = async (id: string) => {
    const response = await client.delete(`/orders/${id}`);
    return response.data;
};





