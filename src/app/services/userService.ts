import { User, UserInformation } from "../models/userModel";

const url = '/api/admin/users';

export async function getUsers(): Promise<UserInformation[]> {
    const response = await fetch(url);
    let responseData: { data: User[] } = await response.json();
    return responseData.data.map((element => {
        return transformUserData(element);
    }));
}

function transformUserData(element: User): UserInformation {
    return {
        ...element, address: [element.address.suite, element.address.street, element.address.city].join(' '), company: element.company.name
    };
}