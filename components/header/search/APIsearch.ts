const server = process.env.NEXT_PUBLIC_SERVER_URL

export const search = async (text:string | string[] | undefined) => {
    try {
        const url = `${server}/search?phrase=${text}`
        const res = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        })
        const data = await res.json();
        if (!res.ok) {

        } else {
            return data
        }
    } catch (error) {
        
    }
}

export const searchTrend = async () => {
    try {
        const url = `${server}/search/today-trend`;
        const res = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        })
        const data = await res.json();
        if (!res.ok) {

        } else {
            return data;
        }
    } catch (error) {
        
    }
}