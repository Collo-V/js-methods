import Swal from "sweetalert2";
import {ConfirmActionWithInputProps, MessageProps} from "@/types";

export async function confirmAction(action:string) {
    action = action??'delete'
    let c = await Swal.fire({
        title: 'Confirm '+ action,
        text: 'Do you want to continue',
        // icon: 'error',
        confirmButtonText: 'Yes',
        showCancelButton:true,
        cancelButtonText:'cancel'
    })
    if (c.isConfirmed){
        return true
    }
    if (c.isDenied){
        return false
    }

}
export async function confirmActionWithInput(params:ConfirmActionWithInputProps) {
    const {title,label,placeholder,input,warning,confirmButtonText} = params
    let html = `${label??''}`
    if(warning){
        html+=`<br><br><span style="color: #f33030">*${warning}</span>`
    }
    let c = await Swal.fire({
        title,
        input: 'text',
        html,
        confirmButtonText:confirmButtonText??'Yes',
        inputValidator: (value) => {
            if (!value) {
                return "You need to write something!";
            }
            if (value !== input) {
                return "Invalid value";
            }
        },
        showCancelButton:true,
        inputPlaceholder:placeholder??"",
        cancelButtonText:'cancel'
    })
    if (c.isConfirmed){
        return true
    }
    if (c.isDenied){
        return false
    }

}

export async function message({icon,title}:MessageProps){
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
        title
    })
}


