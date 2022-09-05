import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import ClickOutHandler from 'react-clickout-ts';
import UserContext from '../auth/UserContext';
import { SubmitContext, SubmitContextType } from './SubmitContext';


const SubmitTitle = () => {
    const {session} = useContext(UserContext) as SessionProps;
    const [active, setActive] = useState(false)
    const maxLength = session?.user.role === 1 ? 999 : 300
    const titleClass = 
    `
    overflow-x-hidden shadow-none border solid py-2 pl-4 pr-[68px] bg-transparent 
    resize-none box-border block w-full outline-none rounded-[4px] 
    placeholder-reddit_text-darker text-[15px] overflow-hidden
    `
    const tx = useRef<HTMLTextAreaElement>(null);

    const {
        title,
        setTitle,
        titleLength,
        setTitleLength,
    } = useContext(SubmitContext) as SubmitContextType;

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const element = e.target
        setTitle(e.target.value)
        setTitleLength(e.target.value.length)
    }

    const resizeTextarea = () => {
        if (tx.current) {
            tx.current.style.height = '0'
            tx.current.style.height = (tx.current.scrollHeight) + 'px'
        }
    }

    useEffect(() => {
        if (tx.current) resizeTextarea();
    }, [title])

  return (
    <div className='mb-2'>
        <div className='relative'>
            <ClickOutHandler onClickOut={() => {
                setActive(false)
            }}>
            <textarea
                ref={tx}
                style={{overflowWrap: 'break-word'}}
                className={`${titleClass} ${active ? 'border-reddit_text' : 'border-reddit_border'}`}
                placeholder={'Title'}
                rows={1}
                onClick={() => {
                    setActive(true);
                }}
                onChange={(e) => {
                    onChange(e);
                }}
                maxLength={maxLength}
                value={title}
            />
            <div 
                className='text-reddit_text-darker text-[10px] font-bold leading-3 bottom-3 absolute pointer-events-none right-3' 
                style={{letterSpacing: '.5px'}}
            >
                {titleLength}/{maxLength}
            </div>
            </ClickOutHandler>
        </div>
    </div>
  )
}

export default SubmitTitle