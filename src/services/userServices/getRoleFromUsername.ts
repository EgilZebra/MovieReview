import { users } from "../../models/models";
import { User } from "../../models/types/types";

export const getRoleFromUsername = async ( username: string ) => {
    try {
        const result: User | null = await users.findOne({ username: username }).exec();
        if (result !== null) {
            return result.role
        } else {
            return "user"
        }
        
    } catch (error) {
        console.log(error);
    }
}