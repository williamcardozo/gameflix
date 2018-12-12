import React from 'react'
import './styles.scss'


export const Button = (props) => {
debugger
  return (
    <button className={`button ${props.customStyle} ${props.typeClass}`} onClick={props.onClick}>
      {props.children}
    </button>
  ) 
}
  
