import { DetailedHTMLProps, TextareaHTMLAttributes, useEffect, useRef } from 'react'

const TeaxtareaAutosize = (props: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>) => {
  const tx = useRef<HTMLTextAreaElement>(null)
  const prevHeightRef = useRef(0)

  const resizeTextarea = () => {
    if (tx.current) {
      const currentHeight = tx.current.scrollHeight
      if (prevHeightRef.current !== currentHeight) {
        tx.current.style.height = '0'
        /* prettier-ignore */
        tx.current.style.height = (tx.current.scrollHeight) + 'px'
        /* prettier-ignore */
        prevHeightRef.current = currentHeight
      }
    }
  }

  useEffect(() => {
    if (tx.current) resizeTextarea()
  }, [props.value])

  return <textarea ref={tx} {...props} />
}

export default TeaxtareaAutosize
