import React from "react";
import s from "./Login.module.css";

function Login() {
  return (
    <div className={s.body}>
    <div className={s.container}>
    <h1 className={s.h1}>Login</h1>
    <form>
      <div className={s.row}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          autoComplete="off"
          placeholder="username"
        />
      </div>
      <div className={s.row}>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
      </div>
      <button type="submit" className={s.button}>Login</button>
    </form>
  </div>
  </div>
  );
}

export default Login;
