import { Dispatch, SetStateAction } from 'react';
import style from './auth-input.module.css';

type AuthInput = {
  value: string,
  setValue: Dispatch<SetStateAction<string>>
}

const AuthInput = ({value, setValue}: AuthInput) => {
    
  return (
    <fieldset className={`${style.field} ${style.modalUpdate} ${style.required} ${style.valid}`}>
      <input
        id='loginUsername'
        className={`${style.textInput} ${style.modalUpdate}`}
        type='text'
        required
        name='username'
        data-empty='true'
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
      <label htmlFor='loginUsername' className={`${style.textInputLabel} ${style.modalUpdate}`}>
        Username
      </label>
    </fieldset>
  )
}

export default AuthInput;
