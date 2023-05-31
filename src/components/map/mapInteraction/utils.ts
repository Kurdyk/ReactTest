export const parsePosition = (input:string) => {
    
    return input.split(",").map((coordinate) => {return Number.parseFloat(coordinate)}); 
    
}