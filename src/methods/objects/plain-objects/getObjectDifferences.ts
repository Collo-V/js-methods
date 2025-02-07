import {AnyObject} from "@/types";

export const getObjectDifferences = (objectA:AnyObject,objectB:AnyObject):string[]=>{
    const keysA = Object.keys(objectA);
    const differences:string[] = []
    keysA.forEach(key => {
        if(objectA[key] !== objectB[key]){
            differences.push(key);
        }
    })
    differences.concat(Object.keys(objectB).filter(key=>!keysA.includes(key))).forEach(difference=>{});
    return differences;
}