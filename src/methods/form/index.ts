
export function isEmail(email:string):boolean{
    return !!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}
export function isUrl(url=''){
    return !! url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&/=]*)/)
}
export function validateInp(inp:any):void{
    if(!inp)return
    const val:string = inp.value || ''
    const isEmpty:boolean = val === '' || val === null
    let parent = inp.parentNode
    if((inp.classList.contains('optional')) || inp.classList.contains('ant-select-selection-search-input')) {
        inp.classList.add('input-valid')
        inp.classList.remove('input-invalid')
        return;
    }
    let ignore = false
    while (parent && parent.nodeName !== 'form' && parent !==document.body){
        const className:string = [...parent.classList].join(' ')
        if((className.includes('ant-') && className.includes('-input')) || className.includes('quill')){
            ignore =true
            break
        }
        parent = parent.parentNode
    }
    if (ignore){
        inp.classList.add('input-valid')
        inp.classList.remove('input-invalid')
        return;
    }
    if (!val){
        inp.classList.add('input-invalid')
        inp.classList.remove('input-valid')
        return;
    }
    if(inp.classList.contains('two-words')){
        console.log('Two words here')
        const words = val.split(' ').filter(word=>word)
        console.log(words)
        if(words.length <2){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return;
        }
        console.log('Input is valid')
        const completeName = words
            .filter(part=>part &&part.length >=2 )[0]
        if(!completeName){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-invalid')
            return;
        }

    }

    if(inp.id==='firstName'){
        if(isEmpty || val.length<2){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(inp.id==='lastName'){
        if(isEmpty || val.length<2){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(inp.id==='email'){
        if(!isEmail(val)){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(inp.id==='domain'){
        if(!isUrl('https://www.'+val)){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(inp.id==='url'){
        if(!isUrl(val)){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }

    else if(inp.id.includes('password')){
        let specialChar,uppercase,number,lowercase
        const specials = [ "+", "-", "&&", "||", "!", "(", ")", "{", "}", "[", "]", "^",
            "~", "*", "?", ":","\"","\\",'.',',','@']
        specialChar=uppercase=number=lowercase=false
        for (let i = 0; i < val.length; i++) {
            if (specials.includes(val[i])){
                specialChar = true
            }
            else if (!isNaN(Number(val[i]))){
                number = true
            }
            else if (val[i]===val[i].toUpperCase()){
                uppercase=true
            }
            else if (val[i]===val[i].toLowerCase()){
                lowercase=true
            }
        }
        if(lowercase===false || uppercase===false || specialChar===false || number===false || val.length<8){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
        if(val.length<8){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
        if(inp.id==='password2'){
            const password1:any= document.getElementById('password1')
            if(password1 && password1.value){
                if(password1.value !== val){
                    inp.classList.add('input-invalid')
                    inp.classList.remove('input-valid')
                    return
                }
            }
        }
    }
    else{
        if(isEmpty || val.length<2){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    inp.classList.add('input-valid')
    inp.classList.remove('input-invalid')
}
export function formIsValid (ref:string|HTMLFormElement):boolean{
    let formRef:HTMLElement | null;
    if(typeof ref === 'string'){
        formRef = document.getElementById(ref)
    }else formRef = ref
    if(formRef){
        const inps:HTMLCollection = formRef.getElementsByTagName('input')
        const txt:HTMLCollection = formRef.getElementsByTagName('textarea')
        const inputDivs:HTMLCollection = formRef.getElementsByClassName('input-div')
        const inputElements:any[] = [...inps,...txt,...inputDivs]
        for (let i = 0; i < inputElements.length; i++) {
            const inp = inputElements[i]
            validateInp(inp)
        }
        const invalids = formRef.getElementsByClassName('input-invalid')
        return invalids.length === 0
    }
    return true
}
