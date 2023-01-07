
import type { NextPage } from "next";
import Head from "next/head";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import styles from "../styles/HomePage.module.css";
import CommonLayout from "../components/Layout";
import { CardMedia, Typography } from "@mui/material";
import styled from "styled-components";
import Image from "next/image";
import LogoMotion from "../assets/logo-animation.gif";
const PAGE_SIZE = 8;
const StyledWelcome = styled.h2`
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
`
const StyledSlogan = styled.h4`
  font-size:2rem;
  font-weight: semi-bold;
  text-align: center;
`
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Panda Chat Home</title>
        <meta name="description" content="Bookstore Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CommonLayout>
            <Container >
             <StyledWelcome >Welcome to Panda Chat</StyledWelcome>
             <StyledSlogan>Loves Panda, chat with it !</StyledSlogan>
             <CardMedia>
               <Image src={LogoMotion} alt="logo motion"/>
             </CardMedia>
            </Container>
      </CommonLayout>
    </>
  );
};

export default Home;
