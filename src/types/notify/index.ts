export type NotificationColor = 'success'|'primary'|'secondary'|'warning'|'error'|'neutral'|'cancel'

export type NotificationColors = Partial<Record<NotificationColor, string>>

export type SweetAlertIcon = 'success'|'error'|'warning'|'info'|'question'

export type NotificationConfig = {
    colors?: NotificationColors
    title?: string
    text?: string
    icon?: SweetAlertIcon
    showCancelButton?: boolean
    confirmButtonText?: string
    confirmButtonColor?: NotificationColor,
    cancelButtonText?: string
    cancelButtonColor?: NotificationColor
}

export type ConfirmActionWithInputProps = {
    input:string,
    title?:string,
    text?:string,
    icon?:SweetAlertIcon,
    showCancelButton?:boolean,
    label?:string,
    placeholder?:string,
    warning?:string,
    confirmButtonText?:string,
    confirmButtonColor?: NotificationColor,
    cancelButtonText?:string,
    cancelButtonColor?:NotificationColor
}


export type ConfirmActionProps = string | {
    title: string,
    text?: string,
    icon?: SweetAlertIcon,
    showCancelButton?: boolean,
    confirmButtonText?: string,
    confirmButtonColor?: NotificationColor
    cancelButtonColor?:NotificationColor
}

export type MessageProps = {
    title?: string,
    icon?:'success'|'error'|'info',
    color?: NotificationColor
}