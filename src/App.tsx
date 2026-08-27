import React, {FormEvent, useEffect, useRef, useState} from 'react';
import {confirmAction, confirmActionWithInput, formIsValid, message} from "./methods";
import { registerNotificationConfig } from './methods';

function App() {
    useEffect(() => {
        registerNotificationConfig({
            colors:{
                primary:'#0061C1',
                success:'#0061C1',
                neutral:'#F1F5F9',
                // error:'#0F0',
            }
        })
    },[])
    const notify = async()=>{
        message({icon:'error'})
    }
    
    return (
        <div>
            <button onClick={notify}>Test</button>
        </div>
    );
}

export default App;