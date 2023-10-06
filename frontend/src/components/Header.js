import React from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

function Header(props) {


  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
  }

  return (

    <header className="header">
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Link className="header__link" to="/sign-in">Войти</Link>
            }
          />
          <Route
            path="sign-in"
            element={
              <Link className="header__link" to="/sign-up">Зарегистрироваться</Link>
            }
          />
          <Route
            path="/"
            element={
              <>
                <p className="header__emailUser">{props.email}</p>
                <button onClick={signOut} className="header__button">Выход</button>
              </>
            }
          />
        </Routes>
    </header>
  );
}
export default Header;
