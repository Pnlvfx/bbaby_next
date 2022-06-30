import React, {Context, createContext, SetStateAction} from 'react';

const AuthModalContext:Context<{show?:boolean,setShow?:any}> = createContext({});

export default AuthModalContext;