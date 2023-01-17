import { ChangeEventHandler, MouseEventHandler, useEffect, useRef } from 'react'

interface TextareaProps {
  value: string
  className: string
  placeholder: string
  onClick?: MouseEventHandler<HTMLTextAreaElement>
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  maxLength?: number
}

const TeaxtareaAutosize = ({ value, className, placeholder, onClick, onChange, maxLength }: TextareaProps) => {
  const tx = useRef<HTMLTextAreaElement>(null)

  const resizeTextarea = () => {
    if (tx.current) {
      tx.current.style.height = '0'
      tx.current.style.height = tx.current.scrollHeight + 'px'
    }
  }

  useEffect(() => {
    if (tx.current) resizeTextarea()
  }, [value])

  return (
    <textarea
      ref={tx}
      className={`${className} break-words`}
      placeholder={placeholder}
      rows={1}
      onClick={onClick}
      onChange={onChange}
      maxLength={maxLength}
      value={value}
      spellCheck={false}
    />
  )
}

export default TeaxtareaAutosize
