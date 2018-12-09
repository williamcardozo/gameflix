import React from 'react'
import "./style.scss"

export const UserImage = (props) => (
  <div className="image-container">
    <img src={props.image} />
  </div>
)