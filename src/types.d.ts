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