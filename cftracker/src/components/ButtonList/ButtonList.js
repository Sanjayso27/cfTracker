import React from 'react'
import './ButtonList.css'
let ratings=[];
for(let st=800;st<=3500;st+=100){
    ratings.push(st);
}
export const ButtonList = props => {
  return (
    <div className='button-list'>
        {
            ratings.map(rating =>{
                return <button className= {"button-28" + (props.rating==rating?" selected":"")} role="button" value={rating} key={rating} onClick={props.onClickHandler} >
                    {rating}
                </button>
            })
        }
    </div>
  )
}
