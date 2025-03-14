/** Convert a Base64-encoded string to a File object
 *
 * @param base64String
 * @param filename
 */
import {AnyObject} from "@/types";

export function base64StringtoFile (base64String:string, filename:string): File|null {
    let arr = base64String.split(',')
    if(!arr[0]) arr[0] = ''
    const match = arr[0].match(/:(.*?);/)
    const mime = (match??'')[1]
    let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, {type: mime})
}

/** Download a Base64-encoded file
 *
 * @param base64Data
 * @param filename
 */

export function downloadBase64File (base64Data:string, filename:string):void {
    const element = document.createElement('a');
    element.setAttribute('href', base64Data)
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}

/** Extract an Base64 Image's File Extension
 *
 * @param base64Data
 */
export function extractImageFileExtensionFromBase64 (base64Data:string,):string {
    return base64Data.substring('data:image/'.length, base64Data.indexOf(';base64'))
}

/** Base64 Image to Canvas with a Crop
 *
 * @param canvasRef
 * @param image64
 * @param pixelCrop
 */
export function image64toCanvasRef (canvasRef:HTMLCanvasElement, image64:string, pixelCrop:AnyObject) {
    const canvas = canvasRef // document.createElement('canvas');
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height
    const ctx = canvas.getContext('2d')
    if(!ctx)return
    const image = new Image()
    image.src = image64
    image.onload = function () {
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        )
    }
}


/**Get Base64 from image
 *
 * @param url
 */
export function getBase64Image(url:string):Promise<string|null> {
    return new Promise(function (resolve, reject) {
        let img = new Image();
        // To prevent: "Uncaught SecurityError: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported."
        // img.crossOrigin = "Anonymous";
        img.setAttribute('crossorigin', 'anonymous')
        img.src = url;
        img.onload = function () {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if(!ctx) {
                resolve(null);
                return
            }
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL("image/png");
            // resolve(dataURL.replace(/^data:image\/(png|jpg|jpeg|pdf);base64,/, ""));
            resolve(dataURL);
        };
        img.src = url;
    });
}

/** Convert to binart
 *
 * @param file
 */
export function convertFileToBinary(file:File):Promise<string> {
    return  new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            if(!reader.result){
                resolve('');
                return
            }
            let data = ''
            if (typeof reader.result === "string") {
                data = reader.result.split(',')[1];
            }
            try {
                let binaryBlob = atob(data);

                resolve(binaryBlob);
            }catch (e) {
                reject(e)
            }
        };

        reader.onerror = () => {
            reject('Error reading file as binary data');
        };

        reader.readAsDataURL(file);
    });
}

/**
 * Convert file to base 64
 * @param file
 */
export function fileToBase64(file:File):Promise<string|null> {
    return  new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(typeof reader.result === 'object') {
                resolve('')
                return
            }
            resolve(reader.result);
        };
        reader.onerror = () => {
            reject('Error reading file as base64 data');
        };

        reader.readAsDataURL(file);
    });
}

/**
 * Convert blob file to base64
 * @param blob
 */

export async function blobToBase64(blob:Blob):Promise<unknown>{
    return  new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data)
        };
        reader.onerror = () => {
            reject('Error reading file as binary data');
        };

        reader.readAsDataURL(blob);
    });
}
export const getImageSize = (base64:string):Promise<[number,number]>=>{
    return new Promise((resolve)=>{
        const image = new Image()
        image.onload = ()=>{
            resolve([image.naturalWidth,image.naturalHeight])
        }
        image.src = base64

    })
}



