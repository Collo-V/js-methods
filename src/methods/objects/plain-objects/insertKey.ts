import {AnyObject} from "@/types";

export function insertKey(data:AnyObject,keyName:string){
    data = {...data}
    const tempData:AnyObject = {}
    Object.keys(data).forEach((key:string)=>{
        const keyData:AnyObject = data[key as keyof AnyObject]
        keyData[keyName as keyof AnyObject]  = key
        tempData[key as keyof AnyObject] = keyData
    })
    return tempData

}