import { Avatar, Stack } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../../core/firebase/firebase";
import { IMessage } from "../../core/types"
import RecipientAvatar from "../RecipientAvatar";
const StyledMessage = styled.div`
  width: fit-content;
  word-break: break-word;
  max-width: 43.8%;
  min-width: 20%;
  padding: 16px;
  border-radius: 8px;
  margin: 10px 10px 0px 10px;
  position: relative;
`;
const StyledSenderMessage = styled(StyledMessage)`
  margin-left: auto;
  background: rgba(0, 134, 234, 0.16);
  /* Stroke / Block */
  border-radius: 16px 16px 0px 16px;
`;

const StyledReceiverMessage = styled(StyledMessage)`
  background: #4a545c;
  border-radius: 16px 16px 16px 0px;
`;
const StyledTimestamp = styled.p`
    margin:0;
  padding: 2px 10px 10px 10px;
  font-weight: 400;
font-size: 12px;
line-height: 16px;
text-align: right;
color: #ABBBC9;
`;
const MessageRight = (props: any) => {
    const message = props.message ? props.message : "no message";
    const timestamp = props.timestamp ? props.timestamp : "";

    return (
        <>
        <StyledSenderMessage >{message}</StyledSenderMessage>
        <StyledTimestamp >{timestamp}</StyledTimestamp>
        </>
    )
}
const MessageLeft = (props: any) => {
    const message = props.message ? props.message : "no message";
    const timestamp = props.timestamp ? props.timestamp : "";
    const photoURL = props.photoURL ? props.photoURL : "dummy.js";
    const displayName = props.displayName ? props.displayName : "名無しさん";
    return (
        <Stack flexDirection={'row'} alignItems='flex-end'>
            <Avatar alt="avatar" src={photoURL} />
            <div style={{display:'flex',flexDirection:'column'}}>
            <StyledReceiverMessage style={{width:"100%",padding:"16px 16px 16px 30px"}}>{message}</StyledReceiverMessage>
            <StyledTimestamp style={{textAlign:'left'}} >{timestamp}</StyledTimestamp>
            </div>
            
        </Stack>
    )
}
const Message = ({ message, photoURL }: { message: IMessage, photoURL?: string }) => {
    const [loggedInUser, _loading, _error] = useAuthState(auth);

    const MessageType =
        loggedInUser?.email === message.user ? (
            <MessageRight message={message.text} timestamp={message.sent_at} />
        ) : (
            <MessageLeft
                message={message.text}
                timestamp={message.sent_at}
                displayName={message.user}
                photoURL={photoURL}
            />
        );
    return (
        <>
            {MessageType}
        </>
    )
}

export default Message