import React from 'react'
import styled from 'styled-components'
// import Robot from '../../assets/robot.gif'
import Chicken from '../../assets/chicken.gif'

export default function Welcome({currentUser}) {
  return (
    <Container>
        <img src={Chicken} alt="Robot" />
        <h1>
            Welcome,<span>{currentUser && " "+currentUser.firstname+" "+currentUser.lastname}!</span>
        </h1>
        <h3>Please select a chat to Start Chatting </h3>
    </Container>
  ) 
}



const Container = styled.div`
  width:full;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: gray;
  }
`;