import Authorization from "./Authorization.js"
import React, {useState} from "react";
import {  Redirect } from "react-router-dom";

export default function Login(props) {

  function handleSubmit(email, password) {
    props.onLogin(email, password);
  }

  return(
    <Authorization
      title="Вход"
      btnTitle="Войти"
      onSubmit={handleSubmit}
      />
  )
}
