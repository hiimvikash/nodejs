import React from 'react'
import s from "./Login.module.css";
function Signup() {
  return (
    <div className={s.body}>
    <div className={s.container}>
    <h1 className={s.h1}>Signup</h1>
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
      <button type="submit" className={s.button}>Signup</button>
    </form>
  </div>
  </div>
  )
}

export default Signup