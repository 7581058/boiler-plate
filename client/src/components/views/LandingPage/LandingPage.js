import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage() {

  useEffect(() => {
    axios.get('/api/hello') //get리퀘스트 서버에 보냄 
    .then(response => console.log(response.data)) //서버에서 돌아오는 리스폰스 콘솔에 보여주기 
  }, [])

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>
      <h2>시작 페이지</h2>
    </div>
  )
}

export default LandingPage
