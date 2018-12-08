import React from 'react'
import './card.style.scss';

export const Card  = (props) => (
    <div className="card-container">
        {props.children}
    </div>
)