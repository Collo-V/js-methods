import React, {FormEvent, useRef, useState} from 'react';
import {formIsValid} from "./methods";

function App() {
    const [input, setInput] = useState('')
    const formRef = useRef<HTMLFormElement>(null);
    const submit = (e:FormEvent) => {
        e.preventDefault()
        console.log('Submitting.....')
        if(!formRef.current)return
        formIsValid(formRef.current)
    }
    return (
        <div>
            <form
                onSubmit={submit}
                  ref={formRef}
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="two-words"
                />
            </form>
        </div>
    );
}

export default App;