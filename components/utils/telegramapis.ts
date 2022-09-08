import { catchError } from "../API/common";

const telegramapis = {
    sendLog: async (message: string) => {
        try {
            const server = process.env.NEXT_PUBLIC_SERVER_URL;
            const url = `${server}/analytics/logs?message=${message}`;
            const res = await fetch(url, {
                method: 'GET'
            })
            console.log(res);
        } catch (err) {
            catchError(err);
        }
    }
}

export default telegramapis;