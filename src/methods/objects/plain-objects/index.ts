import {AnyObject} from "@/types";

export * from './getObjectDifferences'
export * from './insertKey'

export function isPlainObject(obj:AnyObject) {
    return obj?.constructor === Object;
}