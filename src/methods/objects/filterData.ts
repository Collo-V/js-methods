import {AnyObject} from "@/types";
import {insertKey} from "@/methods/objects/plain-objects/insertKey";

export const  filterData = (data:AnyObject|[],...paramsArrary:any[])=>{
    const types = ['string','number',null]
    let isObject
    if(!data?.length){
        isObject = true
        data = Object.values(insertKey(data,'filterCustoMWKey'))
    }
    let filteredData = data
    for(let i=0 ; i<paramsArrary.length ; i++){
        const params = paramsArrary[i]
        const field :string= params[0]
        const opStr:string = params[1]
        const value:any = params[2]
        const matchCase:boolean = !!params[3]
        const isMatchable = types.includes(typeof value)
        if(!opStr){
            filteredData = []
        }
        else if(opStr === '=='){
            if(!matchCase && isMatchable){
                filteredData = filteredData.filter((a:AnyObject) => {
                    return a[field] && a[field].toString().toLowerCase() === value.toString().toLowerCase()
                })

            }
            else {
                filteredData = filteredData.filter((a:AnyObject) => {
                    return a[field]  === value
                })

            }
        }else if(opStr === '!='){
            if(!matchCase && isMatchable){
                filteredData = filteredData.filter((a:AnyObject) => {
                    return a[field] && a[field].toString().toLowerCase() !== value.toString().toLowerCase()
                })
            }
            else {
                filteredData = filteredData.filter((a:AnyObject) => {
                    return a[field]  !== value
                })

            }

        }else if(opStr === 'includes'){
            if(!matchCase && isMatchable){
                filteredData = filteredData.filter((a:AnyObject) => {
                    return a[field] && a[field].toString().toLowerCase().includes(value.toString().toLowerCase())
                })
            }
            else {
                filteredData = filteredData.filter((a:AnyObject) => {
                    return a[field] && a[field].includes(value)
                })

            }

        }else if(opStr === '!includes'){
            if(!matchCase && isMatchable){
                filteredData = filteredData.filter((a:AnyObject) => {
                    return a[field] && !(a[field].toString().toLowerCase()).includes(value.toString().toLowerCase())
                })
            }
            else {
                filteredData = filteredData.filter((a:AnyObject) => {
                    return a[field] && !(a[field]).includes(value)
                })

            }

        }
        else if(opStr === 'array-contains'){
            if(!matchCase && isMatchable){
                filteredData = filteredData.filter((a:AnyObject) => {
                    if(!a[field])return false
                    const lowerCase = a[field].map((val:string)=>val.toLowerCase())
                    return lowerCase.includes(value)
                })
            }
            else {
                filteredData = filteredData.filter((a:AnyObject) => {
                    return a[field] && (a[field]).includes(value)
                })

            }

        }
        else if(opStr === 'array-not-contains'){
            if(!matchCase && isMatchable){
                filteredData = filteredData.filter((a:AnyObject) => {
                    if(!a[field])return false
                    const lowerCase = a[field].map((val:string)=>val.toLowerCase())
                    return !lowerCase.includes(value)
                })
            }
            else {
                filteredData = filteredData.filter((a:AnyObject) => {
                    return a[field] && !(a[field]).includes(value)
                })

            }

        }
        else if(opStr === 'in'){
            if(!matchCase){
                filteredData = filteredData.filter((a:AnyObject) => {
                    if(!a[field] || typeof value !== 'object')return false
                    const lowerCase = value.map((val:string)=>val.toLowerCase())
                    return lowerCase.includes(a[field])
                })
            }
            else {
                filteredData = filteredData.filter((a:AnyObject) => {
                    return a[field] && value.includes(a[field])
                })

            }

        }
        else if(opStr === 'not-in'){
            if(!matchCase){
                filteredData = filteredData.filter((a:AnyObject) => {
                    if(!a[field]  || typeof value !== 'object')return false
                    const lowerCase = value.map((val:string)=>val.toLowerCase())
                    return !lowerCase.includes(a[field].toLowerCase())
                })
            }
            else {
                filteredData = filteredData.filter((a:AnyObject) => {
                    return a[field] && !value.includes(a[field])
                })

            }

        }else if(opStr === '>'){
            if(!matchCase && isMatchable){
                filteredData = filteredData.filter((a:AnyObject) => {
                    return a[field] && a[field].toString().toLowerCase() > value.toString().toLowerCase()
                })
            }
            else {
                filteredData = filteredData.filter((a:AnyObject) => {
                    return a[field] && a[field] > value
                })

            }

        }else if(opStr === '>='){
            if(!matchCase && isMatchable){
                filteredData = filteredData.filter((a:AnyObject) => {
                    return a[field] && a[field].toString().toLowerCase() >= value.toString().toLowerCase()
                })
            }
            else {
                filteredData = filteredData.filter((a:AnyObject) => {
                    return a[field] && a[field] >= value
                })

            }

        }else if(opStr === '<'){
            if(!matchCase && isMatchable){
                filteredData = filteredData.filter((a:AnyObject) => {
                    return a[field] && a[field].toString().toLowerCase() < value.toString().toLowerCase()
                })
            }
            else {
                filteredData = filteredData.filter((a:AnyObject) => {
                    return a[field] && a[field] < value
                })

            }

        }else if(opStr === '<='){
            if(!matchCase && isMatchable){
                filteredData = filteredData.filter((a:AnyObject) => {
                    return a[field] && a[field].toString().toLowerCase() <= value.toString().toLowerCase()
                })
            }
            else {
                filteredData = filteredData.filter((a:AnyObject) => {
                    return a[field] && a[field] <= value
                })

            }

        }
    }

    if(isObject){
        const tempObject:AnyObject = {}
        filteredData.forEach((item:any)=>{
            const key =  item['filterCustoMWKey']
            delete item['filterCustoMWKey']
            tempObject[key as keyof AnyObject] = item
        })
        filteredData = tempObject
    }
    return filteredData

}