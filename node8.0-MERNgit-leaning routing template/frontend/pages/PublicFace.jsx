import React from 'react'
import s from './PublicFace.module.css';
import { Link } from 'react-router-dom'

export default function PublicFace() {
  return (
    <div className={s.container}>
        <div className={s.hero}>
            <h1 className={s.h1}>Welcome to<span style={{fontSize : "52px"}}>👋🏻, </span><span className={s.heroh1}>Notefy.</span></h1>
        </div>
        <div className={s.action}>
            <Link to="/signup" className={s.btn}>Create Account</Link>
            <p className={s.p}>Already a member ? <Link to="/login" className={s.btn}>Login here</Link></p>
        </div>
        
    </div>
  )
}
