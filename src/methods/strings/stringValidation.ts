export function isLetter(str:string):boolean {
    str = str.toLowerCase();
    return !!(str.length === 1 && str.match(/[a-z]/i))
}