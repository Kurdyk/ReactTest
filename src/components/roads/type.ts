export type Road = {
    roadId:number,
    street:string,
    postalCode: number,
    city: string,
    sensorsIdList: number[], 
};

export type DispayableRoad = {
    road:string,
    sensor:string,
    wear:number,
    usage: number,
    id:number,
}