import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import LeftNav from "./LeftNav";

import { Stack } from "@mui/material";
import styled from "styled-components";
export default function CommonLayout(props: { children?: any }) {

  return (
    <>
      <Header />
      <Stack flexDirection={'row'} alignItems="flex-start" sx={{height:'calc(100vh - 100px)'}}>
        <LeftNav/>
        <Paper
        sx={{
          width: '100%',
          borderRadius: "unset",
          boxShadow: "none",
        }}
      >
        {props?.children}
      </Paper>
        
      </Stack>
     
    </>
  );
}
