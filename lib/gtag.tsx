export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url:URL) => {
  const {gtag}:any = window
  gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export const user = (username:string) => {
  const {gtag}:any = window
  gtag('config', GA_TRACKING_ID, {
    user: username
  })
  gtag('set','user_properties', {
    'User': username
  })
}


type GTagEvent = {
  action: string,
  category: string,
  label: string,
  value: number
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }:GTagEvent) => {
  const {gtag}:any = window
  gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};