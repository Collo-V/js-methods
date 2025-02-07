export const arrayToTuple  = (array:any[])=>{
    const temp:any[] = []
    array.forEach(item=>{
        if(!temp.includes(item)){
            temp.push(item)
        }
    })
    return temp
}