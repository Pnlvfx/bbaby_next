import { TimeMsgContextProps } from "../main/TimeMsgContext";

export const catchError = (err : unknown) => {
    if (err instanceof Error) {
        throw new Error(err.message);
    } else {
        console.log(err);
        throw new Error("API error");
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