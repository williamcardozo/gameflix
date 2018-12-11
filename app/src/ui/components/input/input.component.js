import React, { Component } from 'react'
import './styles.scss'

export class Input extends Component {

    render() {
        return (
            <div className="input-container">
                <label>{this.props.label}</label>
                <input {...this.props}/>
            </div>
           
        )
    }
}