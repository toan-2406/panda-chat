import { Button, CardMedia } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import Logo from "../assets/logo2.svg"
import {useSignInWithGoogle} from 'react-firebase-hooks/auth'
import { auth } from '../core/firebase/firebase'
const StyledContainer = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: #000;
`
const StyledLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 70px;
  border-radius: 8px;
  background-color:whitesmoke;
  box-shadow: 0px 0px 0px 0px white;
`
const StyledImageWrapper = styled.div`
  margin-bottom: 100px;
`
function Login() {
  const [signInWithGoogle, _user, _loading, _error] = useSignInWithGoogle(auth);
  const signIn = () => {
    signInWithGoogle();
  }
  return (
    <StyledContainer>
      <Head>
        <title>Login</title>
      </Head>
      <StyledLoginContainer>
        <StyledImageWrapper>
          <CardMedia>
            <Image src={Logo} alt="hallo"/>
          </CardMedia>
        </StyledImageWrapper>
        <Button variant={'outlined'} color={'secondary'} onClick={signIn}>
          Sign in with Google
        </Button>
      </StyledLoginContainer>
    </StyledContainer>
  )
}

export default Login