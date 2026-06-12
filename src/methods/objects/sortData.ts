import {AnyObject} from "@/types";

export function sortData(
    data: AnyObject | AnyObject[], 
    sortField: string, 
    direction: 'asc' | 'desc' = 'asc'
): AnyObject | AnyObject[] {
    
    const isArray = Array.isArray(data);
    
    // 1. Normalize input into a standardized array of { key, value } pairs
    // This avoids injecting dummy keys into the user's actual objects.
    const normalizedArray = isArray
        ? (data as AnyObject[]).map((item, index) => ({ key: index, value: { ...item } }))
        : Object.entries(data as AnyObject).map(([key, value]) => ({ key, value: { ...value } }));

    // 2. Perform the sort using built-in, highly optimized Timsort O(n log n)
    normalizedArray.sort((a, b) => {
        const valA = a.value[sortField];
        const valB = b.value[sortField];

        // Handle cases where the field might be missing
        if (valA === undefined || valB === undefined) return 0;

        if (valA < valB) return direction === 'asc' ? -1 : 1;
        if (valA > valB) return direction === 'asc' ? 1 : -1;
        return 0;
    });

    // 3. Reconstruct the original data format
    if (isArray) {
        return normalizedArray.map(item => item.value);
    } else {
        const sortedObject: AnyObject = {};
        for (const item of normalizedArray) {
            sortedObject[item.key] = item.value;
        }
        return sortedObject;
    }
}