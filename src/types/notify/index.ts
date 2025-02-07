export type ConfirmActionWithInputProps = {
    title:string,
    label?:string,
    placeholder:string,
    input:string,
    warning?:string,
    confirmButtonText?:string
}

export type MessageProps = {
    title: string,
    icon:'success'|'error'|'info'
}