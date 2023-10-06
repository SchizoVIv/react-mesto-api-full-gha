import React, {useState} from "react";

export default function Authorization(props) {

  const [emailValue, setEmailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")


  function handleEmailChange(e) {
    setEmailValue(e.target.value)
  }

  function handlePasswordChange(e) {
    setPasswordValue(e.target.value)
  }

  function handleSubmit(e) {
    console.log(emailValue)
    console.log(passwordValue)
    e.preventDefault()
    props.onSubmit(emailValue, passwordValue);
  }

  return(
    <section className="authorization">
        <h2 className="authorization__title">{props.title}</h2>
        <form
          className="authorization__form" action=""
          onSubmit={handleSubmit}>
          <input
            className="authorization__input authorization__input_email"
            type="email"
            placeholder="Email"
            onChange={handleEmailChange}
            value={emailValue || ''}
            />
          <input
            className="authorization__input authorization__password"
            type="password"
            placeholder="Пароль"
            // minlength="8"
            onChange={handlePasswordChange}
            value={passwordValue || ''}
            />
          <button
            className="authorization__button"
            aria-label="кнопка регестрации/авторизации"
            type="submit" >{props.btnTitle}</button>
          <span
            className="authorization__question">{props.question}</span>
        </form>
    </section>
  )
}
