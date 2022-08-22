export const COLORS = {
    orange: '#f54404',
    red: '#f54404',
    dark: '#030303',
    brighter: '#1a1a1b',
    brightest: '#272729',
    border: '#323334',
    text: '#d7dadc',
    text_darker: '#818384',
    blue: '#24A0ED'
}

export const postRequestHeaders =  {
    Accept: 'application/json', 
    'Content-Type': 'application/json'
};

export const siteUrl = process.env.NODE_ENV === 'production' ?  'https://www.bbabystyle.com' : 'http://localhost:3000'