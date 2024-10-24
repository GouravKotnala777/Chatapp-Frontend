export type textAlign = 'left' | 'right' | 'center' | 'justify';

export type NaviagationTypes = "Chats" | "Status" | "Communities" | "Channels" | "Settings" | "Profile" | "New group" | "New broadcast" | "Linked devices" | "Starred messages" | "Payments" | "Settings";

export interface ChatTypes {
    _id:string;
    chatName:string;
    lastMessage:string;
    date:string;
}