import { Container, Stack } from "@mui/material";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useAuthState } from "react-firebase-hooks/auth";
import ConversationScreen from "../../components/ConversationScreen";
import CommonLayout from "../../components/Layout";
import RightNav from "../../components/Layout/RightNav";
import { auth, db } from "../../core/firebase/firebase";
import { useRecipient } from "../../core/hooks/useRecipient";
import { Conversation, IMessage } from "../../core/types";
import { generateQueryMessages, getRecipientEmail, transformMessage } from "../../core/utlis";
interface Props {
  conversation: Conversation,
  messages:IMessage[]
}
interface Params extends ParsedUrlQuery {
  id: string,
}

function Conversation ({conversation,messages}:Props){
    const router = useRouter();
    const { id } = router.query;
    const [loggedInUser,_loading,_error] = useAuthState(auth)

    return (
      <>
        <Head>
          <title>Chat with {getRecipientEmail(conversation.users,loggedInUser)}</title>
          <meta name="description" content="This is every conversation" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <CommonLayout>
          <Stack flexDirection={'row'} >
          <ConversationScreen conversation={conversation} messages={messages}/>
          <RightNav conversation={conversation}/>
          </Stack>
        </CommonLayout>
      </>
    );
  };
  
  export default Conversation;
  
export const getServerSideProps:GetServerSideProps<Props,Params> = async (context) =>{
  const conversationId = context.params?.id

	// get conversation, to know who we are chatting with
	const conversationRef = doc(db, 'conversations', conversationId as string)
	const conversationSnapshot = await getDoc(conversationRef)

	// get all messages between logged in user and recipient in this conversation
	const queryMessages = generateQueryMessages(conversationId)

	const messagesSnapshot = await getDocs(queryMessages)

	const messages = messagesSnapshot.docs.map(messageDoc =>
		transformMessage(messageDoc)
	)
  
  return {
    props:{
      conversation:conversationSnapshot.data() as Conversation,
      messages
    }
  }
}