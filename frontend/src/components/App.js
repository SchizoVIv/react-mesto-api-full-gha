import React, { useState, useEffect } from "react"
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import '../index.css';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api"
import EditProfilePopup from "./EditProfilePopup.js"
import EditAvatarPopup from "./EditAvatarPopup.js"
import AddPlacePopup from "./AddPlacePopup.js"
import ConfirmationPopup from "./ConfirmationPopup.js"
import Login from "./Login.js"
import Register from "./Register.js"
import ProtectedRoute from "./ProtectedRoute.js"
import InfoTooltip from "./InfoTooltip.js"
import * as auth from "../utils/auth.js"


function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isDeletedCard, setDeletedCard] = useState({})
  const [selectedCard, setSelectedCard] = useState({})
  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [isloggingIn, setLoggingIn] = useState(false)
  const navigate = useNavigate()
  const [isEmail, setEmail] = useState('')
  const [isInfoTooltip, setInfoTooltip] = useState(false);
  const [isRegisterMessage, setRegisterMessage] = useState(false);


  useEffect(() => {
    if (localStorage.jwt) {
      auth
        .getToken(localStorage.jwt)
        .then((res) => {
          setEmail(res.email);
          setLoggingIn(true);
          navigate('/');
        })
        .catch((res) => {
          setLoggingIn(false);
          navigate('/sign-in');
        });
    }
  }, [])

  useEffect(() => {
    if (isloggingIn) {
      api
        .getProfileFromServer()
        .then(res => {
          console.log(res)
          console.log(res.user)
          setCurrentUser({
            _id: res.user._id,
            name: res.user.name,
            about: res.user.about,
            avatar: res.user.avatar,
            email: res.user.email
          });
          // setCurrentUser(res);
        })
        .catch(err => {
          console.error(`Error:${err} - ${err.statusText}`)
        })

      api
        .getCardsFromServer()
        .then(cardsData => {
          setCards(cardsData);
        })
        .catch(err => {
          console.error(`Error:${err} - ${err.statusText}`)
        })
    }
  }, [isloggingIn]);

  useEffect(() => {
    checkToken()
    //eslint-disable-next-line
  }, [])

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
    setConfirmationPopupOpen(false)
    setInfoTooltip(false)
    setDeletedCard({})
  }

  function handleCardDelete(card) {
    setLoading(true)
    api
      .removeCard(card._id)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== card._id))
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => { setLoading(false) })
  }

  function handleCardLike(card, isLiked) {
    (!isLiked ?
      api
        .addLike(card._id) :
      api
        .removeLike(card._id)
    )
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)))})
      .catch((error) => console.log(`Ошибка: ${error}`))
  }

  function handleUpdateUser(newUserInfo) {
    setLoading(true)
    api
      .editProfile(newUserInfo)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => { setLoading(false) })

  }

  function handleUpdateAvatar(newUserInfo) {
    setLoading(true)
    api
      .updateUserAvatar(newUserInfo)
      .then((data) => {
        setCurrentUser(data)
        console.log(data)
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => { setLoading(false) })

  }

  function handleAddPlaceSubmit(cardData) {
    setLoading(true)
    api
      .addCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => { setLoading(false) })
  }

  function handleRegisterSubmit(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setRegisterMessage(true);
        handleInfoTooltip()
        navigate("/sing-in");

      })
      .catch((err) => {

          setRegisterMessage(false);
          handleInfoTooltip()
          console.log("400 - некорректно заполнено одно из полей")
      })
  }
  function handleLoginSubmit(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        // localStorage.setItem("jwt", res.token)
        setEmail(email)
        setLoggingIn(true);
        navigate("/");

      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - некорректно заполнено одно из полей")
        }
      })
  }

  function checkToken() {
    // const jwt = localStorage.getItem("jwt")
      auth
        .getContent()
        .then((res) => {
          if(!res) {
            return;
          }
          setEmail(res.data.email)
          setLoggingIn(true)
          navigate("/")
        })
        .catch((error) => {
          setLoggingIn(false)
          console.log(`Ошибка: ${error}`)})

  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header
            isloggingIn={isloggingIn}
            email={isEmail}
            setLoggingIn={setLoggingIn}
            setCurrentUser={setCurrentUser} />
          <Routes>
            <Route path="/" element={
                <ProtectedRoute
                  exact
                  isloggingIn={isloggingIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={setDeletedCard}
                  onConfirmation={setConfirmationPopupOpen}
                  cards={cards}
                  element={Main}
                  onLoading={isLoading} />
            } />

            <Route path="/sign-in" element={
                <Login onLogin={handleLoginSubmit} />
            } />

            <Route path="/sign-up" element={
              <Register onRegister={handleRegisterSubmit} />
            } />

            <Route path="*" element={
              isloggingIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />
            } />
          </Routes >
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading} />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onLoading={isLoading} />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateUserAvatar={handleUpdateAvatar}
            onLoading={isLoading} />
          <ConfirmationPopup
            isOpen={isConfirmationPopupOpen}
            onClose={closeAllPopups}
            onLoading={isLoading}
            onCardDelete={handleCardDelete}
            card={isDeletedCard}
          />
          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}></ImagePopup>
          <InfoTooltip
            isOpen={isInfoTooltip}
            close={closeAllPopups}
            isRegisterMessage={isRegisterMessage}
        />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

