export type ConfirmActionWithInputProps = {
    title:string,
    label?:string,
    placeholder:string,
    input:string,
    warning?:string,
    confirmButtonText?:string
}

export type NotificationColor = 'primary'|'secondary'|'warning'|'danger'|'neutral'

export type NotificationColors = Partial<Record<NotificationColor, string>>

export type SweetAlertIcon = 'success'|'error'|'warning'|'info'|'question'

export type ConfirmActionProps = string | {
    title: string,
    text?: string,
    icon?: SweetAlertIcon,
    showCancelButton?: boolean,
    confirmButtonText?: string,
    confirmButtonColor?: NotificationColor
}

export type MessageProps = {
    title: string,
    icon:'success'|'error'|'info',
    color?: NotificationColor
}