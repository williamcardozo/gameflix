import React from 'react'
import './styles.scss'


export const Button = (props) => {
  return (
    <button className={`button ${props.customStyle} ${props.typeClass}`} onClick={props.onClick} type={props.type}>
      {props.children}
    </button>
  ) 
}
  
