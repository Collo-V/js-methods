import {AnyObject} from "@/types";

export * from './getObjectDifferences'
export * from './insertKey'

export function isPlainObject(obj:AnyObject) {
    return obj?.constructor === Object;
}

/* 
*Trims whitespace from all string values in an object.
*/
export const trimObjectStrings = <T extends AnyObject>(object: T): T =>{
    //@ts-expect-error ignore
    return Object.entries(object).reduce((acc, [key, value]) => {
        acc[key as keyof T] = typeof value === "string" ? value.trim() : value;
        return acc;
      }, {} as T);
};