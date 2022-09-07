
export interface Iinfo{
    id: string,
    title: string,
    username: string
}


export interface Iproductlist{
    _id: string
    imgUrl:string
    gallery: string[]
    title:string
    description:string,
    price:number,
    createTime:string,
    categoryName:string,
    hotScore:number,
    keyword:string[],
    username:string,
    __v:number
}
export interface Iuserlist{
    _id:string,
    username:string,
    password:"******"
    studentnumber:"******"
    place:string,
    phone:"******"
    admin:boolean
}
export type IwantId = string[]