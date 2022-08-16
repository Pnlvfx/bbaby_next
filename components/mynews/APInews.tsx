export const getOneNews = async (id:string) => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL;
    const url = `${server}/news/${id}`
    const res = await fetch(url, {
        method: 'get',
        credentials: 'include'
    });
    const data = await res.json();
    return data as NewsProps
}