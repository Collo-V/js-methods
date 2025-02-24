export const cleanLink = (link:string):string=>{
    return link.replace(/[ +^=%#@!.,]/g,'-').toLowerCase()
}