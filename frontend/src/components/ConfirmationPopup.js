import PopupWithForm from "./PopupWithForm.js";

export default function ConfirmationPopup(props) {
  function handleSubmit(e) {
    e.preventDefault()
    props.onCardDelete(props.card)
  }

  return (
    <PopupWithForm
      name="question"
      title="Вы уверены?"
      id="popapQuestion"
      btnName={props.onLoading ? `Удаление...` : `Да`}
      close={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  )
}
