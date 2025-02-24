/**
 * A function that mimics how async function works
 * @param delay
 * @param data
 * @param reject
 */
export const sampleAsyncFunction = (delay?:number,data?:unknown,reject?:boolean) => {
    return new Promise((resolve,rejectPromise) => setTimeout(()=>{
        if(reject){
            rejectPromise(data)
        }else {
            resolve(data)
        }
    }, delay||2000));
}