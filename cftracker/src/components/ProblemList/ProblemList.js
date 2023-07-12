import React from 'react'
import "./ProblemList.css"
// import {Link} from "react-router-dom"
const baseURL="https://codeforces.com/problemset/problem"
export const ProblemList = props => {
  return (
    <ul className="problem-list">
      {props.problems.map(problem => {
        return <a href={`${baseURL}/${problem.contestId.toString()}/${problem.index}`} target='_blank'>
        <li 
        key={problem.id} 
        className={(!!props.submission && props.submission.has(problem.contestId.toString()+problem.index))?"green": ""}>{problem.name}
        </li>
        </a>
      })}
    </ul>
  )
}
