export interface ProductType {
    id: number;
    title: string;
    description: string;
    price: string;
    type: string;
    productImg: string;
}

export interface UserType {
    id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    profileImg: string,
    address: string,
}

export interface UserRegisType extends Partial<UserType> {
    confirmPassword?: string;
}

export interface ProductCreType extends Partial<ProductType> { }