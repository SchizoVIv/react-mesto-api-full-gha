import React from "react"
import PopupWithForm from "./PopupWithForm.js"

export default function AddPlacePopup(props) {
  const [placeName, setPlaceName] = React.useState("")
  const [placeLink, setPlaceLink] = React.useState("")



  React.useEffect(() => {
    if (props.isOpen) {
      setPlaceName("");
      setPlaceLink("");
    }
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault()
    props.onAddPlace({
      name: placeName,
      link: placeLink,
    })
  }

  function handleChangePlaceName(e) {
    setPlaceName(e.target.value)
  }

  function handleChangePlaceLink(e) {
    setPlaceLink(e.target.value)
  }

  // useEffect(() => {
  //   if (isOpen) {
  //     resetForm();
  //   }
  // }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      name="cards"
      title="Новое место"
      id="popapContentCards"
      close={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      btnName={props.onLoading ? `Создание...` : `Cоздать`}
    >
      <input
        className="popup__field popup__field_name-card"
        type="text"
        name="title"
        id="inputNameСard"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required
        value={placeName || ''}
        onChange={handleChangePlaceName} />
      <span className="popup__input-error popup__input-error_type_inputNameСard" />
      <input
        className="popup__field popup__field_link-card"
        type="url"
        pattern="https://.*"
        name="link"
        id="inputAboutСard"
        placeholder="Ссылка на картинку"
        required
        value={placeLink || ''}
        onChange={handleChangePlaceLink} />
      <span className="popup__input-error popup__input-error_type_inputAboutСard" />
    </PopupWithForm>
  )
}
