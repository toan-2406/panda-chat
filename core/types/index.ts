import { Timestamp } from "firebase/firestore";
export type Theme = 'light' | 'dark';
export interface ThemeContextType {
  toggleColorMode: () => void;
  mode:Theme
};
export interface Conversation {
    users:string[]
}
export interface AppUser{
    email:string;
    lastSeen:Timestamp;
    photoURL:string;
}
export interface IMessage {
    id:string
    conversation_id:string
    text:string
    sent_at:string
    user:string
}
