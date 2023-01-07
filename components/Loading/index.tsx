import { CardMedia, CircularProgress } from "@mui/material"
import Image from "next/image"
import styled from "styled-components"
import Logo from "../../assets/logo.svg"
const StyledContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    height:100vh;
`
const StyledImageWrapper = styled.div`
margin-bottom:10px;
`
const Loading = () => {
  return (
    <StyledContainer>
        <StyledImageWrapper>
           <CardMedia>
            <Image src={Logo} alt="hlo"/>
           </CardMedia>
        </StyledImageWrapper>
        <CircularProgress/>
    </StyledContainer>
  )
}

export default Loading