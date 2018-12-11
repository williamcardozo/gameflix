import React from 'react'
import './style.scss'


export const Button = (props) => (
  <button {...props} className={`button ${props.typeClass} ${props.className}`}>
    {props.children}
  </button>
)
