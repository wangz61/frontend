export type Role = {
    id: string;
    name: string;
    permissions: string[];
}


export type User = {
    id: string;
    name: string;
    email: string;
    roleId: string;
}

export type Production = {
    id: string;
    title: string;
    description: string;
    price: number;
}

export type Order = {
    id: string;
    userId: string;
    productionId: string;
    quantity: number;
    totalPrice: number;
}

export type Permission = {
    id: string;
    name: string;
}
