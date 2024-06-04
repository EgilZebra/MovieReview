import { movies } from "../../models/models"

export const checkTitle = async ( title: string) => {

    try {
        const myUser = await movies.findOne({ title: title }).exec();
        if (!myUser || myUser === undefined) {
            return (false)
        } else {
            return (true)
        }
    } catch (error) {
        console.log(error)
    }
    

}