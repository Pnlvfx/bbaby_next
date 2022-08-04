export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url:URL) => {
  const {gtag}:any = window
  gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

type GTagEvent = {
  action: string,
  category: string,
  label: string,
  value: number
}

export const event = ({ action, category, label, value }:GTagEvent) => {
  const {gtag}:any = window
  gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

type WebVitalsProps = {
  id: string
  name: string
  label: string
  value: number
}

export const analyticsWebVitals = ({id, name, label, value}:WebVitalsProps) => {
  const {gtag}:any = window
  gtag('event', name, {
    event_category: 
    label === 'web-vital' ? 'Web Vitals' : 'Bbaby costum metrics',
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    event_label: id,
    non_interaction: true,
  })
}