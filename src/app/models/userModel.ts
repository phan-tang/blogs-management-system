export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
}

export interface UserInformation {
    id: number;
    name: string;
    username: string;
    email: string;
    address: string;
    phone: string;
    website: string;
    company: string
}

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    }
}