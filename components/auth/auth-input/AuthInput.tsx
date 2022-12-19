<<<<<<< HEAD
import style from './auth-input.module.css';
=======
import style from './auth-input.module.css'
>>>>>>> 37cf1437146e9308d66dd42adba32fc919a28cd9

type AuthInput = {
  id: string
  type: string
  name: string
  value: string
  validate: (input: HTMLInputElement['value']) => void
  isValid: boolean | null
  error: string
  autoComplete: string
}

const AuthInput = ({
  id,
  type,
  name,
  value,
  validate,
  isValid,
  error,
  autoComplete,
}: AuthInput) => {
  return (
    <fieldset
      className={`${style.field} ${style.modalUpdate} ${style.required} ${
        isValid ? style.valid : isValid === false ? style.invalid : ''
      }`}
    >
      <input
        id={id}
        className={`${style.textInput} ${style.modalUpdate}`}
        type={type}
        autoComplete={autoComplete}
        required
        name={name}
        data-empty={value.length <= 0 ? true : false}
        value={value}
        onChange={(e) => {
          validate(e.target.value)
        }}
      />
<<<<<<< HEAD
      <label htmlFor={id} className={`${style.textInputLabel} ${style.modalUpdate}`}>
        {name.slice(0, 1).toUpperCase() + name.slice(1)}
=======
      <label
        htmlFor={id}
        className={`${style.textInputLabel} ${style.modalUpdate}`}
      >
        {name}
>>>>>>> 37cf1437146e9308d66dd42adba32fc919a28cd9
      </label>
      {isValid === false && (
        <div className="mt-1 pl-4 text-[12px] text-[#fb133a] ">{error}</div>
      )}
    </fieldset>
  )
}

export default AuthInput
