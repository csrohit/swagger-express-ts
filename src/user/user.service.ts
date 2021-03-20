import { IUser } from "./user.model";

export class UserService {
    public get(id: number, name?: string) {
        return {
            name: name ?? 'Rohit Nimkar',
            id,
            status: 'Happy',
            phoneNumbers: []
        }
    }
    public create(userCreationParams: UserCreationParams){
        return{
            id: 12,
            ...userCreationParams
        }
    }
}

export type UserCreationParams = Pick<IUser, "email" | "name" | "phoneNumbers">;