import {isLetter} from "./stringValidation";

export function priceFormatter(price: number|string): string {
    if(!price)return ''
    price = parseFloat(price.toString())
    if(price<1000) return price.toString()
    const integer = Math.trunc(price)
    const decimal = price - integer
    let formattedString = integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const priceString = price.toString()
    let indexOfPoint = priceString.indexOf('.')
    if(indexOfPoint !== -1){
        const decimalPart = priceString.slice(indexOfPoint+1)
        formattedString += `.${decimalPart}`
    }
    return formattedString

}

export function capitalizeString(str:string): string {
    if(!str)return str
    return str.split(' ').filter(p=>p).map(part=>part.replace(part[0],part[0].toUpperCase())).join(' ')
}
export const formatPascalString = (string:string) => {
    let temp = ''
    for (let i = 0; i < string.length; i++) {
        let character = string.charAt(i);
        if(isLetter(character) && character === character.toUpperCase()) {
            temp += ` ${character}`;
        }
        else {
            temp+=character
        }
    }
    return temp
}
export const makeStringReadable = (string:string) => {
    string = string.replace(/([-_])/g,'')
    return formatPascalString(string)
}