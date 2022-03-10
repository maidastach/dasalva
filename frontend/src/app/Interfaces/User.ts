export interface Shipping {
    _id: string;
    addressA: string;
    addressB: string;
    city: string;
    postalCode: string;
    state: string;
    isSelected: boolean;  
}

export interface User {
    _id: string;
    fname: string;
    lname: string;
    email: string;
    telephone: string;
    password: string;
    shipping: Shipping[];
    isAddingAddress: boolean;
    isPickingUp: boolean;
    resetLink?: string;
    stripeId?: string;
    isAdmin: boolean;
    isVerified: boolean;
    verificationLink?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SignIn {
    email: string;
    password: string;
}

export interface Register {
    fname: string;
    lname: string;
    email: string;
    telephone: string;
    password: string;
}

export interface Profile {
    fname: string;
    lname: string;
    email: string;
    telephone: string;
    oldPassword: string;
    newPassword?: string;
    repassword?: string;
}