export const roundNumber = (number:number,decimalPlaces:number): number => {
    if(decimalPlaces === 0){
        return Math.round(number);
    }
    const multiplier:number = 10**decimalPlaces;
    return Math.round(number*multiplier)/multiplier
}