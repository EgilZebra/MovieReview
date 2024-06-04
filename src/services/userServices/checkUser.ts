import { users } from "../../models/models"

export const checkUser = async ( username: string) => {

    const myUser = await users.findOne({ username: username }).exec();
    if (!myUser || myUser === undefined) {
       return (false)
    } else {
        return (true)
    }

}