import { collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase/firebase";
import { AppUser, Conversation } from "../types";
import { getRecipientEmail } from "../utlis";

export const useRecipient = (conversationUser: Conversation['users']) =>{
    const [loggedInUser,_loading,_error] = useAuthState(auth)

    /* Getting the recipient email from the conversationUser and loggedInUser. */
    const recipientEmail = getRecipientEmail(conversationUser,loggedInUser)
    
    /* Creating a query to get the recipient from the database. */
    const queryGetRecipient = query(collection(db,'users'),where('email','==',recipientEmail))
    const [recipientsSnapshot,__loading,__error] = useCollection(queryGetRecipient)

    //recipientSnapshot
    /* recipientsSnapshot.docs có thể là empty array, vì vậy thêm '?' sau docs[0] để nó lấy data() hoặc 'undefinded'   */
    const recipient = recipientsSnapshot?.docs[0]?.data() as AppUser | undefined

    return{
        recipientEmail,
        recipient
    }
}