import React from 'react'
import './style.scss';

export const GameCard = (props) => (
  <button className="card-container" onClick={props.onClick}>
    <img src={props.image} alt={props.name} />
    <div className="name-container">{props.name}</div>
  </button>
)