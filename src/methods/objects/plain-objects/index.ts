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
/* 
*Trims whitespace from all string values in an object and removes undefined values.
*/
export const cleanObject = <T extends AnyObject>(object: T): T =>{
    const cleaned: Partial<T> = {}
    //@ts-expect-error ignore
    Object.entries(object).forEach(([key, value]) => {
        if(value === undefined)return;
        if(typeof value === "string")value =  value.trim()
        cleaned[key as keyof T] = value;
      });
    return cleaned as T;
};

/* 
*Filters out fields not included in a given array of field names.
*/
export const filterObjectFields = <T extends AnyObject>(object: T, fields: (keyof T)[]): T =>{
    //@ts-expect-error ignore
    return Object.entries(object).reduce((acc, [key, value]) => {
        if (!fields.includes(key)) return acc;
        acc[key as keyof T] = value;
        return acc;
      }, {} as T);
};
/* 
*Deletes fields in the given array from an object.
*/
export const deleteObjectFields = <T extends AnyObject>(object: T, fields: (keyof T)[]): T =>{
    //@ts-expect-error ignore
    return Object.entries(object).reduce((acc, [key, value]) => {
        if (!fields.includes(key)) {
            acc[key as keyof T] = value;
        }
        return acc;
      }, {} as T)
};