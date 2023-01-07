'use client'

import { AppBar, Stack, IconButton, CardMedia, Box, Typography,Toolbar, Avatar } from "@mui/material"
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { createContext, useContext, useMemo, useState } from "react";
import { Tooltip } from "@mui/material";
import { ColorModeContext } from "../../core/context/ColorModeContext"

import { auth } from "../../core/firebase/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import Image from "next/image";
import Logo from "../../assets/logo.svg"
const StyledContainer = styled(Toolbar)`
    display: flex; 
    width:100%;
    height:100px;
    background-color:#21262B;
    box-shadow: 0px 1px 2px rgba(2, 17, 37, 0.12);
`
const StyledText = styled(Typography)`
    font-size:24px;
    font-weight:bold;
`
const StyledLogo = styled.div`
    display: flex;
    align-items: center;
    `
const Header = () => {
  const [loggedInUser, _loading , _error] = useAuthState(auth)
  const {mode, toggleColorMode} = useContext(ColorModeContext)
  const Logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <>
     <AppBar position="static" sx={{bgcolor:"#21262B"}}>
      <StyledContainer>
      <StyledLogo>
       <CardMedia>
        <Image src={Logo} alt="logo"/>
       </CardMedia>
          <StyledText >
              Pada <span style={{fontSize:24,color:'#F6A905',fontWeight:'bold'}}>Chat</span>
          </StyledText>
        </StyledLogo>
        <Stack spacing={1} direction='row' marginLeft={'auto'}>
          <IconButton onClick={toggleColorMode}>
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton>
            <MoreVertOutlinedIcon />
          </IconButton>
          <Tooltip title={loggedInUser?.email as string} placement='bottom' onClick={Logout}>
            <Avatar src={loggedInUser?.photoURL || ''}/>
          </Tooltip>
        </Stack>
      </StyledContainer>
      </AppBar>
    </>
   
  )
}

export default Header