import React, { useEffect } from "react"
import PopupWithForm from "./PopupWithForm.js"

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef(null)

  useEffect(() => {
    avatarRef.current.value = ""
  }, [props.isOpen])


  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUserAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      id="popapAvatar"
      close={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      btnName={props.onLoading ? `Сохранение...` : `Сохранить`}
    >
      <input
        className="popup__field popup__field_link-avatar"
        id="ignputAvatar"
        name="avatar"
        type="url"
        pattern="https://.*"
        placeholder="Введите ссылку URL"
        required
        ref={avatarRef}
         />
      <span className="popup__input-error popup__input-error_type_ignputAvatar" />
    </PopupWithForm>
  )
}
