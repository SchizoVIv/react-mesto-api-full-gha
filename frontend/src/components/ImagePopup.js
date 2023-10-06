import React from "react";
function ImagePopup(props) {
  return (
    <section className={`popup popup-open-img ${props.card.link ? 'popup_opened' : ''}`}>
      <div className="popup__container popup-open-img__container">
        <button
          className="popup__close-button popup-open-img__close-button button-hover"
          type="button"
          aria-label="Закрыть картинку"
          onClick={props.onClose}
        />
        <div className="popup__content popup-open-img__content">
          <img
            className="popup-open-img__image"
            src={props.card.link}
            alt={props.card.name}
          />
          <figcaption className="popup-open-img__title">{props.card.name}</figcaption>
        </div>
      </div>
    </section>
  );
}
export default ImagePopup;
