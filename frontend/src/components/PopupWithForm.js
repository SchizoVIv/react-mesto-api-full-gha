import React from "react";
function PopupWithForm(props) {
  return (
    <section className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_width_100">
        <button
          className={`popup__close-button popup__close-button_${props.name} button-hover`}
          type="button"
          aria-label="Закрыть попап"
          onClick={props.close} />
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__content"
          name={props.name}
          id={props.id}
          onSubmit={props.onSubmit}>
          <fieldset className="popup__fieldset">
            {props.children}
            <button
              className="popup__save-button"
              type="submit"
            >{props.btnName}</button>
          </fieldset>
        </form>
      </div>
    </section>
  );
}
export default PopupWithForm;
