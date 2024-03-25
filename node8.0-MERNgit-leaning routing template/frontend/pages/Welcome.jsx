import React from 'react'
import s from "./Welcome.module.css";
import { Link } from 'react-router-dom';
function Welcome() {


  const date = new Date()
  const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)
  return (
    <>
      <div className={s.body}> 
        <div className={s.container}>
            <div className={s.hero}>
              <h1 className={s.h1}>{today}</h1>
            </div>
            <div className={s.action}>
              <Link to="/dash/notes" className={s.link}>👉🏻 Tech Notes</Link>
              <Link to="/dash/users" className={s.link}>👉🏻 User Settings</Link>
            </div>
        </div>
      </div>
    </>
  )
}

export default Welcome