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
        if(typeof value === "object" && value !== null) {
            if (Array.isArray(value)) {
                acc[key as keyof T] = value.map((item) => trimObjectStrings(item)) as T[keyof T];
            }
            else {
                acc[key as keyof T] = trimObjectStrings(value) as T[keyof T];
            }   
        }
        else acc[key as keyof T] = typeof value === "string" ? value.trim() : value;
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
        if(typeof value === "object"){
            if (Array.isArray(value)) {
                cleaned[key as keyof T] = value.map((item) => cleanObject(item)) as T[keyof T];
            }
            else {
                cleaned[key as keyof T] = cleanObject(value) as T[keyof T];
            }
        }
        else if(typeof value === "string")value =  value.trim()
        cleaned[key as keyof T] = value;
      });
    return cleaned as T;
};

/* 
*Filters out fields not included in a given array of field names.
*/
export const filterObjectFields = <T extends AnyObject>(object: T, fields: (keyof T|string)[]): Partial<T> =>{
    return fields.reduce((acc, field) => {
        // Handle deep paths (e.g., 'user.name')
        if (typeof field === 'string' && field.includes('.')) {
          const keys = field.split('.');
          const firstKey = keys[0];
          const remainingPath = keys.slice(1).join('.');
    
          if (object && object[firstKey] && typeof object[firstKey] === 'object' && !Array.isArray(object[firstKey])) {
            // Initialize the nested object if it doesn't exist yet in the accumulator
            acc[firstKey] = acc[firstKey] || {} as T[keyof T];
            
            // Merge the existing accumulated nested properties with the new recursive results
            Object.assign(
              acc[firstKey], 
              filterObjectFields(object[firstKey], [remainingPath])
            );
          }
        } 
        // Handle shallow paths (e.g., 'id')
        else if (object && field in object) {
          acc[field ] = object[field]
        }
    
        return acc;
      }, {} as  Partial<T>)
};
/* 
*Deletes fields in the given array from an object.
*/
export const deleteObjectFields = <T extends AnyObject>(object: T, fields: string[]): Partial<T> => {
    // 1. Create a deep clone (or shallow clone depending on needs) to avoid mutating the original object
    const clone = JSON.parse(JSON.stringify(object));
  
    for (const path of fields) {
      const parts = path.split('.');
      let current = clone;
  
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
  
        // If we are at the last part of the path, delete the property
        if (i === parts.length - 1) {
          if (current && typeof current === 'object') {
            delete current[part];
          }
        } else {
          // Move deeper into the object
          current = current[part];
          // If the path doesn't exist in the object, break early
          if (current === undefined || current === null) {
            break;
          }
        }
      }
    }
  
    return clone;
  };