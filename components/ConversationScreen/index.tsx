import { Box, Button, Paper, TextField } from "@mui/material";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, {
    KeyboardEventHandler,
    MouseEventHandler,
    useRef,
    useState,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../../core/firebase/firebase";
import { useRecipient } from "../../core/hooks/useRecipient";
import { Conversation, IMessage } from "../../core/types";
import { generateQueryMessages, transformMessage } from "../../core/utlis";
import Message from "../Message";
const StyledContainer = styled(Paper)`
  height: calc(100vh - 100px);
  width: 100%;
`;
const StyledMessageBody = styled.div`
  padding: 0 80px;
  width: calc(100% - 20px);
  margin: 10px;
  overflow-y: scroll;
  height: calc(80vh - 100px);

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
const EndOfMessagesForAutoScroll = styled.div`
margin-bottom:30px`
const EnterMessageAction = ({
    scrollToBottom,
}: {
    scrollToBottom: () => void;
}) => {
    const StyledTextInput = styled.form`
    border: 1px solid #4a545c;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    width: 75%;
    margin: 0 auto;
    overflow: hidden;
  `;
    const StyledAction = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
  `;
    const StyledTextField = styled(TextField)`
    background: #21262b;
  `;
    const StyledButton = styled(Button)`
    width: 60px;
    height: 32px;
    border: 1px solid #d4d4d4;
    border-radius: 8px;
    text-transform: lowercase;
    color: #ffffff;
  `;
    const [newMessage, setNewMessage] = useState("");
    const router = useRouter();
    const conversationId = router.query.id;
    const [loggedInUser, _loading, _error] = useAuthState(auth);
    const addMessageToDbAndUpdateLastSeen = async () => {
        // update last seen in 'users' collection
        await setDoc(
            doc(db, "users", loggedInUser?.email as string),
            {
                lastSeen: serverTimestamp(),
            },
            { merge: true }
        ); // just update what is changed

        // add new message to 'messages' collection
        await addDoc(collection(db, "messages"), {
            conversation_id: conversationId,
            sent_at: serverTimestamp(),
            text: newMessage,
            user: loggedInUser?.email,
        });

        // reset input field
        setNewMessage("");

        // // scroll to bottom
        scrollToBottom();
    };

    const sendMessageOnEnter: KeyboardEventHandler<HTMLInputElement> = (
        event
    ) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (!newMessage) return;
            addMessageToDbAndUpdateLastSeen();
        }
    };
    const sendMessageOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        if (!newMessage) return;
        addMessageToDbAndUpdateLastSeen();
    };

    return (
        <>
            <StyledTextInput  noValidate autoComplete="off">
            <TextField
                id="standard-text"
                label="Enter your text..."
                sx={{width:'100%'}}
                //margin="normal"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={sendMessageOnEnter}
            />
                <StyledAction>
                    <div>
                        <StyledButton>@</StyledButton>
                        <StyledButton>emoji</StyledButton>
                    </div>
                    <StyledButton variant="contained" color="primary" onClick={sendMessageOnClick}>Send</StyledButton>
                </StyledAction>
            </StyledTextInput>
        </>
    );
};

const ConversationScreen = ({
    conversation,
    messages,
}: {
    conversation: Conversation;
    messages: IMessage[];
}) => {
    const conversationUser = conversation.users;
    const { recipientEmail, recipient } = useRecipient(conversationUser);
    const [loggedInUser, _loading, _error] = useAuthState(auth);

    const endOfMessagesRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const queryParams = router.query.id;
    const queryGetMessages = generateQueryMessages(queryParams as string);

    const [messagesSnapshot, messagesLoading, __error] =
        useCollection(queryGetMessages);

    const showMessages = () => {
        if (messagesLoading) {
            return <p>Loading</p>;
        }
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map((message) => (
                <Message
                    key={message.id}
                    message={transformMessage(message)}
                    photoURL={recipient?.photoURL}
                />
            ));
        }
        return null;
    };
    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <StyledContainer elevation={0}>
            <StyledMessageBody>{showMessages()} <EndOfMessagesForAutoScroll ref={endOfMessagesRef} /></StyledMessageBody>
            <EnterMessageAction scrollToBottom={scrollToBottom} />
        </StyledContainer>
    );
};

export default ConversationScreen;
