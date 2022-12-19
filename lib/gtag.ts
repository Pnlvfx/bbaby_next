export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

const production = process.env.NODE_ENV === 'production' ? true : false

export const pageview = (url: URL) => {
  if (!production) return
  const { gtag } = window
  gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

type GTagEvent = {
  action: string
  category: string
  label: string
  value: number
}

export const event = ({ action, category, label, value }: GTagEvent) => {
  if (!production) return
  const { gtag } = window
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}

export const loginAnalytics = () => {
  if (!production) return
  const { gtag } = window
  return gtag('event', 'login')
}

export const registerAnalytics = () => {
  if (!production) return
  const { gtag } = window
  return gtag('event', 'register')
}

export const googleLoginAnalytics = () => {
  if (!production) return
  const { gtag } = window
  return gtag('event', 'login', {
    method: 'google',
  })
}

export const shareAnalytics = () => {
  if (!production) return
  const { gtag } = window
  gtag('event', 'share')
}
