import { useEffect, useRef, useState } from "react";

export interface UseLoadGsiScriptOptions {
     /**
    * Callback fires on load [gsi](https://accounts.google.com/gsi/client) script success
    */
    onScriptLoadSuccess?: () => void;
    /**
    * Callback fires on load [gsi](https://accounts.google.com/gsi/client) script failure
    */
    onScriptLoadError?: () => void;
}

const UseLoadGsiScript = (options: UseLoadGsiScriptOptions = {}): boolean => {
    const { onScriptLoadSuccess, onScriptLoadError} = options;
    const [scriptLoadedSuccessfully, setScriptLoadSuccessfully] = useState(false);

    const onScriptLoadSuccessRef = useRef(onScriptLoadSuccess);
    onScriptLoadSuccessRef.current = onScriptLoadSuccess;
  
    const onScriptLoadErrorRef = useRef(onScriptLoadError);
    onScriptLoadErrorRef.current = onScriptLoadError;

    useEffect(() => {
        setTimeout(() => {
        const scriptTag = document.createElement('script');
        scriptTag.src = 'https://accounts.google.com/gsi/client';
        scriptTag.async = true;
        scriptTag.defer = true;
        scriptTag.onload = () => {
            setScriptLoadSuccessfully(true);
            onScriptLoadSuccessRef.current?.();
        };
        scriptTag.onerror = () => {
            setScriptLoadSuccessfully(false);
            onScriptLoadErrorRef.current?.();
        };

        document.body.appendChild(scriptTag);
        
        return () => {
            document.body.removeChild(scriptTag);
        };
        },800)
    }, [])

    return scriptLoadedSuccessfully;
}

export default UseLoadGsiScript;