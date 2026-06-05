export function isLetter(str:string):boolean {
    return typeof str === 'string' && str.length === 1 && /^[a-z]$/i.test(str);
} 