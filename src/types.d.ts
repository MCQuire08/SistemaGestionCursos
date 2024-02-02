export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy'
export type Visibility = 'great' | 'good' | 'ok' | 'poor'

export interface DiaryEntry{
    id: number,
    date: string,
    weather: Weather,
    visibility: Visibility,
    comment: string;
}

//export type NonSensitiveInfoDiaryEntry = Pick<DiaryEntry, 'id' | 'date' | 'visibility' | 'weather'>

export type NonSensitiveInfoDiaryEntry = Omit<DiaryEntry, 'comment'>

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>

//--------------------------------------

export interface User{
    idUser:number,
    name:string,
    lastname:string,
    username:string,
    password:string,
    role:string,
    startDate:string,
    status:string
}

export interface Category{
    idCategory:number,
    name:string
}

export interface Course{
    idCourse:number,
    name:string,
    description:string,
    duration:number
}

export interface Evidence{
    idEvidence:number,
    link:string
}

export interface Link{
    idLink:number,
    description:string
}

export interface Plan{
    idPlan:number,
    idUser:number,
    idCourse:number,
    progress:number
}

