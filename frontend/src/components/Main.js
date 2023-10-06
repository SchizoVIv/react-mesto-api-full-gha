import React from 'react';
import Card from './Card';
import pen from '../image/pen.svg'
import CurrentUserContext from "../contexts/CurrentUserContext.js";



function Main(props) {

  const currentUserInfo = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__photo-conteiner">
            <img className="profile__photo" src={currentUserInfo.avatar} alt="Мое фото" />
            <button
              className="profile__button-avatar"
              type="button"
              onClick={props.onEditAvatar}>
              <img
                className="profile__edit-pen"
                src={pen}
                alt="изображение письменной ручки" />
            </button>
          </div>
          <div className="profile__texts">
            <div className="profile__text">
              <h1 className="profile__name">{currentUserInfo.name}</h1>
              <button
                className="profile__edit-button button-hover"
                type="button"
                aria-label="Редактировать"
                onClick={props.onEditProfile} />
            </div>
            <p className="profile__about">{currentUserInfo.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button button-hover"
          type="button"
          aria-label="Добавить пост"
          onClick={props.onAddPlace} />
      </section>
      <section>
        <ul className="elements">
          <template id="cardTemplate" />
          {props.cards.map(card => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              // onCardDelete={props.onCardDelete}
              onConfirmation={props.onConfirmation}
              onCardDelete={props.onCardDelete}
            />
          ))}

        </ul>
      </section>
    </main>
  );
}
export default Main;
