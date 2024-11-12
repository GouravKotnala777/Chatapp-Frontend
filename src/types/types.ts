export type textAlign = 'left' | 'right' | 'center' | 'justify';

export type NaviagationTypes = "Chats" | "Status" | "Communities" | "Channels" | "Settings" | "Profile" | "New group" | "Chat info" | "User info" | "New broadcast" | "Linked devices" | "Starred messages" | "Payments" | "Settings" | "Add members" | "Contacts" | "Remove members" | "Friend requests" | "Search user" | "Archive chat" | "Mute notifications" | "Delete chat" | "Pin chat" | "Mark as unread" | "Block" | "Start chat" | "Delete freind" | "Delete message";

export type ResponseType<T> = {success:boolean; message:T};

export type FriendRequestStatusType = "pending"|"accepted"|"rejected";
export interface UserTypes {
    _id: string,
    name: string,
    email: string,
    password: string,
    profilePicture: string,
    coverPicture: string,
    bio: string,
    gender: string,
    friends: string[],
    posts: string[],
    notifications: string[],
    chats: string[],
    is_varified: boolean,
    friendRequests: string[],
    createdAt:Date
};

export interface ChatTypes {
    _id:string;
    chatName:string;
    admin:string[];
    members:string[];
    description:string;
    isGroupChat:boolean;
    createdBy:string;
    createdAt:Date;
    updatedAt:Date;
};
export interface ChatTypesPopulated {
    _id:string;
    chatName:string;
    admin:string[];
    members:UserTypes[];
    description:string;
    isGroupChat:boolean;
    createdBy:string;
    createdAt:Date;
    updatedAt:Date;
};

export type MessageStatusType = "sent"|"delivered"|"read";
export interface MessageTypes {
    sender:string;
    chatID:string;
    content:string;
    attachment:string;
    messageStatus:MessageStatusType;
    isForwarded:boolean;
    deletedFor:string[];
    createdAt:string;
    updatedAt:string;
};
export interface MessageTypesPopulated {
    _id:string;
    sender:string;
    chatID:string;
    content:ContentType;
    attachment:string;
    messageStatus:MessageStatusType;
    isForwarded:boolean;
    deletedFor:string[];
    createdAt:string;
    updatedAt:string;
};

export type ContentMessageType = "text"|"image"|"file"|"video"|"audio";
export interface ContentType {
    _id:string;
    contentMessage:string;
    createdBy:string;
    isForwarded:boolean;
    contentType:ContentMessageType;
    createdAt:Date;
    updatedAt:Date;
};