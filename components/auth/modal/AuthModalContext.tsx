import {createContext, Dispatch, SetStateAction, useState} from 'react';

export type AuthModalContextProps = {
    show: "hidden" | "login" | "register" | "reset-your-password"
    setShow: Dispatch<SetStateAction<"hidden" | "login" | "register" | "reset-your-password">>
}

export const AuthModalContext = createContext<AuthModalContextProps | {}>({});

interface AuthModalContextProviderProps {
    children: React.ReactNode
}

export const AuthModalContextProvider = ({children}:AuthModalContextProviderProps) => {
    const [show,setShow] = useState('hidden');  //TYPE: hidden, login, register, forgot your password
    return (
        <AuthModalContext.Provider value={{show,setShow}}>
            {children}
        </AuthModalContext.Provider>
    )
}