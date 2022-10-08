export const postRequestHeaders =  {
    Accept: 'application/json', 
    'Content-Type': 'application/json'
};

export const siteUrl = process.env.NODE_ENV === 'production' ?  'https://www.bbabystyle.com' : 'http://localhost:3000';

export const buildUnderscoreUrl = (url: string) => {
    const bo = url
    .toLowerCase()
    .replaceAll(' ', '_')
    .replaceAll('%', '')
    .replaceAll(':', '')
    .replaceAll("'", "")
    .replaceAll('"', '')
    .replaceAll(',', '');
    return bo;
}