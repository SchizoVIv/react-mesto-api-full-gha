import Authorization from "./Authorization.js"
import React, {useState} from "react";
import { Redirect } from "react-router-dom";

export default function Register(props) {

  function handleSubmit(email, password) {
    console.log(email)
    console.log(password)
    props.onRegister(email, password);
  }

  return(
    <Authorization
      title="Регистрация"
      btnTitle="Зарегистрироваться"
      onSubmit={handleSubmit} />
  )
}
