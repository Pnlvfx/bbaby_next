import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export const buttonClass = (outline?: boolean) => {
  let classNames = 'border border-gray-300 rounded-full px-3 text-sm font-bold '
  if (outline) {
    classNames += 'text-gray-300 '
  } else {
    classNames += 'bg-gray-300 text-reddit_dark '
  }
  return classNames
}

type SpinnerProps = {
  width?: number
  height?: number
  color?: string
}

export const Spinner = ({ width, height, color }: SpinnerProps) => {
  return <AiOutlineLoading3Quarters className="mx-auto animate-spin" style={{ width, height, color }} />
}
