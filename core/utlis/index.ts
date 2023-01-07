import { User } from "firebase/auth";
import {
  collection,
  DocumentData,
  orderBy,
  query,
  QueryDocumentSnapshot,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Conversation, IMessage } from "../types";

/* A function that takes in a ConversationUser and returns a string. */
export const getRecipientEmail = (
  conversationUser: Conversation["users"],
  loggedInUser?: User | null
) => conversationUser.find((userEmail) => userEmail !== loggedInUser?.email);

export const generateQueryMessages = (conversationId?: string) =>
  query(
    collection(db, "messages"),
    where("conversation_id", "==", conversationId),
    orderBy("sent_at", "asc")
  );
 
export const convertFirestoreTimestampToString = (timestamp: Timestamp) =>
  new Date(timestamp.toDate().getTime()).toLocaleString();
  export const transformMessage = (
    message: QueryDocumentSnapshot<DocumentData>
  ) =>
    ({
      id: message.id,
      ...message.data(),
      sent_at: message.data().sent_at
        ? convertFirestoreTimestampToString(message.data().sent_at as Timestamp)
        : null
    } as unknown as IMessage)
