import PopupWithForm from "./PopupWithForm.js";
import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

export default function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")

  function handleChangeName(e) {
    setName(e.target.value)
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateUser({
      name: name,
      about: description,
    })
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);


  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      id="popapContentProfile"
      close={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      btnName={props.onLoading ? `Сохранение...` : `Сохранить`}
    >
      <input
        className="popup__field popup__field_name "
        type="text"
        name="name"
        id="inputName"
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        required
        onChange={handleChangeName}
        value={name || ''} />
      <span className="popup__input-error popup__input-error_type_inputName"></span>
      <input
        className="popup__field popup__field_about"
        type="text"
        name="about"
        id="inputAbout"
        placeholder="Род деятельности"
        minLength={2}
        maxLength={200}
        required
        onChange={handleChangeDescription}
        value={description || ''} />
      <span className="popup__input-error popup__input-error_type_inputAbout" />
    </PopupWithForm>
  )


}
