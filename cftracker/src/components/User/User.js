import React from 'react'
import {Link} from "react-router-dom"
import "./User.css"

export const User = props => {
  return (
    <a href={`https://codeforces.com/profile/${props.handle}`} target='_blank'>
      <div className='card'>
            <div className="user-item__image">
              <div className='avatar'>
              <img src={props.image} alt={props.name} />
              </div>
            </div>
            <div className="user-item__info">
              <h2>{props.name}</h2>
              <h3>
                Rating: {props.rating}
              </h3>
              <h3>
                  Max Rating:{props.maxRating}
              </h3>
            </div>
      </div>
      </a>
  )
}
