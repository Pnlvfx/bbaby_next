import { TimeMsgContextProps } from "../main/TimeMsgContext";

export const catchError = (err : unknown, from: string) => {
    if (err instanceof Error) {
        throw new Error(err.message + ' ' + from);
    } else {
        throw new Error("API error" + ' ' + from);
    }
}

export const catchErrorWithMessage = (err: unknown, transporter: TimeMsgContextProps): void => {
    if (err instanceof Error) {
        transporter.setMessage({value: err.message, status: 'error'});
    } else {
        transporter.setMessage({value: `That's really strange!`, status: 'error'});
    }
}

export const isJson = (response: Response) => response.headers.get('content-type')?.includes('application/json')

export const urlisImage = (url: string) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}