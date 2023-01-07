"use client";

import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";

import { useState } from "react";
import * as EmailValidator from "email-validator";
import { addDoc, collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../../core/firebase/firebase";
import { Conversation } from "../../core/types";
import ConversationSelect from "../ConversationSelect";

const StyledContainer = styled.div`
  width: 20%;
  height: 100%;
  padding: 8px 12px;
  box-shadow: 0px 0px 4px rgba(2, 17, 37, 0.04),
    2px 0px 8px rgba(2, 17, 37, 0.04), 6px 0px 16px rgba(2, 17, 37, 0.04);
  border-right: 1px solid #4a545c;
`;

const StyledSearch = styled.div`
  height: 2rem;
  border: 1px solid #4a545c;
  border-radius: 8px;
  margin: 16px 24px;
  position: relative;
  display: flex;
`;
const StyledSearchIcon = styled.button`
  border: none;
  background-color: transparent;
  color: #778592;
`;
const StyledSearchInput = styled.input`
  color: #778592;
  padding-left: 5px;
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
`;

const StyledSidebarButton = styled.div`
  border: 1px solid #fff;
  border-radius: 10px;
  height: 35px;
  font-size: 14px;
  color: #fff;
  margin: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  :hover {
    background-color: #f4f4f4;
    color: #3b3b3b;
  }
`;
const StyledConversationsSelect = styled.div`
  overflow-y: scroll;
  max-height: 77vh;

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
const LeftNav = () => {
  const [loggedInUser, _loading, _error] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);
  const [emailText, setEmailText] = useState("");

  const toggleDialog = (isOpen: boolean) => {
    setIsOpen(isOpen);
    if (!isOpen) setEmailText("");
  };
  const closeDialog = () => {
    toggleDialog(false);
  };

  //check if conversation is already exists between the current logged in user and recipient
  const queryGetConversationForCurrentUser = query(
    collection(db, "conversations"),
    where("users", "array-contains", loggedInUser?.email)
  );
  const [conversationSnapshot, __loading, __error] = useCollection(
    queryGetConversationForCurrentUser
  );

  const isConversationAlreadyExits = (recipientEmail: string) => {
    return conversationSnapshot?.docs.find((conversation) =>
      (conversation.data() as Conversation).users.includes(recipientEmail)
    );
  };

  const isInvitingSelf = emailText === loggedInUser?.email;
  const createConversation = async () => {
    if (!emailText) return;
    if (
      EmailValidator.validate(emailText) &&
      !isInvitingSelf &&
      !isConversationAlreadyExits(emailText)
    ) {
      //add conversation user to db 'conversations' collection
      //A conversation is between the currently logged in user and the user invited
      await addDoc(collection(db, "conversations"), {
        users: [loggedInUser?.email, emailText],
      });
    }

    closeDialog();
  };
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 400,
        bgcolor: "background.default",
        borderRight: "1px solid #4A545C",
        boxShadow: "0px 0px 4px rgba(2, 17, 37, 0.04), 2px 0px 8px rgba(2, 17, 37, 0.04), 6px 0px 16px rgba(2, 17, 37, 0.04)",
      }}
    >
      <StyledSearch>
        <StyledSearchIcon>
          <SearchOutlinedIcon />
        </StyledSearchIcon>
        <StyledSearchInput placeholder="Enter something...." />
      </StyledSearch>
      <StyledSidebarButton onClick={() => toggleDialog(true)}>
        Start New Conversation
      </StyledSidebarButton>
      <StyledConversationsSelect>
        {/* List of conversations */}
        {conversationSnapshot?.docs.map((conversation) => {
          return (
            <ConversationSelect
              key={conversation.id}
              id={conversation.id}
              conversationUsers={(conversation.data() as Conversation).users}
            />
          );
        })}
      </StyledConversationsSelect>

      <Dialog open={isOpen} onClose={closeDialog}>
        <DialogTitle>Create new conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a Google email address for the user you wish to chat
            with
          </DialogContentText>
          <TextField
            autoFocus
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={emailText}
            onChange={(event) => {
              setEmailText(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button disabled={!emailText} onClick={createConversation}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeftNav;
