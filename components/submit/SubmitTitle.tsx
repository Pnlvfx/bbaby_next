import { ChangeEvent, useContext, useState } from 'react';
import ClickOutHandler from 'react-clickout-ts';
import UserContext from '../auth/UserContext';
import TeaxtareaAutosize from '../utils/TeaxtareaAutosize';
import { SubmitContext, SubmitContextType } from './SubmitContext';


const SubmitTitle = () => {
    const {session} = useContext(UserContext) as SessionProps;
    const [active, setActive] = useState(false)
    const maxLength = session?.user.role === 1 ? 999 : 300
    const titleClass = 
    `
    overflow-x-hidden shadow-none border solid py-2 pl-4 pr-[68px] bg-transparent 
    resize-none box-border block w-full outline-none rounded-[4px] 
    placeholder-reddit_text-darker text-[16px] overflow-hidden
    `

    const {
        title,
        setTitle,
        titleLength,
        setTitleLength,
    } = useContext(SubmitContext) as SubmitContextType;

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value)
        setTitleLength(e.target.value.length)
    }

  return (
    <div className='mb-2'>
        <div className='relative'>
            <ClickOutHandler onClickOut={() => {
                setActive(false)
            }}>
            <TeaxtareaAutosize
                className={`${titleClass} ${active ? 'border-reddit_text' : 'border-reddit_border'}`}
                placeholder={'Title'}
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
                className='whitespace-pre-wrap text-reddit_text-darker text-[10px] font-bold leading-3 bottom-3 absolute pointer-events-none right-3' 
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