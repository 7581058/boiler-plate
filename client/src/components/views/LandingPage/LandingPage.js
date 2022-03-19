import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
/*
  useEffect(() => {
    axios.get('/api/hello') //get리퀘스트 서버에 보냄 
    .then(response => console.log(response.data+"hello리스폰스")) //서버에서 돌아오는 리스폰스 콘솔에 보여주기 
  }, [])*/

  const onClickHandler = () => {
    axios.get('/api/users/logout')
    .then( response => {
      console.log(response.data+"로그아웃핸들")
      
      if(response.data.success){
        console.log("로그아웃성공")
        //navigate("/login");
      }else{
        alert("logout fail")
      }
    })
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>
      <h2>시작 페이지</h2>

      <button onClick={onClickHandler}>
        Logout
      </button>
    </div>
  )
}

export default LandingPage
