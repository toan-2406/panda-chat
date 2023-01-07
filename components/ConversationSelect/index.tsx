import { useRouter } from "next/router";
import styled from "styled-components";
import { useRecipient } from "../../core/hooks/useRecipient";
import { Conversation } from "../../core/types";
import RecipientAvatar from "../RecipientAvatar";


const ConversationSelect = ({id,conversationUsers}:{id:string;conversationUsers:Conversation['users']}) => {
  const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  word-break: break-all;
  padding:8px 24px;
  transition:background 0.2s;
  :hover{
    background: #353C43;
  }
  `
  const StyledFlexBox = styled.div`
    display:flex;
    flex-direction: column;
  `
  const StyledName = styled.strong`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #EEF1F4;
  `
  const StyledText = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #ABBBC9;
  display: block; /* Fallback for non-webkit */
      display: -webkit-box;
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;
      overflow:hidden !important;
      white-space: nowrap;
      width:180px
  
  `
  const StyledTime = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #778592;
  `
  const StyledFlexBox2 = styled(StyledFlexBox)`
    margin-left:auto
  `
  
   const {recipient,recipientEmail}= useRecipient(conversationUsers)
  
   const router = useRouter()
   const handleOnSelectConversation = () =>{
    router.push(`/conversations/${id}`)
   }
  return (
    <StyledContainer style={{background:id === router.query.id ? "#353C43":''}} onClick={handleOnSelectConversation}>
        <RecipientAvatar recipient={recipient} recipientEmail={recipientEmail} />
       <StyledFlexBox>
          <StyledName>{recipientEmail}</StyledName>
          <StyledText>Did you hear about OE DS...dsadsa dsadsad dsadsa dsa</StyledText>
       </StyledFlexBox>
       <StyledFlexBox2>
          <StyledTime>8:25</StyledTime>
          <StyledTime>
            3
          </StyledTime>
       </StyledFlexBox2>
    </StyledContainer>
  )
}

export default ConversationSelect