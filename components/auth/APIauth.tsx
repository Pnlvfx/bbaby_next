export const getUserIP = async () => {
        const IP_API_KEY = process.env.NEXT_PUBLIC_IP_LOOKUP_API_KEY;
        const url = `https://extreme-ip-lookup.com/json?key=${IP_API_KEY}`
        const res1 = await fetch(url, {
          method: 'get',
        })
        const userIpInfo = await res1.json();
        return userIpInfo;
}