import { TimeMsgContextProps } from '../main/TimeMsgContext'

export const catchError = (err: unknown) => {
  if (err instanceof Error) {
    throw new Error(err.message)
  } else if (typeof err === 'string') {
    throw new Error(err)
  } else {
    throw new Error('API error')
  }
}

export const catchErrorWithMessage = (err: unknown, transporter: TimeMsgContextProps): void => {
  if (err instanceof Error) {
    transporter.setMessage({ value: err.message, status: 'error' })
  } else if (typeof err === 'string') {
    transporter.setMessage({ value: err, status: 'error' })
  } else {
    transporter.setMessage({ value: `That's really strange!`, status: 'error' })
  }
}

export const isJson = (response: Response) => response.headers.get('content-type')?.includes('application/json')

export const urlisImage = (url: string) => {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
}
