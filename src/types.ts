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
    password: string;
}

export type Production = {
    id: string;
    title: string;
    description: string;
    price: number;
}

export type Order = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    totalPrice: number;
    productions: Production[];
}

export type Permission = {
    id: string;
    name: string;
}
