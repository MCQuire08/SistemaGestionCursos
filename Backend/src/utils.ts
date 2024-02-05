import { NewDiaryEntry } from "./types";

const parseComment = (commentFromRequest: any): string => {
    if (!isString(commentFromRequest)){
        throw new Error('Incorrect or missing comment')
    }
    return commentFromRequest
}

const isString = (string: string):boolean => {
    return typeof string == 'string'
}

/*const isDate = (date:string): boolean => {
    return 
}*/

/*const toNewDiaryEntry = (object: any): NewDiaryEntry => {
    const newEntry : NewDiaryEntry = {
        comment: parseComment(object.comment)
    }

    return newEntry
}

export default toNewDiaryEntry*/