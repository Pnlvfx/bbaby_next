import { Dispatch, SetStateAction } from 'react'
import { inputClass } from '../utils/Input'

export const authInput = (
  title: string,
  type: string,
  status: any,
  state: string,
  setState: Dispatch<SetStateAction<string>>,
  autoComplete: string
) => {
  return (
    <label>
      <span className="text-xs text-reddit_text-darker">{title}:</span>
      <input
        type={type}
        title={title}
        className={`${inputClass} mb-3 w-full p-2 ${
          status.err && 'border border-reddit_red'
        }`}
        value={state}
        onChange={(e) => setState(e.target.value)}
        autoComplete={autoComplete}
      />
    </label>
  )
}
