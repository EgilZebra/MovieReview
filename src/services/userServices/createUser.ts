import { users } from "../../models/models"

export const createUser = async ( username: string, email: string, password: string, role: string ) => {

    await users.create({
        username: username,
        email: email,
        password: password,
        role: role
    })

    return (true)
}