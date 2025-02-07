export function stringSplitter(string:string,length:number):string {
    if(string.length<=length)return string
    return `${string.slice(0, length)}...`
}

export function extractTextFromHTML(htmlString:string):string{
    if(!htmlString)return htmlString
    return htmlString.replace(/<[^>]+>/g, '')
}