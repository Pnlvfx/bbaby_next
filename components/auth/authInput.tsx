import { Dispatch, SetStateAction } from 'react';
import { StatusProps } from './modal/AuthModal';

export const authInput = (
  title: string,
  type: string,
  status: StatusProps,
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
        className={`inputClass mb-3 w-full p-2 ${status.err && 'border border-reddit_red'}`}
        value={state}
        onChange={(e) => setState(e.target.value)}
        autoComplete={autoComplete}
      />
    </label>
  )
}
