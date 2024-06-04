import { users } from "../../models/models"
import bcrypt from 'bcryptjs'

export const checkPassword = async ( username: string, password: string ) => {

    const myUser = await users.findOne({ username: username }).exec();
    if (myUser) {
        const match: boolean = await bcrypt.compare(password, myUser.password)
        return match
    } else {
        return (false)
    }

}