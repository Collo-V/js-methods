import {AnyObject} from "@/types";
import {insertKey} from "./plain-objects/insertKey";

export function sortData(data:AnyObject| AnyObject[],sortField:string,direction='asc'){
    let isObject
    if(!data.slice){
        isObject = true
        data = Object.values(insertKey(data,'sortCustomKey'))
    }
    const tempData = [...data as AnyObject[]]
    for (let i = 0; i < tempData.length; i++) {
        const item = (tempData as AnyObject)[i]
        let leftMost = item[sortField]
        let index = i
        for (let j = i+1; j < tempData.length-i ; j++) {
            const changeLeftMost = (direction === 'asc' && tempData[j][sortField] < leftMost)
                ||(direction === 'desc' && tempData[j][sortField] > leftMost)
            if(changeLeftMost){
                leftMost = tempData[j][sortField]
                index = j
            }
        }
        tempData[i] = tempData[index]
        tempData[index] = item
    }
    data = tempData
    if(isObject){
        const tempObject:AnyObject = {}
        tempData.forEach((item:any)=>{
            const key:string =  item['sortCustomKey']
            delete item['sortCustomKey']
            tempObject[key] = item
        })
        data = tempObject
    }
    return data

}