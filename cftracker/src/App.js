import './App.css';
import axios from "axios";
import React, { useEffect, useState,useMemo } from "react";
import {Pagination} from './Pagination'
import { ProblemList } from './components/ProblemList/ProblemList';
import { ButtonList } from './components/ButtonList/ButtonList';
import { User } from './components/User/User';
import { Route,Routes } from 'react-router-dom';

const baseURL = "https://codeforces.com/api";
const client = axios.create({
  baseURL: baseURL
});
const pageSize=20;
function App() {
  const [problems,setProblems]=useState(null);
  const [problemRating,setProblemRating]= useState(800);
  const [handle,setHandle] = useState("");
  const [submission,setSubmission] = useState(null);
  const [userInfo,setUserInfo]= useState({
    name:"",
    pic: "",
    handle: "",
    rating: "",
    maxRating: ""
  });
  useEffect(()=>{
    const getProblems=async ()=>{
      const response=await client.get(`${baseURL}/problemset.problems`);
      let problemArr=[]
      // console.log(response.data.result)
      for(let i=0;i<response.data.result.problems.length;i++){
        const rating =response.data.result.problems[i].rating;
        if(rating && rating==problemRating)problemArr.push({...response.data.result.problems[i],id:i});
      }
      setProblems(problemArr);
      // console.log(problemArr);
    }
    getProblems();
  },[problemRating])
  const [curPage,setCurPage]=useState(1);
    const curTableData=useMemo(()=>{
        const firstId=(curPage-1)*pageSize;
        const lastId=firstId+pageSize;
        return problems?problems.slice(firstId,lastId):null;
    },[curPage,problems]);
  // const createPost = async ()=>{
  //   const response = await client.post("",{
  //     title: "Hello World",
  //     body: "New Post"
  //   })
  //   setPost(response.data);
  // }
  // const deletePost = async ()=>{
  //   await client.delete("/1")
  //   alert("Post deleted");
  //   setPost(null);
  // }
  const onClickHandler = e =>{
    e.preventDefault();
    setProblemRating(e.target.value);
    // console.log(e.target.value);
  }
  useEffect(()=>{
    const getSubmissions = async ()=>{
      const response = await client.get(`${baseURL}/user.status?handle=${handle}&from=1`);
      const userSubmissions=new Map();
      for(let i=0;i<response.data.result.length;i++){
        userSubmissions.set(response.data.result[i].problem.contestId+response.data.result[i].problem.index,1);
      }
      setSubmission(userSubmissions);
      // console.log(userSubmissions);
    }
    if(handle!="")getSubmissions();
  },[userInfo])
  const onSubmitHandler = e=>{
    e.preventDefault();
    const getUser = async ()=>{
      const response=await client.get(`${baseURL}/user.info?handles=${handle}`);
      const newUser={};
      newUser.rating=(response.data.result[0].rating);
      newUser.name = (response.data.result[0].firstName + " " +response.data.result[0].lastName);
      newUser.maxRating=(response.data.result[0].maxRating);
      newUser.pic = (response.data.result[0].titlePhoto);
      newUser.handle =(response.data.result[0].handle);
      setUserInfo(newUser);
    }
    getUser();
  }
  const onInputHandler = e=>{
    setHandle(e.target.value);
    console.log(e.target.value);
  }
  return (
    problems?(
      <>
      <h1>CFTracker</h1>
      <ButtonList onClickHandler={onClickHandler} rating={problemRating}/>
      <div className="search-container">
        <form onSubmit={onSubmitHandler}>
          <input type="text" placeholder="Search Handle" name="search" onInput={onInputHandler}/>
          <button type="submit"><i className="fa fa-search"></i></button>
        </form>
      {userInfo.name!="" && 
      <User 
        name={userInfo.name}
        rating={userInfo.rating}
        image={userInfo.pic}
        handle={userInfo.handle}
        maxRating={userInfo.maxRating}
      />}
      </div>
      <div className="problems">
        <h2>Problems</h2>
        <ProblemList problems={curTableData} submission={submission}/>
      </div>
      <Pagination
          currentPage={curPage}
          totalCount={problems.length}
          pageSize={pageSize}
          onPageChange={page=>setCurPage(page)}
      />
      {/* <Routes>
        <Route path='/'></Route>
      </Routes> */}
      </>
    ):<></>
  );
}

export default App;
