import Swal from "sweetalert2";
import {ConfirmActionProps, ConfirmActionWithInputProps, MessageProps, NotificationColors, NotificationConfig} from "@/types";
import { deleteObjectFields } from "../objects";

const notificationConfig: NotificationConfig = {}
/**
 * Registers a notification configuration
 * @param config NotificationConfig
 * @returns void
 */
export function registerNotificationConfig(config: NotificationConfig) {
    const colors: NotificationColors = config.colors ?? {}
    const savedConfig = {
        title:'Confirm Action',
        text: 'Do you want to continue?',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        confirmButtonColor: colors.primary,
        cancelButtonColor: colors.cancel,
        ...config
    }
    Object.assign(notificationConfig, savedConfig)
    localStorage.setItem('swalNotificationConfig', JSON.stringify(savedConfig))
}
const loadSavedConfig = () => {
    if(typeof localStorage === 'undefined' || !notificationConfig.colors)return
    const savedConfig = localStorage.getItem('swalNotificationConfig')
    if (savedConfig) {
        Object.assign(notificationConfig, JSON.parse(savedConfig))
    }
}
loadSavedConfig()
function injectConfigProps<T extends Record<string, unknown>>(props:T): T {
    const config = deleteObjectFields(notificationConfig, ['colors'])
    const result: Record<string, unknown> = {}
    Object.keys({...config, ...props}).forEach((key) => {
        if(props[key] === undefined){
            result[key] = config[key as keyof NotificationConfig]
        }
        else result[key] = key.includes('Color') ? notificationConfig!.colors![props[key] as keyof NotificationColors] : props[key]
    })
    return result as T
}
/** Show a confirmation dialog for a specific action
 *
 * @param action
 * @returns {Promise<boolean>} Returns true if the user confirms, false otherwise
 */
export async function confirmAction(action:ConfirmActionProps) {
    const params = injectConfigProps(typeof action === 'string'
        ? {
            title: action??undefined,
        }
        : action)

    let c = await Swal.fire(params)
    if (c.isConfirmed){
        return true
    }
    if (c.isDenied){
        return false
    }

}
/** Show a confirmation dialog with an input field for a specific action
 *
 * @param params
 * @returns {Promise<boolean>} Returns true if the user confirms, false otherwise
 */
export async function confirmActionWithInput(params:ConfirmActionWithInputProps) {
    const config = injectConfigProps(params)
    delete config.placeholder
    const {label,placeholder,input,warning} = config
    let html = `${label??''}`
    if(warning){
        html+=`<br><br><span style="color: #f33030">*${warning}</span>`
    }
    let c = await Swal.fire({
        ...config,
        input: 'text',
        html,
        icon: config.icon,
        inputValidator: (value?:string) => {
            if (!value) {
                return "Input is required";
            }
            if (value !== input) {
                return "Invalid value";
            }
        },
        inputPlaceholder:placeholder??"",
    })
    if (c.isConfirmed){
        return true
    }
    if (c.isDenied){
        return false
    }

}
/**
 * Shows a toast notification
 * @param MessageProps 
 */
export async function message(props:MessageProps){
    const icon = props.icon??'info'
    let title = props.title
    if(!title){
        if(icon==='success') title = 'Success'
        else if(icon==='error') title = 'An error occurred'
        else title = 'Info'
    }
    const Toast = Swal.mixin({
        toast: true,
        timer:3000,
        position: 'top',
        showConfirmButton: false,
        showClass: {
            popup: 'animate__animated animate__fadeInUP'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown'
        }
    })


    await Toast.fire({
        icon,
        title,
        iconColor: notificationConfig.colors?.[icon]
        
    })
}


