import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

export default function Card(props) {

  const currentUser = React.useContext(CurrentUserContext)

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like-button ${isLiked ? 'element__like-button_active' : ''}`;

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card, isLiked);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
    props.onConfirmation(true)
  }

  return (
    <li
      className="element"
      data-card-id={props.card._id}
    >
      <div name="elementCard" action="">
        <img
          className="element__image"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleClick}
        />
        {isOwn &&
          <button
            className="element__delete-button button-hover"
            type="button"
            aria-label="Удалить карточку"
            onClick={handleDeleteClick}
          />}
        <div className="element__text">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__like-container">
            <button
              className={cardLikeButtonClassName}
              type="button"
              aria-label="Лайк"
              onClick={handleLikeClick}
            />
            <span className="element__like-count" />{props.card.likes.length}<span />
          </div>
        </div>
      </div>
    </li>
  )
}
