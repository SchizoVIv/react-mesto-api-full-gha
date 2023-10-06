import union from "../image/Union.svg"
import unionZero from "../image/UnionZero.svg"
export default function InfoTooltip(props) {
  return(
    <section className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_width_100">
        <button
          className={`popup__close-button popup__close-button_${props.name} button-hover`}
          type="button"
          aria-label="Закрыть попап"
          onClick={props.close} />
        <img
          className="popup__image-union"
          src={props.isRegisterMessage ? union : unionZero}
          alt={props.isRegisterMessage ? 'Успешная регистрация' : 'Ошибка регистрации'} />
        <h2 className="popup__title popup__title_register">{props.isRegisterMessage ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>

      </div>
    </section>
  )
}
