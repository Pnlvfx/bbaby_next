import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface TimeMsgContextProviderProps {
    children: ReactNode
}

interface messageProps {
    value: string
    status?: 'error' | 'success'
    time?: number
}

export interface TimeMsgContextProps {
    message: messageProps
    setMessage: Dispatch<SetStateAction<messageProps>>
    }

export const TimeMsgContext = createContext({})

export const TimeMsgContextProvider = ({ children }: TimeMsgContextProviderProps) => {
    const _status = {
        value: '',
        status:'',
        time: 8000,
    }
    const [message, setMessage] = useState(_status)
    return (
        <TimeMsgContext.Provider value={{ setMessage, message}}>
            {children}
        </TimeMsgContext.Provider>
    );
};

export const useMessage = () => {
    const context = useContext(TimeMsgContext) as TimeMsgContextProps;
    if (!context) {
        throw new Error(
        'Message component must be used with TimeMsgProvider component',
        );
    }
    return context;
}