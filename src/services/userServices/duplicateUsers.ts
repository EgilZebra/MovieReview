import { users } from '../../models/models';

export const duplicateUsers =  async ( username: string ) => {
    const myUser = await users.findOne({ username: username }).exec();
    if (!myUser || myUser === undefined) {
        return (false)
    }
    return (true)
}