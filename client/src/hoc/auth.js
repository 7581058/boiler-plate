import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_actions';
import { useNavigate } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null){
  //option 
  // null : 아무나 출입이 가능한 페이지
  // true : 로그인한 유저만 출입 가능한 페이지
  // false : 로그인한 유저는 출입 불가능한 페이지 
  //adminRoute = null 사용안함, es6문법 

  function AuthenticationCheck(){
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {

      dispatch(auth()).then(response => { //페이지를 이동할때마다 backend에 리스폰스 줌 
        console.log(response)

        //로그인하지 않은 상태
        if(!response.payload.isAuth){
          if(option){
            //navigate("/login");
          }
        }else{
          //로그인한 상태
          if(adminRoute && !response.payload.isAdmin){
           // navigate("/");
          }else{
            if(option === false){
             // navigate("/");
            }
          }
        }
      })

    }, [])

    return (
      <SpecificComponent/>
    )
  }

return AuthenticationCheck

}

