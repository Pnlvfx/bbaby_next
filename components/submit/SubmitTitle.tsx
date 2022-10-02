import { ChangeEvent, useContext, useState } from 'react';
import ClickOutHandler from 'react-clickout-ts';
import { useSession } from '../auth/UserContext';
import TeaxtareaAutosize from '../utils/TeaxtareaAutosize';
import { SubmitContext, SubmitContextType } from './SubmitContext';
import style from './submit-title.module.css';


const SubmitTitle = () => {
    const {session} = useSession();
    const [active, setActive] = useState(false)
    const maxLength = session?.user?.role === 1 ? 999 : 300

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
            <ClickOutHandler 
                onClickOut={() => {
                    setActive(false)
                }}
            >
            <TeaxtareaAutosize
                className={`${style.submitTitle} ${active ? 'border-reddit_text' : 'border-reddit_border'}`}
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
            <div className={style.titleLength}>
                {titleLength}/{maxLength}
            </div>
            </ClickOutHandler>
        </div>
    </div>
  )
}

export default SubmitTitle